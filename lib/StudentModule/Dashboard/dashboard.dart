import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/APIs/Fees/fees_Stats.dart';

import '../../APIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';
import '../../CustomTheme/customTheme.dart';

class StudentDashboard extends StatefulWidget {
  const StudentDashboard({super.key});

  @override
  State<StudentDashboard> createState() => _StudentDashboardState();
}

class _StudentDashboardState extends State<StudentDashboard> {

  Map<String,dynamic> feeStats={};
  Map<String,dynamic> attendanceStats={};
  bool isLoading=false;
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
    // TODO: implement initState
    super.initState();
    fetchStats();
    fetchAttendanceStats();
  }
  @override
  Widget build(BuildContext context) {

    String totalFees = feeStats["total"]?.toString() ?? "0";
    String paid = feeStats["paid"]?.toString() ?? "0";
    String discount = feeStats["discount"]?.toString() ?? "0";

    int totalInt = int.tryParse(totalFees) ?? 0;
    int paidInt = int.tryParse(paid) ?? 0;
    int discountInt = int.tryParse(discount) ?? 0;

    String pending = (totalInt - paidInt - discountInt).toString();

    // int total = attendanceStats['present'] +attendanceStats['absent'] + attendanceStats['leave']??0;
    int absent = attendanceStats['absent']??0;
    int leave = attendanceStats['leave']??0;
    int present = attendanceStats['present']??0;
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildFeeSection(context),
            _buildAttendanceSection(context),
          ],
        ),
      ),
    );
  }


  Widget _buildFeeSection(BuildContext context) {
    String totalFees = feeStats["total"]?.toString() ?? "0";
    String paid = feeStats["paid"]?.toString() ?? "0";
    String discount = feeStats["discount"]?.toString() ?? "0";
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8,vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [

          Text(
            'Fee Statistics',
            style:themeObj.bigNormalText.copyWith(fontSize:size.width*0.045,fontWeight: FontWeight.w500),
          ),
          SizedBox(height: size.height*0.02),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            childAspectRatio: 1.0,
            mainAxisSpacing: 15,
            crossAxisSpacing: 15,
            children: [
              _buildFeeCard("Total Payable", totalFees, Icons.monetization_on, Colors.indigo),
              _buildFeeCard("Total Paid", paid, Icons.account_balance_wallet, Colors.green),
              _buildFeeCard("Total Discount", discount, Icons.discount, Colors.orange),
              _buildFeeCard("Pending", "${int.parse(totalFees)-int.parse(paid)-int.parse(discount)}", Icons.pending_actions, Colors.red),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFeeCard(String title, String amount, IconData icon, Color color) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          gradient: LinearGradient(
            colors: [color.withOpacity(0.7), color.withOpacity(0.9)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 40, color: Colors.white),
              SizedBox(height: 10),
              Text('₹ $amount', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
              SizedBox(height: 5),
              Text(title, style: TextStyle(fontSize: 14, color: Colors.white70)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAttendanceSection(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    int absent = attendanceStats['absent']??0;
    int leave = attendanceStats['leave']??0;
    int present = attendanceStats['present']??0;
    return Container(
      margin: const EdgeInsets.all(20),
      padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Attendance Statistics",
        style:themeObj.bigNormalText.copyWith(fontSize:size.width*0.045,fontWeight: FontWeight.w500),
          ),
          SizedBox(height: size.height*0.02),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatCard("Present", size, present, Colors.green, themeObj),
              _buildStatCard("Absent", size, absent, Colors.red, themeObj),
              _buildStatCard("Leave", size, leave, Colors.orange, themeObj),
            ],
          ),
          SizedBox(height: size.height*0.025),
          Center(
            child: SizedBox(
              height: size.width * 0.35,
              width: size.width * 0.35,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  CircularProgressIndicator(
                    value: (present + absent + leave) > 0
                        ? present / (present + absent + leave)
                        : 0,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.green),
                    strokeWidth: 12,
                    backgroundColor: Colors.red[300],
                  ),
                  Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          "${(present + absent + leave) > 0
                              ? (present / (present + absent + leave) * 100).toStringAsFixed(1)
                              : 0}%",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        Text(
                          'Attendance',
                          style: TextStyle(fontSize: 16, color: Colors.black54),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(height: size.height*0.01),
        ],
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
}

