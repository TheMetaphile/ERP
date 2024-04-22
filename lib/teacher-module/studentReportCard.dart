
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/studentFeesTile.dart';
import 'package:untitled/utils/studentReportTile.dart';
import 'package:untitled/utils/uploadReportTile.dart';
import '../utils/studentAttendanceTile.dart';
import '../utils/studentNoteBookRecordTile.dart';

class studentReportCard extends StatefulWidget {
  const studentReportCard({super.key, required this.screen});
  final String screen;

  @override
  State<studentReportCard> createState() => _studentReportCardState();
}

class _studentReportCardState extends State<studentReportCard> with TickerProviderStateMixin{

  List<String> standards = ['11 Sci', '12 Arts', '10 Com'];
  List<String> sections = ['A', 'B', 'C', 'D'];
  String? _selectedClass;
  String? _selectedSection;
  String? _selectedSubject;
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
  List<String> classSubjects = [
    'Science',
    'Maths',
    'Social Science',
    'Hindi',
  ];

  late TabController tabBarController;
  @override
  void initState() {
    super.initState();
    tabBarController = TabController(length: 2, vsync: this);
  }



  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
        title: Text(widget.screen,style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: SingleChildScrollView(

        child: Column(
          children: [
            SizedBox(
              height: size.height*0.05,
            ),
            Card(
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
                child: body(size),
              )

            ),
          ],
        ),
      ),
    );
  }
  Widget dropDownButton(Size size){
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Card(

              margin: EdgeInsets.all(0),
              child: Container(
                width: size.width*0.35,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Classes",),
                  alignment: Alignment.center,
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
            SizedBox(width: size.width*0.02,),
            Card(

              margin: EdgeInsets.all(0),
              child: Container(
                width: size.width*0.35,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Sections",),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp),
                  alignment: Alignment.center,
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
            ),
            SizedBox(width: size.width*0.02,),
           widget.screen == "Note Book Record" ?   Card(

             margin: EdgeInsets.all(0),
             child: Container(
               width: size.width*0.35,
               height: size.height*0.07,
               child: DropdownButton<String>(
                 isExpanded: true,
                 borderRadius: BorderRadius.circular(12),
                 hint: Text("Subject",),
                 padding: EdgeInsets.all(8),
                 icon: Icon(Icons.keyboard_arrow_down_sharp),
                 alignment: Alignment.center,
                 underline: Container(),
                 value: _selectedSubject,
                 onChanged: (newValue) {
                   setState(() {
                     _selectedSubject = newValue!;
                   });
                 },
                 items: classSubjects.map((String option) {
                   return DropdownMenuItem<String>(
                     value: option,
                     child: Text(option),
                   );
                 }).toList(),
               ),
             ),
           ):SizedBox(),
            widget.screen == "Student Attendance" ?   Card(

              margin: EdgeInsets.all(0),
              child: Container(
                width: size.width*0.35,
                height: size.height*0.07,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Subject",),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSubject,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSubject = newValue!;
                    });
                  },
                  items: classSubjects.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option),
                    );
                  }).toList(),
                ),
              ),
            ):SizedBox(),
          ],
        ),
      ),
    );
  }
  Widget showAttributes(Size size){
    return  Card(
      color: Color(0xFF5A77BC),
      margin: EdgeInsets.all(0),
      child: SizedBox(
        height: size.height*0.06,
        width: size.width*1,
        child: widget.screen == "Student Attendance" ? Row(
          children: [
            SizedBox(width: size.width*0.15,),
            AutoSizeText("Student",textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
            SizedBox(width: size.width*0.4,),
            AutoSizeText("Status",textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
          ],):
        widget.screen == "Student Fees Status" ?  Row(
          children: [
            SizedBox(width: size.width*0.19,),
            AutoSizeText("Student",textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
            SizedBox(width: size.width*0.21,),
            AutoSizeText("Status",textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
            SizedBox(width: size.width*0.05,),
            AutoSizeText("Amount",
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
          ],):
        widget.screen == "Report Card" ?  Row(
          children: [
            SizedBox(width: size.width*0.15,),
            AutoSizeText("Student",textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
            SizedBox(width: size.width*0.15,),
            AutoSizeText("Total Marks",
              style: GoogleFonts.openSans(
                  color: Colors.white,
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400
              ),
            ),
            SizedBox(width: size.width*0.05,),
            AutoSizeText("GPA",
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
          ],):
        widget.screen == "Note Book Record" ? Row(
          children: [

            SizedBox(width: size.width*0.15,),
            AutoSizeText("Student",textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
            SizedBox(width: size.width*0.2,),
            AutoSizeText("Check",
              style: GoogleFonts.openSans(
                  color: Colors.white,
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400
              ),
            ),
            SizedBox(width: size.width*0.06,),
            AutoSizeText("Uncheck",
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: Colors.white
              ),
            ),
          ],):SizedBox(),
      ),
    );
  }
  Widget body(Size size){
    Widget child;
    switch (widget.screen) {
      case "Student Fees Status":
      child = StudentFeesTile(
      sNo: 1,
      studentName: "Ankit Sharma",
      status: "Paid",
      amount: 15000,
      );
      break;

      case "Student Attendance":
     child= StudentAttendanceTile(
      studentName: 'Ankit Sharma',
      sNo: 1,
      profilePic: '',
      );
      break;

      case "Report Card":
     child= Column(
       children: [

         TabBar(
          controller: tabBarController,
          dividerColor: Colors.transparent,
          tabs: [
          Text(
          "View",
          style: GoogleFonts.openSans(
          fontSize: size.width * 0.055,
          color: Colors.black,
          ),
          ),
          Text(
          "Upload",
          style: GoogleFonts.openSans(
          fontSize: size.width * 0.055,
          color: Colors.black,
          ),
          ),
          ],
          ),
         SizedBox(height: size.height*0.02,),
         dropDownButton(size),
         SizedBox(height: size.height*0.02,),
         SizedBox(
           height: size.height*0.09*16,
           child: TabBarView(
               controller: tabBarController,
               children: [
                     Column(
                       children: [
                         showAttributes(size),
                         ListView.builder(
                           itemCount: 15,
                           shrinkWrap: true,
                           physics: NeverScrollableScrollPhysics(),
                           itemBuilder: (context, index) {
                             return StudentReportTile(sNo: index+1, studentName: "Ankit Sharma", totalMark: 1000, gpa: 9.5, obtainedMark: 950);
                           },),
                       ],
                     ),
                 Column(
                   children: [
                     showAttributes(size),
                     ListView.builder(
                       itemCount: 15,
                       shrinkWrap: true,
                       physics: NeverScrollableScrollPhysics(),
                       itemBuilder: (context, index) {
                         final TextEditingController totalMarks=TextEditingController();
                         final TextEditingController obtainedMarks=TextEditingController();
                         return UploadReportTile(studentName: "Ankit Sharma", totalMarks: totalMarks, obtainedMarks: obtainedMarks, sRollNo: index+1,);
                       },),
                   ],
                 ),

               ]
           ),
         )
       ],
     );
      break;

      case "Note Book Record":
     child= StudentNoteBookRecord(
      sNo: 1,
      studentName: 'Ankit Sharma',
      check: true,
      );
      break;

      default:
      child=SizedBox(); // Return an empty SizedBox for default case
      };
    return child;

  }
}
