import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/theme.dart';

import '../../../APIs/Teacher Module/ClassActivty/timetableAPI.dart';

class TimeTable extends StatefulWidget {
  const TimeTable({super.key});

  @override
  State<TimeTable> createState() => _TimeTableState();
}

class _TimeTableState extends State<TimeTable> {
  String selectday="Monday";
  String? Class;
  String? section;
  List<String> dayOption = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  CustomTheme themeObj = CustomTheme();

  //API Callling
  TimetableStructure? timetableStructure;
  List<Map<String, String>> schedule = [];
  bool isLoading = true;
  String errorMessage = '';
  TimetableApi timetableApi = TimetableApi();
  Timetable? fullTimetable;

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

      timetableStructure = await timetableApi.fetchTimetableStructure(accessToken);
      fullTimetable = await timetableApi.fetchClassTeacherTimetable(accessToken);
      print(timetableStructure);
      print(fullTimetable);
      updateScheduleForDay(selectday);

      setState(() {
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        errorMessage = 'Failed to load timetable: $e';
        isLoading = false;
      });
      print('Error in fetchTimetable: $e');
    }
  }
  void updateScheduleForDay(String day) {
    print("Updating schedule for day: $day");
    if (fullTimetable == null) {
      print("fullTimetable is null");
      return;
    }

    List<Lecture> lectures;
    switch (day.toLowerCase()) {
      case 'monday':
        lectures = fullTimetable!.monday;
        break;
      case 'tuesday':
        lectures = fullTimetable!.tuesday;
        break;
      case 'wednesday':
        lectures = fullTimetable!.wednesday;
        break;
      case 'thursday':
        lectures = fullTimetable!.thrusday;
        break;
      case 'friday':
        lectures = fullTimetable!.friday;
        break;
      case 'saturday':
        lectures = fullTimetable!.saturday;
        break;
      case 'sunday':
        lectures = fullTimetable!.sunday;
        break;
      default:
        lectures = [];
    }

    print("Number of lectures for $day: ${lectures.length}");
    setState(() {
      updateSchedule(lectures);
    });
  }

  void updateSchedule(List<Lecture> lectures) {
    if (timetableStructure == null) return;
    print("Updating schedule with ${lectures.length} lectures");
    schedule.clear();
    schedule = [];
    TimeOfDay currentTime = _parseTime(timetableStructure!.firstLectureTiming);
    int lectureDuration = int.parse(timetableStructure!.durationOfEachLecture.split(' ')[0]);
    int lunchDuration = int.parse(timetableStructure!.durationOfLunch.split(' ')[0]);

    for (int i = 0; i < lectures.length; i++) {
      if (i == timetableStructure!.numberOfLecturesBeforeLunch) {
        // Add lunch break
        TimeOfDay lunchEndTime = _addMinutesToTime(currentTime, lunchDuration);
        schedule.add({
          'lecture': 'LUNCH',
          'timing': '${_formatTime(currentTime)} - ${_formatTime(lunchEndTime)}',
          'class': '',
          'section': '',
          'subject': '',
        });
        currentTime = lunchEndTime;
      }

      TimeOfDay lectureEndTime = _addMinutesToTime(currentTime, lectureDuration);
      schedule.add({
        'lecture': lectures[i].lectureNo.toString(),
        'timing': '${_formatTime(currentTime)} - ${_formatTime(lectureEndTime)}',
        'class': 'N/A', // Add class if available in API response
        'section': 'N/A', // Add section if available in API response
        'subject': lectures[i].subject,
      });

      currentTime = lectureEndTime;
    }
    setState(() {}); // Trigger a rebuild with the new schedule
    print("Final schedule length: ${schedule.length}");
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
    fetchTimetable();
    getDetails();
  }
  
Future<void> getDetails()async {
     SharedPreferences pref = await SharedPreferences.getInstance();
     Class= pref.getString("clas");
     section=pref.getString("section");
}
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: isLoading
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      )
          : errorMessage.isNotEmpty
          ? Center(child: Text(errorMessage))
          : fullTimetable == null?const Center(child: Text("No TimeTable Found")):SingleChildScrollView(child: buildTimetableContent(size)),
    );
  }

  Widget buildTimetableContent(Size size) {
    return Container(
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
              SizedBox(
                width: size.width * 0.4,
                height: size.height * 0.06,
                child: Card(
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
                      if (newValue != null && newValue != selectday) {
                        setState(() {
                          selectday = newValue;
                        });
                        updateScheduleForDay(newValue);
                      }
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
          SizedBox(height: size.height * 0.02),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text(
                "Class -  $Class",
                style: GoogleFonts.openSans(fontWeight: FontWeight.w500, fontSize: size.width * 0.045),
                textAlign: TextAlign.center,
              ),
              Text(
                "Section -  $section",
                style: GoogleFonts.openSans(fontWeight: FontWeight.w500, fontSize: size.width * 0.045),
                textAlign: TextAlign.center,
              ),
            ],
          ),
          SizedBox(height: size.height * 0.02),
          Expanded(
            child: Container(
              decoration: const BoxDecoration(),
              child: Table(
                border: TableBorder.all(color: Colors.grey.shade300),
                children: [
                  TableRow(
                    decoration: BoxDecoration(color: Color(0xFFA5D6A7)),
                    children: [
                      _buildTableHeader('Lecture', size),
                      _buildTableHeader('Timing', size),
                      _buildTableHeader('Subject', size),
                    ],
                  ),
                  ...schedule.map((item) => _buildTableRow(item, size)).toList(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTableHeader(String text, Size size) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: Text(
          text,
          style: GoogleFonts.openSans(fontWeight: FontWeight.w700, fontSize: size.width * 0.035),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  TableRow _buildTableRow(Map<String, String> item, Size size) {
    Color rowColor = item['lecture'] == 'LUNCH'
        ? Color(0xFFA5D6A7)
        : Colors.transparent;

    return TableRow(
      decoration: BoxDecoration(color: rowColor),
      children: [
        _buildTableCell(item['lecture']!, size),
        _buildTableCell(item['timing']!, size),
        _buildTableCell(item['subject']!, size),
      ],
    );
  }

  Widget _buildTableCell(String text, Size size) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: Text(
          text,
          style: GoogleFonts.openSans(fontWeight: FontWeight.w400, fontSize: size.width * 0.035),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}