import 'package:metaphile_erp/voice_command_model/intents/result_intent.dart';

import 'intents/password_intent.dart';

class CustomIntent{
  Map<String, dynamic> intent_keywords = {
  "changePassword": [
  "change password", "change your password", "password change", "reset password", "update password", "change my password", "reset my password", "update my password",
  /// Additional keywords for parents
  "parent change password", "parent password change",
  "parent update password", "parent change my password",
  /// Additional keywords for teachers
  "teacher change password", "teacher password change",
  "teacher update password", "teacher change my password",
  /// Additional keywords for students
  "student change password", "student password change",
  "student update password", "student change my password"
  ],
  "resultIntent": ["result"],
  "attendanceIntent": [
  "attendance", "attend", "attendance record", "attendance sheet",
  /// Additional keywords for parents
  "parent attendance", "parent attend", "parent attendance record", "parent attendance sheet",
  /// Additional keywords for teachers
  "teacher attendance", "teacher attend", "teacher attendance record", "teacher attendance sheet",
  /// Additional keywords for students
  "student attendance", "student attend", "student attendance record", "student attendance sheet"
  ],
  /// Add more intents and keywords as needed
  "dashboardIntent": [
  "dashboard", "home", "main", "overview", "summary", "play quiz",
  /// Additional keywords for parents
  "parent dashboard", "parent home", "parent main", "parent overview", "parent summary", "parent play quiz",
  "parent view", "parent dashboard view", "parent home page",
  /// Additional keywords for teachers
  "teacher dashboard", "teacher home", "teacher main", "teacher overview", "teacher summary", "teacher play quiz",
  "teacher view", "teacher dashboard view", "teacher home page",
  /// Additional keywords for students
  "student dashboard", "student home", "student main", "student overview", "student summary", "student play quiz",
  "student view", "student dashboard view", "student home page"
  ],
    "goBack": [
      "go back"
    ],
  "gallery": [
  "gallery", "photo gallery", "pictures", "images", "photo album",

  "parent gallery", "parent photo gallery", "parent pictures", "parent images", "parent photo album",

  "teacher gallery", "teacher photo gallery", "teacher pictures", "teacher images", "teacher photo album",

  "student gallery", "student photo gallery", "student pictures", "student images", "student photo album"
  ],
  };
  Map<String,dynamic> word_to_num = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
  "ten": "10",
  "eleven": "11",
  "twelve": "12",
  "thirteen": "13",
  "fourteen": "14",
  "fifteen": "15",
  "sixteen": "16",
  "seventeen": "17",
  "eighteen": "18",
  "nineteen": "19",
  "twenty": "20",
  "twenty-one": "21",
  "twenty-two": "22",
  "twenty-three": "23",
  "twenty-four": "24",
  "twenty-five": "25",
  "twenty-six": "26",
  "twenty-seven": "27",
  "twenty-eight": "28",
  "twenty-nine": "29",
  "thirty": "30",
  "first": "1",
  "second": "2",
  "third": "3",
  "fourth": "4",
  "fifth": "5",
  "sixth": "6",
  "seventh": "7",
  "eighth": "8",
  "ninth": "9",
  "tenth": "10",
  "eleventh": "11",
  "twelfth": "12",
  "thirteenth": "13",
  "fourteenth": "14",
  "fifteenth": "15",
  "sixteenth": "16",
  "seventeenth": "17",
  "eighteenth": "18",
  "nineteenth": "19",
  "twentieth": "20",
  "twenty-first": "21",
  "twenty-second": "22",
  "twenty-third": "23",
  "twenty-fourth": "24",
  "twenty-fifth": "25",
  "twenty-sixth": "26",
  "twenty-seventh": "27",
  "twenty-eighth": "28",
  "twenty-ninth": "29",
  "thirtieth": "30"
  ///# Add more mappings as needed
  };
  Map<String,dynamic> determineIntent(String userInput,) {
    // Tokenize user input
    userInput = userInput.toLowerCase();

    // Match tokens against intent keywords
    for (var intent in intent_keywords.keys) {
      for (var keyword in intent_keywords[intent]!) {
        if (userInput.contains(keyword)) {
          switch (intent){
            case "changePassword":
              return PasswordIntent().passwordIntent(userInput);
            case "resultIntent":
              return ResultIntent().resultIntent(userInput);
            case "attendanceIntent":
              return {"route": "/attendance","attributes":{}};
            case "dashboardIntent":
              return {"route": "/dashboard","attributes":{}};
            case "goBack":
              return {"route": "/goback","attributes":{}};
            case "gallery":
              return {"route":"/gallery","attributes":{}};
            default:
              return {};
          }
        }
      }
    }
    return {};
  }
}