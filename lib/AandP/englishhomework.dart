import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class EnglishHomeWork extends StatefulWidget {
  const EnglishHomeWork({super.key, required this.subject});
  final String subject;
  @override
  State<EnglishHomeWork> createState() => _EnglishHomeWorkState();
}

class _EnglishHomeWorkState extends State<EnglishHomeWork> {
  List name=["To be summited tomorrow","Not summited","Summited"];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
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

            SizedBox(
              height: size.height*0.43,
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
                    height: size.height*0.05,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      IconButton(onPressed: (){
                        Navigator.pop(context);
                      }, icon: const Icon(Icons.arrow_back_ios,color: Colors.white,)),

                    ],
                  ),
                  Padding(
                    padding:EdgeInsets.only(left: size.width*0.2,bottom: size.height*0.01),
                    child:
                    Container(
                        height: size.height*0.25,
                        width: size.width*0.6,
                        child: Image.asset("assets/classwork.gif",fit: BoxFit.fill)),
                  ),

                  Padding(
                    padding:EdgeInsets.only(left: size.width*0.05),
                    child: AutoSizeText("${widget.subject} HomeWork",

                      style: GoogleFonts.openSans(
                          color: Colors.white,
                          fontSize: size.height*0.03,
                          fontWeight: FontWeight.w500
                      ),
                    ),
                  )

                ],
              ),
            ),
            Container(
              height: size.height*0.57,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(topLeft: Radius.circular(size.height*0.04),topRight: Radius.circular(size.height*0.04))

              ),
              child: ListView.builder(
                itemCount: 3,
                padding: EdgeInsets.only(top: size.height*0.03),

                itemBuilder: (context, index) {
                  return Padding(
                    padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03),
                    child: Card(
                      color: Colors.white,
                      elevation: 10,
                      child: SizedBox(
                        child: Padding(
                          padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                height: size.height*0.008,
                              ),
                              SizedBox(
                                  height: size.height*0.03,
                                  child: ElevatedButton(onPressed: (){}, child: AutoSizeText(widget.subject))),
                              SizedBox(
                                height: size.height*0.01,
                              ),
                              AutoSizeText("Today Work",

                                style: GoogleFonts.aBeeZee(
                                    color: Colors.grey.shade800,
                                    fontSize: size.height*0.016,
                                    fontWeight: FontWeight.w500
                                ),),
                              SizedBox(
                                height: size.height*0.01,
                              ),
                              AutoSizeText("Sentence Making",

                                style: GoogleFonts.aBeeZee(
                                    color: Colors.black87,
                                    fontSize: size.height*0.016,
                                    fontWeight: FontWeight.w500
                                ),),
                              SizedBox(
                                height: size.height*0.02,
                              ),
                              SizedBox(
                                  height: size.height*0.04,
                                  width: size.width*1,
                                  child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                          backgroundColor:  const Color.fromRGBO(51, 84, 168, 1),
                                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(size.height*0.01)))
                                      ),
                                      onPressed: (){}, child: AutoSizeText(name[index],style: TextStyle(color: Colors.white,fontWeight: FontWeight.w500,fontSize: size.height*0.023),))),
                              SizedBox(
                                height: size.height*0.018,
                              ),                               ],
                          ),
                        ),
                      ),

                    ),
                  );
                },),
            )
          ],

        ),
      ),
    );
  }
}
