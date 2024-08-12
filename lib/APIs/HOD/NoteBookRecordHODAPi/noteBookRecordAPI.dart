import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';

class NoteBookRecordHODAPI{

  static String baseUrl = "http://philester.com";


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
    print(session);
    print(Class);
    print(section);
    print(subject);
    print("Authorization: Bearer $accessToken");


    final url = Uri.parse('$baseUrl/notebook/fetch/coordinator/all?class=$Class&section=$section&subject=$subject&session=$session&start=$start&count=');



    try {
      Map<String,String> headers={
        "Authorization": 'Bearer $accessToken',
        'Content-Type': 'application/json',
      };
      print("headers $headers");
      final response = await http.get(
        url,
        headers: headers
      );

      print("response ${response.headers}");
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print("fetched data $data");
        return data["notebookRecord"] ;
      } else {
        print(response.body);
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching notebookRecord: $e');
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