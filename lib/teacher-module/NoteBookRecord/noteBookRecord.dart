import 'dart:convert';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/NoteBookReord/noteBookRecordAPI.dart';
import 'package:untitled/teacher-module/NoteBookRecord/previousRecord.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../APIs/StudentsData/StudentApi.dart';
import '../../APIs/StudentsData/student.dart';

// class NoteBookRecord extends StatefulWidget {
//   const NoteBookRecord({super.key});
//
//   @override
//   _NoteBookRecordState createState() => _NoteBookRecordState();
// }
//
// class _NoteBookRecordState extends State<NoteBookRecord> {
//   String _selectedClass = "";
//   String _selectedSection = "";
//   String _selectedSubject = "";
//   List<String> classSections = [];
//   List<String> classSubjects = [];
//   Map<String, dynamic> _storedData = {};
//   String _selectedTab = 'All';
//   final TextEditingController _chapterController = TextEditingController();
//   final TextEditingController _topicController = TextEditingController();
//   List<Map<String, dynamic>> studentsList = [];
//   List<String> checkedList = [];
//   List<Map<String, dynamic>> noteBookRecordList = [];
//   bool isLoading = false;
//   NoteBookRecordAPI apiObj = NoteBookRecordAPI();
//   String date = DateTime.now().toString().split(" ")[0];
//   String session = '';
//
//   @override
//   void initState() {
//     super.initState();
//     initializeDropdowns();
//     session = calculateCurrentSession();
//     notebookRecord();
//     getStudentData();
//   }
//
//   String calculateCurrentSession() {
//     DateTime now = DateTime.now();
//     int currentYear = now.year;
//     int nextYear = currentYear + 1;
//     if (now.isBefore(DateTime(currentYear, 3, 31))) {
//       currentYear--;
//       nextYear--;
//     }
//     return "$currentYear-${nextYear.toString().substring(2)}";
//   }
//
//   Future<void> getStudentData() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//       if (accessToken == null) throw Exception("Access token is null");
//
//       StudentApi apiObj = StudentApi();
//       List<dynamic> students = await apiObj.fetchStudents(accessToken, _selectedClass, _selectedSection, 0);
//       setState(() {
//         studentsList = students.cast<Map<String, dynamic>>();
//       });
//     } catch (e) {
//       showError("Failed to fetch student data: $e");
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void> uploadNoteBookRecord() async {
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//       if (accessToken == null) throw Exception("Access token is null");
//
//       bool status = await apiObj.uploadNoteBook(
//         accessToken,
//         _selectedClass,
//         _selectedSection,
//         date,
//         _chapterController.text,
//         _topicController.text,
//         session,
//         _selectedSubject,
//         checkedList,
//       );
//
//       if (status) {
//         showGreenSnackBar("NoteBook Record Uploaded Successfully", context);
//         setState(() {
//           checkedList = [];
//           _chapterController.clear();
//           _topicController.clear();
//         });
//       } else {
//         showRedSnackBar("Failed to Upload NoteBook Record", context);
//       }
//     } catch (e) {
//       showError("Error uploading notebook record: $e");
//     }
//   }
//
//   Future<void> notebookRecord() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//       if (accessToken == null) throw Exception("Access token is null");
//
//       List<dynamic> noteBookData = await apiObj.notebookRecord(
//         accessToken,
//         _selectedClass,
//         _selectedSection,
//         _selectedSubject,
//         session,
//         0,
//       );
//       setState(() {
//         noteBookRecordList = noteBookData.cast<Map<String, dynamic>>();
//       });
//     } catch (e) {
//       showError("Failed to load notebook records: $e");
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   void initializeDropdowns() async {
//     try {
//       SharedPreferences prefs = await SharedPreferences.getInstance();
//       String? jsonString = prefs.getString('class_section_subjects');
//       if (jsonString != null) {
//         setState(() {
//           _storedData = jsonDecode(jsonString);
//           updateSections();
//         });
//       }
//     } catch (e) {
//       showError("Error initializing dropdowns: $e");
//     }
//   }
//
//   void updateSections() {
//     setState(() {
//       classSections = _storedData[_selectedClass]?.keys.toList() ?? [];
//       _selectedSection = "";
//       updateSubjects();
//     });
//   }
//
//   void updateSubjects() {
//     setState(() {
//       if (_selectedClass.isNotEmpty && _selectedSection.isNotEmpty) {
//         classSubjects = (_storedData[_selectedClass]?[_selectedSection] as List<dynamic>?)
//             ?.map((item) => item as String)
//             .toList() ?? [];
//         _selectedSubject = "";
//       } else {
//         classSubjects = [];
//       }
//     });
//   }
//
//   void showError(String message) {
//     ScaffoldMessenger.of(context).showSnackBar(
//       SnackBar(content: Text(message)),
//     );
//   }
//
//   CustomTheme themeObj=CustomTheme();
//   @override
//   Widget build(BuildContext context) {
//   print(noteBookRecordList);
//
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//         backgroundColor: themeObj.textWhite,
//         appBar: AppBar(
//           leading: IconButton(
//             onPressed: () => Navigator.pop(context),
//             icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
//           ),
//           backgroundColor: themeObj.primayColor,
//           title: Text(
//             "Note Book Record",
//             style: GoogleFonts.openSans(
//               color: themeObj.textBlack,
//               fontWeight: FontWeight.w500,
//               fontSize: size.width * 0.05,
//             ),
//           ),
//         ),
//       body: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             dropDownButton(size),
//             SizedBox(height: size.height*0.01),
//             Row(
//               children: [
//                 tabButton('All'),
//                 SizedBox(width: 8),
//                 tabButton('New'),
//               ],
//             ),
//             SizedBox(height: size.height*0.01),
//            _selectedTab == "New"?Column(
//              children: [
//
//              studentsList.isNotEmpty? Column(
//                children: [
//                  Row(
//                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                    children: [
//                      Expanded(
//
//                        child: TextField(
//                          controller: _chapterController,
//                          decoration: const InputDecoration(
//                            labelText: 'Chapter',
//                            border: OutlineInputBorder(),
//                          ),
//                        ),
//                      ),
//                      SizedBox(width: size.width*0.02,),
//                      Expanded(
//                        child: TextField(
//                          controller: _topicController,
//                          decoration: InputDecoration(
//                            labelText: 'Topic',
//                            border: OutlineInputBorder(),
//                          ),
//                        ),
//                      ),
//                    ],
//                  ),
//                  SizedBox(height: size.height*0.02),
//                  isLoading? Center(
//                    child: LoadingAnimationWidget.threeArchedCircle(
//                      color: themeObj.primayColor,
//                      size: 50,
//                    ),
//                  ):
//                  SizedBox(
//                    height: size.height*0.61,
//                    child: newTable(),
//                  ),
//                ],
//              ):     Center(child: Text("No Record Found")),
//              ],
//            ):
//            noteBookRecordList.isEmpty ? Center(child: Text("No Record Found")):Column(
//                  children: [
//
//                    Padding(
//                      padding: const EdgeInsets.only(left: 50.0),
//                      child: Text(
//                        'Swipe left and right to see all details',
//                        style: GoogleFonts.openSans(
//                            fontStyle: FontStyle.italic,
//                            color: Colors.grey[600],
//                            fontSize: size.width * 0.035),
//                      ),
//                    ),
//                    SizedBox(height: size.height * 0.02),
//                    isLoading? Center(
//                      child: LoadingAnimationWidget.threeArchedCircle(
//                        color: themeObj.primayColor,
//                        size: 50,
//                      ),
//                    ):SizedBox(
//                      height: size.height*0.66,
//                      child: allTable(),
//                    ),
//                  ],
//                ),
//           ],
//         ),
//       ),
//
//         floatingActionButton: _selectedTab=="New"?
//         SizedBox(
//           width: size.width*0.3,
//
//           child: TextButton(
//             onPressed: (){
//               uploadNoteBookRecord();
//
//           },
//             style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(216,180,254,1)),
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Text("Save",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.045),),
//               ],
//             ),
//           ),
//         ):SizedBox(),
//     );
//   }
//   Widget dropDownButton(Size size) {
//     return SingleChildScrollView(
//       scrollDirection: Axis.horizontal,
//       child: Row(
//         children: [
//           _buildDropdown(size, "Class", _selectedClass, _storedData.keys.toList(), (newValue) {
//             setState(() {
//               _selectedClass = newValue!;
//               updateSections();
//             });
//           }),
//           SizedBox(width: size.width * 0.02),
//           _buildDropdown(size, "Section", _selectedSection, classSections, (newValue) {
//             setState(() {
//               _selectedSection = newValue!;
//               updateSubjects();
//             });
//           }),
//           SizedBox(width: size.width * 0.02),
//           _buildDropdown(size, "Subject", _selectedSubject, classSubjects, (newValue) {
//             setState(() {
//               _selectedSubject = newValue!;
//               notebookRecord();
//             });
//           }),
//         ],
//       ),
//     );
//   }
//   Widget _buildDropdown(Size size, String hint, String value, List<String> items, Function(String?) onChanged) {
//     return Container(
//       width: size.width * 0.3,
//       decoration: BoxDecoration(
//           color: Colors.white,
//           borderRadius: BorderRadius.circular(30),
//           // boxShadow: [
//           //   BoxShadow(
//           //     color: Colors.grey.withOpacity(0.2),
//           //     spreadRadius: 1,
//           //     blurRadius: 5,
//           //     offset: Offset(0, 3),
//           //   ),
//           // ],
//           border: Border.all(color: Colors.grey)
//       ),
//       child: DropdownButtonHideUnderline(
//         child: DropdownButton<String>(
//           isExpanded: true,
//           hint: Text(hint, style: GoogleFonts.poppins(color: themeObj.textgrey, fontSize: size.width * 0.035)),
//           value: value.isEmpty ? null : value,
//           onChanged: onChanged,
//           items: items.map((String option) {
//             return DropdownMenuItem<String>(
//               value: option,
//               child: Text(option, style: GoogleFonts.poppins(color: themeObj.textBlack, fontSize: size.width * 0.035)),
//             );
//           }).toList(),
//           icon: Icon(Icons.arrow_drop_down, color: themeObj.textgrey),
//           borderRadius: BorderRadius.circular(30),
//           dropdownColor: Colors.white,
//           padding: EdgeInsets.symmetric(horizontal: 16),
//         ),
//       ),
//     );
//   }
//
//   Widget tabButton(String title) {
//     return ElevatedButton(
//       onPressed: () {
//         setState(() {
//           _selectedTab = title;
//           if(_selectedTab=="New"){
//             getStudentData();
//           }else{
//             notebookRecord();
//           }
//         });
//       },
//       style: ElevatedButton.styleFrom(
//         backgroundColor: _selectedTab == title ? Color.fromRGBO(216,180,254,1) : Colors.grey[300],
//       ),
//       child: Text(title, style: TextStyle(color: _selectedTab == title ? Colors.white : Colors.black)),
//     );
//   }
//   Widget allTable() {
//     return SingleChildScrollView(
//       scrollDirection: Axis.horizontal,
//       child: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Table(
//           border: TableBorder.all(),
//           columnWidths: {
//             0: FixedColumnWidth(90),
//             1: FixedColumnWidth(150),
//             2: FixedColumnWidth(120),
//             3: FixedColumnWidth(120),
//             4: FixedColumnWidth(120),
//           },
//           children: [
//             allHeader(),
//             ...allRows(),
//           ],
//         ),
//       ),
//     );
//   }
//
//   TableRow allHeader() {
//     return TableRow(
//       decoration: BoxDecoration(color: Colors.cyan[100]),
//       children: [
//         'Date',
//         'Chapter',
//         'Topic',
//         'Notebook Checked',
//         'Action',
//       ].map((header) => TableCell(
//         child: Container(
//           height: 60, // Set your desired height here
//           padding: EdgeInsets.all(8),
//           alignment: Alignment.center, // This centers the content vertically
//           child: Text(
//               header,
//               style: TextStyle(fontWeight: FontWeight.bold)
//           ),
//         ),
//       )).toList(),
//     );
//   }
//   List<TableRow> allRows() {
//     return noteBookRecordList.map((notebook) {
//       return TableRow(
//         children: [
//           newTableCell(notebook["date"]?.toString() ?? ""),
//           newTableCell(notebook['chapter']?.toString() ?? ""),
//           newTableCell(notebook['topic']?.toString() ?? ""),
//           newTableCell(notebook['checked']?.toString() ?? ""),
//           TextButton(onPressed: (){
//           Navigator.push(context, MaterialPageRoute(builder: (context) => PreviousNoteBookRecord(docId: notebook['_id']?.toString() ?? " ", chapter: notebook['chapter']?.toString() ?? "", topic: notebook['topic']?.toString() ?? "", date: notebook['date']?.toString() ?? "", session: session,),));
//
//           }, child: Text("showDetails")),
//         ],
//       );
//     }).toList();
//   }
//
//   Widget newTable() {
//     return SingleChildScrollView(
//       scrollDirection: Axis.horizontal,
//       child: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Table(
//           border: TableBorder.all(),
//           columnWidths: {
//             0: FixedColumnWidth(80),
//             1: FixedColumnWidth(150),
//             2: FixedColumnWidth(120),
//             3: FixedColumnWidth(120),
//             4: FixedColumnWidth(120),
//             5: FixedColumnWidth(150),
//           },
//
//           children: [
//             newHeader(),
//             ...newRows(),
//           ],
//         ),
//       ),
//     );
//   }
//
//   TableRow newHeader() {
//     return TableRow(
//       decoration: BoxDecoration(color: Colors.cyan[100]),
//       children: [
//         'Roll No.',
//         'Name',
//         'Date',
//         'Chapter',
//         'Topic',
//         'Notebook Checked'
//       ].map((header) => TableCell(
//         child: Container(
//           height: 60, // Set your desired height here
//           padding: EdgeInsets.all(8),
//           alignment: Alignment.center, // This centers the content vertically
//           child: Text(
//               header,
//               style: TextStyle(fontWeight: FontWeight.bold)
//           ),
//         ),
//       )).toList(),
//     );
//   }
//
//   List<TableRow> newRows() {
//     return studentsList.map((student) {
//       return TableRow(
//         decoration: BoxDecoration(),
//
//         children: [
//           newTableCell(student["rollNumber"]?.toString() ?? ""),
//           newTableCell(student['name']?.toString() ?? ""),
//           newTableCell(date),
//           newTableCell(_chapterController.text),
//           newTableCell(_topicController.text),
//           newCheckboxCell(student['email']?.toString() ?? ""),
//         ],
//       );
//     }).toList();
//   }
//
//   Widget newTableCell(String text) {
//     return TableCell(
//       child: Container(
//         height: 60, // Set your desired height here
//         padding: EdgeInsets.all(8),
//         alignment: Alignment.center, // This centers the content vertically
//         child: Text(text),
//       ),
//     );
//   }
//
//   Widget newCheckboxCell(String email) {
//     return TableCell(
//       child: Padding(
//         padding: EdgeInsets.all(8),
//         child: Switch(
//           value: checkedList.contains(email),
//           activeColor: Colors.green,
//           inactiveTrackColor: Colors.red[100],
//
//
//           onChanged: (bool value) {
//             setState(() {
//               if (value) {
//                 checkedList.add(email);
//               } else {
//                 checkedList.remove(email);
//               }
//               print(checkedList);
//             });
//           },
//         ),
//       ),
//     );
//   }
// }

class NoteBookRecord extends StatefulWidget {
  const NoteBookRecord({super.key});

  @override
  _NoteBookRecordState createState() => _NoteBookRecordState();
}

class _NoteBookRecordState extends State<NoteBookRecord>  with SingleTickerProviderStateMixin{
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";
  List<String> classSections = [];
  List<String> classSubjects = [];
  Map<String, dynamic> _storedData = {};
  String _selectedTab = 'All';
  final TextEditingController _chapterController = TextEditingController();
  final TextEditingController _topicController = TextEditingController();
  List<Map<String, dynamic>> studentsList = [];
  List<String> checkedList = [];
  List<Map<String, dynamic>> noteBookRecordList = [];
  bool isLoading = false;
  NoteBookRecordAPI apiObj = NoteBookRecordAPI();
  String date = DateTime.now().toString().split(" ")[0];
  String session = '';
  late AnimationController _animationController;
  late Animation<double> _animation;


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
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      StudentApi apiObj = StudentApi();
      List<dynamic> students = await apiObj.fetchStudents(accessToken, _selectedClass, _selectedSection, 0);
      setState(() {
        studentsList = students.cast<Map<String, dynamic>>();
      });
    } catch (e) {
      showError("Failed to fetch student data: $e");
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> uploadNoteBookRecord() async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      bool status = await apiObj.uploadNoteBook(
        accessToken,
        _selectedClass,
        _selectedSection,
        date,
        _chapterController.text,
        _topicController.text,
        session,
        _selectedSubject,
        checkedList,
      );

      if (status) {
        showGreenSnackBar("NoteBook Record Uploaded Successfully", context);
        setState(() {
          checkedList = [];
          _chapterController.clear();
          _topicController.clear();
        });
      } else {
        showRedSnackBar("Failed to Upload NoteBook Record", context);
      }
    } catch (e) {
      showError("Error uploading notebook record: $e");
    }
  }

  Future<void> notebookRecord() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      List<dynamic> noteBookData = await apiObj.notebookRecord(
        accessToken,
        _selectedClass,
        _selectedSection,
        _selectedSubject,
        session,
        0,
      );
      setState(() {
        noteBookRecordList = noteBookData.cast<Map<String, dynamic>>();
      });
    } catch (e) {
      showError("Failed to load notebook records: $e");
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void initializeDropdowns() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? jsonString = prefs.getString('class_section_subjects');
      if (jsonString != null) {
        setState(() {
          _storedData = jsonDecode(jsonString);
          updateSections();
        });
      }
    } catch (e) {
      showError("Error initializing dropdowns: $e");
    }
  }

  void updateSections() {
    setState(() {
      classSections = _storedData[_selectedClass]?.keys.toList() ?? [];
      _selectedSection = "";
      updateSubjects();
    });
  }

  void updateSubjects() {
    setState(() {
      if (_selectedClass.isNotEmpty && _selectedSection.isNotEmpty) {
        classSubjects = (_storedData[_selectedClass]?[_selectedSection] as List<dynamic>?)
            ?.map((item) => item as String)
            .toList() ?? [];
        _selectedSubject = "";
      } else {
        classSubjects = [];
      }
    });
  }

  void showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  CustomTheme themeObj=CustomTheme();


  @override
  void initState() {
    super.initState();
    initializeDropdowns();
    session = calculateCurrentSession();
    notebookRecord();
    getStudentData();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      resizeToAvoidBottomInset: true, // This ensures the view resizes when the keyboard appears
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        elevation: 0,
        title: AnimatedTextKit(
          animatedTexts: [
            TypewriterAnimatedText(
              'Note Book Record',
              textStyle: GoogleFonts.openSans(
                color: themeObj.textBlack,
                fontWeight: FontWeight.w500,
                fontSize: size.width * 0.05,
              ),
              speed: Duration(milliseconds: 100),
            ),
          ],
          totalRepeatCount: 1,
        ),
      ),
      body: SafeArea(
        child: AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Opacity(
              opacity: _animation.value,
              child: Transform.translate(
                offset: Offset(0, 20 * (1 - _animation.value)),
                child: SingleChildScrollView( // Wrap in SingleChildScrollView
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        dropDownButton(size),
                        SizedBox(height: size.height * 0.02),
                        tabButtons(),
                        SizedBox(height: size.height * 0.02),
                        _selectedTab == "New"
                            ? newRecordView(size)
                            : allRecordView(size),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
      floatingActionButton: _selectedTab == "New" ? saveButton(size) : null,
    );
  }

  Widget newRecordView(Size size) {
    return AnimationLimiter(
      child: Column(
        children: AnimationConfiguration.toStaggeredList(
          duration: const Duration(milliseconds: 375),
          childAnimationBuilder: (widget) => SlideAnimation(
            horizontalOffset: 50.0,
            child: FadeInAnimation(
              child: widget,
            ),
          ),
          children: [
            if (studentsList.isNotEmpty) ...[
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _chapterController,
                      decoration: InputDecoration(
                        labelText: 'Chapter',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide(color: Color(0xFF6200EE), width: 2),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: size.width * 0.02),
                  Expanded(
                    child: TextField(
                      controller: _topicController,
                      decoration: InputDecoration(
                        labelText: 'Topic',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide(color: Color(0xFF6200EE), width: 2),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: size.height * 0.02),
              Container(
                height: size.height * 0.57, // Set a fixed height or use Expanded if within a Column
                child: isLoading
                    ?  Center(
                   child: LoadingAnimationWidget.threeArchedCircle(
                     color: themeObj.primayColor,
                     size: 50,
                   ),
                 )
                    : newTable(),
              ),
            ] else
              Center(child: Text("No Record Found", style: TextStyle(fontSize: 18, color: Colors.grey[600]))),
          ],
        ),
      ),
    );
  }

  Widget allRecordView(Size size) {
    return noteBookRecordList.isEmpty
        ? Center(child: Text("No Record Found", style: TextStyle(fontSize: 18, color: Colors.grey[600])))
        : Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 50.0, bottom: 16),
          child: Text(
            'Swipe left and right to see all details',
            style: GoogleFonts.openSans(
              fontStyle: FontStyle.italic,
              color: Colors.grey[600],
              fontSize: MediaQuery.of(context).size.width * 0.035,
            ),
          ),
        ),
        Container(
        height: size.height * 0.57,
          child: isLoading
              ? Center(
                   child: LoadingAnimationWidget.threeArchedCircle(
                     color: themeObj.primayColor,
                     size: 50,
                   ),
                 )
              : allTable(),
        ),
      ],
    );
  }

  Widget dropDownButton(Size size) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _buildDropdown(size, "Class", _selectedClass, _storedData.keys.toList(), (newValue) {
            setState(() {
              _selectedClass = newValue!;
              updateSections();
            });
          }),
          SizedBox(width: size.width * 0.02),
          _buildDropdown(size, "Section", _selectedSection, classSections, (newValue) {
            setState(() {
              _selectedSection = newValue!;
              updateSubjects();
            });
          }),
          SizedBox(width: size.width * 0.02),
          _buildDropdown(size, "Subject", _selectedSubject, classSubjects, (newValue) {
            setState(() {
              _selectedSubject = newValue!;
              notebookRecord();
            });
          }),
        ],
      ),
    );
  }

  Widget _buildDropdown(Size size, String hint, String value, List<String> items, Function(String?) onChanged) {
    return Container(
      width: size.width * 0.3,
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(30),
          // boxShadow: [
          //   BoxShadow(
          //     color: Colors.grey.withOpacity(0.2),
          //     spreadRadius: 1,
          //     blurRadius: 5,
          //     offset: Offset(0, 3),
          //   ),
          // ],
          border: Border.all(color: Colors.grey)
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          isExpanded: true,
          hint: Text(hint, style: GoogleFonts.poppins(color: themeObj.textgrey, fontSize: size.width * 0.035)),
          value: value.isEmpty ? null : value,
          onChanged: onChanged,
          items: items.map((String option) {
            return DropdownMenuItem<String>(
              value: option,
              child: Text(option, style: GoogleFonts.poppins(color: themeObj.textBlack, fontSize: size.width * 0.035)),
            );
          }).toList(),
          icon: Icon(Icons.arrow_drop_down, color: themeObj.textgrey),
          borderRadius: BorderRadius.circular(30),
          dropdownColor: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 16),
        ),
      ),
    );
  }

  Widget tabButtons() {
    return Row(
      children: [
        Expanded(child: tabButton('All')),
        SizedBox(width: 8),
        Expanded(child: tabButton('New')),
      ],
    );
  }

  Widget tabButton(String title) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      decoration: BoxDecoration(
        color: _selectedTab == title ? themeObj.primayColor : Colors.grey[300],
        borderRadius: BorderRadius.circular(30),

      ),
      child: TextButton(
        onPressed: () {
          setState(() {
            _selectedTab = title;
            if (_selectedTab == "New") {
              getStudentData();
            } else {
              notebookRecord();
            }
          });
        },
        child: Text(
          title,
          style: TextStyle(
            color: _selectedTab == title ? Colors.white : Colors.black87,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }


  Widget allRecordsView() {
    return noteBookRecordList.isEmpty
        ? Center(child: Text("No Record Found", style: TextStyle(fontSize: 18, color: Colors.grey[600])))
        : Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 50.0, bottom: 16),
          child: Text(
            'Swipe left and right to see all details',
            style: GoogleFonts.openSans(
              fontStyle: FontStyle.italic,
              color: Colors.grey[600],
              fontSize: MediaQuery.of(context).size.width * 0.035,
            ),
          ),
        ),
        SizedBox(
          child: isLoading
              ? Center(child: CircularProgressIndicator(color: Color(0xFF6200EE)))
              : allTable(),
        ),
      ],
    );
  }

  Widget saveButton(Size size) {
    return Container(
      width: size.width * 0.32,
      height: size.height*0.08,
      child: ElevatedButton(
        onPressed: uploadNoteBookRecord,
        style: ElevatedButton.styleFrom(
          backgroundColor: themeObj.primayColor,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
          elevation: 5,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.save, color: Colors.white),
            SizedBox(width: 8),
            Text(
              "Save",
              style: GoogleFonts.openSans(
                color: themeObj.textWhite,
                fontWeight: FontWeight.w600,
                fontSize: size.width * 0.04,
              ),
            ),
          ],
        ),
      ),
    );
  }




  Widget allTable() {
    return AnimationLimiter(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: AnimationConfiguration.synchronized(
            duration: const Duration(milliseconds: 500),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: Container(

                  child: Table(
                    border: TableBorder.all(
                      color: Colors.cyan[200]!,
                      width: 1.5,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    columnWidths: {
                      0: FixedColumnWidth(90),
                      1: FixedColumnWidth(150),
                      2: FixedColumnWidth(120),
                      3: FixedColumnWidth(120),
                      4: FixedColumnWidth(120),
                    },
                    children: [
                      allHeader(),
                      ...allRows(),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  TableRow allHeader() {
    return TableRow(
      decoration: BoxDecoration(
        color: Colors.cyan[300],
        borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
      ),
      children: [
        'Date',
        'Chapter',
        'Topic',
        'Notebook Checked',
        'Action',
      ].map((header) => TableCell(
        child: Container(
          height: 60,
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            header,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.white,
              fontSize: 16,
            ),
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> allRows() {
    return noteBookRecordList.asMap().entries.map((entry) {
      final index = entry.key;
      final notebook = entry.value;
      return TableRow(
        decoration: BoxDecoration(
          color: index.isEven ? Colors.cyan[50] : Colors.white,
        ),
        children: [
          newTableCell(notebook["date"]?.toString() ?? ""),
          newTableCell(notebook['chapter']?.toString() ?? ""),
          newTableCell(notebook['topic']?.toString() ?? ""),
          newTableCell(notebook['checked']?.toString() ?? ""),
          TableCell(
            child: TextButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => PreviousNoteBookRecord(docId: notebook['_id']?.toString() ?? " ", chapter: notebook['chapter']?.toString() ?? "", topic: notebook['topic']?.toString() ?? "", date: notebook['date']?.toString() ?? "", session: session,),));
              },
              child: Text(
                "Show Details",
                style: TextStyle(color: Colors.blue[700]),
              ),
            ),
          ),
        ],
      );
    }).toList();
  }

  Widget newTable() {
    return AnimationLimiter(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: AnimationConfiguration.synchronized(
            duration: const Duration(milliseconds: 500),
            child: SlideAnimation(
              horizontalOffset: 50.0,
              child: FadeInAnimation(
                child: Container(
                  decoration: BoxDecoration(
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                  child: Table(
                    border: TableBorder.all(
                      color: Colors.purple[300]!,
                      width: 1.5,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    columnWidths: {
                      0: FixedColumnWidth(80),
                      1: FixedColumnWidth(150),
                      2: FixedColumnWidth(120),
                      3: FixedColumnWidth(120),
                      4: FixedColumnWidth(120),
                      5: FixedColumnWidth(150),
                    },
                    children: [
                      newHeader(),
                      ...newRows(),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  TableRow newHeader() {
    return TableRow(
      decoration: BoxDecoration(
        color: Colors.purple[300],
        borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
      ),
      children: [
        'Roll No.',
        'Name',
        'Date',
        'Chapter',
        'Topic',
        'Notebook Checked'
      ].map((header) => TableCell(
        child: Container(
          height: 60,
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            header,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.white,
              fontSize: 16,
            ),
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> newRows() {
    return studentsList.asMap().entries.map((entry) {
      final index = entry.key;
      final student = entry.value;
      return TableRow(
        decoration: BoxDecoration(
          color: index.isEven ? Colors.purple[50] : Colors.white,
        ),
        children: [
          newTableCell(student["rollNumber"]?.toString() ?? ""),
          newTableCell(student['name']?.toString() ?? ""),
          newTableCell(date),
          newTableCell(_chapterController.text),
          newTableCell(_topicController.text),
          newCheckboxCell(student['email']?.toString() ?? ""),
        ],
      );
    }).toList();
  }

  Widget newTableCell(String text) {
    return TableCell(
      child: Container(
        height: 60,
        padding: EdgeInsets.all(8),
        alignment: Alignment.center,
        child: Text(
          text,
          style: TextStyle(fontSize: 14),
        ),
      ),
    );
  }

  Widget newCheckboxCell(String email) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child: AnimatedSwitcher(
          duration: Duration(milliseconds: 300),
          transitionBuilder: (Widget child, Animation<double> animation) {
            return ScaleTransition(scale: animation, child: child);
          },
          child: Switch(
            key: ValueKey<bool>(checkedList.contains(email)),
            value: checkedList.contains(email),
            activeColor: Colors.green,
            inactiveTrackColor: Colors.red[100],
            onChanged: (bool value) {
              setState(() {
                if (value) {
                  checkedList.add(email);
                } else {
                  checkedList.remove(email);
                }
                print(checkedList);
              });
            },
          ),
        ),
      ),
    );
  }


}