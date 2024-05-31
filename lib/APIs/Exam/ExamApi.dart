import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/APIs/TeacherData/teacher.dart';
class ExamApi{
  Future<List<Teacher>> fetchExams(String accessToken) async {
    final url = Uri.parse('https://examapi-jep8.onrender.com/fetchExams');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'accessToken': accessToken}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        return data["Exams"];
      } else {
        throw Exception('Failed to fetch teachers');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<bool> scheduleExam({
    required String accessToken,
    required String classValue,
    required String subject,
    required DateTime date,
    required TimeOfDay time,
    required String duration,
  }) async {
    final url = Uri.parse('https://examapi-jep8.onrender.com/ScheduleExams');

    try {
      String date1="${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}.".toString();
      String time1="${time.hour}:${time.minute}".toString();
      print(accessToken);
      print(date1);
      print(time1);
      print(classValue);
      print(subject);
      print(duration);
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'accessToken': accessToken,
          'Class': classValue,
          'subject': subject,
          'date': date1,
          'time': time1,
          'duration': duration,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data['status']);
        return data['status'];
      } else {
        throw Exception('Failed to schedule exam');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}