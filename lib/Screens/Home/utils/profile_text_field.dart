import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomTextField extends StatefulWidget {
  const CustomTextField({super.key, required this.controller, required this.hintText, required this.lock});
  final TextEditingController controller;
  final String hintText;
  final bool lock;
  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool enabled;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    enabled=!widget.lock;
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return TextField(
      controller: widget.controller,
      cursorColor: const Color.fromRGBO(108, 137, 204, 1),
      enabled: enabled,
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
              if(widget.lock){
                setState(() {
                  enabled=!enabled;
                });
              }
            },
            icon: enabled ? const Icon(Icons.lock_open,color: Colors.grey) : const Icon(Icons.lock_outline,color: Colors.grey ,),
          )
      ),
    );
  }
}
