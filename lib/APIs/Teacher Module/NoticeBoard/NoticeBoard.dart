import 'dart:convert';
import 'package:http/http.dart' as http;
class NoticeBoardAPI{
  static const String _baseUrl = 'http://13.201.247.28:8000';

  Future<List<dynamic>> fetchNoticeBoard(String accessToken,int start,String session,String status) async {
    print("accessToken $accessToken");

    final url = Uri.parse('$_baseUrl/notice/fetch/teacher?start=$start&limit=10&session=$session&type=$status');

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
        throw Exception('Failed to load notices: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching notices: $e');
    }
  }


}