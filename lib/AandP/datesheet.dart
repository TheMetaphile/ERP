import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TimeTable extends StatefulWidget {
  const TimeTable({super.key});

  @override
  State<TimeTable> createState() => _TimeTableState();
}

class _TimeTableState extends State<TimeTable> {
  List image1=["assets/img_1.png","assets/img_2.png","assets/img_3.png"];
  List image2=["assets/img_4.png","assets/img_5.png","assets/img_1.png"];
  List name1=["Hindi I","Math","SocialStudy"];
  List name2=["English","Science","Hindi II"];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
        height: size.height*1,
        width: size.width,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
              colors: [

                Color.fromRGBO(51, 84, 168, 1),
                Color.fromRGBO(51, 84, 167, 1),




              ]
          ),
        ),
        child: Column(
          children: [

            Container(
              height: size.height*0.15,
              // decoration: const BoxDecoration(
              //   gradient: LinearGradient(
              //     colors: [
              //
              //       Color.fromRGBO(51, 84, 168, 1),
              //       Color.fromRGBO(51, 84, 167, 1),
              //
              //
              //
              //
              //     ]
              //   ),
              // ),
              child:Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: size.height*0.06,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      IconButton(onPressed: (){}, icon: const Icon(Icons.arrow_back_ios,color: Colors.white,),


                      ),
                      Padding(
                        padding:EdgeInsets.only(left: size.width*0.05),
                        child: AutoSizeText("Time Table",

                          style: GoogleFonts.openSans(
                              color: Colors.white,
                              fontSize: size.height*0.03,
                              fontWeight: FontWeight.w500
                          ),
                        ),
                      )

                    ],

                  ),




                ],
              ),
            ),
            SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Container(
                height: size.height*0.85,

                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(topLeft: Radius.circular(size.height*0.04),topRight: Radius.circular(size.height*0.04))

                ),
                child :   Column(
                  children: [
                    SizedBox(
                      height: size.height*0.42,

                      child: ListView.builder(
                        itemCount: 3,
                        padding: EdgeInsets.only(top: size.height*0.03),
                        physics: const NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return Padding(
                            padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03,bottom: size.height*0.01),
                            child: Card(
                              color: Colors.white,
                              elevation: 50,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [


                                  SizedBox(
                                    width: size.width*0.03,
                                  ),

                                  Padding(
                                    padding: EdgeInsets.only(left: size.width*0.03),
                                    child: Column(
                                       crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding:  EdgeInsets.only(top: size.width*0.03),
                                          child: AutoSizeText("Computer Science                        ",

                                            style: GoogleFonts.openSans(
                                                color:   Colors.black,
                                                fontSize: size.height*0.015,
                                                fontWeight: FontWeight.w500
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding:  EdgeInsets.only(top: size.width*0.01),
                                          child: AutoSizeText("8:15 am To 9:00 am                       ",

                                            style: GoogleFonts.openSans(
                                                color:   Colors.grey.shade800,
                                                fontSize: size.height*0.01,
                                                fontWeight: FontWeight.w500
                                            ),
                                          ),
                                        ),
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                                            AutoSizeText("cheris jemes",

                                              style: GoogleFonts.openSans(
                                                  color:    Colors.grey.shade800,
                                                  fontSize: size.height*0.01,
                                                  fontWeight: FontWeight.w500
                                              ),
                                            ),
                                            Padding(
                                              padding:  EdgeInsets.only(right: size.height*0.04),
                                              child: AutoSizeText("Period !",

                                                style: GoogleFonts.openSans(
                                                    color:    Colors.grey.shade800,
                                                    fontSize: size.height*0.01,
                                                    fontWeight: FontWeight.w500
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        SizedBox(height: size.height*0.02,)
                                      ],
                                    ),
                                  ),


                                ],

                              ),

                            ),
                          );
                        },),
                    ),
                    SizedBox(
                      width: size.width,
                      child: Padding(
                        padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03,bottom: size.height*0.01),
                        child: Card(
                          color: Colors.white,
                          elevation: 50,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [


                              SizedBox(
                                width: size.width*0.03,
                              ),

                              Padding(
                                padding: EdgeInsets.only(left: size.width*0.03),
                                child: Row(
                                  children: [
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding:  EdgeInsets.only(top: size.width*0.03),
                                          child: AutoSizeText("Lunch Break" ,

                                            style: GoogleFonts.openSans(
                                                color:   Colors.black,
                                                fontSize: size.height*0.02,
                                                fontWeight: FontWeight.w500
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding:  EdgeInsets.only(top: size.width*0.01),
                                          child: AutoSizeText("1:15 pm To 2:00 pm                       ",

                                            style: GoogleFonts.openSans(
                                                color:   Colors.grey.shade800,
                                                fontSize: size.height*0.01,
                                                fontWeight: FontWeight.w500
                                            ),
                                          ),
                                        ),

                                        SizedBox(height: size.height*0.02,)
                                      ],
                                    ),
                                    SizedBox(
                                      width: size.width*0.2,
                                    ),
                                    Icon(Icons.emoji_food_beverage,size: size.height*0.05,color:   Color.fromRGBO(51, 84, 168, 1),)
                                  ],
                                ),
                              ),


                            ],

                          ),

                        ),
                      ),
                    ),
                    SizedBox(
                      height: size.height*0.3,

                      child: ListView.builder(
                        itemCount: 2,
                        padding: EdgeInsets.only(top: size.height*0.03),
                        physics: const NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return Padding(
                            padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03,bottom: size.height*0.01),
                            child: Card(
                              color: Colors.white,
                              elevation: 50,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [


                                  SizedBox(
                                    width: size.width*0.03,
                                  ),

                                  Padding(
                                    padding: EdgeInsets.only(left: size.width*0.03),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding:  EdgeInsets.only(top: size.width*0.03),
                                          child: AutoSizeText("Computer Science                        ",

                                            style: GoogleFonts.openSans(
                                                color:   Colors.black,
                                                fontSize: size.height*0.015,
                                                fontWeight: FontWeight.w500
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding:  EdgeInsets.only(top: size.width*0.01),
                                          child: AutoSizeText("8:15 am To 9:00 am                       ",

                                            style: GoogleFonts.openSans(
                                                color:   Colors.grey.shade800,
                                                fontSize: size.height*0.01,
                                                fontWeight: FontWeight.w500
                                            ),
                                          ),
                                        ),
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                                            AutoSizeText("cheris jemes",

                                              style: GoogleFonts.openSans(
                                                  color:    Colors.grey.shade800,
                                                  fontSize: size.height*0.01,
                                                  fontWeight: FontWeight.w500
                                              ),
                                            ),
                                            Padding(
                                              padding:  EdgeInsets.only(right: size.height*0.04),
                                              child: AutoSizeText("Period !",

                                                style: GoogleFonts.openSans(
                                                    color:    Colors.grey.shade800,
                                                    fontSize: size.height*0.01,
                                                    fontWeight: FontWeight.w500
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        SizedBox(height: size.height*0.02,)
                                      ],
                                    ),
                                  ),


                                ],

                              ),

                            ),
                          );
                        },),
                    ),

                  ],
                ),
              ),
            ),



          ],

        ),
      ),
    );
  }
}
