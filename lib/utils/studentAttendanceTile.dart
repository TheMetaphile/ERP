import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentAttendanceTile extends StatelessWidget {
  const StudentAttendanceTile({super.key, required this.studentName, required this.sNo, required this.profilePic});
  final int sNo;
  final String profilePic;
  final String studentName;


  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return Card(
      child: Container(
        height: size.height*0.08,
        child: Row(
          children: [
            SizedBox(width: size.width*0.02,),
            Icon(CupertinoIcons.profile_circled,size: size.height*0.05,color: Colors.black,),
            SizedBox(width: size.width*0.03,),
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
                AutoSizeText(sNo.toString(),
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.035,
                      fontWeight: FontWeight.w400,
                      color: Colors.grey
                  ),
                ),
              ],
            ),
           Expanded(child: SizedBox(),),
            CircleAvatar(
              radius: size.width*0.05,
              backgroundColor: Colors.grey[300],
              child: TextButton(
                onPressed: () {  },
                child: Text("P",style: GoogleFonts.openSans(color:Colors.black),),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            CircleAvatar(
              radius: size.width*0.05,
              backgroundColor: Colors.grey[300],
              child: TextButton(
                onPressed: () {  },
                child: Text("A",style: GoogleFonts.openSans(color:Colors.black),),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            CircleAvatar(
              radius: size.width*0.05,
              backgroundColor: Colors.grey[300],
              child: TextButton(
                onPressed: () {  },
                child: Text("L",style: GoogleFonts.openSans(color:Colors.black),),
              ),
            ),
            SizedBox(width: size.width*0.02,),
          ],
        ),
      ),
    );
  }
}
