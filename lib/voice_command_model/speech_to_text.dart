import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';

class STT {
  final SpeechToText _speechToText = SpeechToText();
  late String _lastWords;
  late String _sentence;

  final Function(bool) onListeningStateChange;

  STT({required this.onListeningStateChange});

  Future<bool> initSpeech() async {
    return await _speechToText.initialize(
      onStatus: (status) async {
      if(status == "done"){
        bool test = _speechToText.hasRecognized;
        print("sentance $_sentence $test");
        String test1 = await stopListening();
        print("TEst $test1");
      }
    },
      finalTimeout: Duration(seconds: 20),
    );
  }

  Future<void> startListening() async {
    await _speechToText.listen(
        onResult: (result) {
          print("from reuslt");
          print(result.recognizedWords);
          print(result.alternates);
          print(result.confidence);
          print(result.finalResult);
        },


        listenOptions:  SpeechListenOptions(
          cancelOnError: false,
          partialResults: true,
          onDevice: false,
        )
    );
  }

  bool isListening() {
    return _speechToText.isListening;
  }

  Future<String> stopListening() async {
    await _speechToText.stop();
    return _sentence; // Return the recognized sentence when stopped
  }

  void onSpeechResult(SpeechRecognitionResult result) {
    print(result.recognizedWords.isNotEmpty);

      _lastWords = result.recognizedWords;
      _sentence += ' $_lastWords';
      print('Last word: $_lastWords');
      print('Sentence: $_sentence');
    // Notify the listening state change
    onListeningStateChange(_speechToText.isListening);
  }
}
