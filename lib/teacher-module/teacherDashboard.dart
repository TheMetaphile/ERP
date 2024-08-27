import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';

import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../Charts/classprogressGraph.dart';
import '../utils/theme.dart';


class TeacherDashboard extends StatefulWidget {
  const TeacherDashboard({super.key});

  @override
  State<TeacherDashboard> createState() => _TeacherDashboardState();
}

class _TeacherDashboardState extends State<TeacherDashboard>with SingleTickerProviderStateMixin {

  CustomTheme themeObj=CustomTheme();
  final List<Map<String, dynamic>> _attendance = [
    {'date': '11 Tue', 'check-in': '09:00am', 'check-out': '08:45pm','working-hour':'08:20m'},
    {'date': '12 Wed', 'check-in': '09:15am','check-out':'08:45pm','working-hour':'08:10m'},
    {'date': '13 Thru', 'check-in': '09:30am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '14 Fri', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:20m'},
    {'date': '15 Sat', 'check-in': '09:10am','check-out':'08:45pm','working-hour':'08:15m'},
    {'date': '16 Mon', 'check-in': '09:00am','check-out':'08:45pm','working-hour':'08:10m'},

  ];
  List<Map<String, String>> cardType=[
    {
      "type":"Total Subject",
      "number":"6"
    },
    {
      "type":"Total Classes",
      "number":"3"
    },
    {
      "type":"Total Students",
      "number":"120"
    },
  ];
  String?teacherName;
  String?profileLink;
  String?teacheremail;
  String?employeeID;
  List<String> cardImage=["assets/Images/TeacherDashboard/subject.png","assets/Images/TeacherDashboard/class.png","assets/Images/TeacherDashboard/student.png",];
  Future<void> getDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    setState(() {
      teacherName = pref.getString("name");
      profileLink = pref.getString("profileLink");
      teacheremail = pref.getString("email");
      employeeID = pref.getString("employeeId");
    });
  }

  late AnimationController _controller;
  late Animation<double> _animation;
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    _controller.forward();
    getDetails();
  }

  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: _buildWelcomeMessage(size),
              ),
              SizedBox(height: size.height * 0.02),
              Padding(
                padding: const EdgeInsets.all(13.0),
                child: _buildCardGrid(size),
              ),
              SizedBox(height: size.height * 0.01),
              _buildClassProgressGraph(),
              SizedBox(height: size.height * 0.01),
              _buildAttendanceSummary(size),
            ],
          ),
        ),
      ),

    );
  }

  Widget _buildWelcomeMessage(Size size) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, 4 * _controller.value),
          child: child,
        );
      },
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "Welcome back, ",
              style: GoogleFonts.openSans(
                color: Colors.black87,
                fontWeight: FontWeight.w500,
                fontSize: size.width * 0.055,
              ),
            ),
            TextSpan(
              text: '${teacherName ?? 'Teacher'}',
              style: GoogleFonts.openSans(
                color: Colors.orange,
                fontWeight: FontWeight.w600,
                fontSize: size.width * 0.06,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCardGrid(Size size) {
    return AnimationLimiter(
      child: GridView.builder(
        shrinkWrap: true,
        physics: NeverScrollableScrollPhysics(),
        itemCount: cardType.length,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          childAspectRatio: 1.3,
          crossAxisCount: 2,
          crossAxisSpacing: size.width * 0.02,
          mainAxisSpacing: size.width * 0.02,
        ),
        itemBuilder: (context, index) {
          return  AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Transform.scale(
                scale: _animation.value,
                child: _buildCard(size, index),
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildCard(Size size, int index) {
    final cardCategory = cardType[index];
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () {
          // TODO: Implement card action
        },
        child: Container(
          padding: EdgeInsets.all(5),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                cardImage[index],
                height: size.height * 0.05,
                color: Colors.orange,
              ),
              SizedBox(height: 8),
              Text(
                cardCategory["type"]!,
                style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black87),
              ),
              Text(
                cardCategory["number"]!,
                style: GoogleFonts.openSans(fontSize: size.width * 0.05, color: Colors.black, fontWeight: FontWeight.w600),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildClassProgressGraph() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: 1),
        duration: Duration(seconds: 1),
        builder: (context, value, child) {
          return ClassProgressGrapth(
          );
        },
      ),
    );
  }
  Widget _buildAttendanceSummary(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Attendance Summary",overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(
                    fontSize: size.width*0.045,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                _buildMonthSelector(),
              ],
            ),
            SizedBox(height: 16),
            SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: _buildAttendanceTable(size)),
          ],
        ),
      ),
    );
  }

  Widget _buildMonthSelector() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 1, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.orange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.arrow_back_ios, size: 14, color: Colors.orange),
          SizedBox(width: 8),
          Text(
            "April 2024",
            style: GoogleFonts.openSans(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Colors.orange,
            ),
          ),
          SizedBox(width: 2),
          Icon(Icons.arrow_forward_ios, size: 14, color: Colors.orange),
        ],
      ),
    );
  }

  Widget _buildAttendanceTable(Size size) {
    return Column(
      children: [
        _buildTableHeader(size),
        SizedBox(height: 8),
        ..._attendance.asMap().entries.map((entry) {
          int idx = entry.key;
          Map<String, dynamic> data = entry.value;
          return AnimationConfiguration.staggeredList(
            position: idx,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: _buildTableRow(size, data),
              ),
            ),
          );
        }).toList(),
      ],
    );
  }

  Widget _buildTableHeader(Size size) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        color: Colors.orange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          _buildHeaderCell(size, "Date", 0.23),
          _buildHeaderCell(size, "Check-In", 0.23),
          _buildHeaderCell(size, "Check-Out", 0.23),
          _buildHeaderCell(size, "Working Hrs", 0.23),
        ],
      ),
    );
  }

  Widget _buildHeaderCell(Size size, String text, double widthFactor) {
    return SizedBox(
      width: size.width * widthFactor,
      child: Text(
        text,
        overflow: TextOverflow.ellipsis,
        textAlign: TextAlign.center,
        style: GoogleFonts.openSans(
          fontSize: size.width*0.035,
          fontWeight: FontWeight.w600,
          color: Colors.orange,
        ),
      ),
    );
  }

  Widget _buildTableRow(Size size, Map<String, dynamic> data) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: Colors.grey.withOpacity(0.2))),
      ),
      child: Row(
        children: [
          _buildRowCell(size, data['date'], 0.23),
          _buildRowCell(size, data['check-in'], 0.23),
          _buildRowCell(size, data['check-out'], 0.23),
          _buildRowCell(size, data['working-hour'], 0.23),
        ],
      ),
    );
  }

  Widget _buildRowCell(Size size, String text, double widthFactor) {
    return SizedBox(
      width: size.width * widthFactor,
      child: Text(
        text,
        overflow: TextOverflow.ellipsis,
        textAlign: TextAlign.center,
        style: GoogleFonts.openSans(
          fontSize: size.width*0.03,
          color: Colors.black87,
        ),
      ),
    );
  }
}

