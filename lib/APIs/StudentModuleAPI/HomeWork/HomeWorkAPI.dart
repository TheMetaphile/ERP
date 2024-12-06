import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class HomeworkAPI {
  static const String _baseUrl = 'https://school.bdssl.edu.in/api';

  Future<List<dynamic>> fetchHomeWork(String accessToken, String section,String subject,int start) async {

    print("section $section");
    print("subject $subject");

    String month=DateTime.now().month.toString();
    String year=DateTime.now().year.toString();

    print("month $month");
    print("Year $year");

    final url = Uri.parse(
        '$_baseUrl/homework/fetch/student?class=9th&month=$month&year=$year&section=$section&subject=$subject&start=$start&end=4');

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
        print("homework $data");
        return data["homework"];
      } else {
        throw Exception(' ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching homework: $e');
    }
  }
}