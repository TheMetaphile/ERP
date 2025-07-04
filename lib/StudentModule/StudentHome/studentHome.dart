import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/Notification/Messanging.dart';
import 'package:untitled/StudentAPIs/NotificationAPI/notificationAPI.dart';
import 'package:untitled/StudentModule/Ask_Doubts/ask_doubts.dart';
import 'package:untitled/StudentModule/Attendance/studentAttendance.dart';
import 'package:untitled/StudentModule/Classword/classWork.dart';
import 'package:untitled/StudentModule/Dashboard/dashboard.dart';
import 'package:untitled/StudentModule/Datesheet/datesheet.dart';
import 'package:untitled/StudentModule/Fees/Fee_Due.dart';
import 'package:untitled/StudentModule/NoteBookRecord/noteBook_Record.dart';
import 'package:untitled/StudentModule/Notice/notice.dart';
import 'package:untitled/StudentModule/Result/result.dart';
import 'package:untitled/StudentModule/StudentLeave/student_leave.dart';
import 'package:untitled/StudentModule/TimeTable/timeTable.dart';
import 'package:untitled/StudentModule/homeWork/homeWork.dart';
import 'package:untitled/onBoarding/Screens/login.dart';
import '../../CustomTheme/customTheme.dart';
import 'StudentHomeBloc/student_home_bloc.dart';
import 'StudentHomeBloc/student_home_event.dart';
import 'StudentHomeBloc/student_home_state.dart';

class StudentHome extends StatelessWidget {
  const StudentHome({super.key});

  @override
  Widget build(BuildContext context) {
    return const _StudentHomeContent();
  }
}

class _StudentHomeContent extends StatelessWidget {
  const _StudentHomeContent();

  final List<Widget> _screens = const [
    StudentDashboard(),
    StudentAttendanceUI(),
    StudentClasswork(),
    StudentHomework(),
  ];

  Future<dynamic> deleteDeviceToken(BuildContext context) async {
    try {
      NotificationAPI apiObj = NotificationAPI();
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? deviceToken = await FCMService.getDeviceToken();
      print("FCM Token: $deviceToken");
      await apiObj.removeToken(accessToken!, deviceToken!);
    } catch (e) {
      print('Error deleting device token: $e');
    }
  }

  String getTitle(int index) {
    switch (index) {
      case 0:
        return "Dashboard";
      case 1:
        return "Attendance";
      case 2:
        return "Class Work";
      case 3:
        return "Home Work";
      default:
        return "Student Home";
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return BlocBuilder<StudentHomeBloc, StudentHomeState>(
      builder: (context, state) {
        // 🚀 AUTOMATIC FETCH: Only on first load when data is empty
        if (state.userDetails.isEmpty && !state.isLoading) {
          print("🚀 Auto-fetching user details (first load)");
          context.read<StudentHomeBloc>().add(FetchUserDetails());
        }

        // Show loading screen only on initial load
        if (state.isLoading && state.userDetails.isEmpty) {
          return Scaffold(
            backgroundColor: CustomTheme.whiteColor,
            body: Center(
              child: CircularProgressIndicator(
                color: CustomTheme.primaryColor,
              ),
            ),
          );
        }

        // Show error screen if there's an error and no cached data
        if (state.error != null && state.userDetails.isEmpty) {
          return Scaffold(
            backgroundColor: CustomTheme.whiteColor,
            body: RefreshIndicator(
              onRefresh: () async {
                print("🔄 Error screen refresh triggered");
                final bloc = context.read<StudentHomeBloc>();
                bloc.add(FetchUserDetails(forceRefresh: true));
                await bloc.stream.firstWhere((state) => !state.isLoading);
              },
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: SizedBox(
                  height: MediaQuery.of(context).size.height,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Error: ${state.error}',
                          style: GoogleFonts.openSans(
                            color: Colors.red,
                            fontSize: size.width * 0.04,
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Text('Pull down to retry'),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          );
        }

        final userDetails = state.userDetails;
        final String studentName = userDetails["name"]?.toString() ?? "Unknown";
        final String profileLink = userDetails["profileLink"]?.toString() ?? "";
        final String email = userDetails["email"]?.toString() ?? "";
        final String rollNo = userDetails["rollNumber"]?.toString() ?? "";
        final String currentClass = userDetails["currentClass"]?.toString() ?? "";
        final String section = userDetails["section"]?.toString() ?? "";

        // Main content with pull-to-refresh
        return RefreshIndicator(
          onRefresh: () async {
            print("🔄 Pull-to-refresh triggered");
            final bloc = context.read<StudentHomeBloc>();
            bloc.add(FetchUserDetails(forceRefresh: true));
            // Wait for the refresh to complete
            await bloc.stream.firstWhere((state) => !state.isLoading);
          },
          child: Scaffold(
            backgroundColor: CustomTheme.whiteColor,
            appBar: AppBar(
              backgroundColor: CustomTheme.primaryColor,
              title: Text(
                getTitle(state.selectedIndex),
                style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.w500),
              ),
              actions: [
                state.selectedIndex == 0
                    ? IconButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const StudentNotice(),
                      ),
                    );
                  },
                  icon: const Icon(Icons.notification_add),
                )
                    : const SizedBox(),
              ],
            ),
            drawer: Drawer(
              width: size.width * 0.8,
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.only(left: 10),
                    width: size.width,
                    decoration: BoxDecoration(
                      color: CustomTheme.primaryColor,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height * 0.04),
                        CircleAvatar(
                          radius: size.width * 0.1,
                          backgroundImage: NetworkImage(profileLink),
                        ),
                        SizedBox(height: size.height * 0.01),
                        Text(
                          studentName,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: CustomTheme.blackColor,
                            fontSize: size.width * 0.04,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        Text(
                          "Class $currentClass-$section",
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: CustomTheme.blackColor,
                            fontSize: size.width * 0.035,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        Text(
                          "Roll No $rollNo",
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: CustomTheme.blackColor,
                            fontSize: size.width * 0.035,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        Text(
                          email,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: CustomTheme.blackColor,
                            fontSize: size.width * 0.035,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        SizedBox(height: size.height * 0.01),
                      ],
                    ),
                  ),
                  SizedBox(height: size.height * 0.02),
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          ListTile(
                            leading: Icon(
                              Icons.home,
                              size: size.height * 0.04,
                              color: CustomTheme.blackColor,
                            ),
                            title: Text(
                              "Dashboard",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.pop(context);
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/fees.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "Fee Due",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => FeesDue(email: email),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/time Table.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "Time Table",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const StudentTimeTable(),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/result.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "Result",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ReportCardOpen(
                                    userDetails: userDetails,
                                  ),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/leave.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "Leave Application",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const StudentLeave(),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/askdoubts.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "Ask Doubt",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => AskDoubts(
                                    currentClass: currentClass,
                                    section: section,
                                  ),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Icon(
                              Icons.notifications_active,
                              size: size.height * 0.04,
                              color: CustomTheme.blackColor,
                            ),
                            title: Text(
                              "Notice",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const StudentNotice(),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/datesheet.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "DateSheet",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => DateSheet(Class: currentClass),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Image.asset(
                              "assets/DashboardImages/notebook.png",
                              color: CustomTheme.blackColor,
                              width: size.width * 0.1,
                              height: size.height * 0.04,
                              fit: BoxFit.contain,
                            ),
                            title: Text(
                              "Notebook Record",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => StudentNoteBookRecord(
                                    currentClass: currentClass,
                                    section: section,
                                  ),
                                ),
                              );
                            },
                          ),
                          ListTile(
                            leading: Icon(
                              Icons.logout,
                              color: CustomTheme.blackColor,
                              size: size.width * 0.1,
                            ),
                            title: Text(
                              "Logout",
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                fontSize: size.width * 0.04,
                                color: CustomTheme.blackColor,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () async {
                              SharedPreferences prefs = await SharedPreferences.getInstance();
                              await deleteDeviceToken(context);
                              await prefs.clear();
                              Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const Login(),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    width: size.width * 0.75,
                    child: Text(
                      " © 2024 All Right Reserved by School\nDesigned by MetaPhile",
                      textAlign: TextAlign.center,
                      style: GoogleFonts.openSans(
                        fontSize: size.width * 0.04,
                        color: CustomTheme.blackColor,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            body: _screens[state.selectedIndex],
            bottomNavigationBar: Container(
              decoration: BoxDecoration(
                color: CustomTheme.primaryColor,
                boxShadow: [
                  BoxShadow(
                    blurRadius: 20,
                    color: Colors.black.withOpacity(.1),
                  ),
                ],
              ),
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 8),
                  child: GNav(
                    rippleColor: Colors.grey[300]!,
                    hoverColor: Colors.grey[100]!,
                    gap: 3,
                    activeColor: CustomTheme.blackColor,
                    iconSize: 20,
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                    duration: const Duration(milliseconds: 400),
                    tabBackgroundColor: Colors.grey[100]!,
                    color: Colors.black,
                    tabs: [
                      GButton(
                        icon: Icons.home,
                        text: 'Home',
                        textStyle: GoogleFonts.openSans(fontSize: size.width * 0.03),
                      ),
                      GButton(
                        icon: Icons.timer,
                        text: 'Attendance',
                        textStyle: GoogleFonts.openSans(fontSize: size.width * 0.03),
                      ),
                      GButton(
                        icon: Icons.work_history_outlined,
                        text: 'Class Work',
                        textStyle: GoogleFonts.openSans(fontSize: size.width * 0.03),
                      ),
                      GButton(
                        icon: Icons.home_work_outlined,
                        text: 'Home Work',
                        textStyle: GoogleFonts.openSans(fontSize: size.width * 0.03),
                      ),
                    ],
                    selectedIndex: state.selectedIndex,
                    onTabChange: (index) {
                      context.read<StudentHomeBloc>().add(ChangeTab(index));
                    },
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}