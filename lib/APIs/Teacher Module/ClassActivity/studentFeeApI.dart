import 'dart:convert';
import 'package:http/http.dart' as http;
class StudentFeesAPi{
      static const String _baseUrl = "https://school.bdssl.edu.in/api";
      Future<List<dynamic>>  fetchStudentData(String accessToken,int start) async {
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
      print("start $start");
        final url = Uri.parse('$_baseUrl/fee/fetch/classTeacher?&start=$start&end=5&session=$session');

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
            print("APi response $data");
         var students=data["students"];
            return students ;

          } else {
            throw Exception('Failed to load student: ${response.body}');
          }
        } catch (e) {
          throw Exception('Error fetching student: $e');
        }
      }


}