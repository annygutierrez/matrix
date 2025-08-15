package com.matrix

import android.app.Activity
import android.app.AlertDialog
import android.app.Application
import android.os.Looper
import android.os.Handler
import android.os.Build
import com.facebook.react.bridge.Arguments
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.EventDispatcher
import java.util.Calendar
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

import android.view.WindowManager
import android.view.View
import android.view.ViewGroup
import android.graphics.Shader
import android.graphics.RenderEffect
import java.lang.ref.WeakReference


private var lifecycleCb: Application.ActivityLifecycleCallbacks? = null
private var trackedActivityRef: WeakReference<Activity>? = null
private var coverViewRef: WeakReference<View>? = null


private fun activityOf(v: CardValidationModalView): Activity? =
  (v.context as ThemedReactContext).currentActivity

private fun addBackgroundCover(activity: Activity) {
  val win = activity.window
  val decor = win?.decorView as? ViewGroup ?: return

  coverViewRef?.get()?.let { if (it.parent != null) return }

  if (Build.VERSION.SDK_INT >= 31) {
    decor.setRenderEffect(
      RenderEffect.createBlurEffect(20f, 20f, Shader.TileMode.CLAMP)
    )
  }

  val cover = View(activity).apply {
    setBackgroundColor(0xAA000000.toInt())
    layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT
    )
    isClickable = false
    isFocusable = false
  }
  decor.addView(cover)
  coverViewRef = WeakReference(cover)
}

private fun removeBackgroundCover(activity: Activity?) {
  if (activity == null) return
  val win = activity.window
  val decor = win?.decorView as? ViewGroup ?: return

  if (Build.VERSION.SDK_INT >= 31) {
    decor.setRenderEffect(null)
  }

  coverViewRef?.get()?.let { view ->
    (view.parent as? ViewGroup)?.removeView(view)
  }
  coverViewRef = null
}

private fun registerLifecycleWhileVisible(activity: Activity) {
  if (lifecycleCb != null) return
  trackedActivityRef = WeakReference(activity)

  lifecycleCb = object : Application.ActivityLifecycleCallbacks {
    override fun onActivityPaused(a: Activity) {
      if (trackedActivityRef?.get() === a) addBackgroundCover(a)
    }
    override fun onActivityResumed(a: Activity) {
      if (trackedActivityRef?.get() === a) removeBackgroundCover(a)
    }
    override fun onActivityDestroyed(a: Activity) {
      if (trackedActivityRef?.get() === a) {
        removeBackgroundCover(a)
        unregisterLifecycle(a.application)
      }
    }
    override fun onActivityCreated(a: Activity, s: android.os.Bundle?) {}
    override fun onActivityStarted(a: Activity) {}
    override fun onActivityStopped(a: Activity) {}
    override fun onActivitySaveInstanceState(a: Activity, outState: android.os.Bundle) {}
  }

  activity.application.registerActivityLifecycleCallbacks(lifecycleCb)
}

private fun unregisterLifecycle(app: Application) {
  lifecycleCb?.let { app.unregisterActivityLifecycleCallbacks(it) }
  lifecycleCb = null
  trackedActivityRef = null
}


@ReactModule(name = CardValidationModalManager.NAME)
class CardValidationModalManager : SimpleViewManager<CardValidationModalView>() {
    private var lastSecureActivity: WeakReference<Activity>? = null

  override fun getName() = NAME
  override fun createViewInstance(ctx: ThemedReactContext) = CardValidationModalView(ctx)

  @ReactProp(name = "visible") fun setVisible(v: CardValidationModalView, value: Boolean) { v.visible = value; scheduleMaybePresent(v) }
  @ReactProp(name = "cardId") fun setCardId(v: CardValidationModalView, value: String) { v.cardId = value }
  @ReactProp(name = "cardNumber") fun setCardNumber(v: CardValidationModalView, value: String) { v.cardNumber = value }
  @ReactProp(name = "cvv") fun setCvv(v: CardValidationModalView, value: String) { v.cvv = value }
  @ReactProp(name = "expiryMonth") fun setExpiryMonth(v: CardValidationModalView, value: Int) { v.expiryMonth = value }
  @ReactProp(name = "expiryYear") fun setExpiryYear(v: CardValidationModalView, value: Int) { v.expiryYear = value }
  @ReactProp(name = "cardholder") fun setCardholder(v: CardValidationModalView, value: String) { v.cardholder = value }
  @ReactProp(name = "sessionToken") fun setSessionToken(v: CardValidationModalView, value: String) { v.sessionToken = value }
  @ReactProp(name = "tokenExpiresAt") fun setTokenExpiresAt(v: CardValidationModalView, value: Double) { v.tokenExpiresAt = value }
  @ReactProp(name = "hmacKey") fun setHmacKey(v: CardValidationModalView, value: String) { v.hmacKey = value }
  @ReactProp(name = "hmacSignature") fun setHmacSignature(v: CardValidationModalView, value: String) { v.hmacSignature = value }

  private fun scheduleMaybePresent(v: CardValidationModalView) {
    if (v.scheduled) return
    v.scheduled = true
    v.mainHandler.post {
      v.scheduled = false
      if (!v.visible) { dismissDialog(v, reason = "PROGRAMMATIC"); return@post }
      maybePresent(v)
    }
  }

  private fun maybePresent(v: CardValidationModalView) {
    val missing = missingProps(v)
    if (missing.isNotEmpty()) {
      emitError(v, "TOKEN_INVALID", "Missing props: ${missing.joinToString(", ")}")
      v.visible = false
      return
    }
    val ctx = v.context as ThemedReactContext
    val activity: Activity? = ctx.currentActivity
    if (activity == null) {
      v.mainHandler.postDelayed({ if (v.visible) maybePresent(v) }, 100)
      return
    }

    if (isCardExpired(v.expiryMonth, v.expiryYear)) {
      emitError(v, "EXPIRED_CARD", "Card is expired"); v.visible = false; return
    }
    val now = System.currentTimeMillis().toDouble()
    if (v.tokenExpiresAt > 0 && now >= v.tokenExpiresAt) {
      emitError(v, "TOKEN_EXPIRED", "Session token has expired"); v.visible = false; return
    }
    if (!isHmacValid(v)) {
      emitError(v, "TOKEN_INVALID", "HMAC signature is invalid"); v.visible = false; return
    }
    presentDialog(v, activity)
  }

  private fun missingProps(v: CardValidationModalView): List<String> {
    val xs = mutableListOf<String>()
    if (v.cardId.isEmpty()) xs += "cardId"
    if (v.cardNumber.isEmpty()) xs += "cardNumber"
    if (v.cvv.isEmpty()) xs += "cvv"
    if (v.expiryMonth !in 1..12) xs += "expiryMonth"
    if (v.expiryYear <= 0) xs += "expiryYear"
    if (v.sessionToken.isEmpty()) xs += "sessionToken"
    if (v.hmacKey.isEmpty()) xs += "hmacKey"
    if (v.hmacSignature.isEmpty()) xs += "hmacSignature"
    return xs
  }

  private fun presentDialog(v: CardValidationModalView, activity: Activity) {
    if (v.dialog?.isShowing == true) return

    setSecure(activity, true)

    val message = "Cardholder: ${v.cardholder}\ncvv: ${v.cvv}\nCard Number: ${v.cardNumber}\nExpiration Date: ${v.expiryMonth}/${v.expiryYear}\n(Visible for 60s)"
    val dlg = AlertDialog.Builder(activity)
      .setTitle("Credit Card")
      .setMessage(message)
      .setCancelable(false)
      .setPositiveButton("Close") { d, _ ->
        d.dismiss(); emitClosed(v, reason = "USER")
        setSecure(activity, false)
      }.create()
    v.dialog = dlg
    dlg.setOnShowListener {
        registerLifecycleWhileVisible(activity)
      }
    dlg.setOnDismissListener {
        setSecure(activity, false)
      }
    dlg.show()

    emitPresented(v)

    v.timeoutHandler?.removeCallbacksAndMessages(null)
    v.timeoutHandler = Handler(Looper.getMainLooper())
    v.timeoutRunnable = Runnable {
      dismissDialog(v, reason = "TIMEOUT")
      emitTimeout(v)
    }
    v.timeoutHandler?.postDelayed(v.timeoutRunnable!!, 60_000)
  }

  private fun dismissDialog(v: CardValidationModalView, reason: String?) {
    v.timeoutHandler?.removeCallbacksAndMessages(null)
    v.timeoutHandler = null
    val activityValue = activityOf(v);
    removeBackgroundCover(activityValue)
    activityValue?.application?.let { unregisterLifecycle(it) }

    val act = (v.context as ThemedReactContext).currentActivity
    if (act != null) setSecure(act, false)
    
    v.dialog?.let {
      if (it.isShowing) { it.dismiss(); if (reason != "TIMEOUT") emitClosed(v, reason) }
    }
    v.dialog = null
  }

  override fun onDropViewInstance(view: CardValidationModalView) {
    super.onDropViewInstance(view)
    val act = (view.context as ThemedReactContext).currentActivity
    if (act != null) setSecure(act, false)
    
  }

  private fun isCardExpired(month: Int, year: Int): Boolean {
    val cal = Calendar.getInstance()
    val nowYear = cal.get(Calendar.YEAR)
    val nowMonth = cal.get(Calendar.MONTH) + 1
    return (year < nowYear) || (year == nowYear && month < nowMonth)
  }

  private fun isHmacValid(v: CardValidationModalView): Boolean {
    val msg = "${v.cardNumber}|${v.cvv}|${v.expiryMonth}|${v.expiryYear}|${v.sessionToken}"
    val mac = Mac.getInstance("HmacSHA256")
    mac.init(SecretKeySpec(v.hmacKey.toByteArray(Charsets.UTF_8), "HmacSHA256"))
    val bytes = mac.doFinal(msg.toByteArray(Charsets.UTF_8))
    val hex = bytes.joinToString("") { "%02x".format(it) }
    return hex == v.hmacSignature.lowercase()
  }

  private fun setSecure(activity: Activity, enable: Boolean) {
    val w = activity.window
    if (enable) {
      w.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
      lastSecureActivity = WeakReference(activity)
    } else {
      val last = lastSecureActivity?.get()
      if (last === activity) {
        w.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        lastSecureActivity = null
      }
    }
  }

  private fun dispatcher(ctx: ThemedReactContext, viewId: Int): EventDispatcher? =
    UIManagerHelper.getEventDispatcherForReactTag(ctx, viewId)

  private fun emitError(v: CardValidationModalView, code: String, message: String) {
    val ctx = v.context as ThemedReactContext
    val d = Arguments.createMap().apply {
      putString("cardId", v.cardId); putString("code", code); putString("message", message)
    }
    dispatcher(ctx, v.id)?.dispatchEvent(SimpleEvent(v, "onError", d))
  }

  private fun emitPresented(v: CardValidationModalView) {
    val ctx = v.context as ThemedReactContext
    val d = Arguments.createMap().apply { putString("cardId", v.cardId) }
    dispatcher(ctx, v.id)?.dispatchEvent(SimpleEvent(v, "onPresented", d))
  }

  private fun emitClosed(v: CardValidationModalView, reason: String?) {
    val ctx = v.context as ThemedReactContext
    val d = Arguments.createMap().apply {
      putString("cardId", v.cardId); if (reason != null) putString("reason", reason)
    }
    dispatcher(ctx, v.id)?.dispatchEvent(SimpleEvent(v, "onClosed", d))
  }

  private fun emitTimeout(v: CardValidationModalView) {
    val ctx = v.context as ThemedReactContext
    val d = Arguments.createMap().apply { putString("cardId", v.cardId) }
    dispatcher(ctx, v.id)?.dispatchEvent(SimpleEvent(v, "onTimeout", d))
  }

  private class SimpleEvent(
    private val view: CardValidationModalView,
    private val name: String,
    private val payload: com.facebook.react.bridge.WritableMap
  ) : Event<SimpleEvent>(UIManagerHelper.getSurfaceId(view), view.id) {
    override fun getEventName() = name
    override fun getEventData() = payload
  }

  companion object { const val NAME = "CardValidationModal" }
}
