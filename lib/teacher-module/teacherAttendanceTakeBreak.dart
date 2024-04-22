import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/teacheAttendanceCheckOut.dart';
import 'package:untitled/teacher-module/teacherAttendance.dart';
import 'package:untitled/teacher-module/teacherAttendanceTakeBreakRunning.dart';
import '../utils/utils.dart';

class TeacherAttendanceTakeBreak extends StatefulWidget {
  const TeacherAttendanceTakeBreak({super.key});

  @override
  State<TeacherAttendanceTakeBreak> createState() => _TeacherAttendanceTakeBreakState();
}

class _TeacherAttendanceTakeBreakState extends State<TeacherAttendanceTakeBreak> {
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
      backgroundColor: const Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
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
                    elevation: 5,
                    margin: const EdgeInsets.all(0),
                    shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),

                    child: SizedBox(

                      width: size.width*0.9,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: EdgeInsets.only(left: size.height*0.02,top: size.height*0.02),
                            child: Text("Mark Your Attendance",style: TextStyle(color: Colors.black,fontSize: size.width*0.05),),
                          ),
                          SizedBox(height: size.height*0.025,),
                          Center(child: Text("08:45:00 AM",style: TextStyle(fontSize:size.width*0.065,fontWeight: FontWeight.w600),)),
                          Center(child: Text("March 12 2023 - Friday",style: TextStyle(color:Colors.grey,fontSize: size.width*0.035),)),
                          SizedBox(height: size.height*0.035,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Card(

                                margin: const EdgeInsets.all(0),
                                shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),


                                child: TextButton(
                                  style: TextButton.styleFrom(shape: const RoundedRectangleBorder()),
                                  onPressed: (){
                                    Navigator.push(context, MaterialPageRoute(builder: (context) => const teacherAttendanceCheckOut(),));
                                  },
                                  child: Text("Check out",style: TextStyle(fontSize: size.width*0.035,
                                      color: const Color(0xFF5A77BC),),),
                                ),
                              ),
                              Card(
                                color: const Color(0xFF5A77BC),
                                margin: const EdgeInsets.all(0),
                                shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),

                                child: TextButton(
                                  style: TextButton.styleFrom(shape: const RoundedRectangleBorder()),
                                  onPressed: (){
                                    Navigator.push(context, MaterialPageRoute(builder: (context) => const teacherAttendanceTakeBreakRunning(),));
                                  },
                                  child: Text("Take a Break",style: TextStyle(fontSize: size.width*0.035,
                                    color: Colors.white,),),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: size.height*0.01,),
                          const Divider(color: Colors.grey,indent: 25,endIndent: 20),
                          SizedBox(height: size.height*0.01,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Image.asset("assets/Images/Group 1.png",height: size.height*0.025,),
                                    Text("08:10 AM",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
                                    Text("Check In",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),),

                                  ],
                                ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Group 2.png",height: size.height*0.025),
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
                                Navigator.push(context, MaterialPageRoute(builder: (context) => const teacherAttendance(),));
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
