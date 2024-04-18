import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class EventPage extends StatefulWidget {
  const EventPage({super.key});

  @override
  State<EventPage> createState() => _EventPageState();
}

class _EventPageState extends State<EventPage> {
  List image1=["assets/images/img_1.png","assets/images/img_2.png","assets/images/img_3.png"];
  List image2=["assets/images/img_4.png","assets/images/img_5.png","assets/images/img_1.png"];
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
                        child: AutoSizeText("Event",

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
            Container(
              height: size.height*0.85,

              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(topLeft: Radius.circular(size.height*0.04),topRight: Radius.circular(size.height*0.04))

              ),
              child :   Column(
                children: [
                  SizedBox(
                  height: size.height*0.5,

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
                              Padding(
                                padding:  EdgeInsets.only(left: size.width*0.03,top: size.height*0.01),
                                child: AutoSizeText("Sleep Over night ",

                                  style: GoogleFonts.openSans(
                                      color: Colors.black87,
                                      fontSize: size.height*0.02,
                                      fontWeight: FontWeight.w600
                                  ),
                                ),
                              ),
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding:  EdgeInsets.only(top: size.height*0.01,left: size.width*0.03),
                                    child: Container(
                                        height: size.height*0.08,
                                        width: size.width*0.18,
                                        decoration: const BoxDecoration(

                                          color:   Color.fromRGBO(51, 84, 168, 1),
                                          borderRadius: BorderRadius.all(Radius.circular(10))
                                        ),
                                        child: Image.asset("assets/images/img_6.png",fit: BoxFit.fill)),
                                  ),
                                  SizedBox(
                                    width: size.width*0.03,
                                  ),

                                  Column(

                                    children: [
                                      Padding(
                                        padding:  EdgeInsets.only(top: size.width*0.03),
                                        child: AutoSizeText("6 jan 21, 9:30 am                        ",

                                          style: GoogleFonts.openSans(
                                              color:   const Color.fromRGBO(51, 84, 168, 1),
                                              fontSize: size.height*0.01,
                                              fontWeight: FontWeight.w500
                                          ),
                                        ),
                                      ),
                                      AutoSizeText("A Sleeper is a good treat for kid",

                                        style: GoogleFonts.openSans(
                                            color:    Colors.grey.shade800,
                                            fontSize: size.height*0.01,
                                            fontWeight: FontWeight.w500
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),


                            ],

                          ),

                        ),
                      );
                    },),
            ),
                  Container(
                      height: size.height*0.3,
                      width: size.width*0.8,
                      decoration: const BoxDecoration(

                          color:   Colors.white,
                          borderRadius: BorderRadius.all(Radius.circular(10))
                      ),
                      child: Image.asset("assets/images/img_7.png",fit: BoxFit.fill)),
                ],
              ),
            ),



          ],

        ),
      ),
    );
  }
}
