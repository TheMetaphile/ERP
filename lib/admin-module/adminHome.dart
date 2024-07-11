
import 'package:auto_size_text/auto_size_text.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/Account%20Pannel/accountdetails.dart';
import 'package:untitled/admin-module/Assign%20Class%20Teacher/assignClassTeacher.dart';
import 'package:untitled/admin-module/Classes%20Pannel/allClasses.dart';
import 'package:untitled/admin-module/Events/events.dart';
import 'package:untitled/admin-module/File%20Manager/calender.dart';
import 'package:untitled/admin-module/File%20Manager/document.dart';
import 'package:untitled/admin-module/Library/allbooks.dart';
import 'package:untitled/admin-module/Parents%20Pannel/allParents.dart';
import 'package:untitled/admin-module/StudentPannel/addNewStudent.dart';
import 'package:untitled/admin-module/StudentPannel/admissionForm.dart';
import 'package:untitled/admin-module/StudentPannel/characterCertificate.dart';
import 'package:untitled/admin-module/StudentPannel/studentAttendance.dart';
import 'package:untitled/admin-module/StudentPannel/studentDetail.dart';
import 'package:untitled/admin-module/StudentPannel/studentPromote.dart';
import 'package:untitled/admin-module/StudentPannel/transferCertificate.dart';
import 'package:untitled/admin-module/Subject%20Teacher/allSubjects.dart';
import 'package:untitled/admin-module/TeacherPannel/addNewTeacher.dart';
import 'package:untitled/admin-module/TeacherPannel/allTeacher.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherAttendance.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherSalary.dart';

import '../Charts/BarChartExample.dart';
import '../Charts/LineChart.dart';
import '../Charts/eventCalender.dart';
import '../teacher-module/Classs Activity/ClassActivityTime Table/TimeTable.dart';
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
  String deviceTokenToSendPushNotification="";


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
      "type":"Events",
      "number":"50"
    },
    {
      "type":"Earning",
      "number":"60 Lakh"
    }
  ];
  List<String> cardImage=["assets/Images/Admin Home/Students.png","assets/Images/Admin Home/Teachers.png","assets/Images/Admin Home/events.png","assets/Images/Admin Home/Finance.png"];
  List<Map<String, String>> topperStudents=[
    {
      "name":"Ankit",
      "id":"87481",
      "class":"X A",
      "rank":"First"
    },
    {
      "name":"Bhanu",
      "id":"87484",
      "class":"XI A",
      "rank":"First"
    },
    {
      "name": "Manish",
      "id":"87182",
      "class": "X A",
      "rank": "First"
    },
    {
      "name":"Ankit",
      "id":"87487",
      "class":"X B",
      "rank":"First"
    },
    {
      "name":"Ankit",
      "id":"87487",
      "class":"X B",
      "rank":"First"
    },
    {
      "name":"Ankit",
      "id":"87487",
      "class":"X B",
      "rank":"First"
    },
    {
      "name":"Ankit",
      "id":"87487",
      "class":"X B",
      "rank":"First"
    },
    {
      "name":"Ankit",
      "id":"87487",
      "class":"X B",
      "rank":"First"
    },
    {
      "name":"Ankit",
      "id":"87487",
      "class":"X B",
      "rank":"First"
    },
  ];
  List<Map<String, String>> teacherDetails=[
    {
      "name":"Ankit",
      "subject":"Maths",
      "qualification":"B.tech",
      "sallery":"10000",
      "performance":"Good",
    },
    {
      "name":"Abhishek",
      "subject":"Hindi",
      "qualification":"B.tech",
      "sallery":"10000",
      "performance":"Bad",
    },
    {
      "name":"Bhanu",
      "subject":"English",
      "qualification":"B.tech",
      "sallery":"10000",
      "performance":"Good",
    },
    {
      "name":"Yash",
      "subject":"Computer",
      "qualification":"B.tech",
      "sallery":"10000",
      "performance":"Bad",
    },
    {
      "name":"Manish",
      "subject":"Science",
      "qualification":"B.tech",
      "sallery":"10000",
      "performance":"Good",
    },
    {
      "name":"Ankit",
      "subject":"Social Science",
      "qualification":"B.tech",
      "sallery":"10000",
      "performance":"Good",
    },
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.only(left: 10),
                width: size.width*1,
                decoration:  BoxDecoration(
                  color:themeObj.primayColor,

                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: size.height*0.04,),
                    CircleAvatar(
                      radius: size.width*0.1,
                      backgroundColor:Color.fromRGBO(33,150,243,0.6),
                      child:Text("A",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontSize: size.width*0.1,fontWeight: FontWeight.w400),),

                    ),
                    SizedBox(height: size.height*0.01,),
                    Text("Ankit Sharma",overflow: TextOverflow.ellipsis,style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.04,fontWeight: FontWeight.w500),),
                    Text("ankits459@gmail.com",overflow: TextOverflow.ellipsis,style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035,fontWeight: FontWeight.w400),),
                    Text("Id-015",style: TextStyle(color:themeObj.textBlack,fontSize: size.width*0.035,fontWeight: FontWeight.w400),),
                    SizedBox(height: size.height*0.01,)
                  ],
                ),
              ),
              Expanded(
                child: SingleChildScrollView(
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
                        leading: Image.asset("assets/Images/TeacherDashboard/Dashboard_time_table.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Time Table",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => TimeTable(),));
                        },
                      ),
                      ExpansionTile(
                        key: GlobalKey(),
                        initiallyExpanded: _openTileIndex == 0,
                        onExpansionChanged: (isExpanded) {
                          _handleTileTap(0);
                        },
                        shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                        leading:Image.asset("assets/Images/Admin Drawer/student.png",height: size.height*0.045,),


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
                          // SizedBox(height: size.height*0.006,),
                          // ListTile(
                          //   // tileColor: Color(0xFFE9F0FF),
                          //   leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                          //   title:  Text("Add New Student",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                          //   onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => AddNewStudent(),)),
                          // ),
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
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Transfer Certificate",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) =>TransferCertificate(),)),

                          ),
                          SizedBox(height: size.height*0.006,),
                          ListTile(
                            leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                            title:  Text("Character Certificate",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) =>CharacterCertificate(),)),

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
                      ListTile(
                        leading:Image.asset("assets/Images/Admin Drawer/AssignClassTeacher.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title:  Text("Assign Class Teacher",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AssignClassTeacher(),));
                        },
                      ),
                      ListTile(
                        leading:Image.asset("assets/Images/Admin Drawer/subjectTeacher.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title:  Text("Subject Teacher",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AssignSubjectTeacher(),));
                        },
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
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 3,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(3);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.folder,color: Colors.black,),
                      //   title: Text("File Manager",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Calender",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //     onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => Calender(),));
                      //     },
                      //     ),
                      //     SizedBox(height: size.height*0.006,),
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Chat",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //     ),
                      //     SizedBox(height: size.height*0.006,),
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Gallery",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //     ),
                      //     SizedBox(height: size.height*0.006,),
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Document",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //     onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => FileMangerDocuments(),));
                      //     },
                      //     ),
                      //
                      //
                      //   ],
                      // ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //   initiallyExpanded: _openTileIndex == 4,
                      //   onExpansionChanged: (isExpanded) {
                      //     _handleTileTap(4);
                      //   },
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.menu_book_sharp,color: Colors.black,),
                      //   title: Text("Library",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("All Books",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //       onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => AllBooks(),));
                      //       },
                      //     ),
                      //     // SizedBox(height: size.height*0.006,),
                      //     // ListTile(
                      //     //   leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //     //   title:  Text("Add New Books",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //     //
                      //     // ),
                      //
                      //
                      //   ],
                      // ),
                      // ExpansionTile(
                      //   key: GlobalKey(),
                      //     initiallyExpanded: _openTileIndex == 5,
                      //     onExpansionChanged: (isExpanded) {
                      //       _handleTileTap(5);
                      //     },
                      //
                      //   shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                      //   leading:Icon(Icons.account_balance_rounded,color: Colors.black,),
                      //   title: Text("Accounts",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                      //   trailing: Icon(CupertinoIcons.chevron_down,color: Colors.black,),
                      //   children: [
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Account Details",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //       onTap: (){
                      //         Navigator.push(context, MaterialPageRoute(builder: (context) => AccountDetails(),));
                      //       },
                      //     ),
                      //     SizedBox(height: size.height*0.006,),
                      //     ListTile(
                      //       leading: Icon(Icons.arrow_forward_ios,color: Colors.grey,),
                      //       title:  Text("Expenses",style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                      //
                      //     ),
                      //
                      //
                      //
                      //   ],
                      // ),

                      ListTile(
                        leading:Image.asset("assets/Images/Admin Drawer/Events.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title:  Text("Events",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Events(),));
                        },
                      ),
                      ListTile(
                        leading:Image.asset("assets/Images/Admin Drawer/Account.png",color: themeObj.textBlack,width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title:  Text("Expenses",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        onTap: (){
                        //  Navigator.push(context, MaterialPageRoute(builder: (context) => Events(),));
                        },
                      ),
                      ListTile(
                        leading:Icon(Icons.newspaper_rounded,color:themeObj.textBlack,),
                        title:  Text("Exams",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),

                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Exams(),)) ;
                        },
                      ),
                      ListTile(
                        leading:Icon(Icons.emoji_transportation,color: Colors.black,),
                        title:  Text("Transports",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),

                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AllTransportFile(),)) ;
                        },
                      ),
                      ListTile(

                        title:  Text("All Notices",style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                        leading:Icon(Icons.notification_add_outlined,color: Colors.black,),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => AdminNotice(),)) ;
                        },
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
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            GridView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: 4,
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
            SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Teacher Details",
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.openSans(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w600,
                      fontSize: size.width * 0.05,
                    ),
                  ),
                  SizedBox(height: size.height * 0.02),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          color: Color.fromRGBO(233, 213, 255, 1),
                          child: Row(
                            children: [
                              _buildHeaderCell("Name", size),
                              _buildHeaderCell("Subject", size),
                              _buildHeaderCell("Qualification", size),
                              _buildHeaderCell("Salary", size),
                              _buildHeaderCell("Performance", size),
                            ],
                          ),
                        ),
                        const Divider(thickness: 2, height: 2, color: Colors.black),
                        Container(
                          height: size.height * 0.4, // Adjust this value as needed
                          width: size.width * 1.25, // Adjust this value to fit all columns
                          child: ListView.separated(
                            itemBuilder: (context, index) {
                              final data = teacherDetails[index];
                              return Row(
                                children: [
                                  _buildDataCell(data["name"]!, size),
                                  _buildDataCell(data["subject"]!, size),
                                  _buildDataCell(data["qualification"]!, size),
                                  _buildDataCell(data["sallery"]!, size),
                                  _buildDataCell(data["performance"]!, size),
                                ],
                              );
                            },
                            separatorBuilder: (context, index) => Divider(),
                            itemCount: teacherDetails.length,
                          ),
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
            SizedBox(height: size.height*0.02,),
            SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Topper Students",
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.openSans(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w600,
                      fontSize: size.width * 0.05,
                    ),
                  ),
                  SizedBox(height: size.height * 0.02),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          color: Color.fromRGBO(233, 213, 255, 1),
                          child: Row(
                            children: [
                              _buildHeaderCell("Name", size),
                              _buildHeaderCell("ID", size),
                              _buildHeaderCell("Class", size),
                              _buildHeaderCell("Rank", size),
                            ],
                          ),
                        ),
                        const Divider(thickness: 2, height: 2, color: Colors.black),
                        Container(
                          height: size.height * 0.4, // Adjust this value as needed
                          width: size.width * 1.25, // Adjust this value to fit all columns
                          child: ListView.separated(
                            itemBuilder: (context, index) {
                              final data = topperStudents[index];
                              return Row(
                                children: [
                                  _buildDataCell(data["name"]!, size),
                                  _buildDataCell(data["id"]!, size),
                                  _buildDataCell(data["class"]!, size),
                                  _buildDataCell(data["rank"]!, size),
                                ],
                              );
                            },
                            separatorBuilder: (context, index) => Divider(),
                            itemCount: topperStudents.length,
                          ),
                        )
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

    );
  }
  Widget _buildHeaderCell(String text, Size size) {
    return Container(
      width: size.width * 0.25,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: themeObj.textBlack,
          fontWeight: FontWeight.w600,
          fontSize: size.width * 0.04,
        ),
      ),
    );
  }

  Widget _buildDataCell(String text, Size size) {
    return Container(
      width: size.width * 0.25,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: themeObj.textBlack,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.035,
        ),
      ),
    );
  }
}
