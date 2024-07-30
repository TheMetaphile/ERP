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
import 'package:untitled/utils/theme.dart';
import 'package:workmanager/workmanager.dart';
import 'APIs/Authentication/teacherAuthenticationService.dart';
import 'WorkManager1/workmanager1.dart';
import 'admin-module/TeacherPannel/teacherAttendance.dart';
import 'onBoarding/Screens/Forget.dart';

import 'onBoarding/Screens/login.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();


  runApp(MyApp());

}


class MyApp extends StatefulWidget {





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
      TeacherAuthentication apiObj = TeacherAuthentication();
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? refreshToken = pref.getString("refreshToken");

      if (accessToken == null || refreshToken == null) {
        return false;
      }

      bool isValid = await apiObj.verifyAccessToken(accessToken);
      if (isValid) {
        SharedPreferences pref=await SharedPreferences.getInstance();
        String? teacherClass=pref.getString("teacherClass");
        String? teacherSection=pref.getString("teacherSection");
        if(teacherClass==null && teacherSection == null){


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

          print("accessTOken $accessToken");
          print(" session ${calculateCurrentSession()}");
          print("date $date");
          if(accessToken!=null){
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

              }


            }
          }



          schedulePreferenceClear();
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
      // fetchSubstitution();
    Workmanager().initialize(callbackDispatcher,isInDebugMode: true);
    _checkForCompletedTask();
  }

  void _checkForCompletedTask() async {
    print("_checkForCompletedTask 1111///////////");
    final prefs = await SharedPreferences.getInstance();
    final completed = prefs.getBool('backgroundTaskCompleted') ?? false;
    if (completed) {
      setState(() {

      });
      // Reset the flag
      await prefs.setBool('backgroundTaskCompleted', false);
    }
  }

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
              return snapshot.data == true ? TeacherHome() : Login();
            }
          },
        ),
      ),
    );
  }
}

// class InitializeVoiceCommands extends StatefulWidget {
//   @override
//   _InitializeVoiceCommandsState createState() => _InitializeVoiceCommandsState();
// }
//
// class _InitializeVoiceCommandsState extends State<InitializeVoiceCommands> {
//   late SnowBoyWakeUp _snowBoyWakeUp;
//   dynamic isAuthenticated;
//   late speechToText.SpeechToText speech;
//   late BuildContext cnxt;
//   String textString = "";
//   bool isListen = false;
//   double confidence = 1.0;
//   final Map<String, HighlightedWord> highlightWords = {
//     "flutter": HighlightedWord(
//         textStyle: const TextStyle(
//             color: Colors.redAccent, fontWeight: FontWeight.bold)),
//     "developer": HighlightedWord(
//         textStyle: const TextStyle(
//             color: Colors.redAccent, fontWeight: FontWeight.bold)),
//   };
//
//
//   @override
//   void initState() {
//     super.initState();
//     initializeApp();
//   }
//
//   Future<void> initializeApp() async {
//     await Permissions().checkAudioPermission();
//     bool permissionGranted = await requestPermissions();
//     if (permissionGranted) {
//        await _initializeSpeechRecognition();
//       await _initializeWakeUp();
//       // Once initialization is complete, navigate to TeacherHome
//       Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => TeacherHome()));
//     } else {
//       showRedSnackBar("Permission not Granted", context);
//       // Handle the case when permissions are not granted
//       print("Permissions not granted.");
//       // You might want to show a dialog to the user explaining why permissions are needed
//     }
//   }
//
//   Future<bool> requestPermissions() async {
//     PermissionStatus status = await Permission.microphone.request();
//     return status.isGranted;
//   }
//
//   Future<void> _initializeSpeechRecognition() async {
//     speech = speechToText.SpeechToText();
//     print("Speech recognition initialized.");
//   }
//
//
//   Future<void> _initializeWakeUp() async {
//     _snowBoyWakeUp = SnowBoyWakeUp(listen);
//     await _snowBoyWakeUp.initPlatformState();
//     await startlistening();
//     print("Wake-up mechanism initialized.");
//   }
//
//   void listen() async {
//     print("listen called successfully");
//
//     if (!isListen) {
//       bool avail = await speech.initialize(
//         onError: (errorNotification) {
//          startlistening();
//           print("erp error : ${errorNotification.errorMsg}");
//         },
//       );
//
//       if (avail) {
//
//         setState(() {
//           isListen = true;
//         });
//         speechToText.SpeechListenOptions(
//             listenMode: speechToText.ListenMode.dictation);
//         await speech.listen(
//           onResult: (value) async {
//
//             setState(() {
//               textString = value.recognizedWords;
//               if (value.hasConfidenceRating && value.confidence > 0) {
//                 confidence = value.confidence;
//               }
//             });
//             if (value.finalResult) {
//               try {
//                 print(": $textString");
//                 final Map<String, dynamic> navigationFromIntent =
//                 CustomIntent().determineIntent(textString);
//                 print(
//                     "converted text \n\n\n\n\n $textString \n output: $navigationFromIntent \n\n\n\n\n");
//                 if (navigationFromIntent.isNotEmpty) {
//                   if (navigationFromIntent["route"] == "/goback") {
//                     Navigator.pop(context);
//                     Navigator.of(context).pop();
//                   } else {
//                     Navigator.pushNamed(context, navigationFromIntent["route"],
//                         arguments: navigationFromIntent["attributes"]);
//                   }
//                 }
//
//                 textString = "";
//               } catch (e) {
//                 textString = "";
//                 if (mounted) listen(); // Check if mounted before calling listen again
//                 Speak().speak("Something went wrong please try again!");
//                 print("\n\n\n $e \n\n\n");
//               }
//             }
//           },
//           pauseFor: const Duration(seconds: 6),
//         ).whenComplete(() {
//
//           showBottomSheet(
//             context: context,
//             builder: (context) {
//               return BottomSheet(
//                 onClosing: () {},
//                 builder: (context) {
//                   return Container(
//                     padding: const EdgeInsets.all(20),
//                     child: TextHighlight(
//                       text: textString,
//                       words: highlightWords,
//                       textStyle: const TextStyle(
//                           fontSize: 25.0,
//                           color: Colors.black,
//                           fontWeight: FontWeight.bold),
//                     ),
//                   );
//                 },
//               );
//             },
//           );
//         });
//       }
//     } else {
//
//       setState(() {
//         isListen = false;
//         speech.stop();
//         startlistening();
//       });
//     }
//   }
//
//
//
//
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Center(
//         child: CircularProgressIndicator(),
//       ),
//     );
//   }
//   startlistening() async {
//     await _snowBoyWakeUp.startDetection();
//   }
// }

//
// class MyHomePage extends StatefulWidget {
//   const MyHomePage({super.key});
//   @override
//   _MyHomePageState createState() => _MyHomePageState();
// }
//
// class _MyHomePageState extends State<MyHomePage> {
//   dynamic isAuthenticated;
//
//   late speechToText.SpeechToText speech;
//   late BuildContext cnxt;
//   String textString = "";
//   bool isListen = false;
//   double confidence = 0.7;
//   final Map<String, HighlightedWord> highlightWords = {
//     "flutter": HighlightedWord(
//         textStyle: const TextStyle(
//             color: Colors.redAccent, fontWeight: FontWeight.bold)),
//     "developer": HighlightedWord(
//         textStyle: const TextStyle(
//             color: Colors.redAccent, fontWeight: FontWeight.bold)),
//   };
//
//   void listen() async {
//     print("listen called successfully");
//     if (!isListen) {
//       bool avail = await speech.initialize(
//         onError: (errorNotification) {
//           startlistening();
//           print("erp error : ${errorNotification.errorMsg}");
//         },
//       );
//
//       if (avail) {
//         setState(() {
//           isListen = true;
//         });
//         speechToText.SpeechListenOptions(
//             listenMode: speechToText.ListenMode.dictation);
//         await speech.listen(
//           onResult: (value) async {
//             setState(() {
//               textString = value.recognizedWords;
//               if (value.hasConfidenceRating && value.confidence > 0) {
//                 confidence = value.confidence;
//               }
//             });
//             if (value.finalResult) {
//               try {
//                 print(": $textString");
//                 // textString  = await translateText(textString);
//
//                 final Map<String, dynamic> navigationFromIntent =
//                 CustomIntent().determineIntent(textString);
//                 print(
//                     "converted text \n\n\n\n\n $textString \n output: $navigationFromIntent \n\n\n\n\n");
//                 if (navigationFromIntent.isNotEmpty) {
//                   if (navigationFromIntent["route"] == "/goback") {
//                     Navigator.pop(context);
//                     Navigator.of(context).pop();
//                   } else {
//                     Navigator.pushNamed(context, navigationFromIntent["route"],
//                         arguments: navigationFromIntent["attributes"]);
//                   }
//                 }
//
//                 textString = "";
//                 listen();
//               } catch (e) {
//                 textString = "";
//                 listen();
//                 Speak().speak("Something went wrong please try again!");
//                 print("\n\n\n $e \n\n\n");
//               }
//             }
//           },
//           pauseFor: const Duration(seconds: 6),
//         )
//             .whenComplete(() {
//           showBottomSheet(
//             context: context,
//             builder: (context) {
//               return BottomSheet(
//                 onClosing: () {},
//                 builder: (context) {
//                   return Container(
//                     padding: const EdgeInsets.all(20),
//                     child: TextHighlight(
//                       text: textString,
//                       words: highlightWords,
//                       textStyle: const TextStyle(
//                           fontSize: 25.0,
//                           color: Colors.black,
//                           fontWeight: FontWeight.bold),
//                     ),
//                   );
//                 },
//               );
//             },
//           );
//         });
//       }
//     }
//     else {
//       setState(() {
//         isListen = false;
//         speech.stop();
//         startlistening();
//       });
//     }
//   }
//
//   late SnowBoyWakeUp _snowBoyWakeUp;
//
//
//   @override
//   void initState() {
//     super.initState();
//     initializeApp();
//   }
//
//   void initializeApp() async {
//     await Permissions().checkAudioPermission();
//     bool permissionGranted = await requestPermissions();
//     if (permissionGranted) {
//       _initializeSpeechRecognition();
//       _initializeWakeUp();
//
//
//     } else {
//       // Handle the case when permissions are not granted
//       print("Permissions not granted.");
//     }
//   }
//
//   Future<bool> requestPermissions() async {
//     PermissionStatus status = await Permission.microphone.request();
//     return status.isGranted;
//   }
//
//   void _initializeSpeechRecognition() {
//     speech = speechToText.SpeechToText();
//     print("Speech recognition initialized.");
//   }
//
//   void _initializeWakeUp() {
//     _snowBoyWakeUp = SnowBoyWakeUp(listen);
//     _snowBoyWakeUp.initPlatformState();
//     startlistening();
//     print("Wake-up mechanism initialized.");
//   }
//
//   // Future<bool> verifyToken() async {
//   //   try {
//   //     TeacherAuthentication apiObj = TeacherAuthentication();
//   //     SharedPreferences pref = await SharedPreferences.getInstance();
//   //     String? accessToken = pref.getString("accessToken");
//   //     String? refreshToken = pref.getString("refreshToken");
//   //     print("Access token: $accessToken");
//   //     print("Refresh token: $refreshToken");
//   //
//   //     if (accessToken == null || refreshToken == null) {
//   //       return false;
//   //     }
//   //
//   //     bool isValid = await apiObj.verifyAccessToken(accessToken);
//   //     if (isValid) {
//   //       print("initializeApp");
//   //       initializeApp();
//   //       return true;
//   //     } else {
//   //       String newAccessToken = await apiObj.generateNewAccessToken(
//   //           refreshToken);
//   //       if (newAccessToken.isNotEmpty &&
//   //           newAccessToken != "Invalid refresh token") {
//   //         await pref.setString("accessToken", newAccessToken);
//   //         print("initializeApp");
//   //         initializeApp();
//   //         return true;
//   //       } else {
//   //         return false;
//   //       }
//   //     }
//   //   } catch (e) {
//   //     print("Error during token verification: $e");
//   //     return false;
//   //   }
//   // }
// CustomTheme themeObj= CustomTheme();
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false,
//
//       home: Scaffold(
//         body: Center(
//           child: LoadingAnimationWidget.threeArchedCircle(
//             color: themeObj.primayColor,
//             size: 50,
//           ),
//         ),
//       ),
//     );
//   }
//
//   startlistening() async {
//     await _snowBoyWakeUp.startDetection();
//   }
// }
