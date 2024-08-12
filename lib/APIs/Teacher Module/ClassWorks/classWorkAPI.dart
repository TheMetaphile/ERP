import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ClassWorkAPI{
  static const String _baseUrl = 'https://philester.com';

  Future<List<dynamic>> fetchClassWorkList(String accessToken,String Class,String month,String year,String section,String subject,int start) async {

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

    final url = Uri.parse('$_baseUrl/classwork/fetch/teacher?class=$Class&month=$month&year=$year&section=$section&subject=$subject&start=$start&end=10');

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
        return data["classwork"] ;
      } else {
        throw Exception('Failed to load classwork: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching classwork: $e');
    }
  }



  Future<Map<dynamic,dynamic>> uploadClassWork( String accessToken, String email,  String date,  String Class,  String section, String subject, String chapter, String topic, String description) async {
    print(email);
    print(date);
    print(Class);
    print(section);
    print(subject);
    print(chapter);
    print(topic);
    print(description);

    final url = Uri.parse('$_baseUrl/classwork/upload');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          'email': email,
          'date': date,
          'class': Class,
          'section': section,
          'subject': subject,
          'chapter': chapter,
          'topic': topic,
          'description': description,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data);
        return data;
      } else {
        throw Exception('Failed upload classwork (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }


  Future<bool> updatedClassWork( String accessToken, String Class,  String id, String date, String subject, String chapter, String topic, String description) async {

    print(date);
    print(Class);
    print(id);
    print(subject);
    print(chapter);
    print(topic);
    print(description);

    final url = Uri.parse('$_baseUrl/classwork/update?class=$Class&id=$id&date=$date');

    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
         "update":{
           "subject": subject,
           "chapter": chapter,
           "topic": topic,
           "description": description,
         }
        }),
      );

      if (response.statusCode == 200) {
        final status = jsonDecode(response.body);
        print(status);
        return status["status"]?? false;
      } else {
        throw Exception('Failed upload classwork (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }


  Future<bool> deletedClassWork( String accessToken, String Class,String month,String year , String id,) async {


    print(Class);
    print(id);
    print(month);
    print(year);


    final url = Uri.parse('$_baseUrl/classwork/delete?class=$Class&month=$month&year=$year&id=$id');

    try {
      final response = await http.delete(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
      );

      if (response.statusCode == 200) {
        final status = jsonDecode(response.body);
        print(status);
        return status["status"]?? false;
      } else {
        throw Exception('Failed upload classwork (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }


}