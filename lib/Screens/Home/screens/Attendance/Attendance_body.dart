import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
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
    Size size = MediaQuery.of(context).size;
    return SizedBox(
      height: size.height*0.9,
      child: Column(
        children: [
          SizedBox(
            width: size.width,
            child: TableCalendar(
              focusedDay: DateTime.now(),
              firstDay: DateTime(2024,3,1),
              lastDay: DateTime(2024,5,20),
              weekNumbersVisible: false,
              calendarFormat: CalendarFormat.month,
              availableCalendarFormats: const {
                CalendarFormat.month: "Month"
              },
              headerStyle: const HeaderStyle(
                titleCentered: true
              ),
              calendarStyle: const CalendarStyle(
                weekendTextStyle: TextStyle(color: Colors.red),
                defaultTextStyle: TextStyle(color: Colors.black),
              ),
              calendarBuilders: CalendarBuilders(
                defaultBuilder: (context, day, focusedDay) {
                  for (DateTime d in [DateTime(2024,3,18),DateTime(2024,3,18),DateTime(2024,3,18)]) {
                    if (day.day == d.day &&
                        day.month == d.month &&
                        day.year == d.year) {
                      return Container(
                        decoration: const BoxDecoration(
                          color: Color.fromRGBO(103,135,214, 1),
                          borderRadius: BorderRadius.all(
                            Radius.circular(80),
                          ),
                        ),
                        child: Center(
                          child: Text(
                            '${day.day}',
                            style: const TextStyle(color: Colors.white),
                          ),
                        ),
                      );
                    }
                  }
                  return null;
                },
              ),
            ),
          ),
          SizedBox(
            height: size.height*0.02,
          ),
          Card(
            elevation: 5,
            color: Colors.white,
            shape: const OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(12)),
              borderSide: BorderSide(
                color: Colors.red
              )
            ),
            child: Row(
              children: [

                Container(
                  width: size.width*0.03,
                  height: size.height*0.065,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(8),
                      bottomLeft: Radius.circular(8)
                    ),
                    color: Colors.red,
                  ),
                ),
                Expanded(
                    child: ListTile(
                      title: const AutoSizeText("Absent"),
                      trailing: CircleAvatar(
                        backgroundColor: Colors.red.shade100,
                        child: const Text("02"),
                      ),
                    ),
                )
              ],
            ),
          ),
          SizedBox(
            height: size.height*0.01,
          ),
          Card(
            elevation: 5,
            color: Colors.white,
            shape: const OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(12)),
                borderSide: BorderSide(
                    color: Colors.green
                )
            ),
            child: Row(
              children: [

                Container(
                  width: size.width*0.03,
                  height: size.height*0.065,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(8),
                        bottomLeft: Radius.circular(8)
                    ),
                    color: Colors.green,
                  ),
                ),
                Expanded(
                  child: ListTile(
                    title: const AutoSizeText("Absent"),
                    trailing: CircleAvatar(
                      backgroundColor: Colors.green.shade100,
                      child: const Text("02"),
                    ),

                  ),
                )
              ],
            ),
          ),
          const Expanded(child: SizedBox()),
          SizedBox(
            width: size.width,
            child: Image.asset("assets/Navigation/Attendance/school.jpg"),
          ),
        ],
      ),
    );
  }
}
