import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:usage_stats/usage_stats.dart';
import 'package:workmanager/workmanager.dart';

void main() => runApp(MyApp());

const appUsageTrackingTask = "app_usage_tracking_task";

void callbackDispatcher() {
  _UsageTrackerState obj=_UsageTrackerState();
  Workmanager().executeTask((task, inputData) async {
    if (task == appUsageTrackingTask) {
      await obj._trackAppUsageInBackground();

    }
    return Future.value(true);
  });
}



class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: UsageTracker(),
    );
  }
}

class UsageTracker extends StatefulWidget {
  @override
  _UsageTrackerState createState() => _UsageTrackerState();
}

class _UsageTrackerState extends State<UsageTracker> {
  DateTime? _checkInTime;
  DateTime? _checkOutTime;
  Map<String, Duration> _appUsageMap = {};

  Future<void> _storeCheckInTime() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setInt('checkInTimeMillis', _checkInTime!.millisecondsSinceEpoch);
  }

  Future<void> _loadCheckInTime() async {
    final prefs = await SharedPreferences.getInstance();
    final checkInTimeMillis = prefs.getInt('checkInTimeMillis');
    if (checkInTimeMillis != null) {
      _checkInTime = DateTime.fromMillisecondsSinceEpoch(checkInTimeMillis);
    } else {
      _checkInTime = null;
    }
  }
  void _startTracking() async {
    setState(() {
      _checkInTime = DateTime.now();
      _checkOutTime = null;
      _appUsageMap.clear();
    });
    await _storeCheckInTime(); // Store the check-in time
    _scheduleUsageTracking();
  }

  void _stopTracking() async {
    if (_checkInTime == null) {
      print('Check-in time is not set.');
      return;
    }

    _checkOutTime = DateTime.now();
    await _trackAppUsage();
    Workmanager().cancelAll();
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('checkInTimeMillis'); // Remove the check-in time
  }

  void _scheduleUsageTracking() {
    Workmanager().registerOneOffTask(
      appUsageTrackingTask,
      appUsageTrackingTask,
    );
  }

  Future<void> _trackAppUsage() async {
    List<UsageInfo> usageStats = await UsageStats.queryUsageStats(
      _checkInTime!,
      _checkOutTime!,
    );

    for (UsageInfo info in usageStats) {
      String? packageName = info.packageName;
      String? totalTimeInForeground = info.totalTimeInForeground;
      print("totalTimeInForeground ${totalTimeInForeground}");
      if (packageName != null && totalTimeInForeground != null) {
        int totalTimeInForegroundInt = int.parse(totalTimeInForeground);
        Duration usageDuration = Duration(milliseconds: totalTimeInForegroundInt);
        if (_appUsageMap.containsKey(packageName)) {
          _appUsageMap[packageName] = _appUsageMap[packageName]! + usageDuration;
        } else {
          _appUsageMap[packageName] = usageDuration;
        }
      }
    }
    print("_checkInTime ${_checkInTime}");
    print("_checkOutTime ${_checkOutTime}");


    setState(() {});
  }

  Future<void> _trackAppUsageInBackground() async {
    await _loadCheckInTime(); // Load the check-in time
    if (_checkInTime != null && _checkOutTime == null) {
      // Only track usage if check-in time is set and check-out time is not set
      await _trackAppUsage();
      _scheduleUsageTracking(); // Reschedule the task to continue tracking
    }
  }
  @override
  void initState() {
    super.initState();
    _loadCheckInTime(); // Load the check-in time when the app opens
  }

  @override
  Widget build(BuildContext context) {
    print(_appUsageMap);
    return Scaffold(
      appBar: AppBar(
        title: Text('Teacher App Usage Tracker'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              ElevatedButton(
                onPressed: _startTracking,
                child: Text('Check In'),
              ),
              ElevatedButton(
                onPressed: _stopTracking,
                child: Text('Check Out'),
              ),
              SizedBox(height: 16),
              Text(
                "App Usage",
                style: Theme.of(context).textTheme.headline6,
              ),
              SizedBox(height: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: _appUsageMap.entries
                    .map((entry) => ListTile(
                  title: Text(entry.key),
                  subtitle: Text(
                      '${entry.value.inMinutes} minutes ${entry.value.inSeconds % 60} seconds'),
                ))
                    .toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }


}
