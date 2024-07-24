import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/theme.dart';
import '../../APIs/Authentication/teacherAuthenticationService.dart';


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
CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.primayColor,
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
              height: size.height*0.35,
              width: size.width,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: size.height*0.08),
                child: Image.asset("assets/onBoarding/VerifyEmail/gif1.gif",fit: BoxFit.fitHeight,),
              ),
            ),
            Card(
              margin: const EdgeInsets.all(0),

              child: SizedBox(
                  height: size.height*0.7,
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
      color:isLoading? Colors.transparent: themeObj.primayColor,

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
        child:  isLoading ? Center(child:  CircularProgressIndicator(color: themeObj.textgrey)):
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

      enabledBorderColor: Colors.grey,
      disabledBorderColor: Colors.grey,
      focusedBorderColor: Colors.black,
      numberOfFields: 4,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      keyboardType: TextInputType.number,
      cursorColor: Colors.grey,
      fieldWidth: size.width*0.15,
      filled: true,
      textStyle: GoogleFonts.openSans(
          fontSize: 20,
          fontWeight: FontWeight.w500,
          color : Colors.black,
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
