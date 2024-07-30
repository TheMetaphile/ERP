import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../Charts/classprogressGraph.dart';
import '../utils/theme.dart';


class TeacherDashboard extends StatefulWidget {
  const TeacherDashboard({super.key});

  @override
  State<TeacherDashboard> createState() => _TeacherDashboardState();
}

class _TeacherDashboardState extends State<TeacherDashboard> {

  CustomTheme themeObj=CustomTheme();
  final List<Map<String, dynamic>> _attendance = [
    {'date': '11 Tue', 'check-in': '09:00am', 'check-out': '08:45pm','working-hour':'08:20m'},
    {'date': '12 Wed', 'check-in': '09:15am','check-out':'08:45pm','working-hour':'08:10m'},
    {'date': '13 Thru', 'check-in': '09:30am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '14 Fri', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '15 Sat', 'check-in': '09:10am','check-out':'08:45pm','working-hour':'08:15m'},
    {'date': '16 Mon', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:10m'},

  ];
  List<Map<String, String>> cardType=[
    {
      "type":"Total Subject",
      "number":"6"
    },
    {
      "type":"Total Classes",
      "number":"3"
    },
    {
      "type":"Total Students",
      "number":"120"
    },
  ];
  String?teacherName;
  String?profileLink;
  String?teacheremail;
  String?employeeID;
  List<String> cardImage=["assets/Images/TeacherDashboard/subject.png","assets/Images/TeacherDashboard/class.png","assets/Images/TeacherDashboard/student.png",];
  Future<void> getDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    setState(() {
      teacherName = pref.getString("name");
      profileLink = pref.getString("profileLink");
      teacheremail = pref.getString("email");
      employeeID = pref.getString("employeeId");
    });
  }
    @override
    void initState() {
    super.initState();
    getDetails();
  }
  @override
    Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
      return Scaffold(
          backgroundColor: themeObj.textWhite,
        body:    SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 3.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: size.height*0.02,),
               Row(
                 children: [
                   SizedBox(width: size.width*0.03,),
                   Text("Welcome back,",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w500,fontSize: size.width*0.055),),
                   Text('${teacherName ?? 'Teacher'}',overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.06),),

                 ],
               ),
                SizedBox(height: size.height*0.01,),
                GridView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: 3,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount( childAspectRatio: 2,crossAxisCount: 2,crossAxisSpacing: size.width*0.01),
                  itemBuilder: (context, index) {
                    final cardCategory=cardType[index];
                    return  Card(
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
                                  Text(cardCategory["number"]!,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.black,fontWeight:FontWeight.w600),),

                                ],
                              )
                            ],
                          ),
                        ),
                      ),
                    );
                  },),
                SizedBox(height: size.height*0.02,),
                ClassProgressGrapth(),
                SizedBox(height: size.height*0.05,),
                Column(
                  children: [
                    Row(
                      
                      children: [
                        Expanded(child: Text("Attendance Summary",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600))),
                        Text("< April 2024 >",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600)),
                      SizedBox(width: size.width*0.01,),
                      ],
                    ),
                    SizedBox(height: size.height*0.01,),
                    Container(
                      color: Color.fromRGBO(254,215,170,1),
                      height: size.height*0.06,
                      child:Row(

                        children: [
                          SizedBox(
                              width: size.width*0.25,
                              child: Text("Date",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
                          SizedBox(
                              width: size.width*0.25,
                              child: Text("Check-IN",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
                          SizedBox(
                              width: size.width*0.25,
                              child: Text("Check-Out",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
                          SizedBox(
                              width: size.width*0.23,
                              child: Text("Working Hrs",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: size.height*0.4,
                      child: ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: _attendance.length,
                        itemBuilder: (context, index) {
                          final data=_attendance[index];
                          return  Container(
                            color: Color.fromRGBO(254,215,170,0.3),
                            height: size.height*0.06,
                            child:Row(

                              children: [
                                SizedBox(
                                    width: size.width*0.25,
                                    child: Text(data["date"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),

                                SizedBox(
                                    width: size.width*0.25,
                                    child: Text(data["check-in"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
                                SizedBox(
                                    width: size.width*0.25,
                                    child: Text(data["check-out"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
                                SizedBox(
                                    width: size.width*0.23,
                                    child: Text(data["working-hour"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
                              ],
                            ),
                          );
                        },),
                    ),
                  ],
                ),
                SizedBox(height: size.height*0.06,)
              ],
            ),
          ),
        )


      );
    }

  }
