import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/Classs%20Activity/StudentFees/studentFeesStatus.dart';
import 'package:untitled/teacher-module/Classs%20Activity/StudentLeave/studentLeave.dart';
import 'package:untitled/teacher-module/Classs%20Activity/studentAttendance/studentAttendance.dart';

import '../../utils/theme.dart';
import 'ClassActivityTime Table/TimeTable.dart';
import 'Result/result.dart';

class ClassActivity extends StatefulWidget {
  const ClassActivity({super.key});

  @override
  State<ClassActivity> createState() => _ClassActivityState();
}

class _ClassActivityState extends State<ClassActivity> {
  List<String> cardType=[
      "TimeTable",
      "Result",
      "Fees Status",
    "Student Leave",
    "Student Attendance"


  ];
  int currentIndex =0 ;
  List<String> cardImage=["assets/Images/TeacherDashboard/Dashboard_time_table.png","assets/Images/Class Activity/Dashboard_result.png","assets/Images/Class Activity/feesStatus.png","assets/Images/Class Activity/leave.png","assets/Images/Class Activity/studentAttendance.png"];
  List screens=const [ TimeTable(),ReportCard(),StudentFeesStatus(),StudentLeaves(),StudentAttendance()];
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

          title: Text("Class Activity",style: GoogleFonts.openSans(color:  themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

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
