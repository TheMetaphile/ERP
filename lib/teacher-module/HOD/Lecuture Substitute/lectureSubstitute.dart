import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../APIs/HOD/substituteSubjectTeacher/substituteSubjectTeacher.dart';
import '../../../utils/theme.dart';
import '../../../utils/utils.dart';

class LectureSubstitute extends StatefulWidget {
  const LectureSubstitute({super.key});

  @override
  State<LectureSubstitute> createState() => _LectureSubstituteState();
}

class _LectureSubstituteState extends State<LectureSubstitute> {
  bool isLoading = true;
  bool isLoadingMore = false;
  CustomTheme themeObj=CustomTheme();
  String selectedFilter = 'Absenteeism';
  SubstituteSubjectTeacherApi apiObj=SubstituteSubjectTeacherApi();
  Map<String , dynamic>? absenteeismData;
  Map<String , dynamic>? substitutionLogData;
  int start = 0;
  final ScrollController _scrollController = ScrollController();
  Map<String, bool> editingStates = {};

  Map<String, List<dynamic>> searchResultsMap = {};
  Map<String, TextEditingController> textControllers = {};
  Map<String, Timer?> debounceTimers = {};

  String currentSearchQuery = '';

  List<dynamic> searchResults = [];
  final weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  int today = DateTime.now().weekday;
  String day="";

  String calculateDay(){
    return weekdays[today-1];
  }

  Future<void> fetchAbsenteeism() async {
    setState(() {
      isLoading = true;
    });

    try {

      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      var absenteeismFetch = await apiObj.absenteeismFetch(accessToken);

      print("ansemtiesm fetech $absenteeismFetch");

      absenteeismData=absenteeismFetch;

      print("absenteeismFetch: $absenteeismFetch");


    } catch (e) {

      print('Error in absenteeismFetch: $e');
      showRedSnackBar("'Error in absenteeismFetch: $e", context);
    }finally{
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchSubstitutionLog() async {
    setState(() {
      isLoading = true;
    });

    try {

      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      var substitutionLogFetch = await apiObj.substitutionLog(accessToken,start);

      print("substitutionLogFetch $substitutionLogFetch");
      substitutionLogData=substitutionLogFetch;

      // print("substitutionLogFetch: $substitutionLogFetch");


    } catch (e) {

      print('Error in substitutionLogFetch: $e');
      showRedSnackBar("'Error in substitutionLogFetch: $e", context);
    }finally{
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreSubstitutionLog() async {
    if (isLoadingMore) return;
    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }


      var substitutionLogFetch = await apiObj.substitutionLog(accessToken, start + substitutionLogData!['history'].length as int);
      start += substitutionLogData!['history'].length as int;

      setState(() {
        substitutionLogData!['history'].addAll(substitutionLogFetch['history']);
      });


    } catch (e) {
      print('No more Student Found: $e');
      showRedSnackBar("No more Student Found: $e", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }

  Future<void> searchTeachers(String query, String fieldKey) async {
    if (query.isEmpty) {
      setState(() {
        searchResultsMap[fieldKey] = [];
      });
      return;
    }

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      var response = await http.post(
        Uri.parse('https://philester.com/search/teacher'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          "accessToken": accessToken,
          "searchString": query,
          "start": 0,
          "end": 10
        }),
      );

      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        setState(() {
          searchResultsMap[fieldKey] = data['Teachers'];
        });
      } else {
        throw Exception('Failed to load teachers');
      }
    } catch (e) {
      print('Error searching teachers: $e');
      showRedSnackBar("Error searching teachers: $e", context);
    }
  }

  Future<bool> createSubstitute(int lecture, teacherEmail,String Class,String section,String subject, Map<String, dynamic> substitute) async {
    print("DATA ${ jsonEncode({
      "Class": Class,
      "section": section,
      "LectureTeacherEmail": teacherEmail,
      "substituteEmail": substitute['email'],
      "date": DateTime.now().toIso8601String().split('T')[0],
      "session": "2023-24",
      "subject": subject,
      "lecture":lecture,
    })}");
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
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
      String session=calculateCurrentSession();
      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      final response = await http.post(
        Uri.parse('https://philester.com/LectureSubstitute/create'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          "Class": Class,
          "section": section,
          "LectureTeacherEmail": teacherEmail,
          "substituteEmail": substitute['email'],
          "date": DateTime.now().toIso8601String().split('T')[0],
          "session": session,
          "subject": subject,
          "lecture":lecture,
        }),
      );

      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        print("Status ${data['status']} ");
        return data['status'];
      } else {
        var error = jsonDecode(response.body);
        throw Exception(error['error'] ?? 'Failed to create substitute');
      }
    } catch (e) {
      print('Error creating substitute: $e');
      rethrow;
    }
  }

  Future<String> checkAvailability(String lecture, Map<String, dynamic> substitute) async {

     String email=substitute["email"];

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }
    // String day1=day.toLowerCase();
     String day1="wednesday";
      final response = await http.get(
        Uri.parse('https://philester.com/timetable/fetch/checkAvailability?lecture=$lecture&day=$day1&email=$email'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
      );

      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        print("data['remark'] ${data['remark']}");
        return data['remark'];
      } else {
        var error = jsonDecode(response.body);
        throw Exception(error['error'] ?? 'Failed to find substitute');
      }
    } catch (e) {
      print('Error creating substitute: $e');
      rethrow;
    }
  }



  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchAbsenteeism();
    day=calculateDay();
    fetchSubstitutionLog();
    _scrollController.addListener(_scrollListener);
    if (absenteeismData != null && absenteeismData!['ClassTeachers'] != null) {
      for (var teacher in absenteeismData!['ClassTeachers']) {
        String employeeId = teacher["employeeId"]?.toString() ?? "";
        editingStates[employeeId] = false;
      }
    }
  }

  @override
  void dispose() {
    for (var controller in textControllers.values) {
      controller.dispose();
    }
    for (var timer in debounceTimers.values) {
      timer?.cancel();
    }
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreSubstitutionLog();
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.02),
            Row(
              children: [
                Expanded(child: buildTabButton('Absenteeism')),
                SizedBox(width: 8),
                Expanded(child: buildTabButton('SubstitutionLog')),
              ],
            ),
            SizedBox(height: size.height * 0.01),
            isLoading ? Center(
              child: LoadingAnimationWidget.threeArchedCircle(
                color: themeObj.primayColor,
                size: 50,
              ),
            ) :
            selectedFilter == "Absenteeism" ? Column(children: [
              absenteeismData!['Teachers']==null || absenteeismData!.isEmpty?const Center(child: Text("No teacher is on Leave Today"),):
              absenteeism()
            ],) :Column(children: [
              substitutionLogData!['history']==null || substitutionLogData!.isEmpty?const Center(child: Text("No teacher is on Leave Today"),):
              substitutionLogTable(),
            ],)

          ],
        ),
      ),

    );
  }
  Widget buildTabButton(String title) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      decoration: BoxDecoration(
        color: selectedFilter == title ? themeObj.primayColor : Colors.grey[300],
        borderRadius: BorderRadius.circular(30),
        boxShadow: selectedFilter == title
            ? [BoxShadow(color: themeObj.primayColor.withOpacity(0.3), blurRadius: 8, offset: Offset(0, 4))]
            : [],
      ),
      child: TextButton(
        onPressed: () {
          setState(() {
            selectedFilter = title;
          });
        },
        child: Text(
          title,
          style: TextStyle(
            color: selectedFilter == title ? Colors.white : Colors.black87,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }


  Widget absenteeism() {

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: const {
            0: FixedColumnWidth(80),
            1: FixedColumnWidth(120),
            2: FixedColumnWidth(100),
            3: FixedColumnWidth(120),
            4: FixedColumnWidth(80),
            5: FixedColumnWidth(100),
            6: FixedColumnWidth(120),
            7: FixedColumnWidth(100),
            8: FixedColumnWidth(150),
          },
          children: [
            absenteeismHeader(),
            ...absenteeismRows(),
          ],
        ),
      ),
    );
  }

  TableRow absenteeismHeader() {
    return TableRow(

      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Lecture',
        'Date',
        'Class',
        'Name',
        'Section',
        'Subject',
        'Substitute',
        'Remark',
        'Action',
      ].map((header) =>
          TableCell(
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Text(
                  header,
                  style: const TextStyle(fontWeight: FontWeight.bold)
              ),
            ),
          )).toList(),
    );
  }

  List<TableRow> absenteeismRows() {
    Size size = MediaQuery.of(context).size;
    if (absenteeismData == null || absenteeismData!.isEmpty) {
      return [];
    }

    List<dynamic> subjectTeachers = absenteeismData!['Teachers'];
    DateTime currentDateTime = DateTime.now();
    String date = currentDateTime.toString().split(' ')[0];

    return subjectTeachers.expand((teacher) {
      String employeeId = teacher["employeeId"]?.toString() ?? "";
      List<dynamic> lecturesForTheDay = teacher["lecturesForTheDay"];
      List<dynamic> substitutionDetails = teacher["substitutionDetails"];

      return lecturesForTheDay.map((lectureData) {
        final lecture = lectureData["lectureNo"];
        final Class = lectureData["class"];
        final section = lectureData["section"];
        final subject = lectureData["subject"];

        var substitution = substitutionDetails.firstWhere(
              (sub) => sub["lecture"] == lecture.toString(),
          orElse: () => null,
        );

        bool isEditing = editingStates["${employeeId}_$lecture"] ?? false;

        String fieldKey = "${employeeId}_$lecture";
        if (!textControllers.containsKey(fieldKey)) {
          textControllers[fieldKey] = TextEditingController(
            text: substitution != null ? substitution['name']?.toString() ?? "" : "",
          );
        }

        return TableRow(
          children: [
            absenteeismTableCell(lecture.toString()),
            absenteeismTableCell(date),
            absenteeismTableCell(Class?.toString() ?? ""),
            absenteeismTableCell(teacher['name']?.toString() ?? ""),
            absenteeismTableCell(section?.toString() ?? ""),
            absenteeismTableCell(subject?.toString() ?? ""),
            substituteCell(teacher, isEditing, employeeId, lecture, substitution, fieldKey),
            remarkCell(teacher, employeeId, lecture, substitution),
            actionCell(size,teacher["email"],Class!.toString(),section!.toString(),subject!.toString(), employeeId, lecture, isEditing, substitution),
          ],
        );
      }).toList();
    }).toList();
  }

  Widget substituteCell(dynamic teacher, bool isEditing, String employeeId, int lecture, Map<String, dynamic>? substitution, String fieldKey) {
    if (substitution == null || isEditing) {
      return TableCell(
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Column(
            children: [
              TextField(
                decoration: const InputDecoration(
                  hintText: 'Enter substitute',
                  border: OutlineInputBorder(),
                ),
                controller: textControllers[fieldKey],
                onChanged: (value) {
                  if (debounceTimers[fieldKey]?.isActive ?? false) debounceTimers[fieldKey]!.cancel();
                  debounceTimers[fieldKey] = Timer(const Duration(seconds: 1), () {
                    if (value.isNotEmpty) {
                      searchTeachers(value, fieldKey);
                    } else {
                      setState(() {
                        searchResultsMap[fieldKey] = [];
                      });
                    }
                  });
                },
              ),
              if (searchResultsMap[fieldKey]?.isNotEmpty ?? false)
                Container(
                  height: 200,
                  child: ListView.builder(
                    itemCount: searchResultsMap[fieldKey]!.length,
                    itemBuilder: (context, index) {
                      var result = searchResultsMap[fieldKey]![index];
                      return ListTile(
                          title: Text(result['name']),
                          subtitle: Text(result['email']),
                          onTap: () async {
                            try {
                              String remark = await checkAvailability(lecture.toString(), result);
                              setState(() {
                                var existingSubstitution = teacher['substitutionDetails'].firstWhere(
                                      (sub) => sub['lecture'] == lecture.toString(),
                                  orElse: () => null,
                                );
                                if (existingSubstitution != null) {
                                  existingSubstitution['name'] = result['name'];
                                  existingSubstitution['email'] = result['email'];
                                  existingSubstitution['employeeId'] = result['employeeId'];
                                  existingSubstitution['remark'] = remark;
                                  existingSubstitution['status'] = 'pending';
                                } else {
                                  teacher['substitutionDetails'] = teacher['substitutionDetails'] ?? [];
                                  teacher['substitutionDetails'].add({
                                    'name': result['name'],
                                    'email': result['email'],
                                    'employeeId': result['employeeId'],
                                    'lecture': lecture.toString(),
                                    'remark': remark,
                                    'status': 'pending',
                                  });
                                }
                                textControllers[fieldKey]!.text = result['name'];
                                searchResultsMap[fieldKey] = [];
                                editingStates["${employeeId}_$lecture"] = false;
                              });
                            } catch (e) {
                              showRedSnackBar(e.toString(), context);
                            }
                          }
                      );
                    },
                  ),
                ),
            ],
          ),
        ),
      );
    } else {
      return TableCell(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 35,
              padding: EdgeInsets.all(8),
              alignment: Alignment.center,
              child: Text(substitution['name'] ?? ""),
            ),
            Container(
              height: 35,
              padding: EdgeInsets.all(8),
              alignment: Alignment.center,
              child: Text("ID ${substitution['employeeId'] ?? ""}"),
            ),
          ],
        ),
      );
    }
  }

  Widget remarkCell(dynamic teacher, String employeeId, int lecture, Map<String, dynamic>? substitution) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Text(substitution?['remark'] ?? ""),
      ),
    );
  }

  Widget actionCell(Size size,String teacherEmail,String Class,String section,String subject, String employeeId, int lecture, bool isEditing, Map<String, dynamic>? substitution) {
    return TableCell(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          IconButton(
            icon: Icon(Icons.check, color: Colors.green),
            onPressed: () async {
              print("lectue $lecture");
              print("Teacher $teacherEmail -------------------------");
              print("Class $Class -------------------------");
              print("section $section -------------------------");
              print("subject $subject -------------------------");
              print("substitution $substitution------------------");
              print("substitution ------------------");
              try {
                String newRemark = await checkAvailability(lecture.toString(),
                   substitution!,
                );
                print("new Remark-----------");
                if (newRemark == "Good to go") {
                  bool success = await createSubstitute(
                    lecture,
                     teacherEmail,
                    Class,
                    section,
                    subject,
                    substitution
                  );

                  if (success) {
                    setState(() {
                      editingStates["${employeeId}_$lecture"] = false;
                      var teacher = absenteeismData!['Teachers'].firstWhere(
                            (t) => t['employeeId'] == employeeId,
                        orElse: () => null,
                      );
                      if (teacher != null) {
                        var existingSubstitution = teacher['substitutionDetails'].firstWhere(
                              (sub) => sub['lecture'] == lecture.toString(),
                          orElse: () => null,
                        );
                        if (existingSubstitution != null) {
                          existingSubstitution['remark'] = newRemark;
                          existingSubstitution['name'] = textControllers["${employeeId}_$lecture"]!.text;
                          existingSubstitution['email'] = textControllers["${employeeId}_$lecture"]!.text;
                        } else {
                          teacher['substitutionDetails'].add({
                            'name': textControllers["${employeeId}_$lecture"]!.text,
                            'email': textControllers["${employeeId}_$lecture"]!.text,
                            'lecture': lecture.toString(),
                            'remark': newRemark,
                          });
                        }
                      }
                    });
                    showGreenSnackBar("Substitute created successfully", context);
                  } else {
                    showRedSnackBar("Failed to create substitute", context);
                  }
                } else {
                  showRedSnackBar(newRemark, context);
                }
              } catch (e) {
                showRedSnackBar(e.toString(), context);
              }
            },
          ),
          IconButton(
            icon: Icon(Icons.edit, color: Colors.blue),
            onPressed: () {
              setState(() {
                editingStates["${employeeId}_$lecture"] = true;
              });
            },
          ),
          IconButton(
            icon: Icon(Icons.close, color: Colors.red),
            onPressed: () {
              setState(() {
                String fieldKey = "${employeeId}_$lecture";
                textControllers[fieldKey]!.clear();
                searchResultsMap[fieldKey] = [];
                editingStates["${employeeId}_$lecture"] = false;
              });
            },
          ),
        ],
      ),
    );
  }

  Widget absenteeismTableCell(String text) {
    return TableCell(
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Text(text),
      ),
    );
  }









  Widget substitutionLogTable() {
    return Column(
      children: [
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            controller: _scrollController,
            child: Table(
              border: TableBorder.all(),
              columnWidths: const {
                0: FixedColumnWidth(80),
                1: FixedColumnWidth(120),
                2: FixedColumnWidth(80),
                3: FixedColumnWidth(120),
                4: FixedColumnWidth(150),
                5: FixedColumnWidth(80),
                6: FixedColumnWidth(120),
                7: FixedColumnWidth(150),
              },

              children: [
                substitutionLogHeader(),
                ...substitutionLogRows(),
              ],
            ),
          ),

        ),
        if (isLoadingMore)
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: CircularProgressIndicator(),
          ),
      ],
    );
  }

  TableRow substitutionLogHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Lecture',
        'Date',
        'Class',
        'Employee ID',
        'Name',
        'Section',
        'Subject',
        'Substitute',
      ].map((header) => TableCell(
        child: Container(
          height: 60, // Set your desired height here
          padding: const EdgeInsets.all(8),
          alignment: Alignment.center, // This centers the content vertically
          child: Text(
              header,
              style: const TextStyle(fontWeight: FontWeight.bold)
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> substitutionLogRows() {

    if (substitutionLogData == null || substitutionLogData!.isEmpty) {
      return [];
    }

    List<dynamic> subjectTeachers = substitutionLogData!['history'];
    if(subjectTeachers.isEmpty){
      return [];
    }

    return subjectTeachers.map((teacher) {

      final substituteTeacherDetails =teacher["substituteTeacherDetails"];
      final classTeacherDetails =teacher["classTeacherDetails"];

      return TableRow(
        children: [
          substitutionLogTableCell(teacher["Lecture"]?.toString() ?? ""),
          substitutionLogTableCell(teacher["date"]),
          substitutionLogTableCell(teacher["class"]),
          substitutionLogTableCell(classTeacherDetails['employeeId']?.toString() ?? ""),
          substitutionLogTableCell(classTeacherDetails['name']?.toString() ?? ""),
          substitutionLogTableCell(teacher["section"]),
          substitutionLogTableCell(teacher["subject"]),

          substitutionColumnTableCell(substituteTeacherDetails['name'] != null
              ? substituteTeacherDetails['name']?.toString() ?? ""
              : "No substitute",
              substituteTeacherDetails['employeeId'] != null
                  ? substituteTeacherDetails['employeeId']?.toString() ?? ""
                  : "No substitute"),
        ],
      );
    }).toList();
  }
  Widget substitutionColumnTableCell(String name,String employeeID) {
    return TableCell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 35, // Set your desired height here
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center, // This centers the content vertically
            child: Text(name),
          ),
          Container(
            height: 35, // Set your desired height here
            padding: const EdgeInsets.all(8),
            alignment: Alignment.center, // This centers the content vertically
            child: Text("ID $employeeID"),
          ),
        ],
      ),
    );
  }
  Widget substitutionLogTableCell(String text) {
    return TableCell(
      child: Container(
        height: 60, // Set your desired height here
        padding: const EdgeInsets.all(8),
        alignment: Alignment.center, // This centers the content vertically
        child: Text(text),
      ),
    );
  }

}


