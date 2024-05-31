
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:untitled/APIs/TeacherData/teacher.dart';
class TeacherApi{
  Future<List<Teacher>> fetchTeachers(String accessToken) async {
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/fetchMultiple/teacher');

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
        final teachers = List<Teacher>.from(
          data['Teachers'].map((teacherJson) => Teacher.fromJson(teacherJson)),
        );
        return teachers;
      } else {
        throw Exception('Failed to fetch teachers');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<Map<String, dynamic>> fetchTeacherData(String accessToken , String employeeID) async{
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/fetchSingle/teacher');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(
            {'accessToken': accessToken,
              'employeeId':employeeID
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        List<dynamic> teacherDetailsList = data["TeacherDetails"];

        if (teacherDetailsList.isNotEmpty) {
          Map<String, dynamic> teacherDetails = teacherDetailsList[0];
          return teacherDetails;
        } else {
          throw Exception('No  teacher details found');
        }
      } else {
        throw Exception('Failed to fetch teachers (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

}