import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/StudentModule/Fees/fees.dart';
import 'package:untitled/StudentModule/Fees/previous_session_Bloc/previous_session_bloc.dart';
import '../../CustomTheme/customTheme.dart';
import 'PreviousSession.dart';
import 'TransactionHIstoryBloc/transaction_history_bloc.dart';
import 'TrarnsactionHistory.dart';
import 'feeBloc/fee_bloc.dart';


class FeesDue extends StatefulWidget {
  const FeesDue({super.key, required this.email});
  final String email;

  @override
  State<FeesDue> createState() => _FeesDueState();
}

class _FeesDueState extends State<FeesDue> {
  List<String> cardType = [
    "Fees Status",
    "Transaction History",
    "Previous Session",
  ];
  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => FeesBloc()),
        BlocProvider(create: (context) => TransactionBloc()),
        BlocProvider(create: (context) => PreviousSessionBloc()),
      ],
      child: Scaffold(
        backgroundColor: CustomTheme.whiteColor,
        appBar: AppBar(
          iconTheme: IconThemeData(color: CustomTheme.blackColor),
          leading: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back_ios),
          ),
          backgroundColor: CustomTheme.primaryColor,
          title: Text(
            "Fees Due",
            style: GoogleFonts.openSans(
              color: CustomTheme.blackColor,
              fontWeight: FontWeight.w400,
              fontSize: size.width * 0.05,
            ),
          ),
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 3.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height * 0.005),
              SizedBox(
                height: size.height * 0.05,
                child: ListView.builder(
                  shrinkWrap: true,
                  scrollDirection: Axis.horizontal,
                  itemCount: cardType.length,
                  itemBuilder: (context, index) {
                    return Card(
                      color: currentIndex == index
                          ? CustomTheme.primaryColor
                          : Color.fromRGBO(216, 180, 254, 1),
                      shape: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(50),
                        borderSide: BorderSide(width: 0.5),
                      ),
                      child: InkWell(
                        onTap: () {
                          setState(() {
                            currentIndex = index;
                          });
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              SizedBox(width: size.width * 0.02),
                              Text(
                                cardType[index],
                                style: GoogleFonts.openSans(
                                  fontSize: size.width * 0.04,
                                  color: CustomTheme.blackColor,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              Expanded(
                child: IndexedStack(
                  index: currentIndex,
                  children: [
                    FeesPage(email: widget.email),
                    TransactionHistoryPage(),
                    PreviousSessionPage(email: widget.email),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
