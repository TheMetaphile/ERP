import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:untitled/utils/theme.dart';

class NoticeBoard extends StatefulWidget {
  const NoticeBoard({super.key});

  @override
  State<NoticeBoard> createState() => _NoticeBoardState();
}

class _NoticeBoardState extends State<NoticeBoard> {

CustomTheme themeObj=CustomTheme();
bool allSelected = true;
bool teacherSelected = false;
bool studentSelected = false;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor:themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text("Notice Board",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      ),

      body: Container(
        padding: EdgeInsets.all(12),
        width: size.width,
        height: size.height*1,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            Row(
              children: [
                TextButton(
                  onPressed: () {
                    setState(() {
                      allSelected = true;
                      teacherSelected = false;
                      studentSelected = false;
                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: allSelected ? themeObj.primayColor :  Color.fromRGBO(209,213,219,1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "All",
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                SizedBox(width: size.width*0.02,),
                TextButton(
                  onPressed: () {
                    setState(() {
                      allSelected = false;
                      teacherSelected = true;
                      studentSelected = false;
                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: teacherSelected ? themeObj.primayColor : Color.fromRGBO(209,213,219,1),
                    shape: RoundedRectangleBorder(

                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Teacher",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                SizedBox(width: size.width*0.02,),
                TextButton(
                  onPressed: () {
                    setState(() {
                      allSelected = false;
                      teacherSelected = false;
                      studentSelected = true;

                    });
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: studentSelected ? themeObj.primayColor :  Color.fromRGBO(209,213,219,1),
                    shape: RoundedRectangleBorder(

                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Student",
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),

              ],
            ),
            SizedBox(height: size.height*0.02,),
            Expanded(
              child: ListView.builder(
                itemCount: 10,
                itemBuilder: (context, index) {
                  return  Column(
                    children: [
                      Card(
                        margin: EdgeInsets.all(0),
                        elevation: 3,
                        child: Padding(
                          padding:  EdgeInsets.all(size.height*0.02),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("All the Teacher are inform that complete your syllabus as soon as possible.And should also maintain the discipline in your classes",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w500,fontSize: size.width*0.035),),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text("By: Principal",style: TextStyle(color: themeObj.textgrey,fontWeight: FontWeight.w400,fontSize: size.width*0.035),),
                                  Text("March 1,2024",style: TextStyle(color: themeObj.textgrey,fontWeight: FontWeight.w400,fontSize: size.width*0.035),),

                                ],
                              )
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: size.height*0.02,)
                    ],
                  );

                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
