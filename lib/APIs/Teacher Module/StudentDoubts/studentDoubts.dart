// File: lib/APIs/DoubtsApi/doubts_api.dart

import 'dart:convert';
import 'package:http/http.dart' as http;

import '../../StudentsData/student.dart';

class Doubt {
  final String id;
  final String subject;
  final String question;
  final String imageUrl;
  final String status;
  final String date;
  final List<Student> students;
  final String? replyDate;
  final String? solution;

  Doubt({
    required this.id,
    required this.subject,
    required this.question,
    required this.imageUrl,
    required this.status,
    required this.date,
    required this.students,
    this.replyDate,
    this.solution,
  });

  factory Doubt.fromJson(Map<String, dynamic> json) {
    return Doubt(
      id: json['_id'],
      subject: json['subject'],
      question: json['question'],
      imageUrl: json['imageUrl'],
      status: json['status'],
      date: json['date'],
      students: (json['student'] as List)
          .map((studentJson) => Student.fromJson(studentJson))
          .toList(),
      replyDate: json['replyDate'],
      solution: json['solution'],
    );
  }
}

// class Student {
//   final String name;
//   final String profileLink;
//   final int rollNumber;
//
//   Student({
//     required this.name,
//     required this.profileLink,
//     required this.rollNumber,
//   });
//
//   factory Student.fromJson(Map<String, dynamic> json) {
//     return Student(
//       name: json['name'],
//       profileLink: json['profileLink'],
//       rollNumber: json['rollNumber'],
//     );
//   }
// }
class DoubtsApi {
  static const String baseUrl = 'http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8001';

  Future<List<Doubt>> fetchTeacherDoubts(String accessToken, String classNumber, String section, String subject,String status, int start) async {
    final url = Uri.parse('$baseUrl/doubts/fetch/teacher?class=$classNumber&section=$section&subject=$subject&status=$status&start=$start&end=10');

    try {
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken'
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        final doubts = List<Doubt>.from(
          data['doubts'].map((doubtJson) => Doubt.fromJson(doubtJson)),
        );

        return doubts;
        return doubts;
      } else {
        throw Exception('Failed to fetch doubts (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  Future<bool> updateDoubt({required String accessToken, required String doubtId, required String classNumber, required String solution, required String replyDate,}) async {
    final url = Uri.parse('$baseUrl/doubts/update/teacher?id=$doubtId');

    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          'class': classNumber,
          'solution': solution,
          'replyDate': replyDate,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final status = data['status'];
        return status['matchedCount'] == 1;
      } else {
        throw Exception('Failed to update doubt (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
// You can add more methods here for other API endpoints if needed
