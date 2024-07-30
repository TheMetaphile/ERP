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

  final String _selectedYear = DateTime.now().year.toString();

  Map<String, dynamic>? _attendanceData;
  StudentService StudentServiceObj = StudentService();
bool isLoading=false;
  @override
  void initState() {
    super.initState();
    _selectedMonth = monthOptions[DateTime.now().month - 1];
    _fetchAttendanceData();
  }

  Future<void> _fetchAttendanceData() async {
    setState(() {
      _attendanceData = null; // Reset data to show loading indicator
      isLoading=true;
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
           accessToken
        );
        print("data $data");
        setState(() {
          _attendanceData = data;
        });
      } catch (e) {
        print(e);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load attendance data: ${e.toString()}')),
        );
      }finally{
        setState(() {
          isLoading=false;
        });
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
    print(_selectedYear);
    print("Atendance data $_attendanceData");
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
            if (_selectedMonth != null && _selectedMonth!.isNotEmpty)
              Text(
                "Attendance Sheet Of Class 9th A $_selectedMonth, $_selectedYear",
                style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.035),
              ),
            if (isLoading)
              Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              ),
            SizedBox(height: size.height * 0.02),
            if (!isLoading && _attendanceData != null)
              _attendanceData!.isNotEmpty ? allTable() : Center(child: Text('No attendance data available for the selected month')),
          ],
        ),
      ),
    );
  }
  Widget allTable() {
    if (_attendanceData == null || _selectedMonth == null) {
      return Center(child: Text('No data available'));
    }

    int daysInMonth = DateTime(_selectedYear.isEmpty ? DateTime.now().year : int.parse(_selectedYear), monthOptions.indexOf(_selectedMonth!) + 2, 0).day;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: {
            0: FixedColumnWidth(150), // Wider column for student names
            for (int i = 1; i <= daysInMonth; i++) i: FixedColumnWidth(40), // Columns for each day
          },
          children: [
            allHeader(daysInMonth),
            ...allRows(daysInMonth),
          ],
        ),
      ),
    );
  }


  TableRow allHeader(int daysInMonth) {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        TableCell(
          child: Container(
            height: 60,
            padding: EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text('Students', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ),
        for (int i = 1; i <= daysInMonth; i++)
          TableCell(
            child: Container(
              height: 60,
              padding: EdgeInsets.all(8),
              alignment: Alignment.center,
              child: Text('$i', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
      ],
    );
  }

  List<TableRow> allRows(int daysInMonth) {
    List<TableRow> rows = [];

    _attendanceData!.forEach((studentName, data) {
      if (studentName != 'class' && studentName != 'section') {
        List<Widget> cellWidgets = [
          newTableCell(studentName),
        ];

        for (int day = 1; day <= daysInMonth; day++) {
          String formattedDate1 = '${_selectedYear}-${(monthOptions.indexOf(_selectedMonth!) + 1).toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')}';
          String formattedDate2 = '${day.toString().padLeft(2, '0')}/${(monthOptions.indexOf(_selectedMonth!) + 1).toString().padLeft(2, '0')}/${_selectedYear}';

          String status = data[formattedDate1] ?? data[formattedDate2] ?? '--';
          Widget statusWidget;

          switch (status.toLowerCase()) {
            case 'present':
              statusWidget = Icon(Icons.check, color: Colors.green, size: 20);
              break;
            case 'absent':
              statusWidget = Icon(Icons.close, color: Colors.red, size: 20);
              break;
            case 'leave':
              statusWidget = Text('L', style: TextStyle(color: Colors.orange));
              break;
            default:
              statusWidget = Text('--');
          }

          cellWidgets.add(TableCell(
            child: Container(
              height: 40,
              alignment: Alignment.center,
              child: statusWidget,
            ),
          ));
        }

        rows.add(TableRow(children: cellWidgets));
      }
    });

    return rows;
  }

  Widget newTableCell(String text) {
    return TableCell(
      child: Container(
        height: 40,
        padding: EdgeInsets.all(8),
        alignment: Alignment.centerLeft,
        child: Text(text, overflow: TextOverflow.ellipsis),
      ),
    );
  }
}

