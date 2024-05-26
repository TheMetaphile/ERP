
import 'dart:convert';
import 'package:http/http.dart' as http;
class TeacherDetails {
  final String email;
  final String phoneNumber;
  final String experience;
  final String education;
  final String permanentAddress;

  TeacherDetails({
    required this.email,
    required this.phoneNumber,
    required this.experience,
    required this.education,
    required this.permanentAddress,
  });

  factory TeacherDetails.fromJson(Map<String, dynamic> json) {
    return TeacherDetails(
      email: json['email'],
      phoneNumber: json['phoneNumber'],
      experience: json['experience'],
      education: json['education'],
      permanentAddress: json['permanentAddress'],
    );
  }
}
class SingleTeacherDetail{
  Future<TeacherDetails> fetchTeacherDetails(
      String accessToken, String employeeId) async {
    final url = Uri.parse(
        'https://loginapi-y0aa.onrender.com/fetchSingle/teacher');
    final body = jsonEncode({
      "accessToken": accessToken,
      "employeeId": employeeId
    });
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final teacherDetails = TeacherDetails.fromJson(data['TeacherDetails'][0]);
        return teacherDetails;
      } else {
        throw Exception('Failed to fetch teacher details');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

// Your other API functions...
}
