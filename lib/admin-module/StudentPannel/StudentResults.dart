import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../teacher-module/result.dart';
import '../admin Utils/adminStudentAttendanceTile.dart';
import '../admin Utils/adminStudentResultTile.dart';


class StudentResults extends StatefulWidget {
  const StudentResults({super.key});

  @override
  State<StudentResults> createState() => _StudentResultsState();
}

class _StudentResultsState extends State<StudentResults>  with TickerProviderStateMixin{
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
  var _flag1 = false;
  var _flag2 = false;

  void listener1() {
    if (_flag2) return;
    _flag1 = true;
    scrollController2.jumpTo(scrollController1.offset);
    _flag1 = false;
  }

  void listener2() {
    if (_flag1) return;
    _flag2 = true;
    scrollController1.jumpTo(scrollController2.offset);
    _flag2=false;
  }
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    pageController = PageController(initialPage: 0);
  }
  bool term1Selected = false;
  bool term2Selected = false;
  bool term3Selected = false;
  bool finalSelected = false;
  PageController pageController = PageController();




  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        backgroundColor: Colors.transparent,
        title: Text(
          "Student Result",
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w400,
            fontSize: size.width * 0.06,
          ),
        ),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(height: size.height*0.037,),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    TextButton(
                      onPressed: () {
                        setState(() {
                          term1Selected = true;
                          term2Selected = false;
                          term3Selected = false;
                          finalSelected = false;
                        });
                      },
                      style: TextButton.styleFrom(
                        backgroundColor: term1Selected ? Colors.blue : Colors.white,
                        shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: Text(
                        "Term I",
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.w400,
                          fontSize: size.width * 0.035,
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        setState(() {
                          term1Selected = false;
                          term2Selected = true;
                          term3Selected = false;
                          finalSelected = false;
                        });
                      },
                      style: TextButton.styleFrom(
                        backgroundColor: term2Selected ? Colors.blue : Colors.white,
                        shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: Text(
                        "Term II",
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.w400,
                          fontSize: size.width * 0.035,
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        setState(() {
                          term3Selected = true;
                          term1Selected = false;
                          term2Selected = false;
                          finalSelected = false;
                        });
                      },
                      style: TextButton.styleFrom(
                        backgroundColor: term3Selected ? Colors.blue : Colors.white,
                        shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: Text(
                        "Term III",
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.w400,
                          fontSize: size.width * 0.035,
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        setState(() {
                          term1Selected = false;
                          term2Selected = false;
                          term3Selected = false;
                          finalSelected = true;
                        });
                      },
                      style: TextButton.styleFrom(
                        backgroundColor: finalSelected ? Colors.blue : Colors.white,
                        shape: RoundedRectangleBorder(
                          side: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: Text(
                        "Final",
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.w400,
                          fontSize: size.width * 0.035,
                        ),
                      ),
                    ),
                  ],
                ),

                Container(
                  height: size.height * 0.08,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                          topRight: Radius.circular(25),
                          topLeft: Radius.circular(25)
                      ),
                    color: Color(0xFFE9F0FF),
                  ),
                  padding: EdgeInsets.symmetric(horizontal: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SizedBox(
                        width: size.width * 0.2,
                        child: Text(
                          "Name",
                          textAlign: TextAlign.start,
                          overflow: TextOverflow.ellipsis,
                          style: GoogleFonts.openSans(
                            fontSize: size.width * 0.05,
                            color: Colors.black,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ),
                      SizedBox(
                        width: size.width * 0.2,
                        child: Text(
                          "Term",
                          textAlign: TextAlign.start,
                          overflow: TextOverflow.ellipsis,
                          style: GoogleFonts.openSans(
                            fontSize: size.width * 0.05,
                            color: Colors.black,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ),
                      SizedBox(
                        width: size.width * 0.3,
                        child: Text(
                          "Marks",
                          textAlign: TextAlign.start,
                          overflow: TextOverflow.ellipsis,
                          style: GoogleFonts.openSans(
                            fontSize: size.width * 0.05,
                            color: Colors.black,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  height: size.height*0.72,
                  child: Card(
                    color: Colors.white,
                    margin: const EdgeInsets.all(0),
                    shape: const OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.white),

                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: PageView(
                            controller: pageController,
                            scrollDirection: Axis.horizontal,
                            children: [
                              ListView.builder(
                              itemCount: 15,
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return InkWell(
                                    onTap: () =>  Navigator.push(context, MaterialPageRoute(builder: (context) => Result(),)),

                                    child: AdminStudentReseultTile(name: 'Ankit', term: 'Ist ', marks: '156/240',));
                              },
                            ),
                              ListView.builder(
                                itemCount: 10,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) {
                                  return InkWell(
                                      onTap: () =>  Navigator.push(context, MaterialPageRoute(builder: (context) => Result(),)),

                                      child: AdminStudentReseultTile(name: 'Abhishek', term: 'Ist ', marks: '16/240',));
                                },
                              ),
                              ListView.builder(
                                itemCount: 8,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) {
                                  return InkWell(
                                      onTap: () =>  Navigator.push(context, MaterialPageRoute(builder: (context) => Result(),)),
                                      child: AdminStudentReseultTile(name: 'Bhanu', term: 'Ist ', marks: '200/240',));
                                },
                              ),
                            ],
                          ),
                        ),
                     Row(
                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
                       children: [
                         TextButton(
                           onPressed: () {
                             if (pageController.page != null &&
                                 pageController.page! >  0) {

                               pageController.previousPage(
                                 duration: Duration(milliseconds: 300),
                                 curve: Curves.easeInOut,
                               );
                             }
                           },
                           child: Icon(Icons.arrow_back,color: Colors.black,),),

                         TextButton(
                             onPressed: () {
                               if (pageController.page != null &&
                                   pageController.page! <  2) {

                                 pageController.nextPage(
                                   duration: Duration(milliseconds: 300),
                                   curve: Curves.easeInOut,
                                 );
                               }
                             },
                             child: Icon(Icons.arrow_forward,color: Colors.black,)),

                       ],
                     )

                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.1,
          ),
          Card(
            color: Colors.white,
            elevation: 0,
            margin: const EdgeInsets.all(0),
            shape: const OutlineInputBorder(
                borderSide: BorderSide(
                    color: Colors.white
                ),
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25)
                )
            ),
            child: SizedBox(
              height: size.height * 3,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height * 1,
          )
        ],
      ),
    );
  }
}
