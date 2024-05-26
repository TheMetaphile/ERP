import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';

import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:untitled/onBoarding/Screens/reset_confirmation.dart';



import '../../APIs/Authentication/teacherAuthenticationService.dart';
import '../../utils/utils.dart';
import '../api/api_call.dart';
import '../api/api_link.dart';
import 'package:http/http.dart' as http;

class EmailVerification extends StatefulWidget {
  EmailVerification({super.key, required this.email, required this.otpToken});
  final otpToken;
  final String email;

  @override
  State<EmailVerification> createState() => _EmailVerificationState();
}

class _EmailVerificationState extends State<EmailVerification> {
  String otp = "";

  bool isLoading=false;

  final authApiAcess=  TeacherAuthentication();

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
                child: Image.asset("assets/onBoarding/VerifyEmail/gif1.gif",fit: BoxFit.fitHeight,),
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
                        AutoSizeText("Check your email",
                          style: GoogleFonts.openSans(
                              fontSize: size.width*0.045,
                              fontWeight: FontWeight.w500,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.007,
                        ),
                        Row(
                          children: [
                            AutoSizeText("We sent a reset link to ",
                              style: GoogleFonts.openSans(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.grey.shade700
                              ),

                            ),
                            AutoSizeText(widget.email,overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.openSans(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w700,
                                  color: Colors.black
                              ),

                            ),

                          ],
                        ),
                        AutoSizeText("enter 5 digit code that mentioned in the email.",
                          style: GoogleFonts.openSans(
                              fontSize: size.width*0.035,
                              fontWeight: FontWeight.w500,
                              color: Colors.grey.shade700
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.06,
                        ),

                        otpTextField(size, context),
                        SizedBox(
                          height: size.height*0.08,
                        ),
                        verifyButtton(size, context),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            AutoSizeText("Haven't got the email yet? ",
                              style: GoogleFonts.openSans(
                                  fontSize: size.width*0.045,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black
                              ),

                            ),
                            AutoSizeText("Resend email",
                              style: GoogleFonts.openSans(
                                  fontSize: size.width*0.045,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.blue.shade900
                              ),

                            ),
                          ],
                        ),


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

  Widget verifyButtton(Size size,BuildContext context){
    return Card(
      color:isLoading? Colors.transparent: const Color.fromRGBO(108, 137, 204, 1),
      shape: isLoading? Border.all(color: Colors.transparent):const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(10)),
          borderSide: BorderSide(
            color: Colors.black,
          )
      ),
      elevation: isLoading?0:15,
      child: InkWell(
        onTap: () async {
          if(widget.email.isNotEmpty){
            print(otp);
            setState(() {
              isLoading =true;
            });
            try{
              await authApiAcess.verifyOtp(widget.email, widget.otpToken,otp, context );
            }catch(e){

            }finally{
              setState(() {
                isLoading=false;
              });
            }

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
        child:  isLoading ? Center(child: CircularProgressIndicator()):
        Padding(
          padding: EdgeInsets.all(size.width*0.01),
          child: Center(
            child: AutoSizeText("Verify Code",
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

  Widget otpTextField(Size size,BuildContext context){
    return  OtpTextField(
      borderRadius: const BorderRadius.all(Radius.circular(20)),
      numberOfFields: 4,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      keyboardType: TextInputType.number,
      cursorColor: const Color.fromRGBO(108, 137, 204, 1),
      fieldWidth: size.width*0.15,
      filled: true,
      textStyle: GoogleFonts.openSans(
          fontSize: 20,
          fontWeight: FontWeight.w500,
          color : const Color.fromRGBO(108, 137, 204, 1),
      ),
      //set to true to show as box or false to show as dash
      showFieldAsBox: true,
      //runs when a code is typed in
      onCodeChanged: (String code) {
        otp=code;
      },
      //runs when every textfield is filled
      onSubmit: (String verificationCode){
        otp=verificationCode;
        showDialog(
            context: context,
            builder: (context){
              return AlertDialog(
                title: const Text("Verification Code"),
                content: Text('Code entered is ${otp}'),
              );
            }
        );
      }, // end onSubmit
    );
  }
}
