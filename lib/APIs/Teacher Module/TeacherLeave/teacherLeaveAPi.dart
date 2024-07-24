import 'dart:convert';
import 'package:http/http.dart' as http;
class TeacherLeaveApi{
  static const String _baseUrl = 'http://13.201.247.28:8000';


  Future<List<dynamic>>  teacherLeaveData(String accessToken,int start,String session) async {
    print(start);
    print(session);
    final url = Uri.parse('$_baseUrl/teacherleave/fetch/teacher?start=$start&end=4&session=$session');

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
        var leaves=data["Leaves"];
      print(leaves);

        return leaves ;

      } else {
        throw Exception('Failed to load leaves: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching leaves: $e');
    }
  }

  Future<Map<dynamic,dynamic>>  teacherLeaveApply(String accessToken,String startDate,String endDate,String reason,String type,String session,String applyOn) async {
    final url = Uri.parse('$_baseUrl/teacherleave/apply');

    try {
      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'startDate': startDate,
          'endDate': endDate,
          'reason': reason,
          'type': type,
          'session': session,
          'applyOn': applyOn,
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);



        return data ;

      } else {
        throw Exception('Failed to apply leaves: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error on apply leaves: $e');
    }
  }



}