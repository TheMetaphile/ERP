import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/Classs%20Activity/classActivity.dart';
import 'package:untitled/teacher-module/StudentDoubts/studentDoubts.dart';
import 'package:untitled/teacher-module/classWork.dart';
import 'package:untitled/teacher-module/homeWork.dart';
import 'package:untitled/teacher-module/Trash/assignment.dart';
import 'package:untitled/teacher-module/Trash/studentLeaveApplications.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckIn.dart';
import 'package:untitled/teacher-module/teacherDashboard.dart';
import 'package:untitled/teacher-module/TakeLeave/teacherLeave.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';
import 'package:untitled/utils/theme.dart';

import '../admin-module/adminHome.dart';
import '../onBoarding/Screens/login.dart';
import 'Birthday/Birthday.dart';
import 'Classs Activity/ClassActivityTime Table/TimeTable.dart';
import 'NoteBookRecord/noteBookRecord.dart';
import 'NoticeBoard/noticeBoard.dart';

class TeacherHome extends StatefulWidget {
  const TeacherHome({Key? key});

  @override
  State<TeacherHome> createState() => _TeacherHomeState();
}

class _TeacherHomeState extends State<TeacherHome> {
  PersistentTabController? _controller;
  int selectedIndex = 0;
  CustomTheme themeObj = CustomTheme();
  String teacherName = "Unknown";
  String profileLink = 'https://example.com/default-profile-pic.jpg';
  String teacherEmail = "Unknown";
  String employeeID = "Unknown";

  List<Widget> _buildScreens() {
    return [
      TeacherDashboard(),
      TeacherAttendanceCheckIn(),
      ClassWork(),
      HomeWork(),
    ];
  }

  List<PersistentBottomNavBarItem> _navBarsItems(Size size) {
    return [
      PersistentBottomNavBarItem(
        icon: Icon(CupertinoIcons.home),
        title: ("Home"),
        activeColorPrimary: themeObj.textBlack,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
      PersistentBottomNavBarItem(
        icon: const Icon(Icons.timer),
        title: ("Attendance"),
        activeColorPrimary: themeObj.textBlack,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
      PersistentBottomNavBarItem(
        icon: Icon(Icons.work_history_outlined),
        title: ("Class Work"),
        activeColorPrimary: themeObj.textBlack,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
      PersistentBottomNavBarItem(
        icon: Icon(Icons.home_work_outlined),
        title: ("Home Work"),
        activeColorPrimary: themeObj.textBlack,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
    ];
  }

  @override
  void initState() {
    super.initState();
    _controller = PersistentTabController(initialIndex: 0);
    getDetails();
  }

  Future<void> getDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    setState(() {
      teacherName = pref.getString("name") ?? "Unknown";
      profileLink = pref.getString("profileLink") ?? 'https://example.com/default-profile-pic.jpg';
      teacherEmail = pref.getString("email") ?? "Unknown";
      employeeID = pref.getString("employeeId") ?? "Unknown";
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        backgroundColor: themeObj.primayColor,
        title: Text(
          getTitle(selectedIndex),
          style: TextStyle(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w400,
            fontSize: size.width * 0.06,
          ),
        ),
        actions: [
          selectedIndex == 0
              ? IconButton(
            onPressed: () {
              // Implement action
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
                      ListTile(
                        leading: Image.asset("assets/Images/TeacherDashboard/Classroom.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Class Activity",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => ClassActivity(),));
                        },
                      ),
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
                          Navigator.push(context, MaterialPageRoute(builder: (context) => TimeTable(),));
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
                      ListTile(
                        leading: Icon(Icons.admin_panel_settings,color: themeObj.textBlack,size: size.width*0.1,),
                        title: Text("Admin Panel",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => AdminHome(),));
                        },
                      ),
                      ListTile(
                        leading:Icon(Icons.logout,color: themeObj.textBlack,size: size.width*0.1,),
                        title: Text("Logout",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: () async {
                          SharedPreferences prefs=await SharedPreferences.getInstance();
                          await prefs.remove('accessToken');
                          print(prefs.getString("accessToken"));
                          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Login(),));
                        },
                      ),

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
      body: PersistentTabView(
        onItemSelected: (int value) {
          setState(() {
            selectedIndex = value;
          });
        },
        context,
        controller: _controller,
        screens: _buildScreens(),
        items: _navBarsItems(size),
        confineInSafeArea: true,
        backgroundColor: themeObj.primayColor,
        handleAndroidBackButtonPress: true,
        resizeToAvoidBottomInset: true,
        stateManagement: true,
        hideNavigationBarWhenKeyboardShows: true,
        decoration: NavBarDecoration(colorBehindNavBar: Colors.white),
        popAllScreensOnTapOfSelectedTab: true,
        popActionScreens: PopActionScreensType.all,
        itemAnimationProperties: ItemAnimationProperties(
          duration: Duration(milliseconds: 200),
          curve: Curves.ease,
        ),
        screenTransitionAnimation: ScreenTransitionAnimation(
          animateTabTransition: true,
          curve: Curves.ease,
          duration: Duration(milliseconds: 200),
        ),
        navBarStyle: NavBarStyle.style6,
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
