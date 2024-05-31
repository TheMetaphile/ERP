import 'package:flutter/material.dart';
import 'package:usage_stats/usage_stats.dart';
import 'package:workmanager/workmanager.dart';
import 'package:shared_preferences/shared_preferences.dart';
void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    try {
      DateTime checkInTime = DateTime.parse(inputData!['checkInTime']);
      DateTime checkOutTime = DateTime.now();

      List<UsageInfo> usageStats = await UsageStats.queryUsageStats(
        checkInTime.subtract(Duration(minutes: 1)), // Adjusting the start time to ensure we capture usage before check-in
        checkOutTime,
      );

      Map<String, int> appUsageMap = {};

      for (UsageInfo info in usageStats) {
        String? packageName = info.packageName;
        String? totalTimeInForeground = info.totalTimeInForeground;
        if (packageName != null && totalTimeInForeground != null) {
          int? totalTimeInForegroundInt = int.tryParse(totalTimeInForeground);
          if (totalTimeInForegroundInt != null) {
            appUsageMap[packageName] = (appUsageMap[packageName] ?? 0) + totalTimeInForegroundInt;
          }
        }
      }

      SharedPreferences prefs = await SharedPreferences.getInstance();
      for (var entry in appUsageMap.entries) {
        String key = '${entry.key}_${checkInTime.millisecondsSinceEpoch}';
        prefs.setInt(key, entry.value);
        print('Stored: $key -> ${entry.value}'); // Log stored entries
      }
    } catch (e) {
      print('Error in callbackDispatcher: $e');
    }

    return Future.value(true);
  });
}


void main() {
  WidgetsFlutterBinding.ensureInitialized();
  Workmanager().initialize(
    callbackDispatcher,
    isInDebugMode: true,
  );
  runApp(MyApp());
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

  void _startTracking() async {
    setState(() {
      _checkInTime = DateTime.now();
      _checkOutTime = null;
      _appUsageMap = {};
    });

    Workmanager().registerOneOffTask(
      '1',
      'usageTrackerTask',
      inputData: {
        'checkInTime': _checkInTime!.toIso8601String(),
      },
    );
  }

  void _stopTracking() async {
    setState(() {
      _checkOutTime = DateTime.now();
    });

    SharedPreferences prefs = await SharedPreferences.getInstance();
    Set<String> keys = prefs.getKeys();
    Map<String, Duration> usageMap = {};

    print('Keys in SharedPreferences: $keys'); // Log all keys

    for (String key in keys) {
      print('Processing key: $key'); // Log each key processing
      List<String> keyParts = key.split('_');
      if (keyParts.length == 2) {
        String packageName = keyParts[0];
        int? millisecondsSinceEpoch = int.tryParse(keyParts[1]);
        if (millisecondsSinceEpoch != null &&
            millisecondsSinceEpoch >= _checkInTime!.millisecondsSinceEpoch) {
          int? totalTimeInMilliseconds = prefs.getInt(key);
          if (totalTimeInMilliseconds != null) {
            print('Retrieved: $key -> $totalTimeInMilliseconds'); // Log retrieved entries
            if (!usageMap.containsKey(packageName)) {
              usageMap[packageName] = Duration(milliseconds: totalTimeInMilliseconds);
            } else {
              usageMap[packageName] = usageMap[packageName]! + Duration(milliseconds: totalTimeInMilliseconds);
            }
          }
        }
      }
    }

    setState(() {
      _appUsageMap = usageMap;
    });

    print('Usage Map: $_appUsageMap'); // Log the final usage map
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('App Usage Tracker'),
      ),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: _startTracking,
            child: Text('Check In'),
          ),
          ElevatedButton(
            onPressed: _stopTracking,
            child: Text('Check Out'),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _appUsageMap.keys.length,
              itemBuilder: (context, index) {
                String packageName = _appUsageMap.keys.elementAt(index);
                Duration usageDuration = _appUsageMap[packageName]!;
                return ListTile(
                  title: Text(packageName),
                  subtitle: Text('${usageDuration.inMinutes} minutes ${usageDuration.inSeconds % 60} seconds'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}


