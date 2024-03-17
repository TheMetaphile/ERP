import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/screens/Attendance/Attendance.dart';
import 'package:metaphile_erp/Screens/Home/screens/Datesheet/DateSheet.dart';
import 'package:metaphile_erp/Screens/Home/screens/Fee/Fee%20Details.dart';
import 'package:metaphile_erp/Screens/Home/screens/change_password.dart';
import 'package:metaphile_erp/Screens/Home/screens/profile_screen.dart';
import 'package:metaphile_erp/Screens/Home/screens/schoolGallery.dart';

import '../../navigation_bar/utils/Custom_card.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  ScrollController scrollController1 = ScrollController();

  ScrollController scrollController2 = ScrollController();

  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
  }

  var _flag1 = false;

  var _flag2 = false;

  void listener1() {
    if (_flag2) return;
    _flag1 = true;
    scrollController2.jumpTo(scrollController1.offset);
    _flag1 = false;
  }

  void listener2() {
    if (_flag1) return;
    _flag2 = true;
    scrollController1.jumpTo(scrollController2.offset);
    _flag2 = false;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
      alignment: Alignment.topCenter,
      children: [
        firstStackLayer(size),
        Stack(
          children: [
            secondStackLayer(size,context),
            thirdStackLayer(size)
          ],
        ),


      ],
    );
  }
  Widget firstStackLayer(Size size){
    return Container(
        color: const Color.fromRGBO(108, 137, 204, 1),
        height: size.height*0.4,
        padding: EdgeInsets.fromLTRB(size.width*0.1,size.height*0.02,size.width*0.06,size.height*0.02),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AutoSizeText("Hi Akshay",
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.06,
                      color: Colors.white,
                      fontWeight: FontWeight.w500
                  ),
                ),
                SizedBox(height: size.height*0.01,),
                AutoSizeText("Class XI-B | Roll no: 04",
                  style: GoogleFonts.openSans(
                      fontSize: size.width*0.04,
                      color: Colors.white.withOpacity(0.9),
                      fontWeight: FontWeight.w400
                  ),
                ),
                SizedBox(height: size.height*0.005,),
                Card(
                  color: Colors.white,
                  shape: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(50))
                  ),
                  elevation: 8,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10.0,5,10,5),
                    child: AutoSizeText("2024-2025",
                      style: GoogleFonts.openSans(
                          fontSize: size.width*0.03,
                          color: const Color.fromRGBO(108, 137, 204, 1),
                          fontWeight: FontWeight.w500
                      ),
                    ),
                  ),
                ),
              ],
            ),
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
                radius: size.width*0.1,
                backgroundColor: const Color.fromRGBO(237, 231, 246, 1),
                child: SizedBox(
                    width: size.width*0.12,
                    height: size.width*0.12,
                    child: Image.asset("assets/Navigation/Home/maleProfile.png",fit: BoxFit.scaleDown,)),
              ),
            ),
          ],
        )
    );
  }

  Widget secondStackLayer(Size size,BuildContext context){
    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height*0.25,
          ),
          Card(
            color: Colors.white,
            elevation: 0,
            margin: const EdgeInsets.all(0),
            shape: const OutlineInputBorder(
                borderSide: BorderSide(
                    color: Colors.white
                ),
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(45),
                    topLeft: Radius.circular(45)
                )
            ),
            child: SizedBox(
              height: size.height*1,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height*1,
          )
        ],
      ),
    );
  }

  Widget thirdStackLayer(Size size){
    return SingleChildScrollView(
      controller: scrollController2,
      child: Column(
        children: [
          SizedBox(
            height: size.height*0.18,
            child: InkWell(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => ProfileScreen(),));
              },
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              InkWell(
                onTap: (){
                  Navigator.of(context).push(MaterialPageRoute(builder: (context) {
                    return const Attendance();
                  },));
                },
                child: SizedBox(
                  width: size.width*0.4,
                  child: CustomCard(
                    circularAvatar: Card(
                      elevation: 10,
                      color: const Color.fromRGBO(250, 243, 228, 1),
                      shape: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color.fromRGBO(250, 243, 228, 1),
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(size.width*0.1,)),
                      ),
                      child: CircleAvatar(
                        radius: size.width*0.1,
                        backgroundColor: const Color.fromRGBO(250, 243, 228, 1),
                        child: SizedBox(
                            width: size.width*0.1,
                            height: size.width*0.1,
                            child: Image.asset("assets/Navigation/Home/men.png",fit: BoxFit.scaleDown,)),
                      ),
                    ),
                    mainText: "80.39 %",
                    secondaryText: "Attendance",
                  ),
                ),
              ),
              InkWell(
                onTap: (){
                  Navigator.push(context, MaterialPageRoute(builder: (context) {
                    return const FeeDetails();
                  },));
                },
                child: SizedBox(
                  width: size.width*0.4,
                  child: CustomCard(
                    circularAvatar: Card(
                      elevation: 10,
                      color: const Color.fromRGBO(250, 243, 228, 1),
                      shape: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color.fromRGBO(249, 217, 252, 1),
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(size.width*0.1,)),
                      ),
                      child: CircleAvatar(
                        radius: size.width*0.1,
                        backgroundColor: const Color.fromRGBO(249, 217, 252, 1),
                        child: SizedBox(
                            width: size.width*0.1,
                            height: size.width*0.1,
                            child: Image.asset("assets/Navigation/Home/fee.png",fit: BoxFit.scaleDown,)),
                      ),
                    ),
                    mainText: "₹6400",
                    secondaryText: "Fees Due",
                  ),
                ),
              ),
            ],
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SizedBox(
                width: size.width*0.4,
                child: CustomCard(
                  circularAvatar: SizedBox(
                      width: size.width*0.13,
                      height: size.width*0.13,
                      child: Image.asset("assets/Navigation/Home/PlayQuiz.png",fit: BoxFit.scaleDown,)),
                  mainText: "",
                  secondaryText: "Play Quiz",
                ),
              ),
              SizedBox(
                width: size.width*0.4,
                child: CustomCard(
                  circularAvatar: SizedBox(
                      width: size.width*0.13,
                      height: size.width*0.13,
                      child: Image.asset("assets/Navigation/Home/AskDoubt.png",fit: BoxFit.scaleDown,)),
                  mainText: "",
                  secondaryText: "Ask Doubt",
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SizedBox(
                width: size.width*0.4,
                child: CustomCard(
                  circularAvatar: SizedBox(
                      width: size.width*0.13,
                      height: size.width*0.13,
                      child: Image.asset("assets/Navigation/Home/Leave.png",fit: BoxFit.scaleDown,)),
                  mainText: "",
                  secondaryText: "Leave Application",
                ),
              ),
              InkWell(
                onTap: (){
                  Navigator.push(context, MaterialPageRoute(builder: (context) {
                    return DateSheet();
                  },));
                },
                child: SizedBox(
                  width: size.width*0.4,
                  child: CustomCard(
                    circularAvatar: SizedBox(
                        width: size.width*0.13,
                        height: size.width*0.13,
                        child: Image.asset("assets/Navigation/Home/DateSheet.png",fit: BoxFit.scaleDown,)),
                    mainText: "",
                    secondaryText: "Date Sheeet",
                  ),
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              InkWell(
                onTap: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) {
                    return SchoolGallery();
                  },));
                },
                child: SizedBox(
                  width: size.width*0.4,
                  child: CustomCard(
                    circularAvatar: SizedBox(
                        width: size.width*0.13,
                        height: size.width*0.13,
                        child: Image.asset("assets/Navigation/Home/SchoolGallery.png",fit: BoxFit.scaleDown,)),
                    mainText: "",
                    secondaryText: "School Gallery",
                  ),
                ),
              ),
              InkWell(
                onTap: (){
                  print("tapper");
                  Navigator.push(context, MaterialPageRoute(builder: (context) {
                    return ChangePassword();
                  },));
                },

                child: SizedBox(
                  width: size.width*0.4,
                  child: CustomCard(
                    circularAvatar: SizedBox(
                        width: size.width*0.13,
                        height: size.width*0.13,
                        child: Image.asset("assets/Navigation/Home/ChangePassword.png",fit: BoxFit.scaleDown,)),
                    mainText: "",
                    secondaryText: "Change Password",
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }


}
