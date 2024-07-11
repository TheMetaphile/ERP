
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:untitled/APIs/TeacherData/teacher.dart';
class TeacherApi{
  Future<List<Teacher>> fetchTeachers(String accessToken) async {
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/fetchMultiple/teacher');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'accessToken': accessToken}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final teachers = List<Teacher>.from(
          data['Teachers'].map((teacherJson) => Teacher.fromJson(teacherJson)),
        );
        return teachers;
      } else {
        throw Exception('Failed to fetch teachers');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<Map<String, dynamic>> fetchTeacherData(String accessToken , String employeeID) async{
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/fetchSingle/teacher');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(
            {'accessToken': accessToken,
              'employeeId':employeeID
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        List<dynamic> teacherDetailsList = data["TeacherDetails"];

        if (teacherDetailsList.isNotEmpty) {
          Map<String, dynamic> teacherDetails = teacherDetailsList[0];
          return teacherDetails;
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
  Future<bool> teacherEditData(String accessToken, Map<String,String> editFields) async{
    final url=Uri.parse("https://loginapi-y0aa.onrender.com/edit/teacher");
    Map<String,String> body={
      "accessToken":accessToken,
    };
    body.addAll(editFields);
    print(body);
    try{
      final response=await http.put(
        url,
        headers: {
          'Content-Type':'application/json'
        },
        body: jsonEncode(body),
      );
      if(response.statusCode==200){
        final data = jsonDecode(response.body);
        return data['status'] ?? false;
      }else{
        throw Exception('Failed to edit a student (${response.statusCode})');
      }

    }catch(e){
      throw Exception('Network error: $e');
    }


  }

  Future<bool> assignRollNumber(String accessToken,String currentClass, String section,) async {
    try {
      final url = Uri.parse('https://loginapi-y0aa.onrender.com/assignRollNumber');
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'accessToken': accessToken,
          'currentClass': currentClass,
          'section': section,
        }),
      );

      if (response.statusCode == 200) {
        final decodedResponse = jsonDecode(response.body);
        return decodedResponse['status'] ?? false;
      } else {
        print('Failed to assign roll numbers. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
        return false;
      }
    } catch (e) {
      print('Error assigning roll numbers: $e');
      return false;
    }
  }

}