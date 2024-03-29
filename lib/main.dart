import 'package:flutter/material.dart';
import 'package:metaphile_erp/Screens/permissions.dart';
import 'package:metaphile_erp/sst.dart';
import 'package:metaphile_erp/voice_command_model/speek.dart';
import 'package:metaphile_erp/voice_command_model/wakeup.dart';
import 'package:porcupine_flutter/porcupine_manager.dart';
import 'Screens/onBoarding/Screens/intro.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Permissions().checkAudioPermission();
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    Startlistening();
  }
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SpeechToTextPage()
    );
  }
  Startlistening() async {
    PorcupineManager? manager = await Wakeup().createPorcupineManager();
    try{
      await manager?.start();
      print("manager started successfully");
    }catch(e){
      print("manager $e");
    }
  }
}

