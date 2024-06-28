import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/StudentApi.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:untitled/admin-module/StudentPannel/studentEdit.dart';

class StudentDetail extends StatefulWidget {

  const StudentDetail({super.key,required this.email, });
 final String email;


  @override
  State<StudentDetail> createState() => _StudentDetailState();
}

class _StudentDetailState extends State<StudentDetail> {
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
  Map<String, dynamic>? studentData;
  final studentApiobj=StudentApi();


  Future<void> fetchTeacherData() async {

    SharedPreferences pref=await SharedPreferences.getInstance();
    try {
      final accessToken = pref.getString("accessToken");
       final student = await studentApiobj.fetchStudentData(accessToken!, widget.email);
      setState(() {
        studentData=student;
      });
    } catch (e) {
      print('Error: $e');
    }finally{
      assign();
    }
  }
  List<List<String>> studentDetail=[];
  void assign(){
   studentDetail = [

    ['Name', studentData?["name"] ??""],
    ['Roll Number',studentData?["rollNumber"] ??""],
    ['Email',studentData?["email"] ??"" ],
    ['Class', studentData?["currentClass"] ??""],
    ['Section',studentData?["section"] ??" "],
    ['AadhaarNumber',studentData?["aadhaarNumber"] ??"" ],
    ['DOB',studentData?["DOB"] ??"" ],
    ['Gender',studentData?["gender"] ??"" ],
    ['Religion',studentData?["religion"] ??"" ],
    ['ProfileLink',studentData?["profileLink"] ??"" ],
    ['AcademicYear',studentData?["academicYear"] ??"" ],
    ['AdmissionClass',studentData?["admissionClass"] ??"" ],
    ['AdmissionDate',studentData?["admissionDate"] ??"" ],
    ['EmergencyContactNumber',studentData?["emergencyContactNumber"] ??"" ],
    ['OldAdmissionNumber',studentData?["oldAdmissionNumber"] ??"" ],
    ['FatherEmailId',studentData?["fatherEmailId"] ??"" ],
    ['MotherEmailId',studentData?["motherEmailId"] ??"" ],
    ['MotherName',studentData?["motherName"] ??"" ],
    ['FathersOccupation',studentData?["fathersOccupation"] ??"" ],
    ['MotherOccupation',studentData?["motherOccupation"] ??"" ],
    ['FatherPhoneNumber',studentData?["fatherPhoneNumber"] ??"" ],
    ['MotherPhoneNumber',studentData?["motherPhoneNumber"] ??"" ],
    ['PermanentAddress',studentData?["permanentAddress"] ??"" ],
    ['BloodGroup',studentData?["bloodGroup"] ??"" ],
    ['GuardiansName',studentData?["guardiansName"] ??"" ],
    ['GuardiansOccupation',studentData?["guardiansOccupation"] ??"" ],
    ['GuardiansPhoneNumber',studentData?["guardiansPhoneNumber"] ??"" ],
  ];
}
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    if (studentData == null) {
      return  Scaffold(body:  Center(child: LoadingAnimationWidget.threeArchedCircle(
        color: Colors.blue,
        size: 100,
      )));
    }
    return Scaffold(
      backgroundColor: const Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
        ),
        title:   Text("Student Details",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
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
                              backgroundImage: NetworkImage(studentData?["profileLink"]),
                            ),
                              SizedBox(width: size.width*0.02,),
                            SizedBox(
                              width: size.width*0.35,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(studentDetail![0][1],style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),
                                  Text(studentDetail![3][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                 Text(studentDetail![1][1] ,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),

                                ],
                              ),
                            ),
                            const Expanded(child: SizedBox()),
                            TextButton(
                                style: TextButton.styleFrom(side: const BorderSide(width: 1,color: Colors.grey),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                                onPressed: (){
                          //Navigator.push(context, MaterialPageRoute(builder: (context) =>  StudentEditDetails(name: studentDetail![0][1], dob: studentDetail![6][1], address: studentDetail![22][1], phoneNumber: studentDetail![0][1], email: null, fatherName: null, motherName: null, fatherOcupation: null, motherOcupation: null, fatherPhNo: null, motherPhNo: null, clas: null, section: null,),));
                             Navigator.push(context, MaterialPageRoute(builder: (context) => StudentEdit(studentDetail: studentDetail,),));
                                },
                                child: Row(
                                  children: [
                                    Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                    const Icon(Icons.edit,color: Colors.black,),
                                  ],
                                )
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.012,),
                  Card(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          width: size.width*0.3,
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
                                      color: Colors.green,
                                      strokeWidth: 10,
                                      backgroundColor: Colors.red,

                                    ),
                                  ),
                                  Text("Rs.14000", style: TextStyle(
                                      fontSize: size.width*0.04,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Text("Total Fees", style: TextStyle(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),)
                            ],
                          ),
                        ),
                        Container(
                          width: size.width*0.3,
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
                                      color: Colors.green,
                                      strokeWidth: 10,
                                      backgroundColor: Colors.red,

                                    ),
                                  ),
                                  Text("Rs.7000", style: TextStyle(
                                      fontSize: size.width*0.04,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Text("Paid Fees", style: TextStyle(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),)
                            ],
                          ),
                        ),
                        Container(
                          width: size.width*0.3,
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
                                      color: Colors.green,
                                      strokeWidth: 10,
                                      backgroundColor: Colors.red,

                                    ),
                                  ),
                                  Text("Rs.7000", style: TextStyle(
                                      fontSize: size.width*0.04,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Text("Due Fees", style: TextStyle(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),)
                            ],
                          ),
                        ),

                      ],
                    ),
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: size.height*0.01,),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Card(
                              margin: const EdgeInsets.all(0),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                              child: Column(
                                children: [
                                  Container(

                                    height: size.height*0.05,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(8),
                                      color:const Color(0xFFE9F0FF),
                                    ),
                                    padding: const EdgeInsets.symmetric(horizontal: 5),

                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        SizedBox(
                                            width:size.width*0.44,
                                            child: Text("All  Details",textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                                        Card(
                                          margin: const EdgeInsets.all(0),
                                          child: TextButton(
                                             // style: TextButton.styleFrom(side: BorderSide(width: 2,color: Colors.black),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                                              onPressed: (){
                                                Navigator.push(context, MaterialPageRoute(builder: (context) => StudentEdit(studentDetail:studentDetail,),));
                                              },
                                              child: Row(
                                                children: [
                                                  Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                                  const Icon(Icons.edit,color: Colors.black,),
                                                ],
                                              )
                                          ),
                                        )


                                      ],
                                    ),
                                  ),
                                  ListView.builder(
                                    shrinkWrap: true,
                                    itemCount: studentDetail!.length,
                                    physics: const NeverScrollableScrollPhysics(),
                                    itemBuilder: (context, index) {

                                      return Container(
                                        height: size.height*0.05,
                                        padding: const EdgeInsets.symmetric(horizontal: 5),
                                        child: Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                                            SizedBox(

                                                width:size.width*0.44,
                                                child: Text(studentDetail![index][0].toString(),textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                            SizedBox(

                                                width:size.width*0.4,
                                                child: Text(studentDetail![index][1].toString(),textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),

                                          ],
                                        ),
                                      );

                                    },)
                                ],
                              ),
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TextButton(
                        style: TextButton.styleFrom(backgroundColor: const Color(0xFFF29D9D)),
                        onPressed: (){}, child: Text("Remove Student ",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),),
                      Container(
                        width: size.width*0.3,
                        child: TextButton(
                          style: TextButton.styleFrom(backgroundColor: const Color(0xFF9DCEF2)),
                          onPressed: (){}, child: Text("Save ",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),),
                      )

                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
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
