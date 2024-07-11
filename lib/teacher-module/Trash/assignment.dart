// import 'package:flutter/material.dart';
// import 'package:google_fonts/google_fonts.dart';
//
// import '../utils/theme.dart';
//
// class TeacherAssignment extends StatefulWidget {
//   const TeacherAssignment({super.key});
//
//   @override
//   State<TeacherAssignment> createState() => _TeacherAssignmentState();
// }
//
// class _TeacherAssignmentState extends State<TeacherAssignment> with TickerProviderStateMixin{
//    List<String> maths=["Surface Areas and Volume","Probability","Dimensions"];
//    String? _selectedClass;
//    String? _selectedSection;
//    String? _selectedSubject;
//    List<String> classOptions = [
//      'Standard 12th',
//      'Standard 11th',
//      'Standard 10th',
//      'Standard 9th',
//    ];
//    List<String> classSections = [
//      'Section A',
//      'Section B',
//      'Section C',
//
//    ];
//    List<String> classSubjects = [
//      'Science',
//      'Maths',
//      'Social Science',
//      'Hindi',
//    ];
//    late TabController tabBarController;
//    @override
//    void initState() {
//      super.initState();
//      tabBarController = TabController(length: 2, vsync: this);
//    }
//    final TextEditingController chapter=TextEditingController();
//    final TextEditingController topic=TextEditingController();
//    final TextEditingController subTopics=TextEditingController();
//    final TextEditingController description=TextEditingController();
//    final TextEditingController deadline=TextEditingController();
//    CustomTheme themeObj=CustomTheme();
//    @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       body: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Column(
//           children: [
//             Column(
//               children: [
//                 TabBar(
//                   controller: tabBarController,
//                   dividerColor: themeObj.textgrey,
//                   tabs: [
//                     Text(
//                       "View",
//                       style: GoogleFonts.openSans(
//                         fontSize: size.width * 0.055,
//                         color: themeObj.textBlack,
//                       ),
//                     ),
//                     Text(
//                       "Upload",
//                       style: GoogleFonts.openSans(
//                         fontSize: size.width * 0.055,
//                         color: themeObj.textBlack,
//                       ),
//                     ),
//                   ],
//                 ),
//                 SizedBox(height: size.height*0.02,),
//                 dropDownButton(size),
//                 SizedBox(height: size.height*0.02,),
//                 SizedBox(
//                   height: size.height*0.085*15.5,
//                   child: TabBarView(
//                       controller: tabBarController,
//                       children: [
//                         Column(
//                           children: [
//                             ListView.builder(
//                               itemCount: maths.length,
//                               shrinkWrap: true,
//                               physics: NeverScrollableScrollPhysics(),
//                               itemBuilder: (context, index) {
//                                 return Card(
//                                   shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: themeObj.textgrey)),
//                                   child: Padding(
//                                     padding: const EdgeInsets.all(8.0),
//                                     child: SizedBox(
//                                       child: Column(
//                                         crossAxisAlignment: CrossAxisAlignment.start,
//                                         children: [
//                                           Card(
//                                             color:themeObj.secondayColor,
//                                             elevation: 5,
//                                             shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
//                                             child: Padding(
//                                               padding: const EdgeInsets.all(5.0),
//                                               child: Text("Mathematics",textAlign:TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:themeObj.textBlack),),
//                                             ),
//
//                                           ),
//                                           SizedBox(height: size.height*0.02,),
//                                           Text(maths[index],textAlign:TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:themeObj.textgrey),),
//                                           SizedBox(height: size.height*0.02,),
//                                           Row(
//                                             mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                                             children: [
//                                               Text("Assign Date",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),),
//                                               Text("10 Nov 2023",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:themeObj.textgrey),)
//
//
//                                             ],
//                                           ),
//                                           SizedBox(height: size.height*0.01,),
//                                           Row(
//                                             mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                                             children: [
//                                               Text("Last Submission Date",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),),
//                                               Text("10 Dec 2023",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:themeObj.textgrey),)
//
//
//                                             ],
//                                           ),
//                                           SizedBox(height: size.height*0.03,),
//                                           Center(
//                                             child: ElevatedButton(
//                                                 style: ElevatedButton.styleFrom(backgroundColor: themeObj.primayColor ),
//                                                 onPressed: (){}, child: Text("Submitted By",style: GoogleFonts.openSans(color:themeObj.textBlack),)),
//                                           ),
//
//
//                                         ],
//                                       ),
//                                     ),
//                                   ),
//                                 );
//
//                               },
//                             ),
//                           ],
//                         ),
//                         Column(
//                           children: [
//                             Card(
//                               elevation: 5,
//                               shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color:themeObj.textgrey)),
//                               child: Padding(
//                                 padding: const EdgeInsets.all(8.0),
//                                 child: Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text("Chapter",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
//                                     SizedBox(height: size.height*0.01,),
//                                     SizedBox(
//                                       height: size.height*0.07,
//                                       child: TextField(
//                                         showCursor: false,
//                                         controller: chapter,
//                                         decoration: InputDecoration(
//                                             hintText: "Chapter",
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
//                                         ),
//
//                                       ),
//                                     ),
//                                     SizedBox(height: size.height*0.02,),
//                                     Text("Topic",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
//                                     SizedBox(height: size.height*0.01,),
//                                     SizedBox(
//                                       height: size.height*0.07,
//                                       child: TextField(
//                                         decoration: InputDecoration(
//                                             hintText: "Topic",
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
//                                         ),
//
//                                       ),
//                                     ),
//                                     SizedBox(height: size.height*0.02,),
//                                     Text("Sub Topic",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
//                                     SizedBox(height: size.height*0.01,),
//                                     SizedBox(
//                                       height: size.height*0.07,
//                                       child: TextField(
//                                         decoration: InputDecoration(
//                                             hintText: "Sub Topic",
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
//                                         ),
//
//                                       ),
//                                     ),
//                                     SizedBox(height: size.height*0.02,),
//                                     Text("Description",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
//                                     SizedBox(height: size.height*0.01,),
//                                     SizedBox(
//                                       height: size.height*0.07,
//                                       child: TextField(
//                                         decoration: InputDecoration(
//                                             hintText: "Description",
//                                             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
//                                         ),
//
//                                       ),
//                                     ),
//                                     Row(
//                                       children: [
//                                         Text("Deadline",style: GoogleFonts.openSans(color:Colors.red,fontSize:size.width*0.04,fontWeight:FontWeight.w600),),
//                                         IconButton(onPressed: (){}, icon: Icon(Icons.calendar_month))
//                                       ],
//                                     ),
//                                     SizedBox(
//                                       width: size.width*0.3,
//                                       height: size.height*0.05,
//                                       child: TextField(
//                                         controller: deadline,
//                                         keyboardType: TextInputType.datetime,
//                                         decoration: InputDecoration(
//                                             hintText: "DD/MM/YY",
//                                             border: OutlineInputBorder(borderSide: BorderSide(color: themeObj.textgrey),borderRadius: BorderRadius.circular(8))
//
//                                         ),
//                                       ),
//                                     ),
//                                     SizedBox(height: size.height*0.03,),
//                                     Center(
//                                       child: ElevatedButton(
//                                           style: ElevatedButton.styleFrom(backgroundColor: themeObj.primayColor ),
//                                           onPressed: (){}, child: Text("Publish",style: GoogleFonts.openSans(color:themeObj.textBlack),)),
//                                     ),
//
//
//                                   ],
//                                 ),
//                               ),
//                             ),
//                           ],
//                         ),
//                       ]
//                   ),
//                 )
//               ],
//             ),
//           ],
//         ),
//       ),
//     );
//
//   }
//    Widget dropDownButton(Size size){
//      return  Padding(
//        padding: const EdgeInsets.symmetric(horizontal: 2.0),
//        child: SingleChildScrollView(
//          scrollDirection: Axis.horizontal,
//          child: Row(
//            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//            children: [
//              Card(
//                child: Container(
//                  width: size.width*0.3,
//                  height: size.height*0.05,
//                  child: DropdownButton<String>(
//                    isExpanded: true,
//                    borderRadius: BorderRadius.circular(12),
//                    hint: Text("Classes",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
//                    alignment: Alignment.center,
//                    padding: EdgeInsets.all(8),
//                    icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
//                    underline: Container(),
//                    value: _selectedClass,
//                    onChanged: (newValue) {
//                      setState(() {
//                        _selectedClass = newValue!;
//                      });
//                    },
//                    items: classOptions.map((String option) {
//                      return DropdownMenuItem<String>(
//                        value: option,
//                        child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
//                      );
//                    }).toList(),
//                  ),
//                ),
//              ),
//              SizedBox(width: size.width*0.02,),
//              Card(
//                child: Container(
//                  width: size.width*0.3,
//                  height: size.height*0.05,
//                  child: DropdownButton<String>(
//                    isExpanded: true,
//                    borderRadius: BorderRadius.circular(12),
//                    hint: Text("Sections",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
//                    padding: EdgeInsets.all(8),
//                    icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
//                    alignment: Alignment.center,
//                    underline: Container(),
//                    value: _selectedSection,
//                    onChanged: (newValue) {
//                      setState(() {
//                        _selectedSection = newValue!;
//                      });
//                    },
//                    items: classSections.map((String option) {
//                      return DropdownMenuItem<String>(
//                        value: option,
//                        child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
//                      );
//                    }).toList(),
//                  ),
//                ),
//              ),
//              SizedBox(width: size.width*0.02,),
//              Card(
//                child: Container(
//                  width: size.width*0.3,
//                  height: size.height*0.05,
//                  child: DropdownButton<String>(
//                    isExpanded: true,
//                    borderRadius: BorderRadius.circular(12),
//                    hint: Text("Subjects",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
//                    padding: EdgeInsets.all(8),
//                    icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
//                    alignment: Alignment.center,
//                    underline: Container(),
//                    value: _selectedSubject,
//                    onChanged: (newValue) {
//                      setState(() {
//                        _selectedSubject = newValue!;
//                      });
//                    },
//                    items: classSubjects.map((String option) {
//                      return DropdownMenuItem<String>(
//                        value: option,
//                        child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
//                      );
//                    }).toList(),
//                  ),
//                ),
//              ),
//            ],
//          ),
//        ),
//      );
//    }
// }
