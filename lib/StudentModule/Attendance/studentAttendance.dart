import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../CustomTheme/customTheme.dart';
import 'StudentAttendanceBloc/sudent_attendance_bloc.dart';
import 'StudentAttendanceBloc/sudent_attendance_event.dart';
import 'StudentAttendanceBloc/sudent_attendance_state.dart';

class StudentAttendanceUI extends StatefulWidget {
  const StudentAttendanceUI({super.key});

  @override
  State<StudentAttendanceUI> createState() => _StudentAttendanceUIState();
}

class _StudentAttendanceUIState extends State<StudentAttendanceUI> with AutomaticKeepAliveClientMixin {
  final List<String> months = [
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
    'December',
  ];

  final List<String> years = List.generate(19, (index) => (2009 + index).toString());

  @override
  bool get wantKeepAlive => true; // Keep widget state alive across navigation

  @override
  @override
  void initState() {
    super.initState();
    final bloc = context.read<AttendanceBloc>();
    final currentState = bloc.state;


    if (currentState is AttendanceInitial) {
      print('Initializing StudentAttendanceUI with current month/year');
      bloc.add(
        ChangeMonthYear(DateTime.now().month - 1, DateTime.now().year.toString()),
      );
    } else {
      print('Skipping init ChangeMonthYear — already loaded');
    }
  }


  @override
  Widget build(BuildContext context) {
    super.build(context); // Required for AutomaticKeepAliveClientMixin
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: BlocConsumer<AttendanceBloc, AttendanceState>(
          listener: (context, state) {
            if (state is AttendanceError) {
              showRedSnackBar(state.message, context);
            }
          },
          builder: (context, state) {
            print('Building UI with state: $state');
            Size size = MediaQuery.of(context).size;
            CustomTheme themeObj = CustomTheme(size);

            // Use state values, default to current month/year only if no state is set
            int selectedMonthIndex;
            String selectedYear;
            Map<String, dynamic>? attendanceData;
            bool isLoading = false;

            if (state is AttendanceLoading) {
              isLoading = true;
              selectedMonthIndex = state.selectedMonthIndex;
              selectedYear = state.selectedYear;
            } else if (state is AttendanceLoaded) {
              attendanceData = state.attendanceData;
              selectedMonthIndex = state.selectedMonthIndex;
              selectedYear = state.selectedYear;
            } else if (state is AttendanceError) {
              selectedMonthIndex = state.selectedMonthIndex;
              selectedYear = state.selectedYear;
            } else {
              // Fallback for AttendanceInitial
              selectedMonthIndex = DateTime.now().month - 1;
              selectedYear = DateTime.now().year.toString();
            }

            int total = attendanceData?['total'] ?? 0;
            int absent = attendanceData?['absent'] ?? 0;
            int leave = attendanceData?['leave'] ?? 0;
            int present = total - absent - leave;

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                isLoading
                    ? Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: CustomTheme.primaryColor,
                    size: 50,
                  ),
                )
                    : SizedBox(
                  height: size.height * 0.78,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "Attendance",
                              overflow: TextOverflow.ellipsis,
                              style: themeObj.bigNormalText,
                            ),
                            SizedBox(width: size.width * 0.02),
                            Card(
                              child: Container(
                                width: size.width * 0.3,
                                height: size.height * 0.05,
                                child: DropdownButton<int>(
                                  isExpanded: true,
                                  borderRadius: BorderRadius.circular(12),
                                  hint: Text("Month", style: themeObj.normalText),
                                  padding: const EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp,
                                      color: CustomTheme.greyColor),
                                  alignment: Alignment.center,
                                  underline: Container(),
                                  value: selectedMonthIndex,
                                  onChanged: (newValue) {
                                    print('Month changed to: ${months[newValue!]}');
                                    context.read<AttendanceBloc>().add(
                                      ChangeMonthYear(newValue, selectedYear),
                                    );
                                  },
                                  items: List.generate(12, (index) {
                                    return DropdownMenuItem<int>(
                                      value: index,
                                      child: Text(
                                        months[index],
                                        overflow: TextOverflow.ellipsis,
                                        style: themeObj.normalText,
                                      ),
                                    );
                                  }),
                                ),
                              ),
                            ),
                            SizedBox(width: size.width * 0.02),
                            Card(
                              child: Container(
                                width: size.width * 0.3,
                                height: size.height * 0.05,
                                child: DropdownButton<String>(
                                  isExpanded: true,
                                  borderRadius: BorderRadius.circular(12),
                                  hint: Text("Year", style: themeObj.normalText),
                                  padding: const EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp,
                                      color: CustomTheme.greyColor),
                                  alignment: Alignment.center,
                                  underline: Container(),
                                  value: selectedYear,
                                  onChanged: (newValue) {
                                    print('Year changed to: $newValue');
                                    context.read<AttendanceBloc>().add(
                                      ChangeMonthYear(selectedMonthIndex, newValue!),
                                    );
                                  },
                                  items: years.map((String year) {
                                    return DropdownMenuItem<String>(
                                      value: year,
                                      child: Text(
                                        year,
                                        overflow: TextOverflow.ellipsis,
                                        style: themeObj.normalText,
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ),
                            SizedBox(width: size.width * 0.02),
                            IconButton(
                              icon: Icon(Icons.refresh, color: CustomTheme.primaryColor),
                              onPressed: () {
                                print('Refresh triggered for ${months[selectedMonthIndex]} $selectedYear');
                                context.read<AttendanceBloc>().add(
                                  RefreshAttendance(selectedMonthIndex, selectedYear),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: size.width * 0.02),
                      _buildAttendanceSection(context, present, absent, leave),
                      SizedBox(height: size.width * 0.02),
                      Text(
                        "${months[selectedMonthIndex]} $selectedYear",
                        style:
                        themeObj.normalText.copyWith(fontSize: size.width * 0.045),
                      ),
                      Expanded(
                        child: _buildMonthlyAttendance(
                          attendanceData: attendanceData,
                          selectedMonthIndex: selectedMonthIndex,
                          selectedYear: selectedYear,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildAttendanceSection(BuildContext context, int present, int absent, int leave) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Container(
      margin: const EdgeInsets.all(5),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 5,
            blurRadius: 7,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Attendance Statistics",
            style: themeObj.bigNormalText
                .copyWith(fontSize: size.width * 0.045, fontWeight: FontWeight.w500),
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
                    valueColor: const AlwaysStoppedAnimation<Color>(Colors.green),
                    strokeWidth: 12,
                    backgroundColor: Colors.red[300],
                  ),
                  Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          "${(present + absent + leave) > 0 ? (present / (present + absent + leave) * 100).toStringAsFixed(1) : 0}%",
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        const Text(
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
          SizedBox(height: size.height * 0.01),
        ],
      ),
    );
  }

  Widget _buildStatCard(
      String title, Size size, int value, Color color, CustomTheme themeObj) {
    return Column(
      children: [
        Text(
          "$value",
          style: themeObj.normalText.copyWith(fontSize: size.width * 0.045),
        ),
        Text(
          title,
          style: themeObj.normalText.copyWith(fontSize: size.width * 0.045, color: color),
        ),
      ],
    );
  }

  Widget _buildMonthlyAttendance({
    required Map<String, dynamic>? attendanceData,
    required int selectedMonthIndex,
    required String selectedYear,
  }) {
    int year = int.parse(selectedYear);
    int month = selectedMonthIndex + 1;
    DateTime firstDay = DateTime(year, month, 1);
    DateTime lastDay = DateTime(year, month + 1, 0);

    return GridView.builder(
      padding: const EdgeInsets.all(16),
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

        String status =
            attendanceData?["$dateString"] ?? attendanceData?[alternativeDateString] ?? '';

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
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Text(
            displayStatus,
            style: const TextStyle(fontSize: 12),
          ),
        ],
      ),
    );
  }
}