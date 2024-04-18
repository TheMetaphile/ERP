import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Statistics extends StatefulWidget {
  const Statistics({super.key});

  @override
  State<Statistics> createState() => _StatisticsState();
}

class _StatisticsState extends State<Statistics> {
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            //SizedBox(height: size.height*0.07,),
            Text("Statics",
              style: GoogleFonts.aBeeZee(
                  textStyle: TextStyle(fontSize: size.height * 0.03)),
            ),
            SizedBox(height: size.height*0.01,),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Text("Day",
                  style: GoogleFonts.aBeeZee(
                      textStyle: 
                      TextStyle(
                        fontWeight: FontWeight.bold,
                          fontSize: size.height * 0.02)),
                ),
                Text("Week",
                  style: GoogleFonts.aBeeZee(
                      textStyle:
                      TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: size.height * 0.02)),
                ),
                Text("Month",
                  style: GoogleFonts.aBeeZee(
                      textStyle:
                      TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: size.height * 0.02)),
                ),
                Text("Year",
                  style: GoogleFonts.aBeeZee(
                      textStyle:
                      TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: size.height * 0.02)),
                ),
              ],
            ),
            Padding(
              padding: EdgeInsets.only(left: size.width*0.04,right:size.width*0.04),
              child: Divider(color: Colors.grey,
              ),
            ),
            Center(child: Text("01-08 Feb,2024",
              style: GoogleFonts.aBeeZee(
                  textStyle: TextStyle(fontSize: size.height * 0.018)),)),
            Container(
              height: size.height*0.245,
              width: size.width,
              child: Image(
                fit: BoxFit.cover,
                image:
              AssetImage("assets/Pictures/WhatsApp Image 2024-04-06 at 08.45.53_0235f647.png"),),
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
            //SizedBox(height: size.height*0.02,),
            Container(
                height: size.height * 0.3,
                child: TransactionsList()
            ),
        
          ],
        ),
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