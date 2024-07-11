import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/Classs%20Activity/studentAttendance/previousMonth.dart';
import 'package:untitled/utils/utils.dart';
import '../../../APIs/StudentsData/student.dart';
import '../../../APIs/Teacher Module/ClassActivty/StudentAttendanceAPI.dart';
import '../../../utils/theme.dart';

class StudentAttendance extends StatefulWidget {
  const StudentAttendance({Key? key}) : super(key: key);

  @override
  _StudentAttendanceState createState() => _StudentAttendanceState();
}

class _StudentAttendanceState extends State<StudentAttendance> {
  CustomTheme themeObj = CustomTheme();
  List<Student> students = [];
  bool isLoading = true;
  StudentService _studentService = StudentService();

  @override
  void initState() {
    super.initState();
    fetchStudentData();
  }

  Future<void> fetchStudentData() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      String date = DateTime.now().toIso8601String().split('T')[0];
      List<Student> fetchedStudents = await _studentService.fetchStudents(date, 8, 13, accessToken);
      print('Fetched students: $fetchedStudents');

      setState(() {
        students = fetchedStudents;
      });
      print('Students after setState: $students');
    } catch (e) {
      print('Error fetching student data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load students. Please try again.')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
  Future<void> markAttendance() async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      List<Map<String, String>> studentAttendance = students.map((student) {
        String status = 'Present';
        if (student.selectedAttendance == 'A') {
          status = 'Absent';
        } else if (student.selectedAttendance == 'L') {
          status = 'Leave';
        }
        return {
          'email': student.email,
          'status': status,
        };
      }).toList();
        print(studentAttendance);
      String date = DateTime.now().toIso8601String().split('T')[0]; // Current date in YYYY-MM-DD format

      bool success = await _studentService.markAttendance(accessToken, date, studentAttendance);

      if (success) {
       showGreenSnackBar("Attendance marked successfully", context);
      } else {
        throw Exception('Failed to mark attendance');
      }
    } catch (e) {
      print('Error marking attendance: $e');
     showRedSnackBar("Failed to mark attendance. Please try again.", context);
    }
  }

  @override
  Widget build(BuildContext context) {
    print('Building StudentAttendance widget');
    print('Number of students: ${students.length}');
    print('Students: $students');

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      // appBar: AppBar(
      //   backgroundColor: themeObj.primayColor,
      //   leading: IconButton(
      //     icon: Icon(Icons.arrow_back_ios_new, color: Colors.black),
      //     onPressed: () {
      //       Navigator.pop(context);
      //     },
      //   ),
      //   title: Text(
      //     "Student Attendance",
      //     style: GoogleFonts.openSans(
      //       color: themeObj.textBlack,
      //       fontWeight: FontWeight.w600,
      //       fontSize: size.width * 0.05,
      //     ),
      //   ),
      //   actions: [
      //     SizedBox(
      //       width: size.width*0.3,
      //       child: TextButton(onPressed: (){
      //         Navigator.push(context, MaterialPageRoute(builder: (context) => PreviousStudentAttendanceRecords()));
      //
      //       },
      //         style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(233,213,255,1)),
      //         child:Row(
      //           children: [
      //             Icon(Icons.history),
      //             SizedBox(width: size.width*0.02,),
      //             Text("History ",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.036),),
      //
      //           ],
      //         ),),
      //     )
      //
      //   ],
      // ),
      body: isLoading
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      )
          : ListView.builder(
        padding: const EdgeInsets.all(8.0),
        itemCount: students.length,
        itemBuilder: (context, index) {
          final student = students[index];
          return StudentContainer(
            student: student,
            size: size,
            themeObj: themeObj,
          );
        },
      ),
        floatingActionButton:  SizedBox(
          width: size.width*0.3,
          child: TextButton(onPressed: (){
          markAttendance();
          },
            style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(233,213,255,1)),
            child:Row(
              children: [

                Icon(Icons.add,color: themeObj.textBlack,),
                SizedBox(width: size.width*0.02,),
                Text("Mark ",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.036),),

              ],
            ),),
        )
    );
  }
}

class StudentContainer extends StatefulWidget {
  final Student student;
  final Size size;
  final CustomTheme themeObj;

  const StudentContainer({
    Key? key,
    required this.student,
    required this.size,
    required this.themeObj,
  }) : super(key: key);

  @override
  _StudentContainerState createState() => _StudentContainerState();
}

class _StudentContainerState extends State<StudentContainer> {
  late String selectedAttendance;

  @override
  void initState() {
    super.initState();
    selectedAttendance = widget.student.leave ? 'L' : '';
  }

  void updateAttendance(String attendance) {
    setState(() {
      selectedAttendance = attendance;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 6,
            spreadRadius: 1,
          ),
        ],
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: widget.size.width * 0.08,
            backgroundImage: NetworkImage(widget.student.profileLink),
          ),
          SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.student.name,
                  style: GoogleFonts.openSans(
                    color: widget.themeObj.textBlack,
                    fontSize: widget.size.width * 0.045,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  'Roll: ${widget.student.rollNumber}',
                  style: GoogleFonts.openSans(
                    color: widget.themeObj.textBlack,
                    fontSize: widget.size.width * 0.035,
                  ),
                ),
              ],
            ),
          ),
          AttendanceButton(
            label: 'P',
            color: Colors.green,
            size: widget.size,
            isSelected: selectedAttendance == 'P',
            onTap: () => updateAttendance('P'),
          ),
          AttendanceButton(
            label: 'A',
            color: Colors.blue,
            size: widget.size,
            isSelected: selectedAttendance == 'A',
            onTap: () => updateAttendance('A'),
          ),
          AttendanceButton(
            label: 'L',
            color: Colors.orange,
            size: widget.size,
            isSelected: selectedAttendance == 'L',
            onTap: () => updateAttendance('L'),
          ),
        ],
      ),
    );
  }
}

class AttendanceButton extends StatelessWidget {
  final String label;
  final Color color;
  final Size size;
  final bool isSelected;
  final VoidCallback onTap;

  AttendanceButton({
    required this.label,
    required this.color,
    required this.size,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4.0),
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: isSelected ? color : Colors.transparent,
            shape: BoxShape.circle,
            border: Border.all(color: color, width: 2.0),
          ),
          padding: EdgeInsets.all(size.width * 0.03),
          alignment: Alignment.center,
          child: Text(
            label,
            style: GoogleFonts.openSans(
              color: isSelected ? Colors.white : color,
              fontSize: size.width * 0.04,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}