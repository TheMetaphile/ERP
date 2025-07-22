import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:untitled/StudentModule/TimeTable/timetableBloc/studenttimetable_bloc.dart';
import 'package:untitled/StudentModule/TimeTable/timetableBloc/studenttimetable_event.dart';
import 'package:untitled/StudentModule/TimeTable/timetableBloc/studenttimetable_state.dart';
import '../../CustomTheme/customTheme.dart';
import '../../StudentAPIs/StudentModuleAPI/TimeTable/Time Table/timetableAPI.dart';

class StudentTimeTable extends StatefulWidget {
  const StudentTimeTable({super.key});

  @override
  State<StudentTimeTable> createState() => _StudentTimeTableState();
}

class _StudentTimeTableState extends State<StudentTimeTable>
    with SingleTickerProviderStateMixin {

  List<String> dayOption = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

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
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return BlocProvider(
      create: (context) => StudentTimetableBloc(timetableApi: TimetableApi())
        ..add(LoadTimetableStructure()),
      child: Scaffold(
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
        body: BlocConsumer<StudentTimetableBloc, StudentTimetableState>(
          listener: (context, state) {
            if (state is StudentTimetableLoaded) {
              _controller.forward(from: 0.0);
            } else if (state is StudentTimetableError) {
              showRedSnackBar(state.message, context);
            } else if (state is TimetableStructureNotFound) {
              showRedSnackBar(
                  "The Time Table Structure not found contact to admin",
                  context
              );
            }
          },
          builder: (context, state) {
            if (state is StudentTimetableLoading) {
              return Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: CustomTheme.primaryColor,
                  size: 50,
                ),
              );
            } else if (state is StudentTimetableLoaded) {
              return RefreshIndicator(
                onRefresh: () async {
                  context.read<StudentTimetableBloc>().add(RefreshTimetable());
                },
                child: Column(
                  children: [
                    _buildHeader(context, state, themeObj, size),
                    Expanded(
                      child: _buildTimetableContent(state),
                    ),
                  ],
                ),
              );
            } else if (state is StudentTimetableError) {
              return RefreshIndicator(
                onRefresh: () async {
                  context.read<StudentTimetableBloc>().add(RefreshTimetable());
                },
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.error_outline,
                        size: 64,
                        color: Colors.red[400],
                      ),
                      SizedBox(height: 16),
                      Text(
                        "Error loading timetable",
                        style: GoogleFonts.poppins(
                          fontSize: 18,
                          color: Colors.grey[600],
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        "Pull down to refresh",
                        style: GoogleFonts.poppins(
                          fontSize: 14,
                          color: Colors.grey[500],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            } else {
              return RefreshIndicator(
                onRefresh: () async {
                  context.read<StudentTimetableBloc>().add(RefreshTimetable());
                },
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.schedule,
                        size: 64,
                        color: Colors.grey[400],
                      ),
                      SizedBox(height: 16),
                      Text(
                        "No timetable available",
                        style: GoogleFonts.poppins(
                          fontSize: 18,
                          color: Colors.grey[600],
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        "Pull down to refresh",
                        style: GoogleFonts.poppins(
                          fontSize: 14,
                          color: Colors.grey[500],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }
          },
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, StudentTimetableLoaded state,
      CustomTheme themeObj, Size size) {
    return Container(
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
                value: state.currentDay,
                onChanged: (newValue) {
                  if (newValue != null) {
                    context.read<StudentTimetableBloc>()
                        .add(LoadTimetableForDay(newValue));
                  }
                },
                items: dayOption.map((String option) {
                  return DropdownMenuItem<String>(
                    value: option,
                    child: Text(
                        option,
                        style: TextStyle(color: CustomTheme.primaryColor)
                    ),
                  );
                }).toList(),
                icon: Icon(Icons.arrow_drop_down, color: CustomTheme.primaryColor),
                dropdownColor: CustomTheme.whiteColor,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimetableContent(StudentTimetableLoaded state) {
    final currentDayData = state.cachedTimetableData[state.currentDay.toLowerCase()];

    if (currentDayData == null || currentDayData.isEmpty) {
      return Center(
        child: Text(
          "No Time Table Found on ${state.currentDay}",
          style: GoogleFonts.poppins(fontSize: 18, color: Colors.grey[600]),
        ),
      );
    }

    return FadeTransition(
      opacity: _animation,
      child: Padding(
        padding: const EdgeInsets.all(5.0),
        child: _buildAllTable(state, currentDayData),
      ),
    );
  }

  Widget _buildAllTable(StudentTimetableLoaded state, List<Map<String, dynamic>> dayData) {
    return AnimationLimiter(
      child: ListView(
        children: _buildTimeTableRows(state, dayData),
      ),
    );
  }

  List<Widget> _buildTimeTableRows(StudentTimetableLoaded state, List<Map<String, dynamic>> dayData) {
    final structure = state.timetableStructure;

    String? durationOfEachLecture = structure["durationOfEachLeacture"]?.toString();
    String? durationOfLunch = structure["durationOfLunch"]?.toString();
    String? firstLectureTiming = structure["firstLectureTiming"]?.toString();
    String? numberOfLecturesBeforeLunch = structure["numberOfLeacturesBeforeLunch"]?.toString();

    DateTime currentTime = _parseTime(firstLectureTiming!);
    Duration lectureDuration = _parseDuration(durationOfEachLecture!);
    Duration lunchDuration = _parseDuration(durationOfLunch!);
    int lecturesBeforeLunch = int.parse(numberOfLecturesBeforeLunch!);

    List<Widget> rows = [];
    int lectureCount = 0;

    for (var item in dayData) {
      if (lectureCount == lecturesBeforeLunch) {
        // Add lunch break
        String lunchTiming = "${_formatTime(currentTime)} - ${_formatTime(currentTime.add(lunchDuration))}";
        rows.add(_buildLunchCard(lunchTiming));
        currentTime = currentTime.add(lunchDuration);
      }

      DateTime endTime = currentTime.add(lectureDuration);
      String timing = "${_formatTime(currentTime)} - ${_formatTime(endTime)}";
      currentTime = endTime;

      if (item["optional"] == false) {
        rows.add(_buildLectureCard(item, timing, false, state.subjectOptions));
      } else if (item["optional"] == true) {
        for (var optSubject in item['optionalSubjects']) {
          if (state.subjectOptions != null &&
              state.subjectOptions!.contains(optSubject["optionalSubject"])) {
            rows.add(_buildLectureCard(item, timing, true, state.subjectOptions,
                optionalSubject: optSubject));
          }
        }
      }

      lectureCount++;
    }

    return rows;
  }

  Widget _buildLunchCard(String timing) {
    return AnimationConfiguration.staggeredList(
      position: -1,
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

  Widget _buildLectureCard(Map<String, dynamic> lecture, String timing,
      bool isOptional, List<String>? subjectOptions,
      {Map<String, dynamic>? optionalSubject}) {
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
                          fontSize: size.width * 0.045,
                          color: CustomTheme.primaryColor,
                        ),
                      ),
                      Text(
                        timing,
                        style: GoogleFonts.poppins(
                          fontWeight: FontWeight.w500,
                          fontSize: size.width * 0.035,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height * 0.01),
                  Text(
                    isOptional
                        ? "${optionalSubject!['optionalSubject']} - (${optionalSubject['mergeWithSection']})"
                        : lecture['subject'] ?? "N/A",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.w600,
                      fontSize: size.width * 0.045,
                    ),
                  ),
                  SizedBox(height: size.height * 0.008),
                  Text(
                    "Teacher: ${isOptional ? optionalSubject!['teacher']['name'] : lecture['teacher']['name'] ?? 'N/A'}",
                    style: GoogleFonts.poppins(
                      fontSize: size.width * 0.035,
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

  Duration _parseDuration(String durationString) {
    String digitsOnly = durationString.replaceAll(RegExp(r'[^0-9]'), '');
    if (digitsOnly.isEmpty) {
      return Duration(minutes: 45);
    }
    int minutes = int.parse(digitsOnly);
    return Duration(minutes: minutes);
  }

  DateTime _parseTime(String timeString) {
    try {
      return DateFormat("h:mm a").parse(timeString);
    } catch (e) {
      try {
        return DateFormat("HH:mm").parse(timeString);
      } catch (e) {
        print("Error parsing time: $timeString. Using default time.");
        return DateTime(2024, 1, 1, 9, 0);
      }
    }
  }

  String _formatTime(DateTime time) {
    return DateFormat("h:mm a").format(time);
  }
}

// You'll need to implement this function according to your theme
void showRedSnackBar(String message, BuildContext context) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(message),
      backgroundColor: Colors.red,
    ),
  );
}
