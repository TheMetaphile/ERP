import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class NotebookRecordApi {
  static const String _baseUrl = 'https://school.bdssl.edu.in/api';

  Future<List<dynamic>> fetchNoteBookRecord(String accessToken, String subject) async {

    print("section $subject");
    if(subject.isEmpty){
      subject="Maths";
    }

    final url = Uri.parse(
        '$_baseUrl/notebook/fetch/student?subject=$subject');

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
          print("api response $data");
        return data["notebookRecord"];
      } else {
        throw Exception('Failed to load notebookRecord: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching notebookRecord: $e');
    }
  }
}