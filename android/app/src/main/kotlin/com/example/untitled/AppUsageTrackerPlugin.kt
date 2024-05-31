package com.example.untitled

import android.app.AppOpsManager
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Process
import android.provider.Settings
import androidx.annotation.NonNull
import io.flutter.embedding.engine.plugins.FlutterPlugin
import io.flutter.plugin.common.MethodCall
import io.flutter.plugin.common.MethodChannel
import io.flutter.plugin.common.MethodChannel.MethodCallHandler
import io.flutter.plugin.common.MethodChannel.Result
import java.util.concurrent.ConcurrentHashMap

class AppUsageTrackerPlugin : FlutterPlugin, MethodCallHandler {
    private lateinit var channel: MethodChannel
    private lateinit var context: Context
    private var usageStatsManager: UsageStatsManager? = null
    private var checkInTime: Long = 0

    override fun onAttachedToEngine(@NonNull flutterPluginBinding: FlutterPlugin.FlutterPluginBinding) {
        channel = MethodChannel(flutterPluginBinding.binaryMessenger, "untitled.app_usage_tracker")
        channel.setMethodCallHandler(this)
        context = flutterPluginBinding.applicationContext
        usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    }

    override fun onMethodCall(@NonNull call: MethodCall, @NonNull result: Result) {
        when (call.method) {
            "getPlatformVersion" -> {
                result.success("Android ${android.os.Build.VERSION.RELEASE}")
            }
            "startTracking" -> {
                startTrackingUsage(result)
            }
            "stopTracking" -> {
                stopTrackingUsage(result)
            }
            else -> {
                result.notImplemented()
            }
        }
    }

    override fun onDetachedFromEngine(@NonNull binding: FlutterPlugin.FlutterPluginBinding) {
        channel.setMethodCallHandler(null)
    }

    private fun startTrackingUsage(result: Result) {
        if (!hasUsageStatsPermission()) {
            requestUsageStatsPermission()
            result.success(null)
        } else {
            checkInTime = System.currentTimeMillis() // Store the current time as the check-in time
            result.success("Tracking started")
        }
    }


    private fun stopTrackingUsage(result: Result) {
        if (hasUsageStatsPermission()) {
            val usageStats = usageStatsManager?.queryUsageStats(
                UsageStatsManager.INTERVAL_BEST,
                checkInTime,
                System.currentTimeMillis()
            )

            val usageData = usageStats?.filter {
                it.lastTimeUsed >= checkInTime && it.lastTimeUsed <= System.currentTimeMillis()
            }?.filter {
                it.totalTimeInForeground > 0
            }?.joinToString("\n") { stat ->
                val totalTimeInSeconds = stat.totalTimeInForeground / 1000
                val minutes = totalTimeInSeconds / 60
                val seconds = totalTimeInSeconds % 60
                "${stat.packageName}: ${minutes}m ${seconds}s"
            } ?: "No usage data available"

            result.success(usageData)
        } else {
            result.error("PERMISSION_DENIED", "Usage stats permission not granted", null)
        }
    }

    private fun hasUsageStatsPermission(): Boolean {
        val appOpsManager = context.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            appOpsManager.unsafeCheckOpRaw(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                Process.myUid(),
                context.packageName
            )
        } else {
            appOpsManager.checkOpNoThrow(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                Process.myUid(),
                context.packageName
            )
        }
        return mode == AppOpsManager.MODE_ALLOWED
    }

    private fun requestUsageStatsPermission() {
        val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent)
    }
}
