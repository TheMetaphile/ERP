import 'dart:convert';
import 'package:http/http.dart' as http;
class StudentFeesAPi{
      static const String _baseUrl = "https://philester.com";
      Future<List<dynamic>>  fetchStudentData(String accessToken,int start) async {

        final url = Uri.parse('$_baseUrl/fee/fetch/classTeacher?end=10&start=$start');

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
         var students=data["output"];
            return students ;

          } else {
            throw Exception('Failed to load student: ${response.body}');
          }
        } catch (e) {
          throw Exception('Error fetching student: $e');
        }
      }


}