import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/onBoarding/Screens/Forget.dart';
import 'package:metaphile_erp/Screens/onBoarding/api/api_call.dart';
import 'package:metaphile_erp/Screens/onBoarding/api/api_link.dart';
import 'package:metaphile_erp/Screens/onBoarding/utils/text_field.dart';
import 'package:page_transition/page_transition.dart';
import 'package:metaphile_erp/Screens/navigation_bar/Screens/navigtion_bar.dart' as bar;


class Login extends StatelessWidget {
  Login({super.key});
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
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
          if(emailController.text.trim() == 'bhanu68tyagi@gmail.com' && passwordController.text.trim()=='bhanu1234'){
            Navigator.push(context, MaterialPageRoute(
                        builder: (context) {
                          return const bar.NavigationBar();
                        },
                      ));
          }
          // if(passwordController.text.trim().isNotEmpty && emailController.text.trim().isNotEmpty){
          //   await ApiCall()
          //       .sendPostRequest(
          //           context,
          //           ApiLinks().loginLink,
          //           {
          //             "email": emailController.text,
          //             "password": passwordController.text,
          //           },
          //           "Login successful",
          //           "Something went wrong")
          //       .then((res) {
          //     if (!res["error"]) {
          //       Navigator.push(context, MaterialPageRoute(
          //         builder: (context) {
          //           return const bar.NavigationBar();
          //         },
          //       ));
          //     }
          //   });
          // }
          // else{
          //   ScaffoldMessenger.of(context).showSnackBar(
          //     SnackBar(
          //       backgroundColor: Colors.red,
          //       content: Text("Email and password cannot be empty",style: GoogleFonts.openSans(
          //           fontSize: 18,
          //           fontWeight: FontWeight.w500,
          //           color : Colors.white
          //       ),
          //       ),
          //     ),
          //   );
          // }
        },
        child: Padding(
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
