import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shimmer/shimmer.dart';

import '../../../APIs/Teacher Module/ClassActivity/studentFeeApI.dart';
import '../../../utils/theme.dart';
import '../../../utils/utils.dart';

// class StudentFeesStatus extends StatefulWidget {
//   const StudentFeesStatus({Key? key}) : super(key: key);
//
//   @override
//   State<StudentFeesStatus> createState() => _StudentFeesStatusState();
// }
//
// class _StudentFeesStatusState extends State<StudentFeesStatus> {
//   CustomTheme themeObj = CustomTheme();
//   String selectedStatus = "Pending";
//   List<String> statusOption = ['Paid', 'Pending'];
//
//   int? selectedRowIndex;
//   bool isLoading = false;
//   bool isLoadingMore = false;
//   int start = 0;
//   StudentFeesAPi feeObj = StudentFeesAPi();
//   List<dynamic>? students;
//   final ScrollController _scrollController = ScrollController();
// String errorMsg="";
//   @override
//
//   void initState() {
//     super.initState();
//     fetchStudentData();
//     _scrollController.addListener(_scrollListener);
//   }
//
//   @override
//   void dispose() {
//     _scrollController.dispose();
//     super.dispose();
//   }
//
//   void _scrollListener() {
//     if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
//       fetchMoreStudentData();
//     }
//   }
//
//   Future<void> fetchStudentData() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       List<dynamic> fetchedStudents = await feeObj.fetchStudentData(accessToken!, start);
//
//       setState(() {
//         students = fetchedStudents;
//       });
//     } catch (e) {
//       errorMsg=e.toString();
//       print('Error fetching student data: $e');
//       showRedSnackBar("Failed to load students. Please try again.", context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void> fetchMoreStudentData() async {
//     if (isLoadingMore) return;
//
//     setState(() {
//       isLoadingMore = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       List<dynamic> fetchedStudents = await feeObj.fetchStudentData(accessToken!, start + students!.length);
//
//       setState(() {
//         students?.addAll(fetchedStudents);
//       });
//     } catch (e) {
//       print('Error fetching more student data: $e');
//       showRedSnackBar("Failed to load more students. Please try again.", context);
//     } finally {
//       setState(() {
//         isLoadingMore = false;
//       });
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: Colors.white,
//       body: Container(
//         padding: EdgeInsets.symmetric(horizontal: 3),
//         width: size.width,
//         height: size.height,
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             SizedBox(height: size.height * 0.01),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Text(
//                   "Student Fee",
//                   overflow: TextOverflow.ellipsis,
//                   style: GoogleFonts.openSans(
//                     color: Colors.black,
//                     fontWeight: FontWeight.w600,
//                     fontSize: size.width * 0.045,
//                   ),
//                 ),
//                 Card(
//                   child: SizedBox(
//                     width: size.width * 0.4,
//                     height: size.height * 0.05,
//                     child: DropdownButton<String>(
//                       isExpanded: true,
//                       borderRadius: BorderRadius.circular(12),
//                       hint: const Text("Select Status"),
//                       alignment: Alignment.center,
//                       padding: EdgeInsets.all(8),
//                       icon: Icon(Icons.keyboard_arrow_down_sharp),
//                       underline: Container(),
//                       value: selectedStatus,
//                       onChanged: (newValue) {
//                         setState(() {
//                           selectedStatus = newValue!;
//                         });
//                       },
//                       items: statusOption.map((String option) {
//                         return DropdownMenuItem<String>(
//                           value: option,
//                           child: Text(option, overflow: TextOverflow.ellipsis),
//                         );
//                       }).toList(),
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//             SizedBox(height: size.height * 0.01),
//             Padding(
//               padding: const EdgeInsets.only(left: 50.0),
//               child: Text(
//                 'Swipe left and right to see all details',
//                 style: GoogleFonts.openSans(
//                     fontStyle: FontStyle.italic,
//                     color: Colors.grey[600],
//                     fontSize: size.width * 0.035),
//               ),
//             ),
//             SizedBox(height: size.height * 0.01),
//             isLoading
//                 ? Center(
//                 child: LoadingAnimationWidget.threeArchedCircle(
//                   color: themeObj.primayColor,
//                   size: 50,
//                 ))
//                 : Expanded(
//               child: FeeListScreen(
//                 selectedRowIndex: selectedRowIndex,
//                 onRowTap: (index) {
//                   setState(() {
//                     selectedRowIndex = index;
//                   });
//                 },
//                 studentData: students ?? [],
//                 status: selectedStatus,
//                 scrollController: _scrollController,
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
//
//
// class FeeListScreen extends StatelessWidget {
//   final int? selectedRowIndex;
//   final Function(int) onRowTap;
//   final List<dynamic> studentData;
//   final String status;
//   final ScrollController scrollController;
//
//   FeeListScreen({
//     required this.selectedRowIndex,
//     required this.onRowTap,
//     required this.studentData,
//     required this.status,
//     required this.scrollController,
//   });
//
//   CustomTheme themeObj = CustomTheme();
//
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//
//     List filteredStudents = studentData.where((student) {
//       bool isPending = (student['payableFee'] - student['paid']) > 0;
//       return (status == "Pending" && isPending) || (status == "Paid" && !isPending);
//     }).toList();
//
//     if (filteredStudents.isEmpty) {
//       return Center(
//         child: Text("No Data Found"),
//       );
//     }
//
//     return SingleChildScrollView(
//       scrollDirection: Axis.vertical,
//       controller: scrollController,
//       child: SingleChildScrollView(
//         scrollDirection: Axis.horizontal,
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             SizedBox(height: size.height * 0.01),
//             DataTable(
//               headingRowColor: MaterialStateColor.resolveWith((states) => themeObj.secondayColor),
//               dataRowHeight: 60,
//               columns: [
//                 DataColumn(label: Center(child: Text('Roll No.', style: _headerStyle(size)))),
//                 DataColumn(label: Center(child: Text('Name', style: _headerStyle(size)))),
//                 DataColumn(label: Center(child: Text('Total Fee', style: _headerStyle(size)))),
//                 DataColumn(label: Center(child: Text('Discount', style: _headerStyle(size)))),
//                 DataColumn(label: Center(child: Text('Payable', style: _headerStyle(size)))),
//                 DataColumn(label: Center(child: Text('Paid', style: _headerStyle(size)))),
//                 DataColumn(label: Center(child: Text('Pending', style: _headerStyle(size)))),
//               ],
//               rows: filteredStudents.asMap().entries.map((entry) {
//                 int index = entry.key;
//                 Map<String, dynamic> student = entry.value;
//
//                 return DataRow(
//                   color: MaterialStateColor.resolveWith((states) {
//                     return selectedRowIndex == index ? themeObj.secondayColor : Colors.transparent;
//                   }),
//                   cells: [
//                     DataCell(Text(student['rollNumber'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
//                     DataCell(_buildNameCell(student, size), onTap: () => onRowTap(index)),
//                     DataCell(Text(student['totalfee'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
//                     DataCell(Text(student['discountAmount'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
//                     DataCell(Text(student['payableFee'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
//                     DataCell(Text(student['paid'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
//                  //   DataCell(Text(student['payableFee'].toString(), style: _cellStyle(size)), onTap: () => onRowTap(index)),
//                     DataCell(
//                       Text(
//                         (student['payableFee'] - student['paid']).toString(),
//                         style: _cellStyle(size).copyWith(color: Colors.red),
//                       ),
//                       onTap: () => onRowTap(index),
//                     ),
//                   ],
//                 );
//               }).toList(),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
//
//   Widget _buildNameCell(Map<String, dynamic> student, Size size) {
//     return Row(
//       children: [
//         Padding(
//           padding: const EdgeInsets.all(4.0),
//           child: CircleAvatar(
//             radius: size.width * 0.06,
//             backgroundImage: NetworkImage(student['profileLink'] ?? 'https://example.com/default-profile-pic.jpg'),
//           ),
//         ),
//         SizedBox(width: size.width * 0.02),
//         Text(student['name'], style: _cellStyle(size)),
//       ],
//     );
//   }
//
//   TextStyle _headerStyle(Size size) {
//     return GoogleFonts.openSans(
//       fontSize: size.width * 0.045,
//       fontWeight: FontWeight.w500,
//       color: themeObj.textBlack,
//     );
//   }
//
//   TextStyle _cellStyle(Size size) {
//     return GoogleFonts.openSans(
//       fontSize: size.width * 0.04,
//       fontWeight: FontWeight.w400,
//       color: themeObj.textBlack,
//     );
//   }
// }


class StudentFeesStatus extends StatefulWidget {
  const StudentFeesStatus({Key? key}) : super(key: key);

  @override
  State<StudentFeesStatus> createState() => _StudentFeesStatusState();
}

class _StudentFeesStatusState extends State<StudentFeesStatus>with SingleTickerProviderStateMixin {
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

  bool allDataLoaded=false;
  Future<void> fetchMoreStudentData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      int newStart = start + (students?.length ?? 0);
      List<dynamic> fetchedStudents = await feeObj.fetchStudentData(accessToken!, newStart);

      int? previousLength=students?.length;



      students?.addAll(fetchedStudents);

      int? newLength=students?.length;
      if(newLength==previousLength && newLength!=null && previousLength!=null){
        allDataLoaded=true;
      }

      start = newStart;
    } catch (e) {
      print('Error fetching more student data: $e');
      showRedSnackBar("Failed to load more students. Please try again.", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }


  late AnimationController _animationController;
  late Animation<double> _animation;
  @override
  void initState() {
    super.initState();
    fetchStudentData();
    _scrollController.addListener(_scrollListener);
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    _animationController.forward();
  }


  @override
  void dispose() {
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      if(!allDataLoaded){
        fetchMoreStudentData();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    // print("students.length---------${students!.length}");
    // print("allData Loaded---------${allDataLoaded}");
    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 16),
        width: size.width,
        height: size.height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.03),
            _buildHeader(size),
            SizedBox(height: size.height * 0.02),
            Expanded(
              child: isLoading
                  ? _buildShimmerLoading(size)
                  : FadeTransition(
                opacity: _animation,
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
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(Size size) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          "Student Fee",
          style: GoogleFonts.poppins(
            color: Colors.black,
            fontWeight: FontWeight.w500,
            fontSize: size.width * 0.05,
          ),
        ),
        _buildStatusDropdown(size),
      ],
    );
  }

  Widget _buildStatusDropdown(Size size) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: themeObj.secondayColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: selectedStatus,
          onChanged: (newValue) {
            setState(() {
              selectedStatus = newValue!;
            });
          },
          items: statusOption.map((String option) {
            return DropdownMenuItem<String>(
              value: option,
              child: Text(option, style: GoogleFonts.poppins(color: themeObj.primayColor)),
            );
          }).toList(),
          icon: Icon(Icons.arrow_drop_down, color: themeObj.primayColor),
        ),
      ),
    );
  }



  Widget _buildShimmerLoading(Size size) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        itemCount: 10,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Row(
              children: [
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: double.infinity,
                        height: 8,
                        color: Colors.white,
                      ),
                      SizedBox(height: 8),
                      Container(
                        width: size.width * 0.5,
                        height: 8,
                        color: Colors.white,
                      ),
                    ],
                  ),
                )
              ],
            ),
          );
        },
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
        child: Text("No Data Found", style: GoogleFonts.poppins(fontSize: 18)),
      );
    }

    return AnimationLimiter(
      child: ListView.builder(
        itemCount: filteredStudents.length,
        controller: scrollController,
        itemBuilder: (BuildContext context, int index) {
          Map<String, dynamic> student = filteredStudents[index];
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: _buildStudentCard(context, student, size, index),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStudentCard(BuildContext context, Map<String, dynamic> student, Size size, int index) {
    return Card(
      elevation: 3,
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () => onRowTap(index),
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: size.width * 0.06,
                    backgroundImage: NetworkImage(student['profileLink'] ?? 'https://example.com/default-profile-pic.jpg'),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(student['name'], style: GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 16)),
                        Text('Roll No: ${student['rollNumber']}', style: GoogleFonts.poppins(color: Colors.grey[600])),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              _buildFeeInfo('Total Fee', student['totalfee'].toString(), size),
              _buildFeeInfo('Discount', student['discountAmount'].toString(), size),
              _buildFeeInfo('Payable', student['payableFee'].toString(), size),
              _buildFeeInfo('Paid', student['paid'].toString(), size),
              _buildFeeInfo('Pending', (student['payableFee'] - student['paid']).toString(), size, isRed: true),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFeeInfo(String label, String value, Size size, {bool isRed = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: GoogleFonts.poppins(fontSize: size.width * 0.035)),
          Text(
            value,
            style: GoogleFonts.poppins(
              fontSize: size.width * 0.035,
              fontWeight: FontWeight.w600,
              color: isRed ? Colors.red : Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
