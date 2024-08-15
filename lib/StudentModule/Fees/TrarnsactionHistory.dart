import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shimmer/shimmer.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/Fees/fees_Stats.dart';
import '../../CustomTheme/customTheme.dart';

class TransactionHistory extends StatefulWidget {
  const TransactionHistory({Key? key}) : super(key: key);

  @override
  State<TransactionHistory> createState() => _TransactionHistoryState();
}

class _TransactionHistoryState extends State<TransactionHistory> {
  bool isLoading = false;
  List<dynamic>? transactionDetails;
  FeesStatsApi apiObj = FeesStatsApi();

  @override
  void initState() {
    super.initState();
    fetchTransactionDetails();
  }

  Future<void> fetchTransactionDetails() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final details = await apiObj.fetchTransactionDetails(accessToken!);
      setState(() {
        transactionDetails = details;
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

      body: _buildBody(size, themeObj),
    );
  }



  Widget _buildBody(Size size, CustomTheme themeObj) {
    if (isLoading) {
      return _buildShimmerLoading(size, themeObj);
    } else if (transactionDetails == null || transactionDetails!.isEmpty) {
      return _buildEmptyState(themeObj);
    } else {
      return _buildTransactionList(size, themeObj);
    }
  }

  Widget _buildShimmerLoading(Size size, CustomTheme themeObj) {
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

  Widget _buildEmptyState(CustomTheme themeObj) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.history, size: 64, color: Colors.grey[400]),
          SizedBox(height: 16),
          Text(
            "No Transaction History",
            style: themeObj.bigNormalText.copyWith(
              color: Colors.grey[600],
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTransactionList(Size size, CustomTheme themeObj) {
    return ListView.builder(
      itemCount: transactionDetails!.length,
      itemBuilder: (context, index) {
        final item = transactionDetails![index];
        return TransactionCard(
          installmentId: item['installment_id']?.toString() ?? '',
          orderId: item['order_id']?.toString() ?? '',
          paymentId: item['payment_id']?.toString() ?? '',
          date: item['date']?.toString() ?? '',
          amount: item['amount']?.toString() ?? '',
          status: item['payment_status']?.toString() ?? '',
          size: size,
          themeObj: themeObj,
        );
      },
    );
  }
}

class TransactionCard extends StatelessWidget {
  final String installmentId;
  final String orderId;
  final String paymentId;
  final String date;
  final String amount;
  final String status;
  final Size size;
  final CustomTheme themeObj;

  const TransactionCard({
    Key? key,
    required this.installmentId,
    required this.orderId,
    required this.paymentId,
    required this.date,
    required this.amount,
    required this.status,
    required this.size,
    required this.themeObj,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Color statusColor = status.toLowerCase() == 'success' ? Colors.green : Colors.red;
    IconData statusIcon = status.toLowerCase() == 'success' ? Icons.check_circle : Icons.error;

    return Card(
      margin: EdgeInsets.symmetric(horizontal: size.width * 0.04, vertical: size.height * 0.01),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(size.width * 0.04)),
      child: Padding(
        padding: EdgeInsets.all(size.width * 0.04),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '₹$amount',
                  style: themeObj.bigNormalText.copyWith(
                    fontSize: size.width * 0.06,
                    fontWeight: FontWeight.w500,
                    color: CustomTheme.primaryColor,
                  ),
                ),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: size.width * 0.02, vertical: size.height * 0.005),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(size.width * 0.03),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(statusIcon, color: statusColor, size: size.width * 0.04),
                      SizedBox(width: size.width * 0.01),
                      Text(
                        "$status",
                        style: themeObj.normalText.copyWith(color: statusColor, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.015),
            _buildInfoRow(Icons.calendar_today, 'Date', _formatDate(date)),
            _buildInfoRow(Icons.confirmation_number, 'Installment ID', installmentId),
            _buildInfoRow(Icons.shopping_cart, 'Order ID', orderId),
            _buildInfoRow(Icons.payment, 'Payment ID', paymentId),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
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
          Expanded(
            child: Text(
              value,
              style: themeObj.normalText.copyWith(
                fontWeight: FontWeight.w400,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(String dateString) {
    try {
      final date = DateTime.parse(dateString);
      return DateFormat('MMM d, yyyy').format(date);
    } catch (e) {
      return dateString;
    }
  }
}