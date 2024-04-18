import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
class ExManageScreen extends StatelessWidget {
  const ExManageScreen({super.key});

  @override
  Widget build(BuildContext context) {

    Size size=MediaQuery.of(context).size;
    return Scaffold(
      //appBar: AppBar(backgroundColor: Colors.transparent,),
      body: Column(
        children: [
          Padding(
            padding:  EdgeInsets.all(size.height*0.025),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: size.height*0.08,),
                Text("Expense Management",
                  style: GoogleFonts.aBeeZee(
                    textStyle:TextStyle(
                      fontSize: size.height*0.03
                    )
                  ),
                ),
                SizedBox(height: size.height*0.015,),
                Container(
                  height: size.height*0.3,
                  width: size.width*0.93,

                  decoration: BoxDecoration(
                    borderRadius:BorderRadius.circular(size.height*0.02),
                    color: Colors.black,
                  ),
                  child: Column(
                    children: [
                      Container(
                        height: size.height*0.15,
                        width: size.width*0.93,
                        child:  Center(
                          child: Text("Your Available Balance\n"
                              "₹60,000",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.aBeeZee(
                                textStyle:TextStyle(
                                    fontSize: size.height*0.03,
                                  color: Colors.white,
                                )
                            ),
                          ),
                        ),
                        decoration: BoxDecoration(
                          borderRadius:BorderRadius.circular(size.height*0.02),
                          color: Colors.blueAccent.shade100,
                        ),
                      ),
                      Padding(
                        padding:  EdgeInsets.only(top:size.width*0.035),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,

                          children: [
                            Card(
                              color: Colors.transparent,
                              child: Column(
                                children: [
                                  Image(image: AssetImage("assets/Pictures/icons8-transfer-50 (1).png"),
                                    width: size.width*0.09,
                                  ),
                                  Text("Transfer",
                                    style: GoogleFonts.aBeeZee(
                                        textStyle:TextStyle(
                                            fontSize: size.height*0.02,
                                            color: Colors.white
                                        )
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Card(
                              color: Colors.transparent,
                              child: Column(
                                children: [
                                  Icon(
                                    Icons.history_rounded,
                                    size: size.height*0.05,
                                      color: Colors.white

                                  ),
                                  Text("History",
                                    style: GoogleFonts.aBeeZee(
                                        textStyle:TextStyle(
                                            fontSize: size.height*0.02,
                                          color: Colors.white
                                        )
                                    ),
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
                SizedBox(height: size.height*0.015,),
                Text("Payment List",
                  style: GoogleFonts.aBeeZee(
                      textStyle:TextStyle(
                          fontSize: size.height*0.03
                      ),
                  ),
                ),
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              PaymentListCard(name: "Internet",
                  bingo: "assets/Pictures/icons8-electricity-64 (1).png"),
              PaymentListCard(name: "electricity",
                  bingo: "assets/Pictures/icons8-transfer-40 (1).png"),
              PaymentListCard(name: "electricity",
                  bingo: "assets/Pictures/icons8-bus-50.png"),
            ],
          ),
          SizedBox(height: size.height*0.015,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              PaymentListCard(name: "Insurance",
                  bingo: "assets/Pictures/icons8-first-aid-50.png"),
              PaymentListCard(name: "Furniture",
                  bingo: "assets/Pictures/icons8-furniture-50.png"),
              PaymentListCard(name: "Holidays",
                  bingo: "assets/Pictures/icons8-pay-date-50 (1).png"),
            ],
          ),
          SizedBox(height: size.height*0.015,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              PaymentListCard(name: "Events",
                  bingo: "assets/Pictures/icons8-event-50.png"),
              PaymentListCard(name: "Bills & Utilities",
                  bingo: "assets/Pictures/icons8-bill-50.png"),
              Container(
                height: size.height*0.12,
                width: size.width*0.25,
              )
            ],
          ),
        ],
      ),
    );
  }
}


class PaymentListCard extends StatelessWidget {
  final String name;
  final String bingo;

  PaymentListCard({required this.name, required this.bingo});

  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Container(
      height: size.height*0.12,
      width: size.width*0.25,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(size.height*0.01)
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image(image:AssetImage(bingo),
          height: size.height*0.06,) ,// Adjust icon color
          SizedBox(height:size.height*0.01),
          Text(
            name,
            style: GoogleFonts.aBeeZee(
                textStyle:TextStyle(
                    fontSize: size.height*0.016,
                    fontWeight: FontWeight.bold,
                    color: Colors.black
                )
            ),
          ),
        ],
      ),
    );
  }
}

