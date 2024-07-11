import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/Trash/studentTerm1Result.dart';

import '../../../APIs/StudentsData/StudentApi.dart';
import '../../../APIs/StudentsData/student.dart';
import '../../../utils/theme.dart';
import 'resultPdf.dart';


class ReportCard extends StatefulWidget {
  const ReportCard({super.key});

  @override
  State<ReportCard> createState() => _ReportCardState();
}

class _ReportCardState extends State<ReportCard> {
   Future<List<Student>>? futureStudents;
  CustomTheme themeObj=CustomTheme();
  String? _selectTerm;
  List<String> termOption = [
    '1',
    '2',
  ];
  bool term1Selected=true;
  bool term2Selected=false;

  TextEditingController addmissionId=TextEditingController();
  TextEditingController studentName=TextEditingController();
  TextEditingController clas=TextEditingController();
  TextEditingController academicYear=TextEditingController();
  TextEditingController rollNumber=TextEditingController();
  TextEditingController motherName=TextEditingController();
  TextEditingController fatherName=TextEditingController();
  TextEditingController contactNumber=TextEditingController();
  TextEditingController totalAttendance=TextEditingController();
  TextEditingController presentAttendance=TextEditingController();
  TextEditingController gpa=TextEditingController();
  TextEditingController subject=TextEditingController();
  TextEditingController number=TextEditingController();
  TextEditingController grade=TextEditingController();
  DateTime? dateOfBirth;
  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: dateOfBirth,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != dateOfBirth) {
      setState(() {
        dateOfBirth = picked;
      });
    }
  }
  Future<void>_addNewResultPopup( BuildContext context ,Size size)async {
    bool isChecked = false;
    return showDialog(
      context: context,
      builder: (context) {
        return  StatefulBuilder(
          builder: (context, setState) {
            return SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 3.0),
                      child: Column(
                        children: [
                          SizedBox(height: size.height*0.037,),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Fill the Student Records",
                                style: TextStyle(
                                  color: Colors.blue,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.06,
                                ),
                              ),
                              SizedBox(height: size.height*0.01,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Admission ID*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: addmissionId,
                                        ),

                                      )
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Student Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: studentName,
                                        ),

                                      )
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Class*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: clas,
                                        ),

                                      )
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Academic Year*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: academicYear,
                                        ),

                                      )
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Roll Number*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: rollNumber,
                                        ),

                                      )
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Date od Birth*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                          height: size.height*0.055,
                                          width: size.width*0.45,
                                          decoration: BoxDecoration(
                                              borderRadius: BorderRadius.circular(12),
                                              border: Border.all(color: Colors.grey)

                                          ),
                                          child: TextButton(
                                            onPressed: (){
                                              _selectDate(context).then((_) {
                                                setState(() {});
                                              });
                                            },
                                            child:  dateOfBirth==null?
                                            Text("Please Select",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),):
                                            Text("${dateOfBirth.toString()}",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),

                                          )
                                      )
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Mother's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: motherName,
                                        ),

                                      )
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Father's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: fatherName,
                                        ),

                                      )
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(left: 8.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text("Contact Number*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                        SizedBox(height: size.height*0.01,),
                                        Container(
                                          height: size.height*0.055,
                                          width: size.width*0.45,
                                          child: TextField(

                                            maxLines: 1,
                                            keyboardType: TextInputType.number,
                                            decoration: InputDecoration(

                                                contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                            ),
                                            controller: contactNumber,
                                          ),

                                        )
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: size.height*0.01,),
                              Text(
                                "Attendance",
                                style: TextStyle(
                                  color: Colors.blue,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.06,
                                ),
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Card(
                                    child: SizedBox(
                                      width: size.width*0.45,
                                      height: size.height*0.055,
                                      child: DropdownButton<String>(
                                        isExpanded: true,
                                        borderRadius: BorderRadius.circular(12),
                                        hint: const Text("Term",),
                                        alignment: Alignment.center,
                                        padding: EdgeInsets.all(8),
                                        icon: Icon(Icons.keyboard_arrow_down_sharp),
                                        underline: Container(),
                                        value: _selectTerm,
                                        onChanged: (newValue) {
                                          setState(() {
                                            _selectTerm = newValue!;
                                          });
                                        },
                                        items: termOption.map((String option) {
                                          return DropdownMenuItem<String>(
                                            value: option,
                                            child: Text(option,overflow: TextOverflow.ellipsis,),
                                          );
                                        }).toList(),
                                      ),
                                    ),
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Total Attendance*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: totalAttendance,
                                        ),

                                      )
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(left: 8.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text("Present Attendance*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                        SizedBox(height: size.height*0.01,),
                                        Container(
                                          height: size.height*0.055,
                                          width: size.width*0.45,
                                          child: TextField(

                                            maxLines: 1,

                                            decoration: InputDecoration(
                                                contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                            ),
                                            controller: presentAttendance,
                                          ),

                                        )
                                      ],
                                    ),
                                  ),

                                ],
                              ),

                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: size.height*0.01,),
                              Text(
                                "Academic Performance",
                                style: TextStyle(
                                  color: Colors.blue,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.06,
                                ),
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Card(
                                    child: SizedBox(
                                      width: size.width*0.45,
                                      height: size.height*0.055,
                                      child: DropdownButton<String>(
                                        isExpanded: true,
                                        borderRadius: BorderRadius.circular(12),
                                        hint: const Text("Term",),
                                        alignment: Alignment.center,
                                        padding: EdgeInsets.all(8),
                                        icon: Icon(Icons.keyboard_arrow_down_sharp),
                                        underline: Container(),
                                        value: _selectTerm,
                                        onChanged: (newValue) {
                                          setState(() {
                                            _selectTerm = newValue!;
                                          });
                                        },
                                        items: termOption.map((String option) {
                                          return DropdownMenuItem<String>(
                                            value: option,
                                            child: Text(option,overflow: TextOverflow.ellipsis,),
                                          );
                                        }).toList(),
                                      ),
                                    ),
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("GPA*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: gpa,
                                        ),

                                      )
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Subject*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: subject,
                                        ),

                                      )
                                    ],
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Number*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      SizedBox(height: size.height*0.01,),
                                      Container(
                                        height: size.height*0.055,
                                        width: size.width*0.45,
                                        child: TextField(

                                          maxLines: 1,

                                          decoration: InputDecoration(
                                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                          ),
                                          controller: number,
                                        ),

                                      )
                                    ],
                                  ),

                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(left: 8.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text("Grade*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                        SizedBox(height: size.height*0.01,),
                                        Container(
                                          height: size.height*0.055,
                                          width: size.width*0.45,
                                          child: TextField(

                                            maxLines: 1,

                                            decoration: InputDecoration(
                                                contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                            ),
                                            controller: grade,
                                          ),

                                        )
                                      ],
                                    ),
                                  ),


                                ],
                              ),

                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Container(
                                width: size.width*0.3,
                                child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(backgroundColor:Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                    onPressed: (){},
                                    child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                              ),
                              Container(
                                width: size.width*0.3,
                                child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                    onPressed: (){
                                      Navigator.pop(context);
                                    },
                                    child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                              ),

                            ],
                          ),
                          SizedBox(height: size.height*0.01,),


                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );

      },);

  }
  StudentApi studentObj=StudentApi();

  @override
  void initState() {
    super.initState();
    getBasicDetails();
  }
  String? accessToken;
  String? currentClass;
  String? section;
  Future<void> getBasicDetails() async {
   try{
     SharedPreferences pref = await SharedPreferences.getInstance();
     accessToken = pref.getString("accessToken");
     currentClass = pref.getString("clas");
     section = pref.getString("section");
     if(currentClass==null){
       currentClass="class";
     }
   }catch(e){
     print("error $e");
   }finally{
     setState(() {
       futureStudents = studentObj.fetchStudents(accessToken! , currentClass!, section!, 0, 16);

     });
   }
  }
  @override
  Widget build(BuildContext context) {
    print(futureStudents);
    print(currentClass);
    print(section);
    print(section);


    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      // appBar: AppBar(
      //   backgroundColor: themeObj.primayColor,
      //   leading: IconButton(
      //     onPressed: (){
      //       Navigator.pop(context);
      //     },
      //     icon: Icon(Icons.arrow_back_ios),
      //   ),
      //   title: Text("Report Card",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      //   actions: [
      //     ElevatedButton.icon(
      //       icon: Icon(Icons.edit, size: 18,color: themeObj.textBlack,),
      //       label: Text("Edit",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      //       style: ElevatedButton.styleFrom(
      //         padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      //         backgroundColor: themeObj.secondayColor,
      //         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      //       ), onPressed: () {  },
      //     )
      //
      //   ],
      // ),
      body:futureStudents==null?
      Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      ):
      SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(

          children: [
            SingleChildScrollView(
              child: Column(

                children: [
                  SizedBox(height: size.height * 0.01),
                  Padding(
                    padding: const EdgeInsets.only(left: 50.0),
                    child: Text(
                      'Swipe left and right to see all details',
                      style: GoogleFonts.openSans(
                          fontStyle: FontStyle.italic,
                          color: Colors.grey[600],
                          fontSize: size.width * 0.035),
                    ),
                  ),
                  SizedBox(height: size.height * 0.02),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Column(

                      children: [
                        Container(

                          width: size.width * 1.2,
                          color: Color.fromRGBO(233, 213, 255, 1),
                          child: Row(
                            children: [
                              _buildHeaderCell("Roll No.", size),
                              _buildHeaderCell("Name", size),
                              SizedBox(width: size.width*0.04,),
                              Padding(
                                padding: const EdgeInsets.only(left: 18.0),
                                child: _buildHeaderCell("Email", size),
                              ),
                            ],
                          ),
                        ),
                        const Divider(thickness: 2, height: 2, color: Colors.black),
                        FutureBuilder<List<Student>>(
                          future: futureStudents,
                          builder: (context, snapshot) {
                            if (snapshot.connectionState == ConnectionState.waiting) {
                              return Padding(
                                padding: const EdgeInsets.only(left: 15.0,top: 80),
                                child: LoadingAnimationWidget.threeArchedCircle(
                                  color: themeObj.primayColor,
                                  size: 50,
                                ),
                              );
                            } else if (snapshot.hasError) {
                              return Text('Error: ${snapshot.error}');
                            } else if (snapshot.hasData) {
                              return   Container(
                                height: size.height * 0.75,
                                width: size.width * 1.14,
                                child: ListView.separated(
                                  shrinkWrap: true,
                                  itemBuilder: (context, index) {
                                    final student = snapshot.data![index];
                                    return InkWell(
                                      onTap: (){
                                         Navigator.push(context, MaterialPageRoute(builder: (context) => ResultPdf(email: student.email,)));
                                      },
                                      child: Row(
                                        children: [

                                          _buildDataCell('0${student.rollNumber}', size),
                                          Row(
                                            children: [
                                              CircleAvatar(
                                                radius: size.width * 0.08,
                                                backgroundImage: NetworkImage(student.profileLink ?? 'https://example.com/default-profile-pic.jpg'),
                                              ),
                                              SizedBox(width: size.width*0.02,),
                                              _buildDataCell(student.name, size),
                                            ],
                                          ),
                                              SizedBox(width: size.width*0.03,),
                                          _buildDataCell(student.email, size),
                                        ],
                                      ),
                                    );
                                  },
                                  separatorBuilder: (context, index) => Divider(),
                                  itemCount: snapshot.data!.length,
                                ),
                              );
                            } else {
                              return Text('No data available');
                            }
                          },
                        ),

                      ],
                    ),
                  )
                ],
              ),
            ),
            SizedBox(height: size.height*0.02,),
          ],
        ),
      ),
        floatingActionButton:  SizedBox(
          width: size.width*0.25,
          child: TextButton(onPressed: (){
            _addNewResultPopup(context,size);
          },
            style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(233,213,255,1)),
            child:Row(
                children: [

                  Icon(Icons.add,color: themeObj.textBlack,),
                  SizedBox(width: size.width*0.02,),
                Text("Add",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.036),),

                ],
                ),),
        )
    );
  }
  Widget _buildHeaderCell(String text, Size size) {
    return Container(
      width: size.width * 0.36,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: themeObj.textBlack,
          fontWeight: FontWeight.w600,
          fontSize: size.width * 0.04,
        ),
      ),
    );
  }

  Widget _buildDataCell(String text, Size size) {
    return Container(

      width: size.width * 0.3,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: themeObj.textBlack,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.035,
        ),
      ),
    );
  }
}
