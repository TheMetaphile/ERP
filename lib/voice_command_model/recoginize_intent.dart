


import 'package:student/voice_command_model/speek.dart';

import 'intents/password_intent.dart';
import 'intents/result_intent.dart';

class CustomIntent {
  Map<String, dynamic> intent_keywords = {
    "changePassword": [
      "change password",
      "change your password",
      "password change",
      "reset password",
      "update password",
      "change my password",
      "reset my password",
      "update my password",

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
    "attendanceIntent": [
      "attendance", "attend", "attendance record", "attendance sheet",

      /// Additional keywords for parents
      "parent attendance", "parent attend", "parent attendance record",
      "parent attendance sheet",

      /// Additional keywords for teachers
      "teacher attendance", "teacher attend", "teacher attendance record",
      "teacher attendance sheet",

      /// Additional keywords for students
      "student attendance", "student attend", "student attendance record",
      "student attendance sheet"
    ],
    // "goBack": ["go back"],

  "dashboard": [
  "dashboard", "home", "main", "overview", "summary",
  // # Additional keywords for parents
  "parent dashboard", "parent home", "parent main", "parent overview", "parent summary", "parent play quiz",
  "parent view", "parent dashboard view", "parent home page",
  /// # Additional keywords for teachers
  "teacher dashboard", "teacher home", "teacher main", "teacher overview", "teacher summary", "teacher play quiz",
  "teacher view", "teacher dashboard view", "teacher home page",
  // # Additional keywords for students
  "student dashboard", "student home", "student main", "student overview", "student summary", "student play quiz",
  "student view", "student dashboard view", "student home page"
  ],
  "leave": [
  "leave", "leave application", "apply for leave", "take leave", "request leave",
  // # Additional keywords for parents
  "parent leave", "parent leave application", "parent apply for leave", "parent take leave", "parent request leave",
  // # Additional keywords for teachers
  "teacher leave", "teacher leave application", "teacher apply for leave", "teacher take leave", "teacher request leave",
  // # Additional keywords for students
  "student leave", "student leave application", "student apply for leave", "student take leave", "student request leave"
  ],
  "resultAPI.dart": [
  "resultAPI.dart", "results", "exam resultAPI.dart", "test resultAPI.dart", "grade", "grades",
  // # Additional keywords for parents
  "parent resultAPI.dart", "parent results", "parent exam resultAPI.dart", "parent test resultAPI.dart", "parent grade", "parent grades",
  // # Additional keywords for teachers
  "teacher resultAPI.dart", "teacher results", "teacher exam resultAPI.dart", "teacher test resultAPI.dart", "teacher grade", "teacher grades",
  // # Additional keywords for students
  "student resultAPI.dart", "student results", "student exam resultAPI.dart", "student test resultAPI.dart", "student grade", "student grades"
  ],

  "expense management": [
  "expense management", "expenses", "financial records", "expenditure tracking", "budget management",
 // # Additional keywords for parents
  "parent expense management", "parent expenses", "parent financial records", "parent expenditure tracking", "parent budget management",
//  # Additional keywords for teachers
  "teacher expense management", "teacher expenses", "teacher financial records", "teacher expenditure tracking", "teacher budget management",
//  # Additional keywords for students
  "student expense management", "student expenses", "student financial records", "student expenditure tracking", "student budget management"
  ],
    "classwork": [
      "classwork", "lesson work", "class activities", "class exercises", "class tasks", "class assignments",
      "lesson tasks", "lesson assignments", "lesson activities", "lesson exercises", "educational tasks",
      "educational activities", "educational exercises", "educational assignments", "instructional tasks",
      "instructional activities", "instructional exercises", "instructional assignments",
      // # Additional keywords for parents
      "parent classwork", "parent lesson work", "parent class activities", "parent class exercises", "parent class tasks",
      "parent class assignments", "parent lesson tasks", "parent lesson assignments", "parent lesson activities",
      "parent lesson exercises", "parent educational tasks", "parent educational activities", "parent educational exercises",
      "parent educational assignments", "parent instructional tasks", "parent instructional activities",
      "parent instructional exercises", "parent instructional assignments",
      // # Additional keywords for teachers
      "teacher classwork", "teacher lesson work", "teacher class activities", "teacher class exercises", "teacher class tasks",
      "teacher class assignments", "teacher lesson tasks", "teacher lesson assignments", "teacher lesson activities",
      "teacher lesson exercises", "teacher educational tasks", "teacher educational activities", "teacher educational exercises",
      "teacher educational assignments", "teacher instructional tasks", "teacher instructional activities",
      "teacher instructional exercises", "teacher instructional assignments",
      // # Additional keywords for students
      "student classwork", "student lesson work", "student class activities", "student class exercises", "student class tasks",
      "student class assignments", "student lesson tasks", "student lesson assignments", "student lesson activities",
      "student lesson exercises", "student educational tasks", "student educational activities", "student educational exercises",
      "student educational assignments", "student instructional tasks", "student instructional activities",
      "student instructional exercises", "student instructional assignments"
    ],
  "pay now": [
  "pay now", "make payment", "fees payment",
  //# Additional keywords for parents
  "parent pay now", "parent make payment", "parent fees payment",
 // # Additional keywords for teachers
  "teacher pay now", "teacher make payment", "teacher fees payment",
//  # Additional keywords for students
  "student pay now", "student make payment", "student fees payment"
  ],
    "check-in": [
      "check-in", "attendance", "arrival",
      "teacher check-in", "teacher attendance", "teacher arrival",

    ],
    "classes": [
      "classes", "lessons", "instruction",
      //# Additional keywords for teachers
      "teaching sessions", "educational sessions", "coursework", "lectures",
      // # Additional keywords for scheduling or organization
      "class schedule", "lesson plans", "curriculum", "teaching agenda",
      // # Additional keywords for interaction or engagement
      "classroom activities", "teaching materials", "class discussions", "interactive sessions",
      // # Additional keywords for assessment or evaluation
      "student assessments", "grading", "evaluation", "lesson feedback"
    ],
    "student fee status": [
      "student fee status", "tuition status", "fee payment status", "financial status",
      //# Additional keywords emphasizing teacher's involvement
      "student fee records in my class", "fee status of students in my class", "tuition status of students in my class",
      // # Additional keywords for discussing with administrators or finance departments
      "inquire about student fee status", "request fee status update", "check student account balance",
      // # Additional keywords for communicating with parents or guardians
      "notify parents about fee status", "update parents on fee payments", "inform parents about outstanding fees"
    ],
    "student notebook record": [
      "student notebook record", "student record", "notebook log", "student notebook",
      "academic journal", "student diary", "learning log", "student progress tracker",
      "educational record", "student portfolio", "study journal", "student achievement record",
      "academic notebook", "school diary", "learning portfolio", "student performance log",
      // // # Additional keywords for parents
      // "parent student notebook record", "parent student record", "parent notebook log",
      // "parent academic journal", "parent student diary", "parent learning log",
      // "parent student progress tracker", "parent educational record", "parent student portfolio",
      // "parent study journal", "parent student achievement record", "parent academic notebook",
      // "parent school diary", "parent learning portfolio", "parent student performance log",
       // # Additional keywords for teachers
      // "teacher student notebook record", "teacher student record", "teacher notebook log",
      // "teacher academic journal", "teacher student diary", "teacher learning log",
      // "teacher student progress tracker", "teacher educational record", "teacher student portfolio",
      // "teacher study journal", "teacher student achievement record", "teacher academic notebook",
      // "teacher school diary", "teacher learning portfolio", "teacher student performance log",
      // // # Additional keywords for students
      "student student notebook record", "student student record", "student notebook log",
      "student academic journal", "student student diary", "student learning log",
      "student student progress tracker", "student educational record", "student student portfolio",
      "student study journal", "student student achievement record", "student academic notebook",
      "student school diary", "student learning portfolio", "student student performance log"
    ],
    "notice board": [
      "notice board", "announcement board", "information board", "teacher bulletin",
      "faculty notice board", "educator bulletin", "teacher announcement board",
      "faculty information board", "teacher message board", "faculty noticeboard",
      "teacher bulletin board", "faculty announcement board",
      // # Additional keywords for teachers
      "teacher notice board", "teacher announcement board", "teacher information board",
      "teacher bulletin", "teacher message board", "teacher bulletin board",
      "teacher noticeboard", "teacher announcement bulletin",
      "teacher communication board", "teacher updates board",
      "teacher news board", "teacher memo board"
    ],
    "home": [
      "home", "house", "residence", "dwelling", "abode", "place",
      // # Additional keywords for parents
      "parent home", "parent house", "parent residence", "parent dwelling", "parent abode", "parent place",
      // # Additional keywords for teachers
      "teacher home", "teacher house", "teacher residence", "teacher dwelling", "teacher abode", "teacher place",
      // # Additional keywords for students
      "student home", "student house", "student residence", "student dwelling", "student abode", "student place"
    ],
    "birthdays": [
      "birthdays", "birthday", "birth anniversary", "celebration of birth", "special day",
      // # Additional keywords for parents
      "parent birthdays", "parent birthday", "parent birth anniversary", "parent celebration of birth", "parent special day",
      // # Additional keywords for teachers
      "teacher birthdays", "teacher birthday", "teacher birth anniversary", "teacher celebration of birth", "teacher special day",
      // # Additional keywords for students
      "student birthdays", "student birthday", "student birth anniversary", "student celebration of birth", "student special day"
    ],
    "salary": [
      "salary", "wage", "pay", "income", "compensation", "remuneration",
      // # Additional keywords for employers
      "employer salary", "employer wage", "employer pay", "employer income", "employer compensation", "employer remuneration",
      // # Additional keywords for employees
      "employee salary", "employee wage", "employee pay", "employee income", "employee compensation", "employee remuneration"
    ],
    "admin panel": [
      "admin panel", "administrator dashboard", "management console", "control panel", "admin dashboard",
      // # Additional keywords for administrators
      "administrator panel", "administrator dashboard", "admin control", "admin console", "admin interface",
      // # Additional keywords for managers
      "manager panel", "manager dashboard", "management panel", "management dashboard", "manager control",
      // # Additional keywords for supervisors
      "supervisor panel", "supervisor dashboard", "supervisory panel", "supervisory dashboard", "supervisor control"
    ],
    "homework": [
      "homework", "task", "project", "schoolwork", "study", "lesson", "exercise",
      "duty", "mission", "challenge", "job", "undertaking", "responsibility", "academic task",
      "educational task",
      // # Additional keywords for parents
      "parent homework", "parent task", "parent project", "parent schoolwork", "parent study",
      "parent lesson", "parent exercise", "parent duty", "parent mission", "parent challenge", "parent job",
      "parent undertaking", "parent responsibility", "parent academic task", "parent educational task",
      // # Additional keywords for teachers
      "teacher homework", "teacher task", "teacher project", "teacher schoolwork", "teacher study",
      "teacher lesson", "teacher exercise", "teacher duty", "teacher mission", "teacher challenge", "teacher job",
      "teacher undertaking", "teacher responsibility", "teacher academic task", "teacher educational task",
      // # Additional keywords for students
      "student homework", "student task", "student project", "student schoolwork", "student study",
      "student lesson", "student exercise", "student duty", "student mission", "student challenge", "student job",
      "student undertaking", "student responsibility", "student academic task", "student educational task"
    ],
    "assignment": [
      "assignment", "task", "project", "homework", "work", "activity", "exercise", "duty", "mission",
      "challenge", "job", "undertaking", "responsibility", "lesson", "study task", "academic task",
      // # Additional keywords for parents
      "parent assignment", "parent task", "parent project", "parent homework", "parent work", "parent activity",
      "parent exercise", "parent duty", "parent mission", "parent challenge", "parent job", "parent undertaking",
      "parent responsibility", "parent lesson", "parent study task", "parent academic task",
      // # Additional keywords for teachers
      "teacher assignment", "teacher task", "teacher project", "teacher homework", "teacher work", "teacher activity",
      "teacher exercise", "teacher duty", "teacher mission", "teacher challenge", "teacher job", "teacher undertaking",
      "teacher responsibility", "teacher lesson", "teacher study task", "teacher academic task",
      // # Additional keywords for students
      "student assignment", "student task", "student project", "student homework", "student work", "student activity",
      "student exercise", "student duty", "student mission", "student challenge", "student job", "student undertaking",
      "student responsibility", "student lesson", "student study task", "student academic task"
    ],
    "chat": [
      "chat", "discussion", "conversation", "communication", "dialogue", "exchange",
      // # Additional keywords for teachers
      "teacher chat", "teacher discussion", "teacher conversation", "teacher communication",
      "teacher dialogue", "teacher exchange"
    ],


    "logout": [
  "logout", "sign out", "log off",
 // # Parent Logout--------------
  "parent logout", "exit parent account", "leave parent portal", "close parent session", "end parent session", "log out as parent", "sign off parent account", "parent exit",
  //# Teacher Logout----------------
  "teacher logout", "exit teacher account", "leave teacher dashboard", "close teacher session", "end teacher session", "log out as teacher", "sign off teacher account", "teacher exit",
 // # Student Logout-----------------------
  "student logout", "exit student account", "leave student portal", "close student session", "end student session", "log out as student", "sign off student account", "student exit"
  ],


  };
  Map<String, dynamic> word_to_num = {
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
  Map<String, dynamic> determineIntent(
    String userInput,
  ) {
    // Tokenize user input
    userInput = userInput.toLowerCase();

    // Match tokens against intent keywords
    for (var intent in intent_keywords.keys) {
      for (var keyword in intent_keywords[intent]!) {
        if (userInput.contains(keyword)) {
          switch (intent) {
            case "changePassword":
              Speak().speak("Proceeding to display the Reset password screen.");
              return PasswordIntent().passwordIntent(userInput);

            case "attendanceIntent":
              Speak().speak("Proceeding to display the attendance screen.");
              return {"route": "/attendance", "attributes": {}};
            case "goBack":
              Speak().speak("Proceeding to display the previous screen.");
              return {"route": "/goback", "attributes": {}};

            case "dashboard":
              Speak().speak("Proceeding to display the dashboard.");
              return {"route": "/dashboard", "attributes": {}};

            case "leave":
              Speak().speak("Proceeding to display the Teacher's leave.");
              return {"route": "/leave", "attributes": {}};

            case "assignment":
              Speak().speak("Proceeding to display the assignment.");
              return {"route": "/assignment", "attributes": {}};

            case "resultAPI.dart":
              Speak().speak("Proceeding to display the resultAPI.dart.");
              return {"route": "/resultAPI.dart", "attributes": {}};

            case "expense management":
              Speak().speak("Proceeding to display the expense management.");
              return {"route": "/expense management", "attributes": {}};

            case "classwork":
              Speak().speak("Proceeding to display the classwork.");
              return {"route": "/classwork", "attributes": {}};

              case "notice-board":
              Speak().speak("Proceeding to display the notice-board.");
              return {"route": "/notice-board", "attributes": {}};

            case "check-in":
              Speak().speak("Proceeding to display the check-in.");
              return {"route": "/check-in", "attributes": {}};


            case "classes":
              Speak().speak("Proceeding to display the classes.");
              return {"route": "/classes", "attributes": {}};

              case "student fee status":
              Speak().speak("Proceeding to display the student fee status.");
              return {"route": "/student fee status", "attributes": {}};

              case "student notebook record":
              Speak().speak("Proceeding to display the student notebook record.");
              return {"route": "/student notebook record", "attributes": {}};

              case "notice board":
              Speak().speak("Proceeding to display the classes.");
              return {"route": "/classes", "attributes": {}};

              case "home":
              Speak().speak("Proceeding to display the home.");
              return {"route": "/home", "attributes": {}};

              case "birthdays":
              Speak().speak("Proceeding to display the birthdays.");
              return {"route": "/birthdays", "attributes": {}};

              case "salary":
              Speak().speak("Proceeding to display the salary.");
              return {"route": "/salary", "attributes": {}};

              case "admin panel":
              Speak().speak("Proceeding to display the admin panel.");
              return {"route": "/admin panel", "attributes": {}};

              case "homework":
              Speak().speak("Proceeding to display the homework.");
              return {"route": "/homework", "attributes": {}};
            case "assignment":
              Speak().speak("Proceeding to display the assignment.");
              return {"route": "/assignment", "attributes": {}};
            case "chat":
              Speak().speak("Proceeding to display the chat.");
              return {"route": "/chat", "attributes": {}};



            case "logout":
              Speak().speak("Proceeding to display the logout.");
              return {"route": "/logout", "attributes": {}};

            default:
              return {};
          }
        }
      }
    }
    return {};
  }
}
