import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class TeacherTimetableAPI {

  Future<Map<String, dynamic>> fetchTeacherTimetable(String day) async {
    try {
      SharedPreferences pref= await SharedPreferences.getInstance();
      String? accessToken=pref.getString("accessToken");
      String? Teacheremail=pref.getString("email");
      final response = await http.post(
        Uri.parse('http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8010/timetable/fetch/teacher'),
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
}