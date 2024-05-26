import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ParentsTile extends StatelessWidget {
  const ParentsTile({super.key, required this.child, required this.father, required this.mother});

  final String child;
  final String father;
  final String mother;


  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return SizedBox(
      height: size.height*0.05,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SizedBox(

              width:size.width*0.2,
              child: Text(child,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              width:size.width*0.2,
              child: Text(father,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              width:size.width*0.25,
              child: Text(mother,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.green,fontWeight:FontWeight.w400),)),
        ],
      ),
    );
  }
}
