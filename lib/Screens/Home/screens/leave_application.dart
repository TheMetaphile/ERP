import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../utils/payOnlineTextField.dart';

class LeaveApplication extends StatelessWidget {
  LeaveApplication({super.key});

  final TextEditingController classTeacher = TextEditingController();
  final TextEditingController applicationTitle = TextEditingController();
  final TextEditingController description = TextEditingController();

  @override
  Widget build(BuildContext context)  {
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
          Scaffold (
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
              title: AutoSizeText("Leave Application",
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
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          PayOnlineTextField(
                            enabled: true,
                            controller: classTeacher,
                            hintText: "Class Teacher",
                            icon: false,
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          PayOnlineTextField(
                            enabled: true,
                            controller: applicationTitle,
                            hintText: "Application Title",
                            icon: false,
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          PayOnlineTextField(
                            enabled: true,
                            controller: description,
                            hintText: "Description",
                            icon: false,
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          InkWell(
                            onTap: (){},
                            child: Card(
                              elevation: 5,
                              color: const Color.fromRGBO(108, 137, 204, 1),
                              child: SizedBox(
                                width: size.width*0.85,
                                height: size.height*0.06,
                                child: Center(
                                  child: AutoSizeText("SEND",
                                    style: GoogleFonts.openSans(
                                        color: Colors.white,
                                        fontWeight: FontWeight.w600,
                                        fontSize: 22
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            child: Image.asset("assets/Navigation/Home/askdoubt1.png"),
                          )
                        ],
                      ),
                    )
                ),
              ),
            ],
          ),
        ]
    );
  }
}
