import 'package:chatview/chatview.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:untitled/teacher-module/noticeBoard.dart';
import 'package:untitled/teacher-module/studentNoteBookRecord.dart';
import 'package:untitled/teacher-module/teacherLeave.dart';

import '../teacher-module/TimeTable.dart';
import '../teacher-module/studentAttendance.dart';
import '../teacher-module/studentFeesReport.dart';
import '../teacher-module/studentReportCard.dart';
import '../teacher-module/teacherAttendanceCheckIn.dart';
import '../teacher-module/techerClass.dart';

// DateTime selectedDate = DateTime.now();
//
// Future<void> _selectDate(BuildContext context) async {
//   final DateTime? picked = await showDatePicker(
//       context: context,
//       initialDate: selectedDate,
//       firstDate: DateTime(2015, 8),
//       lastDate: DateTime(2101));
//   if (picked != null && picked != selectedDate) {
//
//       selectedDate = picked;
//
//   }
// }

List navigation = [TeacherAttendanceCheckIn(),Timetable(),studentReportCard(screen: 'Student Fees Status',),studentReportCard(screen: 'Student Attendance',),studentReportCard(screen: 'Report Card',),studentReportCard(screen: 'Note Book Record',),teacherLeave(),noticeBoard()];
List categoryName=['Check-in','Class','Student Fees Status','Student Attendance','Report Card','Note Book Record','Take Leave','Notice Board'];
String getPic(String categoryName) {
  switch (categoryName) {
    case 'Check-in':
      return "assets/Images/Vector.png";

    case 'Class':
      return "assets/Images/Classroom.png";

    case 'Student Fees Status':
      return "assets/Images/ic_fees_due.png";

    case 'Student Attendance':
      return "assets/Images/Checked User Male.png";
    case 'Report Card':
      return "assets/Images/Graduate.png";
    case 'Note Book Record':
      return "assets/Images/Spiral Bound Booklet.png";
    case 'Take Leave':
      return "assets/Images/GoodNotes.png";
    case 'Notice Board':
      return "assets/Images/Notice.png";
    default:
      return "null";
  }
}



