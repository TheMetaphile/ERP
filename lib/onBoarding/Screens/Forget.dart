import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../APIs/Authentication/studentAuthentication.dart';
import '../../CustomTheme/customTheme.dart';
import '../utils/text_field.dart';
import 'package:http/http.dart' as http;

class ForgetPassword extends StatefulWidget {
  ForgetPassword({super.key});

  @override
  State<ForgetPassword> createState() => _ForgetPasswordState();
}

class _ForgetPasswordState extends State<ForgetPassword> {
  final TextEditingController emailController = TextEditingController();

  final authApiAccess=  StudentAuthentication();

  bool isLoading=false;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj=CustomTheme(size);
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
              height: size.height*0.35,
              width: size.width,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: size.height*0.08),
                child: Image.asset("assets/onBoarding/Forget/gif1.gif",fit: BoxFit.fitHeight,),
              ),
            ),
            Card(
              margin: const EdgeInsets.all(0),
              elevation: 10,
              child: SizedBox(
                  height: size.height*0.65,
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
      color:isLoading? Colors.transparent: CustomTheme.greyColor,

      elevation: isLoading?0:15,
      child: InkWell(
        onTap: () async {
          if(emailController.text.isNotEmpty){
            final email=emailController.text;
            setState(() {
              isLoading =true;
            });
            try{
              await authApiAccess.forgetUser(email, context);
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
        child:  isLoading ? Center(child: CircularProgressIndicator(color: CustomTheme.greyColor)):
        Padding(
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
