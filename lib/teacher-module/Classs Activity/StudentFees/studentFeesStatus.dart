import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../APIs/Teacher Module/ClassActivity/studentFeeApI.dart';
import '../../../utils/theme.dart';
import '../../../utils/utils.dart';

class StudentFeesStatus extends StatefulWidget {
  const StudentFeesStatus({Key? key}) : super(key: key);

  @override
  State<StudentFeesStatus> createState() => _StudentFeesStatusState();
}

class _StudentFeesStatusState extends State<StudentFeesStatus> {
  CustomTheme themeObj = CustomTheme();
  String selectedStatus = "Pending";
  List<String> statusOption = ['Paid', 'Pending'];

  int? selectedRowIndex;
  bool isLoading = false;
  bool isLoadingMore = false;
  int start = 0;
  StudentFeesAPi feeObj = StudentFeesAPi();
  List<dynamic>? students;
  final ScrollController _scrollController = ScrollController();
String errorMsg="";
  @override

  void initState() {
    super.initState();
    fetchStudentData();
    _scrollController.addListener(_scrollListener);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreStudentData();
    }
  }

  Future<void> fetchStudentData() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      List<dynamic> fetchedStudents = await feeObj.fetchStudentData(accessToken!, start);

      setState(() {
        students = fetchedStudents;
      });
    } catch (e) {
      errorMsg=e.toString();
      print('Error fetching student data: $e');
      showRedSnackBar("Failed to load students. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreStudentData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      List<dynamic> fetchedStudents = await feeObj.fetchStudentData(accessToken!, start + students!.length);

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

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 3),
        width: size.width,
        height: size.height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.01),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Student Fee",
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.045,
                  ),
                ),
                Card(
                  child: SizedBox(
                    width: size.width * 0.4,
                    height: size.height * 0.05,
                    child: DropdownButton<String>(
                      isExpanded: true,
                      borderRadius: BorderRadius.circular(12),
                      hint: const Text("Select Status"),
                      alignment: Alignment.center,
                      padding: EdgeInsets.all(8),
                      icon: Icon(Icons.keyboard_arrow_down_sharp),
                      underline: Container(),
                      value: selectedStatus,
                      onChanged: (newValue) {
                        setState(() {
                          selectedStatus = newValue!;
                        });
                      },
                      items: statusOption.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option, overflow: TextOverflow.ellipsis),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.01),
            Padding(
              padding: const EdgeInsets.only(left: 50.0),
              child: Text(
                'Swipe left and right to see all details',
                style: GoogleFonts.openSans(
                    fontStyle: FontStyle.italic,
                    color: Colors.grey[600],
                    fontSize: size.width * 0.035),
              ),
            ),
            SizedBox(height: size.height * 0.01),
            isLoading
                ? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ))
                : Expanded(
              child: FeeListScreen(
                selectedRowIndex: selectedRowIndex,
                onRowTap: (index) {
                  setState(() {
                    selectedRowIndex = index;
                  });
                },
                studentData: students ?? [],
                status: selectedStatus,
                scrollController: _scrollController,
              ),
            ),
          ],
        ),
      ),
    );
  }
}


class FeeListScreen extends StatelessWidget {
  final int? selectedRowIndex;
  final Function(int) onRowTap;
  final List<dynamic> studentData;
  final String status;
  final ScrollController scrollController;

  FeeListScreen({
    required this.selectedRowIndex,
    required this.onRowTap,
    required this.studentData,
    required this.status,
    required this.scrollController,
  });

  CustomTheme themeObj = CustomTheme();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    List filteredStudents = studentData.where((student) {
      bool isPending = (student['payableFee'] - student['paid']) > 0;
      return (status == "Pending" && isPending) || (status == "Paid" && !isPending);
    }).toList();

    if (filteredStudents.isEmpty) {
      return Center(
        child: Text("No Data Found"),
      );
    }

    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      controller: scrollController,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.01),
            DataTable(
              headingRowColor: MaterialStateColor.resolveWith((states) => themeObj.secondayColor),
              dataRowHeight: 60,
              columns: [
                DataColumn(label: Center(child: Text('Roll No.', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Name', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Total Fee', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Fine', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Discount', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Paid', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Payable', style: _headerStyle(size)))),
                DataColumn(label: Center(child: Text('Pending', style: _headerStyle(size)))),
              ],
              rows: filteredStudents.asMap().entries.map((entry) {
                int index = entry.key;
                Map<String, dynamic> student = entry.value;

                return DataRow(
                  color: MaterialStateColor.resolveWith((states) {
                    return selectedRowIndex == index ? themeObj.secondayColor : Colors.transparent;
                  }),
                  cells: [
                    DataCell(Text(student['rollNumber'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
                    DataCell(_buildNameCell(student, size), onTap: () => onRowTap(index)),
                    DataCell(Text(student['totalfee'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
                    DataCell(Text(student['fine'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
                    DataCell(Text(student['discountAmount'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
                    DataCell(Text(student['paid'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
                    DataCell(Text(student['payableFee'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
                    DataCell(
                      Text(
                        (student['payableFee'] - student['paid']).toString(),
                        style: _cellStyle(size).copyWith(color: Colors.red),
                      ),
                      onTap: () => onRowTap(index),
                    ),
                  ],
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNameCell(Map<String, dynamic> student, Size size) {
    return Row(
      children: [
        Padding(
          padding: const EdgeInsets.all(4.0),
          child: CircleAvatar(
            radius: size.width * 0.06,
            backgroundImage: NetworkImage(student['profileLink'] ?? 'https://example.com/default-profile-pic.jpg'),
          ),
        ),
        SizedBox(width: size.width * 0.02),
        Text(student['name'], style: _cellStyle(size)),
      ],
    );
  }

  TextStyle _headerStyle(Size size) {
    return GoogleFonts.openSans(
      fontSize: size.width * 0.045,
      fontWeight: FontWeight.w500,
      color: themeObj.textBlack,
    );
  }

  TextStyle _cellStyle(Size size) {
    return GoogleFonts.openSans(
      fontSize: size.width * 0.04,
      fontWeight: FontWeight.w400,
      color: themeObj.textBlack,
    );
  }
}
