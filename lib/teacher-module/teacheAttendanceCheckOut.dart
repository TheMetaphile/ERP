import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/teacherAttendance.dart';

import '../utils/utils.dart';

class teacherAttendanceCheckOut extends StatefulWidget {
  const teacherAttendanceCheckOut({super.key});

  @override
  State<teacherAttendanceCheckOut> createState() => _teacherAttendanceCheckOutState();
}

class _teacherAttendanceCheckOutState extends State<teacherAttendanceCheckOut> {
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
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Check Out",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
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
                          Text("The End of the Day !",style: TextStyle(color: Colors.black,fontSize: size.width*0.05),),
                          SizedBox(
                            height: size.height*0.14,
                              child: Image.asset("assets/Images/Potted Plant.png",fit: BoxFit.cover,)),
                          Text("08:45:00",style: TextStyle(fontSize: size.width*0.065,fontWeight: FontWeight.w600),),
                          Text("March 12 2024 - Friday",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),),
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
                                  Text("08:10 AM",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold),),
                                  Text("Check In",style: TextStyle(color: Colors.grey),),

                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Group 2.png",height: size.height*0.025),
                                  Text("08:10 PM",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold),),
                                  Text("Check out",style: TextStyle(color: Colors.grey),),

                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Group 3.png",height: size.height*0.025),
                                  Text("___",style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold),),
                                  Text("Total hours",style: TextStyle(color: Colors.grey),),

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
