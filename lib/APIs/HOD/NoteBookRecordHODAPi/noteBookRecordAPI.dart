import 'dart:convert';
import 'package:http/http.dart' as http;

class NoteBookRecordHODAPI{

  static String baseUrl = "http://philester.com";



  Future<List<dynamic>> fetchNoteBookRecord(String accessToken,String Class,String section,String subject,int start) async {
    print("accessToken $accessToken");

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

    final url = Uri.parse('$baseUrl/notebook/fetch/coordinator/all?class=$Class&section=$section&subject=$subject&session=$session&start=$start&count=');

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

        return data["notebookRecord"] ;
      } else {
        print("${response.body}");
        throw Exception('Failed to load notices: ${response.body}');
      }
    } catch (e) {
      print("$e");
      throw Exception('Error fetching notices: $e');
    }
  }


  Future<dynamic> updateRemark( String accessToken, String docID,  String remark, String session,)
  async {

    print(jsonEncode({
      "remark" : remark,
    }),);

    final url = Uri.parse('$baseUrl/notebook/update/remark?docId=$docID&session=$session');

    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          "remark" : remark,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data);
        return data["status"];
      } else {
        throw Exception('No student found (${response.body})');

      }
    } catch (e) {

      throw Exception('Network error: $e');
    }
  }

}