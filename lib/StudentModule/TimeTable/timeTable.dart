import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/StudentModuleAPI/TimeTable/Time Table/timetableAPI.dart';
import '../../CustomTheme/customTheme.dart';


// class StudentTimeTable extends StatefulWidget {
//   const StudentTimeTable({super.key});
//
//   @override
//   State<StudentTimeTable> createState() => _StudentTimeTableState();
// }
//
// class _StudentTimeTableState extends State<StudentTimeTable> {
//   String selectDay ="Monday";
//   String? Class;
//   String? section;
//   List<String> dayOption = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//
//
//   String? durationOfEachLecture;
//   String? durationOfLunch;
//   String? firstLectureTiming;
//   String? numberOfLecturesBeforeLunch;
//   String? numberOfLecture;
//   String? lastLectureTime;
//
//   //API Callling
//   Map<String,dynamic>? timetableStructure;
//   List<Map<String, dynamic>>? timeTableData;
//   bool isLoading = true;
//   String errorMessage = '';
//   TimetableApi timetableApi = TimetableApi();
//
//   Future<void> fetchTimetable() async {
//     setState(() {
//       isLoading = true;
//       errorMessage = '';
//     });
//
//     try {
//
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token not found');
//       }
//
//       var data = await timetableApi.fetchTimetableStructure(accessToken);
//
//       if(data is Map){
//         timetableStructure = data.cast<String, dynamic>();
//         durationOfEachLecture = timetableStructure?["durationOfEachLeacture"]?.toString();
//         durationOfLunch = timetableStructure?["durationOfLunch"]?.toString();
//         firstLectureTiming = timetableStructure?["firstLectureTiming"]?.toString();
//         numberOfLecturesBeforeLunch = timetableStructure?["numberOfLeacturesBeforeLunch"]?.toString();
//         numberOfLecture = timetableStructure?["numberOfLecture"]?.toString();
//         lastLectureTime = firstLectureTiming;
//
//         print("Timetable Structure:");
//         print("First Lecture Timing: $firstLectureTiming");
//         print("Duration of Each Lecture: $durationOfEachLecture");
//         print("Number of Lectures: $numberOfLecture");
//
//         var fetchData = await timetableApi.fetchStudentTimetable(accessToken,selectDay.toLowerCase());
//
//         timeTableData=fetchData.cast<Map<String, dynamic>>();
//
//
//
//       }else if(data==null){
//         showRedSnackBar("The Time Table Structure not found contact to admin", context);
//       }else{
//
//         showRedSnackBar("Something Went Wrong $data", context);
//       }
//
//
//       setState(() {
//         isLoading = false;
//       });
//     } catch (e) {
//       setState(() {
//         errorMessage = 'Failed to load timetable: $e';
//         isLoading = false;
//       });
//       print('Error in fetchTimetable: $e');
//     }
//   }
//   List<String>? subjectOptions;
//   Future<void> fetchSubjects() async {
//     SharedPreferences pref=await SharedPreferences.getInstance();
//     subjectOptions =pref.getStringList("subjects") ;
//   }
//
//
//
//
//   @override
//   void initState() {
//     super.initState();
//     fetchSubjects();
//     fetchTimetable();
//
//
//   }
//   @override
//   Widget build(BuildContext context) {
//     print(timeTableData);
//     Size size = MediaQuery.of(context).size;
//     CustomTheme themeObj=CustomTheme(size);
//     return Scaffold(
//         backgroundColor: CustomTheme.whiteColor,
//         appBar: AppBar(
//           backgroundColor: CustomTheme.primaryColor,
//           leading: IconButton(
//             onPressed: (){
//               Navigator.pop(context);
//             },
//             icon:  Icon(Icons.arrow_back_ios,color:CustomTheme.blackColor),
//           ),
//           title: Text(
//               "Time Table",
//               style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.w500)
//           ),
//         ),
//         body: isLoading
//             ? Center(
//           child: LoadingAnimationWidget.threeArchedCircle(
//             color: CustomTheme.primaryColor,
//             size: 50,
//           ),
//         )
//
//             :Column(
//           children: [
//             SizedBox(height: size.height * 0.01),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Padding(
//                   padding: const EdgeInsets.only(left: 8.0),
//                   child: Text(
//                     "Day-wise Lectures",
//                     overflow: TextOverflow.ellipsis,
//                     style: GoogleFonts.openSans(
//                       color: Colors.black,
//                       fontWeight: FontWeight.w600,
//                       fontSize: size.width * 0.045,
//                     ),
//                   ),
//                 ),
//                 Card(
//                   child: SizedBox(
//                     width: size.width * 0.4,
//                     height: size.height * 0.05,
//                     child: DropdownButton<String>(
//                       isExpanded: true,
//                       borderRadius: BorderRadius.circular(12),
//                       hint: const Text("Select Day"),
//                       alignment: Alignment.center,
//                       padding: const EdgeInsets.all(8),
//                       icon: const Icon(Icons.keyboard_arrow_down_sharp),
//                       underline: Container(),
//                       value: selectDay,
//                       onChanged: (newValue) {
//                         setState(() {
//                           selectDay = newValue!;
//                           fetchTimetable();
//                         });
//                       },
//                       items: dayOption.map((String option) {
//                         return DropdownMenuItem<String>(
//                           value: option,
//                           child: Text(option, overflow: TextOverflow.ellipsis),
//                         );
//                       }).toList(),
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//             SizedBox(height: size.height * 0.01),
//             timeTableData==null || timeTableData!.isEmpty ? Expanded(child: Center(child: Text("No Time Table Found on $selectDay", style: TextStyle(fontSize: 18, color: Colors.grey[600])),)):Expanded(
//                 child: allTable()),
//           ],
//         )
//     );
//   }
//
//   Widget allTable() {
//     return SingleChildScrollView(
//       scrollDirection: Axis.horizontal,
//       child: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Table(
//           border: TableBorder.all(),
//           columnWidths: {
//             0: FixedColumnWidth(90),
//             1: FixedColumnWidth(150),
//             2: FixedColumnWidth(120),
//             3: FixedColumnWidth(160),
//           },
//           children: [
//             allHeader(),
//             ...allRows(),
//           ],
//         ),
//       ),
//     );
//   }
//
//   TableRow allHeader() {
//     return TableRow(
//       decoration: BoxDecoration(color: Colors.cyan[100]),
//       children: [
//         'Lecture',
//         'Subject',
//         'Teacher',
//         'Timing',
//       ].map((header) => TableCell(
//         child: Container(
//           height: 60, // Set your desired height here
//           padding: const EdgeInsets.all(8),
//           alignment: Alignment.center, // This centers the content vertically
//           child: Text(
//               header,
//               style: const TextStyle(fontWeight: FontWeight.bold)
//           ),
//         ),
//       )).toList(),
//     );
//   }
//
//   List<TableRow> allRows() {
//     DateTime currentTime = parseTime(firstLectureTiming!);
//     Duration lectureDuration = parseDuration(durationOfEachLecture!);
//     Duration lunchDuration = parseDuration(durationOfLunch!);
//     int lecturesBeforeLunch = int.parse(numberOfLecturesBeforeLunch!);
//
//     List<TableRow> rows = [];
//     int lectureCount = 0;
//
//     for (var item in timeTableData!) {
//       if (lectureCount == lecturesBeforeLunch) {
//         // Add lunch break
//         String lunchTiming = "${formatTime(currentTime)} - ${formatTime(currentTime.add(lunchDuration))}";
//         rows.add(TableRow(
//           decoration: BoxDecoration(color: Colors.amber[100]),
//           children: [
//             newTableCell("Lunch", isHeader: true),
//             newTableCell("Break", isHeader: true),
//             newTableCell("", isHeader: true),
//             newTableCell(lunchTiming, isHeader: true),
//           ],
//         ));
//         currentTime = currentTime.add(lunchDuration);
//       }
//
//       DateTime endTime = currentTime.add(lectureDuration);
//       String timing = "${formatTime(currentTime)} - ${formatTime(endTime)}";
//       currentTime = endTime;
//
//
//       if (item["optional"] == false) {
//         rows.add(TableRow(
//           children: [
//             newTableCell(item["lectureNo"]?.toString() ?? ""),
//             newTableCell(item['subject']?.toString() ?? ""),
//             newTableCell(item['teacher']["name"]?.toString() ?? ""),
//             newTableCell(timing),
//           ],
//         ));
//       } else if (item["optional"] == true) {
//         for (var optSubject in item['optionalSubjects']) {
//           if(subjectOptions!.contains(optSubject["optionalSubject"])){
//             rows.add(TableRow(
//               decoration: BoxDecoration(color: Colors.green[50]),
//               children: [
//                 newTableCell("*${item["lectureNo"]}"),
//                 newTableCell("${optSubject["optionalSubject"]} - (${optSubject["mergeWithSection"]})"),
//                 newTableCell(optSubject["teacher"]["name"]?.toString() ?? ""),
//                 newTableCell(timing),
//               ],
//             ));
//           }
//         }
//       }
//
//       lectureCount++;
//     }
//
//     return rows;
//   }
//
//   Widget newTableCell(String text, {bool isHeader = false}) {
//     return TableCell(
//       child: Container(
//         height: 60,
//         padding: const EdgeInsets.all(8),
//         alignment: Alignment.center,
//         child: Text(
//           text,
//           style: TextStyle(
//             fontWeight: isHeader ? FontWeight.bold : FontWeight.normal,
//           ),
//           textAlign: TextAlign.center,
//         ),
//       ),
//     );
//   }
//
//
//   Duration parseDuration(String durationString) {
//     int minutes = int.parse(durationString.split(' ')[0]);
//     return Duration(minutes: minutes);
//   }
//
//   DateTime parseTime(String timeString) {
//     // First, try parsing with AM/PM
//     try {
//       return DateFormat("h:mm a").parse(timeString);
//     } catch (e) {
//       // If that fails, try parsing without AM/PM
//       try {
//         return DateFormat("HH:mm").parse(timeString);
//       } catch (e) {
//         // If all parsing attempts fail, return a default time
//         print("Error parsing time: $timeString. Using default time.");
//         return DateTime(2024, 1, 1, 9, 0); // Default to 9:00 AM
//       }
//     }
//   }
//
//   String formatTime(DateTime time) {
//     return DateFormat("h:mm a").format(time);
//   }
//
// }

class StudentTimeTable extends StatefulWidget {
  const StudentTimeTable({super.key});

  @override
  State<StudentTimeTable> createState() => _StudentTimeTableState();
}

class _StudentTimeTableState extends State<StudentTimeTable> with SingleTickerProviderStateMixin {
  String selectDay = "Monday";
  List<String> dayOption = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



  String? Class;
  String? section;



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
  late AnimationController _controller;
  late Animation<double> _animation;

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

        var fetchData = await timetableApi.fetchStudentTimetable(accessToken,selectDay.toLowerCase());

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
  List<String>? subjectOptions;
  Future<void> fetchSubjects() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
    subjectOptions =pref.getStringList("subjects") ;
  }


  @override
  void initState() {
    super.initState();
    fetchSubjects();
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
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: AppBar(
        backgroundColor: CustomTheme.primaryColor,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        ),
        title: Text(
          "Time Table",
          style: GoogleFonts.poppins(
            color: CustomTheme.blackColor,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: isLoading
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: CustomTheme.primaryColor,
          size: 50,
        ),
      )
          : Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
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
                    style: themeObj.bigNormalText,
                ),
                Container(
                  width: size.width * 0.4,
                  padding: EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: CustomTheme.whiteColor,
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
                      value: selectDay,
                      onChanged: (newValue) {
                        setState(() {
                          selectDay = newValue!;
                          fetchTimetable();
                          _controller.forward(from: 0.0);
                        });
                      },
                      items: dayOption.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option, style: TextStyle(color: CustomTheme.primaryColor)),
                        );
                      }).toList(),
                      icon: Icon(Icons.arrow_drop_down, color: CustomTheme.primaryColor),
                      dropdownColor: CustomTheme.whiteColor,
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
                "No Time Table Found on $selectDay",
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
          if(subjectOptions!.contains(optSubject["optionalSubject"])){
            rows.add(buildLectureCard(item, timing, true, optionalSubject: optSubject));
          }
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
                          color: CustomTheme.primaryColor,
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