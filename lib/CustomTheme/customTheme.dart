import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

showRedSnackBar(String message,BuildContext context) {
  final snackBar=SnackBar(content: Text(message,style: TextStyle(color: Colors.white),),backgroundColor: Colors.red,);
  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}

//SnackBar Green
showGreenSnackBar(String message,BuildContext context) {
  final snackBar=SnackBar(content: Text(message,style: TextStyle(color: Colors.white),),backgroundColor: Colors.green,);
  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}
class CustomTheme{

   CustomTheme(this.size);
   final Size size;

  static Color primaryColor=Color.fromRGBO(94, 234, 212, 1);
  static Color secondaryColor=Color.fromRGBO(219, 234, 254, 1);

  static Color whiteColor=Colors.white;
  static Color blackColor=Colors.black;
  static Color greyColor=Colors.grey;

    TextStyle get normalText => GoogleFonts.openSans(color: blackColor, fontSize: size.width * 0.035);
    TextStyle get bigNormalText => GoogleFonts.openSans(color: blackColor, fontSize: size.width * 0.045,fontWeight: FontWeight.w500);
    TextStyle get headingText => GoogleFonts.openSans(color: blackColor, fontSize: size.width * 0.055,fontWeight: FontWeight.w500);






}