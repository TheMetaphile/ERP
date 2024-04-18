import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class History extends StatefulWidget {
  const History({super.key});

  @override
  State<History> createState() => _HistoryState();
}

class _HistoryState extends State<History> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(size.height * 0.025),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: size.height * 0.08,
                ),
                Text(
                  "Expense Management",
                  style: GoogleFonts.aBeeZee(
                      textStyle: TextStyle(fontSize: size.height * 0.03)),
                ),
                SizedBox(
                  height: size.height * 0.015,
                ),
                Container(
                  height: size.height * 0.3,
                  width: size.width * 0.93,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(size.height * 0.02),
                    color: Colors.black,
                  ),
                  child: Column(
                    children: [
                      Container(
                        height: size.height * 0.15,
                        width: size.width * 0.93,
                        child: Center(
                          child: Text(
                            "Your Available Balance\n"
                            "₹60,000",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.aBeeZee(
                                textStyle: TextStyle(
                              fontSize: size.height * 0.03,
                              color: Colors.white,
                            )),
                          ),
                        ),
                        decoration: BoxDecoration(
                          borderRadius:
                              BorderRadius.circular(size.height * 0.02),
                          color: Colors.blueAccent.shade100,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: size.width * 0.035),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Card(
                              color: Colors.transparent,
                              child: Column(
                                children: [
                                  Image(
                                    image: AssetImage(
                                        "assets/Pictures/icons8-transfer-50 (1).png"),
                                    width: size.width * 0.09,
                                  ),
                                  Text(
                                    "Transfer",
                                    style: GoogleFonts.aBeeZee(
                                        textStyle: TextStyle(
                                            fontSize: size.height * 0.02,
                                            color: Colors.white)),
                                  ),
                                ],
                              ),
                            ),
                            Card(
                              color: Colors.transparent,
                              child: Column(
                                children: [
                                  Icon(Icons.history_rounded,
                                      size: size.height * 0.05,
                                      color: Colors.white),
                                  Text(
                                    "History",
                                    style: GoogleFonts.aBeeZee(
                                        textStyle: TextStyle(
                                            fontSize: size.height * 0.02,
                                            color: Colors.white)),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                ),
                SizedBox(
                  height: size.height * 0.015,
                ),
                Text(
                  "Transactions",
                  style: GoogleFonts.aBeeZee(
                    textStyle: TextStyle(fontSize: size.height * 0.03),
                  ),
                ),
                Container(
                    height: size.height * 0.44,
                    child: TransactionsList()
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class TransactionsList extends StatelessWidget {
  TransactionsList({
    super.key,
  });

  List<String> Words = [
    "Transportation",
    "Bills % Utilities",
    "Electricity",
    "Transportaion"
  ];
  List<String> Price = ["₹10,000", "₹10,000", "₹9,000", "₹10,000"];
  List<String> Imagee = [
    "assets/Pictures/icons8-bus-50.png",
    "assets/Pictures/icons8-bill-50.png",
    "assets/Pictures/icons8-electricity-64 (1).png",
    "assets/Pictures/icons8-bus-50.png"
  ];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return ListView.separated(
        separatorBuilder: (BuildContext context, int index) {
          return Divider(
            color: Colors.grey, // Customize the divider color
            thickness: 1.0, // Set the thickness of the divider
          );
        },
        itemCount: 4,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(Words[index]),
            subtitle: Text("14/03/2023-8:09am"),
            leading: Image(
              image: AssetImage(
                Imagee[index],
              ),
              width: size.width * 0.08,
            ),
            trailing: Column(
              children: [
                Text(
                  Price[index],
                  style: GoogleFonts.aBeeZee(
                    textStyle: TextStyle(
                        fontSize: size.height * 0.027,
                        color: Colors.red,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                Text(
                  "Debit",
                  style: GoogleFonts.aBeeZee(
                    textStyle: TextStyle(
                      fontSize: size.height * 0.019,
                      //color: Colors.red
                    ),
                  ),
                )
              ],
            ),
          );
        });
  }
}
