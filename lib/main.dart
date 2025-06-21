/*
import 'package:flutter/material.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/admin-module/StudentPannel/StudentResults.dart';
import 'package:untitled/admin-module/expenseManagement.dart';
import 'package:untitled/teacher-module/Classs%20Activity/StudentFees/studentFeesStatus.dart';
import 'package:untitled/teacher-module/NoteBookRecord/noteBookRecord.dart';
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:untitled/teacher-module/ClassWork/classWork.dart';
import 'package:untitled/teacher-module/HomeWork/homeWork.dart';
import 'package:untitled/teacher-module/NoticeBoard/noticeBoard.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckIn.dart';
import 'package:untitled/teacher-module/TakeLeave/teacherLeave.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';
import 'package:untitled/teacher-module/techerClass.dart';
import 'package:untitled/utils/theme.dart';
import 'package:workmanager/workmanager.dart';
import 'APIs/Authentication/teacherAuthenticationService.dart';
import 'WorkManager1/workmanager1.dart';
import 'admin-module/TeacherPannel/teacherAttendance.dart';
import 'onBoarding/Screens/Forget.dart';
import 'onBoarding/Screens/login.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Workmanager().initialize(callbackDispatcher,isInDebugMode: false);
  runApp(const MyApp());
}
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  Future<bool> verifyToken() async {
    try {
      print("***************** Verifying token **************************");
      TeacherAuthentication apiObj = TeacherAuthentication();
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? refreshToken = pref.getString("refreshToken");

      if (accessToken == null || refreshToken == null) {
        return false;
      }

      bool isValid = await apiObj.verifyAccessToken(accessToken);
      print(isValid);
      if (isValid) {
        SharedPreferences pref=await SharedPreferences.getInstance();
        String? teacherClass=pref.getString("teacherClass");
        String? teacherSection=pref.getString("teacherSection");
        print("Class: ${teacherClass}, section: ${teacherSection}");

        if((teacherClass==null && teacherSection == null) || (teacherClass!.isEmpty && teacherSection!.isEmpty)){

          print("*********hitting api again************");
          final authApiAcess = TeacherAuthentication();
          DateTime currentDateTime=DateTime.now();
          String date=currentDateTime.toString().split(' ')[0];

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

          SharedPreferences pref =await  SharedPreferences.getInstance();
          String? accessToken=pref.getString("accessToken");

          print("accessToken $accessToken");
          print(" session ${calculateCurrentSession()}");
          print("date $date");
          if(accessToken!=null){
            int currentHour=DateTime.now().hour;

            if(currentHour<17){
              var data=await authApiAcess.fetchSubstitutionTeacher(accessToken,date,calculateCurrentSession());
              print("substitute data $data ...............");

              if(data!=null){
                print("//////////////////substitute data called successfully ..........///////////////// ");

                String? teacherClass=pref.getString("teacherClass") ??"";
                String? teacherSection=pref.getString("teacherSection") ?? "";
                print("Before teacherClass $teacherClass");
                print("Before teacherSection $teacherSection");

                if(teacherClass.isEmpty && teacherSection.isEmpty){

                  final teacherClass = data["class"] ?? "";
                  final teacherSection = data["section"] ?? "";

                  print("Fetched teacherClass $teacherClass");
                  print("Fetched teacherSection $teacherSection");

                  await pref.setString("teacherClass", teacherClass);
                  await pref.setString("teacherSection", teacherSection);

                  print("Set teacherClass ${pref.getString("teacherClass")}");
                  print("Set teacherSection ${pref.getString("teacherSection")}");

                  int currentHour=DateTime.now().hour;
                  int assignHour=17-currentHour;
                  await pref.setInt("assignHour", assignHour);
                  print("The login workmanager");
                  schedulePreferenceClear();

                }
              }
            }
          }
        }
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


  CustomTheme themeObj= CustomTheme();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

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

        '/dashboard': (context) => const TeacherHome(),
        '/attendance': (context) => const TeacherAttendance(),
        '/leave': (context) =>  const TeacherLeave(),
        '/assignment': (context) => const HomeWork(),
        '/resultAPI.dart': (context) => const StudentResults(),
        '/expense management': (context) =>const ExpenseManagement(),
        '/classwork': (context) =>const ClassWork(),
        '/check-in': (context) =>const TeacherAttendanceCheckIn(),
        // '/classes': (context) =>const Timetable(),
        '/student fee status': (context) =>const StudentFeesStatus(),
        '/student notebook record': (context) => const NoteBookRecord(),
        '/home': (context) =>const TeacherHome(),
        '/salary': (context) =>const TeacherSalary(),
        // '/admin panel': (context) =>const AdminHome(),
        '/homework': (context) =>const HomeWork(),
        // '/chat': (context) =>const ChatScreen(),
        '/notice-board': (context) =>const NoticeBoard(),

        '/logout': (context) =>Login(),

      },
      home:Scaffold(
        backgroundColor: themeObj.textWhite,
        body: FutureBuilder<bool>(
          future: verifyToken(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return   Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              );
            } else{
              return snapshot.data == true ? const TeacherHome() : const Login();
            }
          },
        ),
      ),
    );
  }
}
*/

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

// Teacher Modules
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:untitled/teacher-module/HomeWork/homeWork.dart';
import 'package:untitled/teacher-module/NoticeBoard/noticeBoard.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckIn.dart';
import 'package:untitled/teacher-module/TakeLeave/teacherLeave.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';
import 'package:untitled/teacher-module/ClassWork/classWork.dart';
import 'package:untitled/teacher-module/NoteBookRecord/noteBookRecord.dart';
import 'package:untitled/teacher-module/Classs%20Activity/StudentFees/studentFeesStatus.dart';
import 'package:untitled/admin-module/expenseManagement.dart';
import 'package:untitled/admin-module/StudentPannel/StudentResults.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherAttendance.dart';
import 'package:untitled/APIs/Authentication/teacherAuthenticationService.dart';
import 'package:untitled/WorkManager1/workmanager1.dart';
import 'package:workmanager/workmanager.dart';

// Student Modules
import 'CustomTheme/customTheme.dart' as myTheme;


// Common
import 'CustomTheme/customTheme.dart';

import 'Notification/Messanging.dart';
import 'StudentAPIs/Authentication/studentAuthentication.dart';
import 'StudentAPIs/SharedPreference/sharedPreferenceFile.dart';
import 'StudentModule/Attendance/studentAttendance.dart';
import 'StudentModule/Classword/classWork.dart';
import 'StudentModule/Fees/Fee_Due.dart';
import 'StudentModule/NoteBookRecord/noteBook_Record.dart';
import 'StudentModule/Notice/notice.dart';
import 'StudentModule/Result/result.dart';
import 'StudentModule/StudentHome/studentHome.dart';
import 'StudentModule/StudentLeave/student_leave.dart';
import 'StudentModule/homeWork/homeWork.dart';
import 'firebase_options.dart';
import 'onBoarding/Screens/login.dart';
import 'onBoarding/Screens/Forget.dart';
import 'package:untitled/utils/theme.dart';
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Firebase initialization (for student notifications)
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  await FCMService.initializeFCM();

  // WorkManager initialization (for teacher background task)
  Workmanager().initialize(callbackDispatcher, isInDebugMode: false);

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Map<String, dynamic> retrievedUserDetails = {};

  Future<String> getUserRoleAndVerifyToken() async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? role = pref.getString("role"); // Set this after login
      String? accessToken = pref.getString("accessToken");
      String? refreshToken = pref.getString("refreshToken");

      if (accessToken == null || refreshToken == null || role == null) return "none";

      if (role == "teacher" || role == "admin") {
        final api = TeacherAuthentication();
        bool isValid = await api.verifyAccessToken(accessToken);
        if (!isValid) {
          String newAccess = await api.generateNewAccessToken(refreshToken);
          if (newAccess.isNotEmpty && newAccess != "Invalid refresh token") {
            await pref.setString("accessToken", newAccess);
            return role;
          } else {
            return "none";
          }
        } else {
          return role;
        }
      } else if (role == "student") {
        final api = StudentAuthentication();
        bool isValid = await api.verifyAccessToken(accessToken);
        if (!isValid) {
          String newAccess = await api.generateNewAccessToken(refreshToken);
          if (newAccess.isNotEmpty && newAccess != "Invalid refresh token") {
            await pref.setString("accessToken", newAccess);
            return "student";
          } else {
            return "none";
          }
        } else {
          retrievedUserDetails = await UserPreferences.getDetails("userDetails");
          return "student";
        }
      } else {
        return "none";
      }
    } catch (e) {
      print("Error in getUserRoleAndVerifyToken: $e");
      return "none";
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        // Shared Routes
        '/resetPassword': (context) => ForgetPassword(),
        '/logout': (context) => const Login(),

        // Teacher/Admin Routes
        '/dashboard': (context) => const TeacherHome(),
        '/attendance': (context) => const TeacherAttendance(),
        '/leave': (context) => const TeacherLeave(),
        '/assignment': (context) => const HomeWork(),
        '/resultAPI.dart': (context) => const StudentResults(),
        '/expense management': (context) => const ExpenseManagement(),
        '/classwork': (context) => const ClassWork(),
        '/check-in': (context) => const TeacherAttendanceCheckIn(),
        '/student fee status': (context) => const StudentFeesStatus(),
        '/student notebook record': (context) => const NoteBookRecord(),
        '/home': (context) => const TeacherHome(),
        '/salary': (context) => const TeacherSalary(),
        '/homework': (context) => const HomeWork(),
        '/notice-board': (context) => const NoticeBoard(),

        // Student Routes
        '/student-dashboard': (context) => const StudentHome(),
        '/student-attendance': (context) => StudentAttendanceUI(),
        '/student-leave': (context) => const StudentLeave(),
        '/student-result': (context) => ReportCardOpen(userDetails: retrievedUserDetails),
        '/student-classwork': (context) => const StudentClasswork(),
        '/student-fee-status': (context) => FeesDue(email: retrievedUserDetails["email"]),
        '/student-notebook': (context) => StudentNoteBookRecord(
          currentClass: retrievedUserDetails["currentClass"],
          section: retrievedUserDetails["section"],
        ),
        '/student-homework': (context) => const StudentHomework(),
        '/student-notice': (context) => const StudentNotice(),
      },
      home: FutureBuilder<String>(
        future: getUserRoleAndVerifyToken(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Scaffold(
              backgroundColor:myTheme.CustomTheme.whiteColor,
              body: Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: myTheme.CustomTheme.primaryColor,
                  size: 50,
                ),
              ),
            );
          } else {
            if (snapshot.data == "teacher" || snapshot.data == "admin") {
              return const TeacherHome();
            } else if (snapshot.data == "student") {
              return const StudentHome();
            } else {
              return const Login();
            }
          }
        },
      ),
    );
  }
}
