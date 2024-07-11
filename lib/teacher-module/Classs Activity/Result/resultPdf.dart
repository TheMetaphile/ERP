import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:untitled/utils/theme.dart';

import '../../../APIs/StudentsData/StudentApi.dart';
import '../../../APIs/Teacher Module/ClassActivty/resultAPI.dart';

class ResultPdf extends StatefulWidget {
  const ResultPdf({super.key, required this.email});

  final String email;
  @override
  State<ResultPdf> createState() => _ResultPdfState();
}

class _ResultPdfState extends State<ResultPdf> {
  final ResultApi resultObj = ResultApi();
  Student? student;
  StudentApi studentObj=StudentApi();
  Map<String,dynamic>? result;
  List<dynamic>? term1Result;
  List<dynamic>? term2Result;

  @override
  void initState() {
    super.initState();
    _loadStudentData();
    fetchResultData();
  }
  Future<void> _loadStudentData() async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final loadedStudent = await studentObj.fetchStudentData(accessToken!, widget.email);
      setState(() {
        student = loadedStudent;

      });
    } catch (e) {
      print('Error loading student data: $e');
      setState(() {

      });
    }
  }
  Future<void> fetchResultData() async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final resultData = await resultObj.fetchResult(accessToken!, widget.email);
      print(resultData["term1"].runtimeType);

      setState(() {
      result=resultData;
        term1Result=resultData?["term1"];
        term2Result=resultData?["term2"];
      });
    } catch (e) {
      print('Error loading student data: $e');
      setState(() {

      });
    }
  }

  CustomTheme themeObj=CustomTheme();


  var totalMarkTerm1=0;
  var markObtainedTerm1=0;
  var totalMarkTerm2=0;
  var markObtainedTerm2=0;
  @override
  Widget build(BuildContext context) {
    print(result);
    int proxIndex=0;
   if(result!=null){
     for (var i = 0; i < term1Result!.length; i++) {
       var rep = term1Result![i];
       final a = rep["totalMarks"];
       final b = rep["marksObtained"];
       if (a != null && b != null) {
         if (a is int && b is int) {
           totalMarkTerm1 += a;
           markObtainedTerm1 += b;
         } else if (a is double && b is double) {
           totalMarkTerm1 += a.round();
           markObtainedTerm1 += b.round();
         } else if (a is String  && b is String) {
           totalMarkTerm1 += int.tryParse(a) ?? 0;
           markObtainedTerm1 += int.tryParse(b) ?? 0;
         }
       }
     }
     for (var i = 0; i < term2Result!.length; i++) {
       var rep = term2Result![i];
       final a = rep["totalMarks"];
       final b = rep["marksObtained"];
       if (a != null && b != null) {
         if (a is int && b is int) {
           totalMarkTerm2 += a;
           markObtainedTerm2 += b;
         } else if (a is double && b is double) {
           totalMarkTerm2 += a.round();
           markObtainedTerm2 += b.round();
         } else if (a is String  && b is String) {
           totalMarkTerm2 += int.tryParse(a) ?? 0;
           markObtainedTerm2 += int.tryParse(b) ?? 0;
         }
       }
     }
   }
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon:  Icon(Icons.arrow_back_ios,color: themeObj.textBlack,)),
        title: AutoSizeText(
            "Performance Profile",
          style: GoogleFonts.openSans(
            fontSize: 20,
            fontWeight: FontWeight.w500,
            color:  themeObj.textBlack,
          ),
        ),
      ),
      body: student == null? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      ): result == null && term1Result==null &&term2Result == null ? const Center(
        child: Text("Result is not Found"),
      ):Column(
        children: [
          Expanded(
            child: Container(
                width:size.width,
                decoration:BoxDecoration(
                  borderRadius: BorderRadius.only(topLeft: Radius.circular(size.width*0.08),topRight: Radius.circular(size.width*0.08)),
                  color:Colors.white,
                ),
                child: Padding(
                  padding: EdgeInsets.all(size.height*0.02),
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Card(
                              elevation: 5,
                              shape: const CircleBorder(eccentricity: 1),
                              child: CircleAvatar(
                                backgroundColor: Colors.transparent,
                                radius: size.width*0.1,
                                backgroundImage: AssetImage("assets/Images/school.png"),

                              ),
                            ),
                            SizedBox(
                              width: size.width*0.03,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                AutoSizeText(
                                    "Metaphile Public School",
                                  style: GoogleFonts.openSans(
                                    color: const Color.fromRGBO(103,135,214, 1),
                                    fontSize: size.width*0.05,
                                    fontWeight: FontWeight.w500
                                  ),
                                ),
                                AutoSizeText(
                                  "O-block, Ganga nagar",
                                  style: GoogleFonts.openSans(
                                      color: Colors.grey.shade600,
                                      fontSize: 15,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                                AutoSizeText(
                                  "Meerut-250001",
                                  style: GoogleFonts.openSans(
                                      color: Colors.grey.shade600,
                                      fontSize: 15,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.02,
                        ),
                        const Divider(
                          color: Color.fromRGBO(103,135,214, 1),
                          height: 2,
                          endIndent: 0,
                          indent: 0,
                          thickness: 2,

                        ),
                        Center(
                          child: AutoSizeText(
                            "Performance Profile",
                            style: GoogleFonts.openSans(
                                color: const Color.fromRGBO(3,46,102, 1),
                                fontSize: 27,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color.fromRGBO(103,135,214, 1),
                          height: 2,
                          endIndent: 0,
                          indent: 0,
                          thickness: 2,

                        ),
                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.02,
                            ),
                            Card(
                              elevation: 5,
                              shape: const CircleBorder(eccentricity: 1),
                              child: CircleAvatar(
                                backgroundColor: Colors.transparent,
                                radius: size.width*0.07,
                                backgroundImage: NetworkImage(student?.profileLink ?? 'https://example.com/default-profile-pic.jpg'),
                              ),

                              ),
                            SizedBox(
                              width: size.width*0.05,
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                AutoSizeText(
                                  student!.name,
                                  style: GoogleFonts.openSans(
                                      color: Colors.black,
                                      fontSize: 22,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                                AutoSizeText(
                                  "${student?.currentClass} ${student?.section}",
                                  style: GoogleFonts.openSans(
                                      color: Colors.grey.shade600,
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Roll Number",
                              style: GoogleFonts.openSans(
                                fontWeight: FontWeight.w500,
                                fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                student!.rollNumber,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                  color: Colors.grey.shade700
                                ),
                                  maxLines: 1,
                              ),
                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Divider(
                          color: Colors.grey.shade400,
                          height: 1,
                          endIndent: 0,
                          indent: 0,
                          thickness: 1,
                        ),
                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Class ",
                              style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                student!.currentClass,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                                maxLines: 1,
                              ),
                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Divider(
                          color: Colors.grey.shade400,
                          height: 1,
                          endIndent: 0,
                          indent: 0,
                          thickness: 1,
                        ),
                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Date of Birth",
                              style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                  student!.dob,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                                maxLines: 1,
                              ),

                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Divider(
                          color: Colors.grey.shade400,
                          height: 1,
                          endIndent: 0,
                          indent: 0,
                          thickness: 1,
                        ),

                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Blood Group",
                              style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                student!.bloodGroup,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                                maxLines: 1,
                              ),

                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Divider(
                          color: Colors.grey.shade400,
                          height: 1,
                          endIndent: 0,
                          indent: 0,
                          thickness: 1,
                        ),

                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Contact Number",
                              style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                student!.fatherPhoneNumber,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                                maxLines: 1,
                              ),
                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Divider(
                          color: Colors.grey.shade400,
                          height: 1,
                          endIndent: 0,
                          indent: 0,
                          thickness: 1,
                        ),

                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Father's Name",
                              style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                student!.fatherName,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                                maxLines: 1,
                              ),
                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Divider(
                          color: Colors.grey.shade400,
                          height: 1,
                          endIndent: 0,
                          indent: 0,
                          thickness: 1,
                        ),

                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          children: [
                            SizedBox(
                              width: size.width*0.01,
                            ),
                            AutoSizeText(
                              "Mother's Name",
                              style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                              ),
                            ),
                            Expanded(child: SizedBox(),),
                            SizedBox(
                              width: size.width*0.38,
                              child: AutoSizeText(
                                student!.motherName,
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                                maxLines: 1,
                              ),
                            )
                          ],
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),

                        SizedBox(
                          height: size.height*0.02,
                        ),
                        const Divider(
                          color: Color.fromRGBO(103,135,214, 1),
                          height: 2,
                          endIndent: 0,
                          indent: 0,
                          thickness: 2,

                        ),
                        Center(
                          child: AutoSizeText(
                            "Attendance",
                            style: GoogleFonts.openSans(
                                color: const Color.fromRGBO(3,46,102, 1),
                                fontSize: 27,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color.fromRGBO(103,135,214, 1),
                          height: 2,
                          endIndent: 0,
                          indent: 0,
                          thickness: 2,

                        ),

                        SizedBox(
                          height: size.height*0.01,
                        ),
                        AutoSizeText(
                          "Term I",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                        Card(
                          color: Colors.greenAccent.shade100,
                          child: SizedBox(
                            height: size.height*0.08,
                            width: size.width,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                AutoSizeText(
                                  "$markObtainedTerm1 / $totalMarkTerm1",
                                  style: GoogleFonts.openSans(
                                      color: Colors.green.shade900,
                                      fontSize: 22,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                                AutoSizeText(
                                  "Total attendance of the students",
                                  style: GoogleFonts.openSans(
                                      color: Colors.green.shade900,
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        SizedBox(
                          height: size.height*0.01,
                        ),
                        AutoSizeText(
                          "Term II",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                        Card(
                          color: Colors.greenAccent.shade100,
                          child: SizedBox(
                            height: size.height*0.08,
                            width: size.width,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                AutoSizeText(
                                  "$markObtainedTerm2 / $totalMarkTerm2",
                                  style: GoogleFonts.openSans(
                                      color: Colors.green.shade900,
                                      fontSize: 22,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                                AutoSizeText(
                                  "Total attendance of the students",
                                  style: GoogleFonts.openSans(
                                      color: Colors.green.shade900,
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        SizedBox(
                          height: size.height*0.02,
                        ),
                        const Divider(
                          color: Color.fromRGBO(103,135,214, 1),
                          height: 2,
                          endIndent: 0,
                          indent: 0,
                          thickness: 2,

                        ),
                        Center(
                          child: AutoSizeText(
                            "Academic Performance",
                            style: GoogleFonts.openSans(
                                color: const Color.fromRGBO(3,46,102, 1),
                                fontSize: 25,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color.fromRGBO(103,135,214, 1),
                          height: 2,
                          endIndent: 0,
                          indent: 0,
                          thickness: 2,

                        ),

                        SizedBox(
                          height: size.height*0.01,
                        ),
                        AutoSizeText(
                          "Term I",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Card(
                          elevation: 5,
                          color: Colors.white,
                          margin: EdgeInsets.all(0),
                          shape: OutlineInputBorder(borderRadius: BorderRadius.circular(6),borderSide: BorderSide(color: Colors.white)),
                          child:Column(
                            children:
                                [
                            Row(
                                children: [
                                  Container(
                                    width: size.width*0.3,
                                    height: size.height*0.05,
                                    decoration: const BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.only(topLeft: Radius.circular(15))
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.only(top: 12.0,left: 12),
                                      child: AutoSizeText(
                                        "Subject",
                                        style: GoogleFonts.openSans(
                                            color: Colors.black,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w500
                                        ),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  Container(
                                    color: const Color.fromRGBO(180, 230, 238, 1),
                                    width: size.width*0.28,
                                    height: size.height*0.05,
                                    child: Center(
                                      child: AutoSizeText(
                                        "Total Marks",
                                        style: GoogleFonts.openSans(
                                            color: Colors.black,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w500
                                        ),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  Container(

                                    width: size.width*0.32,
                                    height: size.height*0.05,
                                    decoration: const BoxDecoration(
                                        color: Colors.green,
                                        borderRadius: BorderRadius.only(topRight: Radius.circular(15))
                                    ),
                                    child: SizedBox(
                                      width: size.width*0.38,

                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 10.0),
                                        child: AutoSizeText(
                                          "Obtained Marks",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                            ),
                              ListView.builder(
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemCount: term1Result?.length,
                                itemBuilder: (context, index) {
                                  final subjectMark=term1Result?[index];
                                  print(subjectMark["subject"]);
                                return    Row(
                                  children: [
                                    Container(
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      decoration: const BoxDecoration(
                                          color: Colors.white,

                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          subjectMark!["subject"].toString(),overflow: TextOverflow.ellipsis,
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: const Color.fromRGBO(180, 230, 238, 1),
                                      width: size.width*0.28,
                                      height: size.height*0.05,
                                      child: Center(
                                        child: AutoSizeText(
                                          subjectMark!["totalMarks"].toString(),
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(

                                      width: size.width*0.32,
                                      height: size.height*0.05,
                                      decoration: const BoxDecoration(
                                          color: Colors.green,

                                      ),
                                      child: SizedBox(
                                        width: size.width*0.38,

                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 10.0),
                                          child: AutoSizeText(
                                            subjectMark!["marksObtained"].toString(),
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                            textAlign: TextAlign.center,
                                          ),
                                        ),
                                      ),
                                    ),

                                  ],
                                );
                              },),
                            ],
                          ),),
                        AutoSizeText(
                          "Term II",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Card(
                          elevation: 5,
                          color: Colors.white,
                          shape: OutlineInputBorder(borderRadius: BorderRadius.circular(6),borderSide: BorderSide(color: Colors.white)),
                          margin: EdgeInsets.all(0),
                          child:Column(
                            children:
                            [
                              Row(
                                children: [
                                  Container(
                                    width: size.width*0.3,
                                    height: size.height*0.05,
                                    decoration: const BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.only(topLeft: Radius.circular(15))
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.only(top: 12.0,left: 12),
                                      child: AutoSizeText(
                                        "Subject",
                                        style: GoogleFonts.openSans(
                                            color: Colors.black,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w500
                                        ),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  Container(
                                    color: const Color.fromRGBO(180, 230, 238, 1),
                                    width: size.width*0.28,
                                    height: size.height*0.05,
                                    child: Center(
                                      child: AutoSizeText(
                                        "Total Marks",
                                        style: GoogleFonts.openSans(
                                            color: Colors.black,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w500
                                        ),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  Container(

                                    width: size.width*0.32,
                                    height: size.height*0.05,
                                    decoration: const BoxDecoration(
                                        color: Colors.green,
                                        borderRadius: BorderRadius.only(topRight: Radius.circular(15))
                                    ),
                                    child: SizedBox(
                                      width: size.width*0.38,

                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 10.0),
                                        child: AutoSizeText(
                                          "Obtained Marks",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              ListView.builder(
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemCount: term2Result?.length,
                                itemBuilder: (context, index) {
                                  final subjectMark=term2Result?[index];
                                  print(subjectMark["subject"]);
                                  return    Row(
                                    children: [
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                          color: Colors.white,

                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            subjectMark!["subject"].toString(),overflow: TextOverflow.ellipsis,
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: const Color.fromRGBO(180, 230, 238, 1),
                                        width: size.width*0.28,
                                        height: size.height*0.05,
                                        child: Center(
                                          child: AutoSizeText(
                                            subjectMark!["totalMarks"].toString(),
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(

                                        width: size.width*0.32,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                          color: Colors.green,

                                        ),
                                        child: SizedBox(
                                          width: size.width*0.38,

                                          child: Padding(
                                            padding: const EdgeInsets.only(top: 10.0),
                                            child: AutoSizeText(
                                              subjectMark!["marksObtained"].toString(),
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        ),
                                      ),

                                    ],
                                  );
                                },),
                            ],
                          ),),

                        SizedBox(
                          height: size.height*0.01,
                        ),
                        AutoSizeText(
                          "Final",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Card(
                          elevation: 5,
                          color: Colors.white,
                          shape: OutlineInputBorder(borderRadius: BorderRadius.circular(6),borderSide: BorderSide(color: Colors.white)),
                          margin: EdgeInsets.all(0),
                          child:Column(
                            children:
                            [
                              Row(
                                children: [
                                  Container(
                                    width: size.width*0.3,
                                    height: size.height*0.05,
                                    decoration: const BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.only(topLeft: Radius.circular(15))
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.only(top: 12.0,left: 12),
                                      child: AutoSizeText(
                                        "Subject",
                                        style: GoogleFonts.openSans(
                                            color: Colors.black,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w500
                                        ),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  Container(
                                    color: const Color.fromRGBO(180, 230, 238, 1),
                                    width: size.width*0.28,
                                    height: size.height*0.05,
                                    child: Center(
                                      child: AutoSizeText(
                                        "Total Marks",
                                        style: GoogleFonts.openSans(
                                            color: Colors.black,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w500
                                        ),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  Container(

                                    width: size.width*0.32,
                                    height: size.height*0.05,
                                    decoration: const BoxDecoration(
                                        color: Colors.green,
                                        borderRadius: BorderRadius.only(topRight: Radius.circular(15))
                                    ),
                                    child: SizedBox(
                                      width: size.width*0.38,

                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 10.0),
                                        child: AutoSizeText(
                                          "Obtained Marks",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              ListView.builder(
                                physics: NeverScrollableScrollPhysics(),
                                shrinkWrap: true,
                                itemCount: term1Result!.length+term2Result!.length,
                                itemBuilder: (context, index) {

                                  Map? subjectMark;
                                  if(index<term1Result!.length){
                                     subjectMark=term1Result?[index];
                                  }else{
                                     subjectMark=term2Result?[proxIndex];
                                     proxIndex++;
                                  }

                                  return    Row(
                                    children: [
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                          color: Colors.white,

                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            subjectMark!["subject"].toString(),overflow: TextOverflow.ellipsis,
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: const Color.fromRGBO(180, 230, 238, 1),
                                        width: size.width*0.28,
                                        height: size.height*0.05,
                                        child: Center(
                                          child: AutoSizeText(
                                            subjectMark!["totalMarks"].toString(),
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(

                                        width: size.width*0.32,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                          color: Colors.green,

                                        ),
                                        child: SizedBox(
                                          width: size.width*0.38,

                                          child: Padding(
                                            padding: const EdgeInsets.only(top: 10.0),
                                            child: AutoSizeText(
                                              subjectMark!["marksObtained"].toString(),
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        ),
                                      ),

                                    ],
                                  );
                                },),
                            ],
                          ),),

                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Card(
                          elevation: 5,
                          color: Colors.green.shade50,

                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: AutoSizeText(
                              "Thanks for a fantastic year at school this year! it’s been awesome to see everyone grow and develop so much and our community has come together so wonderfully with all of our exciting new projects and activities. Hope you all have a fantastic summer - and looking forward to seeing everyone back in the fall.",
                              style: GoogleFonts.openSans(
                                  color: Colors.green,
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500
                              ),
                            ),
                          ),
                        ),

                        SizedBox(
                          height: size.height*0.01,
                        ),
                        AutoSizeText(
                          "- Bhuvneshwar Tyagi",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 20,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        AutoSizeText(
                          "   Principle",
                          style: GoogleFonts.openSans(
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.w500
                          ),
                        ),

                      ],
                    ),
                  ),
                )
            ),
          ),
        ],
      ),
    );
  }
}
