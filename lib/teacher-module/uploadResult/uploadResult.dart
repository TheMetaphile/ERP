import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:untitled/utils/theme.dart';

class UploadResult extends StatefulWidget {
  const UploadResult({super.key});

  @override
  State<UploadResult> createState() => _UploadResultState();
}

class _UploadResultState extends State<UploadResult> {
  CustomTheme themeObj = CustomTheme();
  String _selectedClass="9th";
  String _selectedSection ="A";
  String _selectedSubject="Maths";
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
  ];
  List<String> classSubjects = [
    'Science',
    'Maths',
    'English',
    'Hindi',
  ];
  String _selectedTab = 'Scholastic';
  TextEditingController totalTheoryMarks=TextEditingController();
  TextEditingController totalSubjectEnrichmentMarks=TextEditingController();
  TextEditingController totalNoteBookMarks=TextEditingController();
  TextEditingController totalPracticalMarks=TextEditingController();
  bool isLoading=false;

  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Upload Report Card",
          style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w500,
            fontSize: size.width * 0.05,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 5.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            dropDownButton(size),
            SizedBox(height: size.height*0.01),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                tabButton('Scholastic'),
                SizedBox(width: 8),
                tabButton('C0-Scholastic'),
              ],
            ),
            SizedBox(height: size.height*0.01),
            _selectedTab == "Scholastic"?Column(
              children: [
                Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(

                          child: TextField(
                            controller: totalTheoryMarks,
                            decoration: const InputDecoration(
                              hintText: 'Total Theory Marks',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),
                        SizedBox(width: size.width*0.02,),
                        Expanded(
                          child: TextField(
                            controller: totalSubjectEnrichmentMarks,
                            decoration: const InputDecoration(
                              labelText: 'Total Subj Enrichment Mark',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.01),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(
                          child: TextField(
                            controller: totalNoteBookMarks,
                            decoration: const InputDecoration(
                              labelText: 'Total NoteBook Mark',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),
                        SizedBox(width: size.width*0.02,),
                        Expanded(
                          child: TextField(
                            controller: totalPracticalMarks,
                            decoration: const InputDecoration(
                              labelText: 'Total Practical Marks',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),

                      ],
                    ),
                  ],
                ),
                SizedBox(height: size.height*0.02),
                isLoading? Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: themeObj.primayColor,
                    size: 50,
                  ),
                ):
                SizedBox(
                  height: size.height*0.57,
                  child: scholasticTable(),
                ),
              ],
            ):Column(
              children: [
                isLoading? Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: themeObj.primayColor,
                    size: 50,
                  ),
                ):
                SizedBox(
                  height: size.height*0.57,
                  child: nonScholasticTable(),
                ),
              ],
            )
          ]

            ),
      ),

      floatingActionButton: _selectedTab=="New"?
      SizedBox(
        width: size.width*0.3,

        child: TextButton(
          onPressed: (){


          },
          style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(216,180,254,1)),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text("Save",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.045),),
            ],
          ),
        ),
      ):SizedBox(),
    );
  }
  Widget dropDownButton(Size size) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Classes", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
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
                      child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width * 0.02,),
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Sections", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
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
                      child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width * 0.02,),
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Subjects", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSubject,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSubject = newValue!;

                    });
                  },
                  items: classSubjects.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
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

  Widget tabButton(String title) {
    return ElevatedButton(
      onPressed: () {
        setState(() {
          _selectedTab = title;

        });
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: _selectedTab == title ? Color.fromRGBO(216,180,254,1) : Colors.grey[300],
      ),
      child: Text(title, style: TextStyle(color: _selectedTab == title ? Colors.white : Colors.black)),
    );
  }

  Widget scholasticTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: {
            0: FixedColumnWidth(90),
            1: FixedColumnWidth(150),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(120),
            4: FixedColumnWidth(120),
            5: FixedColumnWidth(120),
            6: FixedColumnWidth(120),
            7: FixedColumnWidth(120),
          },
          children: [
            scholasticHeader(),
            scholasticRow(),
          ],
        ),
      ),
    );
  }

  TableRow scholasticHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Roll No',
        'Name',
        'Last Note Book Checked',
        'Note Book',
        'Subject Enrichment',
        'Practical Marks',
        'Theory Marks',
        'Action',
      ].map((header) => TableCell(
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Text(
              header,
              style: TextStyle(fontWeight: FontWeight.bold)
          ),
        ),
      )).toList(),
    );
  }
  TableRow scholasticRow() {
    // return noteBookRecordList!.map((notebook) {
      return TableRow(
        children: [
          newTableCell( ""),
          newTableCell( ""),
          newTableCell( ""),
          newTableCell( ""),
          newTableCell( ""),
          newTableCell( ""),
          newTableCell( ""),
          TextButton(onPressed: (){


          }, child: Text("Save")),
        ],
      );
    // }).toList();
  }

  Widget nonScholasticTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: {
            0: FixedColumnWidth(90),
            1: FixedColumnWidth(150),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(120),
            4: FixedColumnWidth(120),
          },
          children: [
            nonScholasticHeader(),
            nonScholasticRow(),
          ],
        ),
      ),
    );
  }

  TableRow nonScholasticHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Roll No',
        'Name',
        'Work Education',
        'General Knowledge',
        'Action',
      ].map((header) => TableCell(
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Text(
              header,
              style: TextStyle(fontWeight: FontWeight.bold)
          ),
        ),
      )).toList(),
    );
  }
  TableRow nonScholasticRow() {
    // return noteBookRecordList!.map((notebook) {
    return TableRow(
      children: [
        newTableCell( ""),
        newTableCell( ""),
        newTableCell( ""),
        newTableCell( ""),
        TextButton(onPressed: (){


        }, child: Text("Save")),
      ],
    );
    // }).toList();
  }


  Widget newTableCell(String text) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Text(text),
      ),
    );
  }
}
