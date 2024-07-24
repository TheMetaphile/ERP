import 'dart:convert';
import 'package:http/http.dart' as http;


class ResultApi {
  static const String _baseUrl = 'http://13.201.247.28:8000';

  Future<Map<String,dynamic>> fetchResult(String accessToken,String email) async {
    final url = Uri.parse('$_baseUrl/result/fetch/teacher?email=$email');

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
        print(data.runtimeType);
        return data ;
      } else {
        throw Exception('Failed to load result: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching result: $e');
    }
  }

}