import 'dart:convert';
import 'package:http/http.dart' as http;

class BirthdayAPI{
  static const String _baseUrl = 'https://school.bdssl.edu.in/api';

  Future<Map<dynamic,dynamic>> fetchStudentBirthdays(String accessToken,String date) async {
    print(accessToken);
    final url = Uri.parse('$_baseUrl/birthday/student?date=$date');

    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return data ;
      } else {
        throw Exception('Failed to load birthday: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching birthday: $e');
    }
  }


  Future<Map<String,dynamic>> fetchTeacherBirthday(String accessToken,String date) async {
    final url = Uri.parse('$_baseUrl/birthday/teacher?date=$date');

    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print(data);
        return data ;
      } else {
        throw Exception('Failed to load birthday: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching birthday: $e');
    }
  }


}