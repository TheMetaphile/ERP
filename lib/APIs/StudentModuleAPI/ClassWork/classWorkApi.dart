import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ClassWorkAPI {
  static const String _baseUrl = 'https://philester.com';

  Future<List<dynamic>> fetchClasswork(String accessToken, String section,String subject,int start) async {

    print("section $section");
    print("subject $subject");

    String month=DateTime.now().month.toString();
    String year=DateTime.now().year.toString();

    print("month $month");
    print("Year $year");

    final url = Uri.parse(
        '$_baseUrl/classwork/fetch/student?class=9th&month=$month&year=$year&section=$section&subject=$subject&start=$start&end=4');

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
        print("classwork $data");
        return data["classwork"];
      } else {
        throw Exception('Failed to load classwork: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching classwork: $e');
    }
  }
}