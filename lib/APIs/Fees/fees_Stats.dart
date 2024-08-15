import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class FeesStatsApi {
  static const String _baseUrl = 'https://philester.com';

  Future<Map<String,dynamic>> fetchStats(String accessToken) async {


    final url = Uri.parse(
        '$_baseUrl/fee/fetch/stats');

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
        print("API data  $data");
        return data;
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching  Fees Stats: $e');
    }
  }
}