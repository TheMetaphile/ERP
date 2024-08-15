import 'dart:convert';
import 'package:http/http.dart' as http;


class AttendanceApi {
  static const String _baseUrl = 'https://philester.com';

  Future<Map<String,dynamic>> fetchAttendance(String accessToken,int month,String year) async {


    print("month $month");
    print("Year $year");

    final url = Uri.parse(
        '$_baseUrl/studentAttendance/fetch/student?month=$month&year=$year');

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
        print("API data  $data");
        return data;
      } else {
        throw Exception('Failed to load Attendance Record: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching classwork: $e');
    }
  }
  Future<Map<String,dynamic>> attendanceStats(String accessToken) async {

   String month=DateTime.now().month.toString();
   String year=DateTime.now().year.toString();

    final url = Uri.parse(
        '$_baseUrl/studentAttendance/fetch/student/stats?month=$month&year=$year');

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
        print("API data  $data");
        return data;
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching  Attendance Stats: $e');
    }
  }
}