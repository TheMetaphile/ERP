// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'package:untitled/teacher-module/CheckIn/teacheAttendanceCheckOut.dart';
// import 'package:untitled/teacher-module/teacherAttendance.dart';
// import 'package:untitled/teacher-module/teacherAttendanceTakeBreak.dart';
//
// import '../admin-module/TeacherPannel/teacherAttendance.dart';
// import '../utils/theme.dart';
// import '../utils/utils.dart';
//
// class teacherAttendanceTakeBreakRunning extends StatefulWidget {
//   const teacherAttendanceTakeBreakRunning({super.key});
//
//   @override
//   State<teacherAttendanceTakeBreakRunning> createState() => _teacherAttendanceTakeBreakRunningState();
// }
//
// class _teacherAttendanceTakeBreakRunningState extends State<teacherAttendanceTakeBreakRunning> {
//   final List<Map<String, dynamic>> _attendance = [
//     {'date': '11 Tue', 'check-in': '09:00am', 'check-out': '08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20h'},
//
//   ];
//
//   CustomTheme themeObj=CustomTheme();
//   @override
//   Widget build(BuildContext context) {
//   Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       appBar: AppBar(
//         leading: IconButton(
//           onPressed: (){
//             Navigator.pop(context);
//           },
//           icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
//         ),
//         backgroundColor: themeObj.primayColor,
//         title: Text("Take Break",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
//       ),
//       body:  SingleChildScrollView(
//         child: Padding(
//           padding:const EdgeInsets.symmetric(horizontal: 2),
//           child: Column(
//             children: [
//               SizedBox(height: size.height*0.01,),
//               Card(
//                 margin: const EdgeInsets.all(0),
//                 shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//                 child: Column(
//                   crossAxisAlignment: CrossAxisAlignment.center,
//                   children: [
//                     SizedBox(height: size.height*0.01,),
//                     Text("Its your Break Time !",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.05),),
//                     Image.asset("assets/Images/Cup.png",height: size.height*0.09,fit: BoxFit.contain,),
//                     Text("08:45:00",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035,fontWeight: FontWeight.w600),),
//                     Row(
//                       mainAxisAlignment: MainAxisAlignment.center,
//                       children: [
//                         Text("Your Break Time Start from  ",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.035),),
//                         Text("08:45 PM",style: TextStyle(color:themeObj.textBlack,fontWeight: FontWeight.bold,fontSize: size.width*0.035),)
//                       ],
//                     ),
//                     SizedBox(height: size.height*0.005,),
//                     Card(
//                       elevation: 3,
//                       margin: EdgeInsets.all(0),
//                       shape: RoundedRectangleBorder(side: BorderSide(color: Color(0xFF5A77BC),width: 2),borderRadius: BorderRadius.circular(8)),
//                       child: Container(
//                         height: size.height*0.06,
//                         width: size.width*0.66,
//                         child: TextButton(
//                           style: TextButton.styleFrom(shape: const RoundedRectangleBorder(),backgroundColor:themeObj.secondayColor, ),
//                           onPressed: (){
//                             Navigator.push(context, MaterialPageRoute(builder: (context) => const TeacherAttendanceTakeBreak(),));
//                           },
//                           child: Text("End",textAlign:TextAlign.center,style: TextStyle(fontSize: size.width*0.04,
//                             color: themeObj.textBlack,),),
//                         ),
//                       ),
//                     ),
//                     SizedBox(height: size.height*0.005,),
//                     const Divider(color: Colors.grey,indent: 25,endIndent: 20),
//                     SizedBox(height: size.height*0.008,),
//                     Row(
//                       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                       children: [
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.center,
//                           children: [
//                             Image.asset("assets/Images/Group 1.png",height: size.height*0.025),
//                             Text("08:10 AM",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
//                             Text("Check In",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.035),),
//
//                           ],
//                         ),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.center,
//                           children: [
//                             Image.asset("assets/Images/Group 2.png",height: size.height*0.025,),
//                             Text("08:10 PM",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
//                             Text("Check out",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.035),),
//
//                           ],
//                         ),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.center,
//                           children: [
//                             Image.asset("assets/Images/Group 3.png",height: size.height*0.025),
//                             Text("___",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.bold,fontSize: size.width*0.035),),
//                             Text("Total hours",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.035),),
//
//                           ],
//                         )
//                       ],
//                     ),
//                     SizedBox(height: size.height*0.02,),
//
//
//                   ],
//                 ),
//               ),
//               SizedBox(height: size.height*0.02,),
//               Column(
//                 children: [
//                   Row(
//                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                     children: [
//                       Text("Attendance Summary",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600)),
//                       Text("April 2024",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600))
//
//                     ],
//                   ),
//                   SizedBox(height: size.height*0.01,),
//                   Container(
//                     color: Color.fromRGBO(254,215,170,1),
//                     height: size.height*0.06,
//                     child:Row(
//
//                       children: [
//                         SizedBox(
//                             width: size.width*0.25,
//                             child: Text("Date",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
//                         SizedBox(
//                             width: size.width*0.25,
//                             child: Text("Check-IN",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
//                         SizedBox(
//                             width: size.width*0.25,
//                             child: Text("Check-Out",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
//                         SizedBox(
//                             width: size.width*0.23,
//                             child: Text("Working Hrs",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w500))),
//                       ],
//                     ),
//                   ),
//                   SizedBox(
//                     height: size.height*0.4,
//                     child: ListView.builder(
//                       shrinkWrap: true,
//                       itemCount: _attendance.length,
//                       itemBuilder: (context, index) {
//                         final data=_attendance[index];
//                         return  Container(
//                           color: Color.fromRGBO(254,215,170,0.3),
//                           height: size.height*0.06,
//                           child:Row(
//
//                             children: [
//                               SizedBox(
//                                   width: size.width*0.25,
//                                   child: Text(data["date"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
//
//                               SizedBox(
//                                   width: size.width*0.25,
//                                   child: Text(data["check-in"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
//                               SizedBox(
//                                   width: size.width*0.25,
//                                   child: Text(data["check-out"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
//                               SizedBox(
//                                   width: size.width*0.23,
//                                   child: Text(data["working-hour"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w400))),
//                             ],
//                           ),
//                         );
//                       },),
//                   ),
//                 ],
//               ),
//               SizedBox(height: size.height*0.02,),
//               Card(
//                 elevation: 3,
//                 margin: const EdgeInsets.all(0),
//                 shape: RoundedRectangleBorder(side:  BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//                 child: Container(
//                   padding: const EdgeInsets.all(3),
//                   child: Column(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Padding(
//                         padding:  EdgeInsets.only(left: size.height*0.01),
//                         child: Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Text("Mid Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.05),),
//                             //   Text("Summary",style: TextStyle(color:themeObj.textgrey,fontSize: size.width*0.035),),
//
//                           ],
//                         ),
//                       ),
//                       SizedBox(height: size.height*0.02,),
//                       Card(
//
//                         color: themeObj.secondayColor,
//                         shape: RoundedRectangleBorder(side:  BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//                         child: SizedBox(
//                           height: size.height*0.06,
//                           child: Row(
//                             children: [
//                               SizedBox(width: size.width*0.03,),
//                               Text("02",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
//                               SizedBox(width: size.width*0.03,),
//                               Text("Early Leaves",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045),)
//                             ],
//                           ),
//                         ),
//                       ),
//                       Card(
//                         color: const Color(0xFFFF7F7F),
//                         shape: RoundedRectangleBorder(side:  BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//                         child: SizedBox(
//                           height: size.height*0.06,
//                           child: Row(
//                             children: [
//                               SizedBox(width: size.width*0.03,),
//                               Text("05",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
//                               SizedBox(width: size.width*0.03,),
//                               Text("Absent",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045),)
//                             ],
//                           ),
//                         ),
//                       ),
//                       Card(
//
//                         color: themeObj.secondayColor,
//                         shape: RoundedRectangleBorder(side:  BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//                         child: SizedBox(
//                           height: size.height*0.06,
//                           child: Row(
//                             children: [
//                               SizedBox(width: size.width*0.03,),
//                               Text("05",style: GoogleFonts.openSans(fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
//                               SizedBox(width: size.width*0.03,),
//                               Text("Late in",style: GoogleFonts.openSans(fontSize:size.width*0.045),)
//                             ],
//                           ),
//                         ),
//                       ),
//                       Card(
//
//                         color:themeObj.secondayColor,
//                         shape: RoundedRectangleBorder(side:  BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//                         child: SizedBox(
//                           height: size.height*0.06,
//                           child: Row(
//                             children: [
//                               SizedBox(width: size.width*0.03,),
//                               Text("08",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.05,fontWeight:FontWeight.w600),),
//                               SizedBox(width: size.width*0.03,),
//                               Text("Leaves",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045),)
//                             ],
//                           ),
//                         ),
//                       ),
//                     ],
//                   ),
//                 ),
//               ),
//               SizedBox(height: size.height*0.02,),
//             ],
//           ),
//         ),
//       )
//     );
//   }
// }
