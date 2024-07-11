import 'package:flutter/services.dart';
import 'package:workmanager/workmanager.dart';

const String startTrackingTask = 'startTrackingTask';
const String stopTrackingTask = 'stopTrackingTask';

void callbackDispatcher() {
  Workmanager().executeTask(
        (taskName, inputData) async {
      switch (taskName) {
        case startTrackingTask:
          await AppUsageTracker.startTracking();
          break;
        case stopTrackingTask:
          await AppUsageTracker.stopTracking();
          break;
      }
      return Future.value(true);
    },
  );
}

@pragma('vm:entry-point')
void startCallbackDispatcher() {
  callbackDispatcher();
}

class AppUsageTracker {
  static const MethodChannel _channel = MethodChannel('untitled.app_usage_tracker');

  static Future<String> get platformVersion async {
    final String version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }

  static Future<void> startTracking() async {
    await _channel.invokeMethod('startTracking');
  }

  static Future<String> stopTracking() async {
    final String usageData = await _channel.invokeMethod('stopTracking');
    print(usageData);
    return usageData;
  }
}
