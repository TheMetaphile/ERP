import 'package:flutter/material.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:speech_to_text/speech_to_text.dart' as speechToText;
import 'package:untitled/Charts/eventCalender.dart';
import 'package:untitled/ChatView/chatView.dart';
import 'package:untitled/admin-module/StudentPannel/StudentResults.dart';
import 'package:untitled/admin-module/adminHome.dart';
import 'package:untitled/admin-module/expenseManagement.dart';
import 'package:untitled/teacher-module/Birthday.dart';
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:untitled/teacher-module/TimeTable.dart';
import 'package:untitled/teacher-module/assignment.dart';
import 'package:untitled/teacher-module/classWork.dart';
import 'package:untitled/teacher-module/homeWork.dart';
import 'package:untitled/teacher-module/noticeBoard.dart';
import 'package:untitled/teacher-module/result.dart';
import 'package:untitled/teacher-module/studentFeesReport.dart';
import 'package:untitled/teacher-module/studentReportCard.dart';
import 'package:untitled/teacher-module/teacherAttendance.dart';
import 'package:untitled/teacher-module/teacherAttendanceCheckIn.dart';
import 'package:untitled/teacher-module/teacherLeave.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';
import 'package:untitled/voice_command_model/recoginize_intent.dart';
import 'package:untitled/voice_command_model/snow_boy_wake_up.dart';
import 'package:untitled/voice_command_model/speek.dart';
import 'package:permission_handler/permission_handler.dart';
import 'onBoarding/Screens/Forget.dart';
import 'onBoarding/Screens/email_verification.dart';
import 'onBoarding/Screens/login.dart';
import 'voice_command_model/permission/permission.dart';
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/resetPassword': (context) => ForgetPassword(),
        "/resultScreen": (context) => const Result(),

         '/dashboard': (context) => const TeacherHome(),
         '/attendance': (context) => const TeacherAttendance(),
         '/leave': (context) =>  const TeacherLeave(),
          '/assignment': (context) => const TeacherAssignment(),
          '/result': (context) => const StudentResults(),
           '/expense management': (context) =>const ExpenseManagement(),
           '/classwork': (context) =>const ClassWork(),
           '/check-in': (context) =>const TeacherAttendanceCheckIn(),
        '/classes': (context) =>const Timetable(),
        '/student fee status': (context) =>const StudentReportCard(screen: 'Student Fees Status',),
        '/student notebook record': (context) => const StudentReportCard(screen: 'Note Book Record',),
        '/home': (context) =>const TeacherHome(),
        '/salary': (context) =>const TeacherSalary(),
        '/admin panel': (context) =>const AdminHome(),
        '/homework': (context) =>const HomeWork(),
        '/chat': (context) =>const ChatScreen(),
        '/notice-board': (context) =>const NoticeBoard(),

          '/logout': (context) =>Login(),

      },
      home:Material(child: Scaffold(body: MyHomePage())),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late speechToText.SpeechToText speech;
  late BuildContext cnxt;
  String textString = "";
  bool isListen = false;
  double confidence = 1.0;
  final Map<String, HighlightedWord> highlightWords = {
    "flutter": HighlightedWord(
        textStyle: const TextStyle(
            color: Colors.redAccent, fontWeight: FontWeight.bold)),
    "developer": HighlightedWord(
        textStyle: const TextStyle(
            color: Colors.redAccent, fontWeight: FontWeight.bold)),
  };

  void listen() async {
    print("listen called successfully");
    if (!isListen) {
      bool avail = await speech.initialize(
        onError: (errorNotification) {
          Startlistening();
          print("erp error : ${errorNotification.errorMsg}");
        },
      );

      if (avail) {
        setState(() {
          isListen = true;
        });
        speechToText.SpeechListenOptions(
            listenMode: speechToText.ListenMode.dictation);
        await speech.listen(
          onResult: (value) async {
            setState(() {
              textString = value.recognizedWords;
              if (value.hasConfidenceRating && value.confidence > 0) {
                confidence = value.confidence;
              }
            });
            if (value.finalResult) {
              try {
                print(": $textString");
                // textString  = await translateText(textString);

                final Map<String, dynamic> navigationFromIntent =
                CustomIntent().determineIntent(textString);
                print(
                    "converted text \n\n\n\n\n $textString \n output: $navigationFromIntent \n\n\n\n\n");
                if (navigationFromIntent.isNotEmpty) {
                  if (navigationFromIntent["route"] == "/goback") {
                    Navigator.pop(context);
                    Navigator.of(context).pop();
                  } else {
                    Navigator.pushNamed(context, navigationFromIntent["route"],
                        arguments: navigationFromIntent["attributes"]);
                  }
                }

                textString = "";
                listen();
              } catch (e) {
                textString = "";
                listen();
                Speak().speak("Something went wrong please try again!");
                print("\n\n\n $e \n\n\n");
              }
            }
          },
          pauseFor: const Duration(seconds: 6),
        )
            .whenComplete(() {
          showBottomSheet(
            context: context,
            builder: (context) {
              return BottomSheet(
                onClosing: () {},
                builder: (context) {
                  return Container(
                    padding: const EdgeInsets.all(20),
                    child: TextHighlight(
                      text: textString,
                      words: highlightWords,
                      textStyle: const TextStyle(
                          fontSize: 25.0,
                          color: Colors.black,
                          fontWeight: FontWeight.bold),
                    ),
                  );
                },
              );
            },
          );
        });
      }
    }
    else {
      setState(() {
        isListen = false;
        speech.stop();
        Startlistening();
      });
    }
  }

  late SnowBoyWakeUp _snowBoyWakeUp;
  @override
  void initState() {
    super.initState();
    speech = speechToText.SpeechToText();
    Permissions().checkAudioPermission();
    _snowBoyWakeUp = SnowBoyWakeUp(listen);
    _snowBoyWakeUp.initPlatformState();
    Startlistening();
  }

  @override
  Widget build(BuildContext context) {
    cnxt = context;
    return Scaffold(body: Login());
  }

  Startlistening() async {
    await _snowBoyWakeUp.startDetection();
  }
}

