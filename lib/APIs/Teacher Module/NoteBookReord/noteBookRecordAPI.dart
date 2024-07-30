import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';

class NoteBookRecordAPI{

  static String baseUrl = "http://13.201.247.28:8000";

  Future<bool> uploadNoteBook( String accessToken, String Class,  String section,  String date,  String chapter, String topic, String session, String subject, List<String> submittedBy) async {

    print(jsonEncode({
      'class': Class,
      'section': section,
      'date': date,
      'chapter': chapter,
      'topic': topic,
      'session': session,
      'subject': subject,
      'submittedBy': submittedBy,
    }),);

    final url = Uri.parse('$baseUrl/notebook/upload/');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          'class': Class,
          'section': section,
          'date': date,
          'chapter': chapter,
          'topic': topic,
          'session': session,
          'subject': subject,
          'submittedBy': submittedBy,
        }),
      );

      if (response.statusCode == 200) {
        final status = jsonDecode(response.body)["status"];
        print(status);
        if(status){

          return true;
        }else{
          return false;
        }

      } else {
        return false;
        throw Exception('Failed upload classwork (${response.statusCode})');

      }
    } catch (e) {
      return false;
      throw Exception('Network error: $e');
    }
  }

    Future<List<dynamic>> notebookRecord(String accessToken,String Class,String section,String subject,String session,int start)
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
    print(Class);
    print(Class);
    print(section);
    print(subject);

    final url = Uri.parse('$baseUrl/notebook/fetch/teacher/all?class=$Class&section=$section&subject=$subject&session=$session&start=$start&count=');

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
        return data["notebookRecord"] ;
      } else {
        throw Exception('Failed to load notebookRecord: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching notebookRecord: $e');
    }
  }

  Future<Map<String,dynamic>> previousRecord(String accessToken,String docId,String session)
  async {

    final url = Uri.parse('$baseUrl/notebook/fetch/teacher/particular?docId=$docId&session=$session');

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
        return data ;
      } else {
        throw Exception('Failed to load notebookRecord: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching notebookRecord: $e');
    }
  }

  Future<dynamic> updateNoteBookRecord( String accessToken, String docID,  String session,  List<String> submittedBy)
  async {
    print(accessToken);
    print(jsonEncode({
      'docID': docID,
      "session":session,
      'submittedBy': submittedBy,
    }),);

    final url = Uri.parse('$baseUrl/notebook/update/submission');

    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          "docId" : docID,
          "session": session,
          "submittedBy" : submittedBy
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data);
        if(data["status"]==true){

          return data["status"];
        }else if(data["status"]==false){
          return data["status"];
        }
      } else {
        throw Exception('No student found (${response.statusCode})');
      }
    } catch (e) {

      throw Exception('Network error: $e');
    }
  }

  Future<dynamic> lastRecord(String accessToken,String subject,String email)
  async {

    final url = Uri.parse('$baseUrl/notebook/fetch/student/last?subject=$subject&email=$email');

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
        return data["last"] ;
      } else {
        throw Exception('Failed to last notebookRecord: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching notebookRecord: $e');
    }
  }
}