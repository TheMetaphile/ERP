import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/APIs/Fees/fees_Stats.dart';

import '../../APIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';
import '../../CustomTheme/customTheme.dart';

// class StudentDashboard extends StatefulWidget {
//   const StudentDashboard({super.key});
//
//   @override
//   State<StudentDashboard> createState() => _StudentDashboardState();
// }
//
// class _StudentDashboardState extends State<StudentDashboard> {
//
//   Map<String,dynamic> feeStats={};
//   Map<String,dynamic> attendanceStats={};
//   bool isLoading=false;
//   FeesStatsApi apiObj=FeesStatsApi();
//   AttendanceApi attenObj=AttendanceApi();
//
//   Future<void> fetchStats() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//
//       var data=await apiObj.fetchStats(accessToken);
//
//
//       feeStats=data;
//       print("feeStats $feeStats");
//
//     } catch (e) {
//       print(e);
//       showRedSnackBar("$e", context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//
//   Future<void> fetchAttendanceStats() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//
//       var data=await attenObj.attendanceStats(accessToken);
//
//
//       attendanceStats=data;
//       print("attendanceStats $attendanceStats");
//
//     } catch (e) {
//       print(e);
//       showRedSnackBar("$e", context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//
//   @override
//   void initState() {
//     // TODO: implement initState
//     super.initState();
//     fetchStats();
//     fetchAttendanceStats();
//   }
//   @override
//   Widget build(BuildContext context) {
//
//     String totalFees = feeStats["total"]?.toString() ?? "0";
//     String paid = feeStats["paid"]?.toString() ?? "0";
//     String discount = feeStats["discount"]?.toString() ?? "0";
//
//     int totalInt = int.tryParse(totalFees) ?? 0;
//     int paidInt = int.tryParse(paid) ?? 0;
//     int discountInt = int.tryParse(discount) ?? 0;
//
//     String pending = (totalInt - paidInt - discountInt).toString();
//
//     // int total = attendanceStats['present'] +attendanceStats['absent'] + attendanceStats['leave']??0;
//     int absent = attendanceStats['absent']??0;
//     int leave = attendanceStats['leave']??0;
//     int present = attendanceStats['present']??0;
//     Size size = MediaQuery.of(context).size;
//     CustomTheme themeObj = CustomTheme(size);
//
//     return Scaffold(
//       body: SingleChildScrollView(
//         child: Column(
//           children: [
//             _buildFeeOverview(size,themeObj),
//             _buildAttendanceSection(context),
//           ],
//         ),
//       ),
//     );
//   }
//
//
//   Widget _buildFeeOverview(Size size, CustomTheme themeObj) {
//     return Column(
//       crossAxisAlignment: CrossAxisAlignment.start,
//       children: [
//         Padding(
//           padding: const EdgeInsets.only(left: 8.0,top: 8),
//           child: Text("Fee Overview", style: themeObj.bigNormalText.copyWith(fontSize: size.width*0.055, fontWeight: FontWeight.w500)),
//         ),
//         SizedBox(height: size.height * 0.01),
//         GridView.count(
//           crossAxisCount: 2,
//           shrinkWrap: true,
//           physics: NeverScrollableScrollPhysics(),
//           childAspectRatio: 1.3,
//           mainAxisSpacing: 15,
//           crossAxisSpacing: 15,
//           children: [
//             _buildFeeCard("Total Payable", feeStats["total"]?.toString() ?? "0", Icons.monetization_on, Colors.indigo, size),
//             _buildFeeCard("Total Paid", feeStats["paid"]?.toString() ?? "0", Icons.account_balance_wallet, Colors.green, size),
//             _buildFeeCard("Total Discount", feeStats["discount"]?.toString() ?? "0", Icons.discount, Colors.orange, size),
//             _buildFeeCard("Pending", "${int.parse(feeStats["total"]?.toString() ?? "0") - int.parse(feeStats["paid"]?.toString() ?? "0") - int.parse(feeStats["discount"]?.toString() ?? "0")}", Icons.pending_actions, Colors.red, size),
//           ],
//         ),
//       ],
//     );
//   }
//
//   Widget _buildFeeCard(String title, String amount, IconData icon, Color color, Size size) {
//     return Card(
//       elevation: 5,
//       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
//       child: Container(
//         // decoration: BoxDecoration(
//         //   borderRadius: BorderRadius.circular(20),
//         //   gradient: LinearGradient(
//         //     colors: [color.withOpacity(0.7), color.withOpacity(0.9)],
//         //     begin: Alignment.topLeft,
//         //     end: Alignment.bottomRight,
//         //   ),
//         // ),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             Icon(icon, size: size.width * 0.08, color: Colors.black),
//             SizedBox(height: size.height * 0.01),
//             Text('₹ $amount', style: GoogleFonts.poppins(fontSize: size.width*0.045, fontWeight: FontWeight.w600, color: Colors.black)),
//             SizedBox(height: size.height * 0.01),
//             Text(title, style: GoogleFonts.poppins(fontSize: size.width*0.035, color: Colors.black)),
//           ],
//         ),
//       ),
//     );
//   }
//
//   Widget _buildAttendanceSection(BuildContext context) {
//
//     Size size = MediaQuery.of(context).size;
//     CustomTheme themeObj = CustomTheme(size);
//     int absent = attendanceStats['absent']??0;
//     int leave = attendanceStats['leave']??0;
//     int present = attendanceStats['present']??0;
//     return Container(
//       margin: const EdgeInsets.all(20),
//       padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 8),
//       decoration: BoxDecoration(
//         color: Colors.white,
//         borderRadius: BorderRadius.circular(20),
//         boxShadow: [
//           BoxShadow(
//             color: Colors.grey.withOpacity(0.1),
//             spreadRadius: 5,
//             blurRadius: 7,
//             offset: Offset(0, 3),
//           ),
//         ],
//       ),
//       child: Column(
//         crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           Text(
//             "Attendance Statistics",
//         style:themeObj.bigNormalText.copyWith(fontSize:size.width*0.045,fontWeight: FontWeight.w500),
//           ),
//           SizedBox(height: size.height*0.02),
//           Row(
//             mainAxisAlignment: MainAxisAlignment.spaceAround,
//             children: [
//               _buildStatCard("Present", size, present, Colors.green, themeObj),
//               _buildStatCard("Absent", size, absent, Colors.red, themeObj),
//               _buildStatCard("Leave", size, leave, Colors.orange, themeObj),
//             ],
//           ),
//           SizedBox(height: size.height*0.025),
//           Center(
//             child: SizedBox(
//               height: size.width * 0.35,
//               width: size.width * 0.35,
//               child: Stack(
//                 fit: StackFit.expand,
//                 children: [
//                   CircularProgressIndicator(
//                     value: (present + absent + leave) > 0
//                         ? present / (present + absent + leave)
//                         : 0,
//                     valueColor: AlwaysStoppedAnimation<Color>(Colors.green),
//                     strokeWidth: 12,
//                     backgroundColor: Colors.red[300],
//                   ),
//                   Center(
//                     child: Column(
//                       mainAxisSize: MainAxisSize.min,
//                       children: [
//                         Text(
//                           "${(present + absent + leave) > 0
//                               ? (present / (present + absent + leave) * 100).toStringAsFixed(1)
//                               : 0}%",
//                           style: TextStyle(
//                             fontSize: 24,
//                             fontWeight: FontWeight.bold,
//                             color: Colors.black87,
//                           ),
//                         ),
//                         Text(
//                           'Attendance',
//                           style: TextStyle(fontSize: 16, color: Colors.black54),
//                         ),
//                       ],
//                     ),
//                   ),
//                 ],
//               ),
//             ),
//           ),
//           SizedBox(height: size.height*0.01),
//         ],
//       ),
//     );
//   }
//
//   Widget _buildStatCard(String title, Size size, int value, Color color, CustomTheme themeObj) {
//     return Column(
//       children: [
//         Text(
//           "$value",
//           style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color),
//         ),
//         SizedBox(height: 5),
//         Text(
//           title,
//           style: TextStyle(fontSize: 14, color: Colors.black54),
//         ),
//       ],
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:student/APIs/Fees/fees_Stats.dart';
import 'package:student/APIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';
import 'package:student/CustomTheme/customTheme.dart';

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

            total==0?Center(
              child: SizedBox(
                height: size.width * 0.5,
                width: size.width * 0.5,
                child: PieChart(
                  PieChartData(
                    sectionsSpace: 0,
                    centerSpaceRadius: 70,

                    sections: [
                      PieChartSectionData(
                        color: Colors.grey,
                        value: 1,
                        title: '0%',
                        radius: 30,
                        titleStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
                      ),


                    ],
                  ),
                ),
              ),
            ): Center(
              child: SizedBox(
                height: size.width * 0.5,
                width: size.width * 0.5,
                child: PieChart(
                  PieChartData(
                    sectionsSpace: 0,
                    centerSpaceRadius: 70,

                    sections: [
                      PieChartSectionData(
                        color: Colors.green,
                        value: present.toDouble(),
                        title: '${(present / total * 100).toStringAsFixed(1)}%',
                        radius: 30,
                        titleStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
                      ),
                      PieChartSectionData(
                        color: Colors.red,
                        value: absent.toDouble(),
                        title: '${(absent / total * 100).toStringAsFixed(1)}%',
                        radius: 30,
                        titleStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
                      ),
                      PieChartSectionData(
                        color: Colors.orange,
                        value: leave.toDouble(),
                        title: '${(leave / total * 100).toStringAsFixed(1)}%',
                        radius: 30,
                        titleStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
                      ),

                    ],
                  ),
                ),
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
          color: color,
        ),
        SizedBox(width: 4),
        Text(label),
      ],
    );
  }
}