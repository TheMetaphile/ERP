
import 'package:auto_size_text/auto_size_text.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/Account%20Pannel/accountdetails.dart';
import 'package:untitled/admin-module/Classes%20Pannel/allClasses.dart';
import 'package:untitled/admin-module/File%20Manager/calender.dart';
import 'package:untitled/admin-module/File%20Manager/document.dart';
import 'package:untitled/admin-module/Library/allbooks.dart';
import 'package:untitled/admin-module/Parents%20Pannel/allParents.dart';
import 'package:untitled/admin-module/StudentPannel/addNewStudent.dart';
import 'package:untitled/admin-module/StudentPannel/admissionForm.dart';
import 'package:untitled/admin-module/StudentPannel/studentAttendance.dart';
import 'package:untitled/admin-module/StudentPannel/studentDetail.dart';
import 'package:untitled/admin-module/StudentPannel/studentPromote.dart';
import 'package:untitled/admin-module/Subjects%20Pannel/allSubjects.dart';
import 'package:untitled/admin-module/TeacherPannel/addNewTeacher.dart';
import 'package:untitled/admin-module/TeacherPannel/allTeacher.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherAttendance.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherSalary.dart';

import '../Charts/BarChartExample.dart';
import '../Charts/LineChart.dart';
import '../Charts/eventCalender.dart';
import '../teacher-module/TeacherHome.dart';
import '../utils/theme.dart';
import 'Exams/exam.dart';
import 'Leave/allLeave.dart';
import 'Notice/notice.dart';
import 'StudentPannel/StudentResults.dart';
import 'StudentPannel/allStudents.dart';
import 'Time table/Time Table Structure/timeTableFetch.dart';
import 'Transport Pannel/allTransportFile.dart';

class AdminHome extends StatefulWidget {
  const AdminHome({super.key});

  @override
  State<AdminHome> createState() => _AdminHomeState();
}

class _AdminHomeState extends State<AdminHome> {
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

  List<Map<String, String>> cardType=[
  {
    "type":"Students",
      "number":"1020"
  },
    {
      "type":"Teachers",
      "number":"250"
    },
    {
      "type":"Workers",
      "number":"60"
    },
    {
      "type":"Earning",
      "number":"60 Lakh"
    }
  ];
  List<String> cardImage=["assets/Images/Admin Home/Students.png","assets/Images/Admin Home/Teachers.png","assets/Images/Admin Home/Workers.png","assets/Images/Admin Home/Finance.png"];
  List<Map<String, String>> topperStudents=[
    {
      "name":"Ankit",
      "class":"X A",
      "rank":"First"
    },
    {
      "name":"Bhanu",
      "class":"XI A",
      "rank":"First"
    },
    {
      "name": "Manish",
      "class": "X A",
      "rank": "First"
    },
    {
      "name":"Ankit",
      "class":"X B",
      "rank":"First"
    }
  ];
  int _openTileIndex = -1; // Initialize with -1 to start with all tiles closed

  void _handleTileTap(int index) {
    setState(() {
      if (_openTileIndex == index) {
        _openTileIndex = -1; // Close the tile if it's already open
      } else {
        _openTileIndex = index; // Open the tapped tile
      }
    });
  }
  CustomTheme themeObj=new CustomTheme();
  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(

        iconTheme: IconThemeData(color: themeObj.textBlack),
        backgroundColor:themeObj.primayColor,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: Icon(CupertinoIcons.profile_circled,size: size.height*0.06,color: themeObj.textBlack,),
          ),
        ],
        title: Text("Admin Dashboard",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),
      ),
      drawer: Drawer(
          width: size.width*0.8,

          child: Column(
            children: [
              Container(
                padding: EdgeInsets.only(top: 20),
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
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      ExpansionTile(
                        key: GlobalKey(),
                        initiallyExpanded: _openTileIndex == 0,
                        onExpansionChanged: (isExpanded) {
                          _handleTileTap(0);
                        },
                        shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                        leading:Image.asset("assets/Images/Admin Drawer/enlarge_Picture1.png",height: size.height*0.045,),


                        title: Text("Students",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                        children: [
                          ListTile(
                          leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),

                            title:  Text("All Student",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                          onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => AllStudents(),));
                          },
                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            // tileColor: Color(0xFFE9F0FF),
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Add New Student",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => AddNewStudent(),)),
                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(

                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Admission Form",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => StudentAdmissionForm(),)),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Student Promotion",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) =>StudentPromote(),)),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(

                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Student Attendance",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) =>StudentAttendance(),)),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Student Result",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) =>StudentResults(),)),

                          ),
                        ],
                      ),
                      ExpansionTile(
                        key: GlobalKey(),
                        initiallyExpanded: _openTileIndex == 1,
                        onExpansionChanged: (isExpanded) {
                          _handleTileTap(1);
                        },
                        shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                        leading:Icon(Icons.person,color: Colors.black,),
                        title: Text("Teacher",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                        children: [
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("All Teacher",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => AllTeacher(),));
                            },
                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => AddNewTeacher(),));
                            },

                            title:  Text("Add New Teacher",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Teacher Sallery",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherSalary(),));
                            },
                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Teacher Attendance",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherAttendance(),));
                            },
                          ),

                        ],
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 2,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(2);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.family_restroom_sharp,color: Colors.black,),
                      //   title: Text("Parents",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("All Parents",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //       onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => AllParents(),));
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ExpansionTile(
                        key: GlobalKey(),
                        initiallyExpanded: _openTileIndex == 3,
                        onExpansionChanged: (isExpanded) {
                          _handleTileTap(3);
                        },
                        shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                        leading:Icon(Icons.folder,color: Colors.black,),
                        title: Text("File Manager",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                        children: [
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Calender",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                          onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => Calender(),));
                          },
                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Chat",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Gallery",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Document",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                          onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => FileMangerDocuments(),));
                          },
                          ),


                        ],
                      ),
                      ExpansionTile(
                        key: GlobalKey(),
                        initiallyExpanded: _openTileIndex == 4,
                        onExpansionChanged: (isExpanded) {
                          _handleTileTap(4);
                        },
                        shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                        leading:Icon(Icons.menu_book_sharp,color: Colors.black,),
                        title: Text("Library",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                        children: [
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("All Books",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => AllBooks(),));
                            },
                          ),
                          // SizedBox(height: size.height*0.006,),
                          // ListTile(
                          //   leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                          //   title:  Text("Add New Books",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                          //
                          // ),


                        ],
                      ),
                      ExpansionTile(
                        key: GlobalKey(),
                          initiallyExpanded: _openTileIndex == 5,
                          onExpansionChanged: (isExpanded) {
                            _handleTileTap(5);
                          },

                        shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                        leading:Icon(Icons.account_balance_rounded,color: Colors.black,),
                        title: Text("Accounts",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                        children: [
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Account Details",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => AccountDetails(),));
                            },
                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Expenses",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),

                          ),



                        ],
                      ),
                      ListTile(
                        leading:Icon(CupertinoIcons.doc,color: Colors.black,),
                        title:  Text("Leaves",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AllLeave(),));
                        },
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //     initiallyExpanded: _openTileIndex == 6,
                      //     onExpansionChanged: (isExpanded) {
                      //       _handleTileTap(6);
                      //     },
                      //
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(CupertinoIcons.doc,color: Colors.black,),
                      //   title: Text("Leaves",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading:Icon(CupertinoIcons.doc,color: Colors.black,),
                      //       title:  Text("Leaves",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //             onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => AllLeave(),));
                      //             },
                      //     ),
                      //
                      //
                      //
                      //
                      //   ],
                      // ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 7,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(7);
                      //   },
                      //   shape: const OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:const Icon(Icons.more_time,color: Colors.black,),
                      //   title: Text("Time Table",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: const Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: const Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Time Table",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //       trailing: const Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //       onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => TimeTableStructureScreen(),)) ;
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ListTile(
                        title:  Text("Time Table",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        leading:const Icon(Icons.more_time,color: Colors.black,),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => TimeTableStructureScreen(),)) ;
                        },
                      ),
                      ListTile(
                        leading:const Icon(Icons.book,color: Colors.black,),
                        title:  Text("All Subjects",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),

                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => const AllSubjects(),)) ;
                        },
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 8,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(8);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.book,color: Colors.black,),
                      //   title: Text("Subjects",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("All Subjects",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //       onTap: (){
                      //        Navigator.push(context, MaterialPageRoute(builder: (context) => AllSubjects(),)) ;
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ListTile(

                        title:  Text("All Notices",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        leading:Icon(Icons.notification_add_outlined,color: Colors.black,),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AdminNotice(),)) ;
                        },
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 9,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(9);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.notification_add_outlined,color: Colors.black,),
                      //   title: Text("Notice",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("All Notices",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //       onTap: (){
                      //        Navigator.push(context, MaterialPageRoute(builder: (context) => AdminNotice(),)) ;
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ListTile(
                        leading:Icon(Icons.emoji_transportation,color: Colors.black,),
                        title:  Text("Transports",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),

                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AllTransportFile(),)) ;
                        },
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 10,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(10);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.emoji_transportation,color: Colors.black,),
                      //   title: Text("Transports",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("All Transports",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //       onTap: (){
                      //        Navigator.push(context, MaterialPageRoute(builder: (context) => AllTransportFile(),)) ;
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ListTile(
                        leading:Icon(Icons.newspaper_rounded,color: Colors.black,),
                        title:  Text("Exams",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),

                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Exams(),)) ;
                        },
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 11,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(11);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.newspaper_rounded,color: Colors.black,),
                      //   title: Text("Exams",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Exams",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //       onTap: (){
                      //        Navigator.push(context, MaterialPageRoute(builder: (context) => Exams(),)) ;
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ListTile(
                        leading:Icon(Icons.message,color: Colors.black,),
                        title:  Text("All Messages",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),

                        onTap: (){

                        },
                      ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 12,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(12);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.message,color: Colors.black,),
                      //   title: Text("Message",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("All Messages",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //       onTap: (){
                      //
                      //       },
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),
                      ListTile(
                        leading: Icon(Icons.supervised_user_circle_rounded,color: Colors.black,size: size.width*0.1,),
                        title: Text("Teacher Panel",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => TeacherHome(),));
                        },
                      ),

                    ],
                  ),
                ),
              ),
              Container(
                width: size.width*0.75,
                child: Text(" © 2024 All Right Reserved by School\nDesigned by MetaPhile",textAlign: TextAlign.center,),
              )


            ],
          )
      ),
      body:  SingleChildScrollView(
        child: Container(

          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height*0.01,),
              GridView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: 2,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount( childAspectRatio: 1.5,crossAxisCount: 2,crossAxisSpacing: size.width*0.02),
                itemBuilder: (context, index) {
                  final cardCategory=cardType[index];
                  return  Card(
                    color:Color(0xFFB3FCF9),
                    child: Container(
                      child: TextButton(
                        onPressed: (){},
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Image.asset(cardImage[index],height: size.height*0.06,fit: BoxFit.contain,color: Colors.black,),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(cardCategory["type"]!,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                                Text(cardCategory["number"]!,style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.black,fontWeight:FontWeight.w600),),

                              ],
                            )
                          ],
                        ),
                      ),
                    ),
                  );
                },),
              SizedBox(height: size.height*0.02,),
              SchoolPerformanceChart(),
              SizedBox(height: size.height*0.02,),
              EventCalendarPage(),
              SizedBox(height: size.height*0.02,),
              ExpensesChart(),
              SizedBox(height: size.height*0.02,),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Topper Students",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),),
                    SizedBox(height: size.height*0.02,),
                    Card(
                      margin: EdgeInsets.all(0),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      child: Column(
                        children: [
                          Container(

                            height: size.height*0.05,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8),
                              color:Color(0xFFE9F0FF),
                            ),
                            padding: EdgeInsets.symmetric(horizontal: 5),

                            child: Row(
                              children: [
                                SizedBox(
                                    width: size.width*0.35,
                                    child: AutoSizeText("Name",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                                SizedBox(
                                    width: size.width*0.35,

                                    child: AutoSizeText("Class",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                                SizedBox(
                                    child: AutoSizeText("Second",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),))


                              ],
                            ),
                          ),
                          ListView.builder(
                            shrinkWrap: true,
                            itemCount: topperStudents.length,
                            physics: NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              final toperStudent=topperStudents[index];
                              return Container(
                                height: size.height*0.05,
                                padding: EdgeInsets.symmetric(horizontal: 5),
                                child: Row(

                                  children: [
                                    SizedBox(
                                        width: size.width*0.35,
                                        child: AutoSizeText(toperStudent["name"]!,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),

                                    SizedBox(
                                        width: size.width*0.35,
                                        child: AutoSizeText(toperStudent["class"]!,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),

                                    SizedBox(
                                        child: AutoSizeText(toperStudent["rank"]!,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),))


                                  ],
                                ),
                              );

                            },)
                        ],
                      ),
                    )
                  ],
                ),
              ),
              SizedBox(height: size.height*0.02,),
            ],
          ),
        ),
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
              height: size.height * 2,
              width: size.width,

            ),
          ),

        ],
      ),
    );
  }
}
