import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/utils/CustomTextField.dart';

class ChangePassword extends StatelessWidget {
  ChangePassword({super.key});
  final TextEditingController oldPasswordController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
      alignment: Alignment.topCenter,
      children: [
        Container(
          height: size.height,
          width: size.width,
          color: const Color.fromRGBO(108, 137, 204, 1),
        ),
        SizedBox(
          width: size.width,
          height: size.height*0.12,
          child: Image.asset("assets/Navigation/changePassword/starpattern.png"),
        ),
        Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            elevation: 0,
            backgroundColor: Colors.transparent,
            leading: IconButton(
                onPressed: (){
                  Navigator.pop(context);
                },
                icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.white,),
            ),
            title: AutoSizeText("Change Password",
              style: GoogleFonts.openSans(
                color: Colors.white,
                fontWeight: FontWeight.w600
              ),
            ),
          ),
        ),
        Column(
          children: [
            SizedBox(
              height: size.height*0.12,
            ),
            Card(
              color: Colors.white,
              margin: const EdgeInsets.all(0),
              shape: const OutlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.white
                ),
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(30),
                      topLeft: Radius.circular(30)
                  )
              ),
              child: SizedBox(
                  height: size.height*0.88,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: size.width*0.06),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: size.height*0.05,
                        ),
                        CustomTextField(controller: oldPasswordController,hintText: "Old Password",),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        CustomTextField(controller: newPasswordController,hintText: "New Password",),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        CustomTextField(controller: confirmPasswordController,hintText: "Retype Password",),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        changeButton(size)

                      ],
                    ),
                  )
              ),
            ),
          ],
        ),
        Align(
          alignment: Alignment.bottomLeft,
          child: SizedBox(
            height: size.height*0.25,
            child: Image.asset("assets/Navigation/changePassword/semiCircle.png"),
          ),
        ),
        Positioned(
          bottom: size.height*0.18,
          height: size.height*0.25,
          right: 0,
          child: Image.asset("assets/Navigation/changePassword/image1.png"),
        ),
      ]
    );
  }
  Widget changeButton(Size size){
    return Card(
      elevation: 5,
      color: const Color.fromRGBO(108, 137, 204, 1),
      shape: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(
          color: Color.fromRGBO(108, 137, 204, 1),
        )
      ),
      child:  InkWell(
        onTap: (){},
          child: SizedBox(
            width: size.width*0.85,
            height: size.height*0.05,
            child:Center(
                child: AutoSizeText("Change Password",
                  style: GoogleFonts.openSans(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w500
                  ),
                ),
            ),
        ),
      ),
    );
  }
}
