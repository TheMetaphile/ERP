// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
//
// class studentTerm1Result extends StatefulWidget {
//   const studentTerm1Result({super.key});
//
//   @override
//   State<studentTerm1Result> createState() => _studentTerm1ResultState();
// }
//
// class _studentTerm1ResultState extends State<studentTerm1Result> {
//   final List<List> _userData = [
//       ['Roll Number  ','25'],
//       ['Date of Birth','25-May-2003'],
//       ['Blood Group  ' , 'A+'],
//       ['Contact No   ','73021042XX'],
//       ['Class        ','2nd'],
//       ['Fathers Name ','Mr. Kapil'],
//       ['Mothers Name ','Mrs. Mukul',]
//   ];
//
//
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//
//       body: Stack(
//         children: [
//           Positioned(
//             top: -130,
//             child: Container(
//               height: size.height*0.5,
//               width: size.width*1,
//               color: Color(0xFF5A77BC),
//               child:Row(
//                 children: [
//                   Padding(
//                     padding: const EdgeInsets.only(left: 25.0),
//                     child: Icon(Icons.arrow_back_ios,color: Colors.white,),
//                   ),
//                   SizedBox(width: size.width*0.05),
//                   Text("Term 1",style: TextStyle(color: Colors.white,fontSize: size.height*0.035),)
//                 ],
//               ),
//
//               // child: ,
//             ),
//           ),
//           Positioned(
//             top: 150,
//             child: Container(
//               width: size.width*1,
//               height: size.height*0.8,
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
//               child: SingleChildScrollView(
//                 scrollDirection: Axis.vertical,
//                 child: Column(
//                   children: [
//                     Row(
//                       mainAxisAlignment: MainAxisAlignment.center,
//                       children: [
//                         Image.asset("assets/Images/school.png"),
//                         SizedBox(width: size.width*0.06,),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Text("Metaphile Public School",style: TextStyle(fontSize:size.height*0.02,fontWeight:FontWeight.bold,color: Color(0xFF5A77BC),),),
//                             Text("O-Pocket Ganga Nagar",style: TextStyle(fontSize:size.height*0.015,color: Colors.black),),
//                             Text("Metaphile Public School",style: TextStyle(fontSize:size.height*0.015,color: Colors.black),),
//
//                           ],
//                         )
//                       ],
//                     ),
//                     Column(
//                       children: [
//                         Divider(color: Color(0xFF5C79BC),indent: 25,endIndent: 25,thickness: 2,),
//                         Text("PERFORMANCE PROFILE",style: TextStyle(fontSize:size.height*0.02,color: Color(0xFF032E66),),),
//                         Divider(color: Color(0xFF5C79BC),indent: 25,endIndent: 25,thickness: 2,),
//
//                       ],
//                     ),
//                     SizedBox(height: size.height*0.02,),
//                     Padding(
//                       padding: const EdgeInsets.only(left: 20.0),
//                       child: Column(
//                         children: [
//                           Row(
//                             mainAxisAlignment: MainAxisAlignment.start,
//                             children: [
//                               Image.asset("assets/Images/Test Account.png"),
//                               SizedBox(width: size.width*0.05,),
//                               Column(
//
//                                 crossAxisAlignment: CrossAxisAlignment.start,
//                                 children: [
//                                   Text("Mehika Tegwal",style: TextStyle(fontSize:size.height*0.03,color: Colors.black),),
//                                   Text("Class 2'A'",style: TextStyle(fontSize:size.height*0.02,color: Colors.grey),),
//
//
//                                 ],
//                               ),
//
//                             ],
//                           ),
//                           ListView.builder(
//                             itemCount: _userData.length,
//                               shrinkWrap: true,
//                               physics:NeverScrollableScrollPhysics(),
//                               itemBuilder: ((context, index) {
//                                 List user = _userData[index];
//
//                                 return Column(
//                                   children: [
//                                     Row(
//                                       children: [
//                                         Container(
//                                             width:size.width*0.4,
//                                             child: Text(user[0],textAlign: TextAlign.start,style: TextStyle(fontSize:size.height*0.025,color: Colors.black),)),
//                                         SizedBox(width: size.width*0.2,),
//                                         Container(
//                                             width:size.width*0.28,
//                                             child: Text(user[1],textAlign: TextAlign.start,style: TextStyle(fontSize:size.height*0.02,color: Colors.grey),)),
//
//                                       ],
//                                     ),
//                                     Divider(color: Colors.grey[300],endIndent: 24,thickness: 2,),
//
//                                   ],
//                                 );
//
//                               })),
//
//
//
//                         ],
//                       ),
//                     ),
//                     SizedBox(height: size.height*0.02,),
//                     Column(
//                       children: [
//                         Divider(color: Color(0xFF5C79BC),indent: 25,endIndent: 25,thickness: 2,),
//                         Text("ATTENDANCE",style: TextStyle(fontSize:size.height*0.02,color: Color(0xFF032E66),),),
//                         Divider(color: Color(0xFF5C79BC),indent: 25,endIndent: 25,thickness: 2,),
//
//                       ],
//                     ),
//                     term1()
//
//                   ],
//                 ),
//               ),
//
//             ),
//           ),
//
//         ],
//       ),
//     );
//   }
// }
// class term1 extends StatelessWidget{
//   final List<Map<String,dynamic>> scoreCard = [
//     {'subject':'English','total No':'100','out of':'74 - B'},
//     {'subject':'Hindi','total No':'100','out of':'74 - B'},
//     {'subject':'Science','total No':'100','out of':'74 - B'},
//     {'subject':'Math','total No':'100','out of':'74 - B'},
//     {'subject':'Social Study','total No':'100','out of':'74 - B'},
//     {'subject':'Drawing','total No':'100','out of':'74 - B'},
//     {'subject':'Computer','total No':'100','out of':'74 - B'}
//
//   ];
//
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Padding(
//       padding: const EdgeInsets.only(left: 20.0,right: 0.0),
//       child: Column(
//         crossAxisAlignment: CrossAxisAlignment.center,
//         children: [
//           Row(
//             children: [
//               Text("Term 1",textAlign: TextAlign.start,style: TextStyle(color: Colors.black,fontSize: size.height*0.03),),
//             ],
//           ),
//             SizedBox(height: size.height*0.02,),
//             Container(
//             height: size.height*0.1,
//             width: size.width*0.9,
//             decoration: BoxDecoration(
//             color: Color(0xFFD4FFEA),
//             borderRadius: BorderRadius.circular(21),
//             ),
//               child: Column(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: [
//                  Text("235/ 249 Days",style: TextStyle(color: Colors.green,fontSize: size.height*0.03),),
//                   Text("Total attendance of the student",style: TextStyle(color: Colors.green,fontSize: size.height*0.025,fontWeight: FontWeight.w300),),
//
//                 ],
//               ),
//             ),
//           SizedBox(height: size.height*0.02,),
//           Column(
//             children: [
//               Divider(color: Color(0xFF5C79BC),endIndent: 25,thickness: 2,),
//               Text("ACADEMIC PERFORMANCE",style: TextStyle(fontSize:size.height*0.02,color: Color(0xFF032E66),),),
//               Divider(color: Color(0xFF5C79BC),endIndent: 25,thickness: 2,),
//
//             ],
//           ),
//           Row(
//             children: [
//               Text("Term 1",textAlign: TextAlign.start,style: TextStyle(color: Colors.black,fontSize: size.height*0.03),),
//             ],
//           ),
//           Container(
//             height: size.height*0.06,
//             width: size.width*0.9,
//             decoration: BoxDecoration(
//              border: Border.all(color: Colors.grey,width: 1),
//               borderRadius: BorderRadius.circular(16),
//             ),
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Container(
//                     height: size.height*0.06,
//                     width: size.width*0.25,
//                     child: Center(child: Text("Subjects",style: TextStyle(color: Colors.black,fontWeight:FontWeight.w500,fontSize: size.height*0.02),))),
//                 Row(
//                   children: [
//                     Container(
//                         height: size.height*0.06,
//                         width: size.width*0.25,
//                         color:Color(0xFFE8EFFD),
//                         child: Center(child: Text("Total No",textAlign:TextAlign.center,style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight:FontWeight.w500),))),
//                     Container(
//                         height: size.height*0.06,
//                         width: size.width*0.25,
//                         color: Color(0xFF80C066),
//                         child: Center(child: Text("Out of",textAlign:TextAlign.center,style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight:FontWeight.w500),))),
//                   ],
//                 )
//
//               ],
//             ),
//           ),
//           SizedBox(height: size.height*0.02,),
//           Container(
//
//           width: size.width*0.9,
//           decoration: BoxDecoration(
//             color: Colors.black,
//           border: Border.all(color: Colors.grey,width: 1),
//           borderRadius: BorderRadius.circular(8),
//           ),
//             child: ListView.builder(
//               itemCount: scoreCard.length,
//               physics:NeverScrollableScrollPhysics(),
//               shrinkWrap: true,
//               itemBuilder: (context, index) {
//               final studentScore=scoreCard[index];
//               return Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Container(
//                       height: size.height*0.06,
//                       width: size.width*0.3,
//                       color: Colors.white,
//                       child: Padding(
//                         padding: const EdgeInsets.only(left:  8.0),
//                         child: Text(studentScore['subject'],textAlign: TextAlign.start,style: TextStyle(color: Colors.black,fontWeight:FontWeight.w500,fontSize: size.height*0.02),),
//                       )),
//                   Row(
//                     children: [
//                       Container(
//                           height: size.height*0.06,
//                           width: size.width*0.25,
//                           color:Color(0xFFE8EFFD),
//                           child: Center(child: Text(studentScore['total No'],textAlign:TextAlign.center,style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight:FontWeight.w500),))),
//                       Container(
//                           height: size.height*0.06,
//                           width: size.width*0.25,
//                           color: Color(0xFF80C066),
//                           child: Center(child: Text(studentScore["out of"],textAlign:TextAlign.center,style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight:FontWeight.w500),))),
//                     ],
//                   )
//
//                 ],
//               );
//             },),
//           ),
//           Container(
//             height: size.height*0.06,
//             width: size.width*0.9,
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Container(
//                     height: size.height*0.06,
//                     width: size.width*0.25,
//                 ),
//                 Row(
//                   children: [
//                     Container(
//                         height: size.height*0.06,
//                         width: size.width*0.25,
//                         child: Center(child: Text("GPA",textAlign:TextAlign.center,style: TextStyle(color: Colors.greenAccent,fontSize: size.height*0.03,fontWeight:FontWeight.w500),))),
//                     Container(
//                         height: size.height*0.06,
//                         width: size.width*0.25,
//                         child: Center(child: Text("8.24",textAlign:TextAlign.center,style: TextStyle(color: Colors.greenAccent,fontSize: size.height*0.03,fontWeight:FontWeight.w500),))),
//                   ],
//                 )
//
//               ],
//             ),
//           ),
//           SizedBox(height: size.height*0.02,),
//           Row(
//             children: [
//               Text("Remarked by Teacher",textAlign: TextAlign.start,style: TextStyle(color: Colors.black,fontSize: size.height*0.03),),
//             ],
//           ),
//           SizedBox(height: size.height*0.01,),
//           Container(
//             height: size.height*0.3,
//             width: size.width*0.9,
//
//             decoration: BoxDecoration(
//               color: Color(0xFFD4FFD6),
//               borderRadius: BorderRadius.circular(16),
//             ),
//             child: Padding(
//               padding: const EdgeInsets.all(8.0),
//               child: Text("Thanks for the fantastic yearsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",style: TextStyle(color: Color(0xFF1FE23E)),),
//             ),
//
//           ),
//           SizedBox(height: size.height*0.025,),
//           Row(
//             children: [
//               Padding(
//                 padding:  EdgeInsets.only(left: 30.0),
//                 child: Text("-  Abhishek Kumar",textAlign: TextAlign.start,style: TextStyle(color: Colors.black,fontSize: size.height*0.03),),
//               ),
//             ],
//           ),
//           SizedBox(height: size.height*0.01,),
//           Row(
//             children: [
//               Padding(
//                 padding:  EdgeInsets.only(left: 40.0),
//                 child: Text("Principle",textAlign: TextAlign.start,style: TextStyle(color: Colors.black,fontSize: size.height*0.02),),
//               ),
//             ],
//           ),
//
//         ],
//       ),
//     );
//
//   }
//
// }
