import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Budget extends StatefulWidget {
  const Budget({super.key});

  @override
  State<Budget> createState() => _BudgetState();
}

class _BudgetState extends State<Budget> {
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          Text("Budget",
            style: GoogleFonts.aBeeZee(
                textStyle: TextStyle(fontSize: size.height * 0.03)),
          ),
          SizedBox(height: size.height*0.01,),
          Center(
            child: Stack(
               children: [
                 Container(
                   height: size.height*0.24,
                   width:  size.width,
                   decoration: BoxDecoration(
                       shape: BoxShape.circle,
                       border: Border.all(
                           width: size.height*0.03,
                           color: Colors.grey
                       )
                   ),
                   //child: Text("No Budget"),
                 ),
                 Positioned(
                   top: size.height*0.1,
                     left: size.height*0.18,
                     child: Text("No Budget",
                       style: GoogleFonts.aBeeZee(
                         textStyle: TextStyle(
                             fontSize: size.height * 0.030)),),
                  )
               ],

            ),
          ),
          SizedBox(height: size.height*0.02,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                children: [
                  Text("Total Budget",
                    style: GoogleFonts.aBeeZee(
                        textStyle: TextStyle(
                            fontSize: size.height * 0.025,
                        fontWeight: FontWeight.bold)),
                  ),
                  Text("Not Set",
                    style: GoogleFonts.aBeeZee(
                        textStyle: TextStyle(fontSize: size.height * 0.02)),
                  ),
                ],
              ),
              Column(
                children: [
                  Text("Total Spent",
                    style: GoogleFonts.aBeeZee(
                        textStyle: TextStyle(
                            fontSize: size.height * 0.025,
                            fontWeight: FontWeight.bold)),
                  ),
                  Text("₹ 0.00",
                    style: GoogleFonts.aBeeZee(
                        textStyle: TextStyle(fontSize: size.height * 0.02)),
                  ),
                ],
              ),
            ],
          ),
          SizedBox(height: size.height*0.02,),
          Container(
            height: size.height*0.07,
            width: size.width*0.8,
            decoration: BoxDecoration(
              color: Colors.blueAccent.shade100,
              borderRadius: BorderRadius.circular(size.height * 0.015),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Set Budget',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: size.height*0.025
                  ),),
                SizedBox(width: size.width*0.03,),
                Icon(Icons.sticky_note_2_outlined,
                  color: Colors.white,
                size: size.height*0.04,)

              ],
            ),
          ),
          SizedBox(height: size.height*0.02,),
          Container(
              height: size.height * 0.35,
              child: TransactionsList()
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
    "Utilities",
    "Electricity",
  ];
  List<String> Price = ["₹0.00", "₹0.00", "₹0.00", "₹0.00"];
  List<String> Imagee = [
    "assets/Pictures/icons8-bus-50.png",
    "assets/Pictures/icons8-bill-50.png",
    "assets/Pictures/icons8-electricity-64 (1).png",
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
        itemCount: 3,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(Words[index]),
            subtitle: Container(
              height: size.height*0.008,
              width: size.width*0.99,
              color: Colors.grey,
            ),
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
                        fontSize: size.height * 0.024,
                        //color: Colors.red,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          );
        });
  }
}