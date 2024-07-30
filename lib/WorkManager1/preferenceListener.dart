import 'dart:async';

import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesListener {
  static final SharedPreferencesListener _instance = SharedPreferencesListener._internal();
  factory SharedPreferencesListener() => _instance;
  SharedPreferencesListener._internal();

  final _teacherClassController = StreamController<String?>.broadcast();
  final _teacherSectionController = StreamController<String?>.broadcast();

  Stream<String?> get teacherClassStream => _teacherClassController.stream;
  Stream<String?> get teacherSectionStream => _teacherSectionController.stream;

  void dispose() {
    _teacherClassController.close();
    _teacherSectionController.close();
  }

  Future<void> setTeacherClass(String value) async {

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('teacherClass', value);
    await prefs.reload();
        _teacherClassController.add(value);
  }

  Future<void> setTeacherSection(String value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('teacherSection', value);

      _teacherSectionController.add(value);


  }

  Future<String?> getTeacherClass() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.reload();
    return prefs.getString('teacherClass');
  }

  Future<String?> getTeacherSection() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.reload();
    return prefs.getString('teacherSection');
  }
}