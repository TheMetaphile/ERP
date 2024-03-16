import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/utils/profile_text_field.dart';

class ProfileScreen extends StatelessWidget {
  ProfileScreen({super.key});
  final TextEditingController adharController = TextEditingController();
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
            child: Image.asset("assets/changePassword/starpattern.png"),
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
              title: AutoSizeText("My Profile",
                style: GoogleFonts.openSans(
                    color: Colors.white
                ),
              ),
              actions: [
                Card(
                  elevation: 5,
                  shape: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(50)
                  ),
                  child: InkWell(
                    onTap: (){},
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(50),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 3),
                        child: Row(
                          children: [
                            Icon(Icons.check,color: const Color.fromRGBO(108, 137, 204, 1),size: size.width*0.05,),
                            AutoSizeText("Done",
                              style: GoogleFonts.openSans(
                                  color: const Color.fromRGBO(108, 137, 204, 1),
                                  fontSize: 15,
                                  fontWeight: FontWeight.w600
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
          Column(
            children: [
              SizedBox(
                height: size.height*0.12,
              ),
              Card(
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
                            height: size.height*0.03,
                          ),
                          profileCard(size),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                width: size.width*0.37,
                                child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                              ),
                              SizedBox(
                                width: size.width*0.43,
                                child: CustomTextField(controller: adharController, hintText: "Academic Year",lock: false,),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                width: size.width*0.37,
                                child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                              ),
                              SizedBox(
                                width: size.width*0.43,
                                child: CustomTextField(controller: adharController, hintText: "Academic Year",lock: false,),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                width: size.width*0.37,
                                child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                              ),
                              SizedBox(
                                width: size.width*0.43,
                                child: CustomTextField(controller: adharController, hintText: "Academic Year",lock: false,),
                              )
                            ],
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          SizedBox(
                            width: size.width,
                            child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          SizedBox(
                            width: size.width,
                            child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          SizedBox(
                            width: size.width,
                            child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          SizedBox(
                            width: size.width,
                            child: CustomTextField(controller: adharController, hintText: "Adhar Number",lock: true,),
                          ),
                          SizedBox(
                            height: size.height*0.02,
                          ),
                          TextButton(
                            onPressed: (){},
                            child: Text("Logout",style: GoogleFonts.openSans(
                              color:Colors.black,
                              fontWeight: FontWeight.w500,
                              fontSize: 20
                              ),
                            ),
                          )
                        ],
                      ),
                    )
                ),
              ),
            ],
          )
        ]
    );
  }
  Widget profileCard(Size size){
    return Card(
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              elevation: 10,
              color: const Color.fromRGBO(237, 231, 246, 1),
              shape: OutlineInputBorder(
                borderSide: const BorderSide(
                  color: Color.fromRGBO(250, 243, 228, 1),
                ),
                borderRadius: BorderRadius.all(Radius.circular(size.width*0.1,)),
              ),
              child: CircleAvatar(
                radius: size.width*0.07,
                backgroundColor: const Color.fromRGBO(237, 231, 246, 1),
                child: SizedBox(
                    width: size.width*0.083,
                    height: size.width*0.083,
                    child: Image.asset("assets/Navigation/Home/maleProfile.png",fit: BoxFit.scaleDown,)),
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AutoSizeText("Hi Akshay",
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.045,
                      color: const Color.fromRGBO(108, 137, 204, 1),
                      fontWeight: FontWeight.w700
                  ),
                ),
                SizedBox(height: size.height*0.005,),
                AutoSizeText("Class XI-B | Roll no: 04",
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.035,
                      color: const Color.fromRGBO(108, 137, 204, 1).withOpacity(0.65),
                      fontWeight: FontWeight.w500
                  ),
                ),
              ],
            ),
            IconButton(onPressed: (){}, icon: const Icon(Icons.camera_alt_outlined))
          ],
        ),
      ),
    );
  }
}
