import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/APIs/StudentModuleAPI/DateSheet/date_sheet.dart';
import 'package:shimmer/shimmer.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';

import '../../CustomTheme/customTheme.dart';

class DateSheet extends StatefulWidget {
  const DateSheet({Key? key, required this.Class}) : super(key: key);
  final String Class;

  @override
  State<DateSheet> createState() => _DateSheetState();
}

class _DateSheetState extends State<DateSheet> with SingleTickerProviderStateMixin {
  DateSheetApi apiObj = DateSheetApi();
  List<Map<String, dynamic>>? dateSheet;
  bool isLoading = false;
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 1000),
    );
    fetchDateSheet();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Future<void> fetchDateSheet() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      dateSheet = (await apiObj.fetchDateSheet(accessToken, widget.Class))
          .cast<Map<String, dynamic>>();

      dateSheet!.sort((a, b) {
        DateTime dateA = DateTime.parse(a['schedule'][0]['date']);
        DateTime dateB = DateTime.parse(b['schedule'][0]['date']);
        return dateA.compareTo(dateB);
      });
    } catch (e) {
      print('Error fetching DateSheet data: $e');
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error fetching data: $e')));
    } finally {
      setState(() {
        isLoading = false;
      });
      _animationController.forward();
    }
  }

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
      body: isLoading
          ? _buildShimmerEffect()
          : dateSheet == null || dateSheet!.isEmpty || dateSheet![0]['schedule'].isEmpty
          ? Center(
        child: Text(
          "No date sheet records found",
          style: TextStyle(fontSize: 18, color: Colors.grey[600]),
        ),
      )
          : AnimationLimiter(
        child: ListView.builder(
          itemCount: dateSheet?.length ?? 0,
          itemBuilder: (context, index) {
            final scheduleList = dateSheet![index]['schedule'] as List?;
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