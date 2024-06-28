import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:molten_navigationbar_flutter/molten_navigationbar_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/ChatView/chatView.dart';
import 'package:untitled/teacher-module/classWork.dart';
import 'package:untitled/teacher-module/assignment.dart';
import 'package:untitled/teacher-module/homeWork.dart';
import 'package:untitled/teacher-module/studentLeaveApplications.dart';
import 'package:untitled/teacher-module/teacherDashboard.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';
import '../admin-module/adminHome.dart';
import '../onBoarding/Screens/login.dart';
import 'Birthday.dart';

class TeacherHome extends StatefulWidget {
  const TeacherHome({super.key});

  @override
  State<TeacherHome> createState() => _TeacherHomeState();
}

class _TeacherHomeState extends State<TeacherHome> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
  String deviceTokenToSendPushNotification="";
  var _flag1 = false;
  var _flag2 = false;
  void listener1() {
    if (_flag2) return;
    _flag1 = true;
    scrollController2.jumpTo(scrollController1.offset);
    _flag1 = false;
  }
  void listener2() {
    if (_flag1) return;
    _flag2 = true;
    scrollController1.jumpTo(scrollController2.offset);
    _flag2=false;
  }
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);

  }
  // Future<void> getDeviceTokenToSendNotification() async {
  //   final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  //   final token = await _fcm.getToken();
  //    deviceTokenToSendPushNotification = token.toString();
  //   print("Token Value $deviceTokenToSendPushNotification");
  // }
  List navigationBar=[const teacherDashboard(),const ClassWork(),const HomeWork(),const TeacherAssignment()];
  int selectedIndex=0;
  List<String> title=["DashBoard","Class Work","Home Work","Assignment"];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    // getDeviceTokenToSendNotification();
    return Scaffold(
        backgroundColor: const Color(0xFF5A77BC),
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.transparent,
          title: Text(title[selectedIndex],style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
          actions: [
            IconButton(onPressed: (){
              Navigator.push(context, MaterialPageRoute(builder: (context) => const ChatScreen(),));
            }, icon: const Icon(Icons.message_outlined,color: Colors.white,))
          ],
        ),
        drawer: Drawer(
            width: size.width*0.8,
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.only(top: 20),
                  height: size.height*0.2,
                  width: size.width*1,
                  decoration: const BoxDecoration(
                    color: Color(0xFF5A77BC),
      
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children:[
                            Icon(CupertinoIcons.profile_circled,size: size.height*0.12,color: Colors.white,),
                            SizedBox(width: size.width*0.05,),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Ankit Sharma",overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.white,fontSize: size.width*0.04,fontWeight: FontWeight.w500),),
                                Text("ankits459@gmail.com",overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.white70,fontSize: size.width*0.035,fontWeight: FontWeight.w400),),
                                Text("Id-015",style: TextStyle(color: Colors.white70,fontSize: size.width*0.035,fontWeight: FontWeight.w400),)
      
      
                              ],
                            ),

                          ]
                      ),
                      SizedBox(height: size.height*0.02,)
                    ],
                  ),
                ),
                SizedBox(height: size.height*0.02,),
                Container(
                  child: Column(
                    children: [
                      ListTile(
                        leading:Icon(Icons.home,size:  size.height*0.04,color: Colors.black,),
                        title: Text("Home",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.pop(context);
      
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/gift-box-icon.png",width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Birthday",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Birthday(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/Leave.png",width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Student Leave Application",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => studentLeaveApplications(),));
                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/moneybag.png",width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Salary",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherSalary(),));
                        },
                      ),
                      ListTile(
                        leading: Icon(Icons.admin_panel_settings,color: Colors.black,size: size.width*0.1,),
                        title: Text("Admin Panel",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => AdminHome(),));
                        },
                      ),
                      ListTile(
                        leading:Icon(Icons.logout,color: Colors.black,size: size.width*0.1,),
                        title: Text("Logout",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
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
                const Expanded(child: SizedBox(),),
                SizedBox(
                  width: size.width*0.75,
                  child: const Text(" © 2024 All Right Reserved by School\nDesigned by MetaPhile",textAlign: TextAlign.center,),
                )
              ],
            )
        ),
        body:navigationBar[selectedIndex],
      
        bottomSheet: MoltenBottomNavigationBar(
          selectedIndex: selectedIndex,
          onTabChange: (clickedIndex) {
            setState(() {
              selectedIndex = clickedIndex;
            });
          },
          tabs: [
            MoltenTab(
              icon: const Icon(Icons.home,color: Colors.green,),
            ),
            MoltenTab(
              icon: Image.asset("assets/Images/Google Classroom.png",fit: BoxFit.contain,),
            ),
      
            MoltenTab(
              icon: Image.asset("assets/Images/Books Emoji.png",fit: BoxFit.contain,),
            ),
            MoltenTab(icon: const Icon(Icons.assignment,color: Colors.green,))
          ],
        ),

    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.15,
          ),
          Card(
            color: Colors.white,
            elevation: 0,
            margin: const EdgeInsets.all(0),
            shape: const OutlineInputBorder(
                borderSide: BorderSide(
                    color: Colors.white
                ),
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25)
                )
            ),
            child: SizedBox(
              height: size.height * 1,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height * 1,
          )
        ],
      ),
    );
  }
  }

