import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/onBoarding/Screens/email_verification.dart';
import 'package:metaphile_erp/Screens/onBoarding/api/api_call.dart';
import 'package:metaphile_erp/Screens/onBoarding/api/api_link.dart';
import 'package:page_transition/page_transition.dart';

import '../utils/text_field.dart';

class ForgetPassword extends StatelessWidget {
  ForgetPassword({super.key});

  final TextEditingController emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color.fromRGBO(108, 137, 204, 1),
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
              height: size.height*0.5,
              width: size.width,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: size.height*0.08),
                child: Image.asset("assets/onBoarding/Forget/gif1.gif",fit: BoxFit.fitHeight,),
              ),
            ),
            Card(
              margin: const EdgeInsets.all(0),
              shape: const OutlineInputBorder(
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(45),
                      topLeft: Radius.circular(45)
                  )
              ),
              child: SizedBox(
                  height: size.height*0.5,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: size.width*0.06),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Forget password",
                          style: GoogleFonts.openSans(
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.007,
                        ),
                        AutoSizeText("please enter your email to reset the password",
                          style: GoogleFonts.openSans(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              color: Colors.grey.shade700
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.05,
                        ),
                        AutoSizeText("Your Email",
                          style: GoogleFonts.openSans(
                              fontSize: 20,
                              fontWeight: FontWeight.w500,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        CustomTextField(controller: emailController, password: false,),
                        SizedBox(
                          height: size.height*0.08,
                        ),
                        resetButtton(size, context)


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
  Widget resetButtton(Size size,BuildContext context){
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
        onTap: () async {
          if(emailController.text.isNotEmpty){
            await ApiCall().sendPostRequest(
                context,
                ApiLinks().emailVerification,
                {
                  "email": emailController.text,
                  "subject": "Verification Code",
                  "message": "This is your email verification code to change your password. If you didn't request for password change Please ignore",
                  "duration": 1
                },
                "Verification code is sent to your email. Please check your mails",
                "Something went wrong"
            ).then((res){
              if(!res["error"]){
                Navigator.of(context).push(
                    PageTransition(
                        child: EmailVerification(email: emailController.text.trim()),
                        curve: accelerateEasing,
                        duration: const Duration(milliseconds: 400),
                        type: PageTransitionType.bottomToTop)
                );
              }
            });

          }
          else{
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                backgroundColor: Colors.red,
                content: Text("Email cannot be empty",style: GoogleFonts.openSans(
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                    color : Colors.white
                ),
                ),
              ),
            );
          }
        },
        child: Padding(
          padding: EdgeInsets.all(size.width*0.01),
          child: Center(
            child: AutoSizeText("Reset Password",
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
