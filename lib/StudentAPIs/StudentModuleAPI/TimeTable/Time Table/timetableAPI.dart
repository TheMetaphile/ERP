import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../../SharedPreference/sharedPreferenceFile.dart';

class TimetableApi {
  static const String baseUrl = "http://10.0.2.2:8000";

  Future<Map<String, List<dynamic>>> fetchStudentTimetableAll(String accessToken) async {
    Map<String, dynamic> retrievedUserDetails = {};

    retrievedUserDetails = await UserPreferences.getDetails("userDetails");
    String Class = retrievedUserDetails["currentClass"] ?? "";
    String section = retrievedUserDetails["section"] ?? "";
    // Add this debugging
    print("=== DEBUGGING USER DETAILS ===");
    print("Full userDetails: $retrievedUserDetails");
    print("Class: '$Class'");
    print("Section: '$section'");
    print("Access Token: ${accessToken.substring(0, 20)}...");
    print("===============================");

    if (Class.isEmpty || section.isEmpty) {
      throw Exception("Class and section is Empty $Class $section");
    }

    final url = Uri.parse('$baseUrl/timetable/fetch/student');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          'class': Class,
          'section': section,
          // Don't send day parameter - just like React
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print("Full timetable response: $data");

        // Convert to the format your Flutter app expects
        Map<String, List<dynamic>> timetableData = {};
        if (data != null && data is Map) {
          data.forEach((key, value) {
            if (value is List) {
              timetableData[key.toLowerCase()] = List<dynamic>.from(value);
            }
          });
        }

        return timetableData;
      } else {
        throw Exception('Failed to fetch timetable (${response.body})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

// Keep the old method for backward compatibility but make it use the new one
  Future<List<dynamic>> fetchStudentTimetable(String accessToken, String day) async {
    try {
      final allData = await fetchStudentTimetableAll(accessToken);
      return allData[day.toLowerCase()] ?? [];
    } catch (e) {
      throw e;
    }
  }


  Future<dynamic> fetchTimetableStructure(String accessToken) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/timeTableStructure/fetch'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
        //  'accessToken': accessToken,
          'classRange': '1st-12th',
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data;
      } else {
        print('Failed to load timetable structure. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
        throw Exception('Failed to load timetable structure. Status code:  (${response.body})');
      }
    } catch (e) {
      print('Error fetching timetable structure: $e');
      throw Exception('Failed to load timetable structure: $e');
    }
  }
}