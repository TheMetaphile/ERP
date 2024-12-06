import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class FeesStatsApi {
  static const String _baseUrl = 'https://school.bdssl.edu.in/api';

  Future<Map<String,dynamic>> fetchStats(String accessToken) async {


    final url = Uri.parse(
        '$_baseUrl/fee/fetch/stats');

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
        print("API data  $data");
        return data;
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching  Fees Stats: $e');
    }
  }


  Future<dynamic>  Fees(String accessToken,String email,int amount, String status,String docId,String paymentID,String signature , bool pending,String pendingId,String orderId) async {
   print("email $email");
   print("amount $amount");
   String date=DateTime.now().toString().split(" ")[0].toString();
   print("date $date");
   print("status $status");
   print("doc_id $docId");
   String installmentId="${date}-${email}";
   print("installmentId $installmentId");
   // List<String> months = [
   //   "January",
   //   "February",
   //   "March",
   //   "April",
   //   "May",
   //   "June",
   //   "July",
   //   "August",
   //   "September",
   //   "October",
   //   "November",
   //   "December"
   // ];



   print("signature $signature");
   print("pending $pending");
   print("pendingId $pendingId");


    final url = Uri.parse('$_baseUrl/fee/payment');

    try {
      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          "email": email,
          "amount": amount,
          "date": date,
          "status": status,
          "doc_id": docId,
          "installment_id": installmentId,
          "order_id": orderId,
          "payment_id": paymentID,
          "signature": signature,
          "pending":pending,
          "pendingId":pendingId
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print("APi response $data");
        return data["status"] ;

      } else {
        throw Exception('Failed to apply payment: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error on apply payment: $e');
    }
  }


  Future<Map<String,dynamic>> fetchPaymentDetails(String accessToken) async {

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

    final url = Uri.parse(
        '$_baseUrl/fee/fetch/student?=&session=$session');

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
        print("API data  $data");
        return data;
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching  Fees Details: $e');
    }
  }


  Future<List<dynamic>> fetchTransactionDetails(String accessToken) async {



    final url = Uri.parse(
        '$_baseUrl/fee/fetch/transactions');

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
        print("API data  $data");
        return data["transactions"];
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching  transactions Details: $e');
    }
  }


  Future<List<dynamic>> fetchPreviousSession(String accessToken,String email) async {



    final url = Uri.parse(
        '$_baseUrl/fee/fetch/pendingFee?email=$email');

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
        print("API data  $data");
        return data["PendingFee"];
      } else {
        throw Exception('${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching PreviousSession Details: $e');
    }
  }


}