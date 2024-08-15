import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/CustomTheme/customTheme.dart';

import '../../APIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';

class StudentAttendanceUI extends StatefulWidget {

  @override
  State<StudentAttendanceUI> createState() => _StudentAttendanceUIState();
}

class _StudentAttendanceUIState extends State<StudentAttendanceUI> {
  AttendanceApi apiObj=AttendanceApi();

   Map<String, dynamic>? attendanceData;
   bool isLoading=false;
  int selectedMonthIndex = DateTime.now().month - 1;

  String selectedYear = DateTime.now().year.toString();
  List<String> years = List.generate(19, (index) => (2009 + index).toString());

  List<String> months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];




  Future<void> fetchAttendance() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      var data  = await apiObj.fetchAttendance(accessToken,selectedMonthIndex+1,selectedYear);
      setState(() {
        attendanceData=data;

      });

      print("attendanceData $attendanceData");

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
    fetchAttendance();
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj=CustomTheme(size);
    int total = attendanceData?['total']??0;
    int absent = attendanceData?['absent']??0;
    int leave = attendanceData?['leave']??0;
    int present = total - absent - leave;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            isLoading?  Center(
              child: LoadingAnimationWidget.threeArchedCircle(
                color: CustomTheme.primaryColor,
                size: 50,
              ),
            ):
             SizedBox(
               height: size.height*0.78,
               child: Column(
                 crossAxisAlignment: CrossAxisAlignment.start,
                 children: [
                   SingleChildScrollView(
                     scrollDirection: Axis.horizontal,
                     child: Row(
                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
                       children: [
                         Text("Attendance",overflow: TextOverflow.ellipsis,style: themeObj.bigNormalText,),
                         SizedBox(width: size.width*0.02,),
                         Card(
                           child: Container(
                             width: size.width * 0.3,
                             height: size.height * 0.05,
                             child:    DropdownButton<int>(
                               isExpanded: true,
                               borderRadius: BorderRadius.circular(12),
                               hint: Text("Month", style: themeObj.normalText),
                               padding: EdgeInsets.all(8),
                               icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
                               alignment: Alignment.center,
                               underline: Container(),
                               value: selectedMonthIndex,
                               onChanged: (newValue) {
                                 setState(() {
                                   selectedMonthIndex = newValue!;
                                   attendanceData = {};
                                   fetchAttendance();
                                 });
                               },
                               items: List.generate(12, (index) {
                                 return DropdownMenuItem<int>(
                                   value: index,
                                   child: Text(months[index], overflow: TextOverflow.ellipsis, style: themeObj.normalText),
                                 );
                               }),
                             ),


                           ),
                         ),
                         SizedBox(width: size.width*0.02,),
                         Card(
                           child: Container(
                             width: size.width * 0.3,
                             height: size.height * 0.05,
                             child:DropdownButton<String>(
                               isExpanded: true,
                               borderRadius: BorderRadius.circular(12),
                               hint: Text("Year", style: themeObj.normalText),
                               padding: EdgeInsets.all(8),
                               icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
                               alignment: Alignment.center,
                               underline: Container(),
                               value: selectedYear,
                               onChanged: (newValue) {
                                 setState(() {
                                   selectedYear = newValue!;
                                   attendanceData = {};
                                   fetchAttendance();
                                 });
                               },
                               items: years.map((String year) {
                                 return DropdownMenuItem<String>(
                                   value: year,
                                   child: Text(year, overflow: TextOverflow.ellipsis, style: themeObj.normalText),
                                 );
                               }).toList(),
                             ),


                           ),
                         ),
                       ],
                     ),
                   ),
                   SizedBox(height: size.width*0.02),
                   _buildAttendanceSection(context,present,absent,leave),
                   // Card(
                   //   elevation: 5,
                   //   shape: RoundedRectangleBorder(
                   //     side: BorderSide(color: Colors.grey, width: 1),
                   //     borderRadius: BorderRadius.circular(12),
                   //   ),
                   //   child: Padding(
                   //     padding: const EdgeInsets.all(16.0),
                   //     child: Column(
                   //       crossAxisAlignment: CrossAxisAlignment.start,
                   //       children: [
                   //         Text(
                   //           "Attendance Statistics",
                   //           style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.w500),
                   //         ),
                   //         const SizedBox(height: 16),
                   //         Row(
                   //           mainAxisAlignment: MainAxisAlignment.spaceAround,
                   //           children: [
                   //             _buildStatCard("Present",size, present, Colors.green, themeObj),
                   //             _buildStatCard("Absent", size,absent, Colors.red, themeObj),
                   //             _buildStatCard("Leave", size,leave, Colors.orange, themeObj),
                   //           ],
                   //         ),
                   //         const SizedBox(height: 24),
                   //         Center(
                   //           child: SizedBox(
                   //             height: size.width * 0.3,
                   //             width: size.width * 0.3,
                   //             child: Stack(
                   //               fit: StackFit.expand,
                   //               children: [
                   //                 CircularProgressIndicator(
                   //                   value: (present + absent + leave) > 0
                   //                       ? present / (present + absent + leave)
                   //                       : 0,
                   //                   valueColor: const AlwaysStoppedAnimation<Color>(Colors.blue),
                   //                   strokeWidth: 6,
                   //                   backgroundColor: Colors.grey[400],
                   //                 ),
                   //                 Center(
                   //                   child: Column(
                   //                     mainAxisSize: MainAxisSize.min,
                   //                     children: [
                   //                       Text(
                   //                         "${present + absent + leave}",
                   //                         style: themeObj.normalText.copyWith(
                   //                           fontSize: 24,
                   //                           fontWeight: FontWeight.bold,
                   //                         ),
                   //                       ),
                   //                       Text(
                   //                         'Total Days',
                   //                         style: themeObj.normalText,
                   //                       ),
                   //                     ],
                   //                   ),
                   //                 ),
                   //               ],
                   //             ),
                   //           ),
                   //         ),
                   //       ],
                   //     ),
                   //   ),
                   // ),
                   SizedBox(height: size.width*0.02),
                   Text(
                       "${months[DateTime.now().month-1]} ${DateTime.now().year}",
                       style:themeObj.normalText.copyWith(fontSize: size.width*0.045)
                   ),
                   Expanded(

                     child: _buildMonthlyAttendance(),
                   ),
                        ],
                      ),
             )
          ],
        ),
      ),
    );
  }
  Widget _buildAttendanceSection(BuildContext context,present,absent,leave) {

    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    // int absent = attendanceStats['absent']??0;
    // int leave = attendanceStats['leave']??0;
    // int present = attendanceStats['present']??0;
    return Container(
      margin: const EdgeInsets.all(5),
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
            style: themeObj.normalText.copyWith(fontSize: size.width * 0.045)
        ),
        Text(
          title,
          style: themeObj.normalText.copyWith(fontSize: size.width * 0.045, color: color),
        ),
      ],
    );
  }

  Widget _buildMonthlyAttendance() {
    int year = int.parse(selectedYear);
    int month = selectedMonthIndex + 1; // Convert 0-based index to 1-based month
    DateTime firstDay = DateTime(year, month, 1);
    DateTime lastDay = DateTime(year, month + 1, 0);

    return GridView.builder(
      padding: EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 7,
        childAspectRatio: 1,
        crossAxisSpacing: 4,
        mainAxisSpacing: 4,
      ),
      itemCount: lastDay.difference(firstDay).inDays + 1,
      itemBuilder: (context, index) {
        final date = firstDay.add(Duration(days: index));
        final dateString = DateFormat('dd/MM/yyyy').format(date);
        final alternativeDateString = DateFormat('yyyy-MM-dd').format(date);

        print("Date $date");
        print("dateString $dateString");
        print("alternativeDateString $alternativeDateString");

        String status = attendanceData?["$dateString"] ?? attendanceData?[alternativeDateString] ?? '';
        print("attendanceData?[dateString'] ${attendanceData?["$dateString"]}");
        print("alternativeDateString?[dateString'] ${attendanceData?["$alternativeDateString"]}");
        print("status $status");

        return _buildDayCell(date, status);
      },
    );
  }

  Widget _buildDayCell(DateTime date, String status) {
    Color cellColor;
    String displayStatus = '';

    switch (status.toLowerCase()) {
      case 'present':
        cellColor = Colors.green;
        displayStatus = 'P';
        break;
      case 'absent':
        cellColor = Colors.red;
        displayStatus = 'A';
        break;
      case 'leave':
        cellColor = Colors.orange;
        displayStatus = 'L';
        break;
      default:
        cellColor = Colors.grey[300]!;
        displayStatus = '';
    }

    return Container(
      decoration: BoxDecoration(
        color: cellColor,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            '${date.day}',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          Text(
            displayStatus,
            style: TextStyle(fontSize: 12),
          ),
        ],
      ),
    );
  }
}