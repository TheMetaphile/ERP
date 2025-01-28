import 'dart:convert';
import 'package:http/http.dart' as http;
class TeacherLeaveApi{
  static const String _baseUrl = 'https://school.bdssl.edu.in/api';


  Future<List<dynamic>>  teacherLeaveData(String accessToken,int start,String session) async {

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

        return leaves ;

      } else {
        throw Exception('Failed to load leaves: ${response.body}');
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

  Future<dynamic>  deleteLeave(String accessToken,String leaveID,String session) async {
    final url = Uri.parse('$_baseUrl/teacherleave/delete?leaveId=$leaveID&session=$session');

    try {
      final response = await http.delete(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print(data);
        return data["status"] ;

      } else {
        throw Exception('Failed to delete leaves: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on delete leaves: $e');
    }
  }

  Future<dynamic>  updateLeave(String accessToken,String docID, String session,Map<String,dynamic> updateData) async {
    print(updateData);

    final url = Uri.parse('$_baseUrl/teacherleave/update?leaveId=$docID&session=$session');

    try {
      final response = await http.put(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'startDate': updateData["startDate"],
          'endDate':  updateData["endDate"],
          'reason':  updateData["reason"],
          'type':  updateData["type"],
          'session':  updateData["session"],
          'applyOn':  updateData["applyOn"],
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        return data["status"] ;

      } else {
        throw Exception('Failed to apply leaves: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on apply leaves: $e');
    }
  }

  Future<dynamic>  getStats(String accessToken,String session) async {


    final url = Uri.parse('$_baseUrl/teacherleave/fetch/stats?session=$session');

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

        return data;

      } else {
        throw Exception('Failed to load stats: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on load stats: $e');
    }
  }


}