import 'package:flutter/material.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/StudentModule/Attendance/studentAttendance.dart';
import 'package:student/StudentModule/Classword/classWork.dart';
import 'package:student/StudentModule/Fees/fees.dart';
import 'package:student/StudentModule/NoteBookRecord/noteBook_Record.dart';
import 'package:student/StudentModule/Notice/notice.dart';
import 'package:student/StudentModule/StudentLeave/student_leave.dart';
import 'package:student/StudentModule/homeWork/homeWork.dart';

import 'APIs/Authentication/studentAuthentication.dart';
import 'APIs/SharedPreference/sharedPreferenceFile.dart';
import 'CustomTheme/customTheme.dart';
import 'StudentModule/Fees/Fee_Due.dart';
import 'StudentModule/Result/result.dart';
import 'StudentModule/StudentHome/studentHome.dart';
import 'onBoarding/Screens/Forget.dart';

import 'onBoarding/Screens/login.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Workmanager().initialize(callbackDispatcher,isInDebugMode: false);
  runApp(const MyApp());

}


class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  // Future<void> fetchSubstitution() async{
  //   final authApiAcess = TeacherAuthentication();
  //   DateTime currentDateTime=DateTime.now();
  //   String date=currentDateTime.toString().split(' ')[0];
  //
  //   String calculateCurrentSession() {
  //     DateTime now = DateTime.now();
  //     int currentYear = now.year;
  //     int nextYear = currentYear + 1;
  //
  //     if (now.isBefore(DateTime(currentYear, 3, 31))) {
  //       currentYear--;
  //       nextYear--;
  //     }
  //
  //     return "$currentYear-${nextYear.toString().substring(2)}";
  //   }
  //
  //   SharedPreferences pref =await  SharedPreferences.getInstance();
  //   String? accessToken=pref.getString("accessToken");
  //
  //   print("accessTOken $accessToken");
  //   print(" session ${calculateCurrentSession()}");
  //   print("date $date");
  //   if(accessToken!=null){
  //
  //     var data=await authApiAcess.fetchSubstitutionTeacher(accessToken,date,calculateCurrentSession());
  //
  //     print("substitute data $data");
  //
  //     if(data!=null){
  //       String? teacherClass=pref.getString("teacherClass") ??"";
  //       String? teacherSection=pref.getString("teacherSection") ?? "";
  //       print("teacherClass $teacherClass");
  //       print("teacherSection $teacherSection");
  //
  //       if(teacherClass.isEmpty && teacherSection.isEmpty){
  //
  //         final teacherClass = data["class"] ?? "";
  //         final teacherSection = data["section"] ?? "";
  //         print("teacherClass $teacherClass");
  //         print("teacherSection $teacherSection");
  //         await pref.setString("teacherClass", teacherClass);
  //         await pref.setString("teacherSection", teacherSection);
  //
  //         int currentHour=DateTime.now().hour;
  //         int assignHour=17-currentHour;
  //
  //         await pref.setInt("assignHour", assignHour);
  //        print("The main workmanager");
  //         await schedulePreferenceClear();
  //       }
  //
  //     }
  //   }
  //
  // }

  Future<bool> verifyToken() async {
    try {

      print("***************** Verifying token **************************");
      StudentAuthentication apiObj = StudentAuthentication();
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? refreshToken = pref.getString("refreshToken");

      if (accessToken == null || refreshToken == null) {
        return false;
      }

      bool isValid = await apiObj.verifyAccessToken(accessToken);
      print(isValid);
      if (isValid) {
        return true;
      } else {
        String newAccessToken = await apiObj.generateNewAccessToken(refreshToken);
        if (newAccessToken.isNotEmpty && newAccessToken != "Invalid refresh token") {
          await pref.setString("accessToken", newAccessToken);
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      print("Error during token verification: $e");
      return false;
    }
  }



  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDetails();

  }
  
  Map<String, dynamic> retrievedUserDetails={};
  Future<void> getDetails() async {
    retrievedUserDetails = await UserPreferences.getDetails("userDetails");
  }

  // void _checkForCompletedTask() async {
  //   print("_checkForCompletedTask 1111///////////");
  //   final prefs = await SharedPreferences.getInstance();
  //   final completed = prefs.getBool('backgroundTaskCompleted') ?? false;
  //   if (completed) {
  //     setState(() {
  //
  //     });
  //     // Reset the flag
  //     await prefs.setBool('backgroundTaskCompleted', false);
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/resetPassword': (context) => ForgetPassword(),
        // "/resultScreen": (context) => const ResultPdf(student: stu,),

        '/dashboard': (context) => const StudentHome(),
        '/attendance': (context) =>  StudentAttendanceUI(),
        '/leave': (context) =>  const StudentLeave(),
        '/resultAPI.dart': (context) =>  ReportCardOpen(userDetails: retrievedUserDetails,),
        '/classwork': (context) => Classwork(),

        '/student fee status': (context) => FeesDue(email: retrievedUserDetails["email"]),
        '/student notebook record': (context) => NoteBookRecord(currentClass: retrievedUserDetails["currentClass"], section: retrievedUserDetails["section"]),
        '/home': (context) =>const StudentHome(),

        '/homework': (context) => Homework(),
        '/notice-board': (context) => Notice(),

        '/logout': (context) =>Login(),

      },
      home:Scaffold(
        backgroundColor: CustomTheme.whiteColor,
        body: FutureBuilder<bool>(
          future: verifyToken(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return   Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: CustomTheme.primaryColor,
                  size: 50,
                ),
              );
            } else{
              return snapshot.data == true ? const StudentHome() : const Login();
            }
          },
        ),
      ),
    );
  }
}


