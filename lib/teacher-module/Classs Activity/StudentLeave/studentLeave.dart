import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/ClassActivty/studentLeaveAPI.dart';
import 'package:untitled/utils/utils.dart';

import '../../../APIs/StudentsData/student.dart';
import '../../../utils/theme.dart';

class StudentLeaves extends StatefulWidget {
  const StudentLeaves({super.key});



  @override
  State<StudentLeaves> createState() => _StudentLeavesState();
}

class _StudentLeavesState extends State<StudentLeaves> {
  CustomTheme themeObj=CustomTheme();
  bool newLeave = true;
  bool approvedLeave = false;
  bool rejectedLeave = false;
  bool isLoading=false;
  bool isUpdated=false;
  String status="Pending";
  String? Class;
  String? section;
  List<dynamic>? students;
  int start=0;
  StudentLeaveAPI leaveObj=StudentLeaveAPI();
  Future<void> fetchLeavesData() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      Class = pref.getString("class");
      section = pref.getString("section");
        print(accessToken);
      List<dynamic> fetchedStudents = await leaveObj.fetchLeaves(accessToken!, start, status);
      print('Fetched students: $fetchedStudents');

      setState(() {
        students = fetchedStudents;
      });
    } catch (e, stackTrace) {
      print('Error fetching student data: $e');
      print('Stack trace: $stackTrace');
      if (e is Exception) {
        print('Exception details: ${e.toString()}');
      }
      showRedSnackBar("Failed to load students. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
  Future<bool> updateLeaves(String decision,String leaveId)async {
    setState(() {
      isUpdated = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      bool response = await leaveObj.updateLead(accessToken!,decision ,leaveId );
      print('Fetched students: $response');

    return response;
    }catch (e) {
      print('Error fetching student data: $e');
      return false;

    } finally {
      setState(() {
        isUpdated = false;
      });
    }
  }
  @override
  void initState(){
    super.initState();
    fetchLeavesData();
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    print(students);
    return Scaffold(
      backgroundColor:themeObj.textWhite,
      // appBar: AppBar(
      //   leading: IconButton(
      //     onPressed: (){
      //       Navigator.pop(context);
      //     },
      //     icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
      //   ),
      //   backgroundColor: themeObj.primayColor,
      //   title: Text("Student Leaves",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      // ),

      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 3),
        width: size.width,
        height: size.height*1,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            Row(
              children: [
                TextButton(
                  onPressed: () {
                    setState(()  {
                    status="Pending";

                       fetchLeavesData();
                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status=="Pending" ? themeObj.primayColor :  Color.fromRGBO(209,213,219,1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "New Leaves",
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                SizedBox(width: size.width*0.015,),
                TextButton(
                  onPressed: () {
                      setState(()  {
                        status="Approved";

                         fetchLeavesData();
                      });


                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status=="Approved" ? themeObj.primayColor : Color.fromRGBO(209,213,219,1),
                    shape: RoundedRectangleBorder(

                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Approved Leaves",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                SizedBox(width: size.width*0.015,),
                TextButton(
                  onPressed: () {
                      setState(()  {
                        status="Rejected";

                         fetchLeavesData();
                      });


                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status=="Rejected" ? themeObj.primayColor : Color.fromRGBO(209,213,219,1),
                    shape: RoundedRectangleBorder(

                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Rejected Leaves",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),

              ],
            ),
            SizedBox(height: size.height*0.02,),
           isLoading?Center(
               child: LoadingAnimationWidget.threeArchedCircle(
                 color: themeObj.primayColor,
                 size: 50,
               )):status=="Pending"? Expanded(
              child: ListView.builder(
                itemCount: students?.length,
                itemBuilder: (context, index) {
                  final particularStudentLeave=students?[index];

                  return  Column(
                    children: [
                      Card(
                        margin: EdgeInsets.all(0),
                        elevation: 3,
                        child: ExpansionTile(
                          leading:  CircleAvatar(
                            radius: size.width * 0.08,
                            backgroundImage: NetworkImage(particularStudentLeave["profileLink"]),
                          ),
                          title: Text(
                            "Salman Khan from class  $Class $section wants a Leave Request to you from  ${particularStudentLeave["startDate"]} to  ${particularStudentLeave["endDate"]}",
                            style: TextStyle(
                              color: themeObj.textBlack,
                              fontWeight: FontWeight.w400,
                              fontSize: size.width * 0.035,
                            ),
                          ),
                          shape: Border.all(color: Colors.transparent),
                          children: [


                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Reason",textAlign: TextAlign.start,
                                  style: TextStyle(
                                    color: themeObj.textgrey,
                                    fontWeight: FontWeight.w600,
                                    fontSize: size.width * 0.035,
                                  ),
                                ),
                                SizedBox(height: size.height*0.01,),
                                Container(
                                  width: size.width*0.8,
                                  padding: EdgeInsets.all(3),
                                  decoration: BoxDecoration(
                                    color: Colors.white60,
                                    border: Border.all(color: Colors.grey,width: 1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child:    Text(
                                    particularStudentLeave["reason"],textAlign: TextAlign.start,
                                    style: TextStyle(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.035,
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height*0.01,),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Container(
                                  width: size.width*0.3,
                                  child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(backgroundColor:Colors.red,shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                      onPressed: () async {

                                        await updateLeaves("Rejected", particularStudentLeave["_id"]);
                                        fetchLeavesData();
                                      },
                                      child: isUpdated ?SizedBox():Text("Rejected",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                                ),
                                Container(
                                  width: size.width*0.3,
                                  child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                      onPressed: () async {
                                        await updateLeaves("Approved", particularStudentLeave["_id"]);
                                        fetchLeavesData();
                                      },
                                      child:  isUpdated ?SizedBox():Text("Approved",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                                ),
                                SizedBox(height: size.height*0.01,),
                              ],
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: size.height*0.02,)
                    ],
                  );

                },
              ),
            ):
            status=="Approved"?Expanded(
              child: ListView.builder(
                itemCount: students?.length,
                itemBuilder: (context, index) {
                   final particularStudentLeave=students?[index];
                  return  Column(
                    children: [
                      Card(
                        margin: EdgeInsets.all(0),
                        elevation: 3,
                        child: ExpansionTile(
                          leading:  CircleAvatar(
                            radius: size.width * 0.08,
                            backgroundImage: NetworkImage(particularStudentLeave["profileLink"]),
                          ),
                          title: Text(
                            "Salman Khan from class  $Class $section wants a Leave Request to you from  ${particularStudentLeave["startDate"]} to  ${particularStudentLeave["endDate"]}",
                            style: TextStyle(
                              color: themeObj.textBlack,
                              fontWeight: FontWeight.w400,
                              fontSize: size.width * 0.035,
                            ),
                          ),
                          shape: Border.all(color: Colors.transparent),
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Reason",textAlign: TextAlign.start,
                                  style: TextStyle(
                                    color: themeObj.textgrey,
                                    fontWeight: FontWeight.w600,
                                    fontSize: size.width * 0.035,
                                  ),
                                ),
                                SizedBox(height: size.height*0.01,),
                                Container(

                                  width: size.width*0.8,
                                  padding: EdgeInsets.all(3),
                                  decoration: BoxDecoration(
                                    color: Colors.white60,
                                    border: Border.all(color: Colors.grey,width: 1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child:    Text(
                                    particularStudentLeave["reason"],textAlign: TextAlign.start,
                                    style: TextStyle(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.035,
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height*0.01,),
                              Text("Approved",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Color(0XFF6FF87D)),),
                                SizedBox(height: size.height*0.01,),
                    ],
                            )
                          ],
                        ),
                      ),
                      SizedBox(height: size.height*0.02,)
                    ],
                  );

                },
              ),
            ):Expanded(
              child: ListView.builder(
                itemCount: students?.length,
                itemBuilder: (context, index) {
                  final particularStudentLeave=students?[index];
                  return  Column(
                    children: [
                      Card(
                        margin: EdgeInsets.all(0),
                        elevation: 3,
                        child: ExpansionTile(
                          leading:  CircleAvatar(
                            radius: size.width * 0.08,
                            backgroundImage: NetworkImage(particularStudentLeave["profileLink"]),
                          ),
                          title: Text(
                            "Salman Khan from class  $Class $section wants a Leave Request to you from  ${particularStudentLeave["startDate"]} to  ${particularStudentLeave["endDate"]}",
                            style: TextStyle(
                              color: themeObj.textBlack,
                              fontWeight: FontWeight.w400,
                              fontSize: size.width * 0.035,
                            ),
                          ),
                          shape: Border.all(color: Colors.transparent),
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Reason",textAlign: TextAlign.start,
                                  style: TextStyle(
                                    color: themeObj.textgrey,
                                    fontWeight: FontWeight.w600,
                                    fontSize: size.width * 0.035,
                                  ),
                                ),
                                SizedBox(height: size.height*0.01,),
                                Container(

                                  width: size.width*0.8,
                                  padding: EdgeInsets.all(3),
                                  decoration: BoxDecoration(
                                    color: Colors.white60,
                                    border: Border.all(color: Colors.grey,width: 1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child:    Text(
                                    particularStudentLeave["reason"],textAlign: TextAlign.start,
                                    style: TextStyle(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.035,
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("Rejected",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.red),),
                                SizedBox(height: size.height*0.01,),
                              ],
                            )
                          ],
                        ),
                      ),
                      SizedBox(height: size.height*0.02,)
                    ],
                  );

                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
