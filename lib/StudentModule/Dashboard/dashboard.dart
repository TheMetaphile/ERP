import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../CustomTheme/customTheme.dart';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fl_chart/fl_chart.dart';

import '../../StudentAPIs/Fees/fees_Stats.dart';
import '../../StudentAPIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';

class StudentDashboard extends StatefulWidget {
  const StudentDashboard({Key? key}) : super(key: key);

  @override
  State<StudentDashboard> createState() => _StudentDashboardState();
}

class _StudentDashboardState extends State<StudentDashboard> with SingleTickerProviderStateMixin {
  Map<String, dynamic> feeStats = {};
  Map<String, dynamic> attendanceStats = {};
  bool isLoading = false;
  late AnimationController _animationController;
  late Animation<double> _animation;

  FeesStatsApi apiObj=FeesStatsApi();
  AttendanceApi attenObj=AttendanceApi();

  Future<void> fetchStats() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      var data=await apiObj.fetchStats(accessToken);


      feeStats=data;
      print("feeStats $feeStats");

    } catch (e) {
      print(e);
      showRedSnackBar("$e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }


  Future<void> fetchAttendanceStats() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      var data=await attenObj.attendanceStats(accessToken);


      attendanceStats=data;
      print("attendanceStats $attendanceStats");

    } catch (e) {
      print(e);
      showRedSnackBar("$e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _animation = CurvedAnimation(parent: _animationController, curve: Curves.easeInOut);
    fetchStats();
    fetchAttendanceStats();
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  // ... (keep the fetchStats and fetchAttendanceStats methods as they are)

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildFeeOverview(size, themeObj),
            _buildAttendanceSection(context),
          ],
        ),
      ),
    );
  }



  Widget _buildFeeOverview(Size size, CustomTheme themeObj) {
    return Card(
      margin: EdgeInsets.all(16),
      elevation: 8,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Fee Overview", style: themeObj.bigNormalText.copyWith(fontSize: size.width * 0.055, fontWeight: FontWeight.w500)),
            SizedBox(height: size.height * 0.02),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              childAspectRatio: 1.3,
              mainAxisSpacing: 15,
              crossAxisSpacing: 15,
              children: [
                _buildFeeCard("Total Payable", feeStats["total"]?.toString() ?? "0", Icons.monetization_on, Colors.indigo, size),
                _buildFeeCard("Total Paid", feeStats["paid"]?.toString() ?? "0", Icons.account_balance_wallet, Colors.green, size),
                _buildFeeCard("Total Discount", feeStats["discount"]?.toString() ?? "0", Icons.discount, Colors.orange, size),
                _buildFeeCard("Pending", "${int.parse(feeStats["total"]?.toString() ?? "0") - int.parse(feeStats["paid"]?.toString() ?? "0") - int.parse(feeStats["discount"]?.toString() ?? "0")}", Icons.pending_actions, Colors.red, size),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeeCard(String title, String amount, IconData icon, Color color, Size size) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.scale(
          scale: _animation.value,
          child: Card(
            elevation: 5,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: LinearGradient(
                  colors: [color.withOpacity(0.7), color.withOpacity(0.9)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(icon, size: size.width * 0.08, color: Colors.white),
                  SizedBox(height: size.height * 0.01),
                  Text('₹ $amount', style: GoogleFonts.poppins(fontSize: size.width * 0.045, fontWeight: FontWeight.w600, color: Colors.white)),
                  SizedBox(height: size.height * 0.01),
                  Text(title, style: GoogleFonts.poppins(fontSize: size.width * 0.035, color: Colors.white)),
                ],
              ),
            ),
          ),
        );
      },
    );
  }


  Widget _buildAttendanceSection(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    int absent = attendanceStats['absent'] ?? 0;
    int leave = attendanceStats['leave'] ?? 0;
    int present = attendanceStats['present'] ?? 0;
    int total = present + absent + leave;

    List<PieChartSection> sections = total == 0
        ? [PieChartSection(color: Colors.grey, value: 1, label: '0%')]
        : [
      PieChartSection(
        color: Colors.green,
        value: present.toDouble(),
        label: '${(present / total * 100).toStringAsFixed(1)}%',
      ),
      PieChartSection(
        color: Colors.red,
        value: absent.toDouble(),
        label: '${(absent / total * 100).toStringAsFixed(1)}%',
      ),
      PieChartSection(
        color: Colors.orange,
        value: leave.toDouble(),
        label: '${(leave / total * 100).toStringAsFixed(1)}%',
      ),
    ];

    return Card(
      margin: EdgeInsets.all(16),
      elevation: 8,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Attendance Statistics",
              style: themeObj.bigNormalText.copyWith(fontSize: size.width * 0.045, fontWeight: FontWeight.w500),
            ),
            SizedBox(height: size.height * 0.02),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatCard("Present", size, present, Colors.green, themeObj),
                _buildStatCard("Absent", size, absent, Colors.red, themeObj),
                _buildStatCard("Leave", size, leave, Colors.orange, themeObj),
              ],
            ),
            SizedBox(height: size.height * 0.025),
            Center(
              child: CircularEndPieChart(
                sections: sections,
                size: size.width * 0.5,
              ),
            ),
            SizedBox(height: size.height * 0.02),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildLegend(Colors.green, "Present"),
                SizedBox(width: 16),
                _buildLegend(Colors.red, "Absent"),
                SizedBox(width: 16),
                _buildLegend(Colors.orange, "Leave"),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String title, Size size, int value, Color color, CustomTheme themeObj) {
    return Column(
      children: [
        Text(
          "$value",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color),
        ),
        SizedBox(height: 5),
        Text(
          title,
          style: TextStyle(fontSize: 14, color: Colors.black54),
        ),
      ],
    );
  }

  Widget _buildLegend(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 16,
          height: 16,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        SizedBox(width: 4),
        Text(label),
      ],
    );
  }
}

class CircularEndPieChart extends StatelessWidget {
  final List<PieChartSection> sections;
  final double size;

  CircularEndPieChart({required this.sections, required this.size});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(size, size),
      painter: CircularEndPieChartPainter(sections: sections),
    );
  }
}

class PieChartSection {
  final Color color;
  final double value;
  final String label;

  PieChartSection({required this.color, required this.value, required this.label});
}

class CircularEndPieChartPainter extends CustomPainter {
  final List<PieChartSection> sections;

  CircularEndPieChartPainter({required this.sections});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;
    final strokeWidth = radius * 0.4; // Adjust this to change the thickness of the chart

    double totalValue = sections.fold(0, (sum, section) => sum + section.value);
    double startAngle = -pi / 2;

    for (var section in sections) {
      final sweepAngle = 2 * pi * (section.value / totalValue);
      final paint = Paint()
        ..color = section.color
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth
        ..strokeCap = StrokeCap.round;

      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius - strokeWidth / 2),
        startAngle,
        sweepAngle,
        false,
        paint,
      );

      // Draw the label
      final labelAngle = startAngle + sweepAngle / 2;
      final labelRadius = radius - strokeWidth / 2;
      final labelPosition = Offset(
        center.dx + labelRadius * cos(labelAngle),
        center.dy + labelRadius * sin(labelAngle),
      );

      TextPainter(
        text: TextSpan(
          text: section.label,
          style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
        ),
        textDirection: TextDirection.ltr,
      )
        ..layout()
        ..paint(canvas, labelPosition - Offset(15, 7)); // Adjust offset for centering

      startAngle += sweepAngle;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}