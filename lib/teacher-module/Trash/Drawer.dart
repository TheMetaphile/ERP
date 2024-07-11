// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:untitled/teacher-module/teacherDashboard.dart';
//
// class Draweer extends StatefulWidget {
//
//   @override
//   State<Draweer> createState() => _DraweerState();
// }
//
// class _DraweerState extends State<Draweer> {
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       drawer: Drawer(
//         width: size.width*0.8,
//           child: Column(
//             children: [
//               Container(
//                 height: size.height*0.3,
//                 width: size.width*1,
//                 decoration: BoxDecoration(
//                     color: Color(0xFF5A77BC),
//                     boxShadow: [
//                           BoxShadow(
//                           color: Colors.grey.withOpacity(1),
//                          spreadRadius: 0,
//                         blurRadius: 5,
//                         offset: Offset(0, 6), // Adjust the vertical offset as needed
//                         ),
//                     ]
//                 ),
//                 child: Column(
//                   crossAxisAlignment: CrossAxisAlignment.start,
//                   mainAxisAlignment: MainAxisAlignment.end,
//                   children: [
//                     Row(
//                         children:[
//                           SizedBox(width: size.width*0.1,),
//                           Column(
//                             crossAxisAlignment: CrossAxisAlignment.start,
//                                children: [Image.asset("assets/Images/Male User.png",fit: BoxFit.contain,height: size.height*0.15,),
//                               Text("Ankit Sharma",style: TextStyle(color: Colors.white,fontSize: size.height*0.025),),
//                               Text("ankits459@gmail.com",style: TextStyle(color: Colors.grey,fontSize: size.height*0.02),)],
//                       ),
//                 ]
//                     ),
//                     SizedBox(height: size.height*0.02,)
//                   ],
//                 ),
//               ),
//               SizedBox(height: size.height*0.02,),
//               Container(
//                 child: Column(
//                   children: [
//                     ListTile(
//                       leading: Image.asset("assets/Images/Home.png"),
//                       title: Text("Home"),
//                       onTap: (){
//                         Navigator.push(context,MaterialPageRoute(builder: (context) => teacherDashboard(),));
//
//                       },
//                     ),
//                     ListTile(
//                       leading: Image.asset("assets/Images/Gifts.png"),
//                       title: Text("Birthday"),
//                     ),
//                     ListTile(
//                       leading: Image.asset("assets/Images/Leave.png"),
//                       title: Text("Student Leave Application"),
//                     ),
//                     ListTile(
//                       leading: Image.asset("assets/Images/Money Bag.png"),
//                       title: Text("Salary"),
//                     ),
//                     ListTile(
//                       leading: Image.asset("assets/Images/logout.png"),
//                       title: Text("Logout"),
//                     ),
//                   ],
//                 ),
//               ),
//              Expanded(child: SizedBox(),),
//               Container(
//                 width: size.width*0.75,
//
//
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.center,
//                   children: [
//                     Image.asset("assets/Images/ph_copyright.png",fit: BoxFit.contain,),
//                    Column(
//                      children: [
//                        SizedBox(height: size.height*0.02,),
//                        Text(" 2024 All Right Reserved by School"),
//                        Text(" Designed by MetaPhile")
//                      ],
//                    )
//                   ],
//                 ),
//               )
//             ],
//           )
//       ),
//       appBar: AppBar(),
//     );
//   }
// }
