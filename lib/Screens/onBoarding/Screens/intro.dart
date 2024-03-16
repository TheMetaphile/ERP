import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/onBoarding/Screens/login.dart';
import 'package:page_transition/page_transition.dart';

class Intro extends StatefulWidget {
  const Intro({super.key});

  @override
  State<Intro> createState() => _IntroState();
}

class _IntroState extends State<Intro> {
  Color backgroundColor = Colors.white;

  Color nextColor = Colors.white;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: backgroundColor,
      body: Stack(
        children: [
          SizedBox(
            height: size.height*0.95,
            child: Image.asset("assets/onBoarding/Intro/gif2.gif",fit: BoxFit.fitHeight,),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: size.width*0.05,vertical: size.height*0.08),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(
                  width: size.width*0.99,
                  child: Image.asset("assets/onBoarding/Intro/gif1.gif",fit: BoxFit.fitWidth,),
                ),
                SizedBox(
                  height: size.height*0.13,
                ),
                SizedBox(
                  width: size.width,
                  child: AutoSizeText("Welcome\nTo Metaphile",
                      style: GoogleFonts.openSans(
                          fontSize: size.width*0.1,
                          fontWeight: FontWeight.w700,
                          color: Colors.black
                      )
                  ),
                ),
                SizedBox(
                  height: size.height*0.12,
                ),
                Align(
                  alignment: Alignment.centerRight,
                    child: nextButtton(size,context)),
              ],
            ),
          ),

        ],
      ),
    );
  }

  Widget nextButtton(Size size,BuildContext context){
    return Card(
      color: const Color.fromRGBO(108, 137, 204, 1),
      shape: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(10)),
          borderSide: BorderSide(
            color: Colors.black,
          )
      ),
      elevation: 20,
      child: InkWell(
        onTap: (){
          Navigator.of(context).pushReplacement(
            PageTransition(
                child: Login(),
                curve: accelerateEasing,
                duration: const Duration(milliseconds: 600),
                settings: const RouteSettings(name: "/Login"),
                type: PageTransitionType.topToBottom)
          );
        },
        child: Padding(
          padding: EdgeInsets.all(size.width*0.01),
          child: Row(
              children: [
                Expanded(
                  child: Center(
                    child: AutoSizeText("Next",
                      style: GoogleFonts.openSans(
                        fontSize: 25,
                        fontWeight: FontWeight.w500,
                        color:nextColor
                      )
                    ),
                  ),
                ),
                Icon(Icons.arrow_forward_ios_rounded,color: nextColor,)
              ],
            ),
        ),
      ),
    );
  }
}
