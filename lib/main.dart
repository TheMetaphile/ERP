import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:untitled/admin-module/expenseManagement.dart';
import 'package:untitled/admin-module/history.dart';
import 'package:untitled/teacher-module/Birthday.dart';
import 'package:untitled/teacher-module/Drawer.dart';
import 'package:untitled/teacher-module/applyForLeave.dart';
import 'package:untitled/teacher-module/noticeBoard.dart';
import 'package:untitled/teacher-module/result.dart';
import 'package:untitled/teacher-module/studentAttendance.dart';
import 'package:untitled/teacher-module/studentFeesReport.dart';
import 'package:untitled/teacher-module/studentReportCard.dart';
import 'package:untitled/teacher-module/studentTerm1Result.dart';
import 'package:untitled/teacher-module/teacheAttendanceCheckOut.dart';
import 'package:untitled/teacher-module/teacherAttendance.dart';
import 'package:untitled/teacher-module/teacherAttendanceCheckIn.dart';
import 'package:untitled/teacher-module/teacherAttendanceTakeBreak.dart';
import 'package:untitled/teacher-module/teacherAttendanceTakeBreakRunning.dart';
import 'package:untitled/teacher-module/teacherDashboard.dart';
import 'package:untitled/teacher-module/teacherLeave.dart';
import 'package:untitled/teacher-module/teacherLeaveHistory.dart';
import 'package:untitled/teacher-module/teacherSalary.dart';
import 'package:untitled/teacher-module/techerClass.dart';
import 'package:untitled/utils/studentAttendanceTile.dart';
import 'package:untitled/utils/studentReportTile.dart';
import 'package:untitled/utils/studentFeesTile.dart';

import 'admin-module/budget.dart';
void main() async {
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
        home:teacherDashboard(),
    );
  }
}



