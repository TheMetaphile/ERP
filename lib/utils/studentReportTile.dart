import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentReportTile extends StatelessWidget {
  const StudentReportTile({super.key, required this.sNo, required this.studentName, required this.totalMark, required this.gpa, required this.obtainedMark, });
  final int sNo;
  final String studentName;
  final int totalMark;
  final double gpa;
  final int obtainedMark;


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 2),
        height: size.height*0.081,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Icon(CupertinoIcons.profile_circled,size: size.height*0.05,color: Colors.black,),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AutoSizeText(studentName,
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.05,
                      fontWeight: FontWeight.w400,
                      color: Colors.black
                  ),
                ),
                AutoSizeText(sNo.toString(),
                  style: GoogleFonts.openSans(
                      color: Colors.grey,
                      fontSize: size.width*0.035,
                      fontWeight: FontWeight.w400
                  ),
                ),
              ],
            ),
            AutoSizeText("${obtainedMark}/${totalMark}",
              style: GoogleFonts.openSans(
                fontSize: size.width*0.05,
                fontWeight: FontWeight.w400,
                color: gpa<=5 ? Colors.red: gpa<7 ? Colors.orange :Colors.green,
              ),
            ),
            AutoSizeText(gpa.toString(),
              style: GoogleFonts.openSans(
                fontSize: size.width*0.05,
                fontWeight: FontWeight.w500,
                color: gpa<=5 ? Colors.red: gpa<7 ? Colors.orange :Colors.green,
              ),
            ),
          ],
        ),
      ),
    );
  }
  }
