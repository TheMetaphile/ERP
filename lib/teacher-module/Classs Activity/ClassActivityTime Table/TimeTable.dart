import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';

import '../../../APIs/Teacher Module/TimeTable/Time Table/timetableAPI.dart';


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

  String? durationOfEachLecture;
  String? durationOfLunch;
  String? firstLectureTiming;
  String? numberOfLecturesBeforeLunch;
  String? numberOfLecture;
  String? lastLectureTime;

  //API Callling
  Map<String,dynamic>? timetableStructure;
  List<Map<String, dynamic>>? timeTableData;
  bool isLoading = true;
  String errorMessage = '';
  TimetableApi timetableApi = TimetableApi();

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

      var data = await timetableApi.fetchTimetableStructure(accessToken);

      if(data is Map){
        timetableStructure = data.cast<String, dynamic>();
        durationOfEachLecture = timetableStructure?["durationOfEachLeacture"]?.toString();
        durationOfLunch = timetableStructure?["durationOfLunch"]?.toString();
        firstLectureTiming = timetableStructure?["firstLectureTiming"]?.toString();
        numberOfLecturesBeforeLunch = timetableStructure?["numberOfLeacturesBeforeLunch"]?.toString();
        numberOfLecture = timetableStructure?["numberOfLecture"]?.toString();
        lastLectureTime = firstLectureTiming;

        print("Timetable Structure:");
        print("First Lecture Timing: $firstLectureTiming");
        print("Duration of Each Lecture: $durationOfEachLecture");
        print("Number of Lectures: $numberOfLecture");

        var fetchData = await timetableApi.fetchClassTeacherTimetable(accessToken,selectday.toLowerCase());

           timeTableData=fetchData.cast<Map<String, dynamic>>();



      }else if(data==null){
        showRedSnackBar("The Time Table Structure not found contact to admin", context);
      }else{

        showRedSnackBar("Something Went Wrong $data", context);
      }


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



  Future<void> getDetails()async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    Class= pref.getString("teacherClass");
    section=pref.getString("teacherSection");
  }



  @override
  void initState() {
    super.initState();
    fetchTimetable();
    getDetails();
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
          :Column(
            children: [
              SizedBox(height: size.height * 0.01),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Day-wise Lectures",
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.openSans(
                      color: Colors.black,
                      fontWeight: FontWeight.w600,
                      fontSize: size.width * 0.045,
                    ),
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
              SizedBox(height: size.height * 0.01),
              timeTableData!.isEmpty ? Expanded(child: Center(child: Text("No Time Table Found on $selectday"),)):Expanded(
              child: allTable()),
            ],
          )
    );
  }

  Widget allTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: {
            0: FixedColumnWidth(90),
            1: FixedColumnWidth(150),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(160),
          },
          children: [
            allHeader(),
            ...allRows(),
          ],
        ),
      ),
    );
  }

  TableRow allHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Lecture',
        'Subject',
        'Teacher',
        'Timing',
      ].map((header) => TableCell(
        child: Container(
          height: 60, // Set your desired height here
          padding: EdgeInsets.all(8),
          alignment: Alignment.center, // This centers the content vertically
          child: Text(
              header,
              style: TextStyle(fontWeight: FontWeight.bold)
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> allRows() {
    DateTime currentTime = parseTime(firstLectureTiming!);
    Duration lectureDuration = parseDuration(durationOfEachLecture!);
    Duration lunchDuration = parseDuration(durationOfLunch!);
    int lecturesBeforeLunch = int.parse(numberOfLecturesBeforeLunch!);

    List<TableRow> rows = [];
    int lectureCount = 0;

    for (var item in timeTableData!) {
      if (lectureCount == lecturesBeforeLunch) {
        // Add lunch break
        String lunchTiming = "${formatTime(currentTime)} - ${formatTime(currentTime.add(lunchDuration))}";
        rows.add(TableRow(
          children: [
            newTableCell("Lunch"),
            newTableCell(""),
            newTableCell(""),
            newTableCell(lunchTiming),
          ],
        ));
        currentTime = currentTime.add(lunchDuration);
      }

      DateTime endTime = currentTime.add(lectureDuration);
      String timing = "${formatTime(currentTime)} - ${formatTime(endTime)}";
      currentTime = endTime;

      rows.add(TableRow(
        children: [
          newTableCell(item["lectureNo"]?.toString() ?? ""),
          newTableCell(item['subject']?.toString() ?? ""),
          newTableCell(item['teacher']["name"]?.toString() ?? ""),
          newTableCell(timing),
        ],
      ));

      lectureCount++;
    }

    return rows;
  }
  Duration parseDuration(String durationString) {
    int minutes = int.parse(durationString.split(' ')[0]);
    return Duration(minutes: minutes);
  }

  DateTime parseTime(String timeString) {
    // First, try parsing with AM/PM
    try {
      return DateFormat("h:mm a").parse(timeString);
    } catch (e) {
      // If that fails, try parsing without AM/PM
      try {
        return DateFormat("HH:mm").parse(timeString);
      } catch (e) {
        // If all parsing attempts fail, return a default time
        print("Error parsing time: $timeString. Using default time.");
        return DateTime(2024, 1, 1, 9, 0); // Default to 9:00 AM
      }
    }
  }

  String formatTime(DateTime time) {
    return DateFormat("h:mm a").format(time);
  }

  Widget newTableCell(String text) {
    return TableCell(
      child: Container(
        height: 60, // Set your desired height here
        padding: EdgeInsets.all(8),
        alignment: Alignment.center, // This centers the content vertically
        child: Text(text),
      ),
    );
  }
}