import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class teacherClass extends StatefulWidget {
  const teacherClass({super.key});

  @override
  State<teacherClass> createState() => _teacherClassState();
}

class _teacherClassState extends State<teacherClass> {
  String? selectedStandard;
  String? selectedSection;

  List<String> standards = ['11 Sci', '12 Arts', '10 Com'];
  List<String> sections = ['A', 'B', 'C', 'D'];

  Map<String, String>? selectedClass;
  List<List<String>> classes = [
    [ '09:30 - 10:30',  'Chemistry',""],
    ['10:30 - 11:30','Maths',""],
    ['11:30 - 12:30', 'Biology',""],
    ['12:30 - 01:30', 'Break',""],
    ['01:30 - 02:30',  'Physics',""],
    ['02:30 - 03:30', 'English',""]
  ];

  String? _selectedClass;
  String? _selectedSection;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
  // Initially selected value
    List<String> classOptions = [
      'Standard 12th',
      'Standard 11th',
      'Standard 10th',
      'Standard 9th',
    ];
    List<String> classSections = [
      'Section A',
      'Section B',
      'Section C',

    ];
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Your Classes",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Column(
        children: [
          SizedBox(
            height: size.height*0.05,
          ),
          Expanded(
            child: Card(
              color: Colors.white,
              margin: const EdgeInsets.all(0),
              shape: const OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.white
                  ),
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(30),
                      topLeft: Radius.circular(30)
                  )
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Card(

                          margin: EdgeInsets.all(0),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 2)),
                          child: Container(
                            width: size.width*0.45,
                            height: size.height*0.07,
                            child: DropdownButton<String>(
                              isExpanded: true,
                              borderRadius: BorderRadius.circular(12),
                              hint: Text("Classes",),
                              padding: EdgeInsets.all(8),
                              icon: Icon(Icons.keyboard_arrow_down_sharp),
                              underline: Container(),
                              value: _selectedClass,
                              onChanged: (newValue) {
                                setState(() {
                                  _selectedClass = newValue!;
                                });
                              },
                              items: classOptions.map((String option) {
                                return DropdownMenuItem<String>(
                                  value: option,
                                  child: Text(option),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                        Card(

                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 2)),

                          child: Container(
                            width: size.width*0.45,
                            height: size.height*0.07,
                            child: DropdownButton<String>(
                              isExpanded: true,
                              borderRadius: BorderRadius.circular(12),
                              hint: Text("Sections",),
                              padding: EdgeInsets.all(8),
                              icon: Icon(Icons.keyboard_arrow_down_sharp),
                              underline: Container(),
                              value: _selectedSection,
                              onChanged: (newValue) {
                                setState(() {
                                  _selectedSection = newValue!;
                                });
                              },
                              items: classSections.map((String option) {
                                return DropdownMenuItem<String>(
                                  value: option,
                                  child: Text(option),
                                );
                              }).toList(),
                            ),
                          ),
                        )
                      ],
                    ),
                    SizedBox(height: size.height*0.03,),
                    Card(

                      margin: EdgeInsets.all(0),

                      child: ExpansionTile(
                          title: Text("Monday",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),),
                        backgroundColor: Colors.transparent,
                        shape:RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 2)),
                        children: [
                         Padding(
                           padding: const EdgeInsets.only(left: 8.0,right: 8.0),
                           child: Column(
                             children: [
                               Divider(),
                               Row(

                                 children: [
                                   SizedBox(
                                     width:size.width*0.33,
                                     child: AutoSizeText("Time",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w700),),
                                   ),
                                   SizedBox(
                                     width:size.width*0.3,

                                     child: AutoSizeText("Subject",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w700),),
                                   ),
                                   SizedBox(
                                     width:size.width*0.2,
                                     child: AutoSizeText("Class",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w700),),
                                   ),
                                 ],
                               ),
                               SizedBox(height: size.height*0.02,),
                               Container(
                                 height: size.height*0.2,
                                 child: ListView.builder(
                                   shrinkWrap: true,
                                   itemCount: classes.length,
                                   itemBuilder: (context, index) {
                                     return Row(

                                       children: [
                                         SizedBox(

                                              width:size.width*0.33,

                                           child: AutoSizeText(classes[index][0],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                         ),
                                         SizedBox(
                                           width:size.width*0.3,
                                           child: AutoSizeText(classes[index][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                         ),
                                         SizedBox(
                                           width:size.width*0.2,
                                           child: AutoSizeText(classes[index][2],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                         ),
                                       ],
                                     );
                                   },),

                               )
                             ],
                           ),
                         )
                        ],

                      ),
                    ),
                    SizedBox(height: size.height*0.02,),
                    Card(

                      margin: EdgeInsets.all(0),

                      child: ExpansionTile(
                        title: Text("Tuesday",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),),
                        backgroundColor: Colors.transparent,
                        shape:RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 2)),
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(left: 8.0,right: 8.0),
                            child: Column(
                              children: [
                                Divider(),
                                Row(

                                  children: [
                                    SizedBox(
                                      width:size.width*0.33,
                                      child: AutoSizeText("Time",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w700),),
                                    ),
                                    SizedBox(
                                      width:size.width*0.3,

                                      child: AutoSizeText("Subject",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w700),),
                                    ),
                                    SizedBox(
                                      width:size.width*0.2,
                                      child: AutoSizeText("Class",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w700),),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.02,),
                                Container(
                                  height: size.height*0.2,
                                  child: ListView.builder(
                                    shrinkWrap: true,
                                    itemCount: classes.length,
                                    itemBuilder: (context, index) {
                                      return Row(

                                        children: [
                                          SizedBox(

                                            width:size.width*0.33,

                                            child: AutoSizeText(classes[index][0],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                          ),
                                          SizedBox(
                                            width:size.width*0.3,
                                            child: AutoSizeText(classes[index][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                          ),
                                          SizedBox(
                                            width:size.width*0.2,
                                            child: AutoSizeText(classes[index][2],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                          ),
                                        ],
                                      );
                                    },),

                                )
                              ],
                            ),
                          )
                        ],

                      ),
                    )
                  ],
                )
              ),
            ),
          ),
        ],
      ),
    );
  }
}
