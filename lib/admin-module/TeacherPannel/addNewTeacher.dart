import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';

class AddNewTeacher extends StatefulWidget {
  const AddNewTeacher({super.key});

  @override
  State<AddNewTeacher> createState() => _AddNewTeacherState();
}


class _AddNewTeacherState extends State<AddNewTeacher> {


  @override
  void initState() {
    super.initState();

  }


  TextEditingController name=TextEditingController();
  TextEditingController phoneNumber=TextEditingController();
  TextEditingController email=TextEditingController();
  TextEditingController dob=TextEditingController();
  TextEditingController education=TextEditingController();
  TextEditingController aadhaarNo=TextEditingController();
  TextEditingController address=TextEditingController();
  TextEditingController subject=TextEditingController();
  TextEditingController idNo=TextEditingController();
  TextEditingController experience=TextEditingController();
  TextEditingController profileLink=TextEditingController();

  String? selectedGender;
  List<String> genderOption = [
    'Male',
    'Female',
    'Other'
  ];
  String? selectedAdmin;
  List<String> adminOptions = [
    'Male',
    'Female',
    'Other'
  ];
  String? selectedReligion;
  List<String> religionOptions = [
    'Hindu',
    'Muslim',
    'Sheikh',
    'Cristian',
  ];
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme:  IconThemeData(color:themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:   Text("Fill Teacher Detail",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: size.height * 0.01,
            ),
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
                        Text("Name *",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                        SizedBox(height: size.height*0.01,),
                        Container(
                          height: size.height*0.055,
                          child: TextField(

                            maxLines: 1,

                            decoration: InputDecoration(
                                contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                            ),
                            controller: name,
                          ),

                        )
                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Gender*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              decoration: BoxDecoration(
                                  border: Border.all(color:themeObj.textgrey),
                                  borderRadius: BorderRadius.circular(8)

                              ),
                              child: DropdownButton<String>(
                                isExpanded: true,
                                borderRadius: BorderRadius.circular(12),

                                hint: Text("Select Gender",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                alignment: Alignment.center,
                                padding: EdgeInsets.all(8),
                                icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                underline: Container(),
                                value: selectedGender,
                                onChanged: (newValue) {
                                  setState(() {
                                    selectedGender = newValue!;
                                  });
                                },
                                items: genderOption.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                  );
                                }).toList(),
                              ),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Email*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:  themeObj.textgrey))
                                ),
                                controller: email,
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
                            Text("Admin*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              decoration: BoxDecoration(
                                  border: Border.all(color:themeObj.textgrey),
                                  borderRadius: BorderRadius.circular(8)

                              ),
                              child: DropdownButton<String>(
                                isExpanded: true,
                                borderRadius: BorderRadius.circular(12),

                                hint: Text("Select",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                alignment: Alignment.center,
                                padding: EdgeInsets.all(8),
                                icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                underline: Container(),
                                value: selectedAdmin,
                                onChanged: (newValue) {
                                  setState(() {
                                    selectedAdmin = newValue!;
                                  });
                                },
                                items: adminOptions.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                  );
                                }).toList(),
                              ),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Aadhaar Number*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: aadhaarNo,
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
                            Text("Address*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: address,
                              ),

                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Religion*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              decoration: BoxDecoration(
                                  border: Border.all(color: themeObj.textgrey),
                                  borderRadius: BorderRadius.circular(8)

                              ),
                              child: DropdownButton<String>(
                                isExpanded: true,
                                borderRadius: BorderRadius.circular(12),

                                hint: Text("Select Religion",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                alignment: Alignment.center,
                                padding: EdgeInsets.all(8),
                                icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                underline: Container(),
                                value: selectedReligion,
                                onChanged: (newValue) {
                                  setState(() {
                                    selectedReligion = newValue!;
                                  });
                                },
                                items: religionOptions.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                  );
                                }).toList(),
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
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Subject*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: subject,
                              ),

                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("ID Number*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: idNo,
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
                            Text("Date Of Birth*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: dob,
                              ),

                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Phone Number*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: phoneNumber,
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
                            Text("Education*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: education,
                              ),

                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Profile Link*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                ),
                                controller: profileLink,
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
                        Container(
                          width: size.width*0.3,
                          child: ElevatedButton(
                              style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6F8DF8),shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(8))),
                              onPressed: (){},
                              child: Text("Reset",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                        ),
                        Container(
                          width: size.width*0.3,
                          child: ElevatedButton(
                              style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF82F86F),shape: RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(8))),
                              onPressed: (){},
                              child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),)),
                        ),

                      ],
                    ),
                  ],
                ),
              ),
            ),

          ],
        ),
      ),
    );
  }
}
