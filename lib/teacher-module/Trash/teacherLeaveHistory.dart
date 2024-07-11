// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
// import 'package:untitled/utils/theme.dart';
//
// import '../../utils/utils.dart';
//
// class teacherLeaveHistory extends StatefulWidget {
//   const teacherLeaveHistory({super.key});
//
//   @override
//   State<teacherLeaveHistory> createState() => _teacherLeaveHistoryState();
// }
//
// class _teacherLeaveHistoryState extends State<teacherLeaveHistory> {
//   Color _getColor(String value) {
//     if (value =="leaveBalance") {
//       return  Color.fromRGBO(125,197,245,1);
//     } else if (value =="casualLeave") {
//       return   Color.fromRGBO(33,150,243,1);
//     } else if (value =="medicalLeave") {
//       return  Color.fromRGBO(250,112,250,1);
//     }else if (value =="annualLeave") {
//       return Color.fromRGBO(255,178,89,1);
//     }else if (value =="unpaidLeave") {
//       return  Color.fromRGBO(145,0,236,1);
//     }
//     else {
//       return Colors.green;
//     }
//   }
//   CustomTheme themeObj=CustomTheme();
//
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
//           icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
//         ),
//         backgroundColor:themeObj.primayColor,
//         title: Text("Leave History",style: TextStyle(color:themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
//       ),
//       body:     Column(
//         children: [
//           SizedBox(height: size.height*0.01,),
//          SingleChildScrollView(
//            scrollDirection: Axis.horizontal,
//            child: Row(
//              children: [
//                Container(
//                margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top:size.width*0.02),
//                  child: Column(
//                   children: [
//                    Stack(
//                     alignment: Alignment.center,
//                     children: [
//                       SizedBox(
//                         width: size.width*0.2,
//
//                         height: size.width*0.2,
//                         child: const CircularProgressIndicator(
//                             value: 0.5,
//                             strokeWidth: 5,
//                             backgroundColor: Color(0xFFCFCDCD),
//                           valueColor: AlwaysStoppedAnimation<Color>(
//                             Color.fromRGBO(125,197,245,1)
//                           ),
//
//                         ),
//                       ),
//                       Text(
//                         '02', // Your text here
//                         style: TextStyle(
//                             color: themeObj.textBlack,
//                             fontSize: size.width*0.035,
//                             fontWeight: FontWeight.w400// Adjust font size as needed
//                         ),
//                       ),
//                     ],
//                   ),
//                    SizedBox(height: size.height*0.01,),
//                    Text("Leave Balance",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
//                 ],
//               ),
//             ),
//                Container(
//                margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,),
//                  child: Column(
//                   children: [
//                    Stack(
//                     alignment: Alignment.center,
//                     children: [
//                       SizedBox(
//                         width: size.width*0.2,
//
//                         height: size.width*0.2,
//                         child: const CircularProgressIndicator(
//                             value: 0.5,
//                             strokeWidth: 5,
//                             backgroundColor: Color(0xFFCFCDCD),
//                           valueColor: AlwaysStoppedAnimation<Color>(
//                             Color.fromRGBO(33,150,243,1),
//                           ),
//
//                         ),
//                       ),
//                       Text(
//                         '02', // Your text here
//                         style: TextStyle(
//                             color: themeObj.textBlack,
//                             fontSize: size.width*0.035,
//                             fontWeight: FontWeight.w400// Adjust font size as needed
//                         ),
//                       ),
//                     ],
//                   ),
//                    SizedBox(height: size.height*0.01,),
//                    Text("Casual Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
//                 ],
//               ),
//             ),
//                Container(
//                margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,),
//                  child: Column(
//                   children: [
//                    Stack(
//                     alignment: Alignment.center,
//                     children: [
//                       SizedBox(
//                         width: size.width*0.2,
//
//                         height: size.width*0.2,
//                         child: const CircularProgressIndicator(
//                             value: 0.5,
//                             strokeWidth: 5,
//                             backgroundColor: Color(0xFFCFCDCD),
//                           valueColor: AlwaysStoppedAnimation<Color>(
//                             Color.fromRGBO(250,112,250,1)
//                           ),
//
//                         ),
//                       ),
//                       Text(
//                         '02', // Your text here
//                         style: TextStyle(
//                             color: themeObj.textBlack,
//                             fontSize: size.width*0.035,
//                             fontWeight: FontWeight.w400// Adjust font size as needed
//                         ),
//                       ),
//                     ],
//                   ),
//                    SizedBox(height: size.height*0.01,),
//                    Text("Medical Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
//                 ],
//               ),
//             ),
//                Container(
//                margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,),
//                  child: Column(
//                   children: [
//                    Stack(
//                     alignment: Alignment.center,
//                     children: [
//                       SizedBox(
//                         width: size.width*0.2,
//
//                         height: size.width*0.2,
//                         child: const CircularProgressIndicator(
//                             value: 0.5,
//                             strokeWidth: 5,
//                             backgroundColor: Color(0xFFCFCDCD),
//                           valueColor: AlwaysStoppedAnimation<Color>(
//                             Color.fromRGBO(255,178,89,1)
//                           ),
//
//                         ),
//                       ),
//                       Text(
//                         '02', // Your text here
//                         style: TextStyle(
//                             color: themeObj.textBlack,
//                             fontSize: size.width*0.035,
//                             fontWeight: FontWeight.w400// Adjust font size as needed
//                         ),
//                       ),
//                     ],
//                   ),
//                    SizedBox(height: size.height*0.01,),
//                    Text("Annual Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
//                 ],
//               ),
//             ),
//                Container(
//                margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,),
//                  child: Column(
//                   children: [
//                    Stack(
//                     alignment: Alignment.center,
//                     children: [
//                       SizedBox(
//                         width: size.width*0.2,
//
//                         height: size.width*0.2,
//                         child: const CircularProgressIndicator(
//                             value: 0.5,
//                             strokeWidth: 5,
//                             backgroundColor: Color(0xFFCFCDCD),
//                           valueColor: AlwaysStoppedAnimation<Color>(
//                             Color.fromRGBO(145,0,236,1)
//                           ),
//
//                         ),
//                       ),
//                       Text(
//                         '02', // Your text here
//                         style: TextStyle(
//                             color: themeObj.textBlack,
//                             fontSize: size.width*0.035,
//                             fontWeight: FontWeight.w400// Adjust font size as needed
//                         ),
//                       ),
//                     ],
//                   ),
//                    SizedBox(height: size.height*0.01,),
//                    Text("Unpaid Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
//                 ],
//               ),
//             ),
//              ],
//            ),
//          ),
//           SizedBox(height: size.height*0.02,),
//           SizedBox(
//             height: size.height*0.72,
//             child: ListView.builder(
//                 shrinkWrap: true,
//                 itemCount: 8,
//                 itemBuilder: (context,index){
//                   return Column(
//                     children: [
//                       Card(
//                         elevation: 5,
//                         shape: RoundedRectangleBorder(side: BorderSide(color:themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
//
//                         child: Container(
//                           child: Padding(
//                             padding: EdgeInsets.only(left: size.height*0.01,right: size.height*0.01),
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 SizedBox(height: size.height*0.01,),
//                                 Row(
//                                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                                   children: [
//                                     Column(
//                                       crossAxisAlignment: CrossAxisAlignment.start,
//                                       children: [
//                                         Text("Apr 02 2024-Apr 04 2024",style: TextStyle(fontSize:size.width*0.035,color: themeObj.textBlack,fontWeight: FontWeight.bold),),
//                                         Text("Annual Leaves",style: TextStyle(color: _getColor("annualLeaves"),fontSize: size.width*0.03),),
//
//                                       ],
//                                     ),
//                                     Column(
//                                       children: [
//                                         Card(
//                                           color: Colors.orange[100],
//                                           child: Container(
//                                               width: size.width*0.2,
//                                               child: Text("Pending",textAlign: TextAlign.center,style: TextStyle(fontSize:size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),)),
//                                         ),
//                                         Row(
//                                           children: [
//                                             SizedBox(
//                                               height:size.height*0.04,
//                                               width: size.width*0.13,
//                                               child: TextButton(
//
//                                                   style:TextButton.styleFrom(backgroundColor: Color.fromRGBO(96,165,250,1)),
//                                                   onPressed: (){},
//                                                   child: Center(child: Icon(Icons.edit,size: size.width*0.05,color: themeObj.textWhite,))),
//                                             ),
//                                             SizedBox(width: size.width*0.01,),
//                                             SizedBox(width: size.width*0.01,),
//                                             SizedBox(
//                                               height:size.height*0.04,
//                                               width: size.width*0.13,
//                                               child: Center(
//                                                 child: TextButton(
//
//                                                     style:TextButton.styleFrom(backgroundColor: Color.fromRGBO(248,113,113,1)),
//                                                     onPressed: (){}, child: Icon(CupertinoIcons.delete,size: size.width*0.05,color: themeObj.textWhite,)),
//                                               ),
//                                             ),
//                                           ],
//                                         )
//
//                                       ],
//                                     )
//                                   ],
//                                 ),
//                                 SizedBox(height: size.height*0.01,),
//                                 Text("I am feeling unwell and belive it's best to take a day off to rest and recove.",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.03),),
//
//
//                               ],
//                             ),
//                           ),
//
//                         ),
//                       ),
//                       SizedBox(height: size.height*0.015,),
//                     ],
//                   );
//
//                 }),
//           ),
//         ],
//       ),
//     );
//   }
// }
