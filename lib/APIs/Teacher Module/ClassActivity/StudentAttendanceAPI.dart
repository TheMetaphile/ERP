import 'dart:convert';
import 'package:http/http.dart' as http;

import '../../StudentsData/student.dart';

class StudentService {
    String baseUrl = 'http://13.201.247.28:8000';

   Future<List<Student>> fetchStudents(String date,String accessToken ,int start,) async {
    final url = Uri.parse('$baseUrl/studentAttendance/fetch/student/list?date=$date&start=$start&end=10');

    try {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $accessToken'},
      );

      print('Raw API response: ${response.body}'); // Print raw API response

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        final List<dynamic> studentsList = data['studentsList'];
        return studentsList.map((json) => Student.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load students: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching student data: $e');
    }
  }
     Future<bool> markAttendance(String accessToken, String date, List<Map<String, String>> studentAttendance) async {
      final url = Uri.parse('$baseUrl/studentAttendance/mark');

      try {
        final response = await http.post(
          url,
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode({
            'accessToken': accessToken,
            'date': date,
            'studentAttendance': studentAttendance,
          }),
        );

        if (response.statusCode == 200) {
          final Map<String, dynamic> data = json.decode(response.body);
          return data['status'] == true;
        } else {
          throw Exception('Failed to mark attendance: ${response.statusCode}');
        }
      } catch (e) {
        print('Error marking attendance: $e');
        rethrow;
      }
    }

    Future<Map<String, dynamic>> fetchAttendance(String month, String year, String accessToken) async {
      final response = await http.get(
        Uri.parse('$baseUrl/studentAttendance/fetch/classTeacher?month=$month&year=$year'),
        headers: {'Authorization': 'Bearer $accessToken'},
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load attendance data');
      }
    }
}