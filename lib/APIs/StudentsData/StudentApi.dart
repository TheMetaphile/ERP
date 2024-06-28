import 'dart:convert';

import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';
class StudentApi{
  Future<List<Student>> fetchStudents(String accessToken) async {

    final url=Uri.parse("https://loginapi-y0aa.onrender.com/fetchMultiple/student");
    try{
      final response=await http.post(
          url,
        headers: {
            'Content-Type':'application/json'
        },
        body: jsonEncode({
          'accessToken':accessToken
        }),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final students = List<Student>.from(
          data['Students'].map((studentJson) => Student.fromJson(studentJson)),
        );
        return students;
      } else {
        throw Exception('Failed to fetch teachers');
      }
    }catch (e) {
      throw Exception('Network error: $e');
    }
  }
  Future<Map<String, dynamic>> fetchStudentData(String accessToken,String email) async {

    final url=Uri.parse("https://loginapi-y0aa.onrender.com/fetchSingle/student");
    try{
      final response=await http.post(
        url,
        headers: {
          'Content-Type':'application/json'
        },
        body: jsonEncode({
          'accessToken':accessToken,
          'email':email
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        List<dynamic> StudentDetailsList = data["StudentDetails"];

        if (StudentDetailsList.isNotEmpty) {
          Map<String, dynamic> studentDetails = StudentDetailsList[0];
          print(studentDetails);
          return studentDetails;
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