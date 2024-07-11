import 'dart:convert';
import 'package:http/http.dart' as http;


class ResultApi {
  static const String _baseUrl = 'http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8009';

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
        return data ;
      } else {
        throw Exception('Failed to load result: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching result: $e');
    }
  }
}