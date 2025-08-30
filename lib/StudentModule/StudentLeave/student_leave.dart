import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:untitled/StudentModule/StudentLeave/studentLeaveBloc/student_leave_bloc.dart';
import 'package:untitled/StudentModule/StudentLeave/studentLeaveBloc/student_leave_event.dart';
import 'package:untitled/StudentModule/StudentLeave/studentLeaveBloc/student_leave_state.dart';
import '../../CustomTheme/customTheme.dart';
import '../../StudentAPIs/StudentModuleAPI/StudentLeave/studentLeaveApi.dart';

class StudentLeaveScreen extends StatefulWidget {
  const StudentLeaveScreen({super.key});

  @override
  State<StudentLeaveScreen> createState() => _StudentLeaveScreenState();
}

class _StudentLeaveScreenState extends State<StudentLeaveScreen> with SingleTickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();
  final RefreshController _refreshController = RefreshController(initialRefresh: false);
  DateTimeRange? selectedDateRange;
  final _reason = TextEditingController();
  final List<String> statusOptions = ['Pending', 'Approved', 'Rejected'];
  bool _hasInitiallyLoaded = false; // Add this flag

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_scrollListener);
    // Remove the initial data loading from here
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _refreshController.dispose();
    _reason.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      final state = context.read<StudentLeaveBloc>().state;
      if (!state.isLoadingMore && !state.allDataLoaded) {
        context.read<StudentLeaveBloc>().add(LoadMoreLeaves(status: state.status));
      }
    }
  }

  Future<void> _onRefresh() async {
    context.read<StudentLeaveBloc>().add(FetchLeaves(status: context.read<StudentLeaveBloc>().state.status, isRefresh: true));
    context.read<StudentLeaveBloc>().add(const LoadStats());
    _refreshController.refreshCompleted();
  }

  // Method to refresh data after operations
  void _refreshData() {
    final currentState = context.read<StudentLeaveBloc>().state;

    context.read<StudentLeaveBloc>().add(const LoadStats());
    context.read<StudentLeaveBloc>().add(FetchLeaves(status: currentState.status, isRefresh: true));
  }

  // Add method to load initial data
  void _loadInitialData() {
    if (!_hasInitiallyLoaded) {
      context.read<StudentLeaveBloc>().add(const LoadStats());
      context.read<StudentLeaveBloc>().add(const FetchLeaves(status: 'Pending'));
      _hasInitiallyLoaded = true;
    }
  }

  Future<void> _newLeavePopup(BuildContext parentContext, Size size, CustomTheme themeObj) async {
    _reason.clear();
    selectedDateRange = null;
    showDialog(
      context: parentContext,
      builder: (BuildContext dialogContext) {
        return StatefulBuilder(
          builder: (dialogContext, setState) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height * 0.01),
                        Text(
                          "Apply For Leave",
                          textAlign: TextAlign.center,
                          style: GoogleFonts.openSans(fontSize: size.width * 0.06, color: Colors.blue),
                        ),
                        const Divider(color: Colors.grey, thickness: 2),
                        SizedBox(height: size.height * 0.03),
                        Row(
                          children: [
                            Text("Choose Date", textAlign: TextAlign.center, style: themeObj.bigNormalText),
                            SizedBox(width: size.width * 0.02),
                            Icon(Icons.calendar_month, color: CustomTheme.blackColor),
                          ],
                        ),
                        SizedBox(height: size.height * 0.01),
                        Container(
                          height: size.height * 0.07,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(color: Colors.grey, width: 1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(
                            child: ListTile(
                              onTap: () async {
                                try {
                                  final DateTimeRange? pickedDateRange = await showDateRangePicker(
                                    context: dialogContext,
                                    initialDateRange: selectedDateRange ??
                                        DateTimeRange(
                                          start: DateTime.now(),
                                          end: DateTime.now().add(const Duration(days: 7)),
                                        ),
                                    firstDate: DateTime(2020),
                                    lastDate: DateTime(2030),
                                    builder: (context, child) {
                                      return Theme(
                                        data: Theme.of(dialogContext).copyWith(
                                          colorScheme: Theme.of(dialogContext).colorScheme.copyWith(
                                            primary: Colors.blue,
                                          ),
                                        ),
                                        child: child!,
                                      );
                                    },
                                  );

                                  if (pickedDateRange != null && pickedDateRange != selectedDateRange) {
                                    setState(() {
                                      selectedDateRange = pickedDateRange;
                                    });
                                  }
                                } catch (e) {
                                  print("Error showing date picker: $e");
                                  ScaffoldMessenger.of(parentContext).showSnackBar(
                                    SnackBar(
                                      content: Text("Error opening date picker. Please try again."),
                                      backgroundColor: Colors.red,
                                    ),
                                  );
                                }
                              },
                              leading: selectedDateRange == null
                                  ? Text('Not Selected', style: TextStyle(fontSize: size.height * 0.02, color: Colors.black))
                                  : Text(
                                '${selectedDateRange!.start.toString().split(' ')[0]} - ${selectedDateRange!.end.toString().split(' ')[0]}',
                                style: TextStyle(fontSize: size.height * 0.02, color: Colors.black),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: size.height * 0.03),
                        Text("Reason", textAlign: TextAlign.center, style: themeObj.normalText),
                        SizedBox(height: size.height * 0.01),
                        TextField(
                          maxLines: 8,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          controller: _reason,
                        ),
                        SizedBox(height: size.height * 0.02),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(
                              width: size.width * 0.3,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color.fromRGBO(209, 213, 219, 1),
                                  shape: RoundedRectangleBorder(
                                    side: const BorderSide(color: Colors.grey, width: 1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                ),
                                onPressed: () => Navigator.pop(dialogContext),
                                child: Text("Cancel", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black)),
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.3,
                              child: BlocBuilder<StudentLeaveBloc, StudentLeaveState>(
                                builder: (context, state) {
                                  return ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0XFF6FF87D),
                                      shape: RoundedRectangleBorder(
                                        side: const BorderSide(color: Colors.grey, width: 1),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    onPressed: () async {
                                      if (selectedDateRange != null && _reason.text.isNotEmpty) {
                                        parentContext.read<StudentLeaveBloc>().add(
                                          ApplyLeave(
                                            startDate: selectedDateRange!.start.toString().split(' ')[0],
                                            endDate: selectedDateRange!.end.toString().split(' ')[0],
                                            reason: _reason.text,
                                          ),
                                        );
                                        Navigator.pop(dialogContext);

                                        // Wait a bit for the operation to complete, then refresh
                                        await Future.delayed(Duration(milliseconds: 1000));
                                        _refreshData();

                                        // Show success message
                                        ScaffoldMessenger.of(parentContext).showSnackBar(
                                          SnackBar(
                                            content: Text("Leave application submitted successfully!"),
                                            backgroundColor: Colors.green,
                                          ),
                                        );
                                      } else {
                                        ScaffoldMessenger.of(parentContext).showSnackBar(
                                          SnackBar(
                                            content: Text("Please fill all fields"),
                                            backgroundColor: Colors.red,
                                          ),
                                        );
                                      }
                                    },
                                    child: state.isLoading
                                        ? const CircularProgressIndicator(color: Colors.black)
                                        : Text("Save", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black)),
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }

  Future<void> _updateLeavePopup(BuildContext context, Size size, Map<String, dynamic> leaveData, CustomTheme themeObj) async {
    final reasonController = TextEditingController(text: leaveData['reason']);
    DateTimeRange initialDateRange = DateTimeRange(
      start: DateTime.parse(leaveData['startDate']),
      end: DateTime.parse(leaveData['endDate']),
    );

    showDialog(
      context: context,
      builder: (BuildContext dialogContext) {
        return StatefulBuilder(
          builder: (dialogContext, setState) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height * 0.01),
                        Text(
                          "Update Leave",
                          textAlign: TextAlign.center,
                          style: GoogleFonts.openSans(fontSize: size.width * 0.06, color: Colors.blue),
                        ),
                        const Divider(color: Colors.grey, thickness: 2),
                        SizedBox(height: size.height * 0.03),
                        Row(
                          children: [
                            Text("Choose Date", textAlign: TextAlign.center, style: themeObj.normalText),
                            SizedBox(width: size.width * 0.02),
                            Icon(Icons.calendar_month, color: CustomTheme.blackColor),
                          ],
                        ),
                        SizedBox(height: size.height * 0.01),
                        Container(
                          height: size.height * 0.07,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(color: Colors.grey, width: 1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(
                            child: ListTile(
                              onTap: () async {
                                final DateTimeRange? pickedDateRange = await showDateRangePicker(
                                  context: dialogContext,
                                  initialDateRange: initialDateRange,
                                  firstDate: DateTime(2024),
                                  lastDate: DateTime(2025),
                                );
                                if (pickedDateRange != null && pickedDateRange != initialDateRange) {
                                  setState(() {
                                    initialDateRange = pickedDateRange;
                                  });
                                }
                              },
                              leading: Text(
                                '${initialDateRange.start.toString().split(' ')[0]} - ${initialDateRange.end.toString().split(' ')[0]}',
                                style: TextStyle(fontSize: size.height * 0.02, color: Colors.black),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: size.height * 0.03),
                        Text("Reason", textAlign: TextAlign.center, style: themeObj.normalText),
                        SizedBox(height: size.height * 0.01),
                        TextField(
                          maxLines: 8,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          controller: reasonController,
                        ),
                        SizedBox(height: size.height * 0.02),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(
                              width: size.width * 0.3,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color.fromRGBO(209, 213, 219, 1),
                                  shape: RoundedRectangleBorder(
                                    side: const BorderSide(color: Colors.grey, width: 1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                ),
                                onPressed: () => Navigator.pop(dialogContext),
                                child: Text("Cancel", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black)),
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.3,
                              child: BlocBuilder<StudentLeaveBloc, StudentLeaveState>(
                                builder: (context, state) {
                                  return ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0XFF6FF87D),
                                      shape: RoundedRectangleBorder(
                                        side: const BorderSide(color: Colors.grey, width: 1),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                    ),
                                    onPressed: () async {
                                      if (reasonController.text.isNotEmpty) {
                                        context.read<StudentLeaveBloc>().add(
                                          UpdateLeave(
                                            leaveId: leaveData['_id'],
                                            startDate: initialDateRange.start.toString().split(' ')[0],
                                            endDate: initialDateRange.end.toString().split(' ')[0],
                                            reason: reasonController.text,
                                          ),
                                        );
                                        Navigator.pop(dialogContext);
                                        await Future.delayed(Duration(milliseconds: 1000));
                                        _refreshData();
                                      } else {
                                        ScaffoldMessenger.of(context).showSnackBar(
                                          SnackBar(
                                            content: Text("Please fill all fields"),
                                            backgroundColor: Colors.red,
                                          ),
                                        );
                                      }
                                    },
                                    child: state.isLoading
                                        ? const CircularProgressIndicator(color: Colors.black)
                                        : Text("Update", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black)),
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: AppBar(
        backgroundColor: CustomTheme.primaryColor,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        ),
        title: Text(
          "My Leaves",
          style: GoogleFonts.poppins(
            color: Colors.black,
            fontWeight: FontWeight.w400,
            fontSize: size.width * 0.05,
          ),
        ),
        actions: [
          Container(
            height: size.height * 0.05,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: TextButton.icon(
              onPressed: () => _newLeavePopup(context, size, themeObj),
              icon: Icon(CupertinoIcons.add_circled, color: Colors.black),
              label: Text("New Leave", style: themeObj.normalText.copyWith(color: Colors.black)),
            ),
          ),
          SizedBox(width: 16),
        ],
      ),
      body: BlocConsumer<StudentLeaveBloc, StudentLeaveState>(
        listener: (context, state) {
          if (state.errorMessage != null) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.errorMessage!),
                backgroundColor: Colors.red,
              ),
            );
          }
        },
        builder: (context, state) {
          // Load initial data when the widget builds for the first time
          WidgetsBinding.instance.addPostFrameCallback((_) {
            _loadInitialData();
          });

          return SmartRefresher(
            controller: _refreshController,
            onRefresh: _onRefresh,
            child: CustomScrollView(
              controller: _scrollController,
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 3.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height * 0.02),
                        // Statistics Card
                        Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(16),
                              gradient: LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [Colors.blue[100]!, Colors.blue[50]!],
                              ),
                            ),
                            padding: EdgeInsets.all(12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Leave Statistics",
                                  style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.bold, color: Colors.blue[800]),
                                ),
                                SizedBox(height: 16),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                                  children: [
                                    _buildAnimatedStatCard("Approved", state.stats["approved"] ?? 0, Colors.green, themeObj),
                                    _buildAnimatedStatCard("Pending", state.stats["pending"] ?? 0, Colors.orange, themeObj),
                                    _buildAnimatedStatCard("Rejected", state.stats["rejected"] ?? 0, Colors.red, themeObj),
                                  ],
                                ),
                                SizedBox(height: 24),
                                Center(
                                  child: TweenAnimationBuilder<double>(
                                    tween: Tween<double>(begin: 0, end: _calculateTotalProgress(state)),
                                    duration: Duration(seconds: 1),
                                    builder: (context, value, child) {
                                      return SizedBox(
                                        height: size.width * 0.3,
                                        width: size.width * 0.3,
                                        child: Stack(
                                          fit: StackFit.expand,
                                          children: [
                                            CircularProgressIndicator(
                                              value: value,
                                              valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                                              strokeWidth: 10,
                                              backgroundColor: Colors.grey[300],
                                            ),
                                            Center(
                                              child: Column(
                                                mainAxisSize: MainAxisSize.min,
                                                children: [
                                                  Text(
                                                    "${(_calculateTotalLeaves(state) * value).toInt()}",
                                                    style: themeObj.bigNormalText.copyWith(
                                                      fontSize: 28,
                                                      fontWeight: FontWeight.bold,
                                                      color: Colors.blue[800],
                                                    ),
                                                  ),
                                                  Text(
                                                    'Total Leaves',
                                                    style: themeObj.normalText.copyWith(color: Colors.blue[600]),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ],
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        // Header Row
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "Leave History",
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
                                  padding: const EdgeInsets.all(8),
                                  icon: const Icon(Icons.keyboard_arrow_down_sharp),
                                  underline: Container(),
                                  value: state.status,
                                  onChanged: (newValue) {
                                    context.read<StudentLeaveBloc>().add(FetchLeaves(status: newValue!));
                                  },
                                  items: statusOptions.map((String option) {
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
                        Divider(color: CustomTheme.greyColor),
                      ],
                    ),
                  ),
                ),
                // Loading or Empty State
                if (state.isLoading && (state.leaves == null || state.leaves!.isEmpty))
                  SliverToBoxAdapter(
                    child: Center(
                      child: Padding(
                        padding: EdgeInsets.only(top: 50),
                        child: LoadingAnimationWidget.threeArchedCircle(
                          color: CustomTheme.primaryColor,
                          size: 50,
                        ),
                      ),
                    ),
                  )
                else if (state.leaves == null || state.leaves!.isEmpty)
                  SliverToBoxAdapter(
                    child: Center(
                      child: Padding(
                        padding: EdgeInsets.only(top: 50),
                        child: Text(
                          "No Leaves found!",
                          style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
                        ),
                      ),
                    ),
                  )
                else
                // Leave List
                  SliverList(
                    delegate: SliverChildBuilderDelegate(
                          (context, index) {
                        if (index < (state.leaves?.length ?? 0)) {
                          final leave = state.leaves![index];
                          return AnimationConfiguration.staggeredList(
                            position: index,
                            duration: const Duration(milliseconds: 375),
                            child: SlideAnimation(
                              verticalOffset: 50.0,
                              child: FadeInAnimation(
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: 3.0, vertical: 4.0),
                                  child: Card(
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(16),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          _buildLeaveHeader(leave, size, themeObj),
                                          _buildLeaveBody(leave, size, themeObj, context),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          );
                        } else {
                          return Center(
                            child: Padding(
                              padding: EdgeInsets.all(16),
                              child: LoadingAnimationWidget.threeArchedCircle(
                                color: CustomTheme.primaryColor,
                                size: 50,
                              ),
                            ),
                          );
                        }
                      },
                      childCount: (state.leaves?.length ?? 0) + (state.isLoadingMore ? 1 : 0),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildAnimatedStatCard(String title, int value, Color color, CustomTheme themeObj) {
    return TweenAnimationBuilder<int>(
      tween: IntTween(begin: 0, end: value),
      duration: Duration(seconds: 1),
      builder: (context, animatedValue, child) {
        return Card(
          elevation: 4,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          child: Padding(
            padding: EdgeInsets.all(12),
            child: Column(
              children: [
                Text(
                  "$animatedValue",
                  style: themeObj.bigNormalText.copyWith(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 28,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  title,
                  style: themeObj.normalText.copyWith(color: Colors.grey[600]),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildLeaveHeader(Map<String, dynamic> leave, Size size, CustomTheme themeObj) {
    Color headerColor;
    IconData headerIcon;

    switch (leave["status"]) {
      case "Pending":
        headerColor = Colors.orange;
        headerIcon = Icons.schedule;
        break;
      case "Approved":
        headerColor = Colors.green;
        headerIcon = Icons.check_circle;
        break;
      default:
        headerColor = Colors.red;
        headerIcon = Icons.cancel;
    }

    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [headerColor.withOpacity(0.2), headerColor.withOpacity(0.05)],
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(headerIcon, color: headerColor, size: 20),
              SizedBox(width: size.width * 0.01),
              Text(
                leave["status"],
                style: themeObj.bigNormalText.copyWith(color: headerColor, fontWeight: FontWeight.w500),
              ),
            ],
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 5, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 1,
                  blurRadius: 3,
                  offset: Offset(0, 1),
                ),
              ],
            ),
            child: Text(
              "${leave["startDate"]} - ${leave["endDate"]}",
              style: GoogleFonts.poppins(
                fontSize: size.width * 0.035,
                color: Colors.grey[700],
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLeaveBody(Map<String, dynamic> leave, Size size, CustomTheme themeObj, BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Reason:",
            style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.bold),
          ),
          SizedBox(height: size.height * 0.01),
          Text(
            leave["reason"],
            style: themeObj.normalText.copyWith(color: Colors.grey[700]),
          ),
          SizedBox(height: size.height * 0.02),
          if (leave["status"] == "Pending")
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                _buildAnimatedActionButton(
                  icon: Icons.edit,
                  color: Colors.blue,
                  onPressed: () => _updateLeavePopup(context, size, leave, themeObj),
                ),
                SizedBox(width: 12),
                _buildAnimatedActionButton(
                  icon: Icons.delete,
                  color: Colors.red,
                  onPressed: () async {
                    context.read<StudentLeaveBloc>().add(DeleteLeave(leaveId: leave["_id"]));
                    await Future.delayed(Duration(milliseconds: 1000));
                    _refreshData();
                  },
                ),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildAnimatedActionButton({required IconData icon, required Color color, required VoidCallback onPressed}) {
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(30),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(30),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Icon(icon, color: Colors.white, size: 24),
        ),
      ),
    );
  }

  double _calculateTotalProgress(StudentLeaveState state) {
    int total = _calculateTotalLeaves(state);
    int approved = state.stats["approved"] ?? 0;
    return total > 0 ? approved / total : 0;
  }

  int _calculateTotalLeaves(StudentLeaveState state) {
    return (state.stats["approved"] ?? 0) + (state.stats["pending"] ?? 0) + (state.stats["rejected"] ?? 0);
  }
}
