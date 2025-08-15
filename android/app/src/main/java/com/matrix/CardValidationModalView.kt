package com.matrix

import android.app.Dialog
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.ViewGroup
import android.widget.FrameLayout

class CardValidationModalView(context: Context) : FrameLayout(context) {
  var visible: Boolean = false
  var cardId: String = ""
  var cardNumber: String = ""
  var cardNumberRaw: String = ""
  var cvv: String = ""
  var expiryMonth: Int = 1
  var expiryYear: Int = 1970
  var cardholder: String = ""
  var sessionToken: String = ""
  var tokenExpiresAt: Double = 0.0
  var hmacKey: String = ""
  var hmacSignature: String = ""

  var dialog: Dialog? = null
  var timeoutHandler: Handler? = null
  var timeoutRunnable: Runnable? = null

  val mainHandler = Handler(Looper.getMainLooper())
  var scheduled = false

  init { layoutParams = LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0) }
}
