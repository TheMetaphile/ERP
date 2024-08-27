import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
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

class _TimeTableState extends State<TimeTable>with SingleTickerProviderStateMixin {
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

  late AnimationController _controller;
  late Animation<double> _animation;
  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
    fetchTimetable().then((_) {
      if (mounted) {
        setState(() {});
        _controller.forward();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
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
          : Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: themeObj.primayColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(30),
                bottomRight: Radius.circular(30),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Day-wise Lectures",
                  style:GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045,fontWeight: FontWeight.w500)
                ),
                Container(
                  width: size.width * 0.4,
                  padding: EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: themeObj.textWhite,
                    borderRadius: BorderRadius.circular(25),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.2),
                        spreadRadius: 1,
                        blurRadius: 5,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: selectday,
                      onChanged: (newValue) {
                        setState(() {
                          selectday = newValue!;
                          fetchTimetable();
                          _controller.forward(from: 0.0);
                        });
                      },
                      items: dayOption.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option, style: TextStyle(color: themeObj.primayColor)),
                        );
                      }).toList(),
                      icon: Icon(Icons.arrow_drop_down, color: themeObj.primayColor),
                      dropdownColor: themeObj.textWhite,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: timeTableData == null || timeTableData!.isEmpty
                ? Center(
              child: Text(
                "No Time Table Found on $selectday",
                style: GoogleFonts.poppins(fontSize: 18, color: Colors.grey[600]),
              ),
            )
                : FadeTransition(
              opacity: _animation,
              child: Padding(
                padding: const EdgeInsets.all(5.0),
                child: allTable(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget allTable() {
    return AnimationLimiter(
      child: ListView(
        children: buildTimeTableRows(),
      ),
    );
  }




  List<Widget> buildTimeTableRows() {
    DateTime currentTime = parseTime(firstLectureTiming!);
    Duration lectureDuration = parseDuration(durationOfEachLecture!);
    Duration lunchDuration = parseDuration(durationOfLunch!);
    int lecturesBeforeLunch = int.parse(numberOfLecturesBeforeLunch!);

    List<Widget> rows = [];
    int lectureCount = 0;

    for (var item in timeTableData!) {
      if (lectureCount == lecturesBeforeLunch) {
        // Add lunch break
        String lunchTiming = "${formatTime(currentTime)} - ${formatTime(currentTime.add(lunchDuration))}";
        rows.add(buildLunchCard(lunchTiming));
        currentTime = currentTime.add(lunchDuration);
      }

      DateTime endTime = currentTime.add(lectureDuration);
      String timing = "${formatTime(currentTime)} - ${formatTime(endTime)}";
      currentTime = endTime;

      if (item["optional"] == false) {
        rows.add(buildLectureCard(item, timing, false));
      } else if (item["optional"] == true) {
        for (var optSubject in item['optionalSubjects']) {
            rows.add(buildLectureCard(item, timing, true, optionalSubject: optSubject));

        }
      }

      lectureCount++;
    }

    return rows;
  }
  Widget buildLunchCard(String timing) {
    return AnimationConfiguration.staggeredList(
      position: -1, // Use a unique position for lunch
      duration: const Duration(milliseconds: 375),
      child: SlideAnimation(
        verticalOffset: 50.0,
        child: FadeInAnimation(
          child: Card(
            elevation: 4,
            margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
            color: Colors.amber[100],
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Lunch Break",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                      color: Colors.amber[800],
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    timing,
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.w500,
                      fontSize: 14,
                      color: Colors.amber[900],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget buildLectureCard(Map<String, dynamic> lecture, String timing, bool isOptional, {Map<String, dynamic>? optionalSubject}) {
    Size size = MediaQuery.of(context).size;

    return AnimationConfiguration.staggeredList(
      position: int.parse(lecture['lectureNo'].toString()) - 1,
      duration: const Duration(milliseconds: 375),
      child: SlideAnimation(
        verticalOffset: 50.0,
        child: FadeInAnimation(
          child: Card(
            elevation: 4,
            margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
            color: isOptional ? Colors.green[50] : null,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        isOptional ? "*Lecture ${lecture['lectureNo']}" : "Lecture ${lecture['lectureNo']}",
                        style: GoogleFonts.poppins(
                          fontWeight: FontWeight.w500,
                          fontSize: size.width*0.045,
                          color: themeObj.primayColor,
                        ),
                      ),
                      Text(
                        timing,
                        style: GoogleFonts.poppins(
                          fontWeight: FontWeight.w500,
                          fontSize: size.width*0.035,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height*0.01),
                  Text(
                    isOptional
                        ? "${optionalSubject!['optionalSubject']} - (${optionalSubject['mergeWithSection']})"
                        : lecture['subject'] ?? "N/A",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.w600,
                      fontSize: size.width*0.045,
                    ),
                  ),
                  SizedBox(height: size.height*0.008),
                  Text(
                    "Teacher: ${isOptional ? optionalSubject!['teacher']['name'] : lecture['teacher']['name'] ?? 'N/A'}",
                    style: GoogleFonts.poppins(
                      fontSize: size.width*0.035,
                      color: Colors.grey[700],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Duration parseDuration(String durationString) {
    // Remove any non-digit characters and parse the remaining digits
    String digitsOnly = durationString.replaceAll(RegExp(r'[^0-9]'), '');
    if (digitsOnly.isEmpty) {
      // If no digits found, return a default duration
      return Duration(minutes: 45); // You can change this default value as needed
    }
    int minutes = int.parse(digitsOnly);
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


}