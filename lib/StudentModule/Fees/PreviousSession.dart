import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shimmer/shimmer.dart';
import 'package:untitled/StudentModule/Fees/previous_session_Bloc/previous_session_bloc.dart';
import 'package:untitled/StudentModule/Fees/previous_session_Bloc/previous_session_event.dart';
import 'package:untitled/StudentModule/Fees/previous_session_Bloc/previous_session_state.dart';
import '../../CustomTheme/customTheme.dart';


class PreviousSessionPage extends StatefulWidget {
  const PreviousSessionPage({Key? key, required this.email}) : super(key: key);
  final String email;

  @override
  State<PreviousSessionPage> createState() => _PreviousSessionPageState();
}

class _PreviousSessionPageState extends State<PreviousSessionPage> {
  @override
  void initState() {
    super.initState();
    context.read<PreviousSessionBloc>().add(LoadPreviousSessionData(widget.email));
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return BlocConsumer<PreviousSessionBloc, PreviousSessionState>(
      listener: (context, state) {
        if (state is PreviousSessionError) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.message), backgroundColor: Colors.red),
          );
        }
      },
      builder: (context, state) {
        return RefreshIndicator(
          onRefresh: () async {
            context.read<PreviousSessionBloc>().add(RefreshPreviousSessionData(widget.email));
          },
          child: _buildBody(themeObj, size, state),
        );
      },
    );
  }

  Widget _buildBody(CustomTheme themeObj, Size size, PreviousSessionState state) {
    if (state is PreviousSessionLoading) {
      return _buildShimmerLoading(size);
    } else if (state is PreviousSessionError) {
      return SingleChildScrollView(
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
                    context.read<PreviousSessionBloc>().add(RefreshPreviousSessionData(widget.email));
                  },
                  child: Text('Retry'),
                ),
              ],
            ),
          ),
        ),
      );
    } else if (state is PreviousSessionLoaded) {
      if (state.sessions.isEmpty) {
        return _buildEmptyState(themeObj, size);
      } else {
        return _buildSessionList(themeObj, size, state.sessions);
      }
    }

    return SingleChildScrollView(
      physics: AlwaysScrollableScrollPhysics(),
      child: Container(
        height: size.height * 0.7,
        child: Center(child: Text('Pull to refresh')),
      ),
    );
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
    return SingleChildScrollView(
      physics: AlwaysScrollableScrollPhysics(),
      child: Container(
        height: size.height * 0.7,
        child: Center(
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
        ),
      ),
    );
  }

  Widget _buildSessionList(CustomTheme themeObj, Size size, List<dynamic> sessions) {
    return ListView.builder(
      physics: AlwaysScrollableScrollPhysics(),
      itemCount: sessions.length,
      itemBuilder: (context, index) {
        final item = sessions[index];
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
                // Implement payment logic here
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
