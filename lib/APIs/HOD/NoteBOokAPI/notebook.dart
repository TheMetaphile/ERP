import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';



class NoteBooksRecords{

  static String baseUrl="https://school.bdssl.edu.in/api";

  Future<List<dynamic>> fetchNoteBooksRecords(String accessToken,String Class,String section,String subject,int start) async{
    print("accessToken $accessToken");
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

    print("Class $Class");
    print("section $section");
    print("subject $subject");
    print("session $session");

    final url = Uri.parse(
        '$baseUrl/notebook/fetch/coordinator/all?class=$Class&section=$section&subject=$subject&session=$session&start=$start&count=10');

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
        return data["notebookRecord"];
      } else {
        print(response.body);
        throw Exception('${response.body}');
      }
    } catch (e) {
      print("Error $e");
      throw Exception('Error fetching  notebookRecord : $e');
    }
  }

  Future<dynamic> updateRemark( String accessToken, String docID,  String remark, String session,)
  async {

    print(jsonEncode({
      "remark" : remark,
    }),);

    final url = Uri.parse('$baseUrl/notebook/update/remark?docId=$docID&session=$session');

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