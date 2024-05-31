import 'package:permission_handler/permission_handler.dart';

class Permissions{
  Future<bool> checkAudioPermission() async {
    bool permissionGranted = await Permission.microphone.isGranted && await Permission.speech.isGranted;
    if (!permissionGranted) {
      await Permission.microphone.request();
      await Permission.speech.request();
    }
    permissionGranted = await Permission.microphone.isGranted;
    return permissionGranted;
  }

}