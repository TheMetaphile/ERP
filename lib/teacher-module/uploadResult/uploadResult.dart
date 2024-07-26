import 'package:chatview/chatview.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/ClassActivity/resultAPI.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';

import '../../APIs/StudentsData/StudentApi.dart';
import '../../APIs/Teacher Module/NoteBookReord/noteBookRecordAPI.dart';

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
  String _selectedTerm="Term 1";
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
  List<String> termOptions = [
    "Term 1",
    'Half Yearly',
    'Term 2',
    'Final',

  ];
  String _selectedTab = 'Scholastic';
  TextEditingController totalTheoryMarks=TextEditingController();
  TextEditingController totalSubjectEnrichmentMarks=TextEditingController();
  TextEditingController totalNoteBookMarks=TextEditingController();
  TextEditingController totalPracticalMarks=TextEditingController();
  bool isLoading=false;
  List<Map<String, dynamic>>? studentsList;
  Map<String, bool> savedStudents = {};
  String session = '';
  int? selectedStudentIndex;
  Map<String, Map<String, TextEditingController>> scholasticControllers = {};
  Map<String, Map<String, TextEditingController>> nonScholasticControllers = {};



  String calculateCurrentSession() {
    DateTime now = DateTime.now();
    int currentYear = now.year;
    int nextYear = currentYear + 1;

    if (now.isBefore(DateTime(currentYear, 3, 31))) {
      currentYear--;
      nextYear--;
    }

    return "$currentYear-${nextYear.toString().substring(2)}";
  }



  Future<void> getStudentData() async {
    setState(() {
      isLoading=true;
    });
    try{
      StudentApi apiObj= StudentApi();

      SharedPreferences pref = await SharedPreferences.getInstance();
      var accessToken = pref.getString("accessToken");

      List<dynamic> students=await apiObj.fetchStudents(accessToken! , _selectedClass, _selectedSection, 0,);
      print("students                  $students");
      if(students.isNotEmpty){
        setState(() {
          studentsList=students.cast();
          initializeControllers();
        });
      }else{
        studentsList=[];
      }
    }catch(e){
      print("error $e");
    }finally{
      setState(() {
        isLoading=false;
      });
    }
  }


  Future<void> saveScholasticMarks(Map<String, dynamic> student, String noteBook, String subjectEnrichment,
      String practical, String theory) async {

    int totalNoteBookMark=int.tryParse(totalTheoryMarks.text) ?? -1;
    int totalSubjectEnrichmentMark=int.tryParse(totalSubjectEnrichmentMarks.text) ?? -1;
    int totalPracticalMark=int.tryParse(totalPracticalMarks.text) ?? -1;
    int totalTheoryMark=int.tryParse(totalTheoryMarks.text) ?? -1;

    int totalMarks=totalNoteBookMark+totalSubjectEnrichmentMark+totalPracticalMark+totalTheoryMark;


    int obtainedNoteBookMark = int.tryParse(noteBook) ?? -1;
    int obtainedSubjectEnrichmentMark = int.tryParse(subjectEnrichment) ?? -1;
    int obtainedPracticalMark = int.tryParse(practical) ?? -1;
    int obtainedTheoryMark = int.tryParse(theory) ?? -1;

    int marksObtained=obtainedNoteBookMark+obtainedSubjectEnrichmentMark+obtainedPracticalMark+obtainedTheoryMark;

    Map<String,dynamic> result =
    {  "subject":_selectedSubject,
      "marksObtained":marksObtained,
      "totalMarks":totalMarks,
      "totalPracticalMarks":totalPracticalMark,
      "obtainedPracticalMarks":obtainedPracticalMark,
      "totalNoteBookMarks":totalNoteBookMark,
      "obtainedNoteBookMarks":obtainedNoteBookMark,
      "totalSubjectEnrichmentMarks":totalSubjectEnrichmentMark,
      "obtainedSubjectEnrichmentMarks":obtainedSubjectEnrichmentMark,

    };
    if (obtainedNoteBookMark < 0 || obtainedNoteBookMark > totalNoteBookMark) {
      showRedSnackBar("Invalid Notebook marks", context);
      return;
    }
    if (obtainedSubjectEnrichmentMark < 0 || obtainedSubjectEnrichmentMark > totalSubjectEnrichmentMark) {
      showRedSnackBar("Invalid Subject Enrichment marks", context);
      return;
    }
    if (obtainedPracticalMark < 0 || obtainedPracticalMark > totalPracticalMark) {
      showRedSnackBar("Invalid Practical marks", context);
      return;
    }
    if (obtainedTheoryMark < 0 || obtainedTheoryMark > totalTheoryMark) {
      showRedSnackBar("Invalid Theory marks", context);
      return;
    }

         ResultApi apiObj=ResultApi();
         try{

           SharedPreferences pref = await SharedPreferences.getInstance();
           var accessToken = pref.getString("accessToken");

           dynamic success=await apiObj.createResult(accessToken!, student["email"], _selectedClass,_selectedTerm.toLowerCase().replaceAll(" ", ""),result);

            if(success){
              showGreenSnackBar("${student["name"]} Mark successfully upload", context);
              setState(() {
                student['savedMarks'] = {
                  'noteBook': noteBook,
                  'subjectEnrichment': subjectEnrichment,
                  'practical': practical,
                  'theory': theory,
                };
              });

            }else{
              showRedSnackBar("$success", context);
            }

         }catch(e){
           print("error $e");
         }


    print(result);

  }



  Future<void> saveNonScholasticMarks(Map<String, dynamic> student, String workEducationGrade, String generalKnowledgeGrade,
  ) async {

    Map<String,dynamic> result =
    {
      "subject":_selectedSubject,
      "workEducation":workEducationGrade,
      "generalKnowledge":generalKnowledgeGrade

    };
    print(result);
    ResultApi apiObj=ResultApi();
    try{

      SharedPreferences pref = await SharedPreferences.getInstance();
      var accessToken = pref.getString("accessToken");

      dynamic success=await apiObj.createResult(accessToken!, student["email"], _selectedClass,_selectedTerm.toLowerCase().replaceAll(" ", ""),result);

      if(success){
        showGreenSnackBar("${student["name"]} Mark successfully upload", context);
        setState(() {
          student['savedMarks'] = {
            'workEducation': workEducationGrade,
            'generalKnowledge': generalKnowledgeGrade,
          };
        });

      }else{
        showRedSnackBar("$success", context);
      }

    }catch(e){
      print("error $e");
    }


    print(result);

  }



Future<String> getLastRecord(String email) async {
  NoteBookRecordAPI apiObj=NoteBookRecordAPI();
  SharedPreferences pref = await SharedPreferences.getInstance();
  var accessToken = pref.getString("accessToken");
  dynamic lastCheck=await apiObj.lastRecord(accessToken!, _selectedSubject, email);
  if(lastCheck is List){
    return lastCheck[0]["topic"];
  }else{
    return "Not Found";
  }

}

  void initializeControllers() {
    for (var student in studentsList!) {
      String studentId = student['email'];
      Map<String, String> savedMarks = student['savedMarks'] ?? {};

      scholasticControllers[studentId] = {
        'noteBook': TextEditingController(text: savedMarks['noteBook'] ?? ''),
        'subjectEnrichment': TextEditingController(text: savedMarks['subjectEnrichment'] ?? ''),
        'practical': TextEditingController(text: savedMarks['practical'] ?? ''),
        'theory': TextEditingController(text: savedMarks['theory'] ?? ''),
      };

      nonScholasticControllers[studentId] = {
        'workEducation': TextEditingController(text: savedMarks['workEducation'] ?? ''),
        'generalKnowledge': TextEditingController(text: savedMarks['generalKnowledge'] ?? ''),
      };
    }
  }



  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getStudentData();
  }

  @override
  void dispose() {
    // Dispose of both scholastic and non-scholastic controllers
    scholasticControllers.values.forEach((controllers) {
      controllers.values.forEach((controller) => controller.dispose());
    });
    nonScholasticControllers.values.forEach((controllers) {
      controllers.values.forEach((controller) => controller.dispose());
    });
    super.dispose();
  }

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
      body: SingleChildScrollView(
        child: Padding(
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
                  tabButton('CO-Scholastic'),
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
                              keyboardType: TextInputType.number,
                              decoration: const InputDecoration(
                                labelText: 'Total Theory Marks',
                                border: OutlineInputBorder(),
                              ),
                            ),
                          ),
                          SizedBox(width: size.width*0.02,),
                          Expanded(
                            child: TextField(
                              controller: totalSubjectEnrichmentMarks,
                              keyboardType: TextInputType.number,
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
                              keyboardType: TextInputType.number,
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
                              keyboardType: TextInputType.number,
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
                    child: scholasticTable(size),
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
                    height: size.height*0.74,
                    child: nonScholasticTable(size),
                  ),
                ],
              )
            ]
        
              ),
        ),
      ),


    );
  }
  Widget dropDownButton(Size size) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            Card(
              child: Container(
                width: size.width * 0.23,
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
            SizedBox(width: size.width * 0.01,),
            Card(
              child: Container(
                width: size.width * 0.23,
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
            SizedBox(width: size.width * 0.01,),
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
            SizedBox(width: size.width * 0.01,),
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Term ", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
                  underline: Container(),
                  value: _selectedTerm,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedTerm = newValue!;
                      getStudentData();

                    });
                  },
                  items: termOptions.map((String option) {
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

  Widget scholasticTable(Size size) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: const {
            0: FixedColumnWidth(90),
            1: FixedColumnWidth(150),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(120),
            4: FixedColumnWidth(120),
            5: FixedColumnWidth(120),
            6: FixedColumnWidth(120),
            7: FixedColumnWidth(80),
          },
          children: [
            scholasticHeader(),
            ...scholasticRow(size),
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


  List<TableRow> scholasticRow(Size size) {
    return studentsList!.map((student) {
      String studentId = student['email'];
      Map<String, TextEditingController> controllers = scholasticControllers[studentId]!;

      return TableRow(
        children: [
          newTableCell(student["rollNumber"]?.toString() ?? ""),
          newTableCell(student['name']?.toString() ?? ""),

          FutureBuilder(future: getLastRecord(student["email"]),
            builder: (context, snapshot) {
            if(snapshot.connectionState== ConnectionState.waiting){
              return SizedBox();
            }else if(snapshot.hasError){
              return TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8),
                  child: Text("Error "),
                ),
              );
            }
            else{
              return TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8),
                  child: Text(snapshot.data.toString()),
                ),
              );
            }
          },),

          noteBookCell(controllers['noteBook']!),
          subjectEnrichmentCell(controllers['subjectEnrichment']!),
          practical(controllers['practical']!),
          theoryMark(controllers['theory']!),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextButton(
             // style: ElevatedButton.styleFrom(alignment: Alignment.center,backgroundColor: Colors.transparent,shape:RoundedRectangleBorder(side: BorderSide(color: Colors.green))),
              onPressed: () {
                // Save marks for this student

                saveScholasticMarks(
                    student,
                    controllers['noteBook']!.text,
                    controllers['subjectEnrichment']!.text,
                    controllers['practical']!.text,
                    controllers['theory']!.text
                );
              },
              child: Center(child: Text("Save",style: GoogleFonts.openSans(fontSize: size.width*0.045,fontWeight: FontWeight.w500,color: Colors.green),)),
            ),
          ),
        ],
      );
    }).toList();
  }
  Widget noteBookCell(TextEditingController controller) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child:  TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration:  const InputDecoration(
            hintText: 'Note Book Mark',
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }
  Widget subjectEnrichmentCell(TextEditingController controller) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child:  TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(
            hintText: 'Subject Enrichment Mark',
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }
  Widget practical(TextEditingController controller) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child:  TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(
            hintText: 'Practical Mark',
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }
  Widget theoryMark(TextEditingController controller) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),

        child:  TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(
            hintText: 'Theory Mark',
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }



  Widget nonScholasticTable(Size size) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: const {
            0: FixedColumnWidth(90),
            1: FixedColumnWidth(150),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(160),
            4: FixedColumnWidth(80),
          },
          children: [
            nonScholasticHeader(),
            ...nonScholasticRow(size),
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

  List<TableRow> nonScholasticRow(Size size) {
    return studentsList!.map((student) {
      String studentId = student['email'];
      Map<String, TextEditingController> controllers = nonScholasticControllers[studentId]!;

      return TableRow(
        children: [
          newTableCell(student["rollNumber"]?.toString() ?? ""),
          newTableCell(student['name']?.toString() ?? ""),
          workEducationCell(controllers['workEducation']!),
          generalKnowledgeCell(controllers['generalKnowledge']!),

          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextButton(
              onPressed: () {
                // Save marks for this student

                saveNonScholasticMarks(
                    student,
                    controllers['workEducation']!.text,
                    controllers['generalKnowledge']!.text
                );
              },
              child: Center(child: Text("Save",style: GoogleFonts.openSans(fontSize: size.width*0.045,fontWeight: FontWeight.w500,color: Colors.green),)),
            ),
          ),
        ],
      );
    }).toList();
  }

  Widget workEducationCell(TextEditingController controller) {
    return TableCell(
      child: Padding(
        padding: const EdgeInsets.all(8),
        child:  TextField(
          controller: controller,
          decoration:  const InputDecoration(
            hintText: 'Grade',
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }
  Widget generalKnowledgeCell(TextEditingController controller) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child:  TextField(
          controller: controller,

          decoration: const InputDecoration(
            hintText: 'Grade',
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
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
