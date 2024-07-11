

import 'dart:convert';

import 'package:http/http.dart' as http;

class StudentLeaveAPI {
  String baseUrl = 'http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8004';


  Future<List<dynamic>> fetchLeaves(String accessToken, int start, String status) async {

    final url = Uri.parse('$baseUrl/leave/fetch/classTeacher?start=$start&end=10&status=$status');
    try {
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken'
        },
      );



      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        if (data["StudentsLeaves"] == null) {
          throw Exception('StudentsLeaves is null in the response');
        }
        final studentsLeaves = data["StudentsLeaves"];
        return studentsLeaves;
      } else {
        throw Exception('Failed to fetch leaves (Status code: ${response.statusCode}, Body: ${response.body})');
      }
    } catch (e) {
      print('Error in fetchLeaves: $e');
      throw Exception('Network error: $e');
    }
  }
  Future<bool> updateLead(String accessToken, String decision,String leaveId,) async {

    final url = Uri.parse('$baseUrl/leave/update');
    try {

      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },

        body: json.encode({
          'status': decision,
          'leaveId': leaveId,

        }),
      );



      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        return data["status"];
      } else {
        throw Exception('Failed to update (Status code: ${response.statusCode}, Body: ${response.body})');
      }
    } catch (e) {
      print('Error in fetchLeaves: $e');
      throw Exception('Network error: $e');
    }
  }

}