// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'package:untitled/teacher-module/teacherAttendance.dart';
//
// import '../../admin-module/TeacherPannel/teacherAttendance.dart';
// import '../../utils/theme.dart';
// import '../../utils/utils.dart';
//
// class teacherAttendanceCheckOut extends StatefulWidget {
//   const teacherAttendanceCheckOut({super.key});
//
//   @override
//   State<teacherAttendanceCheckOut> createState() => _teacherAttendanceCheckOutState();
// }
//
// class _teacherAttendanceCheckOutState extends State<teacherAttendanceCheckOut> {
//   final List<Map<String, dynamic>> _attendance = [
//     {'date': '11 Tue', 'check-in': '09:00am', 'check-out': '08:45pm','working-hour':'08:20m'},
//     {'date': '12 Wed', 'check-in': '09:15am','check-out':'08:45pm','working-hour':'08:10m'},
//     {'date': '13 Thru', 'check-in': '09:30am','check-out':'08:45pm','working-hour':'08:20m'},
//     {'date': '14 Fri', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
//     {'date': '15 Sat', 'check-in': '09:10am','check-out':'08:45pm','working-hour':'08:15m'},
//     {'date': '16 Mon', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:10m'},
//
//   ];
//   CustomTheme themeObj=CustomTheme();
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       appBar: AppBar(
//         leading: IconButton(
//           onPressed: (){
//             Navigator.pop(context);
//           },
//           icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
//         ),
//         backgroundColor: themeObj.primayColor,
//         title: Text("Check Out",style: TextStyle(color:  themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
//       ),
//       body: SingleChildScrollView(
//         child: Padding(
//        padding:EdgeInsets.symmetric(horizontal: 1),
//           child: Column(
//             children: [
//               SizedBox(height: size.height*0.01,),
//               Card(
//                 margin: const EdgeInsets.all(0),
//                 shape: RoundedRectangleBorder(side: BorderSide(color:  themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//
//                 child: Column(
//                   crossAxisAlignment: CrossAxisAlignment.center,
//                   children: [
//                     SizedBox(height: size.height*0.01,),
//                     Text("The End of the Day !",style: TextStyle(color:  themeObj.textBlack,fontSize: size.width*0.05),),
//                     SizedBox(
//                         height: size.height*0.14,
//                         child: Image.asset("assets/Images/Potted Plant.png",fit: BoxFit.cover,)),
//                     Text("08:45:00",style: TextStyle(fontSize: size.width*0.065,fontWeight: FontWeight.w600),),
//                     Text("March 12 2024 - Friday",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.035),),
//                     SizedBox(height: size.height*0.005,),
//                     Divider(color:  themeObj.textgrey,indent: 25,endIndent: 20),
//                     SizedBox(height: size.height*0.008,),
//                     Row(
//                       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                       children: [
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.center,
//                           children: [
//                             Image.asset("assets/Images/Group 1.png",height: size.height*0.025),
//                             Text("08:10 AM",style: TextStyle(color:  themeObj.textBlack,fontWeight: FontWeight.bold),),
//                             Text("Check In",style: TextStyle(color: themeObj.textgrey),),
//
//                           ],
//                         ),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.center,
//                           children: [
//                             Image.asset("assets/Images/Group 2.png",height: size.height*0.025),
//                             Text("08:10 PM",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.bold),),
//                             Text("Check out",style: TextStyle(color: themeObj.textgrey),),
//
//                           ],
//                         ),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.center,
//                           children: [
//                             Image.asset("assets/Images/Group 3.png",height: size.height*0.025),
//                             Text("___",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.bold),),
//                             Text("Total hours",style: TextStyle(color:themeObj.textgrey),),
//
//                           ],
//                         )
//                       ],
//                     ),
//                     SizedBox(height: size.height*0.02,),
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
