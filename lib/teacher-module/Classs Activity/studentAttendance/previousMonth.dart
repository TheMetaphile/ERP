import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../APIs/Teacher Module/ClassActivity/StudentAttendanceAPI.dart';
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
  StudentService StudentServiceObj = StudentService();

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
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  CustomTheme themeObj = CustomTheme();

  @override
  Widget build(BuildContext context) {
    print(_attendanceData);
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
        title: Text("Student Attendance", style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.06),),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: size.height * 0.01,),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text("Search Attendance: ", style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.045),),
                Card(
                  child: Container(
                    width: size.width * 0.3,
                    height: size.height * 0.05,
                    child: DropdownButton<String>(
                      isExpanded: true,
                      borderRadius: BorderRadius.circular(12),
                      hint: Text("Month", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                      padding: EdgeInsets.all(8),
                      icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
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
                          child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.02,),
            if (_selectedMonth != null)
              Text(
                "Attendance Sheet Of Class 9th A $_selectedMonth, $_selectedYear",
                style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.035),
              ),
            SizedBox(height: size.height * 0.02,),
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
                child: AttendanceTable(
                  attendanceData: _attendanceData!,
                  selectedMonth: _selectedMonth!,
                  selectedYear: _selectedYear,
                ),
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
  final String selectedMonth;
  final String selectedYear;

  AttendanceTable({
    required this.attendanceData,
    required this.selectedMonth,
    required this.selectedYear,
  });

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

    final dates = _getDates();

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
            DataCell(_getAttendanceCell(studentData[date] as String?, date)),
        ],
      );
    }).toList();
  }

  Widget _getAttendanceCell(String? status, String date) {
    DateTime currentDate = DateTime.now();
    DateTime cellDate = DateTime.parse(date);
    DateTime selectedDate = DateTime(int.parse(selectedYear), _getMonthNumber(selectedMonth), 1);

    // For future months, show empty cells
    if (selectedDate.isAfter(currentDate)) {
      return Text('');
    }

    // For past dates without data, show '-'
    if (cellDate.isBefore(currentDate) && status == null) {
      return Text('-');
    }

    // For future dates in the current month, show empty cells
    if (cellDate.isAfter(currentDate)) {
      return Text('');
    }

    // For dates with data
    switch (status?.toLowerCase()) {
      case 'present':
        return Icon(Icons.check, color: Colors.green);
      case 'absent':
        return Icon(Icons.close, color: Colors.red);
      case 'leave':
        return Icon(Icons.remove, color: Colors.yellow);
      default:
        return Text('-');
    }
  }

  List<String> _getDates() {
    int year = int.parse(selectedYear);
    int month = _getMonthNumber(selectedMonth);
    int daysInMonth = DateTime(year, month + 1, 0).day;
    DateTime currentDate = DateTime.now();

    List<String> dates = [];
    for (int i = 1; i <= daysInMonth; i++) {
      DateTime date = DateTime(year, month, i);
      if (date.isBefore(currentDate) || (date.year == currentDate.year && date.month == currentDate.month && date.day <= currentDate.day)) {
        dates.add(date.toIso8601String().split('T')[0]);
      }
    }
    return dates;
  }

  String _getDayOfWeek(int day) {
    List<String> days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[day - 1];
  }

  int _getMonthNumber(String monthName) {
    List<String> months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName) + 1;
  }
}