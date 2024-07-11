// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'package:untitled/utils/attendanceTile.dart';
//
// import '../utils/theme.dart';
//
// class TeacherAttendance extends StatefulWidget {
//   const TeacherAttendance({super.key});
//
//   @override
//   State<TeacherAttendance> createState() => _TeacherAttendanceState();
// }
//
// class _TeacherAttendanceState extends State<TeacherAttendance> {
//   final List<Map<String, dynamic>> _attendance = [
//     {'date': '11 Tue', 'check-in': '09:00am', 'check-out': '08:45pm','working-hour':'08:20m'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
//     {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
//
//   ];
//
//   DateTime selectedDate = DateTime.now();
//
//   Future<void> _selectDate(BuildContext context) async {
//     final DateTime? picked = await showDatePicker(
//         context: context,
//         initialDate: selectedDate,
//         firstDate: DateTime(2015, 8),
//         lastDate: DateTime(2101));
//     if (picked != null && picked != selectedDate) {
//       setState(() {
//         selectedDate = picked;
//       });
//     }
//   }
//    List<List<String>> listOfList = [
//      [
//        "Date","","Check In","Check Out","Status"
//      ],
//      [
//      "12","Jan","9:30am","5:30pm","Status"
//    ],
//      [
//        "12","Jan","9:30am","5:30pm","Status"
//      ],
//      [
//        "12","Jan","9:30am","5:30pm","Status"
//      ],
//      [
//        "12","Jan","9:30am","5:30pm","Status"
//      ]
//    ];
//   CustomTheme themeObj= CustomTheme();
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor:  themeObj.textWhite,
//       appBar: AppBar(
//         leading: IconButton(
//           onPressed: (){
//             Navigator.pop(context);
//           },
//           icon: Icon(Icons.arrow_back_ios,color:  themeObj.textBlack,),
//         ),
//         backgroundColor:  themeObj.primayColor,
//         title: Text("Attendance",style: TextStyle(color:  themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
//       ),
//       body: Column(
//         children: [
//           SizedBox(height: size.height*0.01,),
//           Container(
//             color: Color.fromRGBO(254,215,170,1),
//             height: size.height*0.06,
//             child:Row(
//
//               children: [
//                 SizedBox(
//                     width: size.width*0.25,
//                     child: Text("Date",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//                 SizedBox(
//                     width: size.width*0.25,
//                     child: Text("Check-IN",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//                 SizedBox(
//                     width: size.width*0.25,
//                     child: Text("Check-Out",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//                 SizedBox(
//                     width: size.width*0.25,
//                     child: Text("Working Hrs",overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//               ],
//             ),
//           ),
//           Expanded(
//             child: ListView.builder(
//               shrinkWrap: true,
//               itemCount: listOfList.length,
//               itemBuilder: (context, index) {
//                 final data=_attendance[index];
//                 return  Container(
//                   color: Color.fromRGBO(254,215,170,0.3),
//                   height: size.height*0.06,
//                   child:Row(
//
//                     children: [
//                       SizedBox(
//                         width: size.width*0.25,
//                           child: Text(data["date"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//
//                       SizedBox(
//                           width: size.width*0.25,
//                           child: Text(data["check-in"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//                       SizedBox(
//                           width: size.width*0.25,
//                           child: Text(data["check-out"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//                       SizedBox(
//                           width: size.width*0.25,
//                           child: Text(data["working-hour"],overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600))),
//                     ],
//                   ),
//                 );
//               },),
//           ),
//         ],
//       ),
//     );
//   }
// }
