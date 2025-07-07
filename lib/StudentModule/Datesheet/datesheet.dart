import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:shimmer/shimmer.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:untitled/StudentModule/Datesheet/studentDatesheet/student_datesheet_bloc.dart';
import 'package:untitled/StudentModule/Datesheet/studentDatesheet/student_datesheet_event.dart';
import 'package:untitled/StudentModule/Datesheet/studentDatesheet/student_datesheet_state.dart';
import '../../CustomTheme/customTheme.dart';


class DateSheet extends StatelessWidget {
  const DateSheet({Key? key, required this.Class}) : super(key: key);
  final String Class;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => DateSheetBloc()..add(FetchDateSheet(Class)),
      child: DateSheetView(className: Class),
    );
  }
}

class DateSheetView extends StatelessWidget {
  final String className;

  const DateSheetView({Key? key, required this.className}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        ),
        backgroundColor: CustomTheme.primaryColor,
        title: Text(
          "Date Sheet",
          style: themeObj.bigNormalText.copyWith(color: CustomTheme.blackColor),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          context.read<DateSheetBloc>().add(RefreshDateSheet(className));
          await Future.delayed(Duration(milliseconds: 1000)); // Simulate network delay
        },
        child: BlocConsumer<DateSheetBloc, DateSheetState>(
          listener: (context, state) {
            if (state is DateSheetError) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(state.message)),
              );
            }
          },
          builder: (context, state) {
            if (state is DateSheetLoading) {
              return _buildShimmerEffect();
            }
            if (state is DateSheetLoaded) {
              if (state.dateSheet.isEmpty || state.dateSheet[0]['schedule'].isEmpty) {
                return Center(
                  child: Text(
                    "No date sheet records found",
                    style: TextStyle(fontSize: 18, color: Colors.grey[600]),
                  ),
                );
              }
              return AnimationLimiter(
                child: ListView.builder(
                  physics: const AlwaysScrollableScrollPhysics(),
                  itemCount: state.dateSheet.length,
                  itemBuilder: (context, index) {
                    final scheduleList = state.dateSheet[index]['schedule'] as List?;
                    if (scheduleList == null || scheduleList.isEmpty) {
                      return SizedBox.shrink();
                    }
                    final exam = scheduleList[0];
                    return AnimationConfiguration.staggeredList(
                      position: index,
                      duration: const Duration(milliseconds: 375),
                      child: SlideAnimation(
                        verticalOffset: 50.0,
                        child: FadeInAnimation(
                          child: ExamCard(exam: exam),
                        ),
                      ),
                    );
                  },
                ),
              );
            }
            return Center(
              child: Text(
                "No date sheet records found",
                style: TextStyle(fontSize: 18, color: Colors.grey[600]),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildShimmerEffect() {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        itemCount: 5,
        itemBuilder: (_, __) => Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Container(
            height: 120,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ),
    );
  }
}

class ExamCard extends StatelessWidget {
  final Map<String, dynamic> exam;

  const ExamCard({Key? key, required this.exam}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final date = DateTime.parse(exam['date']);
    final formattedDate = DateFormat('MMMM d, yyyy').format(date);
    final dayName = DateFormat('EEEE').format(date);

    final timeFormat = DateFormat('HH:mm');
    final examTime = timeFormat.parse(exam['time']);
    final formattedTime = DateFormat('h:mm a').format(examTime);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              exam['subject'],
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.calendar_today, size: 16, color: Colors.grey[600]),
                const SizedBox(width: 8),
                Text(
                  '$formattedDate ($dayName)',
                  style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.access_time, size: 16, color: Colors.grey[600]),
                const SizedBox(width: 8),
                Text(
                  '$formattedTime (${exam['duration']})',
                  style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}