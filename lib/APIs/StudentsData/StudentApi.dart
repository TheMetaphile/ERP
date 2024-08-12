import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';
class StudentApi{

  static const String _baseUrl = 'https://philester.com';
  Future<List<dynamic>> fetchStudents(String accessToken,String Class,String section,int start) async {

    if (Class == "" && section == "") {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? jsonString = prefs.getString('class_section_subjects');

      // Decode the JSON string
      Map<String, dynamic> data = jsonDecode(jsonString!);

      // Access the nested structure
      String firstClass = data.keys.first;
      Map<String, dynamic> sections = data[firstClass];
      String firstSection = sections.keys.first;
      // List<dynamic> subjects = sections[firstSection];
      // String firstSubject = subjects.first;

      Class = firstClass;
      section = firstSection;

    }

    final response = await http.post(
      Uri.parse('$_baseUrl/fetchMultiple/student'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'accessToken': accessToken,
        'currentClass': Class,
        'section': section,
        'start': start,
        'end': 10
      }),
    );

    if (response.statusCode == 200) {
      final List<dynamic> students = jsonDecode(response.body)['Students'];
      return students;
    } else {
      throw Exception('Failed to  load students');
    }
  }

  Future<List> fetchSingleUser(String accessToken, String email) async {
    final url = Uri.parse("$_baseUrl/fetchSingle/student");

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonEncode({
          'accessToken': accessToken,
          'email': email
        }),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        final List<dynamic> studentDetails = responseData['StudentDetails'];
        if (studentDetails.isNotEmpty) {
          return  studentDetails;
        } else {
          throw Exception('No student data found');
        }
      } else {
        throw Exception('Failed to fetch student data (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<bool> studentEditData(String accessToken, Map<String,String> editFields) async{
    final url=Uri.parse("https://philester.com/edit/student");
    Map<String,String> body={
      "accessToken":accessToken,
    };
    body.addAll(editFields);

    try{
      final response=await http.put(
        url,
        headers: {
          'Content-Type':'application/json'
        },
        body: jsonEncode(body),
      );
      if(response.statusCode==200){
         var data=jsonDecode(response.body);
         return data['status'] ?? false;
      }else{
        throw Exception('Failed to edit a student (${response.statusCode})');
      }

    }catch(e){
      throw Exception('Network error: $e');

    }


  }


}