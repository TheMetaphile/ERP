import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';

class TransferCertificate extends StatefulWidget {
  const TransferCertificate({super.key});

  @override
  State<TransferCertificate> createState() => _TransferCertificateState();
}

class _TransferCertificateState extends State<TransferCertificate> {
  String? _selectedClass;
  List<String> classOptions = [
    '12th',
    '11th',
    '10th',
    '9th',
  ];
  String? _selectedAcademicYear;
  List<String> academicYearOptions = [
    '12th',
    '11th',
    '10th',
    '9th',
  ];

  CustomTheme themeObj=CustomTheme();
  List<Map<String, String>> studentData=[
    {

      "name":"Ankit",
      "class":"10th",
      "action":" Delete",
      "tcNo":"983",
      "admissionNo":"983",

    },
    {

      "name":"Abhishek",
      "class":"L.K.G",
      "action":" Delete",
      "tcNo":"9865",
      "admissionNo":"983",
    },
    {

      "name":"Bhanu",
      "class":"10th",
      "action":" Delete",
      "tcNo":"962",
      "admissionNo":"983",
    },
    {

      "name":"Manish",
      "class":"10th",
      "action":" Delete",
      "tcNo":"965",
      "admissionNo":"983",
    },
    {

      "name":"Abhishek",
      "class":"11th",
      "action":" Delete",
      "tcNo":"654",
      "admissionNo":"983",
    },
    {

      "name":"Ashish",
      "class":"5th",
      "action":" Delete",
      "tcNo":"531",
      "admissionNo":"983",
    },
    {

      "name":"Ansh",
      "class":"6th",
      "action":" Delete",
      "tcNo":"414",
      "admissionNo":"983",
    },
    {

      "name":"Rahul",
      "class":"8th",
      "action":" Delete",
      "tcNo":"986",
      "admissionNo":"983",
    },
    {

      "name":"Priya",
      "class":"12th",
      "action":" Delete",
      "tcNo":"325",
      "admissionNo":"983",
    },
    {

      "name":"Ajay",
      "class":"12th",
      "action":" Delete",
      "tcNo":"953",
      "admissionNo":"983",
    },
    {

      "name":"Akhil",
      "class":"12th",
       "action":" Delete",
      "tcNo":"986",
      "admissionNo":"983",
    },
    {

      "name":"Amit",
      "class":"12th",
      "action":" Delete",
      "tcNo":"14",
      "admissionNo":"983",
    },
    {

      "name":"Modi",
      "class":"12th",
      "action":" Delete",
      "tcNo":"314",
      "admissionNo":"983",
    },
    {

      "name":"Ankit",
      "class":"12th",
      "action":" Delete",
      "tcNo":"9865",
      "admissionNo":"983",
    },

  ];
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
        title:   Text("Transfer Certificate",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

      ),
      body:Container(
        padding: EdgeInsets.symmetric(horizontal: 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            // Card(
            //   shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8),),
            //   child: Container(
            //     width: size.width*0.9,
            //     child: TextButton(
            //       onPressed: (){},
            //       child: Row(
            //         mainAxisAlignment: MainAxisAlignment.center,
            //         children: [
            //           Image.asset("assets/Images/Admin Home/Students.png",height: size.height*0.08,fit: BoxFit.contain,),
            //           SizedBox(width: size.width*0.1,),
            //           Column(
            //             mainAxisAlignment: MainAxisAlignment.center,
            //             children: [
            //               Text("1020",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w500),),
            //               Text("Total Student",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.black,fontWeight:FontWeight.w600),),
            //
            //             ],
            //           )
            //         ],
            //       ),
            //     ),
            //   ),
            // ),
            // SizedBox(height: size.height*0.02,),
            // Row(
            //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //   children: [
            //     Card(
            //       child:Container(
            //         width: size.width*0.44,
            //
            //         child: Column(
            //           mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //           children: [
            //             SizedBox(height: size.height*0.02,),
            //             Stack(
            //               alignment: Alignment.center,
            //               children: <Widget>[
            //                 Container(
            //                   height: size.width*0.3,
            //                   width: size.width*0.3,
            //                   child: CircularProgressIndicator(
            //                     value: 0.5,
            //                     strokeWidth: 10,
            //                     color: Colors.green,
            //                     backgroundColor: Colors.grey,
            //
            //                   ),
            //                 ),
            //                 Text("50%", style: TextStyle(
            //                     fontSize: size.width*0.1,
            //                     fontWeight: FontWeight.w400// Adjust font size as needed
            //                 ),)
            //               ],
            //             ),
            //             SizedBox(height: size.height*0.02,),
            //             Text("Girls", style: TextStyle(
            //                 fontSize: size.width*0.07,
            //                 fontWeight: FontWeight.w400// Adjust font size as needed
            //             ),)
            //           ],
            //         ),
            //       ),
            //     ),
            //     Card(
            //       child:Container(
            //         width: size.width*0.44,
            //
            //         child: Column(
            //           mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //           children: [
            //             SizedBox(height: size.height*0.02,),
            //             Stack(
            //               alignment: Alignment.center,
            //               children: <Widget>[
            //                 Container(
            //                   height: size.width*0.3,
            //                   width: size.width*0.3,
            //                   child: CircularProgressIndicator(
            //                     value: 0.5,
            //                     strokeWidth: 10,
            //                     color: Colors.blueAccent,
            //                     backgroundColor: Colors.grey,
            //
            //                   ),
            //                 ),
            //                 Text("50%", style: TextStyle(
            //                     fontSize: size.width*0.1,
            //                     fontWeight: FontWeight.w400// Adjust font size as needed
            //                 ),)
            //               ],
            //             ),
            //             SizedBox(height: size.height*0.02,),
            //             Text("Boys", style: TextStyle(
            //                 fontSize: size.width*0.07,
            //                 fontWeight: FontWeight.w400// Adjust font size as needed
            //             ),)
            //           ],
            //         ),
            //       ),
            //     )
            //
            //   ],
            // ),
            SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height * 0.01),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Card(
                      child: Container(
                        width: size.width*0.3,
                        height: size.height*0.05,
                        child: DropdownButton<String>(
                          isExpanded: true,
                          borderRadius: BorderRadius.circular(12),
                          hint: Text("Classes",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                          alignment: Alignment.center,
                          padding: EdgeInsets.all(8),
                          icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                          underline: Container(),
                          value: _selectedClass,
                          onChanged: (newValue) {
                            setState(() {
                              _selectedClass = newValue!;
                            });
                          },
                          items: classOptions.map((String option) {
                            return DropdownMenuItem<String>(
                              value: option,
                              child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                    Card(
                      child: Container(
                        width: size.width*0.3,
                        height: size.height*0.05,
                        child: DropdownButton<String>(
                          isExpanded: true,
                          borderRadius: BorderRadius.circular(12),
                          hint: Text("Academic Year",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                          alignment: Alignment.center,
                          padding: EdgeInsets.all(8),
                          icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                          underline: Container(),
                          value: _selectedAcademicYear,
                          onChanged: (newValue) {
                            setState(() {
                              _selectedAcademicYear = newValue!;
                            });
                          },
                          items: academicYearOptions.map((String option) {
                            return DropdownMenuItem<String>(
                              value: option,
                              child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                            );
                          }).toList(),
                        ),
                      ),
                    ),
                  ],
                ),
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
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          color: Color.fromRGBO(233, 213, 255, 1),
                          child: Row(
                            children: [
                              _buildHeaderCell("Sr. No.", size),
                              _buildHeaderCell("TC No.", size),
                              _buildHeaderCell("Admission No.", size),
                              _buildHeaderCell("Name", size),
                              _buildHeaderCell("Class", size),
                              _buildHeaderCell("Action", size),
                            ],
                          ),
                        ),
                        const Divider(thickness: 2, height: 2, color: Colors.black),
                        Container(
                          height: size.height * 0.63, // Adjust this value as needed
                          width: size.width * 1.5, // Adjust this value to fit all columns
                          child: ListView.separated(
                            itemBuilder: (context, index) {
                              final data = studentData[index];

                              return InkWell(
                                onTap: (){
                              //    Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDetail(email: '213',),));
                                },
                                child: Row(
                                  children: [
                                    _buildDataCell("${index+1}", size),
                                    _buildDataCell(data["tcNo"]!, size),
                                    _buildDataCell(data["admissionNo"]!, size),
                                    _buildDataCell(data["name"]!, size),
                                    _buildDataCell(data["class"]!, size),
                                    _buildDataCell(data["action"]!, size),
                                  ],
                                ),
                              );
                            },
                            separatorBuilder: (context, index) => Divider(),
                            itemCount: studentData.length,
                          ),
                        )
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
    );
  }
  Widget _buildHeaderCell(String text, Size size) {
    return Container(
      width: size.width * 0.25,
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

      width: size.width * 0.25,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child:  text.trim()=="Delete"?Text(
        text,
        style: GoogleFonts.openSans(
          color: Colors.red,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.035,
        ),
      ):
      Text(
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
