import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:student/onBoarding/Screens/successfull_animation.dart';
import '../../CustomTheme/customTheme.dart';
import 'login.dart';

class Successful extends StatefulWidget {
   const Successful({super.key});

  @override
  State<Successful> createState() => _SuccessfulState();
}

class _SuccessfulState extends State<Successful> {


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: CustomTheme.primaryColor,
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.white.withOpacity(0.6),
        onPressed: () { Navigator.pop(context); },
        child: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.black,),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.startTop,
      body: Stack(
        children: [
          Padding(
            padding: EdgeInsets.all(size.width*0.05),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  width: size.width*0.9,
                  child: AutoSizeText("Successful",
                    style: GoogleFonts.openSans(
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                        color: Colors.black
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                SizedBox(
                  height: size.height*0.02,
                ),
                AutoSizeText("Congratulation! your password has been changed. Click continue to login",
                  style: GoogleFonts.openSans(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: Colors.grey.shade700
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: size.height*0.09,
                ),
                continueButtton(size, context)
              ],
            ),
          ),
          SuccessfulAnimation(size: size,)
        ],
      ),
    );
  }

  Widget continueButtton(Size size,BuildContext context){
    return Card(
      color: Color.fromRGBO(216,180,254,1),

      elevation: 20,
      child: InkWell(
        onTap: (){
         Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Login(),));
        },
        child: Padding(
          padding: EdgeInsets.all(size.width*0.01),
          child: Center(
            child: AutoSizeText("Continue",
                style: GoogleFonts.openSans(
                    fontSize: 25,
                    fontWeight: FontWeight.w500,
                    color : Colors.white
                )
            ),
          ),
        ),
      ),
    );
  }
}
