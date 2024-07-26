import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:untitled/utils/utils.dart';


class ResultApi {
  static const String _baseUrl = 'http://13.201.247.28:8000';

  Future<Map<String,dynamic>> fetchResult(String accessToken,String email) async {
    final url = Uri.parse('$_baseUrl/result/fetch/teacher?email=$email');

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
        print(data.runtimeType);
        return data ;
      } else {
        throw Exception('Failed to load result: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching result: $e');
    }
  }

  Future<dynamic> createResult (String accessToken , String email,String Class,String term,Map<String,dynamic> result) async {

    print(email);
    print(Class);
    print(term);
    print(result);

    final url = Uri.parse('$_baseUrl/result/create');
    final requestBody = {
      'email': email,
      'class': Class,
      'term': term,  // Keep term as a string, not an array
      'result': result,  // Use 'result' instead of 'submittedBy'
    };
    print('Request Body: ${jsonEncode(requestBody)}');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode(requestBody),
      );
      print('Response Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');
      if (response.statusCode == 200) {
        final responseBody = jsonDecode(response.body);
        return responseBody['status'];

      }else{
        throw Exception('Failed to create result: ${response.statusCode}. Response: ${response.body}');
      }
    } catch (e) {
      print("Error creating result: $e");
      throw Exception('Error creating result: $e');
    }
  }
}