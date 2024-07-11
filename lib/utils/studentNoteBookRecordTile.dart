import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentNoteBookRecord extends StatelessWidget {
  const StudentNoteBookRecord({super.key, required this.sNo, required this.studentName, required this.check});
  final int sNo;
  final String studentName;
 final bool check;


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
            SizedBox(width: size.width*0.03,),
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
                  style: GoogleFonts.bebasNeue(
                      color: Colors.grey,
                      fontSize: size.width*0.035,
                      fontWeight: FontWeight.w400
                  ),
                ),
              ],
            ),
            SizedBox(width: size.width*0.09,),

            check  ?  Icon(CupertinoIcons.check_mark_circled,size: size.width*0.08,color: Colors.green,):SizedBox(),
            SizedBox(width: size.width*0.25,),
            !check ? Icon(CupertinoIcons.clear_circled,size: size.width*0.08,color: Colors.red,):SizedBox()


          ],
        ),
      ),
    );
  }
}
