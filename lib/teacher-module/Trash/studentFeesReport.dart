// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
//
// class StudentFeesStatus extends StatefulWidget {
//
//   @override
//   State<StudentFeesStatus> createState() => _StudentFeesStatusState();
// }
//
// class _StudentFeesStatusState extends State<StudentFeesStatus> {
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       // backgroundColor: Color(0xFF5A77BC),
//       appBar: AppBar(
//         iconTheme: IconThemeData(color: Colors.white),
//         backgroundColor: Colors.transparent,
//         title: Text("Fees Report",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.height*0.04),),
//       ),
//       body: Stack(
//         children: [
//           Positioned(
//           top: size.height*0.05,
//             child: Card(
//               margin: EdgeInsets.all(0),
//               child: Container(
//                 width: size.width*1,
//                 height: size.height*0.9,
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
//
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
