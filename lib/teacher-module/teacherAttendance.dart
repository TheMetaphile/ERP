import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:untitled/utils/attendanceTile.dart';

class teacherAttendance extends StatefulWidget {
  const teacherAttendance({super.key});

  @override
  State<teacherAttendance> createState() => _teacherAttendanceState();
}

class _teacherAttendanceState extends State<teacherAttendance> {
  final List<Map<String, dynamic>> _attendance = [
    {'date': '11 Tue', 'check-in': '09:00am', 'check-out': '08:45pm','working-hour':'08:20m'},
    {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '11 Tue', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},

  ];

  DateTime selectedDate = DateTime.now();

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }
   List<List<String>> listOfList = [
     [
       "Date","","Check In","Check Out","Status"
     ],
     [
     "12","Jan","9:30am","5:30pm","Status"
   ],
     [
       "12","Jan","9:30am","5:30pm","Status"
     ],
     [
       "12","Jan","9:30am","5:30pm","Status"
     ],
     [
       "12","Jan","9:30am","5:30pm","Status"
     ]
   ];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Attendance",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Column(
        children: [
          SizedBox(
            height: size.height*0.05,
          ),
          Expanded(
            child: Card(
              color: Colors.white,
              margin: const EdgeInsets.all(0),
              shape: const OutlineInputBorder(
                  borderSide: BorderSide(
                      color: Colors.white
                  ),
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(30),
                      topLeft: Radius.circular(30)
                  )
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: listOfList.length,
                  itemBuilder: (context, index) {
                    return SizedBox(
                        width: size.width,
                        height: size.height*0.1,
                        child: AttendanceTile(date: listOfList[index][0], month: listOfList[index][1], checkIn: listOfList[index][2], checkOut: listOfList[index][3], status: listOfList[index][4]));
                  },),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
