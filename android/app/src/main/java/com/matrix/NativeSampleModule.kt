package com.matrix

import android.app.Activity
import androidx.appcompat.app.AlertDialog
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.matrix.NativeSampleModuleSpec

@ReactModule(name = NativeSampleModule.NAME)
class NativeSampleModule(
  private val reactContext: ReactApplicationContext
) : NativeSampleModuleSpec(reactContext), TurboModule {

  companion object { const val NAME = "NativeSampleModule" }

  override fun initialize() {}
  override fun invalidate() {}

  override fun reverseString(input: String): String = input.reversed()

  override fun openModal(title: String, message: String?) {
    UiThreadUtil.runOnUiThread {
      val activity: Activity = reactContext.currentActivity ?: return@runOnUiThread
      AlertDialog.Builder(activity)
        .setTitle(title)
        .setMessage(message.orEmpty())
        .setPositiveButton("OK", null)
        .show()
    }
  }
}
