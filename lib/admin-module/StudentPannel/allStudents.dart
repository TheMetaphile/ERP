import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/StudentApi.dart';
import 'package:untitled/APIs/StudentsData/student.dart';
import 'package:untitled/admin-module/StudentPannel/studentDetail.dart';
import 'package:untitled/utils/theme.dart';

class AllStudents extends StatefulWidget {
  const AllStudents({super.key});

  @override
  State<AllStudents> createState() => _AllStudentsState();
}

class _AllStudentsState extends State<AllStudents> {
  @override
  void initState() {
    super.initState();
    // _fetchStudents();
  }
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

  final studentApiobj=StudentApi();
  List<Student>? _students;

  Future<void> _fetchStudents() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
    try {
       SharedPreferences pref=await SharedPreferences.getInstance();
      String? accessToken=pref.getString("accessToken");
      String? currentClass=pref.getString("currentClass");
      String? section=pref.getString("section");


      final students = await studentApiobj.fetchStudents(accessToken!,'9th','A',0);
      setState(() {
        // _students = students;
      });
    } catch (e) {
      print('Error: $e');
    }
  }
  List<Map<String, String>> classDetails=[
    {
      "class":"Pre-Nursery",
      "girls":"16",
      "boys":"12",
      "total":"28"
    },
    {
      "class":"Nursery",
      "girls":"26",
      "boys":"12",
      "total":"38"
    },
    {
      "class":"KG",
      "girls":"16",
      "boys":"12",
      "total":"28"
    },
    {
      "class":"LKG",
      "girls":"10",
      "boys":"12",
      "total":"22"
    }
  ];
  // List<Map<String, String>> allStudentData=[
  //   {
  //     "id":"8235",
  //     "name":"Ankit",
  //     "class":"VII",
  //
  //   },
  //   {
  //     "id":"8231",
  //     "name":"Bhanu",
  //     "class":"VI",
  //   },
  //   {
  //     "id":"82351",
  //     "name":"Ankit",
  //     "class":"VII",
  //   },
  //   {
  //     "id":"8215",
  //     "name":"Manish",
  //     "class":"XII",
  //   },
  //   {
  //     "id":"8239",
  //     "name":"Ashish",
  //     "class":"VII",
  //
  //   },
  //   {
  //     "id":"8235",
  //     "name":"Ankit",
  //     "class":"VII",
  //
  //   },
  //   {
  //     "id":"8231",
  //     "name":"Bhanu",
  //     "class":"VI",
  //   },
  //   {
  //     "id":"82351",
  //     "name":"Ankit",
  //     "class":"VII",
  //   },
  //   {
  //     "id":"8215",
  //     "name":"Manish",
  //     "class":"XII",
  //   },
  //   {
  //     "id":"8239",
  //     "name":"Ashish",
  //     "class":"VII",
  //
  //   },
  // ];
  CustomTheme themeObj=CustomTheme();
  List<Map<String, String>> studentData=[
    {
      "rollNo":"01",
      "name":"Ankit",
      "class":"10th",
      "section":" A",
      "phoneNo":"9865325314",
      "email":"ankits45987@gmail.com"
    },
    {
      "rollNo":"02",
      "name":"Abhishek",
      "class":"L.K.G",
      "section":"A",
      "phoneNo":"9865325314",
      "email":"abhishek@gmail.com"
    },
    {
      "rollNo":"03",
      "name":"Bhanu",
      "class":"10th",
      "section":"A",
      "phoneNo":"9865325314",
      "email":"bhanuts45987@gmail.com"
    },
    {
      "rollNo":"04",
      "name":"Manish",
      "class":"10th",
      "section":"A",
      "phoneNo":"9865325314",
      "email":"mansihs45987@gmail.com"
    },
    {
      "rollNo":"05",
      "name":"Abhishek",
      "class":"11th",
      "section":"A",
      "phoneNo":"9865325314",
      "email":"abhishek45987@gmail.com"
    },
    {
      "rollNo":"06",
      "name":"Ashish",
      "class":"5th",
      "section":"A",
      "phoneNo":"9865325314",
      "email":"ashishs45987@gmail.com"
    },
    {
      "rollNo":"07",
      "name":"Ansh",
      "class":"6th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"ansh45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Rahul",
      "class":"8th",
      "section":"C",
      "phoneNo":"9865325314",
      "email":"rahul45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Priya",
      "class":"12th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"priya45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Ajay",
      "class":"12th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"ajay45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Akhil",
      "class":"12th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"akhil45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Amit",
      "class":"12th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"an45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Modi",
      "class":"12th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"amodis45987@gmail.com"
    },
    {
      "rollNo":"01",
      "name":"Ankit",
      "class":"12th",
      "section":"B",
      "phoneNo":"9865325314",
      "email":"ankits45987@gmail.com"
    },

  ];
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    // if (_students == null) {
    //   return  Scaffold(body:  Center(child: LoadingAnimationWidget.threeArchedCircle(
    //     color: Colors.blue,
    //     size: 100,
    //   )));
    // }
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
        title:   Text("All Students",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

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
                  Text(
                    "All Students Data",
                    overflow: TextOverflow.ellipsis,
                    style: GoogleFonts.openSans(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w600,
                      fontSize: size.width * 0.05,
                    ),
                  ),
                  SizedBox(height: size.height * 0.02),
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
                              _buildHeaderCell("Roll No.", size),
                              _buildHeaderCell("Name", size),
                              _buildHeaderCell("Class", size),
                              _buildHeaderCell("Section", size),
                              _buildHeaderCell("Phone No.", size),
                              _buildHeaderCell("Email", size),
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
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDetail(email: '213',),));
                                },
                                child: Row(
                                  children: [
                                    _buildDataCell(data["rollNo"]!, size),
                                    _buildDataCell(data["name"]!, size),
                                    _buildDataCell(data["class"]!, size),
                                    _buildDataCell(data["section"]!, size),
                                    _buildDataCell(data["phoneNo"]!, size),
                                    _buildDataCell(data["email"]!, size),
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
