import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/StudentApi.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:untitled/admin-module/StudentPannel/studentEdit.dart';

import '../../utils/theme.dart';

class StudentDetail extends StatefulWidget {

  const StudentDetail({super.key,required this.email, });
 final String email;


  @override
  State<StudentDetail> createState() => _StudentDetailState();
}

class _StudentDetailState extends State<StudentDetail> {
  @override
  void initState() {
    super.initState();
    // fetchTeacherData();

  }
  Map<String, dynamic>? studentData;
  final studentApiobj=StudentApi();


  Future<void> fetchTeacherData() async {

    SharedPreferences pref=await SharedPreferences.getInstance();
    try {
      final accessToken = pref.getString("accessToken");
       final student = await studentApiobj.fetchStudentData(accessToken!, widget.email);
      setState(() {
        studentData=student as Map<String, dynamic>?;
      });
    } catch (e) {
      print('Error: $e');
    }finally{
      assign();
    }
  }
  List<List<String>> studentDetail=[];
  void assign(){
   studentDetail = [

    ['Name', studentData?["name"] ??""],
    ['Roll Number',studentData?["rollNumber"] ??""],
    ['Email',studentData?["email"] ??"" ],
    ['Class', studentData?["currentClass"] ??""],
    ['Section',studentData?["section"] ??" "],
    ['AadhaarNumber',studentData?["aadhaarNumber"] ??"" ],
    ['DOB',studentData?["DOB"] ??"" ],
    ['Gender',studentData?["gender"] ??"" ],
    ['Religion',studentData?["religion"] ??"" ],
    ['ProfileLink',studentData?["profileLink"] ??"" ],
    ['AcademicYear',studentData?["academicYear"] ??"" ],
    ['AdmissionClass',studentData?["admissionClass"] ??"" ],
    ['AdmissionDate',studentData?["admissionDate"] ??"" ],
    ['EmergencyContactNumber',studentData?["emergencyContactNumber"] ??"" ],
    ['OldAdmissionNumber',studentData?["oldAdmissionNumber"] ??"" ],
    ['FatherEmailId',studentData?["fatherEmailId"] ??"" ],
    ['MotherEmailId',studentData?["motherEmailId"] ??"" ],
    ['MotherName',studentData?["motherName"] ??"" ],
    ['FathersOccupation',studentData?["fathersOccupation"] ??"" ],
    ['MotherOccupation',studentData?["motherOccupation"] ??"" ],
    ['FatherPhoneNumber',studentData?["fatherPhoneNumber"] ??"" ],
    ['MotherPhoneNumber',studentData?["motherPhoneNumber"] ??"" ],
    ['PermanentAddress',studentData?["permanentAddress"] ??"" ],
    ['BloodGroup',studentData?["bloodGroup"] ??"" ],
    ['GuardiansName',studentData?["guardiansName"] ??"" ],
    ['GuardiansOccupation',studentData?["guardiansOccupation"] ??"" ],
    ['GuardiansPhoneNumber',studentData?["guardiansPhoneNumber"] ??"" ],
  ];
}
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    // if (studentData == null) {
    //   return  Scaffold(body:  Center(child: LoadingAnimationWidget.threeArchedCircle(
    //     color: Colors.blue,
    //     size: 100,
    //   )));
    // }
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon:  Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
        title:   Text("Student Details",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

      ),
      body:SingleChildScrollView(

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            FeesStatusCard(
              name: "Kabir Saxena",
              classInfo: "Pre-Nursery",
              rollNo: "undefined",
              totalFees: 14000,
              paidFees: 9000,
              pendingFees: 5000,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 12.0),
              child: Text(
                "All Details",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.only(left: 50.0),
              child: Text(
                'Swipe left and right to see all details',
                style: GoogleFonts.openSans(
                    fontStyle: FontStyle.italic,
                    color: Colors.grey[600],
                    fontSize: size.width * 0.035),
              ),
            ),
            SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Column(
                children: [
                  Container(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [

                        Table(
                          border: TableBorder.all(color: Colors.grey.shade300),
                          defaultColumnWidth: FixedColumnWidth(200),
                          children: [
                            _buildRow("Roll No.", "2", "Father Name", "Mr. Father"),
                            _buildRow("Class", "Pre-Nursery", "Mother Name", "Mrs. Mother"),
                            _buildRow("Date of Birth", "06-07-2022", "Father Phone Number", "9874561336"),
                            _buildRow("Admission Date", "06-07-2023", "Mother Phone Number", "9874561337"),
                            _buildRow("Registration Number", "", "Parent Email", "father@gmail.com"),
                            _buildRow("Permanent Address", "ABC colony", "Father Occupation", "Engineer"),
                            _buildRow("Academic Year", "", "Mother's Occupation", "Engineer"),
                            _buildRow("Aadhar Number", "123456805", "", ""),
                            _buildRow("Personal Email", "kabir.saxena@gmail.com", "", ""),
                            _buildRow("Emergency Contact", "123456805", "", ""),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      )
    );
  }

  TableRow _buildRow(String label1, String value1, String label2, String value2) {
    return TableRow(
      children: [
        _buildCell(label1, true),
        _buildCell(value1, false),
        _buildCell(label2, true),
        _buildCell(value2, false),
      ],
    );
  }

  Widget _buildCell(String text, bool isLabel) {
    return Container(
      padding: EdgeInsets.all(8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontWeight: isLabel ? FontWeight.bold : FontWeight.normal,
                color: isLabel ? Colors.blue : Colors.black,
              ),
            ),
          ),
          if (!isLabel) Icon(Icons.edit, size: 16, color: Colors.grey),
        ],
      ),
    );
  }

}
class FeesStatusCard extends StatelessWidget {
  final String name;
  final String classInfo;
  final String rollNo;
  final double totalFees;
  final double paidFees;
  final double pendingFees;

  const FeesStatusCard({
    Key? key,
    required this.name,
    required this.classInfo,
    required this.rollNo,
    required this.totalFees,
    required this.paidFees,
    required this.pendingFees,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "$name's Fees Status",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: Colors.grey[300],
                  child: Icon(Icons.person, size: 40, color: Colors.grey[600]),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(name, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      Text("Class $classInfo | Roll No. $rollNo", style: TextStyle(color: Colors.grey[600])),
                      SizedBox(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            flex: 2,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _buildFeeRow("Total Fees :-", totalFees, Colors.blue),
                                _buildFeeRow("Paid Fees :-", paidFees, Colors.green),
                                _buildFeeRow("Pending Fees :-", pendingFees, Colors.red),
                              ],
                            ),
                          ),
                          // Expanded(
                          //   flex: 1,
                          //   child: CustomPaint(
                          //     size: Size(80, 80),
                          //     painter: FeesProgressPainter(paidFees / totalFees),
                          //   ),
                          // ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeeRow(String label, double amount, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(
            "Rs. ${amount.toStringAsFixed(0)}",
            style: TextStyle(color: color, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}

class FeesProgressPainter extends CustomPainter {
  final double progress;

  FeesProgressPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width, size.height) / 2;

    final backgroundPaint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10;

    final progressPaint = Paint()
      ..color = Colors.green
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, backgroundPaint);

    final progressAngle = 2 * pi * progress;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -pi / 2,
      progressAngle,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
