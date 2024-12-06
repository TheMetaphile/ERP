import 'dart:convert';

import 'package:http/http.dart' as http;
class NotificationAPI{

  static const String _baseUrl = 'https://school.bdssl.edu.in/api';

  Future<bool> addToken( String accessToken, String deviceToken) async {


    final url = Uri.parse('$_baseUrl/notification/addToken');

    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
         'token' : deviceToken
        }),
      );

      if (response.statusCode == 200) {
        final status = jsonDecode(response.body);
        print(status);
        return status["status"]?? false;
      } else {
        throw Exception('${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<bool> removeToken( String accessToken,String deviceToken,) async {
    final url = Uri.parse('$_baseUrl/student/removeToken');

    try {
      final response = await http.delete(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          'token' : deviceToken
        }),
      );

      if (response.statusCode == 200) {
        final status = jsonDecode(response.body);
        print(status);
        return status["status"]?? false;
      } else {
        throw Exception('${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

}