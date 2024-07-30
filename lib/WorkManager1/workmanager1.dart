import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:untitled/WorkManager1/preferenceListener.dart';
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:untitled/utils/utils.dart';
import 'package:workmanager/workmanager.dart';
import 'package:shared_preferences/shared_preferences.dart';

@pragma('vm:entry-point')
void callbackDispatcher() {

  print("enter Dispatcher***********");
  Workmanager().executeTask((task, inputData) async {


    print("Executing task: $task at ${DateTime.now()}");


    switch (task) {

      case "clearSharedPreferencesTask":
        print("$task**************");
        await clearSharedPreferences();
        break;


    }
    return Future.value(true);
  });
}


Future<void> clearSharedPreferences() async {
  print("Starting clearSharedPreferences at ${DateTime.now()}");

  final listener = SharedPreferencesListener();
  await listener.setTeacherClass('');
  await listener.setTeacherSection('');

  print("After clearing:/..............");
  String? Class = await listener.getTeacherClass();
  String? section =await listener.getTeacherSection();
  print("${Class}, : $section");
}

Future<void> schedulePreferenceClear() async {

        try {
        // Generate a unique task IDankits
        String taskId = "clearSharedPreferencesTask_${DateTime.now().millisecondsSinceEpoch}";

        await Workmanager().registerOneOffTask(
          "clearSharedPreferencesTask",
          "clearSharedPreferencesTask",
          initialDelay: const Duration(seconds: 5),
          existingWorkPolicy: ExistingWorkPolicy.replace,
          constraints: Constraints(
            networkType: NetworkType.not_required,
            requiresBatteryNotLow: false,
            requiresCharging: false,
            requiresDeviceIdle: false,
            requiresStorageNotLow: false,
          ),
        );
        print("Task scheduled to clear preferences in 5 seconds");
      } catch (e) {
        print("Error scheduling task: $e");
      }
}