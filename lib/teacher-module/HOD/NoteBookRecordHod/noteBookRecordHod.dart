import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/HOD/NoteBookRecordHODAPi/noteBookRecordAPI.dart';
import 'package:untitled/APIs/Teacher%20Module/NoteBookReord/noteBookRecordAPI.dart';
import 'package:untitled/teacher-module/NoteBookRecord/previousRecord.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../APIs/StudentsData/StudentApi.dart';


class NoteBookRecordHod extends StatefulWidget {
  const NoteBookRecordHod({super.key});

  @override
  _NoteBookRecordHodState createState() => _NoteBookRecordHodState();
}

class _NoteBookRecordHodState extends State<NoteBookRecordHod> {
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";
  List<String> classSections = [];
  List<String> classSubjects = [];
  Map<String, dynamic> _storedData = {};

  List<Map<String, dynamic>> studentsList = [];

  List<Map<String, dynamic>> noteBookRecordList = [];
  bool isLoading = false;
  NoteBookRecordHODAPI apiObj = NoteBookRecordHODAPI();
  String date = DateTime.now().toString().split(" ")[0];
  String session = '';
  Map<String, bool> editingStates = {};

  @override
  void initState() {
    super.initState();
    initializeDropdowns();
    session = calculateCurrentSession();
    getStudentData();
    notebookRecord();

  }

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


  Future<void> notebookRecord() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      List<dynamic> noteBookData = await apiObj.fetchNoteBookRecord(
        accessToken,
        _selectedClass,
        _selectedSection,
        _selectedSubject,
        0,
      );
      print("notebookdata $noteBookData");
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

  Future<void> updateRemark(String docID,String remark,) async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      dynamic data =await apiObj.updateRemark(accessToken, docID, remark, session);

      if(data==true){

        setState(() {
          showGreenSnackBar("NoteBookRecord Updated Successfully", context);
        });
      }else if(data==false){
        showRedSnackBar("Failed to Update a NoteBookRecord", context);
      }
    } catch (e) {
      showRedSnackBar("$e", context);
      print('Error fetching update data: $e');

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
  Widget build(BuildContext context) {
    print(noteBookRecordList);

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            dropDownButton(size),
        
            SizedBox(height: size.height*0.01),
            noteBookRecordList.isEmpty ? Center(child: Text("No Record Found")):Column(
              children: [
        
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
                isLoading? Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: themeObj.primayColor,
                    size: 50,
                  ),
                ):SizedBox(
                  height: size.height*0.7,
                  child: allTable(),
                ),
              ],
            ),
          ],
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
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child:DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Classes", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey),
                  underline: Container(),
                  value: _selectedClass.isEmpty ? null : _selectedClass,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedClass = newValue!;
                      updateSections();

                    });
                  },
                  items: _storedData.keys.toList().map((String option) {
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
                child:DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Sections", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSection.isEmpty ? null : _selectedSection,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSection = newValue!;
                      updateSubjects();

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
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSubject.isEmpty ? null : _selectedSubject,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSubject = newValue!;

                      notebookRecord();
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

  Widget allTable() {
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
            5: FixedColumnWidth(100),
            6: FixedColumnWidth(120),
          },
          children: [
            allHeader(),
            ...allRows(),
          ],
        ),
      ),
    );
  }

  TableRow allHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Date',
        'Chapter',
        'Topic',
        'Notebook Checked',
        'Details',
        'Remark',
        'Action',
      ].map((header) => TableCell(
        child: Container(
          height: 60, // Set your desired height here
          padding: EdgeInsets.all(8),
          alignment: Alignment.center, // This centers the content vertically
          child: Text(
              header,
              style: TextStyle(fontWeight: FontWeight.bold)
          ),
        ),
      )).toList(),
    );
  }
  List<TableRow> allRows() {
    return noteBookRecordList.map((notebook) {
      bool isEditing = editingStates[notebook['_id']] ?? false;
      TextEditingController remarkController = TextEditingController(text: notebook['remark']?.toString() ?? "");

      return TableRow(
        children: [
          newTableCell(notebook["date"]?.toString() ?? ""),
          newTableCell(notebook['chapter']?.toString() ?? ""),
          newTableCell(notebook['topic']?.toString() ?? ""),
          newTableCell(notebook['checked']?.toString() ?? ""),
          TextButton(onPressed: (){
            Navigator.push(context, MaterialPageRoute(builder: (context) => PreviousNoteBookRecord(docId: notebook['_id']?.toString() ?? " ", chapter: notebook['chapter']?.toString() ?? "", topic: notebook['topic']?.toString() ?? "", date: notebook['date']?.toString() ?? "", session: session,),));

          }, child: Text("showDetails")),
          isEditing
              ? TableCell(
            child: Container(
              height: 60,
              padding: EdgeInsets.all(8),
              alignment: Alignment.center,
              child: TextField(
                controller: remarkController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                ),
              ),
            ),
          )
              : newTableCell(notebook['remark']?.toString() ?? ""),
          TableCell(
            child: Container(
              height: 60,
              padding: EdgeInsets.all(8),
              alignment: Alignment.center,
              child: isEditing
                  ? Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                    icon: Icon(Icons.check, color: Colors.green),
                    onPressed: () async {
                      await updateRemark(notebook['_id'], remarkController.text);
                      setState(() {
                        editingStates[notebook['_id']] = false;
                        notebook['remark'] = remarkController.text;
                      });
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.close, color: Colors.red),
                    onPressed: () {
                      setState(() {
                        editingStates[notebook['_id']] = false;
                      });
                    },
                  ),
                ],
              )
                  : IconButton(
                icon: Icon(Icons.edit, color: Colors.blue),
                onPressed: () {
                  setState(() {
                    editingStates[notebook['_id']] = true;
                  });
                },
              ),
            ),
          ),
        ],
      );
    }).toList();
  }


  Widget newTableCell(String text) {
    return TableCell(
      child: Container(
        height: 60, // Set your desired height here
        padding: EdgeInsets.all(8),
        alignment: Alignment.center, // This centers the content vertically
        child: Text(text),
      ),
    );
  }

}