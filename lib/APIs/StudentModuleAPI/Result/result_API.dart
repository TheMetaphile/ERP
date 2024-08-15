import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';



class ResultApi {
  static const String _baseUrl = 'https://philester.com';

  Future<dynamic> fetchResult(String accessToken,String email) async {

    SharedPreferences pref=await SharedPreferences.getInstance();
    String Class = pref.getString("currentClass") ?? "";
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
    final url = Uri.parse('$_baseUrl/result/fetch/student?email=$email&class=$Class&session=$session');

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
        print("api data $data");

        return data ;
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching result: $e');
    }
  }

}