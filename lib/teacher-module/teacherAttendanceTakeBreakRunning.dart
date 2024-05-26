import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/teacheAttendanceCheckOut.dart';
import 'package:untitled/teacher-module/teacherAttendance.dart';
import 'package:untitled/teacher-module/teacherAttendanceTakeBreak.dart';

import '../utils/utils.dart';

class teacherAttendanceTakeBreakRunning extends StatefulWidget {
  const teacherAttendanceTakeBreakRunning({super.key});

  @override
  State<teacherAttendanceTakeBreakRunning> createState() => _teacherAttendanceTakeBreakRunningState();
}

class _teacherAttendanceTakeBreakRunningState extends State<teacherAttendanceTakeBreakRunning> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
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
  @override
  Widget build(BuildContext context) {
  Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        backgroundColor: Colors.transparent,
        title: Text("Take Break",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Center(

              child: Column(
                children: [
                  SizedBox(height: size.height*0.05,),
                  Card(
                    margin: EdgeInsets.all(0),
                    shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),
                    child: Container(
                      width: size.width*0.9,

                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          SizedBox(height: size.height*0.01,),
                          Text("Its your Break Time !",style: TextStyle(color: Colors.black,fontSize: size.width*0.05),),
                          Image.asset("assets/Images/Cup.png",height: size.height*0.09,fit: BoxFit.contain,),
                          Text("08:45:00",style: TextStyle(fontSize: size.width*0.035,fontWeight: FontWeight.w600),),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text("Your Break Time Start from  ",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),),
                              Text("08:45 PM",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontSize: size.width*0.035),)
                            ],
                          ),
                          SizedBox(height: size.height*0.005,),
                          Card(
                            elevation: 3,
                            margin: EdgeInsets.all(0),
                            shape: RoundedRectangleBorder(side: BorderSide(color: Color(0xFF5A77BC),width: 2),borderRadius: BorderRadius.circular(8)),
                            child: Container(
                              height: size.height*0.06,
                              width: size.width*0.66,
                              child: TextButton(
                                style: TextButton.styleFrom(shape: RoundedRectangleBorder()),
                                onPressed: (){
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherAttendanceTakeBreak(),));
                                },
                                child: Text("End",textAlign:TextAlign.center,style: TextStyle(fontSize: size.width*0.04,
                                  color: Color(0xFF5A77BC),),),
                              ),
                            ),
                          ),
                          SizedBox(height: size.height*0.005,),
                          Divider(color: Colors.grey,indent: 25,endIndent: 20),
                          SizedBox(height: size.height*0.008,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Group 1.png",height: size.height*0.025),
                                  Text("08:10 AM",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
                                  Text("Check In",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),),

                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Group 2.png",height: size.height*0.025,),
                                  Text("08:10 PM",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
                                  Text("Check out",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),),

                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Group 3.png",height: size.height*0.025),
                                  Text("___",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
                                  Text("Total hours",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),),

                                ],
                              )
                            ],
                          ),
                          SizedBox(height: size.height*0.02,),


                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.02,),
                  Card(

                    elevation: 3,
                    margin: const EdgeInsets.all(0),
                    shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),

                    child: Container(
                      width: size.width*0.9,
                      padding: const EdgeInsets.all(10),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Padding(
                                padding:  EdgeInsets.only(left: size.height*0.02),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text("Attendance",style: TextStyle(color: Colors.black,fontSize: size.width*0.05),),
                                    Text("Summary",style: TextStyle(color:Colors.grey,fontSize: size.width*0.035),),

                                  ],
                                ),
                              ),
                              TextButton(onPressed: (){
                                Navigator.push(context, MaterialPageRoute(builder: (context) => const TeacherAttendance(),));
                              }, child: const Icon(Icons.arrow_forward_ios_outlined))
                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          Card(

                            color: const Color(0xFFCDDCFF),
                            shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),
                            child: SizedBox(
                              height: size.height*0.06,
                              width: size.width*0.8,
                              child: Row(
                                children: [
                                  SizedBox(width: size.width*0.03,),
                                  Text("02",style: GoogleFonts.openSans(fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
                                  SizedBox(width: size.width*0.03,),
                                  Text("Early Leaves",style: GoogleFonts.openSans(fontSize:size.width*0.045),)
                                ],
                              ),
                            ),
                          ),
                          Card(
                            color: const Color(0xFFFF7F7F),
                            shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),
                            child: SizedBox(
                              height: size.height*0.06,
                              width: size.width*0.8,
                              child: Row(
                                children: [
                                  SizedBox(width: size.width*0.03,),
                                  Text("05",style: GoogleFonts.openSans(fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
                                  SizedBox(width: size.width*0.03,),
                                  Text("Absent",style: GoogleFonts.openSans(fontSize:size.width*0.045),)
                                ],
                              ),
                            ),
                          ),
                          Card(

                            color: const Color(0xFFCDDCFF),
                            shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),
                            child: SizedBox(
                              height: size.height*0.06,
                              width: size.width*0.8,
                              child: Row(
                                children: [
                                  SizedBox(width: size.width*0.03,),
                                  Text("05",style: GoogleFonts.openSans(fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
                                  SizedBox(width: size.width*0.03,),
                                  Text("Late in",style: GoogleFonts.openSans(fontSize:size.width*0.045),)
                                ],
                              ),
                            ),
                          ),
                          Card(

                            color: const Color(0xFFCDDCFF),
                            shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),
                            child: SizedBox(
                              height: size.height*0.06,
                              width: size.width*0.8,
                              child: Row(
                                children: [
                                  SizedBox(width: size.width*0.03,),
                                  Text("08",style: GoogleFonts.openSans(fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
                                  SizedBox(width: size.width*0.03,),
                                  Text("Leaves",style: GoogleFonts.openSans(fontSize:size.width*0.045),)
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
          )
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
