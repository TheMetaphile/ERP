import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:student/StudentModule/Fees/PreviousSession.dart';
import 'package:student/StudentModule/Fees/TrarnsactionHistory.dart';

import '../../CustomTheme/customTheme.dart';
import 'fees.dart';

class FeesDue extends StatefulWidget {
  const FeesDue({super.key, required this.email});
  final String email;

  @override
  State<FeesDue> createState() => _FeesDueState();
}

class _FeesDueState extends State<FeesDue> {
  List<String> cardType=[
    "Fees Status",
    "Transaction History",
    "Previous Session",
  ];
  int currentIndex =0 ;
  //List<String> cardImage=["assets/Images/TeacherDashboard/Dashboard_time_table.png","assets/Images/Class Activity/Dashboard_result.png","assets/Images/Class Activity/feesStatus.png","assets/Images/Class Activity/leave.png","assets/Images/Class Activity/studentAttendance.png"];


  @override
  Widget build(BuildContext context) {
    List screens= [ Fees(email: widget.email,),TransactionHistory(),PreviousSession(email: widget.email,)];
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj=CustomTheme(size);
    return Scaffold(
        backgroundColor: CustomTheme.whiteColor,
        appBar: AppBar(
          iconTheme: IconThemeData(color: CustomTheme.blackColor,),
          leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back_ios),
          ),
          backgroundColor:  CustomTheme.primaryColor,

          title: Text("Fees Due",style: GoogleFonts.openSans(color:  CustomTheme.blackColor,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

        ),
        body:   Padding(
          padding: const EdgeInsets.symmetric(horizontal: 3.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height*0.005,),
              SizedBox(
                height: size.height*0.05,
                child: ListView.builder(
                  shrinkWrap: true,
                  scrollDirection: Axis.horizontal,
                  itemCount: cardType.length,
                  itemBuilder: (context, index) {
                    return  Card(
                      color:  Color.fromRGBO(216,180,254,1),
                      shape: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                          borderSide: BorderSide(width: 0.5)
                      ),
                      child: InkWell(
                        onTap: (){
                          setState(() {
                            currentIndex = index;
                          });
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 10.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              //Image.asset(cardImage[index],height: size.height*0.02,fit: BoxFit.contain,color: CustomTheme.blackColor,),
                              SizedBox(
                                width: size.width*0.02,
                              ),
                              Text(cardType[index],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:CustomTheme.blackColor),)

                            ],
                          ),
                        ),
                      ),
                    );
                  },),
              ),
              Expanded(child: screens[currentIndex])
            ],
          ),
        )


    );
  }
}

