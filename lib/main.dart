import 'package:flutter/material.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:metaphile_erp/Screens/Home/screens/Attendance/Attendance.dart';
import 'package:metaphile_erp/Screens/navigation_bar/Screens/result.dart';
import 'package:metaphile_erp/Screens/permissions.dart';
import 'package:metaphile_erp/voice_command_model/recoginize_intent.dart';
import 'package:metaphile_erp/voice_command_model/speek.dart';
import 'package:metaphile_erp/voice_command_model/wakeup.dart';
import 'package:porcupine_flutter/porcupine_manager.dart';
import 'package:speech_to_text/speech_to_text.dart' as speechToText;
import 'Screens/Home/screens/schoolGallery.dart';
import 'Screens/onBoarding/Screens/Forget.dart';
import 'Screens/onBoarding/Screens/login.dart';
import 'package:metaphile_erp/Screens/navigation_bar/Screens/navigtion_bar.dart' as nav;

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
        "/resultScreen" : (context) => const Result(),
        "/gallery":  (context) => const SchoolGallery(),
        '/dashboard': (context)=> const nav.NavigationBar(),
        '/attendance': (context) => const Attendance()
      },
      home: Material(child: Scaffold(body: MyHomePage())),
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
        textStyle:
        const TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold)),
    "developer": HighlightedWord(
        textStyle:
        const TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold)),
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
          listenMode: speechToText.ListenMode.dictation
        );
        await speech.listen(
          onResult: (value) async {
              setState(() {
                textString = value.recognizedWords;
                if (value.hasConfidenceRating && value.confidence > 0) {
                  confidence = value.confidence;
                }
              });
              if(value.finalResult){

                  try{
                    print(": $textString");
                    // textString  = await translateText(textString);


                    final Map<String,dynamic> navigationFromIntent = CustomIntent().determineIntent(textString);
                    print("converted text \n\n\n\n\n $textString \n output: $navigationFromIntent \n\n\n\n\n");
                    if(navigationFromIntent.isNotEmpty){
                      if(navigationFromIntent["route"] == "goback"){
                        Navigator.pop(context);
                        Navigator.of(context).pop();

                      }else{
                        Navigator.pushNamed(context, navigationFromIntent["route"],arguments: navigationFromIntent["attributes"]);
                      }
                    }

                    textString="";
                    listen();
                  }catch(e){
                    textString="";
                    listen();
                    Speak().speak("Something went wrong please try again!");

                  }


              }
            },
          pauseFor: const Duration(seconds: 6),
        ).whenComplete(() {
          showBottomSheet(context: context, builder: (context) {
            return BottomSheet(
              onClosing: () {

              },
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
          },);
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

  @override
  void initState() {
    super.initState();
    speech = speechToText.SpeechToText();
     Permissions().checkAudioPermission();
    Startlistening();
  }

  @override
  Widget build(BuildContext context) {
    cnxt = context;
    return Scaffold(body: Login());
  }


  Startlistening() async {
    PorcupineManager? manager = await Wakeup(listen).createPorcupineManager();
    try{
      await manager?.start();
      print("manager started successfully");
    }catch(e){
      print("manager $e");
    }
  }
}