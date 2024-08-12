import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';
import 'Lecuture Substitute/lectureSubstitute.dart';
import 'NoteBookRecordHod/noteBookRecordHod.dart';
import 'SubstituteClassTeacher/substituteCLassTeacher.dart';
import 'WeeklyPlan/weeklyPlan.dart';

class Hod extends StatefulWidget {
  const Hod({super.key});

  @override
  State<Hod> createState() => _HodState();
}

class _HodState extends State<Hod> {
  List<String> cardType=[
    "Weekly Plan",
    "NoteBook Record",
    "Substitute Class Teacher",
    "Lecture Substitute"


  ];
  int currentIndex =0 ;
  List<String> cardImage=["assets/Images/Class Activity/Dashboard_result.png","assets/Images/TeacherDashboard/NoteBookRecord.png","assets/Images/Class Activity/leave.png","assets/Images/Class Activity/studentAttendance.png"];
  List screens=const [ WeeklyPlanHod(),NoteBookRecordHod(),SubstituteClassTeacher(),LectureSubstitute()];
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        backgroundColor: themeObj.textWhite,
        appBar: AppBar(
          iconTheme: IconThemeData(color: themeObj.textBlack,),
          leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back_ios),
          ),
          backgroundColor:  themeObj.primayColor,

          title: Text("Coordinator Panel",style: GoogleFonts.openSans(color:  themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

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
                              Image.asset(cardImage[index],height: size.height*0.02,fit: BoxFit.contain,color: themeObj.textBlack,),
                              SizedBox(
                                width: size.width*0.02,
                              ),
                              Text(cardType[index],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:themeObj.textBlack),)

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
