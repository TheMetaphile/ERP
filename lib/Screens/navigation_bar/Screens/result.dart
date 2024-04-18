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
                                      fontSize: size.width*0.05,
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
                            thickness: 2,

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
                            thickness: 2,

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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "51",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                    color: Colors.grey.shade700
                                  ),
                                    maxLines: 1,
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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "2nd",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                      color: Colors.grey.shade700
                                  ),
                                  maxLines: 1,
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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "27 Aug 2000",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                      color: Colors.grey.shade700
                                  ),
                                  maxLines: 1,
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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "B+",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                      color: Colors.grey.shade700
                                  ),
                                  maxLines: 1,
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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "+91 897902XXXX",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                      color: Colors.grey.shade700
                                  ),
                                  maxLines: 1,
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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "Mr. Kapil Tegwal",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                      color: Colors.grey.shade700
                                  ),
                                  maxLines: 1,
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
                              SizedBox(
                                width: size.width*0.38,
                                child: AutoSizeText(
                                  "Mrs. Mukul Morya",
                                  style: GoogleFonts.openSans(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17,
                                      color: Colors.grey.shade700
                                  ),
                                  maxLines: 1,
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
                            thickness: 2,

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
                            thickness: 2,

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
                            thickness: 2,

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
                            thickness: 2,

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
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Card(
                            elevation: 5,
                            color: Colors.white,
                            shape: OutlineInputBorder(borderRadius: BorderRadius.circular(15),borderSide: BorderSide(color: Colors.white)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Container(
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      decoration: const BoxDecoration(
                                          color: Colors.white,
                                          borderRadius: BorderRadius.only(topLeft: Radius.circular(15))
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Subject",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: Colors.white,
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Hindi",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: Colors.white,
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "English",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: Colors.white,
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Maths",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: Colors.white,
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Science",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: Colors.white,
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Social Science",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      color: Colors.white,
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Drawing",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      decoration: const BoxDecoration(
                                          color: Colors.white,
                                          borderRadius: BorderRadius.only(bottomLeft: Radius.circular(15))
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.only(top: 12.0,left: 12),
                                        child: AutoSizeText(
                                          "Computer",
                                          style: GoogleFonts.openSans(
                                              color: Colors.black,
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500
                                          ),
                                          maxLines: 1,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      decoration: const BoxDecoration(
                                          color: Colors.white,
                                          borderRadius: BorderRadius.only(bottomLeft: Radius.circular(15))
                                      ),
                                    ),
                                  ]
                                ),
                                Row(
                                  children: [
                                    Column(
                                      children: [
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "Total Marks",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.white,
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "GPA",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.green,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w700
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Container(

                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.green,
                                              borderRadius: BorderRadius.only(topRight: Radius.circular(15))
                                          ),
                                          child: SizedBox(
                                            width: size.width*0.38,

                                            child: Padding(
                                              padding: const EdgeInsets.only(top: 10.0),
                                              child: AutoSizeText(
                                                "Obtained Marks",
                                                style: GoogleFonts.openSans(
                                                    color: Colors.black,
                                                    fontSize: 15,
                                                    fontWeight: FontWeight.w500
                                                ),
                                                maxLines: 1,
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "82 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "79 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "75 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),

                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "91 - A",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "75 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),

                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "79 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.green,
                                              borderRadius: BorderRadius.only(bottomRight: Radius.circular(15))
                                          ),
                                          child: Center(
                                            child: AutoSizeText(
                                              "95 - A",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.white,
                                              borderRadius: BorderRadius.only(bottomRight: Radius.circular(15))
                                          ),
                                          child: Center(
                                            child: AutoSizeText(
                                              "8.24",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.green,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w600
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
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
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Card(
                            elevation: 5,
                            color: Colors.white,
                            shape: OutlineInputBorder(borderRadius: BorderRadius.circular(15),borderSide: BorderSide(color: Colors.white)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.only(topLeft: Radius.circular(15))
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Subject",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Hindi",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "English",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Maths",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Science",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Social Science",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Drawing",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.only(bottomLeft: Radius.circular(15))
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Computer",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.only(bottomLeft: Radius.circular(15))
                                        ),
                                      ),
                                    ]
                                ),
                                Row(
                                  children: [
                                    Column(
                                      children: [
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "Total Marks",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.white,
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "GPA",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.green,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w700
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Container(

                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.green,
                                              borderRadius: BorderRadius.only(topRight: Radius.circular(15))
                                          ),
                                          child: SizedBox(
                                            width: size.width*0.38,

                                            child: Padding(
                                              padding: const EdgeInsets.only(top: 10.0),
                                              child: AutoSizeText(
                                                "Obtained Marks",
                                                style: GoogleFonts.openSans(
                                                    color: Colors.black,
                                                    fontSize: 15,
                                                    fontWeight: FontWeight.w500
                                                ),
                                                maxLines: 1,
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "82 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "79 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "75 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),

                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "91 - A",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "75 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),

                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "79 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.green,
                                              borderRadius: BorderRadius.only(bottomRight: Radius.circular(15))
                                          ),
                                          child: Center(
                                            child: AutoSizeText(
                                              "95 - A",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.white,
                                              borderRadius: BorderRadius.only(bottomRight: Radius.circular(15))
                                          ),
                                          child: Center(
                                            child: AutoSizeText(
                                              "8.24",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.green,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w600
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),

                          SizedBox(
                            height: size.height*0.01,
                          ),
                          AutoSizeText(
                            "Final",
                            style: GoogleFonts.openSans(
                                color: Colors.black,
                                fontSize: 22,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Card(
                            elevation: 5,
                            color: Colors.white,
                            shape: OutlineInputBorder(borderRadius: BorderRadius.circular(15),borderSide: BorderSide(color: Colors.white)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.only(topLeft: Radius.circular(15))
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Subject",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Hindi",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "English",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Maths",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Science",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Social Science",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        color: Colors.white,
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Drawing",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.only(bottomLeft: Radius.circular(15))
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.only(top: 12.0,left: 12),
                                          child: AutoSizeText(
                                            "Computer",
                                            style: GoogleFonts.openSans(
                                                color: Colors.black,
                                                fontSize: 15,
                                                fontWeight: FontWeight.w500
                                            ),
                                            maxLines: 1,
                                          ),
                                        ),
                                      ),
                                      Container(
                                        width: size.width*0.3,
                                        height: size.height*0.05,
                                        decoration: const BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.only(bottomLeft: Radius.circular(15))
                                        ),
                                      ),
                                    ]
                                ),
                                Row(
                                  children: [
                                    Column(
                                      children: [
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "Total Marks",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: const Color.fromRGBO(180, 230, 238, 1),
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "100",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.white,
                                          width: size.width*0.28,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "GPA",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.green,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w700
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Container(

                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.green,
                                              borderRadius: BorderRadius.only(topRight: Radius.circular(15))
                                          ),
                                          child: SizedBox(
                                            width: size.width*0.38,

                                            child: Padding(
                                              padding: const EdgeInsets.only(top: 10.0),
                                              child: AutoSizeText(
                                                "Obtained Marks",
                                                style: GoogleFonts.openSans(
                                                    color: Colors.black,
                                                    fontSize: 15,
                                                    fontWeight: FontWeight.w500
                                                ),
                                                maxLines: 1,
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "82 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "79 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "75 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),

                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "91 - A",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "75 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),

                                        Container(
                                          color: Colors.green,
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          child: Center(
                                            child: AutoSizeText(
                                              "79 - B",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.green,
                                              borderRadius: BorderRadius.only(bottomRight: Radius.circular(15))
                                          ),
                                          child: Center(
                                            child: AutoSizeText(
                                              "95 - A",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w500
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          width: size.width*0.32,
                                          height: size.height*0.05,
                                          decoration: const BoxDecoration(
                                              color: Colors.white,
                                              borderRadius: BorderRadius.only(bottomRight: Radius.circular(15))
                                          ),
                                          child: Center(
                                            child: AutoSizeText(
                                              "8.24",
                                              style: GoogleFonts.openSans(
                                                  color: Colors.green,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w600
                                              ),
                                              maxLines: 1,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),

                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Card(
                            elevation: 5,
                            color: Colors.green.shade50,

                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: AutoSizeText(
                                "Thanks for a fantastic year at school this year! it’s been awesome to see everyone grow and develop so much and our community has come together so wonderfully with all of our exciting new projects and activities. Hope you all have a fantastic summer - and looking forward to seeing everyone back in the fall.",
                                style: GoogleFonts.openSans(
                                    color: Colors.green,
                                    fontSize: 15,
                                    fontWeight: FontWeight.w500
                                ),
                              ),
                            ),
                          ),

                          SizedBox(
                            height: size.height*0.01,
                          ),
                          AutoSizeText(
                            "- Bhuvneshwar Tyagi",
                            style: GoogleFonts.openSans(
                                color: Colors.black,
                                fontSize: 20,
                                fontWeight: FontWeight.w500
                            ),
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          AutoSizeText(
                            "   Principle",
                            style: GoogleFonts.openSans(
                                color: Colors.black,
                                fontSize: 16,
                                fontWeight: FontWeight.w500
                            ),
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
