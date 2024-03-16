import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/onBoarding/Screens/Successful.dart';
import 'package:metaphile_erp/Screens/onBoarding/utils/text_field.dart';

import '../api/api_call.dart';
import '../api/api_link.dart';

class SetPassword extends StatelessWidget {
  SetPassword({super.key, required this.email});
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final String email;
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
              height: size.height*0.4,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: size.height*0.03),
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Image.asset("assets/onBoarding/NewPassword/gif1.gif",fit: BoxFit.fitHeight,),
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
                  height: size.height*0.6,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: size.width*0.06),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Set a new Password",
                          style: GoogleFonts.openSans(
                              fontSize: 20,
                              fontWeight: FontWeight.w400,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Create a new password. Ensure that it differs from previous ones for security",
                          style: GoogleFonts.openSans(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              color: Colors.grey.shade700
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        AutoSizeText("New Password",
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
                          height: size.height*0.03,
                        ),
                        AutoSizeText("Confirm Password",
                          style: GoogleFonts.openSans(
                              fontSize: 20,
                              fontWeight: FontWeight.w400,
                              color: Colors.black
                          ),

                        ),
                        SizedBox(
                          height: size.height*0.01,
                        ),
                        CustomTextField(controller: confirmPasswordController, password: true,),
                        SizedBox(
                          height: size.height*0.06,
                        ),
                        updateButtton(size,context),
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
  Widget updateButtton(Size size,BuildContext context){
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
          print(email);
          if(passwordController.text.trim() == confirmPasswordController.text.trim() && passwordController.text.trim().isNotEmpty){
            await ApiCall().sendPostRequest(
                context,
                ApiLinks().resetPassword,
                {
                  "email" : email,
                  "newPassword" : passwordController.text
                },
                "Password reset successful",
                "Something went wrong"

            ).then((res){
              if(!res["error"]){
                Navigator.push(context, MaterialPageRoute(builder: (context) => const Successful(),));
              }
            });
          }
          else{
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                backgroundColor: Colors.red,
                content: Text("Password not matched",style: GoogleFonts.openSans(
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
            child: AutoSizeText("Update password",
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
}
