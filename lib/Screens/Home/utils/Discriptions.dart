import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DescriptionTextField extends StatelessWidget {
  const DescriptionTextField({super.key, required this.controller, required this.hintText});
  final TextEditingController controller;
  final String hintText;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return TextField(
      controller: controller,
      cursorColor: const Color.fromRGBO(108, 137, 204, 1),
      decoration: InputDecoration(
        alignLabelWithHint: true,
        contentPadding: const EdgeInsets.symmetric(vertical: 4,horizontal: 8),
        labelText: hintText,
        enabledBorder: OutlineInputBorder(
            borderRadius: const BorderRadius.all(Radius.circular(15)),
            borderSide: BorderSide(color: Colors.grey.shade700,width: 1),
          ),
        labelStyle: GoogleFonts.openSans(
              fontSize: size.width*0.04,
              fontWeight: FontWeight.w400,
              color: Colors.grey
          ),
        focusedBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(15)),
          borderSide: BorderSide(color: Colors.black,width: 1.5),
        ),
        border: OutlineInputBorder(
          borderRadius: const BorderRadius.all(Radius.circular(15)),
          borderSide: BorderSide(color: Colors.grey.shade700,width: 1),
        ),
      ),
      maxLines: 5,
      textAlignVertical: TextAlignVertical.top,
      textAlign: TextAlign.center,
    );
  }
}
