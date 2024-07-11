import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/APIs/TeacherData/teacher.dart';
class ExamApi{
  Future<List<dynamic>> fetchExams(String accessToken) async {
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

  Future<bool> updateExam(String accessToken, String classValue, String? stream, String examId, Map<String, dynamic> update,) async {

    try {
      final url = Uri.parse('https://examapi-jep8.onrender.com/updateExam');
      final headers = {
        'Content-Type': 'application/json',
      };
      final body = jsonEncode({
        'accessToken': accessToken,
        'class': classValue,
        if (stream != null) 'stream': stream,
        'examId': examId,
        'update': update,
      });
      print(body);
      final response = await http.put(url, headers: headers, body: body);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data);
        print('Response data: $data');
        return data['status'] ?? false;
      } else {
        print('Response body: ${jsonDecode(response.body)}');
        throw Exception('Failed to update exam');
      }
    }catch(e){
      print('Error  on updating : $e');
      return false;
    }
  }

  Future<bool> deleteExam(String accessToken, String examId, String classValue, String? stream,) async {
 try{
   final url = Uri.parse('https://examapi-jep8.onrender.com/deleteExam');
   final headers = {
     'Content-Type': 'application/json',
   };

   final body = jsonEncode({
     'accessToken': accessToken,
     'examId': examId,
     'class': classValue,
     if (stream != null) 'stream': stream,
   });

   final response = await http.delete(url, headers: headers, body: body);

   if (response.statusCode == 200) {
     final data = jsonDecode(response.body);
     return data['status'] ?? false;
   } else {
     throw Exception('Failed to delete exam');

   }
 }catch(e){
   print('Error  on deleting : $e');
   return false;
 }
  }
  Future<bool> scheduleExam( String accessToken,  String classValue,  String subject, DateTime date, TimeOfDay time,  String duration,) async {
    final url = Uri.parse('https://examapi-jep8.onrender.com/ScheduleExams');
    try {
      String date1="${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}.".toString();
      String time1="${time.hour}:${time.minute}".toString();
     final body=jsonEncode({
        'accessToken': accessToken,
        'Class': classValue,
        'subject': subject,
        'date': date1,
        'time': time1,
        'duration': duration,
      });
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      );
        print(body);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data['status']);
        return data['status'];
      } else {
        throw Exception('Failed to sschedule exam');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}