import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/Classs%20Activity/studentAttendance/previousMonth.dart';
import 'package:untitled/utils/utils.dart';
import '../../../APIs/StudentsData/student.dart';
import '../../../APIs/Teacher Module/ClassActivity/StudentAttendanceAPI.dart';
import '../../../utils/theme.dart';

// class StudentAttendance extends StatefulWidget {
//   const StudentAttendance({Key? key}) : super(key: key);
//
//   @override
//   _StudentAttendanceState createState() => _StudentAttendanceState();
// }
//
// class _StudentAttendanceState extends State<StudentAttendance>  with SingleTickerProviderStateMixin{
//   CustomTheme themeObj = CustomTheme();
//   List<Student> students = [];
//   bool isLoading = true;
//   bool isLoadingMore = false;
//   StudentService _studentService = StudentService();
//   int start = 0;
//   final ScrollController _scrollController = ScrollController();
//
//
//
//   Future<void> fetchStudentData() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//       String date = DateTime.now().toIso8601String().split('T')[0];
//       List<Student> fetchedStudents = await _studentService.fetchStudents(date, accessToken,  start);
//       print('Fetched students: $fetchedStudents');
//
//       setState(() {
//         students = fetchedStudents;
//       });
//       print('Students after setState: $students');
//     } catch (e) {
//       print('Error fetching student data: $e');
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text('Failed to load students. Please try again. $e')),
//       );
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   bool allDataLoaded=false;
//   Future<void> fetchMoreStudentData() async {
//     if (isLoadingMore) return;
//     setState(() {
//       isLoadingMore = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//       String date = DateTime.now().toIso8601String().split('T')[0];
//       List<Student> fetchedStudents = await _studentService.fetchStudents(date,accessToken,  start + students.length);
//
//       int? previousLength=students.length;
//
//       students.addAll(fetchedStudents);
//
//       int? newLength=students.length;
//       if(newLength==previousLength){
//         allDataLoaded=true;
//       }
//
//     } catch (e) {
//       print('Error fetching more student data: $e');
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text('Failed to load more students. Please try again.')),
//       );
//     } finally {
//       setState(() {
//         isLoadingMore = false;
//       });
//     }
//   }
//
//   Future<void> markAttendance() async {
//     print(students.length);
//     for (var student in students) {
//       print("${student.name}: ${student.selectedAttendance}");
//     }
//     bool allStudentsMarked = students.every((student) => student.selectedAttendance.isNotEmpty);
//     print("All students marked: $allStudentsMarked");
//     if (!allStudentsMarked) {
//       showRedSnackBar("Please fill attendance for all students", context);
//       return;
//     }
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//
//       List<Map<String, String>> studentAttendance = students.map((student) {
//         String status = 'Present';
//         if (student.selectedAttendance == 'A') {
//           status = 'Absent';
//         } else if (student.selectedAttendance == 'L') {
//           status = 'Leave';
//         }
//         return {
//           'email': student.email,
//           'status': status,
//         };
//       }).toList();
//       print(studentAttendance);
//       String date = DateTime.now().toIso8601String().split('T')[0];
//
//       bool success = await _studentService.markAttendance(accessToken, date, studentAttendance);
//
//       if (success) {
//         showGreenSnackBar("Attendance marked successfully", context);
//       } else {
//         throw Exception('Failed to mark attendance');
//       }
//     } catch (e) {
//       print('Error marking attendance: $e');
//       showRedSnackBar("Failed to mark attendance. Please try again.", context);
//     }
//   }
//
//   late AnimationController _controller;
//   late Animation<double> _animation;
//
//   @override
//   void initState() {
//     super.initState();
//     fetchStudentData();
//     _scrollController.addListener(_scrollListener);
//     _controller = AnimationController(
//       duration: const Duration(milliseconds: 500),
//       vsync: this,
//     );
//     _animation = CurvedAnimation(
//       parent: _controller,
//       curve: Curves.easeInOut,
//     );
//   }
//
//   @override
//   void dispose() {
//     _scrollController.removeListener(_scrollListener);
//     _scrollController.dispose();
//     super.dispose();
//   }
//
//   void _scrollListener() {
//     if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
//       if(!allDataLoaded){
//         fetchMoreStudentData();
//       }
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     print('Building StudentAttendance widget');
//     print('Number of students: ${students.length}');
//     print('Students: $students');
//
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       body: isLoading
//           ? Center(
//         child: LoadingAnimationWidget.threeArchedCircle(
//           color: themeObj.primayColor,
//           size: 50,
//         ),
//       )
//           : Column(
//         crossAxisAlignment: CrossAxisAlignment.end,
//         children: [
//           SizedBox(
//             width: size.width * 0.5,
//             child: TextButton(
//               onPressed: () {
//                 Navigator.push(context, MaterialPageRoute(builder: (context) => PreviousStudentAttendanceRecords()));
//               },
//               style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(233, 213, 255, 1)),
//               child: Row(
//                 children: [
//                   Icon(Icons.history),
//                   SizedBox(width: size.width * 0.02),
//                   Text(
//                     "Attendance Record",
//                     style: GoogleFonts.openSans(
//                       color: themeObj.textBlack,
//                       fontWeight: FontWeight.w400,
//                       fontSize: size.width * 0.036,
//                     ),
//                   ),
//                 ],
//               ),
//             ),
//           ),
//           Expanded(
//             child: AnimationLimiter(
//
//               child: ListView.builder(
//                 controller: _scrollController,
//                 shrinkWrap: true,
//                 padding: const EdgeInsets.all(8.0),
//                 itemCount: students.length + 1,
//                 itemBuilder: (context, index) {
//                   if (index == students.length) {
//                     return isLoadingMore
//                         ? Center(
//                       child: LoadingAnimationWidget.threeArchedCircle(
//                         color: themeObj.primayColor,
//                         size: 30,
//                       ),
//                     )
//                         : SizedBox.shrink();
//                   }
//                   final student = students[index];
//                   return  AnimationConfiguration.staggeredList(
//                     position: index,
//                     duration: const Duration(milliseconds: 375),
//                     child: SlideAnimation(
//                       verticalOffset: 50.0,
//                       child: FadeInAnimation(
//                         child: StudentContainer(
//                           student: student,
//                           size: size,
//                           themeObj: themeObj,
//                           onAttendanceChanged: (newAttendance ) {
//                             setState(() {
//                               student.selectedAttendance = newAttendance;
//                             });
//                           },
//                         ),
//                       ),
//                     ),
//                   );
//                 },
//               ),
//             ),
//           ),
//         ],
//       ),
//
//
//       floatingActionButton: SizedBox(
//         width: size.width * 0.3,
//         child: TextButton(
//           onPressed: () {
//             markAttendance();
//           },
//           style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(233, 213, 255, 1)),
//           child: Row(
//             children: [
//               Icon(Icons.check, color: themeObj.textBlack),
//               SizedBox(width: size.width * 0.02),
//               Text(
//                 "Mark ",
//                 style: GoogleFonts.openSans(
//                   color: themeObj.textBlack,
//                   fontWeight: FontWeight.w400,
//                   fontSize: size.width * 0.036,
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
//
// class StudentContainer extends StatefulWidget {
//   final Student student;
//   final Size size;
//   final CustomTheme themeObj;
//   final Function(String) onAttendanceChanged;
//
//   const StudentContainer({
//     Key? key,
//     required this.student,
//     required this.size,
//     required this.themeObj,
//     required this.onAttendanceChanged,
//   }) : super(key: key);
//
//   @override
//   _StudentContainerState createState() => _StudentContainerState();
// }
//
// class _StudentContainerState extends State<StudentContainer> {
//   late String selectedAttendance;
//
//   @override
//   void initState() {
//     super.initState();
//     selectedAttendance = widget.student.selectedAttendance;
//   }
//
//   void updateAttendance(String attendance) {
//     setState(() {
//       selectedAttendance = attendance;
//       widget.onAttendanceChanged(selectedAttendance);
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       margin: const EdgeInsets.symmetric(vertical: 8.0),
//       padding: const EdgeInsets.all(16.0),
//       decoration: BoxDecoration(
//         color: Colors.white,
//         borderRadius: BorderRadius.circular(15),
//         boxShadow: [
//           BoxShadow(
//             color: Colors.black12,
//             blurRadius: 6,
//             spreadRadius: 1,
//           ),
//         ],
//       ),
//       child: Row(
//         children: [
//           CircleAvatar(
//             radius: widget.size.width * 0.08,
//             backgroundImage: NetworkImage(widget.student.profileLink),
//           ),
//           SizedBox(width: 16),
//           Expanded(
//             child: Column(
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Text(
//                   widget.student.name,
//                   style: GoogleFonts.openSans(
//                     color: widget.themeObj.textBlack,
//                     fontSize: widget.size.width * 0.045,
//                     fontWeight: FontWeight.w600,
//                   ),
//                 ),
//                 Text(
//                   'Roll: ${widget.student.rollNumber}',
//                   style: GoogleFonts.openSans(
//                     color: widget.themeObj.textBlack,
//                     fontSize: widget.size.width * 0.035,
//                   ),
//                 ),
//               ],
//             ),
//           ),
//           AttendanceButton(
//             label: 'P',
//             color: Colors.green,
//             size: widget.size,
//             isSelected: selectedAttendance == 'P',
//             onTap: () => updateAttendance('P'),
//           ),
//           AttendanceButton(
//             label: 'A',
//             color: Colors.blue,
//             size: widget.size,
//             isSelected: selectedAttendance == 'A',
//             onTap: () => updateAttendance('A'),
//           ),
//           AttendanceButton(
//             label: 'L',
//             color: Colors.orange,
//             size: widget.size,
//             isSelected: selectedAttendance == 'L',
//             onTap: () => updateAttendance('L'),
//           ),
//         ],
//       ),
//     );
//   }
// }
//
//
// class AttendanceButton extends StatelessWidget {
//   final String label;
//   final Color color;
//   final Size size;
//   final bool isSelected;
//   final VoidCallback onTap;
//
//   AttendanceButton({
//     required this.label,
//     required this.color,
//     required this.size,
//     required this.isSelected,
//     required this.onTap,
//   });
//
//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: const EdgeInsets.symmetric(horizontal: 4.0),
//       child: GestureDetector(
//         onTap: onTap,
//         child: Container(
//           decoration: BoxDecoration(
//             color: isSelected ? color : Colors.transparent,
//             shape: BoxShape.circle,
//             border: Border.all(color: color, width: 2.0),
//           ),
//           padding: EdgeInsets.all(size.width * 0.03),
//           alignment: Alignment.center,
//           child: Text(
//             label,
//             style: GoogleFonts.openSans(
//               color: isSelected ? Colors.white : color,
//               fontSize: size.width * 0.04,
//               fontWeight: FontWeight.w600,
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }



class StudentAttendance extends StatefulWidget {
  const StudentAttendance({Key? key}) : super(key: key);

  @override
  _StudentAttendanceState createState() => _StudentAttendanceState();
}

class _StudentAttendanceState extends State<StudentAttendance>  with SingleTickerProviderStateMixin{
  CustomTheme themeObj = CustomTheme();
  List<Student> students = [];
  bool isLoading = true;
  bool isLoadingMore = false;
  StudentService _studentService = StudentService();
  int start = 0;
  final ScrollController _scrollController = ScrollController();



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
      List<Student> fetchedStudents = await _studentService.fetchStudents(date, accessToken,  start);
      print('Fetched students: $fetchedStudents');

      setState(() {
        students = fetchedStudents;
      });
      print('Students after setState: $students');
    } catch (e) {
      print('Error fetching student data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load students. Please try again. $e')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  bool allDataLoaded=false;
  Future<void> fetchMoreStudentData() async {
    if (isLoadingMore) return;
    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      String date = DateTime.now().toIso8601String().split('T')[0];
      List<Student> fetchedStudents = await _studentService.fetchStudents(date,accessToken,  start + students.length);

      int? previousLength=students.length;

      students.addAll(fetchedStudents);

      int? newLength=students.length;
      if(newLength==previousLength){
        allDataLoaded=true;
      }

    } catch (e) {
      print('Error fetching more student data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load more students. Please try again.')),
      );
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }

  Future<void> markAttendance() async {
    print(students.length);
    for (var student in students) {
      print("${student.name}: ${student.selectedAttendance}");
    }
    bool allStudentsMarked = students.every((student) => student.selectedAttendance.isNotEmpty);
    print("All students marked: $allStudentsMarked");
    if (!allStudentsMarked) {
      showRedSnackBar("Please fill attendance for all students", context);
      return;
    }
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
      String date = DateTime.now().toIso8601String().split('T')[0];

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

  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    fetchStudentData();
    _scrollController.addListener(_scrollListener);
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _scrollController.removeListener(_scrollListener);
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      if(!allDataLoaded){
        fetchMoreStudentData();
      }
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
      body: isLoading
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      )
          : Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          SizedBox(
            width: size.width * 0.5,
            child: TextButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => PreviousStudentAttendanceRecords()));
              },
              style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(233, 213, 255, 1)),
              child: Row(
                children: [
                  Icon(Icons.history),
                  SizedBox(width: size.width * 0.02),
                  Text(
                    "Attendance Record",
                    style: GoogleFonts.openSans(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.036,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: AnimationLimiter(

              child: ListView.builder(
                controller: _scrollController,
                shrinkWrap: true,
                padding: const EdgeInsets.all(8.0),
                itemCount: students.length + 1,
                itemBuilder: (context, index) {
                  if (index == students.length) {
                    return isLoadingMore
                        ? Center(
                      child: LoadingAnimationWidget.threeArchedCircle(
                        color: themeObj.primayColor,
                        size: 30,
                      ),
                    )
                        : SizedBox.shrink();
                  }
                  final student = students[index];
                  return  AnimationConfiguration.staggeredList(
                    position: index,
                    duration: const Duration(milliseconds: 375),
                    child: SlideAnimation(
                      verticalOffset: 50.0,
                      child: FadeInAnimation(
                        child: StudentContainer(
                          student: student,
                          size: size,
                          themeObj: themeObj,
                          onAttendanceChanged: (newAttendance ) {
                            setState(() {
                              student.selectedAttendance = newAttendance;
                            });
                          },
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),


      floatingActionButton: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF4CAF50), Color(0xFF45A049)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(30),
          boxShadow: [
            BoxShadow(
              color: Colors.green.withOpacity(0.3),
              spreadRadius: 1,
              blurRadius: 5,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: ElevatedButton(
          onPressed: markAttendance,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.transparent,
            shadowColor: Colors.transparent,
            padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.check, color: Colors.white),
              SizedBox(width: 8),
              Text(
                "Mark Attendance",
                style: GoogleFonts.openSans(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class StudentContainer extends StatefulWidget {
  final Student student;
  final Size size;
  final CustomTheme themeObj;
  final Function(String) onAttendanceChanged;

  const StudentContainer({
    Key? key,
    required this.student,
    required this.size,
    required this.themeObj,
    required this.onAttendanceChanged,
  }) : super(key: key);

  @override
  _StudentContainerState createState() => _StudentContainerState();
}

class _StudentContainerState extends State<StudentContainer> {
  late String selectedAttendance;

  @override
  void initState() {
    super.initState();
    selectedAttendance = widget.student.selectedAttendance;
  }

  void updateAttendance(String attendance) {
    setState(() {
      selectedAttendance = attendance;
      widget.onAttendanceChanged(selectedAttendance);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            spreadRadius: 2,
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
        child: AnimatedContainer(
          duration: Duration(milliseconds: 300),
          decoration: BoxDecoration(
            color: isSelected ? color : Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: color.withOpacity(0.3),
                blurRadius: 8,
                spreadRadius: isSelected ? 2 : 0,
              ),
            ],
          ),
          padding: EdgeInsets.all(size.width * 0.025),
          child: Text(
            label,
            style: GoogleFonts.openSans(
              color: isSelected ? Colors.white : color,
              fontSize: size.width * 0.035,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}