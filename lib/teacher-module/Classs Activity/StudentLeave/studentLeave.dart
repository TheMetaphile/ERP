import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/utils.dart';

import '../../../APIs/Teacher Module/ClassActivity/studentLeaveAPI.dart';
import '../../../utils/theme.dart';

class StudentLeaves extends StatefulWidget {
  const StudentLeaves({super.key});

  @override
  State<StudentLeaves> createState() => _StudentLeavesState();
}

class _StudentLeavesState extends State<StudentLeaves> {
  CustomTheme themeObj = CustomTheme();
  bool isLoading = false;
  bool isLoadingMore = false;
  String status = "Pending";
  String? Class;
  String? section;
  List<dynamic>? students;
  int start = 0;
  StudentLeaveAPI leaveObj = StudentLeaveAPI();
  final ScrollController _scrollController = ScrollController();
  Map<String, bool> isUpdatingLeave = {};

  @override
  void initState() {
    super.initState();
    fetchLeavesData();
    _scrollController.addListener(_scrollListener);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreLeavesData();
    }
  }

  Future<void> fetchLeavesData() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      Class = pref.getString("teacherClass");
      section = pref.getString("teacherSection");
      print(accessToken);
      List<dynamic> fetchedStudents = await leaveObj.fetchLeaves(accessToken!, start, status);
      print('Fetched students: $fetchedStudents');

      setState(() {
        students = fetchedStudents;
      });
    } catch (e, stackTrace) {
      print('Error fetching student data: $e');
      print('Stack trace: $stackTrace');
      if (e is Exception) {
        print('Exception details: ${e.toString()}');
      }
      showRedSnackBar("Failed to load students. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreLeavesData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      List<dynamic> fetchedStudents = await leaveObj.fetchLeaves(accessToken!, start + students!.length, status);

      setState(() {
        students?.addAll(fetchedStudents);
      });
    } catch (e) {
      print('Error fetching more student data: $e');
      showRedSnackBar("Failed to load more students. Please try again.", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }

  Future<bool> updateLeave(String decision, String leaveId) async {
    setState(() {
      isUpdatingLeave[leaveId] = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      bool response = await leaveObj.updateLead(accessToken!, decision, leaveId);
      print('Update response: $response');

      if (response) {
        // Remove the updated leave from the list
        setState(() {
          students?.removeWhere((student) => student["_id"] == leaveId);
        });
      }

      return response;
    } catch (e) {
      print('Error updating leave: $e');
      return false;
    } finally {
      setState(() {
        isUpdatingLeave[leaveId] = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 3),
        width: size.width,
        height: size.height * 1,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.01),
            Row(
              children: [
                TextButton(
                  onPressed: () {
                    setState(() {
                      status = "Pending";
                      students = null;
                      fetchLeavesData();
                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status == "Pending" ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "New Leaves",
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                SizedBox(width: size.width * 0.015),
                TextButton(
                  onPressed: () {
                    setState(() {
                      status = "Approved";
                      students = null;
                      fetchLeavesData();
                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status == "Approved" ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Approved Leaves",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                SizedBox(width: size.width * 0.015),
                TextButton(
                  onPressed: () {
                    setState(() {
                      status = "Rejected";
                      students = null;
                      fetchLeavesData();
                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status == "Rejected" ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Rejected Leaves",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.02),
            isLoading
                ? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ))
                : Expanded(
              child: students == null || students!.isEmpty
                  ? Center(
                child: Text(
                  "No ${status} Leave Found",
                  style: TextStyle(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w400,
                    fontSize: size.width * 0.035,
                  ),
                ),
              )
                  : ListView.builder(
                controller: _scrollController,
                itemCount: (students?.length ?? 0) + 1,
                itemBuilder: (context, index) {
                  if (index == students!.length) {
                    return isLoadingMore
                        ? Center(
                        child: LoadingAnimationWidget.threeArchedCircle(
                          color: themeObj.primayColor,
                          size: 30,
                        ))
                        : SizedBox();
                  }
                  final particularStudentLeave = students?[index];
                  final leaveId = particularStudentLeave["_id"];

                  return Column(
                    children: [
                      Card(
                        margin: EdgeInsets.all(0),
                        elevation: 3,
                        child: ExpansionTile(
                          leading: CircleAvatar(
                            radius: size.width * 0.08,
                            backgroundImage: NetworkImage(particularStudentLeave["profileLink"]),
                          ),
                          title: Text(
                            "${particularStudentLeave["name"]} from class $Class $section wants a Leave Request to you from ${particularStudentLeave["startDate"]} to ${particularStudentLeave["endDate"]}",
                            style: TextStyle(
                              color: themeObj.textBlack,
                              fontWeight: FontWeight.w400,
                              fontSize: size.width * 0.035,
                            ),
                          ),
                          shape: Border.all(color: Colors.transparent),
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Reason: ",
                                  textAlign: TextAlign.start,
                                  style: TextStyle(
                                    color: themeObj.textgrey,
                                    fontWeight: FontWeight.w600,
                                    fontSize: size.width * 0.035,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.01),
                                Container(
                                  width: size.width * 0.7,
                                  padding: EdgeInsets.all(3),
                                  decoration:  status == "Pending"?
                                    BoxDecoration(
                                    color: Colors.white60,
                                    border: Border.all(color: Colors.grey, width: 1),
                                    borderRadius: BorderRadius.circular(8),
                                  ):BoxDecoration(),
                                  child: Text(
                                    particularStudentLeave["reason"],
                                    textAlign: TextAlign.start,
                                    style: TextStyle(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.035,
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.01),
                              ],
                            ),
                            if (status == "Pending")
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Container(
                                    width: size.width * 0.3,
                                    child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.red,
                                        shape: RoundedRectangleBorder(
                                          side: BorderSide(color: Colors.grey, width: 1),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                      ),
                                      onPressed: isUpdatingLeave[leaveId] == true
                                          ? null
                                          : () async {
                                        bool success = await updateLeave("Rejected", leaveId);
                                        if (success) {
                                          showGreenSnackBar("Leave rejected successfully.", context);
                                        } else {
                                          showRedSnackBar("Failed to reject leave. Please try again.", context);
                                        }
                                      },
                                      child: isUpdatingLeave[leaveId] == true
                                          ? SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                        ),
                                      )
                                          : Text(
                                        "Reject",
                                        style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.white),
                                      ),
                                    ),
                                  ),
                                  Container(
                                    width: size.width * 0.3,
                                    child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Color(0XFF6FF87D),
                                        shape: RoundedRectangleBorder(
                                          side: BorderSide(color: Colors.grey, width: 1),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                      ),
                                      onPressed: isUpdatingLeave[leaveId] == true
                                          ? null
                                          : () async {
                                        bool success = await updateLeave("Approved", leaveId);
                                        if (success) {
                                          showGreenSnackBar("Leave approved successfully.", context);
                                        } else {
                                          showRedSnackBar("Failed to approve leave. Please try again.", context);
                                        }
                                      },
                                      child: isUpdatingLeave[leaveId] == true
                                          ? SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                          valueColor: AlwaysStoppedAnimation<Color>(Colors.black),
                                        ),
                                      )
                                          : Text(
                                        "Approve",
                                        style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            if (status == "Approved")
                              Text(
                                "Approved",
                                style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Color(0XFF6FF87D)),
                              ),
                            if (status == "Rejected")
                              Text(
                                "Rejected",
                                style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.red),
                              ),
                            SizedBox(height: size.height * 0.01),
                          ],
                        ),
                      ),
                      SizedBox(height: size.height * 0.02),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}