import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/StudentApi.dart';

import 'package:untitled/utils/theme.dart';

import '../../../APIs/Teacher Module/ClassActivity/resultAPI.dart';

class ReportCardOpen extends StatefulWidget {
  const ReportCardOpen({super.key, required this.email});
  final String email;

  @override
  State<ReportCardOpen> createState() => _ReportCardOpenState();
}

class _ReportCardOpenState extends State<ReportCardOpen> {
  String? _selectTerm ="Term 1";
  List<String> termOption = [
    'Term 1',
    'Half Yearly',
    'Term 2',
    'Final',
  ];
  CustomTheme themeObj=CustomTheme();
  ResultApi apiObj=ResultApi();
  StudentApi stdObj=StudentApi();
  ScrollController scrolController =ScrollController();
  List<dynamic>? Final;
  List<dynamic>? finalCoScholastic;
  List<dynamic>? halfYearly;
  List<dynamic>? halfYearlyCoScholastic;
  List<dynamic>? term1;
  List<dynamic>? term1CoScholastic;
  List<dynamic>? term2;
  List<dynamic>? term2CoScholastic;
  bool isLoading=false;

  List<dynamic> studentDetail=[];

  Future<void> fetchResultData() async {
    setState(() {
      isLoading=true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final resultData = await apiObj.fetchResult(accessToken!, widget.email);
      print("result data $resultData");
      if(resultData.isNotEmpty && resultData!=null){
       setState(() {
         Final =resultData["final"]!=[]?resultData["final"] :[];
         finalCoScholastic =resultData["final_Co_scholastic"]!=[]? resultData["final_Co_scholastic"]:[];
         halfYearly =resultData["halfYearly"]!=[] ?resultData["halfYearly"] :[];
         halfYearlyCoScholastic =resultData["halfYearly_Co_scholastic"]!=[] ? resultData["halfYearly_Co_scholastic"]: [];
         term1 =resultData["term1"]!=[]? resultData["term1"]:[];
         term1CoScholastic =resultData["term1_Co_scholastic"]!=[]? resultData["term1_Co_scholastic"]:[];
         term2 =resultData["term2"]!=[] ? resultData["term2"]:[];
         term2CoScholastic =resultData["term2_Co_scholastic"]!=[]?resultData["term2_Co_scholastic"]: [];
       });

      }

    } catch (e) {
      print('Error loading  result data: $e');
      setState(() {

      });
    }finally{
      setState(() {
        isLoading=false;
      });
    }
  }

  Future<void> fetchStudentDetails() async {
    setState(() {
      isLoading=true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      List<dynamic> student = await stdObj.fetchSingleUser(accessToken!,widget.email);

      if(student.isNotEmpty){

        setState(() {
          studentDetail =student;
        });
      }

    } catch (e) {
      print('Error loading student data: $e');
    }finally{
      setState(() {
        isLoading=false;
      });
    }
  }

  String calculateRange(double totalMark){
    if(totalMark>=91 && totalMark<=100){
      return "A1";
    }else if(totalMark>=81 && totalMark<=90){

      return "A2";
    }else if(totalMark>=71 && totalMark<=80){
      return "B1";
    }
    else if(totalMark>=61 && totalMark<=70){
      return "B2";
    }else if(totalMark>=51 && totalMark<=60){
      return   "C1";
    }
    else if(totalMark>=41 && totalMark<=50){
      return   "C2";
    }
    else if(totalMark>=33 && totalMark<=40){
      return   "D";
    }else if(totalMark<32 && totalMark>0){
      return "E";
    }
    else{
      return " ";
    }

  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchResultData();
    fetchStudentDetails();
  }
  @override
  Widget build(BuildContext context) {
    print("student $studentDetail");
    print("final $Final");
    print("final_Co_scholastic $finalCoScholastic");
    print("halfYearly $halfYearly");
    print("halfYearly_Co_scholastic $halfYearlyCoScholastic");
    print("term1 $term1");
    print("term1_Co_scholastic $term1CoScholastic");
    print("term2 $term2");
    print("term2_Co_scholastic $term2CoScholastic");
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Student Report Card",
          style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w500,
            fontSize: size.width * 0.05,
          ),
        ),
      ),
      body:  isLoading
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      )
          : SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child:   isLoading ?Center(
              child: LoadingAnimationWidget.threeArchedCircle(
                color: themeObj.primayColor,
                size: 50,
              ),
            ):Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    SizedBox(
                      width: size.width*0.6,
                      child: AutoSizeText(
                        '${studentDetail[0]["name"] ?? "Name"} Progress Report',overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.openSans(
                          color: themeObj.textBlack,
                          fontWeight: FontWeight.w500,
                          fontSize: size.width * 0.035,
                        ),
                      ),
                    ),
                    Card(
                      child: SizedBox(
                        width: size.width*0.3,
                        height: size.height*0.055,
                        child: DropdownButton<String>(
                          isExpanded: true,
                          borderRadius: BorderRadius.circular(12),
                          hint: const Text("Term",),
                          alignment: Alignment.center,
                          padding: const EdgeInsets.all(8),
                          icon: const Icon(Icons.keyboard_arrow_down_sharp),
                          underline: Container(),
                          value: _selectTerm,
                          onChanged: (newValue) {
                            setState(() {
                              _selectTerm = newValue!;
                            });
                          },
                          items: termOption.map((String option) {
                            return DropdownMenuItem<String>(
                              value: option,
                              child: Text(option,overflow: TextOverflow.ellipsis,),
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                  ],
                ),
             Column(
                 children: [
                   _buildHeaderCard(size),
                   SizedBox(height: size.height*0.02),
                   _buildScholasticCard(size),
                   SizedBox(height: size.height*0.02),
                   _buildCoScholasticCard(size),
                   SizedBox(height: size.height*0.02),
                   _buildAttendanceCard(size),
                   SizedBox(height: size.height*0.02),
                   _buildRemarkCard(size),
                   SizedBox(height: size.height*0.02),
                   _buildScholasticMarkRangeCard(size),
                   SizedBox(height: size.height*0.02),
                   _buildCoScholasticMarkRangeCard(size),
                 ],
               )
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeaderCard(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
           decoration: const BoxDecoration(
             color: Color.fromRGBO(153,246,228,1),
             border: Border(bottom: BorderSide(color: Colors.black)),
             borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
           ),
            child: Center(
              child: Text(
                '$_selectTerm : 2024-25',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
         Padding(
           padding: const EdgeInsets.symmetric(horizontal: 8.0),
           child: Column(
             children: [
               _buildInfoRow('Student\'s Name', studentDetail.isNotEmpty ? (studentDetail[0]["name"] ?? "N/A") : "N/A"),
               _buildInfoRow('Father\'s Name', studentDetail.isNotEmpty ? (studentDetail[0]["fatherName"] ?? "N/A") : "N/A"),
               _buildInfoRow('Mother\'s Name', studentDetail.isNotEmpty ? (studentDetail[0]["motherName"] ?? "N/A") : "N/A"),
               _buildInfoRow('Admission No.', studentDetail.isNotEmpty ? (studentDetail[0]["oldAdmissionNumber"] ?? "N/A") : "N/A"),
               _buildInfoRow('Class & Section', studentDetail.isNotEmpty ? "${studentDetail[0]["currentClass"] ?? "N/A"} ${studentDetail[0]["section"] ?? "N/A"}" : "N/A"),
               _buildInfoRow('Date of Birth', studentDetail.isNotEmpty ? (studentDetail[0]["DOB"] ?? "N/A") : "N/A"),
             ],
           ),
         )
        ],
      ),
    );
  }

  Widget _buildScholasticCard(Size size) {
    List<dynamic> currentTermData = [];
    if (_selectTerm == "Term 1" && term1 != null) {
      currentTermData = term1!;
    } else if (_selectTerm == "Half Yearly" && halfYearly != null) {
      currentTermData = halfYearly!;
    } else if (_selectTerm == "Term 2" && term2 != null) {
      currentTermData = term2!;
    } else if (_selectTerm == "Final" && Final != null) {
      currentTermData = Final!;
    }
    String getColumnLabel(String baseLabel, String dataKey) {
      if (currentTermData.isNotEmpty && currentTermData[0].containsKey(dataKey)) {
        return '$baseLabel\n(${currentTermData[0][dataKey] ?? ""})';
      }
      return baseLabel;
    }
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
            decoration: const BoxDecoration(
                color: Color.fromRGBO(153,246,228,1),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
            ),
            child: Center(
              child: Text(
                'Scholastic Areas',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Scrollbar(
           trackVisibility: true,
            thumbVisibility: true,
            controller: scrolController,
            thickness: 6.0,
            radius: const Radius.circular(10.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                border: TableBorder.all(),
                columns:  [
                  const DataColumn(label: Text('Subject')),
                  DataColumn(label: Text(getColumnLabel('Note Book', 'totalNoteBookMarks'), textAlign: TextAlign.center)),
                  DataColumn(label: Text(getColumnLabel('S.Enrichment', 'totalSubjectEnrichmentMarks'))),
                  DataColumn(label: Text(getColumnLabel('Marks Obt', 'marksObtained'))),
                  DataColumn(label: Text(getColumnLabel('Total', 'totalMarks'))),
                  const DataColumn(label: Text('%')),
                  const DataColumn(label: Text('Grade')),
                ],
                rows:currentTermData.map((item) {
                  int noteBook = item['obtainedNoteBookMarks'] ?? 0;
                  int enrichment = item['obtainedSubjectEnrichmentMarks'] ?? 0;
                  int marksObtained = item['marksObtained'] ?? 0;
                  int obtainedTotal = noteBook + enrichment + marksObtained;
                  int totalMarks=item["totalPracticalMarks"]+item["totalNoteBookMarks"]+item["totalSubjectEnrichmentMarks"];
            
                  double percentage = (obtainedTotal / totalMarks) * 100;
            
                  return DataRow(cells: [
                    DataCell(Text(item['subject']?.toString() ?? '')),
                    DataCell(Text(noteBook.toString())),
                    DataCell(Text(enrichment.toString())),
                    DataCell(Text(marksObtained.toString())),
                    DataCell(Text(obtainedTotal.toString())),
                    DataCell(Text(percentage.toStringAsFixed(2))),
                    DataCell(Text(calculateRange(percentage))),
                  ]);
                }).toList()
                   ,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCoScholasticCard(Size size) {
    List<dynamic> currentTermData = [];
    if (_selectTerm == "Term 1" && term1 != null) {
      currentTermData = term1CoScholastic!;
    } else if (_selectTerm == "Half Yearly" && halfYearly != null) {
      currentTermData = halfYearlyCoScholastic!;
    } else if (_selectTerm == "Term 2" && term2 != null) {
      currentTermData = term2CoScholastic!;
    } else if (_selectTerm == "Final" && Final != null) {
      currentTermData = finalCoScholastic!;
    }
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
            decoration: const BoxDecoration(
                color: Color.fromRGBO(153,246,228,1),
                border: Border(bottom: BorderSide(color: Colors.black)),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
            ),
            child: Center(
              child: Text(
                'Co-Scholastic Areas',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          SizedBox(height: size.height*0.003),
         Padding(
           padding: const EdgeInsets.symmetric(horizontal: 8.0),
           child: Column(
             children: [
               currentTermData.isEmpty
                   ? Center(child: Text("No co-scholastic data available for this term"))
                   :ListView.builder(
                 shrinkWrap: true,
                   itemCount: currentTermData.length,
                 itemBuilder: (context, index) {
                     final coScholastic=currentTermData[index];
                   return _buildInfoRow(coScholastic["subject"], coScholastic["grade"]);
                 },

               )

             ],
           ),
         )
        ],
      ),
    );
  }

  Widget _buildAttendanceCard(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
            decoration: const BoxDecoration(
                color: Color.fromRGBO(153,246,228,1),
                border: Border(bottom: BorderSide(color: Colors.black)),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
            ),
            child: Center(
              child: Text(
                'Attendance',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          SizedBox(height: size.height*0.003),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Column(
              children: [
                _buildInfoRow('Total', '100'),
                _buildInfoRow('Present', '80'),
                _buildInfoRow('Percentage', '80%'),
              ],
            ),
          )

        ],
      ),
    );
  }

  Widget _buildRemarkCard(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
            decoration: const BoxDecoration(
                color: Color.fromRGBO(153,246,228,1),
                border: Border(bottom: BorderSide(color: Colors.black)),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
            ),
            child: Center(
              child: Text(
                'Remark',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          SizedBox(height: size.height*0.003),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Column(
              children: [
                _buildInfoRow('ClassTeacher', 'Ankit Sharma'),
                _buildInfoRow('Coordinator', 'Abhishek'),
                _buildInfoRow('Principal', 'xyz'),
              ],
            ),
          )

        ],
      ),
    );
  }

  Widget _buildScholasticMarkRangeCard(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
            decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.black)),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
            ),
            child: Center(
              child: Text(
                'Scholastic ',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          SizedBox(height: size.height*0.003),
          Container(
            color: const Color.fromRGBO(153,246,228,1),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Mark Range",style: GoogleFonts.openSans(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,

                  ),),
                  Text("Grade",style: GoogleFonts.openSans(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w400,
                    fontSize: size.width * 0.035,
                  ),),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Column(
              children: [
                _buildInfoRow('91-100', 'A1'),
                _buildInfoRow('81-90', 'A2'),
                _buildInfoRow('71-100', 'B1'),
                _buildInfoRow('61-100', 'B2'),
                _buildInfoRow('51-100', 'C1'),
                _buildInfoRow('41-100', 'C2'),
                _buildInfoRow('31-40', 'D'),
                _buildInfoRow('32 & below', 'E'),


              ],
            ),
          )

        ],
      ),
    );
  }

  Widget _buildCoScholasticMarkRangeCard(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height*0.05,
            decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.black)),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))
            ),
            child: Center(
              child: Text(
                'Co-Scholastic And Discipline ',
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          SizedBox(height: size.height*0.003),
          Container(
            color: const Color.fromRGBO(153,246,228,1),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("PERFORMANCE INDICATORS",style: GoogleFonts.openSans(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,

                  ),),
                  Text("GRADE",style: GoogleFonts.openSans(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w400,
                    fontSize: size.width * 0.035,
                  ),),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Column(
              children: [
                _buildInfoRow('OUTSTANDING', 'A'),
                _buildInfoRow('VERY GOOD', 'B'),
                _buildInfoRow('FAIR', 'C'),



              ],
            ),
          )

        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value,) {
    Size size = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label,style: GoogleFonts.openSans(
        color: themeObj.textBlack,
        fontWeight: FontWeight.w600,
        fontSize: size.width * 0.035,

      ),),
          Text(value,overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w400,
            fontSize: size.width * 0.035,
          ),),
        ],
      ),
    );
  }


}