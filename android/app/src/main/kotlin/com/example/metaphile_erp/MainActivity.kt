package com.example.metaphile_erp
import android.content.Context
import android.os.Build
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Intent
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.os.Bundle
import java.util.Locale

class MainActivity : FlutterActivity() {
//    private val CHANNEL_ID = "voice_channel"
//    private val METHOD_START_LISTENING = "startListening"
//    private val METHOD_STOP_LISTENING = "stopListening"
//
//    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
//        super.configureFlutterEngine(flutterEngine)
//        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "voice_channel")
//            .setMethodCallHandler { call, result ->
//                when (call.method) {
//                    METHOD_START_LISTENING -> {
//                        startForegroundService()
//                        result.success(null)
//                    }
//                    METHOD_STOP_LISTENING -> {
//                        stopForegroundService()
//                        result.success(null)
//                    }
//                    else -> {
//                        result.notImplemented()
//                    }
//                }
//            }
//    }
//
//    private fun startForegroundService() {
//
//        // Implement speech recognition logic here
//        val speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this)
//        val recognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
//        recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
//        recognizerIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
//        recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
//
//        speechRecognizer.setRecognitionListener(object : RecognitionListener {
//            override fun onReadyForSpeech(params: Bundle?) {}
//
//            override fun onBeginningOfSpeech() {}
//
//            override fun onRmsChanged(rmsdB: Float) {}
//
//            override fun onBufferReceived(buffer: ByteArray?) {}
//
//            override fun onEndOfSpeech() {}
//
//            override fun onError(error: Int) {}
//
//            override fun onResults(results: Bundle?) {
//                val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
//                matches?.let {
//                    for (result in it) {
//                        if (result.contains("hey erp", ignoreCase = true)) {
//                            // "hey erp" detected, launch Flutter application
//                            val flutterIntent = Intent(this@MainActivity, MainActivity::class.java)
//                            flutterIntent.action = Intent.ACTION_RUN
//                            flutterIntent.putExtra("fromBackground", true)
//                            flutterIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
//                            startActivity(flutterIntent)
//                            break
//                        }
//                        if (result.contains("hello erp", ignoreCase = true)) {
//                            // "hey erp" detected, launch Flutter application
//                            val flutterIntent = Intent(this@MainActivity, MainActivity::class.java)
//                            flutterIntent.action = Intent.ACTION_RUN
//                            flutterIntent.putExtra("fromBackground", true)
//                            flutterIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
//                            startActivity(flutterIntent)
//                            break
//                        }
//
//                    }
//                }
//            }
//
//            override fun onPartialResults(partialResults: Bundle?) {}
//
//            override fun onEvent(eventType: Int, params: Bundle?) {}
//        })
//
//        speechRecognizer.startListening(recognizerIntent)
//    }
//
//
//    private fun stopForegroundService() {
//        // TODO: Stop speech recognition logic here
//    }
}
