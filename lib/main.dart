import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:permission_handler/permission_handler.dart';
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
import 'Notification/local_notification_service.dart';
import 'StudentModule/Fees/Fee_Due.dart';
import 'StudentModule/Result/result.dart';
import 'StudentModule/StudentHome/studentHome.dart';
import 'firebase_options.dart';
import 'onBoarding/Screens/Forget.dart';

import 'onBoarding/Screens/login.dart';

@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print("inside background handler");
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Workmanager().initialize(callbackDispatcher,isInDebugMode: false);
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  bool status= await Permission.notification.isGranted;

  FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);
  print("Status $status");
  if(status){}
  else {
    print("Status $status");
    if (await Permission.notification.isPermanentlyDenied) {
      await openAppSettings();
    } else {
      await Permission.notification.request().then((value) {
        status = value.isGranted;
      });
    }
  }

  String? token = await FCMService.getDeviceToken();
  print("Token $token");

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
    FirebaseMessaging.onMessage.listen(firebaseMessagingBackgroundHandler);

    FirebaseMessaging.onBackgroundMessage.call(firebaseMessagingBackgroundHandler);
    FirebaseMessaging.onMessageOpenedApp.listen(firebaseMessagingBackgroundHandler);


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



  // Future<void> setupInteractedMessage() async {
  //   // Get any messages which caused the application to open from a terminated state.
  //
  //   RemoteMessage? initialMessage = await FirebaseMessaging.instance.getInitialMessage();
  //   print("intial message $initialMessage");
  //   if (initialMessage != null) {
  //     _handleMessage(initialMessage);
  //   }
  //
  //   // Also handle any interaction when the app is in the background via a Stream listener
  //   FirebaseMessaging.onMessageOpenedApp.listen(_handleMessage);
  //
  //   FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  //     print("FirebaseMessaging.onMessage.listen");
  //     if (message.notification != null) {
  //       print(message.notification!.title);
  //       print(message.notification!.body);
  //       print("message.data11 ${message.data}");
  //       LocalNotificationService.display(message);
  //     }
  //   });
  // }
  //
  // void _handleMessage(RemoteMessage message) {
  // print("message  $message");
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



class FCMService {
  static Future<String?> getDeviceToken() async {
    FirebaseMessaging messaging = FirebaseMessaging.instance;

    // Request permission (required for iOS)
    NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      // Get the token
      String? token = await messaging.getToken();
      print('FCM Token: $token');
      return token;
    } else {
      print('User declined or has not accepted permission');
      return null;
    }
  }
}
