import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class AddNewTeacher extends StatefulWidget {
  const AddNewTeacher({super.key});

  @override
  State<AddNewTeacher> createState() => _AddNewTeacherState();
}

class _AddNewTeacherState extends State<AddNewTeacher> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();


  @override
  void initState() {
    super.initState();

  }


  TextEditingController firstName=TextEditingController();
  TextEditingController lastName=TextEditingController();
  TextEditingController phoneNumber=TextEditingController();
  TextEditingController email=TextEditingController();
  TextEditingController city=TextEditingController();
  TextEditingController houseNo=TextEditingController();
  TextEditingController landMark=TextEditingController();
  TextEditingController expertise=TextEditingController();
  TextEditingController dob=TextEditingController();
  TextEditingController education=TextEditingController();

  String? gender;
  List<String> genderOptions = [
    'Male',
    'Female',
  ];
  String? religion;
  List<String> religionoptions = [
    'Hindu',
    'Muslim',
    'Sheikh',
    'Cristian',
  ];
   String? experience;
  List<String> experienceoptions = [
    '0-3',
    '3-6',
    '6-9',
    '9-12',
  ];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
        title:   Text("Fill Teacher Detail",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: secondStackLayer(size,context),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.08,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Card(
                margin: EdgeInsets.all(0),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("First Name *",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(

                              maxLines: 1,

                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: firstName,
                            ),

                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Last Name*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(

                              maxLines: 1,
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: lastName,
                            ),
                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Gender*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                              SizedBox(height: size.height*0.01,),
                              Container(
                                width: size.width*0.35,
                                height: size.height*0.055,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(color: Colors.grey,width: 1)
                                ),
                                child: DropdownButton<String>(
                                  isExpanded: true,
                                  borderRadius: BorderRadius.circular(12),
                                  hint: Text("Please Select..",),

                                  padding: EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp),
                                  underline: Container(),
                                  value: gender,
                                  onChanged: (newValue) {
                                    setState(() {
                                      gender = newValue!;
                                    });
                                  },
                                  items: genderOptions.map((String option) {
                                    return DropdownMenuItem<String>(
                                      value: option,
                                      child: Text(option),
                                    );
                                  }).toList(),
                                ),
                              ),
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Religion*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                              SizedBox(height: size.height*0.01,),
                              Container(
                                width: size.width*0.35,
                                height: size.height*0.055,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(color: Colors.grey,width: 1)
                                ),
                                child: DropdownButton<String>(
                                  isExpanded: true,
                                  borderRadius: BorderRadius.circular(12),
                                  hint: Text("Please Select..",),

                                  padding: EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp),
                                  underline: Container(),
                                  value: religion,
                                  onChanged: (newValue) {
                                    setState(() {
                                      religion = newValue!;
                                    });
                                  },
                                  items: religionoptions.map((String option) {
                                    return DropdownMenuItem<String>(
                                      value: option,
                                      child: Text(option),
                                    );
                                  }).toList(),
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
                          Text("City",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(
                              maxLines: 1,
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: city,
                            ),
                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("House No.*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(
                              maxLines: 1,
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: houseNo,
                            ),

                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Land Mark*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(
                              maxLines: 1,
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: landMark,
                            ),
                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Expertise*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(
                              maxLines: 1,
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: expertise,
                            ),
                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("DOB*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            child: TextField(
                              maxLines: 1,
                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                              ),
                              controller: dob,
                            ),

                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Experience*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.055,
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: Colors.grey,width: 1)
                            ),
                            child: DropdownButton<String>(
                              isExpanded: true,
                              borderRadius: BorderRadius.circular(12),
                              hint: Text("Please Select..",),

                              padding: EdgeInsets.all(8),
                              icon: Icon(Icons.keyboard_arrow_down_sharp),
                              underline: Container(),
                              value: experience,
                              onChanged: (newValue) {
                                setState(() {
                                  experience = newValue!;
                                });
                              },
                              items: experienceoptions.map((String option) {
                                return DropdownMenuItem<String>(
                                  value: option,
                                  child: Text(option),
                                );
                              }).toList(),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Education*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            child: TextField(
                              maxLines: 6,

                              decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey)),
                                  hintText: "Write up to 200 words"
                              ),
                              controller: education,
                            ),

                          )
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),

                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Container(
                            width: size.width*0.3,
                            child: ElevatedButton(
                                style: ElevatedButton.styleFrom(shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                onPressed: (){},
                                child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                          ),
                          Container(
                            width: size.width*0.3,
                            child: ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6F8DF8),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                onPressed: (){},
                                child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                          ),

                        ],
                      ),
                    ],
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
