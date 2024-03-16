

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomTextField extends StatefulWidget {
  const CustomTextField({super.key, required this.controller, required this.hintText});
  final TextEditingController controller;
  final String hintText;
  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  bool obscured=true ;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return TextField(
      controller: widget.controller,
      cursorColor: const Color.fromRGBO(108, 137, 204, 1),
      obscureText: obscured,
      decoration: InputDecoration(
          contentPadding: const EdgeInsets.symmetric(vertical: 4),
          labelText: widget.hintText,
          focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: Color.fromRGBO(108, 137, 204, 1),),
          ),
          labelStyle: GoogleFonts.openSans(
              fontSize: size.width*0.04,
              fontWeight: FontWeight.w400,
              color: Colors.grey
          ),
          suffixIcon: IconButton(
            onPressed: (){
              setState(() {
                obscured = !obscured;
              });
            },
            icon: obscured ? const Icon(Icons.visibility_off_outlined,color: Colors.grey) : const Icon(Icons.visibility_outlined,color: Colors.grey ,),
          )
      ),
    );
  }
}
