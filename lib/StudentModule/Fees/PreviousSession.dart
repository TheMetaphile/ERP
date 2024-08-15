import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shimmer/shimmer.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/Fees/fees_Stats.dart';
import '../../CustomTheme/customTheme.dart';

class PreviousSession extends StatefulWidget {
  const PreviousSession({Key? key, required this.email}) : super(key: key);
  final String email;

  @override
  State<PreviousSession> createState() => _PreviousSessionState();
}

class _PreviousSessionState extends State<PreviousSession> {
  bool isLoading = false;
  List<dynamic>? previousSessionDetails;
  FeesStatsApi apiObj = FeesStatsApi();

  @override
  void initState() {
    super.initState();
    fetchPreviousSessionDetails();
  }

  Future<void> fetchPreviousSessionDetails() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final details = await apiObj.fetchPreviousSession(accessToken!, widget.email);
      setState(() {
        previousSessionDetails = details;
      });
    } catch (e) {
      print('Error loading result data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e'), backgroundColor: Colors.red),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      body: _buildBody(themeObj, size),
    );
  }



  Widget _buildBody(CustomTheme themeObj, Size size) {
    if (isLoading) {
      return _buildShimmerLoading(size);
    } else if (previousSessionDetails == null || previousSessionDetails!.isEmpty) {
      return _buildEmptyState(themeObj, size);
    } else {
      return _buildSessionList(themeObj, size);
    }
  }

  Widget _buildShimmerLoading(Size size) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        itemCount: 5,
        itemBuilder: (context, index) => Padding(
          padding: EdgeInsets.all(size.width * 0.02),
          child: Card(
            elevation: 1.0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(size.width * 0.04),
            ),
            child: SizedBox(height: size.height * 0.15),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState(CustomTheme themeObj, Size size) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.history, size: size.width * 0.16, color: Colors.grey[400]),
          SizedBox(height: size.height * 0.02),
          Text(
            "No previous sessions found",
            style: themeObj.bigNormalText.copyWith(
              color: Colors.grey[600],
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSessionList(CustomTheme themeObj, Size size) {
    return ListView.builder(
      itemCount: previousSessionDetails!.length,
      itemBuilder: (context, index) {
        final item = previousSessionDetails![index];
        return _buildSessionCard(item, themeObj, size);
      },
    );
  }

  Widget _buildSessionCard(dynamic item, CustomTheme themeObj, Size size) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: size.width * 0.04, vertical: size.height * 0.01),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(size.width * 0.04)),
      child: Padding(
        padding: EdgeInsets.all(size.width * 0.04),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Class ${item['class']} - ${item['session']}",
              style: themeObj.bigNormalText.copyWith(
                fontSize: size.width * 0.045,
                fontWeight: FontWeight.w500,
                color: CustomTheme.primaryColor,
              ),
            ),
            SizedBox(height: size.height * 0.01),
            _buildInfoRow(Icons.calendar_today, "Month", item['month'], themeObj, size),
            _buildInfoRow(Icons.attach_money, "Amount", "\₹${item['amount']}", themeObj, size),
            _buildInfoRow(Icons.discount, "Discount", "${item['discount']}%", themeObj, size),
            SizedBox(height: size.height * 0.02),
            ElevatedButton(
              onPressed: () {
                // Implement payment logic
              },
              child: Text("Pay Now", style: themeObj.normalText.copyWith(color: CustomTheme.blackColor)),
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomTheme.primaryColor,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(size.width * 0.02)),
                padding: EdgeInsets.symmetric(horizontal: size.width * 0.04, vertical: size.height * 0.015),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value, CustomTheme themeObj, Size size) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: size.height * 0.005),
      child: Row(
        children: [
          Icon(icon, size: size.width * 0.045, color: Colors.grey[600]),
          SizedBox(width: size.width * 0.02),
          Text(
            "$label: ",
            style: themeObj.normalText.copyWith(
              fontWeight: FontWeight.w500,
              color: Colors.grey[700],
            ),
          ),
          Text(
            value,
            style: themeObj.normalText.copyWith(
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}