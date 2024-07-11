import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AllBookTile extends StatelessWidget {
  const AllBookTile({super.key, required this.subject, required this.writer, required this.clas});
  final String subject;
  final String writer;
  final String clas;


  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return SizedBox(
      height: size.height*0.05,
      child: Row(
        children: [
          Container(


              width:size.width*0.3,
              child: Text(subject,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          Container(

              width:size.width*0.45,

              child: Text(writer,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              child: Text(clas,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.green,fontWeight:FontWeight.w400),)),
        ],
      ),
    );
  }
}
