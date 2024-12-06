import 'dart:convert';
import 'package:http/http.dart' as http;


class DateSheetApi {
  static const String _baseUrl = 'https://school.bdssl.edu.in/api';

  Future<List<dynamic>> fetchDateSheet(String accessToken,String Class) async {
    print(accessToken);


    final url = Uri.parse(
        '$_baseUrl/fetchDateSheet');

    try {
      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          "accessToken":accessToken,
          "class": Class,

      }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print("api  response $data");
        return data["dateSheet"];
      } else {
        throw Exception('Failed to load dateSheet: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching dateSheet: $e');
    }
  }
}