import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentFeesTile extends StatelessWidget {

  const StudentFeesTile({super.key, required this.sNo, required this.studentName, required this.status, required this.amount, });
  final int sNo;
  final String studentName;
  final String status;
  final int amount;


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      child: SizedBox(
        height: size.height*0.081,
        child: Row(
          children: [
            SizedBox(width: size.width*0.02,),
            Icon(CupertinoIcons.profile_circled,size: size.height*0.05,color: Colors.black,),
            SizedBox(width: size.width*0.04,),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AutoSizeText(studentName,textAlign: TextAlign.start,
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.05,
                      fontWeight: FontWeight.w400,
                      color: Colors.black
                  ),
                ),
                AutoSizeText(sNo.toString(),textAlign: TextAlign.start,
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.025,
                      fontWeight: FontWeight.w400,
                      color: Colors.grey
                  ),
                ),
              ],
            ),

            SizedBox(width: size.width*0.08,),
            AutoSizeText(status,textAlign: TextAlign.start,
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w400,
                  color: status == "Paid" ? Colors.green : Colors.red
              ),
            ),
            SizedBox(width: size.width*0.08,),
            AutoSizeText(amount.toString(),
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.05,
                  fontWeight: FontWeight.w500,
                  color: status == "Paid" ? Colors.green : Colors.red
              ),
            ),
          ],
        ),
      ),
    );
  }
}

