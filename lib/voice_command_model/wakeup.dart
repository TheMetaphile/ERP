import 'package:metaphile_erp/voice_command_model/speech_to_text.dart';
import 'package:metaphile_erp/voice_command_model/speek.dart';
import 'package:porcupine_flutter/porcupine_error.dart';
import 'package:porcupine_flutter/porcupine_manager.dart';

class Wakeup{
  late PorcupineManager _porcupineManager;
  late Function listingCallBack;
  Wakeup(this.listingCallBack);
  Future<void> _wakeWordCallback(int keywordIndex) async {

    await Speak().speak("Hello, what can i do for you").then((check) async {
      print("speak result $check");
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
  String accessKey = "tJpzZPs3dZ2+1c42pUjNX8eUzhCkrPxevf0mgfu2SAaW2uFsXPPzEg=="; // Get this from https://console.picovoice.ai/
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