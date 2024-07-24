import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/utils.dart';

class TeacherTimetableAPI {
  static const String _baseUrl = 'http://13.201.247.28:8000';


  Future<Map<String, dynamic>> fetchTeacherTimetable(String day) async {
    try {
      SharedPreferences pref= await SharedPreferences.getInstance();
      String? accessToken=pref.getString("accessToken");
      String? Teacheremail=pref.getString("email");
      final response = await http.post(
        Uri.parse('$_baseUrl/timetable/fetch/teacher'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'accessToken': accessToken,
          'email': Teacheremail,
          'day': day,
        }),
      );

      if (response.statusCode == 200) {
        final timetable = jsonDecode(response.body);
        print(timetable);
        return timetable;
      } else {
        throw Exception('Failed to fetch teacher timetable. Status code: ${response.statusCode}, Body: ${response.body}');
      }
    } catch (e) {
      print('Error fetching teacher timetable: $e');
      throw Exception('Error fetching teacher timetable: $e');
    }
  }


  Future<List<dynamic>> fetchClassTimeTable(String day) async {
    try {
      print(day);
      SharedPreferences pref= await SharedPreferences.getInstance();
      String? accessToken=pref.getString("accessToken");
      String? Teacheremail=pref.getString("email");
      final response = await http.post(
        Uri.parse('$_baseUrl/timetable/fetch/teacher'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'accessToken': accessToken,
          'email': Teacheremail,
          'day': day,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        List<dynamic> timetable=data["timetable"];

        print(timetable);
        return timetable;
      } else {
        throw Exception('Failed to fetch teacher timetable. Status code: ${response.statusCode}, Body: ${response.body}');
      }
    } catch (e) {
      print('Error fetching teacher timetable: $e');

      throw Exception('Error fetching teacher timetable: $e');
    }
  }
}