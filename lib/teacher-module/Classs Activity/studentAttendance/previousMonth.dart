import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../APIs/Teacher Module/ClassActivty/StudentAttendanceAPI.dart';
import '../../../utils/theme.dart';


class PreviousStudentAttendanceRecords extends StatefulWidget {
  const PreviousStudentAttendanceRecords({super.key});

  @override
  State<PreviousStudentAttendanceRecords> createState() => _PreviousStudentAttendanceRecordsState();
}

class _PreviousStudentAttendanceRecordsState extends State<PreviousStudentAttendanceRecords> {
  String? _selectedMonth;
  String _selectedYear = '2024'; // Default to 2024
  Map<String, dynamic>? _attendanceData;
  StudentService StudentServiceObj=StudentService();

  @override
  void initState() {
    super.initState();
    _selectedMonth = monthOptions[DateTime.now().month - 1];
    _fetchAttendanceData();
  }
  Future<void> _fetchAttendanceData() async {
    setState(() {
      _attendanceData = null; // Reset data to show loading indicator
    });

    if (_selectedMonth != null) {
      try {
        SharedPreferences pref = await SharedPreferences.getInstance();
        String? accessToken = pref.getString("accessToken");
        if (accessToken == null) {
          throw Exception("Access token not found");
        }

        final monthIndex = monthOptions.indexOf(_selectedMonth!) + 1;
        final data = await StudentServiceObj.fetchAttendance(
            monthIndex.toString().padLeft(2, '0'),
            _selectedYear,
            accessToken
        );

        setState(() {
          _attendanceData = data;
        });
      } catch (e) {
        print(e);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load attendance data: ${e.toString()}')),
        );
      }
    }
  }

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
    print(_attendanceData);
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text("Search Attendance",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.035),),

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
                        _fetchAttendanceData();
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
            SizedBox(height: size.height*0.02,),
            if (_selectedMonth != null)
              Text(
                "Attendance Sheet Of Class 9th A $_selectedMonth, $_selectedYear",
                style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.035),
              ),
            SizedBox(height: size.height*0.02,),
            if (_attendanceData == null)
              Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              )
            else if (_attendanceData!['output'] is Map<String, dynamic> && (_attendanceData!['output'] as Map<String, dynamic>).isNotEmpty)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: AttendanceTable(attendanceData: _attendanceData!),
              )
            else
              Center(child: Text('No attendance data available for the selected month')),

          ],
        ),
      ),

    );
  }



}
class AttendanceTable extends StatelessWidget {
  final Map<String, dynamic> attendanceData;

  AttendanceTable({required this.attendanceData});

  @override
  Widget build(BuildContext context) {
    if (attendanceData['output'] == null || attendanceData['output'] is! Map<String, dynamic>) {
      return Center(child: Text('Invalid attendance data format'));
    }

    final output = attendanceData['output'] as Map<String, dynamic>;
    final students = output.entries.where((entry) => entry.key != 'class' && entry.key != 'section').toList();
    if (students.isEmpty) {
      return Center(child: Text('No attendance data available'));
    }

    final dates = _getDates(students.first.value as Map<String, dynamic>);

    return DataTable(
      headingRowColor: MaterialStateColor.resolveWith((states) => Color.fromRGBO(174, 238, 237, 1)),
      columns: _createColumns(dates),
      rows: _createRows(students, dates),
      dataRowHeight: 56,
      headingRowHeight: 56,
      showCheckboxColumn: false,
      border: TableBorder.all(color: Colors.black),
    );
  }

  List<DataColumn> _createColumns(List<String> dates) {
    return [
      DataColumn(label: Text('Students')),
      for (var date in dates)
        DataColumn(label: Text('${date.split('-').last}\n${_getDayOfWeek(DateTime.parse(date).weekday)}'))
    ];
  }

  List<DataRow> _createRows(List<MapEntry<String, dynamic>> students, List<String> dates) {
    return students.map((entry) {
      final studentName = entry.key;
      final studentData = entry.value as Map<String, dynamic>;
      return DataRow(
        cells: [
          DataCell(Text(studentName)),
          for (var date in dates)
            DataCell(_getAttendanceCell(studentData[date] as String?)),
        ],
      );
    }).toList();
  }

  Widget _getAttendanceCell(String? status) {
    if (status == null) return Text('--');
    switch (status.toLowerCase()) {
      case 'present':
        return Icon(Icons.check, color: Colors.green);
      case 'absent':
        return Icon(Icons.close, color: Colors.red);
      case 'leave':
        return Icon(Icons.remove, color: Colors.yellow);
      default:
        return Text(status);
    }
  }

  List<String> _getDates(Map<String, dynamic> studentData) {
    return studentData.keys.where((key) => key.contains('-')).toList()..sort();
  }

  String _getDayOfWeek(int day) {
    List<String> days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[day - 1];
  }
}
