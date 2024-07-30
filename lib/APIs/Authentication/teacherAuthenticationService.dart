import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../main.dart';
import '../../onBoarding/Screens/Successful.dart';
import '../../onBoarding/Screens/email_verification.dart';
import '../../onBoarding/Screens/reset_confirmation.dart';
import '../../teacher-module/TeacherHome.dart';
import '../../utils/utils.dart';
import 'package:http/http.dart' as http;

class TeacherAuthentication{
    static String baseUrl = "http://13.201.247.28:8000";


  Future<dynamic> loginUser(String email, String password, BuildContext context) async {
    print(email);
    print(password);
    final url = Uri.parse('$baseUrl/login/Teacher');
    final body = jsonEncode({
      'email': email,
      'password': password,
    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );


      if (response.statusCode == 200) {
        print('Login successful');

        final data = jsonDecode(response.body);
        //  print(data);
        //  final tokens = data['tokens'];
        //  final accessToken = tokens['accessToken'];
        //  final refreshToken = tokens['refreshToken'];
        //  final userDetails = data["userDetails"];
        // var subject = data["subject"];
        //
        //
        //
        //
        //  if (userDetails != null ) {
        //    String clas = "";
        //    String section = "";
        //
        //    if (subject is List) {
        //      if (subject.isNotEmpty) {
        //        clas = subject[0]["class"] ?? "";
        //        section = subject[0]["section"] ?? "";
        //      }
        //    } else if (subject is Map) {
        //      clas = subject["class"] ?? "";
        //      section = subject["section"] ?? "";
        //    }
        //
        //    final userEmail = userDetails["email"];
        //    final name = userDetails["name"];
        //    final profileLink = userDetails["profileLink"];
        //    final employeeId = userDetails["employeeId"];
        //    SharedPreferences pref = await SharedPreferences.getInstance();
        //
        //    // await pref.setStringList("SubjectList", subject);
        //    await pref.setString("accessToken", accessToken);
        //    await pref.setString("refreshToken", refreshToken);
        //    await pref.setString("email", userEmail);
        //    await pref.setString("name", name);
        //    await pref.setString("profileLink", profileLink);
        //    await pref.setString("class", clas);
        //    await pref.setString("section", section);
        //    await pref.setString("employeeId", employeeId);
        //
        //    print(pref.getString("email"));
        //    print(pref.getString("accessToken"));
        //
        //    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => MyHomePage()));
        //    showGreenSnackBar("Login successful", context);
        //    return true;
        //  }

      return data;
    }else{

        return "Invalid Credentials";
      }
    } catch (e) {
      print('Ne twork error: $e');
      return "Network Error";

    }
  }


    Future<dynamic> fetchSubstitutionTeacher(String accessToken,String date,String session) async {


      final url = Uri.parse('$baseUrl/classTeacherSubstitute/fetch/checkSubstitute?date=$date&session=$session');

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
          print("/////2********************************************************");
          return data;
        } else {
          throw Exception('Failed to load classwork: ${response.statusCode}');
        }
      } catch (e) {
        throw Exception('Error fetching classwork: $e');
      }
    }




  Future<void> forgetUser(String email, BuildContext context) async {
    final url = Uri.parse('$baseUrl/otp/send/teacher');
    final body = jsonEncode({
      'email': email,
    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {
        print('OTP Send');
        final data = jsonDecode(response.body);
        final otpToken = data['otpToken'];
        print(otpToken);
        // final SharedPreferences prefs = await SharedPreferences.getInstance();
        // await prefs.setString('otpToken', otpToken); // Await the operation
        // print(prefs.getString('otpToken'));
        //  final sharedotpToken=prefs.getString('otpToken');

        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => EmailVerification(
              email: email,
              otpToken: otpToken, // Use getString to read the value
            ),
          ),
        );
        showGreenSnackBar("OTP Send", context);
      } else {
        print('OTP failed');
        showRedSnackBar("Something Went Wrong", context);
      }
    } catch (e) {
      print('Network error: $e');
    }
  }


  Future<void> verifyOtp(String email,String otpToken, String otp,BuildContext context) async {
    print(otpToken);
    final url = Uri.parse('$baseUrl/otp/verify');

    final body = jsonEncode({
      'email': email,
      "otp":otp,
      "otpToken":otpToken

    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final valid = data['valid'];
        print('OTP Verify');
        if(valid){
          Navigator.of(context).push(
              PageTransition(
                  child: ResetConfirmation(email: email,),
                  curve: accelerateEasing,
                  duration: const Duration(milliseconds: 400),
                  type: PageTransitionType.bottomToTop)
          );
        }else{
          showRedSnackBar("Please Enter Correct OTP",context);
        }
      } else {

        print('OTP Not Verify');

        showRedSnackBar("Something Went Wrong",context);
      }
    } catch (e) {

      print('Network error: $e');
    }
  }


  Future<void> setNewPassword(String email,String newPassword, BuildContext context) async {
    final url = Uri.parse('$baseUrl/password/forgot/Teacher');
    final body = jsonEncode({
      'email': email,
      'newPassword':newPassword
    });
    print(newPassword);

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {

        print('Password Set');
        final data=jsonDecode(response.body);
        if(data['status']){
          Navigator.push(context, MaterialPageRoute(builder: (context) => const Successful(),));
          showGreenSnackBar("Password Change",context);
        }
      } else {

        print('Password set failed');
        showRedSnackBar("Something Went Wrong",context);
      }
    } catch (e) {

      print('Network error: $e');
    }
  }


  Future<bool> verifyAccessToken(String accessToken,) async {
    final url = Uri.parse('$baseUrl/token/verify');
    final body = jsonEncode({
      'token':accessToken
    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['valid']??false;
      }else{
        return false;
      }
    } catch (e) {
     return false;

    }
  }


  Future<String> generateNewAccessToken(String refreshToken,) async {
    final url = Uri.parse('$baseUrl/token/newAccessToken');
    final body = jsonEncode({
      'refreshToken':refreshToken
    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['accessToken'];
      }else{
        return "Invalid refresh token";
      }
    } catch (e) {
     throw ("Invalid refresh token");

    }
  }



}