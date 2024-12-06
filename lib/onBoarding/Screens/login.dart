import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../APIs/Authentication/studentAuthentication.dart';
import '../../APIs/NotificationAPI/notificationAPI.dart';
import '../../APIs/SharedPreference/sharedPreferenceFile.dart';
import '../../CustomTheme/customTheme.dart';
import '../../Notification/Messanging.dart';
import '../../main.dart';
import '../utils/text_field.dart';
import 'Forget.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final authApiAcess = StudentAuthentication();
  bool isLoading = false;


  Future<void> _handleLogin(BuildContext context) async {
    final email = emailController.text.trim();
    final password = passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      showRedSnackBar("Please enter both email and password", context);
      return;
    }

    setState(() {
      isLoading = true;
    });

    try {
      {

        var data=await authApiAcess.loginUser(email, password, context);
        if(data=="Invalid Credentials"){
          showRedSnackBar("Invalid Email and Password", context);
        }
        Map<String,dynamic> userDetails=data["userDetails"] ?? {};
        Map<String,dynamic> tokens=data["tokens"] ?? {};
        List<String> subjects= List<String>.from(data["subjects"]) ?? [];

        SharedPreferences pref = await SharedPreferences.getInstance();

        print("user details $userDetails");


        if(userDetails.isNotEmpty) {

          // final userEmail = userDetails["email"] ?? "email@gmail.com";
          // final name = userDetails["name"] ?? "UserName";
          // final profileLink = userDetails["profileLink"] ??
          //     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          // final rollNo = userDetails["rollNumber"] ?? "rollNo";
          // final currentClass = userDetails["currentClass"] ?? "currentClass";
          // final section = userDetails["section"] ?? "section";
          // final session = userDetails["session"] ?? "session";
          // final fatherPhoneNumber = userDetails["fatherPhoneNumber"] ?? "+91 ********";
          // final dob = userDetails["DOB"] ?? "DD-MM-YYYY";
          // final permanentAddress = userDetails["permanentAddress"] ??
          //     "unknown";
          //
          //
          //
          // await pref.setString("email", userEmail);
          // await pref.setString("name", name);
          // await pref.setString("profileLink", profileLink);
          // await pref.setString("rollNo", rollNo.toString());
          // await pref.setString("currentClass", currentClass.toString());
          // await pref.setString("section", section);
          // await pref.setString("session", session.toString());
          // await pref.setString("fatherPhoneNumber", fatherPhoneNumber.toString());
          // await pref.setString("dob", dob);
          // await pref.setString("permanentAddress", permanentAddress);


          await UserPreferences.saveDetails(userDetails,"userDetails");
          Map<String, dynamic> getdetails = await UserPreferences.getDetails("userDetails");
          print("getDetails $getdetails");
        }
        if(subjects.isNotEmpty){
          // await UserPreferences.saveUserDetails(subjects,"subjects");
          // Map<String, dynamic> subjectsDetails = await UserPreferences.getUserDetails("subjects");
          SharedPreferences pref=await SharedPreferences.getInstance();
           pref.setStringList("subjects", subjects);

          print("subjects  ${pref.getStringList("subjects")}");
        }

        if(tokens.isNotEmpty){

          final accessToken = tokens["accessToken"];
          final refreshToken = tokens["refreshToken"];


          await pref.setString("accessToken", accessToken);
          await pref.setString("refreshToken", refreshToken);

          print(pref.getString("accessToken"));


        }
        NotificationAPI apiObj=NotificationAPI();
        String? accessToken = pref.getString("accessToken");

        String? deviceToken = await FCMService.getDeviceToken();
        print("FCM Token: $deviceToken");
        await apiObj.addToken(accessToken!, deviceToken!);
        print("token send-------------------");

        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => MyApp(),));
      }


    } catch (e) {
      print("Login error: $e");
      showRedSnackBar("An error occurred during login ${e}", context);
    } finally {

      setState(() {
        isLoading = false;
      });
    }
  }




  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: CustomTheme.primaryColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            buildHeader(size),
            buildLoginForm(size, context),
          ],
        ),
      ),
    );
  }

  Widget buildHeader(Size size) {
    return SizedBox(
      height: size.height * 0.3,
      child: Padding(
        padding: EdgeInsets.only(top: size.height * 0.03),
        child: Align(
          alignment: Alignment.bottomCenter,
          child: Image.asset(
            "assets/onBoarding/Login/gif1.gif",
            fit: BoxFit.fitHeight,
          ),
        ),
      ),
    );
  }

  Widget buildLoginForm(Size size, BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(0),

      child: SizedBox(
        height: size.height * 0.7,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: size.width * 0.06),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height * 0.03),
              buildLabelText("Your Email", size),
              SizedBox(height: size.height * 0.01),
              CustomTextField(controller: emailController, password: false),
              SizedBox(height: size.height * 0.03),
              buildLabelText("Password", size),
              SizedBox(height: size.height * 0.01),
              CustomTextField(controller: passwordController, password: true),
              SizedBox(height: size.height * 0.01),
              buildForgotPassword(context, size),
              SizedBox(height: size.height * 0.03),
              Center(child: continueButton(size, context)),
              SizedBox(height: size.height * 0.02),


            ],
          ),
        ),
      ),
    );
  }

  Widget buildLabelText(String text, Size size) {

    return Text(
      text,
      style: GoogleFonts.openSans(
        fontSize: size.width * 0.05,
        fontWeight: FontWeight.w400,
        color: CustomTheme.blackColor,
      ),
    );
  }

  Widget buildForgotPassword(BuildContext context, Size size) {
    return Align(
      alignment: Alignment.centerRight,
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            PageTransition(
              child: ForgetPassword(),
              curve: Curves.easeInOut,
              duration: const Duration(milliseconds: 400),
              type: PageTransitionType.bottomToTop,
            ),
          );
        },
        child: Text(
          "Forget password?",
          style: GoogleFonts.openSans(
            fontSize: size.width * 0.04,
            fontWeight: FontWeight.w400,
            color: CustomTheme.primaryColor,
          ),
        ),
      ),
    );
  }

  Widget continueButton(Size size, BuildContext context) {
    return Card(
      color: isLoading ? Colors.transparent : CustomTheme.primaryColor,
      elevation: isLoading ? 0 : 15,
      child: InkWell(
        onTap: isLoading ? null : () => _handleLogin(context),
        child: isLoading
            ? CircularProgressIndicator(color: CustomTheme.greyColor)
            : Padding(
          padding: EdgeInsets.all(size.width * 0.01),
          child: Center(
            child: AutoSizeText(
              "Continue",
              style: GoogleFonts.openSans(
                fontSize: 25,
                fontWeight: FontWeight.w500,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }




}
