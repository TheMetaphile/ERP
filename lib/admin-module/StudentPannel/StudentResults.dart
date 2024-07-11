import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/theme.dart';

import '../../teacher-module/Classs Activity/Result/resultPdf.dart';
import '../admin Utils/adminStudentAttendanceTile.dart';
import '../admin Utils/adminStudentResultTile.dart';


class StudentResults extends StatefulWidget {
  const StudentResults({super.key});

  @override
  State<StudentResults> createState() => _StudentResultsState();
}

class _StudentResultsState extends State<StudentResults> {

  @override
  void initState() {
    super.initState();

  }

  bool term1Selected=true;
  bool term2Selected=false;
  String? _selectedClass;
  List<String> classOptions = [
    'Pre-Nursery',
    'Nursery',
    'L.K.G',
    'U.K.G',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];
  String? _selectedSection;
  List<String> sectionOptions = [
    'A',
    'B',
    'C',
    'D',
    'E',
  ];
  String? _selectedSession;
  List<String> sessionOptions = [
    '2023-24',
    '2024-2025',

  ];
  final List<Map<String, dynamic>> resultRecord = [
    { 'name': 'Ankit', 'email': "ankits45987@gmail.com",},
    { 'name': 'Shailesh', 'email': 'shaileshsa@gmail.com',},
    { 'name': 'Abhishek', 'email': 'abhisheka@gmail.com',},
    { 'name': 'Manish', 'email': 'manishs45987@gmail.com',},
    { 'name': 'Bhanu', 'email': 'ankits459877@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'tankits45987@gmail.comrue',},
    {'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},
    { 'name': 'Ankit', 'email': 'ankits45987@gmail.com',},

  ];

CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        backgroundColor: themeObj.textWhite,
        appBar: AppBar(
          backgroundColor: themeObj.primayColor,
          leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back_ios),
          ),
          title: Text("Report Card",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

        ),
        body:SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Column(
            children: [
              SizedBox(height: size.height*0.01,),
              // Text("Search Report Card",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.045),),
              // SizedBox(height: size.height*0.01,),
              dropDownButton(size),
              SizedBox(height: size.height*0.02,),
              Container(
                height: size.height*0.07,
                color: Color.fromRGBO(233,213,255,1),
                child: Row(
                  children: [
                    SizedBox(width: size.width*0.015,),
                    SizedBox(
                      width: size.width*0.25,
                      child: Text("Roll No.",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

                    ),
                    SizedBox(
                      width: size.width*0.37,
                      child: Text("Name",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

                    ),
                    SizedBox(
                      width: size.width*0.25,
                      child: Text("Email",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

                    ),
                    SizedBox(width: size.width*0.01,),
                  ],
                ),
              ),
              const Divider(thickness: 2,height: 2,color: Colors.black,),
              ListView.separated(
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  final data = resultRecord[index];
                  return  InkWell(
                    onTap: (){
                      // Navigator.push(context, MaterialPageRoute(builder: (context) => ResultPdf(),));

                    },
                    child: SizedBox(
                      height: size.height*0.04,
                      child: Row(
                        children: [
                          SizedBox(width: size.width*0.015,),
                          SizedBox(
                            width: size.width*0.2,
                            child: Text("0${index+1}",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.045),),

                          ),
                          Row(
                            children: [
                              Icon(CupertinoIcons.profile_circled,color: themeObj.textBlack,),
                              SizedBox(
                                width: size.width*0.02,
                              ),
                              SizedBox(
                                width: size.width*0.3,
                                child: Text(data["name"],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.045),),

                              ),
                            ],
                          ),
                          SizedBox(
                            width: size.width*0.37,
                            child: Text(data["email"],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

                          ),
                        ],
                      ),
                    ),
                  );
                }, separatorBuilder: (context, index) => Divider(),
                itemCount: resultRecord.length,
              )

            ],
          ),
        ),

    );
  }
  Widget dropDownButton(Size size){
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Class",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
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
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Section",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSection,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSection = newValue!;
                    });
                  },
                  items: sectionOptions.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Session",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSession,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSession = newValue!;
                    });
                  },
                  items: sessionOptions.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

}
