

import 'dart:convert';

import 'package:http/http.dart' as http;

class StudentPromotionAPI {
  String baseUrl = 'https://school.bdssl.edu.in/api';
  Future<bool> promoteStudents(String accessToken, String Class, String section,List<String> emails) async {
    try {
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
    String currentSession=calculateCurrentSession();

    String calculateNextSession(String currentSession) {
      // Split the current session to extract the years
      List<String> parts = currentSession.split('-');
      int startYear = int.parse(parts[0]);
      int endYear = int.parse("20${parts[1]}");  // Convert to full year

      // Calculate the next session years
      int nextStartYear = startYear + 1;
      int nextEndYear = endYear + 1;

      // Format the result with two-digit end year
      return "$nextStartYear-${nextEndYear.toString().substring(2)}";
    }

    String nextSession = calculateNextSession(currentSession);
    String findNextClass(String Class){
      List<String> classes=["Pre-Nursery","Nursery","L.K.G","U.K.G","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];
      int index=classes.indexOf(Class);
      if (index != -1 && index < classes.length - 1) {
        return classes[index + 1];  // Return the next class
      } else {
       throw Exception("Next Class is not find");
      }
    }

    String nextClass=findNextClass(Class);

  print("nextSession$nextSession");
    final url = Uri.parse('$baseUrl/promote/student?session=$currentSession&class=$Class&section=$section');
      print( json.encode({

   "email": emails,
   "nextClass": nextClass,
   "nextSection": section,
   "nextSession": nextSession
 }),);

      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken'
        },
        body: json.encode({

          "email": emails,
          "nextClass": nextClass.toString(),
          "nextSection": section.toString(),
          "nextSession": nextSession.toString()
        }),
      );

      if (response.statusCode == 200) {
        var data = json.decode(response.body);
        print("API data $data");
        return data['status'];
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      print('$e');
      throw Exception('${e}');
    }
  }

}