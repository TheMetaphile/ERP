// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:syncfusion_flutter_datepicker/datepicker.dart';
//
// class applyForLeave extends StatefulWidget {
//   const applyForLeave({super.key});
//
//   @override
//   State<applyForLeave> createState() => _applyForLeaveState();
// }
//
// class _applyForLeaveState extends State<applyForLeave> {
//   DateTimeRange? selectedDateRange;
//
//   Future<void> _selectDateRange(BuildContext context) async {
//     final DateTimeRange? pickedDateRange = await showDateRangePicker(
//       context: context,
//       initialDateRange: selectedDateRange ?? DateTimeRange(
//         start: DateTime.now(),
//         end: DateTime.now().add(Duration(days: 7)),
//       ),
//       firstDate: DateTime(2020),
//       lastDate: DateTime(2025),
//     );
//
//     if (pickedDateRange != null && pickedDateRange != selectedDateRange) {
//       setState(() {
//         selectedDateRange = pickedDateRange;
//       });
//     }
//   }
//
//   final _reason = TextEditingController();
//   @override
//   Widget build(BuildContext context) {
//
//
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: Color(0xFF5A77BC),
//       appBar: AppBar(
//         iconTheme: IconThemeData(color: Colors.white),
//         backgroundColor: Colors.transparent,
//         title: Text("Leave Request",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.height*0.04),),
//       ),
//       body: Stack(
//         children: [
//           Positioned(
//             top: size.height*0.05,
//             child: Container(
//               width: size.width*1,
//               height: size.height*0.9,
//               decoration: BoxDecoration(
//                   color: Colors.white,
//                   border: Border.all(color: Colors.white,width: 2),
//                   borderRadius: BorderRadius.circular(21),
//                   boxShadow: [
//                     BoxShadow(
//                       color: Colors.black.withOpacity(0.35),
//                       spreadRadius: 3,
//                       blurRadius: 8,
//                       offset: Offset(0, -8), // Adjust the vertical offset as needed
//                     ),
//                   ]
//               ),
//               child:   Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   SizedBox(height: size.height*0.02,),
//                  Center(child: Text("Apply For Leave",textAlign: TextAlign.center,style: TextStyle(fontSize: size.height*0.02,),)),
//                   SizedBox(height: size.height*0.01,),
//                   Divider(color: Colors.grey,indent: 7,endIndent: 14),
//                   SizedBox(height: size.height*0.03,),
//                   Padding(
//                     padding: const EdgeInsets.only(left: 8.0),
//                     child: Row(
//                       children: [
//                         Text("Choose Date",textAlign: TextAlign.center,style: TextStyle(fontSize: size.height*0.018,color: Colors.grey,),),
//                         SizedBox(width: size.width*0.02,),
//                         Icon(Icons.calendar_month,color: Colors.grey,)
//                       ],
//                     ),
//                   ),
//                   SizedBox(height: size.height*0.01,),
//                   Center(
//                     child: Container(
//                       width: size.width*0.95,
//                       height: size.height*0.07,
//                       decoration: BoxDecoration(
//                         color: Colors.white,
//                         border: Border.all(color: Colors.grey,width: 1),
//                         borderRadius: BorderRadius.circular(12),
//                         boxShadow: [
//                           BoxShadow(
//                             color: Colors.grey.withOpacity(1),
//                             spreadRadius: 0,
//                             blurRadius: 5,
//                             offset: Offset(0, 6), // Adjust the vertical offset as needed
//                           ),
//                         ],
//                       ),
//                       child: Center(
//                         child: ListTile(
//                           onTap: () {
//                             _selectDateRange(context);
//                             print(_selectDateRange);
//                           },
//                           leading:selectedDateRange == null
//                               ? Text('Not Selected',style: TextStyle(fontSize: size.height*0.02,color: Colors.black),)
//                               : Text('${selectedDateRange!.start.toString().split(' ')[0]} - ${selectedDateRange!.end.toString().split(' ')[0]}',style: TextStyle(fontSize: size.height*0.02,color: Colors.black),),
//
//                           trailing: Text("2 Days",style: TextStyle(fontSize: size.height*0.02,color: Colors.black),),
//                         ),
//                       ),
//                     ),
//                   ),
//                   SizedBox(height: size.height*0.03,),
//                   Padding(
//                     padding: const EdgeInsets.only(left: 8.0),
//                     child: Text("Choose Leave Type",textAlign: TextAlign.center,style: TextStyle(fontSize: size.height*0.018,color: Colors.grey,),),
//                   ),
//                   SizedBox(height: size.height*0.01,),
//                   Center(
//                     child: Container(
//                       width: size.width*0.95,
//                       height: size.height*0.07,
//                       decoration: BoxDecoration(
//                         color: Colors.white,
//                         border: Border.all(color: Colors.grey,width: 1),
//                         borderRadius: BorderRadius.circular(12),
//                         boxShadow: [
//                           BoxShadow(
//                             color: Colors.grey.withOpacity(1),
//                             spreadRadius: 0,
//                             blurRadius: 5,
//                             offset: Offset(0, 6), // Adjust the vertical offset as needed
//                           ),
//                         ],
//                       ),
//                       child: Center(
//                         child: ListTile(
//                           onTap: (){},
//                           leading: Text("Casual Leave"),
//                           ),
//                       ),
//                     ),
//                   ),
//                   SizedBox(height: size.height*0.03,),
//                   Padding(
//                     padding: const EdgeInsets.only(left: 8.0),
//                     child: Text("Reason",textAlign: TextAlign.center,style: TextStyle(fontSize: size.height*0.018,color: Colors.grey,),),
//                   ),
//                   SizedBox(height: size.height*0.01,),
//                   Center(
//                     child: Container(
//                       width: size.width*0.95,
//                       height: size.height*0.2,
//                       decoration: BoxDecoration(
//                         color: Colors.white,
//                         border: Border.all(color: Colors.grey,width: 1),
//                         borderRadius: BorderRadius.circular(8),
//                         boxShadow: [
//                           BoxShadow(
//                             color: Colors.grey.withOpacity(1),
//                             spreadRadius: 0,
//                             blurRadius: 5,
//                             offset: Offset(0, 6), // Adjust the vertical offset as needed
//                           ),
//                         ],
//                       ),
//                       child: TextField(
//                         maxLines: 8,
//                         decoration: InputDecoration(
//                           border: InputBorder.none,
//                         ),
//                         controller: _reason,
//                                             ),
//                   ),),
//                   SizedBox(height: size.height*0.05,),
//                   Center(
//                     child: Container(
//                       height: size.height*0.06,
//                       width: size.width*0.9,
//                       decoration: BoxDecoration(
//                         color: Color(0xFF5A77BC),
//                         borderRadius: BorderRadius.circular(8),
//                         boxShadow: [
//                           BoxShadow(
//                             color: Colors.grey.withOpacity(1),
//                             spreadRadius: 0,
//                             blurRadius: 5,
//                             offset: Offset(0, 6), // Adjust the vertical offset as needed
//                           ),
//                         ],
//                       ),
//                       child: TextButton(
//                         style: TextButton.styleFrom(shape: RoundedRectangleBorder()),
//                         onPressed: (){},
//                         child: Text("Submit For Approval",style: TextStyle(fontSize: size.height*0.022,
//                           color: Colors.white,),),
//                       ),
//                     ),
//                   ),
//
//
//                 ],
//               ),
//             ),
//           ),
//
//         ],
//       ),
//     );
//   }
// }
