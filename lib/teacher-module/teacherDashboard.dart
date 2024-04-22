import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/Birthday.dart';
import 'package:untitled/teacher-module/studentLeaveApplications.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';

import '../utils/utils.dart';

class teacherDashboard extends StatefulWidget {
  const teacherDashboard({super.key});

  @override
  State<teacherDashboard> createState() => _teacherDashboardState();
}

class _teacherDashboardState extends State<teacherDashboard> {

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
          backgroundColor: Colors.transparent,
          title: Text("DashBoard",style: GoogleFonts.openSans(fontSize: size.width*0.05,color:Colors.white,fontWeight:FontWeight.w500),),
        ),
        body: Stack(
          children: [
            secondStackLayer(size,context),
            SingleChildScrollView(
              controller: scrollController2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [

                  SizedBox(height: size.height*0.05,),
                  Center(
                    child: Container(
                      margin: EdgeInsets.only(bottom: size.height*0.05),
                      width: size.width*0.9,
                      child: GridView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: categoryName.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2,crossAxisSpacing: size.width*0.04,mainAxisSpacing: size.height*0.03),
                        itemBuilder: (context, index) {
                          String picName = categoryName[index];
                          return Card(
                            elevation: 3,
                            shape: RoundedRectangleBorder(side: BorderSide(color: Color(0xFF5A77BC),width: 1),borderRadius: BorderRadius.circular(12)),
                            child: Container(
                              height: size.height*0.17,
                              width: size.width*0.4,
                              child: TextButton(
                                onPressed: (){
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => navigation[index],));
                                },
                                style: TextButton.styleFrom(shape: RoundedRectangleBorder()),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    picName == 'Check-in' ? CircleAvatar(
                                      radius: size.height*0.05,
                                      backgroundColor: Color(0xFF81A1ED),
                                      child: Image.asset(getPic(picName),alignment: Alignment.center,height: size.height*0.06,),):SizedBox(height: size.height*0.08,child: Image.asset(getPic(picName,),fit: BoxFit.cover)),
                                    SizedBox(height: size.height*0.02,),
                                    Text("${picName}",style: TextStyle(color: Colors.black,fontSize: size.width*0.035,fontWeight: FontWeight.w400),)
                                  ],
                                ),
                              ),
                            ),
                          );
                        },),
                    ),
                  ),
                ],
              ),
            )

          ],
        ),

        drawer: Drawer(
            width: size.width*0.8,
            child: Column(
              children: [
                Container(
                  padding: EdgeInsets.only(top: 20),
                  height: size.height*0.2,
                  width: size.width*1,
                  decoration: BoxDecoration(
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
                          Navigator.push(context,MaterialPageRoute(builder: (context) => teacherDashboard(),));

                        },
                      ),
                      ListTile(
                        leading: Image.asset("assets/Images/gift-box-icon.png",width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Birthday",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                        onTap: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => birthday(),));
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
                        leading: Image.asset("assets/Images/logout.png",width: size.width*0.1,height: size.height*0.04,fit: BoxFit.contain),
                        title: Text("Logout",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                      ),
                    ],
                  ),
                ),
                Expanded(child: SizedBox(),),
                Container(
                  width: size.width*0.75,
                  child: Text(" © 2024 All Right Reserved by School\nDesigned by MetaPhile",textAlign: TextAlign.center,),
                )
              ],
            )
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
