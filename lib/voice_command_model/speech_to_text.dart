import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:speech_to_text/speech_to_text.dart';

class STT {
   SpeechToText speech = SpeechToText();
  String textString = "Press The Button";
  double confidence = 1.0;
  bool isListen = false;

  // Future<String?> listen() async {
  //   speech = SpeechToText();
  //     bool avail = await speech.initialize();
  //     if (avail) {
  //
  //       speech.listen(onResult: (value) {
  //
  //           textString = value.recognizedWords;
  //           if (value.hasConfidenceRating && value.confidence > 0) {
  //             confidence = value.confidence;
  //           }
  //           print("slkudtg bikyg $textString");
  //       });
  //     }
  //     return textString;
  //
  // }
  void listen() async {
    if (!isListen) {
      bool avail = await speech.initialize();
      if (avail) {

        isListen = true;
        print("please wait inside if");
        speech.listen(
            onResult: (value) {
              print("inside result");
            textString = value.recognizedWords;
            if (value.hasConfidenceRating && value.confidence > 0) {
              confidence = value.confidence;

              print("please wait inside second if");
            }
            print("ksadgh jkshg $textString");
        });
      }
    } else {

      print("please wait inside else");
      isListen = false;

      speech.stop();
    }
  }
}
