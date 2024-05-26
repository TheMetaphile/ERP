import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AdminStudentReseultTile extends StatelessWidget {
  const AdminStudentReseultTile({super.key, required this.name, required this.term, required this.marks, });
  final String name;
  final String term;
  final String marks;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return  Container(
      height: size.height*0.05,
      padding: EdgeInsets.symmetric(horizontal: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SizedBox(

              width:size.width*0.2,
              child: Text(name,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              width:size.width*0.2,
              child: Text(term,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              width:size.width*0.25,
              child: Text(marks,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.green,fontWeight:FontWeight.w400),)),
        ],
      ),
    );
  }
}
