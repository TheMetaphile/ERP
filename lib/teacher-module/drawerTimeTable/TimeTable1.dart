import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/theme.dart';

import '../../APIs/Teacher Module/TimeTable/Time Table/timetableAPI.dart';
import '../../utils/utils.dart';

class DrawerTimeTable extends StatefulWidget {
  const DrawerTimeTable({super.key});

  @override
  State<DrawerTimeTable> createState() => _DrawerTimeTableState();
}

class _DrawerTimeTableState extends State<DrawerTimeTable> {
  String selectday="Monday";
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
  List<Map<String, dynamic>>? substituteData;
  bool isLoading = true;
  String errorMessage = '';
  TimetableApi timetableApi = TimetableApi();

  final weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  int today = DateTime.now().weekday;
  String day="";

    String calculateDay(){
      return weekdays[today-1];
    }


  Future<void> fetchTimetable() async {
    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {

      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? teacheremail=pref.getString("email");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      var data = await timetableApi.fetchTimetableStructure(accessToken);
        print("data $data");

      if(data is Map){
        timetableStructure = data.cast<String, dynamic>();
        durationOfEachLecture = timetableStructure?["durationOfEachLeacture"]?.toString();
        durationOfLunch = timetableStructure?["durationOfLunch"]?.toString();
        firstLectureTiming = timetableStructure?["firstLectureTiming"]?.toString();
        numberOfLecturesBeforeLunch = timetableStructure?["numberOfLeacturesBeforeLunch"]?.toString();
        numberOfLecture = timetableStructure?["numberOfLecture"]?.toString();
        lastLectureTime = firstLectureTiming;
        //
        // print("Timetable Structure:");
        // print("First Lecture Timing: $firstLectureTiming");
        // print("Duration of Each Lecture: $durationOfEachLecture");
        // print("Number of Lectures: $numberOfLecture");

        List<dynamic> fetchData = await timetableApi.fetchClassTimeTable(accessToken,teacheremail!,selectday.toLowerCase());
    print(fetchData);
        if(fetchData.isNotEmpty){

          timeTableData=  fetchData.cast<Map<String, dynamic>>();
          await fetchSubstitution();
          overrideLectures();

        }else{
          showRedSnackBar("Something  went wrong $fetchData", context);
        }


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

  Future<void> fetchSubstitution()async {

    try {

      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");


      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      var data = await timetableApi.fetchSubsituteTimeTable(accessToken);
      print("data $data");
       substituteData=data.cast<Map<String, dynamic>>();



    } catch (e) {
      setState(() {
        errorMessage = 'Failed to load timetable: $e';
      });
      print('Error in fetchTimetable: $e');
    }
  }


  void overrideLectures() {
    if (substituteData != null && substituteData!.isNotEmpty) {
      if (selectday == day) {
        for (var substitute in substituteData!) {
          int lectureNo = int.parse(substitute['Lecture']);

          // Find the index of the lecture in timeTableData
          int index = timeTableData!.indexWhere((lecture) => lecture['lectureNo'] == lectureNo);

          if (index != -1) {
            // Override existing lecture
            timeTableData![index] = {
              'subject': substitute['subject'],
              'class': substitute['class'],
              'section': substitute['section'],
              'lectureNo': lectureNo,
              '_id': timeTableData![index]['_id'], // Preserve the original _id if it exists
            };
          } else {
            // Add new substitute lecture
            timeTableData!.add({
              'subject': substitute['subject'],
              'class': substitute['class'],
              'section': substitute['section'],
              'lectureNo': lectureNo,
            });
          }
        }

        // Sort timeTableData by lectureNo
        timeTableData!.sort((a, b) => (a['lectureNo'] as int).compareTo(b['lectureNo'] as int));
      }
    }
  }

  @override
  void initState() {
    super.initState();
    fetchTimetable();
    fetchSubstitution();
     day=calculateDay();
  }

  @override
  Widget build(BuildContext context) {
      print(day);
      print(day);
    Size size = MediaQuery.of(context).size;
    print(substituteData);
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
        body:Column(
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
                          timeTableData=[];
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
            isLoading
                ? Center(
              child: LoadingAnimationWidget.threeArchedCircle(
                color: themeObj.primayColor,
                size: 50,
              ),
            ) : errorMessage.isNotEmpty
                ? Center(child: Text(errorMessage)):
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
        scrollDirection: Axis.horizontal,

        child: Table(
          border: TableBorder.all(),
          columnWidths: {
            0: FixedColumnWidth(90),
            1: FixedColumnWidth(160),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(120),
            4: FixedColumnWidth(100),
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
        'Timing',
        'Class',
        'Section',
        'Subject',
      ].map((header) => TableCell(
        child: Container(
          height: 60,
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
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
    int lecturesBeforeLunch = int.parse(numberOfLecturesBeforeLunch!);
    int totalLectures = int.parse(numberOfLecture!);

    List<TableRow> rows = [];

    for (int i = 1; i <= totalLectures; i++) {
      // Add lunch break if it's time
      if (i == lecturesBeforeLunch + 1) {
        rows.add(createLunchRow(currentTime));
        currentTime = currentTime.add(parseDuration(durationOfLunch!));
      }

      // Create lecture row
      String timing = "${formatTime(currentTime)} - ${formatTime(currentTime.add(lectureDuration))}";
      rows.add(createLectureRow(i, timing));

      // Move to next lecture time
      currentTime = currentTime.add(lectureDuration);
    }

    return rows;
  }

  TableRow createLunchRow(DateTime startTime) {
    String timing = "${formatTime(startTime)} - ${formatTime(startTime.add(parseDuration(durationOfLunch!)))}";
    return TableRow(
      children: [
        newTableCell("Lunch"),
        newTableCell(timing),
        newTableCell("Lunch"),
        newTableCell("Lunch"),
        newTableCell("Lunch"),
      ],
    );
  }

  TableRow createLectureRow(int lectureNo, String timing) {
    var lectureData = timeTableData!.firstWhere(
          (item) => item["lectureNo"] == lectureNo,
      orElse: () => {"subject": "-", "class": "-", "section": "-"},
    );

    return TableRow(
      children: [
        newTableCell(lectureNo.toString()),
        newTableCell(timing),
        newTableCell(lectureData['class']?.toString() ?? ""),
        newTableCell(lectureData['section']?.toString() ?? ""),
        newTableCell(lectureData['subject']?.toString() ?? ""),
      ],
    );
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