import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../utils/theme.dart';

class Appraisal extends StatefulWidget {
  const Appraisal({super.key});

  @override
  State<Appraisal> createState() => _AppraisalState();
}

class _AppraisalState extends State<Appraisal> {

  String teacherName = "Unknown";
  String profileLink = 'https://example.com/default-profile-pic.jpg';
  String teacherEmail = "Unknown";
  String employeeID = "Unknown";
  String? teacherClass;
  String? teacherSection;

  Future<void> getDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();

    teacherName = pref.getString("name") ?? "Unknown";
    profileLink = pref.getString("profileLink") ?? 'https://example.com/default-profile-pic.jpg';
    teacherEmail = pref.getString("email") ?? "Unknown";
    employeeID = pref.getString("employeeId") ?? "Unknown";
    teacherClass = pref.getString("teacherClass") ?? "";
    teacherSection = pref.getString("teacherSection") ?? "";
    setState(() {});
  }
  CustomTheme themeObj=CustomTheme();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDetails();
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text("Appraisal",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Card(
              margin: EdgeInsets.all(12),

              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'Employee Profile',
                    style: GoogleFonts.openSans(color: themeObj.textBlack,fontSize: size.width*0.045, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(height: size.height*0.015),
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: NetworkImage(profileLink.toString()),

                  ),
                  SizedBox(height: size.height*0.02),
                  Text(
                    teacherName.toString(),
                    style:  GoogleFonts.openSans(color: themeObj.textBlack,fontSize: size.width*0.045, fontWeight: FontWeight.w600),
                  ),

                  SizedBox(height: size.height*0.02),
                  _buildInfoTile("", 'Employee ID:', employeeID.toString()),
                  _buildInfoTile("", 'Department:', ''),
                  _buildInfoTile("", 'Designation:', ''),
                  _buildInfoTile("", 'Email:', teacherEmail.toString()),
                  _buildInfoTile("", 'Date of Joining:', ''),
                  _buildInfoTile("", 'Last Increment', ''),
                ],
              ),
            ),
            Card(
              margin: EdgeInsets.all(12),

              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all( 5.0),
                    child: Text(
                      'Qualification',
                      style: GoogleFonts.openSans(
                        fontSize: size.width * 0.05,
                        fontWeight: FontWeight.w500,
                        color: themeObj.textBlack,
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.006),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: DataTable(
                      columnSpacing: 20,
                      horizontalMargin: 2,

                      headingRowColor: MaterialStateProperty.all(themeObj.primayColor.withOpacity(0.1)),
                      columns: ['', 'UG', 'PG', 'PH.D', 'OTHER'].map((header) {
                        return DataColumn(
                          label: Text(header,textAlign: TextAlign.center, style: GoogleFonts.openSans(color: Colors.grey)),
                        );
                      }).toList(),
                      rows: [
                        _buildDataRow('Degree'),
                        _buildDataRow('Specialization'),
                        _buildDataRow('Year'),
                        _buildDataRow('University/College'),
                        _buildDataRow('Verified by principal'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Card(
              margin: EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all( 5.0),
                    child: Text(
                      'Experience',
                      style: GoogleFonts.openSans(
                        fontSize: size.width * 0.05,
                        fontWeight: FontWeight.w500,
                        color: themeObj.textBlack,
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.006),
                  Column(
                    children: [
                      experienceBuildDataRow("Total Experience"),
                      experienceBuildDataRow("Experience in School"),
                      experienceBuildDataRow("Experience Other than School"),
                      experienceBuildDataRow("Verified by Principal"),
                    ],
                  ),

                ],
              ),
            ),
            Card(
              margin: EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all( 5.0),
                    child: Text(
                      'Result Analysis',
                      style: GoogleFonts.openSans(
                        fontSize: size.width * 0.05,
                        fontWeight: FontWeight.w500,
                        color: themeObj.textBlack,
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.006),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(

                        padding: const EdgeInsets.only(left: 8.0),
                        child: Text("Half Yearly",style: GoogleFonts.openSans(fontSize: size.width*0.045,fontWeight: FontWeight.w400,color: themeObj.textBlack),),
                      ),
                      resultAnalysisBuildDataRow("Subject Taught"),
                      resultAnalysisBuildDataRow("Result"),
                    ],
                  ),
                  Divider(),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(

                        padding: const EdgeInsets.only(left: 8.0),
                        child: Text("Final Exam",style: GoogleFonts.openSans(fontSize: size.width*0.045,fontWeight: FontWeight.w400,color: themeObj.textBlack),),
                      ),
                      resultAnalysisBuildDataRow("Subject Taught"),
                      resultAnalysisBuildDataRow("Result"),
                    ],
                  ),
                  Divider(),
                  resultAnalysisBuildDataRow("Verified by Principal")

                ],
              ),
            ),
            Card(
              margin: EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all( 5.0),
                    child: Text(
                      'Principal Evaluation',
                      style: GoogleFonts.openSans(
                        fontSize: size.width * 0.05,
                        fontWeight: FontWeight.w500,
                        color: themeObj.textBlack,
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.006),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: DataTable(
                      columnSpacing: 20,
                      horizontalMargin: 2,

                      headingRowColor: MaterialStateProperty.all(themeObj.primayColor.withOpacity(0.1)),
                      columns: ['Category', 'Poor', 'Good', 'Excellent'].map((header) {
                        return DataColumn(
                          label: Text(header,textAlign: TextAlign.center, style: GoogleFonts.openSans(color: Colors.grey)),
                        );
                      }).toList(),
                      rows: [
                        principalBuildDataRow('Personal Behaviour'),
                        principalBuildDataRow('Punctuality'),
                        principalBuildDataRow('Discipline'),
                        principalBuildDataRow('Knowledge of subject dealing with'),
                        principalBuildDataRow('Promptness in Disposal of Assignment'),
                        principalBuildDataRow('Attitude towards Others'),
                        principalBuildDataRow('Loyalty'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Card(
              margin: EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all( 5.0),
                    child: Text(
                      'About Yourself',
                      style: GoogleFonts.openSans(
                        fontSize: size.width * 0.05,
                        fontWeight: FontWeight.w500,
                        color: themeObj.textBlack,
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.006),
                  TextField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ) ,
                      contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    ),
                    maxLines: 5,
                  ),
                  SizedBox(height: size.height*0.015),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SizedBox(
                        width: size.width*0.4,
                        child: TextField(
                          decoration: InputDecoration(
                            label: const Text("Present Salary"),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ) ,
                            contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          ),

                        ),
                      ),
                      SizedBox(
                        width: size.width*0.4,
                        child: TextField(
                          decoration: InputDecoration(
                            label: const Text("Expected Salary"),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ) ,
                            contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height*0.015),
                ],
              ),
            ),
            SizedBox(height: size.height*0.01,),
            ElevatedButton(onPressed: (){}, child: Text("Submit Application",style: GoogleFonts.openSans(fontSize: size.width*0.035),)),
            SizedBox(height: size.height*0.01,),
          ],
        ),
      ),
    );
  }

  Widget experienceBuildDataRow(String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
              width: 200,
              child: AutoSizeText(label,overflow: TextOverflow.ellipsis,textAlign: TextAlign.start, style: GoogleFonts.openSans(fontSize: 15))),
            Container(
            width: 100,
            height: 50,

            padding: EdgeInsets.symmetric(vertical: 4),
              child: TextFormField(
                decoration: InputDecoration(
                border: OutlineInputBorder(
                   borderRadius: BorderRadius.circular(8),
                    ),
                  contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                   ),
               ),
            )
        ],
      ),
    );
  }

  Widget resultAnalysisBuildDataRow(String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
              width: 150,
              child: AutoSizeText(label,overflow: TextOverflow.ellipsis,textAlign: TextAlign.start, style: GoogleFonts.openSans(fontSize: 15))),
            Container(
            width: 100,
              height: 50,
            padding: EdgeInsets.symmetric(vertical: 4),
              child: TextFormField(
                decoration: InputDecoration(
                border: OutlineInputBorder(
                   borderRadius: BorderRadius.circular(8),
                    ),
                  contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                   ),
               ),
            )
        ],
      ),
    );
  }

  DataRow principalBuildDataRow(String label) {
    return DataRow(
      cells: [
        DataCell(
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4),
              child: Text(label,overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(fontSize: 15)),
            )
        ),
        ...List.generate(3, (_) => DataCell(_buildInputField())),
      ],
    );
  }

DataRow _buildDataRow(String label) {
  return DataRow(
    cells: [
      DataCell(
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4),
            child: Text(label,overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(fontSize: 15)),
          )
      ),
      ...List.generate(4, (_) => DataCell(_buildInputField())),
    ],
  );
}

Widget _buildInputField() {
  return Container(
    width: 100,

      padding: EdgeInsets.symmetric(vertical: 4),
    child: TextFormField(
      decoration: InputDecoration(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      ),
    ),
  );
}

  Widget _buildInfoTile(String link, String label, String value) {
    Size size = MediaQuery.of(context).size;
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8,horizontal: 5),
      child: Row(
        children: [
          Image.asset("assets/Images/Admin Home/Students.png",width: size.width*0.06,),
          SizedBox(width: 8),
          Expanded(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label,overflow: TextOverflow.ellipsis, style:  GoogleFonts.openSans(fontWeight: FontWeight.w500)),
                Text(value, style:  GoogleFonts.openSans(fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
