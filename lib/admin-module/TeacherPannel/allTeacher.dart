import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherDetails.dart';

class AllTeacher extends StatefulWidget {
  const AllTeacher({super.key});

  @override
  State<AllTeacher> createState() => _AllTeacherState();
}

class _AllTeacherState extends State<AllTeacher> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
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
    _flag2=false;
  }
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
  }

  List<String> subjects=[
    "Hindi",
    "English",
    "Maths"
  ];
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        title:   Text("All Teachers",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 3),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Card(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),),
                    child: Container(
                      width: size.width,
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
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
                  SizedBox(height: size.height*0.025,),
                  Container(

                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Teacher's Data",style: GoogleFonts.openSans(fontSize:size.width*0.06,color:Colors.black,fontWeight:FontWeight.w400),),
                        SizedBox(height: size.height*0.02,),

                    ListView.builder(
                      shrinkWrap: true,
                      itemCount: 10,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Card(
                          child: ExpansionTile(
                            shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                            leading: Icon(CupertinoIcons.profile_circled,color: Colors.grey,size: size.height*0.06,),
                            title:Text("Ankit Sharma",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.04,fontWeight:FontWeight.w500),),
                            children: [
                              ListTile(

                                onTap: (){},
                                leading:  Icon(Icons.send,size: size.height*0.035,),
                                title:  Text("Chat",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.045,),),


                              ),
                              ListTile(

                                onTap: (){
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherDetails(),));
                                },
                                leading:   Icon(Icons.person,size: size.height*0.035,),
                                title:   Text("Profile",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.045,),),


                              ),
                              Card(
                                color: Colors.white,
                                child: ExpansionTile(
                                  shape: OutlineInputBorder(borderSide: BorderSide(color: Colors.transparent)),
                                  title: Text("Subjects",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                                  trailing:  Text("3",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.grey,fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                                  children: [
                                    ListView.builder(
                                      shrinkWrap: true,
                                      itemCount: subjects.length,
                                      physics: NeverScrollableScrollPhysics(),
                                      padding: EdgeInsets.symmetric(horizontal: 10,vertical: 5),
                                      //  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2,mainAxisExtent: size.height*0.05,mainAxisSpacing: size.height*0.01,crossAxisSpacing: size.width*0.02),
                                      itemBuilder: (context, index) {
                                        return ListTile(
                                          title: Text(subjects[index],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.035,),),

                                        );

                                      },),
                                  ],
                                ),
                              ),
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
        ],
      ),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.15,
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
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25)
                )
            ),
            child: SizedBox(
              height: size.height * 3,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height * 1,
          )
        ],
      ),
    );
  }
}
