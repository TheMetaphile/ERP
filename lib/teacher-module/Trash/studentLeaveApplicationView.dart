// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
//
// class studentLeaveApplicationView extends StatefulWidget {
//   const studentLeaveApplicationView({super.key});
//
//   @override
//   State<studentLeaveApplicationView> createState() => _studentLeaveApplicationViewState();
// }
//
// class _studentLeaveApplicationViewState extends State<studentLeaveApplicationView> {
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: Color(0xFF5A77BC),
//       appBar: AppBar(
//         iconTheme: IconThemeData(color: Colors.white),
//         backgroundColor: Colors.transparent,
//       ),
//       body: Stack(
//         children: [
//           Positioned(
//             top: size.height*0.05,
//             child: Card(
//               margin: EdgeInsets.all(0),
//               child: Container(
//                 width: size.width*1,
//                 decoration: BoxDecoration(
//                     color: Colors.white,
//                     border: Border.all(color: Colors.white,width: 2),
//                     borderRadius: BorderRadius.circular(21),
//                     boxShadow: [
//                       BoxShadow(
//                         color: Colors.black.withOpacity(0.35),
//                         spreadRadius: 3,
//                         blurRadius: 8,
//                         offset: Offset(0, -8), // Adjust the vertical offset as needed
//                       ),
//                     ]
//                 ),
//                 child: Center(
//                   child: Container(
//                     width: size.width*0.95,
//                     height: size.height*1,
//                     child: Column(
//                       crossAxisAlignment: CrossAxisAlignment.start,
//                       children: [
//                         Container(
//                           height: size.height*0.15,
//                           decoration: BoxDecoration(
//                             color: Colors.white,
//                             border: Border.all(color: Colors.grey,width: 2),
//                             borderRadius: BorderRadius.circular(21),
//
//                           ),
//                           child: Row(
//                             children: [
//                               SizedBox(
//                                   height: size.height*0.07,
//                                   child: Image.asset("assets/Images/Test Account.png",fit: BoxFit.fill,)),
//                               SizedBox(width: size.width*0.02,),
//                               Column(
//                                 crossAxisAlignment: CrossAxisAlignment.start,
//                                 children: [
//                                   Text("Abhishek from class 11th A want a\nLeave Request to you...",style: TextStyle(fontSize: size.height*0.02),),
//
//                                   Row(
//                                     children: [
//                                       Container(
//                                         height: size.height*0.05,
//
//                                         child: ElevatedButton(
//                                           style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFCBFCBA)),
//                                           onPressed: (){},
//                                           child: Text("Approved",style: TextStyle(color: Color(0xFF13D010),fontSize: size.height*0.02),),
//                                         ),
//                                       ),
//                                       SizedBox(width: size.width*0.02,),
//                                       Container(
//                                         height: size.height*0.05,
//                                         child: ElevatedButton(
//                                           style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFFFA2A2)),
//                                           onPressed: (){},
//                                           child: Text("Rejected",style: TextStyle(color: Colors.red,fontSize: size.height*0.02),),
//                                         ),
//                                       ),
//                                       SizedBox(width: size.width*0.02,),
//                                       Container(
//                                           width: size.width*0.1,
//                                           child: IconButton(onPressed: (){
//                                             Navigator.push(context, MaterialPageRoute(builder: (context) => studentLeaveApplicationView(),));
//                                           }, icon: Icon(Icons.arrow_forward_ios_outlined, )))
//                                     ],
//                                   )
//                                 ],
//                               ),
//                             ],
//                           ),
//                         )
//                       ],
//                     ),
//                   ),
//                 ),
//
//               ),
//             ),
//           ),
//
//         ],
//       ),
//     );
//   }
// }
