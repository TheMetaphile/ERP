import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PayOnlineTextField extends StatelessWidget {
  const PayOnlineTextField({super.key, required this.controller, required this.hintText, required this.icon, required this.enabled});
  final TextEditingController controller;
  final String hintText;
  final bool icon;
  final bool enabled;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return TextField(
      controller: controller,
      cursorColor: const Color.fromRGBO(108, 137, 204, 1),
      enabled: enabled,
      decoration: InputDecoration(
          contentPadding: const EdgeInsets.symmetric(vertical: 4),
          labelText: hintText,
          focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: Color.fromRGBO(108, 137, 204, 1),),
          ),
          labelStyle: GoogleFonts.openSans(
              fontSize: size.width*0.04,
              fontWeight: FontWeight.w400,
              color: Colors.grey
          ),
          suffixIcon: icon ? const Icon(Icons.calendar_month_outlined,color: Colors.grey) : const SizedBox()
      ),
    );
  }
}
