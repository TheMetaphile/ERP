import 'package:alphabet_slider/alphabet_slider_view.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/Fees/fees_Stats.dart';
import '../../CustomTheme/customTheme.dart';

class Fees extends StatefulWidget {
  const Fees({Key? key, required this.email}) : super(key: key);
  final String email;

  @override
  State<Fees> createState() => _FeesState();
}

class _FeesState extends State<Fees> {
  String selectedStatus = "Monthly";
  List<String> statusOptions = ["Monthly", "Quarterly"];
  bool isLoading = false;
  // var amount = 100;

  FeesStatsApi apiObj = FeesStatsApi();
  List<dynamic>? monthlyStatus;
  List<dynamic>? quarterlyStatus;
  Map<String, dynamic> feeStats = {};

  @override
  void initState() {
    super.initState();
    fetchPaymentDetails();
    fetchStats();
  }

  Future<void> fetchPaymentDetails() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final details = await apiObj.fetchPaymentDetails(accessToken!);
      monthlyStatus = details["monthlyStatus"];
      quarterlyStatus = details["quarterlyStatus"];
    } catch (e) {
      print('Error loading result data: $e');
      showRedSnackBar("$e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchStats() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception('Access token is null');
      var data = await apiObj.fetchStats(accessToken);
      feeStats = data;
    } catch (e) {
      print(e);
      showRedSnackBar("$e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void razorPay(int amount,int index,String orderId) {

    Razorpay razorpay = Razorpay();
    var options = {
      'key': 'rzp_test_nNousIIsoO34Lz',
      'amount': amount*100,
      'name': 'Metaphile',
      'description': 'Metaphile',
      'retry': {'enabled': true, 'max_count': 1},
      'send_sms_hash': true,
      'prefill': {'contact': '7302104299', 'email': 'bhanu68tyagi@gmail.com'},
    };

    Future<void> handlePaymentErrorResponse(PaymentFailureResponse response) async {
      var paymentErrors=response;
      String paymentId=response.error?["metadata"]["payment_id"] ??"";
      print("Payment error: ${response.error?["metadata"]["payment_id"]}");
      print("Payment error: ${response.error}");
      await callFeesApi(paymentId,"Failed",amount,index,orderId);
      showRedSnackBar("Payment failed: ${response.message}", context);
    }

    Future<void> handlePaymentSuccessResponse(PaymentSuccessResponse response) async {
      print("Payment success: ${response.paymentId}");
      String paymentId=response.paymentId ??"";
      await callFeesApi(paymentId ,"Success",amount,index,orderId);
    }

    Future<void> handleExternalWalletSelected(ExternalWalletResponse response) async {
      print("External wallet selected: ${response.walletName}");
    }

    razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, handlePaymentErrorResponse);
    razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, handlePaymentSuccessResponse);
    razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, handleExternalWalletSelected);
    razorpay.open(options);
  }



  Future<void> callFeesApi(String paymentId,String status,int amount,int index,String oderId) async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      final response = await apiObj.Fees(accessToken!, widget.email, amount, status, "", paymentId, "Online", false, "",oderId);
      if (response == true) {
        showGreenSnackBar("Payment Successful", context);
        selectedStatus=="Monthly"? monthlyStatus![index]["status"]="Submitted":quarterlyStatus?[index]["status"]=="Submitted";


      } else {
        showRedSnackBar("Payment Failed", context);
      }
    } catch (e) {
      print('Error processing payment: $e');
      showRedSnackBar("$e", context);
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
      body: isLoading
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: CustomTheme.primaryColor,
          size: 50,
        ),
      )
          : SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(size.width * 0.01),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              SizedBox(height: size.height * 0.01),
              _buildFeeOverview(size, themeObj),
              SizedBox(height: size.height * 0.02),
              _buildStatusSelector(size, themeObj),
              SizedBox(height: size.height * 0.02),
              _buildFeeTable(size, themeObj),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFeeOverview(Size size, CustomTheme themeObj) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Fee Overview", style: themeObj.bigNormalText.copyWith(fontSize: size.width*0.055, fontWeight: FontWeight.w500)),
        SizedBox(height: size.height * 0.01),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          childAspectRatio: 1.3,
          mainAxisSpacing: 15,
          crossAxisSpacing: 15,
          children: [
            _buildFeeCard("Total Payable", feeStats["total"]?.toString() ?? "0", Icons.monetization_on, Colors.indigo, size),
            _buildFeeCard("Total Paid", feeStats["paid"]?.toString() ?? "0", Icons.account_balance_wallet, Colors.green, size),
            _buildFeeCard("Total Discount", feeStats["discount"]?.toString() ?? "0", Icons.discount, Colors.orange, size),
            _buildFeeCard("Pending", "${int.parse(feeStats["total"]?.toString() ?? "0") - int.parse(feeStats["paid"]?.toString() ?? "0") - int.parse(feeStats["discount"]?.toString() ?? "0")}", Icons.pending_actions, Colors.red, size),
          ],
        ),
      ],
    );
  }

  Widget _buildFeeCard(String title, String amount, IconData icon, Color color, Size size) {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        // decoration: BoxDecoration(
        //   borderRadius: BorderRadius.circular(20),
        //   gradient: LinearGradient(
        //     colors: [color.withOpacity(0.7), color.withOpacity(0.9)],
        //     begin: Alignment.topLeft,
        //     end: Alignment.bottomRight,
        //   ),
        // ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: size.width * 0.08, color: Colors.black),
            SizedBox(height: size.height * 0.01),
            Text('₹ $amount', style: GoogleFonts.poppins(fontSize: size.width*0.045, fontWeight: FontWeight.w600, color: Colors.black)),
            SizedBox(height: size.height * 0.01),
            Text(title, style: GoogleFonts.poppins(fontSize: size.width*0.035, color: Colors.black)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusSelector(Size size, CustomTheme themeObj) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text("Payment Status", style: themeObj.bigNormalText.copyWith(fontSize: size.width*0.055)),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: Colors.grey[200],
            borderRadius: BorderRadius.circular(25),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: selectedStatus,
              icon: Icon(Icons.keyboard_arrow_down, color: CustomTheme.primaryColor),
              style: themeObj.normalText.copyWith(),
              onChanged: (String? newValue) {
                setState(() {
                  selectedStatus = newValue!;
                  // fetchPaymentDetails();
                });
              },
              items: statusOptions.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFeeTable(Size size, CustomTheme themeObj) {
    List<dynamic>? data = selectedStatus == "Monthly" ? monthlyStatus : quarterlyStatus;

    if (data == null || data.isEmpty) {
      return Center(
        child: Text(
          "No ${selectedStatus.toLowerCase()} records found",
          style: GoogleFonts.poppins(fontSize: size.width*0.045, color: Colors.grey[600]),
        ),
      );
    }

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: EdgeInsets.all(0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          columnSpacing: 20,
          headingRowColor: MaterialStateProperty.all(Colors.grey[200]),
          columns: _getColumns(),
          rows:data.mapIndexed((item, index) => _getDataRow(item, themeObj, index)).toList(),
        ),
      ),
    );
  }

  List<DataColumn> _getColumns() {
    List<String> columns = selectedStatus == "Monthly"
        ? ['Month', 'Amount', 'Discount', 'Status', 'Action']
        : ['Months', 'Quarter', 'Amount', 'Discount', 'Pending', 'Status', 'Action'];

    return columns
        .map((String column) => DataColumn(
      label: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(column, style: GoogleFonts.poppins(fontWeight: FontWeight.w500,fontSize: 12)),
      ),
    ))
        .toList();
  }

  DataRow _getDataRow(dynamic item, CustomTheme themeObj,int index) {
    print("index $index");
    if (selectedStatus == "Monthly") {
      return DataRow(cells: [
        DataCell(Text(item["month"] ?? "", style: themeObj.normalText)),
        DataCell(Text('₹${item["amount"] ?? ""}', style: themeObj.normalText)),
        DataCell(Text('₹${item["discountApplied"] ?? ""}', style: themeObj.normalText)),
        DataCell(Text(item["status"] ?? "", style: themeObj.normalText)),
        DataCell(
          item['status'] == 'Submitted'
              ? Text("Paid", style: themeObj.normalText.copyWith(color: Colors.green))
              : ElevatedButton(
            onPressed: (){
              razorPay(item["amount"],index,item["month"]);
    },
            child: Text("Pay"),
            style: ElevatedButton.styleFrom(
              backgroundColor: CustomTheme.primaryColor,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
          ),
        ),
      ]);
    } else {
      return DataRow(cells: [
        DataCell(SizedBox(

            child: Text(item["months"]?.join(", ") ?? "", style: themeObj.normalText))),
        DataCell(Text(item["quarter"] ?? "", style: themeObj.normalText)),
        DataCell(Text('₹${item["amount"] ?? ""}', style: themeObj.normalText)),
        DataCell(Text('₹${item["discountApplied"] ?? ""}', style: themeObj.normalText)),
        DataCell(Text('₹${item["pendingFee"] ?? ""}', style: themeObj.normalText)),
        DataCell(Text(item["status"] ?? "", style: themeObj.normalText)),
        DataCell(
          item['status'] == 'Submitted'
              ? Text("Paid", style: themeObj.normalText.copyWith(color: Colors.green))
              : ElevatedButton(
            onPressed: (){
    razorPay(item["pendingFee"],index,item["quarter"]);
    },
            child: Text("Pay"),
            style: ElevatedButton.styleFrom(
              backgroundColor: CustomTheme.primaryColor,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
          ),
        ),
      ]);
    }
  }


}