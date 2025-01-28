import 'dart:async';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:audio_session/audio_session.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:flutter_snowboy/flutter_snowboy.dart';
import 'package:path_provider/path_provider.dart';

import 'speek.dart';

const kSampleRate = 16000;
const kNumChannels = 1;

class SnowBoyWakeUp {
  late Function listingCallBack;
  SnowBoyWakeUp(this.listingCallBack);

  late Snowboy detector = Snowboy();

  final FlutterSoundRecorder _micRecorder = FlutterSoundRecorder();
  StreamController<Uint8List>? _recordingDataController;
  StreamSubscription? _recordingDataSubscription;

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    final String modelPath = await copyModelToFilesystem("hotword.pmdl");
    // Create detector object and prepare it
    await detector.prepare(modelPath);
    detector.hotwordHandler = hotwordHandler;
    await configureAudioSession();
  }

  Future<void> configureAudioSession() async {
    final session = await AudioSession.instance;
    await session.configure(AudioSessionConfiguration(
      avAudioSessionCategory: AVAudioSessionCategory.playAndRecord,
      avAudioSessionCategoryOptions:
      AVAudioSessionCategoryOptions.defaultToSpeaker |
      AVAudioSessionCategoryOptions.allowBluetooth,
      //     AVAudioSessionCategoryOptions.duckOthers,
      // avAudioSessionMode: AVAudioSessionMode.spokenAudio,
      avAudioSessionMode: AVAudioSessionMode.defaultMode,
      avAudioSessionRouteSharingPolicy:
      AVAudioSessionRouteSharingPolicy.defaultPolicy,
      avAudioSessionSetActiveOptions: AVAudioSessionSetActiveOptions.none,
      androidAudioAttributes: const AndroidAudioAttributes(
        contentType: AndroidAudioContentType.speech,
        flags: AndroidAudioFlags.none,
        usage: AndroidAudioUsage.voiceCommunication,
      ),
      androidAudioFocusGainType: AndroidAudioFocusGainType.gain,
      androidWillPauseWhenDucked: true,
    ));
    await session.setActive(true);
  }

  // Copy model from asset bundle to temp directory on the filesystem
  static Future<String> copyModelToFilesystem(String filename) async {
    final String dir = (await getTemporaryDirectory()).path;
    final String finalPath = "$dir/$filename";
    if (await File(finalPath).exists() == true) {
      // Don't overwrite existing file
      return finalPath;
    }
    ByteData bytes = await rootBundle.load("assets/$filename");
    final buffer = bytes.buffer;
    await File(finalPath).writeAsBytes(
        buffer.asUint8List(bytes.offsetInBytes, bytes.lengthInBytes));
    return finalPath;
  }

  // Function to invoke when hotword is detected
  Future<void> hotwordHandler() async {
    await Speak().speak("Hey Mukul, what can i do for you").then((check) async {
      print("speak resultAPI.dart $check");
      if (check == 1) {
        print("check speek");
        await stopDetection().whenComplete(() => listingCallBack());
      }
      //STT().listen();
      // Set flag when speech recognition starts
      // No need for a while loop here
    });
  }

  Future<void> startDetection() async {
    // Prep recording session
    await _micRecorder.openRecorder();

    // Create recording stream
    _recordingDataController = StreamController<Uint8List>();
    _recordingDataSubscription =
        _recordingDataController?.stream.listen((buffer) {
          // When we get data, feed it into Snowboy detector
          detector.detect(buffer);
        });

    // Start recording
    await _micRecorder.startRecorder(
      toStream: _recordingDataController!.sink,
      codec: Codec.pcm16,
      numChannels: kNumChannels,
      sampleRate: kSampleRate,
    );
  }


  Future<void> stopDetection() async {
    await _micRecorder.stopRecorder();
    await _micRecorder.closeRecorder();
    await _recordingDataSubscription?.cancel();
    await _recordingDataController?.close();
  }
}
