import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomTextField extends StatefulWidget {
  const CustomTextField({super.key, required this.controller, required this.password});
  final TextEditingController controller;
  final bool password;
  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool obscured ;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    obscured = widget.password ? true : false;
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return TextField(
      controller: widget.controller,
      obscureText: obscured,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.symmetric(vertical: 4,horizontal: size.width*0.03),
        enabledBorder: const OutlineInputBorder(
           borderRadius: BorderRadius.all(Radius.circular(15)),
          borderSide: BorderSide(
            color: Colors.grey,
            width: 1.5
          )
        ),
        focusedBorder: const OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(15)),
            borderSide: BorderSide(
                color: Colors.black,
                width: 1.5
            )
        ),
        labelText: widget.password ? "Enter your password" : "Enter your email",
        labelStyle: GoogleFonts.openSans(
            fontSize: size.width*0.04,
            fontWeight: FontWeight.w400,
            color: Colors.grey
        ),
        suffixIcon: widget.password ?
        IconButton(
            onPressed: (){
              setState(() {
                obscured = !obscured;
              });
            },
            icon: obscured ?  const Icon(Icons.visibility_off_outlined) : const Icon(Icons.visibility_outlined),
        )
            :
        IconButton(
          onPressed: (){
            setState(() {
              widget.controller.clear();
            });
          },
          icon: const Icon(Icons.clear),
        )
      ),
    );
  }
}
