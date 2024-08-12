import 'dart:convert';
import 'package:http/http.dart' as http;
class NoticeBoardAPI{
  static const String _baseUrl = 'https://philester.com';

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

  Future<dynamic>  noticeUpload(String accessToken,String type,String title,String description, List<String> emailIds,String Class,String section )async {


    String calculateCurrentSession() {
      DateTime now = DateTime.now();
      int currentYear = now.year;
      int nextYear = currentYear + 1;

      if (now.isBefore(DateTime(currentYear, 3, 31))) {
        currentYear--;
        nextYear--;
      }

      return "$currentYear-${nextYear.toString().substring(2)}";
    }
    String session=calculateCurrentSession();
    String date = DateTime.now().toString().split(" ")[0].toString();
    print(date);
    print(Class);
    print(section);
    print(jsonEncode({
      "title": title,
      "type": type,
      "description": description,
      "session": session,
      "date": date,
      "Classes": [
        {
          "Class": Class,
          "sections": ["$section"]
        }
      ]
    }));

    final url = Uri.parse('$_baseUrl/notice/upload/teacher');

    try {
      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: type == "Particular Classes" ?
        jsonEncode({
          "title": title,
          "type": type,
          "description": description,
          "session": session,
          "date": date,
          "Classes": [
            {
              "Class": Class,
              "sections": ["$section"]
            }
          ]
        }):
        jsonEncode({
          "title": title,
          "type": type,
          "description": description,
          "session": session,
          "date": date,
          "emailIds": emailIds

        })
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
         print("status $data");


        return data["status"] ;

      } else {
        throw Exception('Failed to upload notice: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on upload notice: $e');
    }
  }



}