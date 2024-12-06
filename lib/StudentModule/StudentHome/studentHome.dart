import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:speech_to_text/speech_to_text.dart' as speechToText;
import 'package:student/StudentModule/Classword/classWork.dart';
import 'package:student/StudentModule/NoteBookRecord/noteBook_Record.dart';
import 'package:student/StudentModule/Notice/notice.dart';
import 'package:student/StudentModule/homeWork/homeWork.dart';

import '../../APIs/NotificationAPI/notificationAPI.dart';
import '../../APIs/SharedPreference/sharedPreferenceFile.dart';
import '../../CustomTheme/customTheme.dart';
import '../../Notification/Messanging.dart';
import '../../WorkManager1/preferenceListener.dart';
import '../../onBoarding/Screens/login.dart';
import '../../voice_command_model/permission/permission.dart';
import '../../voice_command_model/recoginize_intent.dart';
import '../../voice_command_model/snow_boy_wake_up.dart';
import '../../voice_command_model/speek.dart';
import '../Ask_Doubts/ask_doubts.dart';
import '../Attendance/studentAttendance.dart';
import '../Dashboard/dashboard.dart';
import '../Datesheet/datesheet.dart';
import '../Fees/Fee_Due.dart';
import '../Result/result.dart';
import '../StudentLeave/student_leave.dart';
import '../TimeTable/timeTable.dart';

class StudentHome extends StatefulWidget {
  const StudentHome({super.key,});

  @override
  State<StudentHome> createState() => _StudentHomeState();


}

class _StudentHomeState extends State<StudentHome> {
  late speechToText.SpeechToText speech;
  late BuildContext cnxt;
  String textString = "";
  bool isListen = false;
  double confidence = 0.7;

  final Map<String, HighlightedWord> highlightWords = {
    "flutter": HighlightedWord(
        textStyle: const TextStyle(
            color: Colors.redAccent, fontWeight: FontWeight.bold)),
    "developer": HighlightedWord(
        textStyle: const TextStyle(
            color: Colors.redAccent, fontWeight: FontWeight.bold)),
  };

  void listen() async {
    print("listen called successfully");
    if (!isListen) {
      bool avail = await speech.initialize(
        onError: (errorNotification) {
          startListening();
          print("erp error : ${errorNotification.errorMsg}");
        },
      );

      if (avail) {
        setState(() {
          isListen = true;
        });
        speechToText.SpeechListenOptions(
            listenMode: speechToText.ListenMode.dictation);
        await speech.listen(
          onResult: (value) async {
            setState(() {
              textString = value.recognizedWords;
              if (value.hasConfidenceRating && value.confidence > 0) {
                confidence = value.confidence;
              }
            });
            if (value.finalResult) {
              try {
                print(": $textString");
                // textString  = await translateText(textString);

                final Map<String, dynamic> navigationFromIntent =
                CustomIntent().determineIntent(textString);
                print(
                    "converted text \n\n\n\n\n $textString \n output: $navigationFromIntent \n\n\n\n\n");
                if (navigationFromIntent.isNotEmpty) {
                  if (navigationFromIntent["route"] == "/goback") {
                    Navigator.pop(context);
                    Navigator.of(context).pop();
                  } else {
                    Navigator.pushNamed(context, navigationFromIntent["route"],
                        arguments: navigationFromIntent["attributes"]);
                  }
                }

                textString = "";
                listen();
              } catch (e) {
                textString = "";
                listen();
                Speak().speak("Something went wrong please try again!");
                print("\n\n\n $e \n\n\n");
              }
            }
          },
          pauseFor: const Duration(seconds: 6),
        )
            .whenComplete(() {
          showBottomSheet(
            context: context,
            builder: (context) {
              return BottomSheet(
                onClosing: () {},
                builder: (context) {
                  return Container(
                    padding: const EdgeInsets.all(20),
                    child: TextHighlight(
                      text: textString,
                      words: highlightWords,
                      textStyle: const TextStyle(
                          fontSize: 25.0,
                          color: Colors.black,
                          fontWeight: FontWeight.bold),
                    ),
                  );
                },
              );
            },
          );
        });
      }
    }
    else {
      setState(() {
        isListen = false;
        speech.stop();
        startListening();
      });
    }
  }

  late SnowBoyWakeUp _snowBoyWakeUp;


  void initializeApp() async {
    await Permissions().checkAudioPermission();
    bool permissionGranted = await requestPermissions();
    if (permissionGranted) {
      _initializeSpeechRecognition();
      _initializeWakeUp();


    } else {
      // Handle the case when permissions are not granted
      print("Permissions not granted.");
    }
  }

  Future<bool> requestPermissions() async {
    PermissionStatus status = await Permission.microphone.request();
    return status.isGranted;
  }

  void _initializeSpeechRecognition() {
    speech = speechToText.SpeechToText();
    print("Speech recognition initialized.");
  }

  void _initializeWakeUp() {
    _snowBoyWakeUp = SnowBoyWakeUp(listen);
    _snowBoyWakeUp.initPlatformState();
    startListening();
    print("Wake-up mechanism initialized.");
  }

  startListening() async {
    await _snowBoyWakeUp.startDetection();
  }



  int _selectedIndex = 0;

  String studentName="unknown";
  String profileLink="";
  String email="";
  String rollNo="";
  String currentClass="";
  String section="";
  String session="";



  Map<String, dynamic> retrievedUserDetails={};

  Future<void> getDetails() async {
   //  SharedPreferences pref = await SharedPreferences.getInstance();
   //
   //  studentName = pref.getString("name") ?? "Unknown";
   //  profileLink = pref.getString("profileLink") ?? 'https://example.com/default-profile-pic.jpg';
   //  email = pref.getString("email") ?? "Unknown";
   //  rollNo = pref.getString("rollNo") ?? "Unknown";
   //  currentClass = pref.getString("currentClass") ?? "";
   //  section = pref.getString("section") ?? "";
   //  session = pref.getString("session") ?? "";
   //
   //
   //
   //
   //  pref.getString("fatherPhoneNumber");
   //  pref.getString("dob",);
   // pref.getString("permanentAddress",);
    retrievedUserDetails = await UserPreferences.getDetails("userDetails");
    studentName=retrievedUserDetails["name"].toString();
    profileLink=retrievedUserDetails["profileLink"].toString();
    email=retrievedUserDetails["email"].toString();
    rollNo=retrievedUserDetails["rollNumber"].toString();
    currentClass=retrievedUserDetails["currentClass"].toString();
    section=retrievedUserDetails["section"].toString();
    session=retrievedUserDetails["session"].toString();

    setState(() {});
  }


  @override
  void initState() {
    super.initState();
    // initializeApp();
    getDetails();

  }
  final List<Widget> _screens = [
     const StudentDashboard(),
    StudentAttendanceUI(),
    const Classwork(),
    const Homework(),
  ];
  final SharedPreferencesListener _prefsListener = SharedPreferencesListener();

  // Future<void> _loadInitialValues() async {
  //   prints();
  //   teacherClass = await _prefsListener.getTeacherClass();
  //   teacherSection = await _prefsListener.getTeacherSection();
  //   setState(() {});
  //   print("_loadInitialValues Run");
  //
  // }

  // void _listenToChanges() {
  //   _prefsListener.teacherClassStream.listen((value) {
  //     setState(() => teacherClass = value);
  //     print("Class Changed");
  //     prints();
  //   });

  //   _prefsListener.teacherSectionStream.listen((value) {
  //     setState(() => teacherSection = value);
  //     print("Section Changed");
  //     prints();
  //   });
  //
  // }

  @override
  void dispose() {
    _prefsListener.dispose();
    super.dispose();
  }


  // Future<void> showRevokeMicrophonePermissionDialog(BuildContext context) async {
  //   return showDialog<void>(
  //     context: context,
  //     barrierDismissible: false,
  //     builder: (BuildContext context) {
  //       return AlertDialog(
  //         title: Text('Revoke Microphone Permission'),
  //         content: SingleChildScrollView(
  //           child: ListBody(
  //             children: <Widget>[
  //               Text('For security reasons, please revoke the microphone permission.'),
  //               Text('Tap "Open Settings" and disable the microphone permission for this app.'),
  //             ],
  //           ),
  //         ),
  //         actions: <Widget>[
  //           TextButton(
  //             child: Text('Open Settings'),
  //             onPressed: () async {
  //               Navigator.of(context).pop();
  //               bool isOpened = await openAppSettings();
  //               if (!isOpened) {
  //                 ScaffoldMessenger.of(context).showSnackBar(
  //                   SnackBar(content: Text('Unable to open app settings')),
  //                 );
  //               }
  //             },
  //           ),
  //           TextButton(
  //             child: Text('I\'ve Revoked It'),
  //             onPressed: () async {
  //               Navigator.of(context).pop();
  //
  //               // Check if the permission has actually been revoked
  //               PermissionStatus microphoneStatus = await Permission.microphone.status;
  //
  //               if (microphoneStatus.isDenied || microphoneStatus.isPermanentlyDenied) {
  //                 // Permission has been revoked, proceed with logout
  //                 SharedPreferences prefs = await SharedPreferences.getInstance();
  //                 bool isCleared=await prefs.clear();
  //                 print("isCleared $isCleared");
  //                 print("teacherAccessToken ${prefs.getString("accessToken")}");
  //                 Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Login()));
  //               } else {
  //                 // Permission is still granted, show a message
  //                 ScaffoldMessenger.of(context).showSnackBar(
  //                   SnackBar(content: Text('Please revoke the microphone permission to log out')),
  //                 );
  //               }
  //             },
  //           ),
  //         ],
  //       );
  //     },
  //   );
  // }

  Future<dynamic> deleteDeviceToken() async {
    try {
      NotificationAPI apiObj=NotificationAPI();
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      String? deviceToken = await FCMService.getDeviceToken();
      print("FCM Token: $deviceToken");
      await apiObj.removeToken(accessToken!, deviceToken!);

    } catch (e) {
      print('$e');

    }
  }

  @override
  Widget build(BuildContext context) {
  print(studentName);
  print(session);
  print(section);
  print(rollNo);

    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj=CustomTheme(size);
    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: AppBar(
        backgroundColor: CustomTheme.primaryColor,

        title: Text(
          getTitle(_selectedIndex),
          style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.w500)
        ),
        actions: [
          _selectedIndex == 0
              ? IconButton(
            onPressed: () async{
              Navigator.push(context, MaterialPageRoute(builder: (context) => const Notice(),));
            },
            icon: const Icon(Icons.notification_add),
          )
              : const SizedBox(),
        ],
      ),
      drawer: Drawer(
        width: size.width * 0.8,
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.only(left: 10),
              width: size.width * 1,
              decoration: BoxDecoration(
                color: CustomTheme.primaryColor,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height * 0.04),
                  CircleAvatar(
                    radius: size.width * 0.1,
                    backgroundImage: NetworkImage(profileLink),
                  ),
                  SizedBox(height: size.height * 0.01),
                  Text(
                    studentName,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: CustomTheme.blackColor,
                      fontSize: size.width * 0.04,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    "Class $currentClass-$section",
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: CustomTheme.blackColor,
                      fontSize: size.width * 0.035,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  Text(
                    "Roll No $rollNo",
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: CustomTheme.blackColor,
                      fontSize: size.width * 0.035,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  Text(
                    email,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: CustomTheme.blackColor,
                      fontSize: size.width * 0.035,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  SizedBox(height: size.height * 0.01),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.02),
            Expanded(
              child: SingleChildScrollView(
                child: Container(
                  child: Column(
                    children: [
                      ListTile(
                        leading:Icon(Icons.home,size:  size.height*0.04,color: CustomTheme.blackColor,),
                        title: Text("Dashboard",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.pop(context);

                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/fees.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Fee Due",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) =>  FeesDue(email: email,),));

                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/time Table.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Time Table",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => const StudentTimeTable(),));
                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/result.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Result",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                         Navigator.push(context, MaterialPageRoute(builder: (context) => ReportCardOpen(userDetails: retrievedUserDetails, ),));
                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/leave.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Leave Application",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => const StudentLeave(),));
                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/askdoubts.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Ask Doubt",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                         Navigator.push(context, MaterialPageRoute(builder: (context) => AskDoubts(currentClass: currentClass, section: section,),));
                        },
                      ),
                      ListTile(
                        leading:Icon(Icons.notifications_active,size:  size.height*0.04,color: CustomTheme.blackColor,),
                        title: Text("Notice ",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                         Navigator.push(context, MaterialPageRoute(builder: (context) => const Notice(),));
                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/datesheet.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("DateSheet",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                         Navigator.push(context, MaterialPageRoute(builder: (context) => DateSheet(Class: currentClass,),));
                        },
                      ),

                      ListTile(
                        leading: Image.asset("assets/DashboardImages/notebook.png",color: CustomTheme.blackColor,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Notebook Record",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => NoteBookRecord(currentClass: currentClass, section: section,),));
                        },
                      ),

                      // ListTile(
                      //   leading: Icon(Icons.password, color: CustomTheme.blackColor, size: size.width*0.1),
                      //   title: Text("Change Password",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: CustomTheme.blackColor,fontWeight:FontWeight.w400),),
                      //   onTap: (){
                      // //    Navigator.push(context, MaterialPageRoute(builder: (context) => WeeklyPlanTeacher(),));
                      //   },
                      // ),

                      ListTile(
                          leading: Icon(Icons.logout, color: CustomTheme.blackColor, size: size.width*0.1),
                          title: Text("Logout", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(fontSize: size.width*0.04, color: CustomTheme.blackColor, fontWeight: FontWeight.w400)),
                          onTap: () async {
                            // PermissionStatus microphoneStatus = await Permission
                            //     .microphone.status;
                            //
                            // if (microphoneStatus.isGranted) {
                            //   // If microphone permission is still granted, show dialog to revoke it
                            //   await showRevokeMicrophonePermissionDialog(context);
                            // } else {
                            //   // If microphone permission is already revoked, proceed with logout
                            //   SharedPreferences prefs = await SharedPreferences
                            //       .getInstance();
                            //   await prefs.clear();
                            //   Navigator.pushReplacement(context,
                            //       MaterialPageRoute(
                            //           builder: (context) => Login()));
                            // }
                            SharedPreferences prefs = await SharedPreferences
                                .getInstance();
                            await prefs.clear();
                            await deleteDeviceToken();
                            Navigator.pushReplacement(context,
                                MaterialPageRoute(builder: (context) => const Login()));
                          } ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(
              width: size.width * 0.75,
              child: Text(
                " © 2024 All Right Reserved by School\nDesigned by MetaPhile",
                textAlign: TextAlign.center,
                style: GoogleFonts.openSans(
                  fontSize: size.width * 0.04,
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w400,
                ),
              ),
            )
          ],
        ),
      ),
      body: _screens[_selectedIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: CustomTheme.primaryColor,
          boxShadow: [
            BoxShadow(
              blurRadius: 20,
              color: Colors.black.withOpacity(.1),
            )
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 8),
            child: GNav(
              rippleColor: Colors.grey[300]!,
              hoverColor: Colors.grey[100]!,
              gap: 3,
              activeColor: CustomTheme.blackColor,
              iconSize: 20,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              duration: const Duration(milliseconds: 400),
              tabBackgroundColor: Colors.grey[100]!,
              color: Colors.black,
              tabs: [
                GButton(
                  icon: Icons.home,
                  text: 'Home',
                  textStyle: GoogleFonts.openSans(fontSize: size.width*0.03),
                ),
                GButton(
                  icon: Icons.timer,
                  text: 'Attendance',textStyle: GoogleFonts.openSans(fontSize: size.width*0.03),
                ),
                GButton(
                  icon: Icons.work_history_outlined,
                  text: 'Class Work',
                  textStyle: GoogleFonts.openSans(fontSize: size.width*0.03),
                ),
                GButton(
                  icon: Icons.home_work_outlined,
                  text: 'Home Work',
                  textStyle: GoogleFonts.openSans(fontSize: size.width*0.03),
                ),
              ],
              selectedIndex: _selectedIndex,
              onTabChange: (index) {
                setState(() {
                  _selectedIndex = index;
                });
              },
            ),
          ),
        ),
      ),
    );
  }

  String getTitle(int index) {
    switch (index) {
      case 0:
        return "Dashboard";
      case 1:
        return "Attendance";
      case 2:
        return "Class Work";
      case 3:
        return "Home Work";
      default:
        return "Teacher Home";
    }
  }
}

