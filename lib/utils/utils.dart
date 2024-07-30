
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:untitled/teacher-module/NoticeBoard/noticeBoard.dart';
import 'package:untitled/teacher-module/Trash/studentNoteBookRecord.dart';
import 'package:untitled/teacher-module/TakeLeave/teacherLeave.dart';

import '../teacher-module/Trash/TimeTable.dart';
import '../teacher-module/Trash/studentAttendance.dart';
import '../teacher-module/Trash/studentFeesReport.dart';
import '../teacher-module/Trash/studentReportCard.dart';
import '../teacher-module/CheckIn/teacherAttendanceCheckIn.dart';
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


showRedSnackBar(String message,BuildContext context) {
    final snackBar=SnackBar(content: Text(message,style: TextStyle(color: Colors.white),),backgroundColor: Colors.red,);
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
}

//SnackBar Green
showGreenSnackBar(String message,BuildContext context) {
    final snackBar=SnackBar(content: Text(message,style: TextStyle(color: Colors.white),),backgroundColor: Colors.green,);
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
}




