import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/theme.dart';

class StudentPromote extends StatefulWidget {
  const StudentPromote({super.key});

  @override
  State<StudentPromote> createState() => _StudentPromoteState();
}

class _StudentPromoteState extends State<StudentPromote> {

  String? _selectedClass;
  String? _selectedSection;
  List<String> classOptions = [
    '12th',
    '11th',
    '10th',
    '9th',
  ];
  List<String> classSections = [
    'A',
    'B',
    'C',
    'D',
    'E',
  ];
  List<Map<String, String>> studentData=[
    {
      "id":"01",
      "name":"Ankit",
      "class":"10th",
      "section":" A",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",

    },
    {
      "id":"02",
      "name":"Abhishek",
      "class":"L.K.G",
      "section":"A",
      "mark":"900",
      "gpa":"9",
      "remark":"Detained",
    },
    {
      "id":"03",
      "name":"Bhanu",
      "class":"10th",
      "section":"A",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"04",
      "name":"Manish",
      "class":"10th",
      "section":"A",
      "mark":"900",
      "gpa":"9",
      "remark":"Detained",
    },
    {
      "id":"05",
      "name":"Abhishek",
      "class":"11th",
      "section":"A",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"06",
      "name":"Ashish",
      "class":"5th",
      "section":"A",
      "mark":"900",
      "gpa":"9",
      "remark":"Detained",
    },
    {
      "id":"07",
      "name":"Ansh",
      "class":"6th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Detained",
    },
    {
      "id":"01",
      "name":"Rahul",
      "class":"8th",
      "section":"C",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"01",
      "name":"Priya",
      "class":"12th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"01",
      "name":"Ajay",
      "class":"12th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"01",
      "name":"Akhil",
      "class":"12th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"01",
      "name":"Amit",
      "class":"12th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"01",
      "name":"Modi",
      "class":"12th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },
    {
      "id":"01",
      "name":"Ankit",
      "class":"12th",
      "section":"B",
      "mark":"900",
      "gpa":"9",
      "remark":"Promoted",
    },

  ];

  @override
  void initState() {
    super.initState();

  }
  // TextEditingController firstName=TextEditingController();
  // TextEditingController lastName=TextEditingController();
  // TextEditingController currentSession=TextEditingController();
  // TextEditingController promoteSession=TextEditingController();
  // TextEditingController promoteFromClass=TextEditingController();
  // TextEditingController promotetoClass=TextEditingController();
  // String? _selectedpromoteFromSessionClass;
  // List<String> promoteFromSessionClass = [
  //   'Standard 12th',
  //   'Standard 11th',
  //   'Standard 10th',
  //   'Standard 9th',
  // ];
  // String? _selectedpromoteToSessionClass;
  // List<String> promoteToSessionClass = [
  //   'Standard 12th',
  //   'Standard 11th',
  //   'Standard 10th',
  //   'Standard 9th',
  // ];
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme: IconThemeData(color: themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:   Text("All Students Data",style: GoogleFonts.openSans(fontSize:size.width*0.055,color: themeObj.textBlack,fontWeight:FontWeight.w600),),

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
                  dropDownButton(size),
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
                              _buildHeaderCell("ID.", size),
                              _buildHeaderCell("Name", size),
                              _buildHeaderCell("Class", size),
                              _buildHeaderCell("Section", size),
                              _buildHeaderCell("Marks", size),
                              _buildHeaderCell("GPA", size),
                              _buildHeaderCell("Remark", size),
                            ],
                          ),
                        ),
                        const Divider(thickness: 2, height: 2, color: Colors.black),
                        Container(
                          height: size.height * 0.68, // Adjust this value as needed
                          width: size.width * 1.78, // Adjust this value to fit all columns
                          child: ListView.separated(

                            itemBuilder: (context, index) {
                              final data = studentData[index];
                              return InkWell(
                                onTap: (){
                              //    Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDetail(email: '213',),));
                                },
                                child: Row(
                                  children: [
                                    _buildDataCell(data["id"]!, size),
                                    _buildDataCell(data["name"]!, size),
                                    _buildDataCell(data["class"]!, size),
                                    _buildDataCell(data["section"]!, size),
                                    _buildDataCell(data["mark"]!, size),
                                    _buildDataCell(data["gpa"]!, size),
                                    _buildDataCell(data["remark"]!, size),
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
  Widget dropDownButton(Size size){
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            SizedBox(width: size.width*0.02,),
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
            SizedBox(width: size.width*0.08,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Sections",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSection,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSection = newValue!;
                    });
                  },
                  items: classSections.map((String option) {
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
      child: text=="Promoted"?
         Container(
           height: size.height*0.04,
           decoration: BoxDecoration(
             color: Colors.green,
                 borderRadius: BorderRadius.circular(5),
           ),
           child:  Center(
             child: Text(
               text,
               style: GoogleFonts.openSans(
                 color: themeObj.textBlack,
                 fontWeight: FontWeight.w400,
                 fontSize: size.width * 0.035,
               ),
             ),
           ),
         ) :text=="Detained"?Container(
        height: size.height*0.04,
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(5),
        ),
        child:  Center(
          child: Text(
            text,
            style: GoogleFonts.openSans(
              color: themeObj.textBlack,
              fontWeight: FontWeight.w400,
              fontSize: size.width * 0.035,
            ),
          ),
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
