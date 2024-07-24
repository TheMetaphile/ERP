
import 'dart:convert';
import 'package:http/http.dart' as http;

class TimeTableStructureAPI {
  static const String baseUrl = 'http://13.201.247.28:8000';

  Future<Map<String, dynamic>> fetchTimeTableStructure(String accessToken, String classRange,) async {

    final response = await http.post(
      Uri.parse('$baseUrl/timeTableStructure/fetch'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'accessToken': accessToken,
        'classRange': classRange,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to fetch time table structure');
    }
  }
  Future<bool> createTimeTableStructure(String accessToken, String classRange, String numberOfLecture, String durationOfEachLecture, String firstLectureTiming, String numberOfLecturesBeforeLunch, String durationOfLunch) async {
    final body = jsonEncode({
      'accessToken': accessToken,
      'classRange': classRange,
      'numberOfLecture': numberOfLecture,
      'durationOfEachLeacture': durationOfEachLecture,
      'firstLectureTiming': firstLectureTiming,
      'numberOfLeacturesBeforeLunch': numberOfLecturesBeforeLunch,
      'durationOfLunch': durationOfLunch,
    });
    print(body);
    final response = await http.post(
      Uri.parse('$baseUrl/timeTableStructure/create'),
      headers: {'Content-Type': 'application/json'},
      body: body,
    );

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      if (responseData.containsKey('status')) {
        return responseData['status'];
      } else {
        return false;
      }
    } else {
      throw Exception('Failed to create time table structure');
    }
  }
  Future<bool> updateTimeTableStructure(String accessToken, String classRange, Map<String, dynamic> updateData) async {
    final body = jsonEncode({
      'accessToken': accessToken,
      'classRange': classRange,
      'update': updateData,
    });
    print(body);
    final response = await http.put(
      Uri.parse('$baseUrl/timeTableStructure/update'),
      headers: {'Content-Type': 'application/json'},
      body: body,
    );

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      return responseData is Map && responseData.containsKey('status') && responseData['status'];
    } else {
      throw Exception('Failed to update time table structure');
    }
  }

  // Future<Map<String, dynamic>> fetchTimetable(String accessToken, String classsRange, String section) async {
  //   try {
  //     print("api call");
  //     final response = await http.post(
  //       Uri.parse('http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8010/timetable/fetch'),
  //       headers: <String, String>{
  //         'Content-Type': 'application/json',
  //       },
  //       body: jsonEncode(<String, String>{
  //         'accessToken': accessToken,
  //         'class': classsRange,
  //         'section': section,
  //       }),
  //     );
  //
  //     if (response.statusCode == 200) {
  //       final timetable = jsonDecode(response.body);
  //       print(timetable);
  //       return timetable;
  //     } else {
  //       throw Exception('Failed to fetch timetable. Status code: ${response.statusCode}, Body: ${response.body}');
  //     }
  //   } catch (e) {
  //     print('Error fetching timetable: $e');
  //     throw Exception('Error fetching timetable: $e');
  //   }
  // }
}