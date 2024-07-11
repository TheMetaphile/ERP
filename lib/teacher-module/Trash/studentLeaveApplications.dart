// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'package:untitled/teacher-module/studentLeaveApplicationView.dart';
//
// import '../utils/theme.dart';
//
//
// class studentLeaveApplications extends StatefulWidget {
//   const studentLeaveApplications({super.key});
//
//   @override
//   State<studentLeaveApplications> createState() => _studentLeaveApplicationsState();
// }
//
// class _studentLeaveApplicationsState extends State<studentLeaveApplications> {
//   CustomTheme themeObj=CustomTheme();
//   bool newLeave = true;
//   bool approvedLeave = false;
//   bool rejectedLeave = false;
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       appBar: AppBar(
//         backgroundColor: themeObj.primayColor,
//         title: Text("Students Leave",style: TextStyle(color:  themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
//         leading: IconButton(
//           onPressed: (){
//             Navigator.pop(context);
//           },
//           icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack),
//         ),
//       ),
//       body: SizedBox(
//         width: size.width*1,
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             SizedBox(height: size.height*0.01,),
//             Row(
//               children: [
//                 TextButton(
//                   onPressed: () {
//                     setState(() {
//                       newLeave = true;
//                       approvedLeave = false;
//                       rejectedLeave = false;
//                     });
//                   },
//                   style: TextButton.styleFrom(
//                     backgroundColor: newLeave ? themeObj.primayColor :  Color.fromRGBO(209,213,219,1),
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(8),
//                     ),
//                   ),
//                   child: Text(
//                     "New Leave",
//                     style: TextStyle(
//                       color: themeObj.textBlack,
//                       fontWeight: FontWeight.w400,
//                       fontSize: size.width * 0.035,
//                     ),
//                   ),
//                 ),
//                 SizedBox(width: size.height*0.02,),
//                 TextButton(
//                   onPressed: () {
//                     setState(() {
//                       newLeave = false;
//                       approvedLeave = true;
//                       rejectedLeave = false;
//                     });
//                   },
//                   style: TextButton.styleFrom(
//                     backgroundColor: approvedLeave ? themeObj.primayColor : Color.fromRGBO(209,213,219,1),
//                     shape: RoundedRectangleBorder(
//
//                       borderRadius: BorderRadius.circular(8),
//                     ),
//                   ),
//                   child: Text(
//                     "Approved Leaves",
//                     style: TextStyle(
//                       color: Colors.black,
//                       fontWeight: FontWeight.w400,
//                       fontSize: size.width * 0.035,
//                     ),
//                   ),
//                 ),
//                 SizedBox(width: size.height*0.02,),
//                 TextButton(
//                   onPressed: () {
//                     setState(() {
//                       newLeave = false;
//                       approvedLeave = false;
//                       rejectedLeave = true;
//
//                     });
//                   },
//                   style: TextButton.styleFrom(
//                     backgroundColor: rejectedLeave ? themeObj.primayColor :  Color.fromRGBO(209,213,219,1),
//                     shape: RoundedRectangleBorder(
//
//                       borderRadius: BorderRadius.circular(8),
//                     ),
//                   ),
//                   child: Text(
//                     "Rejected Leave",
//                     style: TextStyle(
//                       color: themeObj.textBlack,
//                       fontWeight: FontWeight.w400,
//                       fontSize: size.width * 0.035,
//                     ),
//                   ),
//                 ),
//
//               ],
//             ),
//             Expanded(
//               child: ListView.builder(
//                 itemCount: 10,
//                 shrinkWrap: true,
//                 itemBuilder: (context, index) {
//                   return  Card(
//                     elevation: 5,
//                     child: ExpansionTile(
//                       shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
//                       title:  Text("Abhishek from class 11th A want a Leave Request to you...",style: TextStyle(fontSize: size.height*0.02),),
//                       leading:  Image.asset("assets/Images/Test Account.png",fit: BoxFit.contain,width: size.width*0.15,),
//                       subtitle: Row(
//                         mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                         children: [
//                           Container(
//                             height: size.height*0.033,
//                             width: size.width*0.25,
//                             child: ElevatedButton(
//                               style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFCBFCBA)),
//                               onPressed: (){},
//                               child: Text("Approve",maxLines: 1,style: TextStyle(color: Color(0xFF13D010),fontSize: size.width*0.035),),
//                             ),
//                           ),
//                           Container(
//                             height: size.height*0.033,
//                             width: size.width*0.25,
//                             child: ElevatedButton(
//                               style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFFFA2A2)),
//                               onPressed: (){},
//                               child: Text("Reject",style: TextStyle(color: Colors.red,fontSize: size.width*0.035),),
//                             ),
//                           ),
//
//                         ],
//                       ),
//                       children: [
//                         Card(
//                           elevation: 5,
//                           shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: themeObj.textgrey,width: 1)),
//                           child:   Padding(
//                             padding: const EdgeInsets.all(8.0),
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 Text("Reason",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textgrey,fontWeight:FontWeight.w700),),
//                                 SizedBox(height: size.height*0.01,),
//                                 Text("Dear Sir/Madam , Abhishek from class 11th A want a Leave Request to you.sdadad adsad adad ada ada dad adads ada dad ada dwd adad wda da da daw da dw dad adwd a..",style: TextStyle(fontSize: size.height*0.02),),
//                               ],
//                             ),
//                           ),
//
//                         )
//                       ],
//
//
//                     ),
//                   );
//                 },),
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }
