import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';
import 'package:http/http.dart' as http;
import '../../../APIs/HOD/substituteClassTeacherAPI/substituteClassTeacherAPI.dart';

class SubstituteClassTeacher extends StatefulWidget {
  const SubstituteClassTeacher({super.key});

  @override
  State<SubstituteClassTeacher> createState() => _SubstituteClassTeacherState();
}

class _SubstituteClassTeacherState extends State<SubstituteClassTeacher> {

  bool isLoading = true;
  bool isLoadingMore = false;
  CustomTheme themeObj=CustomTheme();
  String selectedFilter = 'Absenteeism';
  SubstituteClassTeacherApi apiObj=SubstituteClassTeacherApi();
  Map<String , dynamic>? absenteeismData;
  Map<String , dynamic>? substitutionLogData;
  int start = 0;
  final ScrollController _scrollController = ScrollController();
  Map<String, bool> editingStates = {};

  String currentSearchQuery = '';
  Timer? _debounce;
  List<dynamic> searchResults = [];
  Future<void> fetchAbsenteeism() async {
    setState(() {
      isLoading = true;
    });

    try {

      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access  token not found');
      }

      var absenteeismFetch = await apiObj.absenteeismFetch(accessToken);

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

      substitutionLogData=substitutionLogFetch;

      print("substitutionLogFetch: $substitutionLogFetch");


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

  Future<void> searchTeachers(String query) async {
    if (query.isEmpty) {
      setState(() {
        searchResults = [];
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
          searchResults = data['Teachers'];
        });
      } else {
        throw Exception('Failed to load teachers');
      }
    } catch (e) {
      print('Error searching teachers: $e');
      showRedSnackBar("Error searching teachers: $e", context);
    }
  }

  Future<bool> createSubstitute(Map<String, dynamic> teacher, Map<String, dynamic> substitute) async {
    print(jsonEncode({
      "Class": teacher['class'],
      "section": teacher['section'],
      "classTeacherEmail": teacher['email'],
      "substituteEmail": substitute['email'],
      "date": DateTime.now().toIso8601String().split('T')[0],
      "session": "2024-25" // You might want to make this dynamic
    }),);
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
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      final response = await http.post(
        Uri.parse('https://philester.com/classTeacherSubstitute/create'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          "Class": teacher['class'],
          "section": teacher['section'],
          "classTeacherEmail": teacher['email'],
          "substituteEmail": substitute['email'],
          "date": DateTime.now().toIso8601String().split('T')[0],
          "session": session // You might want to make this dynamic
        }),
      );

      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
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


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchAbsenteeism();
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
    _debounce?.cancel();
    _scrollController.removeListener(_scrollListener);
    _scrollController.dispose();
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
         //   _buildFilterButtons(size),
            SizedBox(height: size.height * 0.015),
            isLoading ? Center(
              child: LoadingAnimationWidget.threeArchedCircle(
                color: themeObj.primayColor,
                size: 50,
              ),
            ) :
            selectedFilter == "Absenteeism" ? Column(children: [
              absenteeismData!['ClassTeachers']==null || absenteeismData!.isEmpty? SizedBox(
                  height: size.height*0.7,
                  child: Center(child: Text("No teacher is on Leave Today",style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)):
              absenteeism()
            ],) :Column(children: [
              substitutionLogData!['history']==null || substitutionLogData!.isEmpty? SizedBox(
                  height: size.height*0.7,
                  child: Center(child: Text("No teacher is on Leave Today",style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)):
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

  // Widget _buildFilterButtons(Size size) {
  //   return Row(
  //     mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  //     children: ['Absenteeism', 'SubstitutionLog'].map((filter) {
  //       return Padding(
  //         padding: EdgeInsets.only(right: size.width * 0.02),
  //         child: ElevatedButton(
  //           onPressed: () {
  //             setState(() {
  //               selectedFilter = filter;
  //             });
  //           },
  //
  //           style: ElevatedButton.styleFrom(
  //             backgroundColor: selectedFilter == filter
  //                 ? themeObj.primayColor
  //                 : const Color.fromRGBO(209, 213, 219, 1),
  //             shape: RoundedRectangleBorder(
  //               borderRadius: BorderRadius.circular(8),
  //
  //             ),
  //           ),
  //           child: Text(
  //             filter,
  //             style: TextStyle(
  //               color: _selectedTab == title ? Colors.white : Colors.black87,
  //               fontWeight: FontWeight.bold,
  //             ),
  //           ),
  //         ),
  //       );
  //     }).toList(),
  //   );
  // }

  Widget absenteeism() {

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: const {
            0: FixedColumnWidth(100),
            1: FixedColumnWidth(150),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(100),
            4: FixedColumnWidth(100),
            5: FixedColumnWidth(150),
            6: FixedColumnWidth(90),
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
        'Employee ID',
        'Name',
        'Date',
        'Class',
        'Section',
        'Substitute',
        'Actions',
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

    List<dynamic> classTeachers = absenteeismData!['ClassTeachers'] ??[];
    DateTime currentDateTime = DateTime.now();
    String date = currentDateTime.toString().split(' ')[0];

    return classTeachers.map((teacher) {
      String employeeId = teacher["employeeId"]?.toString() ?? "";
      bool isEditing = editingStates[employeeId] ?? false;

      return TableRow(
        children: [
          absenteeismTableCell(employeeId),
          absenteeismTableCell(teacher['name']?.toString() ?? ""),
          absenteeismTableCell(date),
          absenteeismTableCell(teacher['class']?.toString() ?? ""),
          absenteeismTableCell(teacher['section']?.toString() ?? ""),
          substituteCell(teacher, isEditing, employeeId),
          actionCell(size, employeeId, isEditing),
        ],
      );
    }).toList();
  }

  Widget actionCell(Size size, String employeeId, bool isEditing) {
    return TableCell(
      child: Padding(
        padding: const EdgeInsets.all(3.0),
        child: Center(
          child: SizedBox(
            height: size.height * 0.05,
            width: size.width * 0.1,
            child: IconButton(
              padding: EdgeInsets.zero,
              style: IconButton.styleFrom(
                backgroundColor: isEditing ? Colors.green : Colors.blue,
              ),
              constraints: const BoxConstraints(),
              onPressed: () {
                setState(() {
                  editingStates[employeeId] = !isEditing;
                });
              },
              icon: Icon(
                isEditing ? Icons.check : Icons.edit,
                color: themeObj.textWhite,
                size: 20,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget substituteCell(dynamic teacher, bool isEditing, String employeeId) {
    final textController = TextEditingController(
      text: teacher['substitute'] != null ? teacher['substitute']['name']?.toString() ?? "" : "",
    );
    if (teacher['substitute'] == null || isEditing) {
      return TableCell(
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Column(
            children: [
              TextField(
                decoration: const InputDecoration(
                  hintText: 'Enter substitute',
                  border: OutlineInputBorder(),
                ),
                controller: TextEditingController(
                  text: teacher['substitute'] != null ? teacher['substitute']['name']?.toString() ?? "" : "",
                ),
                onChanged: (value) {
                  if (_debounce?.isActive ?? false) _debounce!.cancel();
                  _debounce = Timer(const Duration(seconds: 1), () {
                    if (value != currentSearchQuery) {
                      currentSearchQuery = value;
                      if (value.isNotEmpty) {
                        searchTeachers(value);
                      } else {
                        setState(() {
                          searchResults = [];
                        });
                      }
                    }
                  });
                },
              ),
              if (searchResults.isNotEmpty)
                Container(
                  height: 200,
                  child: ListView.builder(
                    itemCount: searchResults.length,
                    itemBuilder: (context, index) {
                      var result = searchResults[index];
                      return ListTile(
                        title: Text(result['name']),
                        subtitle: Text(result['email']),
                        onTap: () async {
                          try {
                            print(teacher);
                            bool success = await createSubstitute(teacher, result);
                            print("success =$success");
                            if (success) {
                              setState(() {
                                teacher['substitute'] = result;
                                textController.text = result['name'];
                                searchResults = [];
                                editingStates[employeeId] = false;
                              });
                              showGreenSnackBar("Substitute created successfully", context);
                            } else {
                              showRedSnackBar("Failed to create substitute", context);
                            }
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
              padding: const EdgeInsets.all(8),
              alignment: Alignment.center,
              child: Text(teacher['substitute']['name'] ?? ""),
            ),
            Container(
              height: 35,
              padding: const EdgeInsets.all(8),
              alignment: Alignment.center,
              child: Text("ID ${teacher['substitute']['employeeId'] ?? ""}"),
            ),
          ],
        ),
      );
    }
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
                0: FixedColumnWidth(100),
                1: FixedColumnWidth(150),
                2: FixedColumnWidth(120),
                3: FixedColumnWidth(100),
                4: FixedColumnWidth(100),
                5: FixedColumnWidth(150),
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
        'Employee ID',
        'Name',
        'Date',
        'Class',
        'Section',
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

    List<dynamic> classTeachers = substitutionLogData!['history'] ?? [];
    if(classTeachers.isEmpty){
      return [];
    }

    return classTeachers.map((teacher) {

      final classTeacherDetails =teacher["classTeacherDetails"];
      final substituteTeacherDetails =teacher["substituteTeacherDetails"];

      return TableRow(
        children: [
          substitutionLogTableCell(classTeacherDetails["employeeId"]?.toString() ?? ""),
          substitutionLogTableCell(classTeacherDetails['name']?.toString() ?? ""),
          substitutionLogTableCell(teacher["date"]),
          substitutionLogTableCell(teacher['class']?.toString() ?? ""),
          substitutionLogTableCell(teacher['section']?.toString() ?? ""),
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