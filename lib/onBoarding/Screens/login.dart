import 'dart:convert';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:http/http.dart' as http;


import '../../APIs/Authentication/teacherAuthenticationService.dart';
import '../../utils/utils.dart';
import '../utils/text_field.dart';
import 'Forget.dart';


class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController emailController = TextEditingController();

  final TextEditingController passwordController = TextEditingController();

    final authApiAcess=  TeacherAuthentication();
   bool isLoading=false;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color.fromRGBO(108, 137, 204, 1),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: size.height*0.28,
              child: Padding(
                padding: EdgeInsets.only(top: size.height*0.03),
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Image.asset("assets/onBoarding/Login/gif1.gif",fit: BoxFit.fitHeight,),
                ),
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
                height: size.height*0.72,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: size.width*0.06),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Your Email",
                            style: GoogleFonts.openSans(
                                fontSize: 20,
                                fontWeight: FontWeight.w400,
                                color: Colors.black
                            ),

                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        CustomTextField(controller: emailController, password: false,),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Password",
                          style: GoogleFonts.openSans(
                              fontSize: 20,
                              fontWeight: FontWeight.w400,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        CustomTextField(controller: passwordController, password: true,),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        Align(
                          alignment: Alignment.centerRight,
                          child: InkWell(
                            onTap: (){
                              Navigator.of(context).push(
                                  PageTransition(
                                      child: ForgetPassword(),
                                      curve: accelerateEasing,
                                      duration: const Duration(milliseconds: 400),
                                      type: PageTransitionType.bottomToTop)
                              );
                            },
                            child: AutoSizeText("Forget password?",
                              style: GoogleFonts.openSans(
                                  fontSize: size.width*0.04,
                                  fontWeight: FontWeight.w400,
                                  color: Colors.blue.shade900
                              ),

                            ),
                          ),
                        ),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        continueButtton(size,context),
                        SizedBox(
                          height: size.height*0.02,
                        ),
                        orDivider(size),
                        SizedBox(
                          height: size.height*0.02,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            AutoSizeText("Don't have an account? ",
                              style: GoogleFonts.openSans(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black
                              ),
                            ),
                            InkWell(
                              onTap: (){},
                              child: AutoSizeText("Sign up",
                                  style: GoogleFonts.openSans(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w500,
                                      color : Colors.blue.shade900
                                  )
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

  Widget continueButtton(Size size,BuildContext context){
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
          final email = emailController.text;
          final password = passwordController.text;

          setState(() {
            isLoading =true;
          });
        try{
          await authApiAcess.loginUser(email, password, context);
        }catch(e){

        }finally{
          setState(() {
            isLoading=false;
          });
        }
          // loginUser(email, password,context);

        },
        child: isLoading ? Center(child: CircularProgressIndicator()):
        Padding(
          padding: EdgeInsets.all(size.width*0.01),
          child: Center(
            child: AutoSizeText("Continue",
                style: GoogleFonts.openSans(
                    fontSize: 25,
                    fontWeight: FontWeight.w400,
                    color : Colors.white
                  )
              ),
            ),
          ),
      ),
    );
  }

  Widget orDivider(Size size){
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          width: size.width*0.39,
          child: Divider(
            height: size.height*0.004,
            color: Colors.grey,
            thickness: 2,
          ),
        ),
        SizedBox(
          width: size.width*0.1,
          height: size.height*0.05,
          child: Center(
            child: AutoSizeText("or",
              style: GoogleFonts.openSans(
                  fontSize: size.width*0.04,
                  fontWeight: FontWeight.w400,
                  color: Colors.grey
              ),
              maxLines: 1,

            ),
          ),

        ),
        SizedBox(
          width: size.width*0.39,
          child: Divider(
            height: size.height*0.004,
            color: Colors.grey,
            thickness: 2,
          ),
        ),
      ],
    );
  }
}
