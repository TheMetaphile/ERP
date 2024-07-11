import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../onBoarding/Screens/Successful.dart';
import '../../onBoarding/Screens/email_verification.dart';
import '../../onBoarding/Screens/reset_confirmation.dart';
import '../../teacher-module/TeacherHome.dart';
import '../../utils/utils.dart';
import 'package:http/http.dart' as http;

class TeacherAuthentication{

  Future<void> loginUser(String email, String password, BuildContext context) async {
    final url = Uri.parse('http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8007/login/Teacher');
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
        final tokens = data['tokens'];
        final accessToken = tokens['accessToken'];
        final userDetails = data["userDetails"];
        List subject = data["subject"];



        if (userDetails != null && subject != null) {
          final userEmail = userDetails["email"];
          final name = userDetails["name"];
          final profileLink = userDetails["profileLink"];
          final clas = subject[0]["class"]; // Use the first subject's class
          final section = subject[0]["section"]; // Use the first subject's section
          final employeeId = userDetails["employeeId"];

          SharedPreferences pref = await SharedPreferences.getInstance();
          // await pref.setStringList("SubjectList", subject);
          await pref.setString("accessToken", accessToken);
          await pref.setString("email", userEmail);
          await pref.setString("name", name);
          await pref.setString("profileLink", profileLink);
          await pref.setString("class", clas);
          await pref.setString("section", section);
          await pref.setString("employeeId", employeeId);

          print(pref.getString("email"));
          print(pref.getString("accessToken"));

          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => TeacherHome()));
          showGreenSnackBar("Login successful", context);

        } else {

        print('Login failed');
        showRedSnackBar("Something Went Wrong",context);
      }
    }
    } catch (e) {

      print('Network error: $e');
    }
  }

  Future<void> forgetUser(String email, BuildContext context) async {
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/otp/send/teacher');
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
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/otp/verify');

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
    final url = Uri.parse('https://loginapi-y0aa.onrender.com/password/forgot/Teacher');
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
}