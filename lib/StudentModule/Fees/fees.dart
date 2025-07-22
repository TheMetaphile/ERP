import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import '../../CustomTheme/customTheme.dart';
import 'feeBloc/fee_bloc.dart';
import 'feeBloc/fee_event.dart';
import 'feeBloc/fee_state.dart';

class FeesPage extends StatefulWidget {
  const FeesPage({Key? key, required this.email}) : super(key: key);
  final String email;

  @override
  State<FeesPage> createState() => _FeesPageState();
}

class _FeesPageState extends State<FeesPage> {
  @override
  void initState() {
    super.initState();
    context.read<FeesBloc>().add(LoadFeesData(widget.email));
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return BlocConsumer<FeesBloc, FeesState>(
      listener: (context, state) {
        if (state is PaymentSuccess) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.message), backgroundColor: Colors.green),
          );
        } else if (state is PaymentError || state is FeesError) {
          String message = '';
          if (state is PaymentError) message = state.message;
          if (state is FeesError) message = state.message;

          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(message), backgroundColor: Colors.red),
          );
        }
      },
      builder: (context, state) {
        if (state is FeesLoading || state is PaymentProcessing) {
          return Center(
            child: LoadingAnimationWidget.threeArchedCircle(
              color: CustomTheme.primaryColor,
              size: 50,
            ),
          );
        }

        if (state is FeesError) {
          return RefreshIndicator(
            onRefresh: () async {
              context.read<FeesBloc>().add(RefreshFeesData(widget.email));
            },
            child: SingleChildScrollView(
              physics: AlwaysScrollableScrollPhysics(),
              child: Container(
                height: size.height * 0.7,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.error, size: 60, color: Colors.red),
                      SizedBox(height: 16),
                      Text('Error: ${state.message}'),
                      ElevatedButton(
                        onPressed: () {
                          context.read<FeesBloc>().add(RefreshFeesData(widget.email));
                        },
                        child: Text('Retry'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        }

        if (state is FeesLoaded) {
          return RefreshIndicator(
            onRefresh: () async {
              context.read<FeesBloc>().add(RefreshFeesData(widget.email));
            },
            child: SingleChildScrollView(
              physics: AlwaysScrollableScrollPhysics(),
              child: Padding(
                padding: EdgeInsets.all(size.width * 0.01),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: size.height * 0.01),
                    _buildFeeOverview(size, themeObj, state.feeStats),
                    SizedBox(height: size.height * 0.02),
                    _buildStatusSelector(size, themeObj, state.selectedStatus),
                    SizedBox(height: size.height * 0.02),
                    _buildFeeTable(size, themeObj, state),
                  ],
                ),
              ),
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () async {
            context.read<FeesBloc>().add(RefreshFeesData(widget.email));
          },
          child: SingleChildScrollView(
            physics: AlwaysScrollableScrollPhysics(),
            child: Container(
              height: size.height * 0.7,
              child: Center(child: Text('Pull to refresh')),
            ),
          ),
        );
      },
    );
  }

  Widget _buildFeeOverview(Size size, CustomTheme themeObj, Map<String, dynamic> feeStats) {
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

  Widget _buildStatusSelector(Size size, CustomTheme themeObj, String selectedStatus) {
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
                context.read<FeesBloc>().add(ChangeFeesStatus(newValue!));
              },
              items: ["Monthly", "Quarterly"].map<DropdownMenuItem<String>>((String value) {
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

  Widget _buildFeeTable(Size size, CustomTheme themeObj, FeesLoaded state) {
    List<dynamic>? data = state.selectedStatus == "Monthly" ? state.monthlyStatus : state.quarterlyStatus;

    if (data == null || data.isEmpty) {
      return Center(
        child: Text(
          "No ${state.selectedStatus.toLowerCase()} records found",
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
          columns: _getColumns(state.selectedStatus),
          rows: List.generate(
            data.length,
                (index) => _getDataRow(data[index], themeObj, index, state.selectedStatus),
          ),
        ),
      ),
    );
  }

  List<DataColumn> _getColumns(String selectedStatus) {
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

  DataRow _getDataRow(dynamic item, CustomTheme themeObj, int index, String selectedStatus) {
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
              _razorPay(item["amount"], index, item["month"]);
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
              _razorPay(item["pendingFee"], index, item["quarter"]);
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

  void _razorPay(int amount, int index, String orderId) {
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

    razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, (PaymentSuccessResponse response) {
      print("Payment success: ${response.paymentId}");
      context.read<FeesBloc>().add(ProcessPayment(widget.email, amount, index, orderId));
    });

    razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, (PaymentFailureResponse response) {
      print("Payment error: ${response.error}");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Payment failed: ${response.message}'), backgroundColor: Colors.red),
      );
    });

    razorpay.open(options);
  }
}
