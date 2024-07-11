import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AdminStudentAttendanceTile extends StatelessWidget {
  const AdminStudentAttendanceTile({super.key, required this.clas, required this.name, required this.presents,  });
  final String clas;
  final String name;
  final String presents;


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
              child: Text(clas,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              width:size.width*0.2,
              child: Text(name,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
          SizedBox(

              width:size.width*0.25,
              child: Text(presents,textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.green,fontWeight:FontWeight.w400),)),
        ],
      ),
    );
  }

}
