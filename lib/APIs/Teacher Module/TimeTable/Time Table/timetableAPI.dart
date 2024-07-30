// File: lib/APIs/TimetableApi/timetable_api.dart

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';



class TimetableApi {
  static const String baseUrl = 'https://philester.com';

  Future<List<dynamic>> fetchClassTeacherTimetable(String accessToken,String day) async {

    SharedPreferences pref= await SharedPreferences.getInstance();

   String? teacherClass=pref.getString("teacherClass");
   String? teacherSection=pref.getString("teacherSection");

   if(teacherClass==null && teacherSection==null){
     throw Exception("The teacherClass And teacherSection is Null");
   }

    String date=DateTime.now().toString().split(' ')[0];
    print("date $date");
    final url = Uri.parse('$baseUrl/timetable/fetch/student');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'accessToken': accessToken,
          'class': teacherClass,
          'section': teacherSection,
          'day': day,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print("Response $data");
        return data["$day"];
      } else {
        throw Exception('Failed to fetch timetable (${response.body})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<dynamic> fetchTimetableStructure(String accessToken) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/timeTableStructure/fetch'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'accessToken': accessToken,
          'classRange': '1st-12th',
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data;
      } else {
        print('Failed to load timetable structure. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
        throw Exception('Failed to load timetable structure. Status code:  (${response.body})');
      }
    } catch (e) {
      print('Error fetching timetable structure: $e');
      throw Exception('Failed to load timetable structure: $e');
    }
  }

  Future<List<dynamic>> fetchClassTimeTable(String accessToken , String email,String day) async {
    try {


      final response = await http.post(
        Uri.parse('$baseUrl/timetable/fetch/teacher'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'accessToken': accessToken,
          'email': email,
          'day': day,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        List<dynamic> timetable=data["timetable"];

        return timetable;
      } else {
        throw Exception('Failed to fetch teacher timetable. Status code:  (${response.body})');
      }
    } catch (e) {
      print('Error fetching teacher timetable: $e');

      throw Exception('Error fetching teacher timetable: $e');
    }
  }

  Future<List<dynamic>> fetchSubsituteTimeTable(String accessToken) async{
    DateTime currentDateTime=DateTime.now();
    String date=currentDateTime.toString().split(' ')[0];
    String calculateCurrentSession() {
      DateTime now = DateTime.now();
      int currentYear = now.year;
      int nextYear = currentYear + 1;

      if (now.isBefore(DateTime(currentYear, 3, 31))) {
        currentYear--;
        nextYear--;
      }

      return "$currentYear-${nextYear.toString().substring(2)}";
    }
    String session=calculateCurrentSession();
    print(date);
    print(session);

    final url = Uri.parse('$baseUrl/LectureSubstitute/fetch/checkSubstitute?date=$date&session=$session');

    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
         print(response.body);
        print("response $data");

        return data ;
      } else {
        throw Exception('Failed to load birthday: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching birthday: $e');
    }

  }
}