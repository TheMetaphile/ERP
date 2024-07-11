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
  String _selectedClass = '9th';
  String _selectedSection = 'A';
  String _selectedSubject = 'Maths';
  List<String> classOptions = [
    'Pre-Nursery',
    'Nursery',
    'L.K.G',
    'U.K.G',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',];
  List<String> classSections = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',];
  List<String> classSubjects = ['Science',
    'Maths',
    'English',
    'Social Science',
    'Hindi',
    'Computer'
  ];
  bool isLoading = false;
  TextEditingController solutionController = TextEditingController();

//Api Calling
  final doubtsApi = DoubtsApi();
  int start =0;
  String status = 'Pending';
  List<Doubt>? doubts;
  Map<String, TextEditingController> solutionControllers = {};
  Future<void> fetchDoubts() async {
    setState(() {
      isLoading = true;
    });
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? accessToken = pref.getString("accessToken");
    try {
      List<Doubt> allDoubts = await doubtsApi.fetchTeacherDoubts(
        accessToken!,
        _selectedClass,
        _selectedSection,
        _selectedSubject,
        status,
        start
      );
      print(allDoubts);
      setState(() {
        doubts = allDoubts;
      });

      // Create controllers for new doubts
      for (var doubt in allDoubts) {
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
        start = 0;
        status = 'Resolved';
        fetchDoubts(); // Refresh both lists
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
  @override
  void initState() {
    super.initState();
    fetchDoubts();
  }
  @override
  void dispose() {
    // Dispose of all controllers
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
            SizedBox(height: size.height * 0.01),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                TextButton(
                  onPressed: () {
                    setState(() {
                      status='Pending';
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
            dropDownButton(size),
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
                leading: Icon(CupertinoIcons.profile_circled, color: themeObj.textBlack, size: size.width * 0.1),
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
                        Container(
                          height: size.height * 0.1,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(color: Colors.grey, width: 1),
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(1),
                                spreadRadius: 0,
                                blurRadius: 5,
                                offset: Offset(0, 6),
                              ),
                            ],
                          ),
                          child: TextField(
                            maxLines: 5,
                            decoration: InputDecoration(
                              border: InputBorder.none,
                            ),
                            controller: solutionControllers[doubt.id],
                          ),
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
                                color: Color(0XFF6FF87D),
                                fontWeight: FontWeight.w400,
                                fontSize: size.width * 0.035,
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
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          buildDropdown(size, "Class", _selectedClass, classOptions, (newValue) {
            setState(() {
              _selectedClass = newValue!;
              start=0;
              fetchDoubts();
            });
          }),
          SizedBox(width: size.width * 0.02),
          buildDropdown(size, "Subject", _selectedSubject, classSubjects, (newValue) {
            setState(() {
              _selectedSubject = newValue!;
              fetchDoubts();
            });
          }),
          SizedBox(width: size.width * 0.02),
          buildDropdown(size, "Section", _selectedSection, classSections, (newValue) {
            setState(() {
              _selectedSection = newValue!;
              fetchDoubts();
            });
          }),
        ],
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