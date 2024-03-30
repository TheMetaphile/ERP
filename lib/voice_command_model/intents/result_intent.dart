

import 'package:metaphile_erp/voice_command_model/speek.dart';

class ResultIntent{
  Map<String, dynamic> resultIntent(String userInput){
    RegExp classPattern = RegExp(r'class\s*(\d+)\s*(?:th|st|nd|rd)?\s*([A-Za-z]+)?');
    RegExp sectionPattern = RegExp(r'section\s*([A-Za-z]+)');

    Match? classMatch = classPattern.firstMatch(userInput);
    Match? sectionMatch = sectionPattern.firstMatch(userInput);
    String? classValue = classMatch?.group(1)!;
    String? sectionValue = classMatch?.group(2) != null ? classMatch?.group(2)! : "not specified";
    if (classMatch == null && sectionMatch == null) {
      Speak().speak("You didn't mention the class and section for which you want to see the result screen. Please try again.");
    } else {
      if (classMatch == null) {
        Speak().speak("You didn't mention the class for which you want to see the result screen. Please try again.");
      } else {

        Speak().speak("User wants to see the result of Class $classValue Section $sectionValue. Proceeding to display the result screen.");
      }
    }
    return {
      "route": "/resultScreen",
      "attributes": {
        "class": classValue,
        "section": sectionValue
      }
    };
  }

}