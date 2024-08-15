import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
class AskDoubtAPI {
  static const String _baseUrl = 'https://philester.com';


  Future<List<dynamic>> fetchDoubts(String accessToken,String status, String subject, int start,
     ) async {


    final url = Uri.parse(
        '$_baseUrl/doubts/fetch/student?start=$start&end=4&status=$status&subject=$subject');

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
        print("Api response data $data");
        var doubts = data["doubts"];

        return doubts;
      } else {
        throw Exception('Failed to load doubts: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching doubts: $e');
    }
  }


  Future<dynamic> askDoubts(String accessToken,String question, String subject) async {

    String date=DateTime.now().toString().split(" ")[0].toString();
    final url = Uri.parse(
        '$_baseUrl/doubts/create');

    try {
      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          "question" : question,
          "date": date,
          "subject": subject
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print("Api response data $data");


        return data;
      } else {
        throw Exception('Failed to ask doubts: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching doubts: $e');
    }
  }

  Future<dynamic>  updateDoubt(String accessToken,String docID, Map<String,dynamic> updateData) async {
    print("updateData $updateData");
    print("docID $docID");

    final url = Uri.parse('$_baseUrl/doubts/update/student?id=$docID');

    try {
      SharedPreferences pref=await SharedPreferences.getInstance();
      String currentClass = pref.getString("currentClass") ?? "";
      final response = await http.put(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          "question" : updateData["question"],
          "subject": updateData["subject"],
          "class":currentClass,
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        return data["status"] ;

      } else {
        throw Exception('Failed to update Doubt: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on update Doubt: $e');
    }
  }

  Future<dynamic>  deleteDoubt(String accessToken,String docID) async {

    SharedPreferences pref=await SharedPreferences.getInstance();
    String currentClass = pref.getString("currentClass") ?? "";

    final url = Uri.parse('$_baseUrl/doubts/delete?class=$currentClass&doubtId=$docID');

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
        throw Exception('Failed to delete doubt: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on delete doubt: $e');
    }
  }

}