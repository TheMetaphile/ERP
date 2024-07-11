import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/theme.dart';

class StudentAdmissionForm extends StatefulWidget {
  const StudentAdmissionForm({super.key});

  @override
  State<StudentAdmissionForm> createState() => _StudentAdmissionFormState();
}

class _StudentAdmissionFormState extends State<StudentAdmissionForm> {



  @override
  void initState() {
    super.initState();

  }
  String? selectedBloodgroup;
  List<String> bloodGroupOption = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
    ];
  String? selectedGender;
  List<String> genderOption = [
    'Male',
    'Female',
    'Other',

  ];
  String? selectedReligion;
  List<String> religionOption = [
    'Hindu',
    'Sikh',
    'Muslim',
    'Christian',
    'Others',

  ];
  String? selectedSection;
  List<String> sectionnOption = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',

  ];
  String? currentClass;
  List<String> currentClassOption = [
    'Pre-Nursery',
    'Nursery',
    'L.K.G',
    'U.K.G',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];
  String? admissionClass;
  List<String> admissionClassOption = [
    'Pre-Nursery',
    'Nursery',
    'L.K.G',
    'U.K.G',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];

  TextEditingController name=TextEditingController();

  TextEditingController dob=TextEditingController();
  TextEditingController address=TextEditingController();
  TextEditingController phoneNumber=TextEditingController();
  TextEditingController email=TextEditingController();
  TextEditingController fatherName=TextEditingController();
  TextEditingController motherName=TextEditingController();
  TextEditingController fatherOcupation=TextEditingController();
  TextEditingController motherOcupation=TextEditingController();
  TextEditingController fatherPhNo=TextEditingController();
  TextEditingController motherPhNo=TextEditingController();
  TextEditingController clas=TextEditingController();
  TextEditingController section=TextEditingController();
  TextEditingController gender=TextEditingController();
  TextEditingController religious=TextEditingController();
  TextEditingController admissionId=TextEditingController();
  TextEditingController guardianName=TextEditingController();
  TextEditingController guardianPhNo=TextEditingController();
  TextEditingController aadhaarNo=TextEditingController();
  TextEditingController oldAdmissionNo=TextEditingController();
  TextEditingController admissionDate=TextEditingController();
  TextEditingController guardianOcupation=TextEditingController();
  TextEditingController guardianPhoneNo=TextEditingController();
  TextEditingController fatherEmail=TextEditingController();
  TextEditingController motherEmail=TextEditingController();
  TextEditingController emergencyContactNo=TextEditingController();
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme: IconThemeData(color: themeObj.textBlack),
        backgroundColor:  themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        title:   Text("Add New Student",style: GoogleFonts.openSans(fontSize:size.width*0.055,color: themeObj.textBlack,fontWeight:FontWeight.w600),),

      ),
      body:  SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: size.height * 0.01,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [

                Card(
                  margin: EdgeInsets.all(0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Padding(
                      //   padding:  EdgeInsets.only(left: size.width*0.25),
                      //   child: Text("Photo*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w600),),
                      // ),
                      // Center(
                      //   child: TextButton(
                      //     onPressed: () {  },
                      //     child: Stack(
                      //       children: [
                      //         Icon(CupertinoIcons.profile_circled,size: size.height*0.15,color: Colors.grey[500],),
                      //         Positioned(
                      //             right: 0,
                      //             bottom: size.width*0.008,
                      //             left: size.width*0.12,
                      //             child: Icon(CupertinoIcons.plus_circle,color: Colors.blueAccent,size: size.width*0.1,))
                      //       ],
                      //     ),
                      //   ),
                      // ),
                      // Center(
                      //   child: Container(
                      //     width: size.width*0.35,
                      //     child: ElevatedButton(
                      //         style: ElevatedButton.styleFrom(shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                      //         onPressed: (){},
                      //         child: Text("Choose File",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                      //   ),
                      // ),
                      // Center(
                      //   child: Container(
                      //     width: size.width*0.35,
                      //     child: ElevatedButton(
                      //         style: ElevatedButton.styleFrom(elevation: 0,backgroundColor: Colors.red,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                      //         onPressed: (){},
                      //         child: Text("Remove",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.white),)),
                      //   ),
                      // ),
                      SizedBox(height: size.height*0.01,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: name,
                                ),

                              )
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
                              Text("Date of Birth*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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

                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
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
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Blood Group*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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

                                  hint: Text("Blood Group",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                  alignment: Alignment.center,
                                  padding: EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                  underline: Container(),
                                  value: selectedBloodgroup,
                                  onChanged: (newValue) {
                                    setState(() {
                                      selectedBloodgroup = newValue!;
                                    });
                                  },
                                  items: bloodGroupOption.map((String option) {
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
                                  items: religionOption.map((String option) {
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
                              Text("Section*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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

                                  hint: Text("Select Section",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                  alignment: Alignment.center,
                                  padding: EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                  underline: Container(),
                                  value: selectedSection,
                                  onChanged: (newValue) {
                                    setState(() {
                                      selectedSection = newValue!;
                                    });
                                  },
                                  items: sectionnOption.map((String option) {
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
                              Text("Current Class*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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

                                  hint: Text("Select Class",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                  alignment: Alignment.center,
                                  padding: EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                  underline: Container(),
                                  value: currentClass,
                                  onChanged: (newValue) {
                                    setState(() {
                                      currentClass = newValue!;
                                    });
                                  },
                                  items: currentClassOption.map((String option) {
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
                              Text("Admission Class*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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

                                  hint: Text("Select Class",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                  alignment: Alignment.center,
                                  padding: EdgeInsets.all(8),
                                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                  underline: Container(),
                                  value: admissionClass,
                                  onChanged: (newValue) {
                                    setState(() {
                                      admissionClass = newValue!;
                                    });
                                  },
                                  items: admissionClassOption.map((String option) {
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
                              Text("Guardian Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                              SizedBox(height: size.height*0.01,),
                              Container(
                                width: size.width*0.4,
                                height: size.height*0.055,
                                child: TextField(
                                  maxLines: 1,
                                  decoration: InputDecoration(
                                      contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                  ),
                                  controller: guardianName,
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
                              Text("Old Admission No*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                              SizedBox(height: size.height*0.01,),
                              Container(
                                width: size.width*0.4,
                                height: size.height*0.055,
                                child: TextField(
                                  maxLines: 1,
                                  decoration: InputDecoration(
                                      contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                  ),
                                  controller: oldAdmissionNo,
                                ),
                              )
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Addmission Date*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                              SizedBox(height: size.height*0.01,),
                              Container(
                                width: size.width*0.4,
                                height: size.height*0.055,
                                child: TextField(
                                  maxLines: 1,
                                  decoration: InputDecoration(
                                      contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                  ),
                                  controller: admissionDate,
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
                              Text("Guardian Occupt.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                              SizedBox(height: size.height*0.01,),
                              Container(
                                width: size.width*0.4,
                                height: size.height*0.055,
                                child: TextField(
                                  maxLines: 1,
                                  decoration: InputDecoration(
                                      contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                  ),
                                  controller: guardianOcupation,
                                ),
                              )
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Father's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: fatherName,
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
                              Text("Mother's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: motherName,
                                ),

                              )
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Guardian Phone No.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: guardianPhoneNo,
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
                              Text("Father's Email*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: fatherEmail,
                                ),
                              )
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Mother Email*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: motherEmail,
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
                              Text("Emergency Phone No.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: emergencyContactNo,
                                ),
                              )
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Father Occupation.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
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
                                  controller: fatherOcupation,
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
                            padding: const EdgeInsets.only(left: 15.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Mother Occupation*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:themeObj.textBlack),),
                                SizedBox(height: size.height*0.01,),
                                Container(
                                  width: size.width*0.4,
                                  height: size.height*0.055,
                                  child: TextField(
                                    maxLines: 1,
                                    decoration: InputDecoration(
                                        contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                    ),
                                    controller: motherOcupation,
                                  ),
                                )
                              ],
                            ),
                          ),
                          // Column(
                          //   crossAxisAlignment: CrossAxisAlignment.start,
                          //   children: [
                          //     Text("Section*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                          //     SizedBox(height: size.height*0.01,),
                          //     Container(
                          //       width: size.width*0.4,
                          //       height: size.height*0.055,
                          //       child: TextField(
                          //         maxLines: 1,
                          //         decoration: InputDecoration(
                          //             contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                          //             border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                          //         ),
                          //         controller: section,
                          //       ),
                          //
                          //     )
                          //   ],
                          // ),

                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      // Row(
                      //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      //   children: [
                      //     Column(
                      //       crossAxisAlignment: CrossAxisAlignment.start,
                      //       children: [
                      //         Text("Gender*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      //         SizedBox(height: size.height*0.01,),
                      //         Container(
                      //           width: size.width*0.4,
                      //           height: size.height*0.055,
                      //           child: TextField(
                      //             maxLines: 1,
                      //             decoration: InputDecoration(
                      //                 contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                      //                 border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                      //             ),
                      //             controller: gender,
                      //           ),
                      //         )
                      //       ],
                      //     ),
                      //     Card(
                      //       child: Container(
                      //         width: size.width*0.3,
                      //         height: size.height*0.05,
                      //         child: DropdownButton<String>(
                      //           isExpanded: true,
                      //           borderRadius: BorderRadius.circular(12),
                      //           hint: Text("Classes",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                      //           alignment: Alignment.center,
                      //           padding: EdgeInsets.all(8),
                      //           icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                      //           underline: Container(),
                      //           value: selectedBloodgroup,
                      //           onChanged: (newValue) {
                      //             setState(() {
                      //               selectedBloodgroup = newValue!;
                      //             });
                      //           },
                      //           items: bloodGroupOption.map((String option) {
                      //             return DropdownMenuItem<String>(
                      //               value: option,
                      //               child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                      //             );
                      //           }).toList(),
                      //         ),
                      //       ),
                      //     ),
                      //
                      //   ],
                      // ),
                      // SizedBox(height: size.height*0.02,),
                      // Row(
                      //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      //   children: [
                      //
                      //     Column(
                      //       crossAxisAlignment: CrossAxisAlignment.start,
                      //       children: [
                      //         Text("Guardian Ph No.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      //         SizedBox(height: size.height*0.01,),
                      //         Container(
                      //           width: size.width*0.4,
                      //           height: size.height*0.055,
                      //           child: TextField(
                      //             maxLines: 1,
                      //             decoration: InputDecoration(
                      //                 contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                      //                 border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                      //             ),
                      //             controller: guardianPhNo,
                      //           ),
                      //
                      //         )
                      //       ],
                      //     ),
                      //
                      //   ],
                      // ),
                      // SizedBox(height: size.height*0.02,),
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


              ],
            ),

          ],
        ),
      ),
    );
  }

}
