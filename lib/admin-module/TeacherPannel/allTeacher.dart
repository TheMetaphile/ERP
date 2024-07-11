import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/TeacherData/TeacherApi.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherDetails.dart';
import 'package:untitled/utils/theme.dart';

import '../../APIs/TeacherData/teacher.dart';

class AllTeacher extends StatefulWidget {
  const AllTeacher({super.key});

  @override
  State<AllTeacher> createState() => _AllTeacherState();
}

class _AllTeacherState extends State<AllTeacher> {
  List<Teacher>? _teachers;
  final teachersObj=TeacherApi();

  @override
  void initState() {
    super.initState();
    // _fetchTeachers();
  }
  Future<void> _fetchTeachers() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
    try {
       final accessToken = pref.getString("accessToken");
      final teachers = await teachersObj.fetchTeachers(accessToken!);
      setState(() {
        _teachers = teachers;
      });
    } catch (e) {
      print('Error: $e');
    }
  }
  List<String> subjects=[
    "Hindi",
    "English",
    "Maths"
  ];
  List<Map<String,dynamic>> teacherData=[
    {
      "name":"Ankit Sharma",
      "profileLink":Icons.person,
      "employeeID":"125",
    },

    {
      "name":"Ashish Sharma",
      "profileLink":Icons.person,
      "employeeID":"105",
    },
    {
      "name":"Bhanu",
      "profileLink":Icons.person,
      "employeeID":"127",
    },
    {
      "name":"Manish Sharma",
      "profileLink":Icons.person,
      "employeeID":"15",
    },
    {
      "name":"Ajay Sharma",
      "profileLink":Icons.person,
      "employeeID":"125",
    },
    {
      "name":"Raju ",
      "profileLink":Icons.person,
      "employeeID":"102",
    },
    {
      "name":"Rajesh ",
      "profileLink":Icons.person,
      "employeeID":"152",
    },

  ];
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    // if (_teachers == null) {
    //   return  Scaffold(body:  Center(child: LoadingAnimationWidget.threeArchedCircle(
    //      color: Colors.blue,
    //     size: 100,
    //   )));
    // }
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme:  IconThemeData(color:themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
        ),
        title:   Text("All Teachers",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

      ),
      body:   SingleChildScrollView(

        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 3),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Card(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),),
                      child: Container(
                        width: size.width*0.44,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(height: size.height*0.02,),
                            Stack(
                              alignment: Alignment.center,
                              children: <Widget>[
                                Container(
                                  height: size.width*0.25,
                                  width: size.width*0.25,
                                  child: const CircularProgressIndicator(
                                    value: 0.5,
                                    strokeWidth: 10,
                                    color:   Color(0xFFD850B2),
                                    backgroundColor:Color(0xFF5066D8),

                                  ),
                                ),
                                Text("300", style: TextStyle(
                                    fontSize: size.width*0.07,
                                    fontWeight: FontWeight.w400// Adjust font size as needed
                                ),)
                              ],
                            ),
                            SizedBox(height: size.height*0.02,),
                            Text("Total Teachers", style: TextStyle(
                                fontSize: size.width*0.05,
                                fontWeight: FontWeight.w400// Adjust font size as needed
                            ),)
                          ],
                        ),
                      ),
                    ),
                    Card(
                      child:Container(
                        width: size.width*0.44,

                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(height: size.height*0.02,),
                            Stack(
                              alignment: Alignment.center,
                              children: <Widget>[
                                Container(
                                  height: size.width*0.25,
                                  width: size.width*0.25,
                                  child: const CircularProgressIndicator(
                                    value: 1,
                                    strokeWidth: 10,
                                    color:   Color(0xFFD850B2),
                                    backgroundColor:Color(0xFF5066D8),
                                  ),
                                ),
                                Text("150", style: TextStyle(
                                    fontSize: size.width*0.07,
                                    fontWeight: FontWeight.w400// Adjust font size as needed
                                ),)
                              ],
                            ),
                            SizedBox(height: size.height*0.02,),
                            Text("Female Teacher", overflow:TextOverflow.ellipsis,style: TextStyle(
                                fontSize: size.width*0.05,
                                fontWeight: FontWeight.w400// Adjust font size as needed
                            ),)
                          ],
                        ),
                      ),
                    ),
                    Card(
                      child:Container(
                        width: size.width*0.44,

                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(height: size.height*0.02,),
                            Stack(
                              alignment: Alignment.center,
                              children: <Widget>[
                                Container(
                                  height: size.width*0.25,
                                  width: size.width*0.25,
                                  child: const CircularProgressIndicator(
                                    value: 0,
                                    strokeWidth: 10,
                                    color:   Color(0xFFD850B2),
                                    backgroundColor:Color(0xFF5066D8),
                                  ),
                                ),
                                Text("150", style: TextStyle(
                                    fontSize: size.width*0.07,
                                    fontWeight: FontWeight.w400// Adjust font size as needed
                                ),)
                              ],
                            ),
                            SizedBox(height: size.height*0.02,),
                            Text("Male Teacher",overflow: TextOverflow.ellipsis, style: TextStyle(
                                fontSize: size.width*0.05,
                                fontWeight: FontWeight.w400// Adjust font size as needed
                            ),)
                          ],
                        ),
                      ),
                    )

                  ],
                ),
              ),
              SizedBox(height: size.height*0.025,),
              Container(

                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Teacher's Data",style: GoogleFonts.openSans(fontSize:size.width*0.06,color:Colors.black,fontWeight:FontWeight.w400),),
                    SizedBox(height: size.height*0.02,),

                    ListView.builder(
                      shrinkWrap: true,
                      itemCount:teacherData.length,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        final particularTeacher=teacherData[index];
                        return Card(
                          child: ExpansionTile(
                            shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),

                            leading: Icon(particularTeacher["profileLink"]),
                            title:Text(particularTeacher["name"],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            subtitle:Text(particularTeacher["employeeID"],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.04,fontWeight:FontWeight.w500),),

                            children: [
                              ListTile(

                                onTap: (){},
                                leading:  Icon(Icons.send,size: size.height*0.035,),
                                title:  Text("Chat",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.045,),),


                              ),
                              ListTile(

                                onTap: (){
                                 Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherDetails(employeID: particularTeacher["employeeID"], name: particularTeacher["name"], profileLink: particularTeacher["profileLink"],),));
                                },
                                leading:   Icon(CupertinoIcons.profile_circled,size: size.height*0.035,),
                                title:   Text("Profile",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.045,),),


                              ),
                              // Card(
                              //   color: Colors.white,
                              //   child: ExpansionTile(
                              //     shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                              //     title: Text("Subjects",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                              //     trailing:  Text("3",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.grey,fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                              //     children: [
                              //       ListView.builder(
                              //         shrinkWrap: true,
                              //         itemCount: subjects.length,
                              //         physics: NeverScrollableScrollPhysics(),
                              //         padding: EdgeInsets.symmetric(horizontal: 10,vertical: 5),
                              //         //  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2,mainAxisExtent: size.height*0.05,mainAxisSpacing: size.height*0.01,crossAxisSpacing: size.width*0.02),
                              //         itemBuilder: (context, index) {
                              //           return ListTile(
                              //             title: Text(subjects[index],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.035,),),
                              //
                              //           );
                              //
                              //         },),
                              //     ],
                              //   ),
                              // ),
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}
