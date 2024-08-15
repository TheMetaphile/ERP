
import 'package:porcupine_flutter/porcupine_error.dart';
import 'package:porcupine_flutter/porcupine_manager.dart';
import 'package:student/voice_command_model/speek.dart';


class Wakeup{
  late PorcupineManager _porcupineManager;
  late Function listingCallBack;
  Wakeup(this.listingCallBack);
  Future<void> _wakeWordCallback(int keywordIndex) async {

    await Speak().speak("Hey Mukul, what can i do for you").then((check) async {
      print("speak resultAPI.dart $check");
      if(check==1){
        print("check speek");
        _porcupineManager.stop();
        listingCallBack();
      }
      //STT().listen();
      // Set flag when speech recognition starts
      // No need for a while loop here
    });
  }
  String keywordAsset = "assets/Hey-erp_en_android_v3_0_0.ppn";
  //String accessKey = "tJpzZPs3dZ2+1c42pUjNX8eUzhCkrPxevf0mgfu2SAaW2uFsXPPzEg=="; //mine // Get this from https://console.picovoice.ai/
  String accessKey = "e7/qwhQKAYzYy2hSyt/DLQdG6TeG+vm2pbVjZu6kGYtARK6mCQhRiw=="; //mine // Get this from https://console.picovoice.ai/
  Future<PorcupineManager?> createPorcupineManager() async {
    try{
      _porcupineManager = await PorcupineManager.fromKeywordPaths(
          accessKey,
          [keywordAsset],
          sensitivities: [0.9],
          _wakeWordCallback);
      print("manager created");
      return _porcupineManager;

    } on PorcupineException catch (err) {
      // handle porcupine init error
      print("${err.message}");
    }
    return null;
  }
}