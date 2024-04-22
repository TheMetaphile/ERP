
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class UploadReportTile extends StatelessWidget {
  const UploadReportTile({super.key, required this.studentName, required this.sRollNo, required this.totalMarks, required this.obtainedMarks});
  final String studentName;
  final int sRollNo;
  final TextEditingController totalMarks;
  final TextEditingController obtainedMarks;


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
              children: [
                AutoSizeText(studentName,
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.05,
                      fontWeight: FontWeight.w400,
                      color: Colors.black
                  ),
                ),
                AutoSizeText(sRollNo.toString(),
                  style: GoogleFonts.openSans(
                      color: Colors.grey,
                      fontSize: size.width*0.035,
                      fontWeight: FontWeight.w400
                  ),
                ),
              ],
            ),
            Row(
              children: [
                SizedBox(
                  width: size.width*0.15,
                  child: TextField(
                    controller: totalMarks,
                    maxLength: 3,

                  ),
                ),
                Text(" / ",style: TextStyle(fontSize: size.height*0.03),),
                SizedBox(
                  width: size.width*0.15,
                  child: TextField(
                    controller: totalMarks,
                    maxLength: 3,

                  ),
                ),
              ],
            )


          ],
        ),
      ),
    );
  }
}
