import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/Teacher Module/StudentDoubts/studentDoubts.dart';
import '../../utils/theme.dart';

class StudentDoubts extends StatefulWidget {
  const StudentDoubts({super.key});

  @override
  State<StudentDoubts> createState() => _StudentDoubtsState();
}

class _StudentDoubtsState extends State<StudentDoubts> {
  CustomTheme themeObj = CustomTheme();
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";

  List<String> classSections = [];
  List<String> classSubjects = [];
  Map<String, dynamic> _storedData = {};

  bool isLoading = false;
  TextEditingController solutionController = TextEditingController();

  final doubtsApi = DoubtsApi();
  String status = 'Pending';
  List<Doubt>? doubts;
  Map<String, TextEditingController> solutionControllers = {};

  Future<void> fetchDoubts() async {
    setState(() {
      isLoading = true;
      doubts = [];
    });

    SharedPreferences pref = await SharedPreferences.getInstance();
    String? accessToken = pref.getString("accessToken");
    try {
      List<Doubt> newDoubts = await doubtsApi.fetchTeacherDoubts(
          accessToken!,
          _selectedClass,
          _selectedSection,
          _selectedSubject,
          status,
          0  // start from the beginning
      );

      setState(() {
        doubts = newDoubts;
      });

      // Create controllers for new doubts
      for (var doubt in newDoubts) {
        if (!solutionControllers.containsKey(doubt.id)) {
          solutionControllers[doubt.id] = TextEditingController();
        }
      }
    } catch (e) {
      print('Error fetching doubts: $e');
      // Handle the error in your UI
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> answerDoubt(String doubtId) async {
    setState(() {
      isLoading = true;
    });
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? accessToken = pref.getString("accessToken");
    try {
      bool success = await doubtsApi.updateDoubt(
        accessToken: accessToken!,
        doubtId: doubtId,
        classNumber: _selectedClass,
        solution: solutionControllers[doubtId]!.text,
        replyDate: DateTime.now().toIso8601String().split('T')[0],
      );

      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Doubt answered successfully')),
        );
        solutionControllers[doubtId]!.clear();
        status = 'Resolved';
        fetchDoubts(); // Refresh the list
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to answer doubt')),
        );
      }
    } catch (e) {
      print('Error answering doubt: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error answering doubt')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void initializeDropdowns() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? jsonString = prefs.getString('class_section_subjects');

    if (jsonString != null) {
      Map<String, dynamic> storedData = jsonDecode(jsonString);
      setState(() {
        _storedData = storedData;
        updateSections();
      });
    }
  }

  void updateSections() {
    classSections = _storedData[_selectedClass]?.keys.toList() ?? [];
    _selectedSection = "";
    updateSubjects();
  }

  void updateSubjects() {
    if (_selectedClass.isNotEmpty && _selectedSection.isNotEmpty) {
      // Cast List<dynamic> to List<String>
      classSubjects = (_storedData[_selectedClass]?[_selectedSection] as List<dynamic>?)
          ?.map((item) => item as String)
          .toList() ?? [];
      _selectedSubject = "";
    } else {
      classSubjects = [];
    }
  }
  @override
  void initState() {
    super.initState();
    fetchDoubts();
    initializeDropdowns();
  }

  @override
  void dispose() {
    solutionControllers.values.forEach((controller) => controller.dispose());
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Student Doubts",
          style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.05),
        ),
      ),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 3),
        width: size.width,
        height: size.height * 1,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            dropDownButton(size),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                TextButton(
                  onPressed: () {
                    setState(() {
                      status = 'Pending';
                    });
                    fetchDoubts();
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status=='Pending' ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "New Doubts",
                    style: TextStyle(
                      color: themeObj.textBlack,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    setState(() {
                      status= 'Resolved';
                    });
                    fetchDoubts();
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: status=='Resolved' ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Answer Doubts",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.02),
            isLoading
                ? Center(
              child: LoadingAnimationWidget.threeArchedCircle(
                color: themeObj.primayColor,
                size: 50,
              ),
            )
                : Expanded(
                child: _buildDoubtsList(doubts, size, status=='Pending')
            )
          ],
        ),
      ),
    );
  }

  Widget _buildDoubtsList(List<Doubt>? doubts, Size size, bool isNewDoubt) {
    return doubts == null || doubts.isEmpty
        ? Center(child: Text("No doubts found"))
        : ListView.builder(
      itemCount: doubts.length,
      itemBuilder: (context, index) {
        final doubt = doubts[index];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              margin: EdgeInsets.all(0),
              elevation: 3,
              child: ExpansionTile(
                leading: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 5.0),
                  child: CircleAvatar(
                    radius: size.width * 0.08,
                    backgroundImage: NetworkImage(doubt.students[0].profileLink?? 'https://example.com/default-profile-pic.jpg'),
                  ),
                ),
                title: Text(
                  "${doubt.students[0].name} with roll number ${doubt.students[0].rollNumber} has a doubt in ${doubt.subject}",
                  style: TextStyle(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w400,
                    fontSize: size.width * 0.035,
                  ),
                ),
                shape: Border.all(color: Colors.transparent),
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 10.0),
                        child: Text(
                          "Question: ${doubt.question}",
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            color: themeObj.textBlack,
                            fontWeight: FontWeight.w400,
                            fontSize: size.width * 0.035,
                          ),
                        ),
                      ),
                      SizedBox(height: size.height * 0.01),
                      if (isNewDoubt)
                        TextField(
                          maxLines: 5,

                          decoration:InputDecoration(
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12))
                          ),
                          controller: solutionControllers[doubt.id],
                        ),
                      if (isNewDoubt)
                        Container(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              SizedBox(
                                width: size.width * 0.3,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Color(0XFF6FF87D),
                                    shape: RoundedRectangleBorder(
                                      side: BorderSide(color: Colors.grey, width: 1),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                  onPressed: () {
                                    answerDoubt(doubt.id);
                                  },
                                  child: Text(
                                    "Post",
                                    style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      if (!isNewDoubt && doubt.solution != null)
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            SizedBox(width: size.width*0.03,),
                            Text(
                              "Solution: ${doubt.solution}",
                              textAlign: TextAlign.start,
                              style: TextStyle(
                                color: Colors.blue,
                                fontWeight: FontWeight.w400,
                                fontSize: size.width * 0.045,
                              ),
                            ),
                          ],
                        ),
                    ],
                  )
                ],
              ),
            ),
            SizedBox(height: size.height * 0.02)
          ],
        );
      },
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

                      fetchDoubts();
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

  Widget buildDropdown(Size size, String hint, String value, List<String> items, Function(String?) onChanged) {
    return Card(
      child: SizedBox(
        width: size.width * 0.27,
        height: size.height * 0.05,
        child: DropdownButton<String>(
          isExpanded: true,
          borderRadius: BorderRadius.circular(12),
          hint: Text(hint),
          padding: EdgeInsets.all(8),
          icon: const Icon(Icons.keyboard_arrow_down_sharp),
          alignment: Alignment.center,
          underline: Container(),
          value: value,
          onChanged: onChanged,
          items: items.map((String option) {
            return DropdownMenuItem<String>(
              value: option,
              child: Text(option, overflow: TextOverflow.ellipsis),
            );
          }).toList(),
        ),
      ),
    );
  }
}
