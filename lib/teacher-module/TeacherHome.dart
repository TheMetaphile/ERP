import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:highlight_text/highlight_text.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:untitled/admin-module/adminHome.dart';
import 'package:untitled/teacher-module/Classs%20Activity/classActivity.dart';
import 'package:untitled/teacher-module/HOD/HOD.dart';
import 'package:untitled/teacher-module/StudentDoubts/studentDoubts.dart';
import 'package:untitled/teacher-module/ClassWork/classWork.dart';
import 'package:untitled/teacher-module/HomeWork/homeWork.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckIn.dart';
import 'package:untitled/teacher-module/teacherDashboard.dart';
import 'package:untitled/teacher-module/TakeLeave/teacherLeave.dart';
import 'package:untitled/teacher-module/uploadResult/uploadResult.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';
import 'package:workmanager/workmanager.dart';
import '../WorkManager1/preferenceListener.dart';
import '../onBoarding/Screens/login.dart';
import '../voice_command_model/permission/permission.dart';
import '../voice_command_model/recoginize_intent.dart';
import '../voice_command_model/snow_boy_wake_up.dart';
import '../voice_command_model/speek.dart';
import 'Appraisal/appraisal.dart';
import 'Birthday/Birthday.dart';
import 'NoteBookRecord/noteBookRecord.dart';
import 'NoticeBoard/noticeBoard.dart';
import 'WeeklyPlanTeacher/WeeklyPlannerTeacher.dart';
import 'drawerTimeTable/TimeTable1.dart';
import 'package:speech_to_text/speech_to_text.dart' as speechToText;

class TeacherHome extends StatefulWidget {
  const TeacherHome({super.key,});

  @override
  State<TeacherHome> createState() => _TeacherHomeState();


}

class _TeacherHomeState extends State<TeacherHome> {
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
          startlistening();
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
        startlistening();
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
    startlistening();
    print("Wake-up mechanism initialized.");
  }

  startlistening() async {
    await _snowBoyWakeUp.startDetection();
  }



  int _selectedIndex = 0;
  CustomTheme themeObj = CustomTheme();
  String teacherName = "Unknown";
  String profileLink = 'https://example.com/default-profile-pic.jpg';
  String teacherEmail = "Unknown";
  String employeeID = "Unknown";
  String? teacherClass;
  String? teacherSection;

  final List<Widget> _screens = [
    TeacherDashboard(),
    TeacherAttendanceCheckIn(),
    ClassWork(),
    HomeWork(),
  ];

  Future<void> getDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();

      teacherName = pref.getString("name") ?? "Unknown";
      profileLink = pref.getString("profileLink") ?? 'https://example.com/default-profile-pic.jpg';
      teacherEmail = pref.getString("email") ?? "Unknown";
      employeeID = pref.getString("employeeId") ?? "Unknown";
      teacherClass = pref.getString("teacherClass") ?? "";
      teacherSection = pref.getString("teacherSection") ?? "";
      setState(() {});
  }


  @override
  void initState() {
    super.initState();
     initializeApp();
     getDetails();
    _loadInitialValues();
  }
  final SharedPreferencesListener _prefsListener = SharedPreferencesListener();

  Future<void> _loadInitialValues() async {
    prints();
    teacherClass = await _prefsListener.getTeacherClass();
    teacherSection = await _prefsListener.getTeacherSection();
    setState(() {});
    print("_loadInitialValues Run");

  }

  void _listenToChanges() {
    _prefsListener.teacherClassStream.listen((value) {
      setState(() => teacherClass = value);
      print("Class Changed");
      prints();
    });

    _prefsListener.teacherSectionStream.listen((value) {
      setState(() => teacherSection = value);
      print("Section Changed");
      prints();
    });

  }

  @override
  void dispose() {
    _prefsListener.dispose();
    super.dispose();
  }
  Future<void>  prints() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.reload();

    final listener = SharedPreferencesListener();

    print("Prints log:/..............");
    String? Class = await listener.getTeacherClass();
    String? section =await listener.getTeacherSection();
    print("${Class}, : $section");
    print("var : ${teacherClass}, : $teacherSection");

  }

  Future<void> showRevokeMicrophonePermissionDialog(BuildContext context) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Revoke Microphone Permission'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('For security reasons, please revoke the microphone permission.'),
                Text('Tap "Open Settings" and disable the microphone permission for this app.'),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Open Settings'),
              onPressed: () async {
                Navigator.of(context).pop();
                bool isOpened = await openAppSettings();
                if (!isOpened) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Unable to open app settings')),
                  );
                }
              },
            ),
            TextButton(
              child: Text('I\'ve Revoked It'),
              onPressed: () async {
                Navigator.of(context).pop();

                // Check if the permission has actually been revoked
                PermissionStatus microphoneStatus = await Permission.microphone.status;

                if (microphoneStatus.isDenied || microphoneStatus.isPermanentlyDenied) {
                  // Permission has been revoked, proceed with logout
                  SharedPreferences prefs = await SharedPreferences.getInstance();
                  bool isCleared=await prefs.clear();
                  print("isCleared $isCleared");
                  print("teacherAccessToken ${prefs.getString("accessToken")}");
                  Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Login()));
                } else {
                  // Permission is still granted, show a message
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Please revoke the microphone permission to log out')),
                  );
                }
              },
            ),
          ],
        );
      },
    );
  }
  @override
  Widget build(BuildContext context) {


    Size size = MediaQuery.of(context).size;
     return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        backgroundColor: themeObj.primayColor,
        title: Text(
          getTitle(_selectedIndex),
          style: TextStyle(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w400,
            fontSize: size.width * 0.06,
          ),
        ),
        actions: [
          _selectedIndex == 0
              ? IconButton(
            onPressed: () async{
            await prints();
            },
            icon: const Icon(Icons.notification_add),
          )
              : SizedBox(),
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
                color: themeObj.primayColor,
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
                    teacherName,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontSize: size.width * 0.04,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    teacherEmail,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontSize: size.width * 0.035,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  Text(
                    employeeID,
                    style: TextStyle(
                      color: themeObj.textBlack,
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
                        leading:Icon(Icons.home,size:  size.height*0.04,color: themeObj.textBlack,),
                        title: Text("Dashboard",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.pop(context);

                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/doubts.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Student Doubts",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDoubts(),));
                        },
                      ),
                      teacherClass!=null && teacherSection!=null?   ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/Classroom.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Class Activity",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => ClassActivity(),));
                        },
                      ):const SizedBox(),

                      // ListTile(
                      //   leading: Image.asset("assets/Images/TeacherDashboard/checkin.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                      //   title: Text("Check In",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                      //   onTap: (){
                      //     Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherAttendanceCheckIn(),));
                      //   },
                      // ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/TakeLeave.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Take Leave",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherLeave(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/Dashboard_time_table.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Time Table",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => DrawerTimeTable(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/gift-box-icon.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Birthday",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Birthday(),));
                        },
                      ),
                      ListTile(
                        leading: Icon(CupertinoIcons.sunrise,color: themeObj.textBlack,size: size.width*0.1,),
                        title: Text("Appraisal",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Appraisal(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/notice2.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Notice Board",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => NoticeBoard(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/NoteBookRecord.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Note Book Record",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => NoteBookRecord(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/uploadResult.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Upload Result",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => UploadResult(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/Hod.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Weekly Planner",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => WeeklyPlanTeacher(),));
                        },
                      ),
                      ListTile(
                        leading:Icon(Icons.admin_panel_settings_rounded,color: themeObj.textBlack,size: size.width*0.1),
                        title: Text("Coordinator",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Hod(),));
                        },
                      ),
                      // ListTile(
                      //   leading:Icon(Icons.admin_panel_settings_rounded,color: themeObj.textBlack,size: size.width*0.1),
                      //   title: Text("assd",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                      //   onTap: (){
                      //     Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => AdminHome(),));
                      //   },
                      // ),
                      // ListTile(
                      //   leading: Image.asset("assets/Images/Leave.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                      //   title: Text("Student Leave Application",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                      //   onTap: (){
                      //     Navigator.push(context, MaterialPageRoute(builder: (context) => studentLeaveApplications(),));
                      //   },
                      // ),
                      // ListTile(
                      //   leading: Image.asset("assets/Images/moneybag.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                      //   title: Text("Salary",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                      //   onTap: (){
                      //     Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherSalary(),));
                      //   },
                      // ),
                      // ListTile(
                      //   leading: Icon(Icons.admin_panel_settings,color: themeObj.textBlack,size: size.width*0.1,),
                      //   title: Text("Admin Panel",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                      //   onTap: (){
                      //     Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => AdminHome(),));
                      //   },
                      // ),
                      ListTile(
                          leading: Icon(Icons.logout, color: themeObj.textBlack, size: size.width*0.1),
                          title: Text("Logout", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(fontSize: size.width*0.04, color: themeObj.textBlack, fontWeight: FontWeight.w400)),
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
                            Navigator.pushReplacement(context,
                                MaterialPageRoute(builder: (context) => Login()));
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
                  color: themeObj.textBlack,
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
          color: themeObj.primayColor,
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
              activeColor: themeObj.textBlack,
              iconSize: 20,
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              duration: Duration(milliseconds: 400),
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

