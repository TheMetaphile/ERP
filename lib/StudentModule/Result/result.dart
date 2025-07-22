import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:untitled/StudentModule/Result/studentResultBloc/student_result_bloc.dart';
import 'package:untitled/StudentModule/Result/studentResultBloc/student_result_event.dart';
import 'package:untitled/StudentModule/Result/studentResultBloc/student_result_state.dart';

import '../../CustomTheme/customTheme.dart';


class ReportCardOpen extends StatelessWidget {
  const ReportCardOpen({Key? key, required this.userDetails}) : super(key: key);
  final Map<String, dynamic> userDetails;

  static const List<String> termOptions = ['Term 1', 'Half Yearly', 'Term 2', 'Final'];

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ReportCardBloc()
        ..add(LoadReportCardData(email: userDetails["email"])),
      child: ReportCardView(userDetails: userDetails),
    );
  }
}

class ReportCardView extends StatelessWidget {
  const ReportCardView({Key? key, required this.userDetails}) : super(key: key);
  final Map<String, dynamic> userDetails;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: _buildAppBar(size, context),
      body: SafeArea(
        child: BlocConsumer<ReportCardBloc, ReportCardState>(
          listener: (context, state) {
            if (state is ReportCardError) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(state.message),
                  backgroundColor: Colors.red,
                ),
              );
            }
          },
          builder: (context, state) {
            if (state is ReportCardLoading) {
              return Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: CustomTheme.primaryColor,
                  size: 50,
                ),
              );
            }

            String selectedTerm = "Term 1";
            Map<String, List<dynamic>> data = {};
            bool isRefreshing = false;

            if (state is ReportCardLoaded) {
              selectedTerm = state.selectedTerm;
              data = state.allData;
            } else if (state is ReportCardRefreshing) {
              selectedTerm = state.selectedTerm;
              data = state.cachedData;
              isRefreshing = true;
            } else if (state is ReportCardError) {
              selectedTerm = state.selectedTerm ?? "Term 1";
              data = {};
            }

            return RefreshIndicator(
              onRefresh: () async {
                context.read<ReportCardBloc>().add(
                  RefreshReportCardData(
                    email: userDetails["email"],
                    selectedTerm: selectedTerm,
                  ),
                );
                // Wait for the refresh to complete
                await Future.delayed(Duration(milliseconds: 100));
              },
              child: SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                child: AnimationLimiter(
                  child: Column(
                    children: [
                      if (isRefreshing)
                        LinearProgressIndicator(
                          backgroundColor: CustomTheme.primaryColor.withOpacity(0.2),
                          valueColor: AlwaysStoppedAnimation<Color>(CustomTheme.primaryColor),
                        ),
                      ...AnimationConfiguration.toStaggeredList(
                        duration: const Duration(milliseconds: 375),
                        childAnimationBuilder: (widget) => SlideAnimation(
                          horizontalOffset: 50.0,
                          child: FadeInAnimation(child: widget),
                        ),
                        children: [
                          _buildHeaderSection(size, selectedTerm),
                          _buildHeaderCard(size, selectedTerm),
                          _buildScholasticCard(size, data, selectedTerm),
                          _buildCoScholasticCard(size, data, selectedTerm),
                          _buildAttendanceCard(size),
                          _buildRemarkCard(size),
                          _buildScholasticMarkRangeCard(size),
                          _buildCoScholasticMarkRangeCard(size),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Implement download functionality
        },
        child: Icon(Icons.download),
        backgroundColor: CustomTheme.primaryColor,
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(Size size, BuildContext context) {
    return AppBar(
      flexibleSpace: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [CustomTheme.primaryColor, CustomTheme.primaryColor.withOpacity(0.7)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
      ),
      leading: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: Icon(Icons.arrow_back_ios, color: Colors.black),
      ),
      title: Text(
        "Student Report Card",
        style: GoogleFonts.openSans(
          color: Colors.black,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.05,
        ),
      ),
    );
  }

  Widget _buildHeaderSection(Size size, String selectedTerm) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SizedBox(
            width: size.width * 0.6,
            child: AutoSizeText(
              '${userDetails["name"]} Progress Report',
              overflow: TextOverflow.ellipsis,
              style: GoogleFonts.openSans(
                color: CustomTheme.blackColor,
                fontWeight: FontWeight.w500,
                fontSize: size.width * 0.035,
              ),
            ),
          ),
          _buildTermDropdown(size, selectedTerm),
        ],
      ),
    );
  }

  Widget _buildTermDropdown(Size size, String selectedTerm) {
    return BlocBuilder<ReportCardBloc, ReportCardState>(
      builder: (context, state) {
        return Container(
          padding: EdgeInsets.symmetric(horizontal: 5),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 1,
                blurRadius: 3,
                offset: Offset(0, 2),
              ),
            ],
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: selectedTerm,
              icon: Icon(Icons.arrow_drop_down, color: CustomTheme.primaryColor),
              iconSize: 24,
              elevation: 16,
              style: TextStyle(color: CustomTheme.primaryColor),
              onChanged: (String? newValue) {
                if (newValue != null) {
                  context.read<ReportCardBloc>().add(ChangeTermSelection(newValue));
                }
              },
              items: ReportCardOpen.termOptions.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeaderCard(Size size, String selectedTerm) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                '$selectedTerm : 2024-25',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                _buildInfoRow('Student\'s Name', userDetails["name"] ?? "N/A"),
                _buildInfoRow('Father\'s Name', userDetails["fatherName"] ?? "N/A"),
                _buildInfoRow('Mother\'s Name', userDetails["motherName"] ?? "N/A"),
                _buildInfoRow('Admission No.', userDetails["oldAdmissionNumber"] ?? "N/A"),
                _buildInfoRow('Class & Section', "${userDetails["currentClass"] ?? "N/A"} ${userDetails["currentSection"] ?? "N/A"}"),
                _buildInfoRow('Date of Birth', userDetails["DOB"] ?? "N/A"),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildScholasticCard(Size size, Map<String, List<dynamic>> data, String selectedTerm) {
    List<dynamic> currentTermData = _getCurrentTermData(data, selectedTerm, false);

    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                'Scholastic Areas',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          if (currentTermData.isEmpty)
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(child: Text("No scholastic data available for this term")),
            )
          else
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columns: _buildScholasticColumns(),
                rows: _buildScholasticRows(currentTermData),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildCoScholasticCard(Size size, Map<String, List<dynamic>> data, String selectedTerm) {
    List<dynamic> currentTermData = _getCurrentTermData(data, selectedTerm, true);

    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                'Co-Scholastic Areas',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: currentTermData.isEmpty
                ? Center(child: Text("No co-scholastic data available for this term"))
                : Column(
              children: currentTermData.map<Widget>((coScholastic) {
                return _buildInfoRow(
                  coScholastic["subject"] ?? "N/A",
                  coScholastic["grade"] ?? "N/A",
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  List<dynamic> _getCurrentTermData(Map<String, List<dynamic>> data, String selectedTerm, bool isCoScholastic) {
    String key = '';
    switch (selectedTerm) {
      case "Term 1":
        key = isCoScholastic ? "term1_Co_scholastic" : "term1";
        break;
      case "Half Yearly":
        key = isCoScholastic ? "halfYearly_Co_scholastic" : "halfYearly";
        break;
      case "Term 2":
        key = isCoScholastic ? "term2_Co_scholastic" : "term2";
        break;
      case "Final":
        key = isCoScholastic ? "final_Co_scholastic" : "final";
        break;
    }
    return data[key] ?? [];
  }

  List<DataColumn> _buildScholasticColumns() {
    return [
      DataColumn(label: Text('Subject')),
      DataColumn(label: Text('Note Book')),
      DataColumn(label: Text('S.Enrichment')),
      DataColumn(label: Text('Marks Obt')),
      DataColumn(label: Text('Total')),
      DataColumn(label: Text('%')),
      DataColumn(label: Text('Grade')),
    ];
  }

  List<DataRow> _buildScholasticRows(List<dynamic> currentTermData) {
    return currentTermData.map((item) {
      int noteBook = item['obtainedNoteBookMarks'] ?? 0;
      int enrichment = item['obtainedSubjectEnrichmentMarks'] ?? 0;
      int marksObtained = item['marksObtained'] ?? 0;
      int obtainedTotal = noteBook + enrichment + marksObtained;
      int totalMarks = (item["totalPracticalMarks"] ?? 0) +
          (item["totalNoteBookMarks"] ?? 0) +
          (item["totalSubjectEnrichmentMarks"] ?? 0);
      double percentage = totalMarks > 0 ? (obtainedTotal / totalMarks) * 100 : 0;

      return DataRow(cells: [
        DataCell(Text(item['subject']?.toString() ?? '')),
        DataCell(Text(noteBook.toString())),
        DataCell(Text(enrichment.toString())),
        DataCell(Text(marksObtained.toString())),
        DataCell(Text(obtainedTotal.toString())),
        DataCell(Text(percentage.toStringAsFixed(2))),
        DataCell(Text(_calculateRange(percentage))),
      ]);
    }).toList();
  }

  String _calculateRange(double totalMark) {
    if (totalMark >= 91) return "A1";
    if (totalMark >= 81) return "A2";
    if (totalMark >= 71) return "B1";
    if (totalMark >= 61) return "B2";
    if (totalMark >= 51) return "C1";
    if (totalMark >= 41) return "C2";
    if (totalMark >= 33) return "D";
    if (totalMark > 0) return "E";
    return " ";
  }

  // Keep other card building methods unchanged...
  Widget _buildAttendanceCard(Size size) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                'Attendance',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                _buildInfoRow('Total', '100'),
                _buildInfoRow('Present', '80'),
                _buildInfoRow('Percentage', '80%'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRemarkCard(Size size) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                'Remark',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                _buildInfoRow('ClassTeacher', 'Ankit Sharma'),
                _buildInfoRow('Coordinator', 'Abhishek'),
                _buildInfoRow('Principal', 'xyz'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildScholasticMarkRangeCard(Size size) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                'Scholastic',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Container(
            color: CustomTheme.primaryColor.withOpacity(0.05),
            padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Mark Range",
                  style: GoogleFonts.openSans(
                    color: CustomTheme.blackColor,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,
                  ),
                ),
                Text(
                  "Grade",
                  style: GoogleFonts.openSans(
                    color: CustomTheme.blackColor,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                _buildInfoRow('91-100', 'A1'),
                _buildInfoRow('81-90', 'A2'),
                _buildInfoRow('71-80', 'B1'),
                _buildInfoRow('61-70', 'B2'),
                _buildInfoRow('51-60', 'C1'),
                _buildInfoRow('41-50', 'C2'),
                _buildInfoRow('33-40', 'D'),
                _buildInfoRow('32 & below', 'E'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCoScholasticMarkRangeCard(Size size) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: CustomTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
            ),
            child: Center(
              child: Text(
                'Co-Scholastic And Discipline',
                style: GoogleFonts.openSans(
                  color: CustomTheme.blackColor,
                  fontWeight: FontWeight.w500,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          ),
          Container(
            color: CustomTheme.primaryColor.withOpacity(0.05),
            padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "PERFORMANCE INDICATORS",
                  style: GoogleFonts.openSans(
                    color: CustomTheme.blackColor,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,
                  ),
                ),
                Text(
                  "GRADE",
                  style: GoogleFonts.openSans(
                    color: CustomTheme.blackColor,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                _buildInfoRow('OUTSTANDING', 'A'),
                _buildInfoRow('VERY GOOD', 'B'),
                _buildInfoRow('FAIR', 'C'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: GoogleFonts.openSans(
              color: CustomTheme.blackColor,
              fontWeight: FontWeight.w600,
              fontSize: 14,
            ),
          ),
          Text(
            value,
            overflow: TextOverflow.ellipsis,
            style: GoogleFonts.openSans(
              color: CustomTheme.blackColor,
              fontWeight: FontWeight.w400,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
