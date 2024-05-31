import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/TeacherData/TeacherApi.dart';
import '../../Charts/classActivity.dart';

class TeacherDetails extends StatefulWidget {
  const TeacherDetails({super.key, required this.employeID, required this.name, required this.profileLink});
  final  String employeID;
  final String name;
  final String profileLink;

  @override
  State<TeacherDetails> createState() => _TeacherDetailsState();
}

class _TeacherDetailsState extends State<TeacherDetails> {

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
    fetchTeacherData();
  }
  Map<String, dynamic>? _userDetails;
  final TeacherApiObj=TeacherApi();


  Future<void> fetchTeacherData() async {

  SharedPreferences pref=await SharedPreferences.getInstance();
  try {
  final accessToken = pref.getString("accessToken");
  final teachers = await TeacherApiObj.fetchTeacherData(accessToken!,widget.employeID);
  setState(() {
    _userDetails=teachers;
  });
  } catch (e) {
  print('Error: $e');
  }
}
  List<List<String>>?teacherDetails;
void assign(){
  teacherDetails=[
    ["Monthly Salary","Rs. 18000"],
    ["Experience",_userDetails?['experience'] ?? ''],
    ["Phone No",'(+91) ${_userDetails?['phoneNumber'] ?? ''}'],
    ["Email",_userDetails?['email'] ?? ''],
    ["Address",_userDetails?['permanentAddress'] ?? ''],
  ];
}

  @override
  Widget build(BuildContext context) {
    assign();
    print(_userDetails);
    Size size=MediaQuery.of(context).size;
    if (_userDetails == null) {
      return  Scaffold(body:  Center(child: LoadingAnimationWidget.threeArchedCircle(
        color: Colors.blue,
        size: 100,
      )));
    }
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:   Text("Teacher Deetails",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Card(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8),),
                    child: Container(
                      width: size.width*0.9,
                      child: TextButton(
                        onPressed: (){},
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            CircleAvatar(
                              radius: size.width*0.1,
                              backgroundImage: NetworkImage(widget.profileLink),
                            ),
                            SizedBox(width: size.width*0.02,),
                            SizedBox(
                              width: size.width*0.35,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(widget.name,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),
                                  // Text("Maths & Hindi Teacher'",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                  Text(widget.employeID,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),

                                ],
                              ),
                            ),
                            Expanded(child: SizedBox()),
                            TextButton(
                                style: TextButton.styleFrom(side: BorderSide(width: 1,color: Colors.grey),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                                onPressed: (){},
                                child: Row(
                                  children: [
                                    Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                    Icon(Icons.edit,color: Colors.black,),
                                  ],
                                )
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                SizedBox(height: size.height*0.02,),
                ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: teacherDetails?.length,
                  itemBuilder: (context, index) {
                  return Card(
                    child: ListTile(
                      leading: Text(teacherDetails![index][0],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                    trailing:  Text(teacherDetails![index][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w500),),

                    ),
                  );
                },),
                  Card(
                    child: Container(
                      padding: EdgeInsets.symmetric(vertical: 8),
                      width: size.width,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(left:12.0),
                            child: Text("Education",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                          ),
                         Row(
                           children: [
                             SizedBox(width: size.width*0.04,),
                             Text(_userDetails?['education'] ?? '',style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                            SizedBox(width: size.width*0.02,),
                             Text("(2013-2017)",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w500),),

                           ],
                         ),

                        ],
                      ),
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

