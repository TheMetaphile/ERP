import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/theme.dart';

import '../../APIs/Teacher Module/TimeTable/Time Table/timeTableStructure.dart';
import '../../APIs/Teacher Module/TimeTable/Time Table/timeTableTeacherPannel.dart';

class DrawerTimeTable extends StatefulWidget {
  const DrawerTimeTable({super.key});

  @override
  State<DrawerTimeTable> createState() => _DrawerTimeTableState();
}

class _DrawerTimeTableState extends State<DrawerTimeTable> {
  String selectday = "Tuesday";
  bool isLoading = false;
  List<String> dayOption = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  String errorMessage = '';
  List<Map<String, String>> schedule = [];
  CustomTheme themeObj = CustomTheme();
  TeacherTimetableAPI apiObj = TeacherTimetableAPI();
  TimeTableStructureAPI strObj=TimeTableStructureAPI();

  // Timetable structure
  Map<String, dynamic>? timetableStructure;

  Future<void> fetchTimetableStructure() async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      // Fetch timetable structure
      timetableStructure = await strObj.fetchTimeTableStructure(accessToken,"1st-12th");
      print(timetableStructure);
    } catch (e) {
      print('Error fetching timetable structure: $e');
    }
  }

  Future<void> fetchTimetable() async {
    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      var timetableData = await apiObj.fetchClassTimeTable(selectday.toLowerCase());

      if (timetableData == null) {
        throw Exception('No timetable data available for the selected day');
      }

      if (timetableData is! List<dynamic>) {
        throw Exception('Unexpected timetable data format');
      }

      updateSchedule(timetableData);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
        errorMessage = e.toString();
      });
      print('Error in fetchTimetable: $e');
    }
  }

  void updateSchedule(List<dynamic> timetable) {
    if (timetableStructure == null) {
      print('Timetable structure is null');
      errorMessage = 'Timetable structure is not available';
      return;
    }

    schedule.clear();
    TimeOfDay currentTime = _parseTime(timetableStructure!['firstLectureTiming']);
    int lectureDuration = int.parse(timetableStructure!['durationOfEachLeacture'].split(' ')[0]);
    int lunchDuration = int.parse(timetableStructure!['durationOfLunch'].split(' ')[0]);
    int lecturesBeforeLunch = timetableStructure!['numberOfLeacturesBeforeLunch'];

    for (int i = 0; i < timetable.length; i++) {
      if (i == lecturesBeforeLunch) {
        // Add lunch break
        TimeOfDay lunchEndTime = _addMinutesToTime(currentTime, lunchDuration);
        schedule.add({
          'lecture': 'LUNCH',
          'timing': '${_formatTime(currentTime)} - ${_formatTime(lunchEndTime)}',
          'class': 'LUNCH',
          'section': 'LUNCH',
          'subject': 'LUNCH',
        });
        currentTime = lunchEndTime;
      }

      var lecture = timetable[i];
      TimeOfDay lectureEndTime = _addMinutesToTime(currentTime, lectureDuration);
      schedule.add({
        'lecture': lecture['lectureNo'].toString(),
        'timing': '${_formatTime(currentTime)} - ${_formatTime(lectureEndTime)}',
        'class': lecture['class'] ?? '',
        'section': lecture['section'] ?? '',
        'subject': lecture['subject'],
      });

      currentTime = lectureEndTime;
    }
  }
  TimeOfDay _parseTime(String timeString) {
    List<String> parts = timeString.toLowerCase().split(' ');
    List<String> timeParts = parts[0].split(':');
    int hour = int.parse(timeParts[0]);
    int minute = int.parse(timeParts[1]);
    if (parts[1] == 'pm' && hour != 12) hour += 12;
    if (parts[1] == 'am' && hour == 12) hour = 0;
    return TimeOfDay(hour: hour, minute: minute);
  }

  TimeOfDay _addMinutesToTime(TimeOfDay time, int minutes) {
    int totalMinutes = time.hour * 60 + time.minute + minutes;
    return TimeOfDay(hour: totalMinutes ~/ 60 % 24, minute: totalMinutes % 60);
  }

  String _formatTime(TimeOfDay time) {
    final hour = time.hourOfPeriod;
    final minute = time.minute.toString().padLeft(2, '0');
    final period = time.period == DayPeriod.am ? 'AM' : 'PM';
    return '$hour:$minute $period';
  }

  @override
  void initState() {
    super.initState();
    fetchTimetableStructure().then((_) => fetchTimetable());
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Time Table",
          style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.05),
        ),
      ),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 3),
        width: size.width,
        height: size.height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.01),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Day-wise Lectures",
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w600, fontSize: size.width * 0.045),
                ),
                Card(
                  child: SizedBox(
                    width: size.width * 0.4,
                    height: size.height * 0.05,
                    child: DropdownButton<String>(
                      isExpanded: true,
                      borderRadius: BorderRadius.circular(12),
                      hint: const Text("Select Day"),
                      alignment: Alignment.center,
                      padding: EdgeInsets.all(8),
                      icon: Icon(Icons.keyboard_arrow_down_sharp),
                      underline: Container(),
                      value: selectday,
                      onChanged: (newValue) {
                        setState(() {
                          selectday = newValue!;
                          fetchTimetable();
                        });
                      },
                      items: dayOption.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option, overflow: TextOverflow.ellipsis),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: isLoading
                  ? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              )
                  : errorMessage.isNotEmpty
                  ? Center(child: Text(errorMessage))
                  : schedule.isEmpty
                  ? Center(child: Text("No timetable available for the selected day"))
                  : SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: SizedBox(
                  width: size.width*1.4,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Table(
                      border: TableBorder.all(color: Colors.grey.shade300),
                      columnWidths: const <int, TableColumnWidth>{
                        0: FlexColumnWidth(1.5),
                        1: FlexColumnWidth(2.4),
                        2: FlexColumnWidth(1),
                        3: FlexColumnWidth(1.5),
                        4: FlexColumnWidth(2),
                      },
                      children: [
                        _buildTableHeader(),
                        ...schedule.map((item) => _buildTableRow(item)).toList(),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
  TableRow _buildTableHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Color(0xFFB3E5FC)),
      children: [
        _buildHeaderCell('Lecture'),
        _buildHeaderCell('Timing'),
        _buildHeaderCell('Class'),
        _buildHeaderCell('Section'),
        _buildHeaderCell('Subject'),
      ],
    );
  }
  Widget _buildHeaderCell(String text) {
    Size size= MediaQuery.of(context).size;
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: SizedBox(
          height: size.height*0.05,
          child: Center(
            child: Text(
              text,
              style: GoogleFonts.openSans(fontWeight: FontWeight.w700, fontSize: 14),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }

  TableRow _buildTableRow(Map<String, String> item) {
    Color rowColor = item['lecture'] == 'LUNCH'
        ? Color(0xFFB3E5FC)
        : Color(0xFFE1F5FE);

    return TableRow(
      decoration: BoxDecoration(color: rowColor),
      children: [
        _buildTableCell(item['lecture'] ?? ''),
        _buildTableCell(item['timing'] ?? ''),
        _buildTableCell(item['class'] ?? ''),
        _buildTableCell(item['section'] ?? ''),
        _buildTableCell(item['subject'] ?? ''),
      ],
    );
  }
  Widget _buildTableCell(String text) {
    Size size= MediaQuery.of(context).size;
    return TableCell(
      child: Container(
        height: size.height*0.08,
        child: Center(
          child: Text(
            text,
            style: GoogleFonts.openSans(
              fontWeight: text == 'LUNCH' ? FontWeight.w700 : FontWeight.w400,
              fontSize: 14,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}