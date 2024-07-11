import 'dart:convert';

import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';
class StudentApi{
  Future<List<Student>> fetchStudents(String accessToken,String currentClass,String section,int start ,int end) async {
    final response = await http.post(
      Uri.parse('http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8007/fetchMultiple/student'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'accessToken': accessToken,
        'currentClass': currentClass,
        'section': section,
        'start': start,
        'end': end
      }),
    );

    if (response.statusCode == 200) {
      final List<dynamic> studentsJson = jsonDecode(response.body)['Students'];
      print(studentsJson);
      return studentsJson.map((json) => Student.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load students');
    }
  }

  Future<Student> fetchStudentData(String accessToken, String email) async {
    final url = Uri.parse("http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8007/fetchSingle/student");

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
          return Student.fromJson(studentDetails.first);
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
    final url=Uri.parse("https://loginapi-y0aa.onrender.com/edit/student");
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