import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Result extends StatefulWidget {
  const Result({super.key});

  @override
  State<Result> createState() => _ResultState();
}

class _ResultState extends State<Result> {
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color.fromRGBO(103,135,214, 1),
      extendBody: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon: const Icon(Icons.arrow_back_ios,color: Colors.white,)),
        title: AutoSizeText(
            "Class 2nd (2023-2024)",
          style: GoogleFonts.openSans(
            fontSize: 20,
            fontWeight: FontWeight.w500,
            color: Colors.white
          ),
        ),
      ),
      body: Container(
        color: Colors.transparent,
        child: Column(
          children: [
            SizedBox(
                height:size.height*0.03
            ),
            Expanded(
              child: Container(
                  width:size.width,
                  decoration:BoxDecoration(
                    borderRadius: BorderRadius.only(topLeft: Radius.circular(size.width*0.08),topRight: Radius.circular(size.width*0.08)),
                    color:Colors.white,
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(size.height*0.02),
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Card(
                                elevation: 5,
                                shape: const CircleBorder(eccentricity: 1),
                                child: CircleAvatar(
                                  radius: size.width*0.1,
                                  backgroundImage: AssetImage("assets/logo.jpg"),

                                ),
                              ),
                              SizedBox(
                                width: size.width*0.03,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  AutoSizeText(
                                      "Metaphile Public School",
                                    style: GoogleFonts.openSans(
                                      color: const Color.fromRGBO(103,135,214, 1),
                                      fontSize: 22,
                                      fontWeight: FontWeight.w500
                                    ),
                                  ),
                                  AutoSizeText(
                                    "O-block, Ganga nagar",
                                    style: GoogleFonts.openSans(
                                        color: Colors.grey.shade600,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                  AutoSizeText(
                                    "Meerut-250001",
                                    style: GoogleFonts.openSans(
                                        color: Colors.grey.shade600,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          const Divider(
                            color: Color.fromRGBO(103,135,214, 1),
                            height: 2,
                            endIndent: 0,
                            indent: 0,
                            thickness: 3,

                          ),
                          Center(
                            child: AutoSizeText(
                              "Performance Profile",
                              style: GoogleFonts.openSans(
                                  color: const Color.fromRGBO(3,46,102, 1),
                                  fontSize: 27,
                                  fontWeight: FontWeight.w500
                              ),
                            ),
                          ),
                          const Divider(
                            color: Color.fromRGBO(103,135,214, 1),
                            height: 2,
                            endIndent: 0,
                            indent: 0,
                            thickness: 3,

                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.02,
                              ),
                              Card(
                                elevation: 5,
                                shape: const CircleBorder(eccentricity: 1),
                                child: CircleAvatar(
                                  radius: size.width*0.07,
                                  backgroundImage: const AssetImage("assets/profileLogo.png"),

                                ),
                              ),
                              SizedBox(
                                width: size.width*0.05,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  AutoSizeText(
                                    "Mehika Tegwal",
                                    style: GoogleFonts.openSans(
                                        color: Colors.black,
                                        fontSize: 22,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                  AutoSizeText(
                                    "Class 2nd A",
                                    style: GoogleFonts.openSans(
                                        color: Colors.grey.shade600,
                                        fontSize: 16,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.03,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Roll Number",
                                style: GoogleFonts.openSans(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.28,
                              ),
                              AutoSizeText(
                                "51",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                  color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Divider(
                            color: Colors.grey.shade400,
                            height: 1,
                            endIndent: 0,
                            indent: 0,
                            thickness: 1,
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Class ",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.42,
                              ),
                              AutoSizeText(
                                "2nd",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Divider(
                            color: Colors.grey.shade400,
                            height: 1,
                            endIndent: 0,
                            indent: 0,
                            thickness: 1,
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Date of Birth",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.27,
                              ),
                              AutoSizeText(
                                "27 Aug 2000",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Divider(
                            color: Colors.grey.shade400,
                            height: 1,
                            endIndent: 0,
                            indent: 0,
                            thickness: 1,
                          ),

                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Blood Group",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.28,
                              ),
                              AutoSizeText(
                                "B+",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Divider(
                            color: Colors.grey.shade400,
                            height: 1,
                            endIndent: 0,
                            indent: 0,
                            thickness: 1,
                          ),

                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Contact Number",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.2,
                              ),
                              AutoSizeText(
                                "+91 897902XXXX",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Divider(
                            color: Colors.grey.shade400,
                            height: 1,
                            endIndent: 0,
                            indent: 0,
                            thickness: 1,
                          ),

                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Father's Name",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.24,
                              ),
                              AutoSizeText(
                                "Mr. Kapil Tegwal",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Divider(
                            color: Colors.grey.shade400,
                            height: 1,
                            endIndent: 0,
                            indent: 0,
                            thickness: 1,
                          ),

                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            children: [
                              SizedBox(
                                width: size.width*0.01,
                              ),
                              AutoSizeText(
                                "Mother's Name",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17
                                ),
                              ),
                              SizedBox(
                                width: size.width*0.23,
                              ),
                              AutoSizeText(
                                "Mrs. Mukul Morya",
                                style: GoogleFonts.openSans(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 17,
                                    color: Colors.grey.shade700
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),

                          SizedBox(
                            height: size.height*0.02,
                          ),
                          const Divider(
                            color: Color.fromRGBO(103,135,214, 1),
                            height: 2,
                            endIndent: 0,
                            indent: 0,
                            thickness: 3,

                          ),
                          Center(
                            child: AutoSizeText(
                              "Attendance",
                              style: GoogleFonts.openSans(
                                  color: const Color.fromRGBO(3,46,102, 1),
                                  fontSize: 27,
                                  fontWeight: FontWeight.w500
                              ),
                            ),
                          ),
                          const Divider(
                            color: Color.fromRGBO(103,135,214, 1),
                            height: 2,
                            endIndent: 0,
                            indent: 0,
                            thickness: 3,

                          ),

                          SizedBox(
                            height: size.height*0.01,
                          ),
                          AutoSizeText(
                            "Term I",
                            style: GoogleFonts.openSans(
                                color: Colors.black,
                                fontSize: 22,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                          Card(
                            color: Colors.greenAccent.shade100,
                            child: SizedBox(
                              height: size.height*0.08,
                              width: size.width,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  AutoSizeText(
                                    "235/249 Days",
                                    style: GoogleFonts.openSans(
                                        color: Colors.green.shade900,
                                        fontSize: 22,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                  AutoSizeText(
                                    "Total attendance of the students",
                                    style: GoogleFonts.openSans(
                                        color: Colors.green.shade900,
                                        fontSize: 18,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),

                          SizedBox(
                            height: size.height*0.01,
                          ),
                          AutoSizeText(
                            "Term II",
                            style: GoogleFonts.openSans(
                                color: Colors.black,
                                fontSize: 22,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                          Card(
                            color: Colors.greenAccent.shade100,
                            child: SizedBox(
                              height: size.height*0.08,
                              width: size.width,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  AutoSizeText(
                                    "235/249 Days",
                                    style: GoogleFonts.openSans(
                                        color: Colors.green.shade900,
                                        fontSize: 22,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                  AutoSizeText(
                                    "Total attendance of the students",
                                    style: GoogleFonts.openSans(
                                        color: Colors.green.shade900,
                                        fontSize: 18,
                                        fontWeight: FontWeight.w500
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),

                          SizedBox(
                            height: size.height*0.02,
                          ),
                          const Divider(
                            color: Color.fromRGBO(103,135,214, 1),
                            height: 2,
                            endIndent: 0,
                            indent: 0,
                            thickness: 3,

                          ),
                          Center(
                            child: AutoSizeText(
                              "Academic Performance",
                              style: GoogleFonts.openSans(
                                  color: const Color.fromRGBO(3,46,102, 1),
                                  fontSize: 25,
                                  fontWeight: FontWeight.w500
                              ),
                            ),
                          ),
                          const Divider(
                            color: Color.fromRGBO(103,135,214, 1),
                            height: 2,
                            endIndent: 0,
                            indent: 0,
                            thickness: 3,

                          ),
                        ],
                      ),
                    ),
                  )
              ),
            ),
          ],
        ),
      ),
    );
  }
}
