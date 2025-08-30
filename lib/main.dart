import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:untitled/StudentModule/NoteBookRecord/notebookRecordBloc/notebook_record_event.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckinBloc/teacher_attendance_checkin_bloc.dart';
import 'package:untitled/teacher-module/ClassWork/teacherClassWorkBloc/teacher_class_work_bloc.dart';
import 'package:untitled/teacher-module/HomeWork/TeacherHomeWorkBloc/teacher_home_work_bloc.dart';
import 'package:untitled/teacher-module/TeacherDashboardBloc/teacher_dashboard_bloc.dart';

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
import 'CustomTheme/customTheme.dart';
import 'Notification/Messanging.dart';
import 'StudentAPIs/Authentication/studentAuthentication.dart';
import 'StudentAPIs/SharedPreference/sharedPreferenceFile.dart';
import 'StudentAPIs/StudentModuleAPI/Ask_Doubts/ask_doubtAPI.dart';
import 'StudentAPIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';
import 'StudentAPIs/StudentModuleAPI/Notice/notice_API.dart';
import 'StudentAPIs/StudentModuleAPI/StudentLeave/studentLeaveApi.dart';
import 'StudentModule/Ask_Doubts/askDoubtBloc/ask_doubt_bloc.dart';
import 'StudentModule/Ask_Doubts/ask_doubts.dart';
import 'StudentModule/Attendance/StudentAttendanceBloc/sudent_attendance_bloc.dart';
import 'StudentModule/Attendance/studentAttendance.dart';
import 'StudentModule/Classword/StudentClassworkBloc/student_classwork_bloc.dart';
import 'StudentModule/Classword/StudentClassworkBloc/student_classwork_event.dart';
import 'StudentModule/Classword/classWork.dart';
import 'StudentModule/Fees/Fee_Due.dart';
import 'StudentModule/NoteBookRecord/noteBook_Record.dart';
import 'StudentModule/NoteBookRecord/notebookRecordBloc/notebook_record_bloc.dart';
import 'StudentModule/Notice/notice.dart';
import 'StudentModule/Notice/studentnotice/student_notice_bloc.dart';
import 'StudentModule/Notice/studentnotice/student_notice_event.dart';
import 'StudentModule/Result/result.dart';
import 'StudentModule/StudentHome/StudentHomeBloc/student_home_bloc.dart';
import 'StudentModule/StudentHome/studentHome.dart';
import 'StudentModule/StudentLeave/studentLeaveBloc/student_leave_bloc.dart';
import 'StudentModule/StudentLeave/student_leave.dart';
import 'StudentModule/homeWork/homeWork.dart';
import 'StudentModule/homeWork/student_homework_bloc/student_home_work_bloc.dart';
import 'firebase_options.dart';
import 'onBoarding/Screens/login.dart';
import 'onBoarding/Screens/Forget.dart';
import 'package:untitled/utils/theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
/*  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );*/
/*
  // Initialize FCM
  await FCMService.initializeFCM();
  String? token = await FCMService.getDeviceToken();
  print("FCM Token: $token");*/
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
      print("⚡ Getting SharedPreferences");
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? role = pref.getString("role");
      String? accessToken = pref.getString("accessToken");
      String? refreshToken = pref.getString("refreshToken");

      if (accessToken == null || refreshToken == null || role == null) return "none";

      if (role == "teacher" || role == "admin") {
        final api = TeacherAuthentication();
        print("🔍 Verifying teacher/admin token");
        bool isValid = await api.verifyAccessToken(accessToken);
        if (!isValid) {
          print("🔄 Token invalid, refreshing...");

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
        print("🔍 Verifying student token");

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
    return FutureBuilder<String>(
      future: getUserRoleAndVerifyToken(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return MaterialApp(
            home: Scaffold(
              backgroundColor: myTheme.CustomTheme.whiteColor,
              body: Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: myTheme.CustomTheme.primaryColor,
                  size: 50,
                ),
              ),
            ),
          );
        }

        final userRole = snapshot.data ?? "none";

        switch (userRole) {
          case "student":
            return StudentApp(userDetails: retrievedUserDetails);
          case "teacher":
          case "admin":
            return const TeacherApp();
          default:
            return const LoginApp();
        }
      },
    );
  }
}

// Student App with all Student BLoCs
class StudentApp extends StatelessWidget {
  final Map<String, dynamic> userDetails;

  const StudentApp({super.key, required this.userDetails});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<StudentHomeBloc>(
          create: (_) => StudentHomeBloc(),
        ),
        BlocProvider<AttendanceBloc>(
            create: (_) => AttendanceBloc(apiObj: AttendanceApi())
        ),
        BlocProvider<StudentClassworkBloc>(
            create: (_) => StudentClassworkBloc()
        ),
        BlocProvider<StudentHomeworkBloc>(
            create: (_) => StudentHomeworkBloc()
        ),
        BlocProvider(
            create: (context) => StudentLeaveBloc(leaveApi: StudentLeaveApi())
        ),
        BlocProvider(
          create: (context) => AskDoubtBloc(doubtObj: AskDoubtAPI()),
        ),
        BlocProvider(
          create: (context) => StudentNoticeBloc(
            noticeBoardAPI: NoticeBoardAPI(),
          )..add(FetchNotices()),
          lazy: false,
        ),
        BlocProvider(
          create: (context) => NoteBookRecordBloc(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        routes: {
          // Shared Routes
          '/resetPassword': (context) => ForgetPassword(),
          '/logout': (context) => const Login(),

          // Student Routes
          '/student-dashboard': (context) => const StudentHome(),
          '/student-attendance': (context) => StudentAttendanceUI(),
          '/student-leave': (context) => const StudentLeaveScreen(),
          '/student-result': (context) => ReportCardOpen(userDetails: userDetails),
          '/student-classwork': (context) => const StudentClasswork(),
          '/student-fee-status': (context) => FeesDue(email: userDetails["email"]),
          '/student-notebook': (context) => StudentNoteBookRecord(
            currentClass: userDetails["currentClass"],
            section: userDetails["section"],
          ),
          '/student-homework': (context) => const StudentHomework(),
          '/student-notice': (context) => const StudentNoticeScreen(),
        //  '/student-ask-doubts': (context) => const AskDoubts(),
        },
        home: const StudentHome(),
      ),
    );
  }
}

// Teacher App - you can add Teacher BLoCs here when you create them
class TeacherApp extends StatelessWidget {
  const TeacherApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<TeacherDashboardBloc>(create: (_) => TeacherDashboardBloc()),
        BlocProvider<TeacherAttendanceCheckInBloc>(create: (_) => TeacherAttendanceCheckInBloc()),
        BlocProvider<ClassWorkBloc>(create: (_) => ClassWorkBloc()),
        BlocProvider<HomeWorkBloc>(create: (_) => HomeWorkBloc()),
      ],
      child: MaterialApp(
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
        },
        home: const TeacherHome(),
      ),
    );
  }
}

// Login App (no BLoCs needed)
class LoginApp extends StatelessWidget {
  const LoginApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/resetPassword': (context) => ForgetPassword(),
      },
      home: const Login(),
    );
  }
}
