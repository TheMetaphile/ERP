// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
//
// class studentNoteBookRecord extends StatefulWidget {
//   const studentNoteBookRecord({super.key});
//
//   @override
//   State<studentNoteBookRecord> createState() => _studentNoteBookRecordState();
// }
//
// class _studentNoteBookRecordState extends State<studentNoteBookRecord> {
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: Color(0xFF5A77BC),
//       appBar: AppBar(
//         iconTheme: IconThemeData(color: Colors.white),
//         backgroundColor: Colors.transparent,
//         title: Text("Note Book Record",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.height*0.04),),
//       ),
//       body: Stack(
//         children: [
//           Positioned(
//             top: size.height*0.05,
//             child: Card(
//               elevation: 5,
//               margin: EdgeInsets.all(0),
//               shape: RoundedRectangleBorder(
//                 borderRadius: BorderRadius.only(topLeft: Radius.circular(25), topRight: Radius.circular(25)),
//               ),
//               child: Container(
//                 width: size.width*1,
//                 height: size.height*0.9,
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
