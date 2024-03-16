import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class AttendanceBody extends StatefulWidget {
  const AttendanceBody({super.key});

  @override
  State<AttendanceBody> createState() => _AttendanceBodyState();
}

class _AttendanceBodyState extends State<AttendanceBody> {
  @override
  Widget build(BuildContext context) {
    return TableCalendar(focusedDay: DateTime.now(), firstDay: DateTime(2024,3,14), lastDay: DateTime(2024,5,20));
  }
}
