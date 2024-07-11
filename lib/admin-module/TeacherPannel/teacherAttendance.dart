import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/admin%20Utils/teacherAttendanceTile.dart';

import '../../utils/theme.dart';

class TeacherAttendance extends StatefulWidget {
  const TeacherAttendance({super.key});

  @override
  State<TeacherAttendance> createState() => _TeacherAttendanceState();
}

class _TeacherAttendanceState extends State<TeacherAttendance> {

  @override
  void initState() {
    super.initState();
  }

  String? _selectedStatus;
  List<String> statusOption = ['Present', 'Absent', 'Leave'];
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
  List<Map<String, String>> teachersData=[
    {

      "name":"Ankit",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Abhishek",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Absent",
      "totalHours":"7.5 min",
    },
    {

      "name":"Bhanu",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Manish",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Absent",
      "totalHours":"7.5 min",
    },
    {

      "name":"Abhishek",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Ashish",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Absent",
      "totalHours":"7.5 min",
    },
    {

      "name":"Ansh",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Rahul",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Priya",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Ajay",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Absent",
      "totalHours":"7.5 min",
    },
    {

      "name":"Akhil",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Amit",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Modi",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Present",
      "totalHours":"7.5 min",
    },
    {

      "name":"Ankit",
      "designation":"Hindi Teacher",
      "date":"12.03.24",
      "status":"Absent",
      "totalHours":"7.5 min",
    },

  ];
  int? _selectedRowIndex;
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
        iconTheme:  IconThemeData(color:themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        title: Text("Teacher Attendance",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body:   SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: size.height*0.01,),
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
            SizedBox(height: size.height * 0.02),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    color: Color.fromRGBO(233, 213, 255, 1),
                    child: Row(
                      children: [

                        _buildHeaderCell("Name", size),
                        _buildHeaderCell("Designation", size),
                        _buildHeaderCell("Date", size),
                        _buildHeaderCell("Status", size),
                        _buildHeaderCell("Total Hours", size),
                      ],
                    ),
                  ),
                  const Divider(thickness: 2, height: 2, color: Colors.black),
                  Container(
                    height: size.height * 0.63, // Adjust this value as needed
                    width: size.width * 1.5, // Adjust this value to fit all columns
                    child: ListView.separated(
                      itemBuilder: (context, index) {
                        final data = teachersData[index];

                        return InkWell(
                          onTap: () {
                            setState(() {
                              _selectedRowIndex = _selectedRowIndex == index ? null : index;
                            });
                          },
                          child: Row(
                            children: [
                              _buildDataCell(data["name"]!, size, index),
                              _buildDataCell(data["designation"]!, size, index),
                              _buildDataCell(data["date"]!, size, index),
                              _buildDataCell(data["status"]!, size, index),
                              _buildDataCell(data["totalHours"]!, size, index),
                            ],
                          ),
                        );
                      },
                      separatorBuilder: (context, index) => Divider(),
                      itemCount: teachersData.length,
                    )
                  )
                ],
              ),
            )

          ],
        ),
      ),

    );
  }
  Widget _buildHeaderCell(String text, Size size) {
    return Container(
      width: size.width * 0.3,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: themeObj.textBlack,
          fontWeight: FontWeight.w600,
          fontSize: size.width * 0.04,
        ),
      ),
    );
  }

  Widget _buildDataCell(String text, Size size, int rowIndex) {
    return Container(
      width: size.width * 0.3,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      color: _selectedRowIndex == rowIndex ? Colors.lightBlue.withOpacity(0.3) : null,
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: text == "Present" ? Colors.green : text == "Absent" ? Colors.red : themeObj.textBlack,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.035,
        ),
      ),
    );
  }
}
