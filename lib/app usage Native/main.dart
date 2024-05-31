import 'package:flutter/material.dart';
import 'package:workmanager/workmanager.dart';
import 'app_usage_tracker.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Workmanager().initialize(callbackDispatcher, isInDebugMode: true);
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String usageData = 'No usage data yet';

  @override
  Widget build(BuildContext context) {
    print(usageData);
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('App Usage Tracker'),
        ),
        body: SingleChildScrollView(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(usageData),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () async {
                    Workmanager().registerOneOffTask(
                      "startTrackingTask",
                      startTrackingTask,
                      initialDelay: Duration.zero,
                    );
                  },
                  child: const Text('Check In'),
                ),
                ElevatedButton(
                  onPressed: () async {
                    Workmanager().registerOneOffTask(
                      "stopTrackingTask",
                      stopTrackingTask,
                      initialDelay: Duration.zero,
                    );
                    final usageData = await AppUsageTracker.stopTracking();
                    setState(() {
                      this.usageData = usageData;
                    });
                  },
                  child: const Text('Check Out'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
