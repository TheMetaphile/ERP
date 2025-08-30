import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckinBloc/teacher_attendance_checkin_bloc.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckinBloc/teacher_attendance_checkin_event.dart';
import 'package:untitled/teacher-module/CheckIn/teacherAttendanceCheckinBloc/teacher_attendance_checkin_state.dart';
import '../../utils/theme.dart';


class TeacherAttendanceCheckIn extends StatefulWidget {
  const TeacherAttendanceCheckIn({super.key});

  @override
  State<TeacherAttendanceCheckIn> createState() => _TeacherAttendanceCheckInState();
}

class _TeacherAttendanceCheckInState extends State<TeacherAttendanceCheckIn> {
  CustomTheme themeObj = CustomTheme();
  bool _hasTriggeredInitialLoad = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Only trigger initial load once when the widget is first built
    if (!_hasTriggeredInitialLoad) {
      final bloc = context.read<TeacherAttendanceCheckInBloc>();
      if (!bloc.hasLoadedInitially) {
        bloc.add(LoadAttendanceData());
      }
      _hasTriggeredInitialLoad = true;
    }
  }

  Future<void> _onRefresh() async {
    context.read<TeacherAttendanceCheckInBloc>().add(RefreshAttendanceData());
    await context.read<TeacherAttendanceCheckInBloc>().stream.firstWhere(
          (state) => state is AttendanceLoaded || state is AttendanceError,
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: BlocBuilder<TeacherAttendanceCheckInBloc, TeacherAttendanceCheckInState>(
        builder: (context, state) {
          if (state is AttendanceLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is AttendanceLoaded) {
            return RefreshIndicator(
              color: Colors.orange,
              onRefresh: _onRefresh,
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  child: Column(
                    children: [
                      SizedBox(height: size.height * 0.01),
                      _buildCheckInCard(size, state),
                      SizedBox(height: size.height * 0.02),
                      _buildAttendanceSummary(size, state),
                      SizedBox(height: size.height * 0.02),
                      _buildMidLeavesCard(size),
                      SizedBox(height: size.height * 0.02),
                    ],
                  ),
                ),
              ),
            );
          } else if (state is AttendanceError) {
            return RefreshIndicator(
              onRefresh: _onRefresh,
              color: Colors.orange,
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Container(
                  height: MediaQuery.of(context).size.height - 100,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.error_outline, size: 64, color: Colors.red),
                        const SizedBox(height: 16),
                        Text('Error: ${state.message}'),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () => _onRefresh(),
                          child: const Text('Retry'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          } else {
            return RefreshIndicator(
              onRefresh: _onRefresh,
              color: Colors.orange,
              child: const SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                child: Center(
                  child: Padding(
                    padding: EdgeInsets.all(20.0),
                    child: Text('Please wait...'),
                  ),
                ),
              ),
            );
          }
        },
      ),
    );
  }

  Widget _buildCheckInCard(Size size, AttendanceLoaded state) {
    if (state.checkIn) {
      return Card(
        margin: const EdgeInsets.all(3),
        elevation: 3,
        shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(left: size.height * 0.02, top: size.height * 0.02),
              child: Text("Mark Your Attendance", style: TextStyle(color: themeObj.textBlack, fontSize: size.width * 0.05)),
            ),
            SizedBox(height: size.height * 0.035),
            Center(child: Text("08:45:00 AM", style: TextStyle(fontSize: size.width * 0.065, fontWeight: FontWeight.w600))),
            Center(child: Text("March 12 2023 - Friday", style: TextStyle(color: themeObj.textgrey, fontSize: size.width * 0.035))),
            SizedBox(height: size.height * 0.02),
            Center(
              child: CircleAvatar(
                backgroundColor: const Color.fromRGBO(216, 180, 254, 0.3),
                radius: size.height * 0.068,
                child: TextButton(
                  onPressed: () {
                    context.read<TeacherAttendanceCheckInBloc>().add(const UpdateCheckState(checkIn: false, checkOut: true, takeBreak: false));
                  },
                  child: CircleAvatar(
                    backgroundColor: const Color.fromRGBO(216, 180, 254, 1),
                    radius: size.height * 0.053,
                    child: Text("Check In", style: TextStyle(color: themeObj.textWhite, fontSize: size.width * 0.035)),
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(left: size.width * 0.05, right: size.width * 0.05, top: size.height * 0.02),
              child: SizedBox(
                  width: size.width * 0.85,
                  child: Text("Check in and get started on your successful day.", style: TextStyle(color: themeObj.textgrey, fontSize: size.width * 0.035))),
            ),
            SizedBox(height: size.height * 0.01)
          ],
        ),
      );
    } else if (state.checkOut) {
      return Card(
        margin: const EdgeInsets.all(3),
        elevation: 5,
        shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(left: size.height * 0.02, top: size.height * 0.02),
              child: Text("Mark Your Attendance", style: TextStyle(color: themeObj.textBlack, fontSize: size.width * 0.05)),
            ),
            SizedBox(height: size.height * 0.025),
            Center(child: Text("08:45:00 AM", style: TextStyle(fontSize: size.width * 0.065, fontWeight: FontWeight.w600))),
            Center(child: Text("March 12 2023 - Friday", style: TextStyle(color: themeObj.textgrey, fontSize: size.width * 0.035))),
            SizedBox(height: size.height * 0.035),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Card(
                  margin: EdgeInsets.zero,
                  shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
                  child: TextButton(
                    style: TextButton.styleFrom(shape: const RoundedRectangleBorder()),
                    onPressed: () {
                      context.read<TeacherAttendanceCheckInBloc>().add(const UpdateCheckState(checkIn: true, checkOut: false, takeBreak: false));
                    },
                    child: Text("Check out", style: TextStyle(fontSize: size.width * 0.035, color: themeObj.textBlack)),
                  ),
                ),
                Card(
                  color: themeObj.secondayColor,
                  margin: EdgeInsets.zero,
                  shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
                  child: TextButton(
                    style: TextButton.styleFrom(shape: const RoundedRectangleBorder()),
                    onPressed: () {
                      context.read<TeacherAttendanceCheckInBloc>().add(const UpdateCheckState(checkIn: false, checkOut: false, takeBreak: true));
                    },
                    child: Text("Take a Break", style: TextStyle(fontSize: size.width * 0.035, color: themeObj.textBlack)),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.01),
            Divider(color: themeObj.textgrey, indent: 25, endIndent: 20),
            SizedBox(height: size.height * 0.01),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildStatusColumn(size, "assets/Images/Group 1.png", "08:10 AM", "Check In"),
                _buildStatusColumn(size, "assets/Images/Group 2.png", "08:10 PM", "Check out"),
                _buildStatusColumn(size, "assets/Images/Group 3.png", "___", "Total hours"),
              ],
            ),
            SizedBox(height: size.height * 0.02),
          ],
        ),
      );
    } else {
      // takeBreak == true
      return Card(
        margin: const EdgeInsets.all(3),
        shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(height: size.height * 0.01),
            Text("Its your Break Time !", style: TextStyle(color: themeObj.textBlack, fontSize: size.width * 0.05)),
            Image.asset("assets/Images/Cup.png", height: size.height * 0.09, fit: BoxFit.contain),
            Text("08:45:00", style: TextStyle(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Your Break Time Start from  ", style: TextStyle(color: themeObj.textgrey, fontSize: size.width * 0.035)),
                Text("08:45 PM", style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.bold, fontSize: size.width * 0.035)),
              ],
            ),
            SizedBox(height: size.height * 0.005),
            Card(
              elevation: 3,
              margin: EdgeInsets.zero,
              shape: RoundedRectangleBorder(side: const BorderSide(color: Color(0xFF5A77BC), width: 2), borderRadius: BorderRadius.circular(8)),
              child: SizedBox(
                height: size.height * 0.06,
                width: size.width * 0.66,
                child: TextButton(
                  style: TextButton.styleFrom(shape: const RoundedRectangleBorder(), backgroundColor: themeObj.secondayColor),
                  onPressed: () {
                    context.read<TeacherAttendanceCheckInBloc>().add(const UpdateCheckState(checkIn: false, checkOut: true, takeBreak: false));
                  },
                  child: Text("End", textAlign: TextAlign.center, style: TextStyle(fontSize: size.width * 0.04, color: themeObj.textBlack)),
                ),
              ),
            ),
            SizedBox(height: size.height * 0.005),
            const Divider(color: Colors.grey, indent: 25, endIndent: 20),
            SizedBox(height: size.height * 0.008),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildStatusColumn(size, "assets/Images/Group 1.png", "08:10 AM", "Check In"),
                _buildStatusColumn(size, "assets/Images/Group 2.png", "08:10 PM", "Check out"),
                _buildStatusColumn(size, "assets/Images/Group 3.png", "___", "Total hours"),
              ],
            ),
            SizedBox(height: size.height * 0.02),
          ],
        ),
      );
    }
  }

  Widget _buildStatusColumn(Size size, String imagePath, String timeText, String label) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Image.asset(imagePath, height: size.height * 0.025),
        Text(timeText, style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.bold, fontSize: size.width * 0.035)),
        Text(label, style: TextStyle(color: themeObj.textgrey, fontSize: size.width * 0.035)),
      ],
    );
  }

  Widget _buildAttendanceSummary(Size size, AttendanceLoaded state) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text("Attendance Summary", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.05, fontWeight: FontWeight.w600)),
            Text("April 2024", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.05, fontWeight: FontWeight.w600)),
          ],
        ),
        SizedBox(height: size.height * 0.01),
        Container(
          color: const Color.fromRGBO(254, 215, 170, 1),
          height: size.height * 0.06,
          child: Row(
            children: [
              SizedBox(width: size.width * 0.25, child: Text("Date", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w500))),
              SizedBox(width: size.width * 0.25, child: Text("Check-IN", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w500))),
              SizedBox(width: size.width * 0.25, child: Text("Check-Out", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w500))),
              SizedBox(width: size.width * 0.23, child: Text("Working Hrs", overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w500))),
            ],
          ),
        ),
        SizedBox(
          height: size.height * 0.4,
          child: ListView.builder(
            shrinkWrap: true,
            itemCount: state.attendance.length,
            itemBuilder: (context, index) {
              final data = state.attendance[index];
              return Container(
                color: const Color.fromRGBO(254, 215, 170, 0.3),
                height: size.height * 0.06,
                child: Row(
                  children: [
                    SizedBox(width: size.width * 0.25, child: Text(data.date, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w400))),
                    SizedBox(width: size.width * 0.25, child: Text(data.checkIn, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w400))),
                    SizedBox(width: size.width * 0.25, child: Text(data.checkOut, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w400))),
                    SizedBox(width: size.width * 0.23, child: Text(data.workingHour, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w400))),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildMidLeavesCard(Size size) {
    return Card(
      elevation: 3,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
      child: Container(
        padding: const EdgeInsets.all(3),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(left: size.height * 0.01),
              child: Text("Mid Leaves", style: TextStyle(color: themeObj.textBlack, fontSize: size.width * 0.05)),
            ),
            SizedBox(height: size.height * 0.02),
            Card(
              color: themeObj.secondayColor,
              shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
              child: SizedBox(
                height: size.height * 0.06,
                child: Row(
                  children: [
                    SizedBox(width: size.width * 0.03),
                    Text("02", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.05, fontWeight: FontWeight.w600)),
                    SizedBox(width: size.width * 0.03),
                    Text("Early Leaves", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045)),
                  ],
                ),
              ),
            ),
            Card(
              color: const Color(0xFFFF7F7F),
              shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
              child: SizedBox(
                height: size.height * 0.06,
                child: Row(
                  children: [
                    SizedBox(width: size.width * 0.03),
                    Text("05", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.05, fontWeight: FontWeight.w600)),
                    SizedBox(width: size.width * 0.03),
                    Text("Absent", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045)),
                  ],
                ),
              ),
            ),
            Card(
              color: themeObj.secondayColor,
              shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
              child: SizedBox(
                height: size.height * 0.06,
                child: Row(
                  children: [
                    SizedBox(width: size.width * 0.03),
                    Text("05", style: GoogleFonts.openSans(fontSize: size.width * 0.05, fontWeight: FontWeight.w600)),
                    SizedBox(width: size.width * 0.03),
                    Text("Late in", style: GoogleFonts.openSans(fontSize: size.width * 0.045)),
                  ],
                ),
              ),
            ),
            Card(
              color: themeObj.secondayColor,
              shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey, width: 1), borderRadius: BorderRadius.circular(12)),
              child: SizedBox(
                height: size.height * 0.06,
                child: Row(
                  children: [
                    SizedBox(width: size.width * 0.03),
                    Text("08", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.05, fontWeight: FontWeight.w600)),
                    SizedBox(width: size.width * 0.03),
                    Text("Leaves", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
