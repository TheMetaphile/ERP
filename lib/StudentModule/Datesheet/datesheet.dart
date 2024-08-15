import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/APIs/StudentModuleAPI/DateSheet/date_sheet.dart';

import '../../CustomTheme/customTheme.dart';

class DateSheet extends StatefulWidget {
  const DateSheet({super.key, required this.Class});
  final String Class;

  @override
  State<DateSheet> createState() => _DateSheetState();
}

class _DateSheetState extends State<DateSheet> {
  DateSheetApi apiObj = DateSheetApi();
  List<Map<String, dynamic>>? dateSheet;
  bool isLoading = false;

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
      showRedSnackBar('$e', context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }


  @override
  void initState() {
    super.initState();
    fetchDateSheet();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    print("dateSheet $dateSheet");

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
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: CustomTheme.primaryColor,
          size: 50,
        ),
      )
          : dateSheet == null || dateSheet!.isEmpty || dateSheet![0]['schedule'].isEmpty
          ? Center(
        child: Text(
          "No date sheet records found",
          style: TextStyle(fontSize: 18, color: Colors.grey[600]),
        ),
      )
          : ListView.builder(
        itemCount: dateSheet?.length ?? 0,
        itemBuilder: (context, index) {
          final scheduleList = dateSheet![index]['schedule'] as List?;
          if (scheduleList == null || scheduleList.isEmpty) {
            return SizedBox.shrink(); // Return an empty widget if schedule is null or empty
          }
          final exam = scheduleList[0];
          return ExamCard(exam: exam);
        },
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

    // Parse the time and convert to 12-hour format
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