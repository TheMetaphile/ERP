

import '../speek.dart';

class PasswordIntent{// Importing the speek module, assuming it's defined in a separate file

  void whyFound() {
    String text = "You need to change your password once in 3 to 4 months so that your account remains secure";
    Speak().speak(text);
  }

  Map<String, List<String>> intentKeywords = {
    "changePassword": [
      "change password",
      "change the password",
      "change your password",
      "password change",
      "reset password",
      "update password",
      "change my password",
      "reset my password",
      "update my password",
      "let me have a password"
    ],
  };

  Map<String, dynamic> passwordIntent(String userInput) {
    Map<String, dynamic> output={};
    bool checkWhy = userInput.contains("why");
    if (checkWhy) {
      whyFound();
      return {};
    }
    bool checkHow = userInput.contains("how");
    if (checkHow) {
    Speak().speak("If you forget your password, then you have to log out from your account if you are logged in and go through the 'Forgot password' process to set a new password. If you know your current password, then go to the 'Change password' screen to change it.");
    return {};
    }

    for (var keyword in intentKeywords["changePassword"]!) {
        bool check = userInput.contains(keyword);
        print("check $check, keyword $keyword");
        if (check) {
          // Text to be converted to speech
          Speak().speak("User wants to navigate to change Password screen");
          output =  {"route": "/resetPassword"};
          break;
        }
      }
      if(output.isEmpty){
        Speak().speak("Sorry I didnt understant you intent");
      }
    return output;


  }

}