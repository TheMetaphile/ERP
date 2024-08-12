import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';



class SubstituteClassTeacherApi{

  static String baseUrl="https://philester.com";

  Future<Map<String,dynamic>> absenteeismFetch(String accessToken) async
  {
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

    final url = Uri.parse('$baseUrl/classTeacherSubstitute/fetch/checkLeave?date=2024-07-30&session=$session');

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
        print("response $data");
        return data ;
      } else {
        throw Exception('Failed to load absenteeism: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching absenteeism: $e');
    }
  }

  Future<Map<String,dynamic>> substitutionLog(String accessToken,int start) async
  {
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

    final url = Uri.parse('$baseUrl/classTeacherSubstitute/fetch/completeHistory?date=$date&session=$session&start=$start&end=10');

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
        print("response $data");
        return data ;
      } else {
        throw Exception('Failed to load absenteeism: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching absenteeism: $e');
    }
  }
}