import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/Classs%20Activity/StudentFees/studentFeesStatus.dart';
import 'package:untitled/teacher-module/Classs%20Activity/StudentLeave/studentLeave.dart';
//import 'package:untitled/teacher-module/Classs%20Activity/Time%20Table/drawerTimeTable.dart';
import 'package:untitled/teacher-module/Classs%20Activity/studentAttendance/studentAttendance.dart';

import '../../utils/theme.dart';
import 'ClassActivityTime Table/TimeTable.dart';
import 'Result/result.dart';

void main(){
  return runApp(const MaterialApp(home: ClassActivity()));
}
class ClassActivity extends StatefulWidget {
  const ClassActivity({super.key});

  @override
  State<ClassActivity> createState() => _ClassActivityState();
}

class _ClassActivityState extends State<ClassActivity> with TickerProviderStateMixin {
  List<String> tabTitles = [
    "drawerTimeTable",
    "Result",
    "Fees Status",
    "Student Leave",
    "Student Attendance"
  ];

  List<Widget> tabContent = [
    TimeTable(),
    ReportCard(),
    StudentFeesStatus(),
    StudentLeaves(),

  ];

  CustomTheme themeObj = CustomTheme();

  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: tabTitles.length, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme: IconThemeData(color: themeObj.textBlack),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Class Activity",
          style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w400,
            fontSize: size.width * 0.05,
          ),
        ),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: themeObj.textBlack,
          unselectedLabelColor: Colors.grey,
          indicatorColor: themeObj.primayColor,
          tabs: tabTitles.map((title) {
            return Tab(
              text: title.contains("Student Attendance")
                  ? "Student\nAttendance"
                  : title,
            );
          }).toList(),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: tabContent,
      ),
    );
  }
}
