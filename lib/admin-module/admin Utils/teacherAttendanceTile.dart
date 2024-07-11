import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TeacherAttendanceTile extends StatelessWidget {
  const TeacherAttendanceTile({super.key, required this.name, required this.designation,});


  final String name;
  final String designation;


  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return InkWell(
      onTap: (){

      },
      child: Container(
        height: size.height*0.05,
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SizedBox(


                child: AutoSizeText(name,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
            SizedBox(


                child: AutoSizeText(designation,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.green,fontWeight:FontWeight.w400),)),
          ],
        ),
      ),
    );
  }
}
