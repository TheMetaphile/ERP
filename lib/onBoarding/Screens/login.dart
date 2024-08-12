import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:untitled/teacher-module/techerClass.dart';
import 'package:workmanager/workmanager.dart';
import '../../APIs/Authentication/teacherAuthenticationService.dart';
import '../../WorkManager1/workmanager1.dart';
import '../../main.dart';
import '../../utils/theme.dart';
import '../../utils/utils.dart';
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
  final authApiAcess = TeacherAuthentication();
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
        Map<String,dynamic> subject=data["subject"] ?? {};
        Map<String,dynamic> classDetails=data["ClassDetails"] ?? {};
        SharedPreferences pref = await SharedPreferences.getInstance();

        print("user details $userDetails");
        print("subject details $subject");
        print("class details $classDetails");

        if(userDetails.isNotEmpty) {

          var tokens = data["tokens"];
          // var subject= data["subject"];
          var classDetails = data["ClassDetails"];
          // print("User Details $userDetails");
          // print("tokens Details $tokens");
          // print("subject Details $subject");
          // print("classDetails Details $classDetails");


          final userEmail = userDetails["email"] ?? "email@gmail.com";
          final name = userDetails["name"] ?? "UserName";
          final profileLink = userDetails["profileLink"] ??
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          final employeeId = userDetails["employeeId"] ?? "ID123";
          final phoneNumber = userDetails["phoneNumber"] ?? "+91 ********";
          final dob = userDetails["DOB"] ?? "DD-MM-YYYY";
          final permanentAddress = userDetails["permanentAddress"] ??
              "DD-MM-YYYY";

          await pref.setString("email", userEmail);
          await pref.setString("name", name);
          await pref.setString("profileLink", profileLink);
          await pref.setString("employeeId", employeeId);
          await pref.setString("phoneNumber", phoneNumber);
          await pref.setString("dob", dob);
          await pref.setString("permanentAddress", permanentAddress);

          // print(pref.getString("email"));
          // print(pref.getString("name"));
          // print(pref.getString("profileLink"));
          // print(pref.getString("employeeId"));
          // print(pref.getString("phoneNumber"));
          // print(pref.getString("dob",));
          // print(pref.getString("permanentAddress",));


        }
        if(tokens.isNotEmpty){

          final accessToken = tokens["accessToken"];
          final refreshToken = tokens["refreshToken"];


          await pref.setString("accessToken", accessToken);
          await pref.setString("refreshToken", refreshToken);

          print(pref.getString("accessToken"));


        }
        if(subject.isNotEmpty){

          final Map<String, Map<String, List<String>>> transformedData = {};

          void addSubjects(List<dynamic> subjects) {
            for (var item in subjects) {
              final className = item['class'];
              final section = item['section'];
              final subject = item['subject'];

              if (!transformedData.containsKey(className)) {
                transformedData[className] = {};
              }
              if (!transformedData[className]!.containsKey(section)) {
                transformedData[className]![section] = [];
              }
              if (!transformedData[className]![section]!.contains(subject)) {
                transformedData[className]![section]!.add(subject);
              }
            }
          }

          addSubjects(data['subject']['subjects'] as List<dynamic>);
          addSubjects(data['subject']['Co_scholastic'] as List<dynamic>);

          print(transformedData);
          await pref.setString(
              'class_section_subjects', jsonEncode(transformedData));

          // To retrieve the data
          String? jsonString = pref.getString('class_section_subjects');
          if (jsonString != null) {
            Map<String, dynamic> retrievedData = jsonDecode(jsonString);
            print(retrievedData); // Use the retrieved data as needed
          }



        }
        if(classDetails.isNotEmpty){

          final teacherClass = classDetails["class"] ?? "";
          final teacherSection = classDetails["section"] ?? "";
          print(teacherClass);
          print(teacherSection);
          await pref.setString("teacherClass", teacherClass);
          await pref.setString("teacherSection", teacherSection);
        }
        // else{
        //
        //     final authApiAcess = TeacherAuthentication();
        //     DateTime currentDateTime=DateTime.now();
        //     String date=currentDateTime.toString().split(' ')[0];
        //
        //     String calculateCurrentSession() {
        //       DateTime now = DateTime.now();
        //       int currentYear = now.year;
        //       int nextYear = currentYear + 1;
        //
        //       if (now.isBefore(DateTime(currentYear, 3, 31))) {
        //         currentYear--;
        //         nextYear--;
        //       }
        //
        //       return "$currentYear-${nextYear.toString().substring(2)}";
        //     }
        //
        //     SharedPreferences pref =await  SharedPreferences.getInstance();
        //     String? accessToken=pref.getString("accessToken");
        //
        //     print("accessTOken $accessToken");
        //     print(" session ${calculateCurrentSession()}");
        //     print("date $date");
        //     if(accessToken!=null){
        //       var data=await authApiAcess.fetchSubstitutionTeacher(accessToken,date,calculateCurrentSession());
        //
        //       print("substitute data $data ...............");
        //
        //       if(data!=null){
        //         print("//////////////////substitute data called successfully ..........///////////////// ");
        //
        //         String? teacherClass=pref.getString("teacherClass") ??"";
        //         String? teacherSection=pref.getString("teacherSection") ?? "";
        //         print("Before teacherClass $teacherClass");
        //         print("Before teacherSection $teacherSection");
        //
        //         if(teacherClass.isEmpty && teacherSection.isEmpty){
        //
        //           final teacherClass = data["class"] ?? "";
        //           final teacherSection = data["section"] ?? "";
        //
        //            print("Fetched teacherClass $teacherClass");
        //            print("Fetched teacherSection $teacherSection");
        //
        //           await pref.setString("teacherClass", teacherClass);
        //           await pref.setString("teacherSection", teacherSection);
        //
        //           print("Set teacherClass ${pref.getString("teacherClass")}");
        //           print("Set teacherSection ${pref.getString("teacherSection")}");
        //
        //           int currentHour=DateTime.now().hour;
        //           int assignHour=17-currentHour;
        //           await pref.setInt("assignHour", assignHour);
        //           print("The login workmanager");
        //
        //         }
        //
        //
        //       }
        //     }
        //
        //
        // }


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

  CustomTheme themeObj = CustomTheme();


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.primayColor,
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
        color: themeObj.textBlack,
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
            color: themeObj.primayColor,
          ),
        ),
      ),
    );
  }

  Widget continueButton(Size size, BuildContext context) {
    return Card(
      color: isLoading ? Colors.transparent : themeObj.primayColor,
      elevation: isLoading ? 0 : 15,
      child: InkWell(
        onTap: isLoading ? null : () => _handleLogin(context),
        child: isLoading
            ? CircularProgressIndicator(color: themeObj.textgrey)
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
