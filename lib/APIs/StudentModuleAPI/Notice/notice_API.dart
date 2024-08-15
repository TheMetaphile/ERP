import 'dart:convert';
import 'package:http/http.dart' as http;
class NoticeBoardAPI{
  static const String _baseUrl = 'https://philester.com';

  Future<List<dynamic>> fetchNoticeBoard(String accessToken,int start) async {
    print("accessToken $accessToken");

    final url = Uri.parse('$_baseUrl/notice/fetch/student?start=$start&limit');

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

        return data["notices"] ;
      } else {
        throw Exception('Failed to load notices: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching notices: $e');
    }
  }



}