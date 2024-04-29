import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ViewAttendanceReportTile extends StatelessWidget {
  const ViewAttendanceReportTile({super.key, required this.percentage, required this.studentName, required this.sRollNo});
  final String studentName;
  final int percentage;
  final int sRollNo;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10),
        height: size.height*0.081,
        child: Row(
          children: [
            Icon(CupertinoIcons.profile_circled,size: size.height*0.05,color: Colors.black,),
            SizedBox(width: size.width*0.02,),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
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
            Expanded(child: SizedBox()),
            Text(percentage.toString()+"%",style: GoogleFonts.openSans(fontSize:size.width*0.035,fontWeight:FontWeight.w400,color:Colors.black),)


          ],
        ),
      ),
    );
  }
}
