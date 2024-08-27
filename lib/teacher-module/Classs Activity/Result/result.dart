import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/Classs%20Activity/Result/resultOpen.dart';
import 'package:untitled/teacher-module/Trash/studentTerm1Result.dart';

import '../../../APIs/StudentsData/StudentApi.dart';
import '../../../APIs/StudentsData/student.dart';
import '../../../utils/theme.dart';
import '../../../utils/utils.dart';
import 'resultPdf.dart';
// Future<void>_addNewResultPopup( BuildContext context ,Size size)async {
//   bool isChecked = false;
//   return showDialog(
//     context: context,
//     builder: (context) {
//       return  StatefulBuilder(
//         builder: (context, setState) {
//           return SingleChildScrollView(
//             child: Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Card(
//                   child: Padding(
//                     padding: const EdgeInsets.symmetric(horizontal: 3.0),
//                     child: Column(
//                       children: [
//                         SizedBox(height: size.height*0.037,),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Text(
//                               "Fill the Student Records",
//                               style: TextStyle(
//                                 color: Colors.blue,
//                                 fontWeight: FontWeight.w400,
//                                 fontSize: size.width * 0.06,
//                               ),
//                             ),
//                             SizedBox(height: size.height*0.01,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Admission ID*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: addmissionId,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Student Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: studentName,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Class*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: clas,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Academic Year*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: academicYear,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Roll Number*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: rollNumber,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Date od Birth*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                         height: size.height*0.055,
//                                         width: size.width*0.45,
//                                         decoration: BoxDecoration(
//                                             borderRadius: BorderRadius.circular(12),
//                                             border: Border.all(color: Colors.grey)
//
//                                         ),
//                                         child: TextButton(
//                                           onPressed: (){
//                                             _selectDate(context).then((_) {
//                                               setState(() {});
//                                             });
//                                           },
//                                           child:  dateOfBirth==null?
//                                           Text("Please Select",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),):
//                                           Text("${dateOfBirth.toString()}",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
//
//                                         )
//                                     )
//                                   ],
//                                 ),
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Mother's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: motherName,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Father's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: fatherName,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.start,
//                               children: [
//                                 Padding(
//                                   padding: const EdgeInsets.only(left: 8.0),
//                                   child: Column(
//                                     crossAxisAlignment: CrossAxisAlignment.start,
//                                     children: [
//                                       Text("Contact Number*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                       SizedBox(height: size.height*0.01,),
//                                       Container(
//                                         height: size.height*0.055,
//                                         width: size.width*0.45,
//                                         child: TextField(
//
//                                           maxLines: 1,
//                                           keyboardType: TextInputType.number,
//                                           decoration: InputDecoration(
//
//                                               contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                               border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                           ),
//                                           controller: contactNumber,
//                                         ),
//
//                                       )
//                                     ],
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ],
//                         ),
//                         SizedBox(height: size.height*0.02,),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             SizedBox(height: size.height*0.01,),
//                             Text(
//                               "Attendance",
//                               style: TextStyle(
//                                 color: Colors.blue,
//                                 fontWeight: FontWeight.w400,
//                                 fontSize: size.width * 0.06,
//                               ),
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Card(
//                                   child: SizedBox(
//                                     width: size.width*0.45,
//                                     height: size.height*0.055,
//                                     child: DropdownButton<String>(
//                                       isExpanded: true,
//                                       borderRadius: BorderRadius.circular(12),
//                                       hint: const Text("Term",),
//                                       alignment: Alignment.center,
//                                       padding: EdgeInsets.all(8),
//                                       icon: Icon(Icons.keyboard_arrow_down_sharp),
//                                       underline: Container(),
//                                       value: _selectTerm,
//                                       onChanged: (newValue) {
//                                         setState(() {
//                                           _selectTerm = newValue!;
//                                         });
//                                       },
//                                       items: termOption.map((String option) {
//                                         return DropdownMenuItem<String>(
//                                           value: option,
//                                           child: Text(option,overflow: TextOverflow.ellipsis,),
//                                         );
//                                       }).toList(),
//                                     ),
//                                   ),
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Total Attendance*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: totalAttendance,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.start,
//                               children: [
//                                 Padding(
//                                   padding: const EdgeInsets.only(left: 8.0),
//                                   child: Column(
//                                     crossAxisAlignment: CrossAxisAlignment.start,
//                                     children: [
//                                       Text("Present Attendance*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                       SizedBox(height: size.height*0.01,),
//                                       Container(
//                                         height: size.height*0.055,
//                                         width: size.width*0.45,
//                                         child: TextField(
//
//                                           maxLines: 1,
//
//                                           decoration: InputDecoration(
//                                               contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                               border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                           ),
//                                           controller: presentAttendance,
//                                         ),
//
//                                       )
//                                     ],
//                                   ),
//                                 ),
//
//                               ],
//                             ),
//
//                           ],
//                         ),
//                         SizedBox(height: size.height*0.02,),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             SizedBox(height: size.height*0.01,),
//                             Text(
//                               "Academic Performance",
//                               style: TextStyle(
//                                 color: Colors.blue,
//                                 fontWeight: FontWeight.w400,
//                                 fontSize: size.width * 0.06,
//                               ),
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Card(
//                                   child: SizedBox(
//                                     width: size.width*0.45,
//                                     height: size.height*0.055,
//                                     child: DropdownButton<String>(
//                                       isExpanded: true,
//                                       borderRadius: BorderRadius.circular(12),
//                                       hint: const Text("Term",),
//                                       alignment: Alignment.center,
//                                       padding: EdgeInsets.all(8),
//                                       icon: Icon(Icons.keyboard_arrow_down_sharp),
//                                       underline: Container(),
//                                       value: _selectTerm,
//                                       onChanged: (newValue) {
//                                         setState(() {
//                                           _selectTerm = newValue!;
//                                         });
//                                       },
//                                       items: termOption.map((String option) {
//                                         return DropdownMenuItem<String>(
//                                           value: option,
//                                           child: Text(option,overflow: TextOverflow.ellipsis,),
//                                         );
//                                       }).toList(),
//                                     ),
//                                   ),
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("GPA*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: gpa,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                               children: [
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Subject*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: subject,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//                                 Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Number*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                     SizedBox(height: size.height*0.01,),
//                                     Container(
//                                       height: size.height*0.055,
//                                       width: size.width*0.45,
//                                       child: TextField(
//
//                                         maxLines: 1,
//
//                                         decoration: InputDecoration(
//                                             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                         ),
//                                         controller: number,
//                                       ),
//
//                                     )
//                                   ],
//                                 ),
//
//                               ],
//                             ),
//                             SizedBox(height: size.height*0.02,),
//                             Row(
//                               mainAxisAlignment: MainAxisAlignment.start,
//                               children: [
//                                 Padding(
//                                   padding: const EdgeInsets.only(left: 8.0),
//                                   child: Column(
//                                     crossAxisAlignment: CrossAxisAlignment.start,
//                                     children: [
//                                       Text("Grade*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
//                                       SizedBox(height: size.height*0.01,),
//                                       Container(
//                                         height: size.height*0.055,
//                                         width: size.width*0.45,
//                                         child: TextField(
//
//                                           maxLines: 1,
//
//                                           decoration: InputDecoration(
//                                               contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
//                                               border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
//                                           ),
//                                           controller: grade,
//                                         ),
//
//                                       )
//                                     ],
//                                   ),
//                                 ),
//
//
//                               ],
//                             ),
//
//                           ],
//                         ),
//                         SizedBox(height: size.height*0.02,),
//                         Row(
//                           mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                           children: [
//                             Container(
//                               width: size.width*0.3,
//                               child: ElevatedButton(
//                                   style: ElevatedButton.styleFrom(backgroundColor:Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
//                                   onPressed: (){},
//                                   child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
//                             ),
//                             Container(
//                               width: size.width*0.3,
//                               child: ElevatedButton(
//                                   style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
//                                   onPressed: (){
//                                     Navigator.pop(context);
//                                   },
//                                   child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
//                             ),
//
//                           ],
//                         ),
//                         SizedBox(height: size.height*0.01,),
//
//
//                       ],
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//           );
//         },
//       );
//
//     },);
//
// }

// class ReportCard extends StatefulWidget {
//   const ReportCard({super.key});
//
//   @override
//   State<ReportCard> createState() => _ReportCardState();
// }
//
// class _ReportCardState extends State<ReportCard> {
//   List<Map<String, dynamic>>? studentList;
//   CustomTheme themeObj=CustomTheme();
//   String? _selectTerm;
//   List<String> termOption = [
//     '1',
//     '2',
//   ];
//   bool term1Selected=true;
//   bool term2Selected=false;
//
//   TextEditingController addmissionId=TextEditingController();
//   TextEditingController studentName=TextEditingController();
//   TextEditingController clas=TextEditingController();
//   TextEditingController academicYear=TextEditingController();
//   TextEditingController rollNumber=TextEditingController();
//   TextEditingController motherName=TextEditingController();
//   TextEditingController fatherName=TextEditingController();
//   TextEditingController contactNumber=TextEditingController();
//   TextEditingController totalAttendance=TextEditingController();
//   TextEditingController presentAttendance=TextEditingController();
//   TextEditingController gpa=TextEditingController();
//   TextEditingController subject=TextEditingController();
//   TextEditingController number=TextEditingController();
//   TextEditingController grade=TextEditingController();
//   DateTime? dateOfBirth;
//
//
//   StudentApi studentObj=StudentApi();
//   String? accessToken;
//   String? currentClass;
//   String? section;
//   final ScrollController _scrollController = ScrollController();
//   bool isLoadingMore = false;
//   int start = 0;
//
//   @override
//   void initState() {
//     super.initState();
//     getStudentData();
//     _scrollController.addListener(_scrollListener);
//   }
//
//
//   Future<void> getStudentData() async {
//    try{
//      SharedPreferences pref = await SharedPreferences.getInstance();
//      accessToken = pref.getString("accessToken");
//      currentClass = pref.getString("teacherClass");
//      section = pref.getString("teacherSection");
//     print(currentClass);
//     print(section);
//      currentClass ??= "class";
//      List<dynamic> students=await studentObj.fetchStudents(accessToken! , currentClass!, section!, 0,);
//      setState(() {
//        studentList =students.cast();
//      });
//
//    }catch(e){
//      print("error $e");
//    }finally{
//      setState(() {
//
//      });
//    }
//   }
//   bool allStudentsLoaded = false;
//   Future<void> fetchMoreStudentData() async {
//     if (isLoadingMore) return;
//
//     setState(() {
//       isLoadingMore = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       List<dynamic> fetchedStudents = await studentObj.fetchStudents(accessToken!,currentClass!, section!, start + studentList!.length);
//
//
//
//       if (fetchedStudents.isEmpty) {
//         allStudentsLoaded = true;
//       }
//       setState(() {
//         studentList?.addAll(fetchedStudents.cast());
//       });
//     } catch (e) {
//       print('Error fetching more student data: $e');
//       showRedSnackBar("Failed to load more students. Please try again.", context);
//     } finally {
//       setState(() {
//         isLoadingMore = false;
//       });
//     }
//   }
//
//   @override
//   void dispose() {
//     _scrollController.dispose();
//     super.dispose();
//   }
//
//   void _scrollListener() {
//     if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
//       fetchMoreStudentData();
//     }
//   }
//
//
//
//   @override
//   Widget build(BuildContext context) {
//
//
//
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//
//       body:studentList==null?
//       Center(
//         child: LoadingAnimationWidget.threeArchedCircle(
//           color: themeObj.primayColor,
//           size: 50,
//         ),
//       ):studentList!.isEmpty? Center(child: Text("No student Data Found"),):
//       Column(
//
//         children: [
//           SingleChildScrollView(
//             child: Column(
//
//               children: [
//                 SizedBox(height: size.height * 0.01),
//                 Padding(
//                   padding: const EdgeInsets.only(left: 50.0),
//                   child: Text(
//                     'Swipe left and right to see all details',
//                     style: GoogleFonts.openSans(
//                         fontStyle: FontStyle.italic,
//                         color: Colors.grey[600],
//                         fontSize: size.width * 0.035),
//                   ),
//                 ),
//                 SizedBox(height: size.height * 0.02),
//                 SingleChildScrollView(
//                   scrollDirection: Axis.horizontal,
//                   child: Column(
//
//                     children: [
//                       Container(
//
//                         width: size.width * 1.2,
//                         color: Color.fromRGBO(233, 213, 255, 1),
//                         child: Row(
//                           children: [
//                             _buildHeaderCell("Roll No.", size),
//                             _buildHeaderCell("Name", size),
//                             SizedBox(width: size.width*0.04,),
//                             Padding(
//                               padding: const EdgeInsets.only(left: 18.0),
//                               child: _buildHeaderCell("Email", size),
//                             ),
//                           ],
//                         ),
//                       ),
//                       const Divider(thickness: 2, height: 2, color: Colors.black),
//                       Container(
//                         height: size.height * 0.7,
//                         width: size.width * 1.14,
//                         child: ListView.separated(
//                           shrinkWrap: true,
//                           controller: _scrollController,
//                           itemBuilder: (context, index) {
//                             if (index == studentList!.length && !allStudentsLoaded) {
//                               return Center(
//                                 child: LoadingAnimationWidget.threeArchedCircle(
//                                   color: themeObj.primayColor,
//                                   size: 50,
//                                 ),
//                               );
//                             }
//                             final student = studentList![index];
//                             return Column(
//                               children: [
//                                 InkWell(
//                                   onTap: (){
//                                     Navigator.push(context, MaterialPageRoute(builder: (context) => ReportCardOpen(email: student["email"],)));
//                                   },
//                                   child: Row(
//                                     children: [
//
//                                       _buildDataCell('0${student["rollNumber"]}', size),
//                                       Row(
//                                         children: [
//                                           CircleAvatar(
//                                             radius: size.width * 0.06,
//                                             backgroundImage: NetworkImage(student["profileLink"] ?? 'https://example.com/default-profile-pic.jpg'),
//                                           ),
//                                           SizedBox(width: size.width*0.02,),
//                                           _buildDataCell(student["name"], size),
//                                         ],
//                                       ),
//                                       SizedBox(width: size.width*0.03,),
//                                       _buildDataCell(student["email"], size),
//                                     ],
//                                   ),
//                                 ),
//
//                               ],
//                             );
//                           },
//                           separatorBuilder: (context, index) => Divider(),
//                           itemCount:studentList!.length,
//
//                         ),
//                       ),
//
//                     ],
//                   ),
//                 )
//               ],
//             ),
//           ),
//
//         ],
//       ),
//
//     );
//   }
//   Widget _buildHeaderCell(String text, Size size) {
//     return Container(
//       width: size.width * 0.36,
//       padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
//       child: Text(
//         text,
//         style: GoogleFonts.openSans(
//           color: themeObj.textBlack,
//           fontWeight: FontWeight.w600,
//           fontSize: size.width * 0.04,
//         ),
//       ),
//     );
//   }
//
//   Widget _buildDataCell(String text, Size size) {
//     return Container(
//
//       width: size.width * 0.3,
//       padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
//       child: Text(
//         text,
//         style: GoogleFonts.openSans(
//           color: themeObj.textBlack,
//           fontWeight: FontWeight.w400,
//           fontSize: size.width * 0.035,
//         ),
//       ),
//     );
//   }
// }


class ReportCard extends StatefulWidget {
  const ReportCard({super.key});

  @override
  State<ReportCard> createState() => _ReportCardState();
}

class _ReportCardState extends State<ReportCard> with SingleTickerProviderStateMixin {
  List<dynamic>? studentList;
  CustomTheme themeObj=CustomTheme();
  String? _selectTerm;
  List<String> termOption = [
    '1',
    '2',
  ];
  bool term1Selected=true;
  bool term2Selected=false;

  TextEditingController addmissionId=TextEditingController();
  TextEditingController studentName=TextEditingController();
  TextEditingController clas=TextEditingController();
  TextEditingController academicYear=TextEditingController();
  TextEditingController rollNumber=TextEditingController();
  TextEditingController motherName=TextEditingController();
  TextEditingController fatherName=TextEditingController();
  TextEditingController contactNumber=TextEditingController();
  TextEditingController totalAttendance=TextEditingController();
  TextEditingController presentAttendance=TextEditingController();
  TextEditingController gpa=TextEditingController();
  TextEditingController subject=TextEditingController();
  TextEditingController number=TextEditingController();
  TextEditingController grade=TextEditingController();
  DateTime? dateOfBirth;


  StudentApi studentObj=StudentApi();
  String? accessToken;
  String? currentClass;
  String? section;
  final ScrollController _scrollController = ScrollController();
  bool isLoadingMore = false;
  int start = 0;

  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    getStudentData();
    _scrollController.addListener(_scrollListener);
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  Future<void> getStudentData() async {
   try{
     SharedPreferences pref = await SharedPreferences.getInstance();
     accessToken = pref.getString("accessToken");
     currentClass = pref.getString("teacherClass");
     section = pref.getString("teacherSection");
    print(currentClass);
    print(section);
     currentClass ??= "class";
     List<dynamic> students=await studentObj.fetchStudents(accessToken! , currentClass!, section!, 0,);
     setState(() {
       studentList =students.cast();
     });

   }catch(e){
     print("error $e");
   }finally{
     setState(() {

     });
   }
  }


  bool allDataLoaded = false;
  Future<void> fetchMoreStudentData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      int newStart = start + (studentList?.length ?? 0);
      List<dynamic> fetchedStudents = await studentObj.fetchStudents(accessToken!,currentClass!, section!, newStart);

      int? previousLength=studentList?.length;



      studentList?.addAll(fetchedStudents);

      int? newLength=studentList?.length;
      if(newLength==previousLength && newLength!=null && previousLength!=null){
        allDataLoaded=true;
      }

      start = newStart;
    } catch (e) {
      print('Error fetching more student data: $e');
      showRedSnackBar("Failed to load more students. Please try again.", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }


  void _scrollListener() {
    if(!allDataLoaded){
      fetchMoreStudentData();
    }
  }



  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: studentList == null
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      )
          : studentList!.isEmpty
          ? Center(child: Text("No student data found", style: GoogleFonts.poppins(fontSize: 18)))
          : Column(
        children: [
          SizedBox(height: size.height * 0.02),
          Expanded(
            child: _buildStudentList(size),
          ),
        ],
      ),
    );
  }

  Widget _buildStudentList(Size size) {
    return ListView.builder(
      controller: _scrollController,
      itemCount: (studentList?.length ?? 0) + (isLoadingMore ? 1 : 0),
      itemBuilder: (context, index) {
        if (index  < (studentList?.length ?? 0)) {
          final student = studentList![index];
          return AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return FadeTransition(
              opacity: _animation,
              child: SlideTransition(
                position: Tween<Offset>(
                  begin: Offset(0, 0.1),
                  end: Offset.zero,
                ).animate(_animation),
                child: child,
              )
            );
          },
            child: _buildStudentCard(student, size, index),
            );
        }
        else {
          return Center(
            child: LoadingAnimationWidget.threeArchedCircle(
              color: themeObj.primayColor,
              size: 50,
            ),
          );}

      },
    );
  }

  Widget _buildStudentCard(Map<String, dynamic> student, Size size, int index) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => ReportCardOpen(email: student["email"])));
        },
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Row(
            children: [
              CircleAvatar(
                radius: size.width * 0.08,
                backgroundImage: NetworkImage(student["profileLink"] ?? 'https://example.com/default-profile-pic.jpg'),
              ),
              SizedBox(width: size.width * 0.04),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      student["name"],
                      style: GoogleFonts.poppins(
                        fontWeight: FontWeight.w600,
                        fontSize: size.width * 0.04,
                        color: themeObj.textBlack,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      "Roll No: ${student["rollNumber"]}",
                      style: GoogleFonts.poppins(
                        fontWeight: FontWeight.w400,
                        fontSize: size.width * 0.035,
                        color: Colors.grey[600],
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      student["email"],
                      style: GoogleFonts.poppins(
                        fontWeight: FontWeight.w400,
                        fontSize: size.width * 0.035,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.arrow_forward_ios, color: themeObj.primayColor),
            ],
          ),
        ),
      ),
    );
  }

}
