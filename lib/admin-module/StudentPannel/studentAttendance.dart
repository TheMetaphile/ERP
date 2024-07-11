import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';
import '../admin Utils/adminStudentAttendanceTile.dart';

class StudentAttendance extends StatefulWidget {
  const StudentAttendance({super.key});

  @override
  State<StudentAttendance> createState() => _StudentAttendanceState();
}

class _StudentAttendanceState extends State<StudentAttendance> {

  @override
  void initState() {
    super.initState();
  }

  String? _selectedClass;
  List<String> classOptions = [
    'Pre-Nursery',
    'Nursery',
    'L.K.G',
    'U.K.G',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];
  String? _selectedSection;
  List<String> sectionOptions = [
    'A',
    'B',
    'C',
    'D',
    'E',
  ];
  String? _selectedTerm;
  List<String> termOptions = [
    'Term 1',
    'Term 2',

  ];
  String? _selectedMonth;
  List<String> monthOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December',
  ];

  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor:themeObj.textWhite,
      appBar: AppBar(
        iconTheme: IconThemeData(color: themeObj.textBlack),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),

        backgroundColor: themeObj.primayColor,
        title: Text("Student Attendance",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: size.height*0.01,),
            dropDownButton(size),
            SizedBox(height: size.height*0.02,),
            Text("Attendance Sheet Of Class 9th A April, 2024",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.035),),
            SizedBox(height: size.height*0.02,),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: AttendanceTable(),
            ),

          ],
        ),
      ),

    );
  }
  Widget dropDownButton(Size size){
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Class",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                  underline: Container(),
                  value: _selectedClass,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedClass = newValue!;
                    });
                  },
                  items: classOptions.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Section",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSection,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSection = newValue!;
                    });
                  },
                  items: sectionOptions.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Term",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedTerm,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedTerm = newValue!;
                    });
                  },
                  items: termOptions.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Month",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedMonth,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedMonth = newValue!;
                    });
                  },
                  items: monthOptions.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }


}

class AttendanceTable extends StatefulWidget {
  @override
  _AttendanceTableState createState() => _AttendanceTableState();
}

class _AttendanceTableState extends State<AttendanceTable> {
  int? _selectedIndex;

  @override
  Widget build(BuildContext context) {
    return DataTable(
      headingRowColor: MaterialStateColor.resolveWith((states) => Color.fromRGBO(174,238,237,1)),
      columns: _createColumns(),
      rows: _createRows(),
      dataRowHeight: 56,
      headingRowHeight: 56,
      showCheckboxColumn: false,
      border: TableBorder.all(color: Colors.black),

    );
  }

  List<DataColumn> _createColumns() {
    return [
      DataColumn(label: Text('Students')),
      for (int i = 1; i <= 18; i++)
        DataColumn(label: Text('$i\n${_getDayOfWeek(i)}'))
    ];
  }

  List<DataRow> _createRows() {
    List<Map<String, dynamic>> students = [
      {'name': 'Aarav Bhardwaj', 'attendance': [true, true, false, null, false]},
      {'name': 'Ananya Bhatt', 'attendance': [false, false, true, true, true]},
      {'name': 'Ankit Nair', 'attendance': [false, false, null, null, null]},
      {'name': 'Ashish Sharma', 'attendance': [false, true, null, true, true]},
      {'name': 'Abhishek Nair', 'attendance': [true, false, null, true, true]},
      {'name': 'Aryan Nair', 'attendance': [null, true, true, null, null]},
      {'name': 'Avni Bhatt', 'attendance': [true, true, null, true, true]},
      {'name': 'Shailesh Nair', 'attendance': [true, false, null, true, null]},
      {'name': 'Bhanu Nair', 'attendance': [false, true, null, true, true]},
      {'name': 'Abhi Nair', 'attendance': [true, false, null, true, true]},
      {'name': 'Aryan Nair', 'attendance': [true, true, null, true, null]},
      {'name': 'Aryan Nair', 'attendance': [false, true, true, null, true]},
      // Add more students here
    ];

    return List<DataRow>.generate(
      students.length,
          (index) => _createDataRow(
        students[index]['name'],
        students[index]['attendance'],
        index,
      ),
    );
  }

  DataRow _createDataRow(String name, List<bool?> attendance, int index) {
    return DataRow(
      color: MaterialStateProperty.resolveWith<Color>(
            (Set<MaterialState> states) {
          return _selectedIndex == index ? Colors.lightBlue.withOpacity(0.3) : Colors.transparent;
        },
      ),
      cells: [
        DataCell(Text(name)),
        for (var status in attendance)
          DataCell(_getAttendanceIcon(status)),
        for (int i = attendance.length; i < 18; i++)
          DataCell(Text('--')),
      ],
      onSelectChanged: (_) {
        setState(() {
          _selectedIndex = _selectedIndex == index ? null : index;
        });
      },
    );
  }

  Widget _getAttendanceIcon(bool? status) {
    if (status == null) return Icon(Icons.remove, color: Colors.yellow);
    return status
        ? Icon(Icons.check, color: Colors.green)
        : Icon(Icons.close, color: Colors.red);
  }

  String _getDayOfWeek(int day) {
    List<String> days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[(day - 1) % 7];
  }
}
