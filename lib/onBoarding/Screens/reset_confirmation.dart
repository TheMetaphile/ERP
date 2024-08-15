import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:student/onBoarding/Screens/set_new_password.dart';

import '../../CustomTheme/customTheme.dart';


class ResetConfirmation extends StatelessWidget {
   ResetConfirmation({super.key, required this.email});
  final String email;

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
      body: SingleChildScrollView(

        child: Column(
          children: [
            SizedBox(
              height: size.height*0.45,
              width: size.width,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: size.height*0.08),
                child: Image.asset("assets/onBoarding/VerifyEmail/gif2.gif",fit: BoxFit.fitHeight,),
              ),
            ),
            Card(
              margin: const EdgeInsets.all(0),

              child: SizedBox(
                  height: size.height*0.55,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: size.width*0.06),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Password reset",
                          style: GoogleFonts.openSans(
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.04,
                        ),
                        AutoSizeText("Your password has been successfully reset.\nClick confirm to set a new password.",
                          style: GoogleFonts.openSans(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              color: Colors.grey.shade700
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.09,
                        ),
                        confirmButtton(size, context),



                      ],
                    ),
                  )
              ),
            )
          ],
        ),
      ),
    );
  }
  Widget confirmButtton(Size size,BuildContext context){
    return Card(
      color: CustomTheme.primaryColor,

      elevation: 20,
      child: InkWell(
        onTap: (){
          Navigator.of(context).push(
              PageTransition(
                  child: SetPassword(email: email,),
                  curve: accelerateEasing,
                  duration: const Duration(milliseconds: 400),
                  type: PageTransitionType.bottomToTop)
          );
        },
        child: Padding(
          padding: EdgeInsets.all(size.width*0.01),
          child: Center(
            child: AutoSizeText("Confirm",
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
