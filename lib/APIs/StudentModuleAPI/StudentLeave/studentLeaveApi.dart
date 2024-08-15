import 'dart:convert';
import 'package:http/http.dart' as http;
class TeacherLeaveApi{
  static const String _baseUrl = 'https://philester.com';


  Future<List<dynamic>>  studentLeaveData(String accessToken,int start,String status) async {

    final url = Uri.parse('$_baseUrl/leave/fetch/particularStudent?start=$start&end=10&status=$status');

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
        print("data $data");
        var leaves=data["Leaves"];

        return leaves ;

      } else {
        throw Exception('Failed to load leaves: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching leaves: $e');
    }
  }

  Future<Map<dynamic,dynamic>>  studentLeaveApply(String accessToken,String startDate,String endDate,String reason) async {
    final url = Uri.parse('$_baseUrl/leave/apply');

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
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print("APi response $data");
        return data ;

      } else {
        throw Exception('Failed to apply leaves: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error on apply leaves: $e');
    }
  }

  Future<dynamic>  deleteLeave(String accessToken,String leaveID) async {
    final url = Uri.parse('$_baseUrl/leave/delete?leaveId=$leaveID');

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

  Future<dynamic>  updateLeave(String accessToken,String docID, Map<String,dynamic> updateData) async {
    print(updateData);
    print(docID);
    final url = Uri.parse('$_baseUrl/leave/update');

    try {
      final response = await http.put(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          "leaveId": docID,
          'startDate': updateData["startDate"],
          'endDate':  updateData["endDate"],
          'reason':  updateData["reason"],
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        return data["status"] ;

      } else {
        throw Exception('Failed to update leaves: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on update leaves: $e');
    }
  }

  Future<dynamic>  getStats(String accessToken) async {


    final url = Uri.parse('$_baseUrl/leave/fetch/stats');

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
        print("Api response $data");

        return data;

      } else {
        throw Exception('Failed to load stats: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on load stats: $e');
    }
  }


}