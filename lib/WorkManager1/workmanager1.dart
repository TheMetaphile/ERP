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

      print("check task/////////");



      print("listener task/////////");

    print("Executing task: $task at ${DateTime.now()}");

      print("Task $task");

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
  SharedPreferences prefs = await SharedPreferences.getInstance();

  print("Before clearing:");

  print("teacherSection: ${prefs.getString("teacherSection")}.........");
  print("teacherClass: ${prefs.getString("teacherClass")}.........");

  // bool sectionRemoved = await prefs.remove("teacherSection");
  // bool classRemoved = await prefs.remove("teacherClass");
  // await prefs.setString("teacherClass", "");
  // await prefs.setString("teacherSection", "");


  // print("Removal results - Section: $sectionRemoved, Class: $classRemoved");
  final listener = SharedPreferencesListener();

  await listener.setTeacherClass('');
  await listener.setTeacherSection('');

  String? teacherClas=await prefs.getString("teacherClass");
  String? teacherSection=await prefs.getString("teacherSection");
  print("After clearing:/..............");
  print("teacherSection: ${teacherClas}....................");
  print("teacherClass: ${teacherSection}................");

  // You cannot use context here. Use a notification or state management to update UI.

  print("Finished clearSharedPreferences at ${DateTime.now()}...........");
}

Future<void> schedulePreferenceClear() async {

        try {
        // Generate a unique task IDankits
        String taskId = "clearSharedPreferencesTask_${DateTime.now().millisecondsSinceEpoch}";

        await Workmanager().registerOneOffTask(
          "clearSharedPreferencesTask",
          "clearSharedPreferencesTask",
          initialDelay: const Duration(seconds: 15),
          existingWorkPolicy: ExistingWorkPolicy.replace,
          constraints: Constraints(
            networkType: NetworkType.not_required,
            requiresBatteryNotLow: false,
            requiresCharging: false,
            requiresDeviceIdle: false,
            requiresStorageNotLow: false,
          ),
        );
        print("Task scheduled to clear preferences in 15 seconds");
      } catch (e) {
        print("Error scheduling task: $e");
      }
}