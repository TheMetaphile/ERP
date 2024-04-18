import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/AandP/englishhomework.dart';

class HomeWork extends StatefulWidget {
  const HomeWork({super.key});

  @override
  State<HomeWork> createState() => _HomeWorkState();
}

class _HomeWorkState extends State<HomeWork> {
  List image1=["assets/alphabets/Vector.png","assets/alphabets/Math.png","assets/alphabets/Earth Globe.png"];
  List image2=["assets/alphabets/Brick.png","assets/alphabets/Round Bottom Flask.png","assets/img_1.png"];
  List name1=["Hindi I","Math","Social Study"];
  List name2=["English","Science","Hindi II"];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor:  const Color.fromRGBO(108, 137, 204, 1),
      body: Column(
        children: [

          SizedBox(
              height: size.height*0.18,
              width: size.width*0.55,
              child: Image.asset("assets/classwork.gif",fit: BoxFit.contain)),

          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.only(left: 20, bottom: 5),
              child: AutoSizeText("Home Work",

                style: GoogleFonts.openSans(
                    color: Colors.white,
                    fontSize: size.height*0.03,
                    fontWeight: FontWeight.w500
                ),
                textAlign: TextAlign.left,
              ),
            ),
          ),
          Container(

            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(topLeft: Radius.circular(size.height*0.04),topRight: Radius.circular(size.height*0.04))
            ),
            child: Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Row(
                children: [
                  SizedBox(
                    height: size.height*0.59,
                    width: size.width*0.5,
                    child: ListView.builder(
                      itemCount: 3,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03,bottom: size.height*0.01),
                          child: Card(
                            color: Colors.white,
                            elevation: 5,
                            child: InkWell(
                              onTap: (){
                                Navigator.push(context, MaterialPageRoute(builder: (context) {
                                  return EnglishHomeWork(subject: name1[index],);
                                },));
                              },
                              child: Column(
                                children: [
                                  Padding(
                                    padding:  EdgeInsets.only(top: size.height*0.03),
                                    child: SizedBox(
                                        height: size.height*0.08,
                                        width: size.width*0.18,
                                        child: Image.asset(image1[index],fit: BoxFit.fill)),
                                  ),
                                  SizedBox(
                                    height: size.height*0.01,
                                  ),
                                  AutoSizeText(name1[index],

                                    style: GoogleFonts.openSans(
                                        color: Colors.black87,
                                        fontSize: size.width*0.05,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),

                                  SizedBox(
                                    height: size.height*0.01,
                                  ),
                                ],

                              ),
                            ),

                          ),
                        );
                      },),
                  ),

                  SizedBox(
                    height: size.height*0.59,
                    width: size.width*0.5,
                    child: ListView.builder(
                      itemCount: 3,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding:EdgeInsets.only(left: size.width*0.03,right: size.width*0.03,bottom: size.height*0.01),
                          child: Card(
                            color: Colors.white,
                            shadowColor: Colors.grey,
                            elevation: 5,
                            child: InkWell(
                              onTap: (){
                                Navigator.push(context, MaterialPageRoute(builder: (context) {
                                  return EnglishHomeWork(subject: name2[index],);
                                },));
                              },
                              child: Column(
                                children: [
                                  Padding(
                                    padding:  EdgeInsets.only(top: size.height*0.03),
                                    child: SizedBox(
                                        height: size.height*0.08,
                                        width: size.width*0.18,
                                        child: Image.asset(image2[index],fit: BoxFit.fill)),
                                  ),
                                  SizedBox(
                                    height: size.height*0.01,
                                  ),
                                  AutoSizeText(name2[index],

                                    style: GoogleFonts.openSans(
                                        color: Colors.black87,
                                        fontSize: size.width*0.05,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),

                                  SizedBox(
                                    height: size.height*0.01,
                                  ),
                                ],

                              ),
                            ),

                          ),
                        );
                      },),
                  ),
                ],
              ),
            ),
          )
        ],

      ),
    );
  }
}
