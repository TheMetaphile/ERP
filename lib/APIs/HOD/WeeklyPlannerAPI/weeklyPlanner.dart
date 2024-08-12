import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';

class WeeklyPlannerHodAPI{

  static String baseUrl = "https://philester.com";


  Future<Map<String,dynamic>> fetchPlan(String accessToken,String Class,String section,String subject,String startingDate)

  async {
    if (Class == "" && section == "" && subject == "") {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? jsonString = prefs.getString('class_section_subjects');

      // Decode the JSON string
      Map<String, dynamic> data = jsonDecode(jsonString!);

      // Access the nested structure
      String firstClass = data.keys.first;
      Map<String, dynamic> sections = data[firstClass];
      String firstSection = sections.keys.first;
      List<dynamic> subjects = sections[firstSection];
      String firstSubject = subjects.first;

      Class = firstClass;
      section = firstSection;
      subject = firstSubject;
    }
 
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

       print(session);
       print(startingDate);
    print(Class);
    print(section);
    print(subject);

    final url = Uri.parse('$baseUrl/lessonPlan/fetch/coordinator?class=$Class&section=$section&subject=$subject&session=$session&startingDate=$startingDate');

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
        print("response data $data");
        return data;
      } else {
        throw Exception('Failed to load lessonPlan: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching lessonPlan: $e');
    }
  }



  Future<dynamic> update( String accessToken, String docID,  String remark, String status,)
  async {

    print(jsonEncode({
      "remark" : remark,
    }),);
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
    final url = Uri.parse('$baseUrl/lessonPlan/update/coordinator?id=$docID&status=$status&remark=$remark&session=$session');

    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          "remark" : remark,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data);
        return data["status"];
      } else {
        throw Exception('No student found (${response.body})');

      }
    } catch (e) {

      throw Exception('Network error: $e');
    }
  }

}