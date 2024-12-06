// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import 'package:shared_preferences/shared_preferences.dart';
//
// class Subjects {
//   static const String _baseUrl = 'https://school.bdssl.edu.in/api';
//
//   Future<List<dynamic>> fetchSubjects(String accessToken, String Class, String section) async {
//     print("Class $Class");
//     print("section $section");
//
//     final url = Uri.parse(
//         '$_baseUrl/fetch/subjects?class=$Class&&section=$section');
//
//     try {
//       final response = await http.get(
//         url,
//         headers: {
//           'Authorization': 'Bearer $accessToken',
//           'Content-Type': 'application/json',
//         },
//       );
//
//       if (response.statusCode == 200) {
//         final data = json.decode(response.body);
//
//         return data["subjects"];
//       } else {
//         throw Exception('Failed to load Subjects: ${response.body}');
//       }
//     } catch (e) {
//       throw Exception('Error fetching Subjects: $e');
//     }
//   }
// }