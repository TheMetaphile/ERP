import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Exam/ExamApi.dart';
import 'package:untitled/utils/utils.dart';

import '../../utils/theme.dart';

class Exams extends StatefulWidget {
  const Exams({super.key});

  @override
  State<Exams> createState() => _ExamsState();
}

class _ExamsState extends State<Exams> {



  TextEditingController note=TextEditingController();
  bool teacherSelected = false;
  bool studentSelected = false;
  @override
  void initState() {
    super.initState();

    // _fetchExams();

  }
  List<dynamic>?_exams;
  final examApiobj=ExamApi();

  Future<void> _fetchExams() async {
    try {
      SharedPreferences pref=await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken");
      examApiobj.fetchExams(accessToken!).then((exams) {
        setState(() {
          _exams = exams;
          print(_exams);
        });
      }).catchError((error) {
        print('Error fetching exams: $error');
      });
    }catch(e){
      print(e);
    }
  }

  String? selectedClass;
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
    '12th',
  ];
  String? selectedduration;
  List<String> durationOptions = [
    "1 hrs",
    '2 hrs',
    '3hrs',

  ];
  String? selectedTerm;
  List<String> termOptions = [
    "Term 1",
    "Term 2",
  ];
  String? selectedStream;
  List<String> streamOptions = [
    "PCM",
    "PCB",
    "Commerce",
    "Arts",
  ];
  String? selectedSubject;
  List<String> subjectOptions = [
    "Hindi",
    "English",
    "Maths",
    "Science",
    "Social Science",
    "Drawing",
    "Computer",
    "Sanskrit",
    "Physics",
    "Chemistry",
    "Economics",
    "Business",
    "Account",
  ];

  DateTime? selectedDate;
  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  TimeOfDay? _selectedTime;
  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );

    if (pickedTime != null && pickedTime != _selectedTime) {
      setState(() {
        _selectedTime = pickedTime;
      });
    }
  }
  List<Map<String, String>> examData=[
    {

      "class":"4th",
      "subject":"Hindi",
      "time":"09:30",
      "date":"12.03.24",
      "duration":"02:30 hr",
    },
    {

      "class":"9th",
      "subject":"English",
      "time":"09:30",
      "date":"12.03.24",
      "duration":"02:30 hr",
    },
    {

      "class":"7th",
      "subject":"Hindi",
      "time":"09:30",
      "date":"12.03.24",
      "duration":"02:30 hr",
    },
    {

      "class":"9th",
      "subject":"English",
      "time":"09:30",
      "date":"12.03.24",
      "duration":"02:30 hr",
    },
    {

      "class":"8th",
      "subject":"Hindi",
      "time":"09:30",
      "date":"12.03.24",
      "duration":"02:30 hr",
    },
    {

      "class":"5th",
      "subject":"Hindi",
      "time":"09:30",
      "date":"12.03.24",
      "duration":"02:30 hr",
    },
  ];

  ExamApi examApiObj=ExamApi();
bool isLoading=false;
  bool isScheduled=false;
  CustomTheme themeObj=CustomTheme();
  int? _selectedRowIndex;
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
          icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
        iconTheme:  IconThemeData(color:themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        title: Text("Exam",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
        actions: [
          ElevatedButton(
            onPressed: () {
              schedulExamtPopup(context,size);
            },
            child: Text("New Exam",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
              backgroundColor:  Colors.green.shade200,
            ),
          ),
        ],

      ),
      body: SingleChildScrollView(

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 6),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Search Exam",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
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
                        value: selectedClass,
                        onChanged: (newValue) {
                          setState(() {
                            selectedClass = newValue!;
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
                ],
              ),
            ),
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

                        _buildHeaderCell("Class", size),
                        _buildHeaderCell("Subject", size),
                        _buildHeaderCell("Time", size),
                        _buildHeaderCell("Date", size),
                        _buildHeaderCell("Duration", size),
                        _buildHeaderCell("Action", size),
                      ],
                    ),
                  ),
                  const Divider(thickness: 2, height: 2, color: Colors.black),
                  Container(
                      height: size.height * 0.63, // Adjust this value as needed
                      width: size.width * 1.55, // Adjust this value to fit all columns
                      child: ListView.separated(
                        itemBuilder: (context, index) {
                          final data = examData[index];

                          return InkWell(
                            onTap: () {
                              setState(() {
                                _selectedRowIndex = _selectedRowIndex == index ? null : index;
                              });
                            },
                            child: Row(
                              children: [
                                _buildDataCell(data["class"]!, size, index),
                                _buildDataCell(data["subject"]!, size, index),
                                _buildDataCell(data["time"]!, size, index),
                                _buildDataCell(data["date"]!, size, index),
                                _buildDataCell(data["duration"]!, size, index),
                                Container(
                                  width: size.width * 0.3,
                                  padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                                  color: _selectedRowIndex == index ? Colors.lightBlue.withOpacity(0.3) : null,
                                  child: Row(
                                    children: [
                                      Text(
                                        "Delete",
                                        style: GoogleFonts.openSans(
                                          color:  Colors.red,
                                          fontWeight: FontWeight.w400,
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      Text(
                                        " / ",
                                        style: GoogleFonts.openSans(
                                          color:  themeObj.textgrey,
                                          fontWeight: FontWeight.w400,
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      Text(
                                        "Edit",
                                        style: GoogleFonts.openSans(
                                          color:  Colors.green,
                                          fontWeight: FontWeight.w400,
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                    ],
                                  )

                            ),
                              ],
                            ),
                          );
                        },
                        separatorBuilder: (context, index) => Divider(),
                        itemCount: examData.length,
                      )
                  )
                ],
              ),
            )
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

  Widget _buildDataCell(String text, Size size, int rowIndex) {
    return Container(
      width: size.width * 0.25,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      color: _selectedRowIndex == rowIndex ? Colors.lightBlue.withOpacity(0.3) : null,
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: text == "Present" ? Colors.green : text == "Absent" ? Colors.red : themeObj.textBlack,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.035,
        ),
      ),
    );
  }
  void _showUpdateExamDialog(String classValue, String? stream, String examId, String currentSubject,) {
    final _subjectController = TextEditingController(text: currentSubject);

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Update/Delete Exam'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _subjectController,
                decoration: InputDecoration(
                  labelText: 'Subject',
                ),
              ),


            ],
          ),
          actions: [
            ElevatedButton(
              onPressed: () async {
                SharedPreferences pref = await SharedPreferences.getInstance();
                final accessToken = pref.getString("accessToken");

                try {
                  final deleteSuccess = await examApiObj.deleteExam(
                    accessToken!,
                    examId,
                    classValue,
                    stream,
                  );

                  if (deleteSuccess) {
                    _fetchExams(); // Refresh the exam list
                    showGreenSnackBar( 'Exam Deleted successfully',context,);
                    Navigator.of(context).pop();
                  } else {
                    showRedSnackBar( 'Failed to Deleted exam',context,);
                  }
                } catch (e) {
                  print( 'Error: $e');
                }
              },
              child: Text('Delete Exam',style: TextStyle(color: Colors.red),),

            ),
            ElevatedButton(
              onPressed: () async {
                SharedPreferences pref = await SharedPreferences.getInstance();
                final accessToken = pref.getString("accessToken");
                final update = {'subject': _subjectController.text};

                try {
                  final success = await examApiObj.updateExam(
                    accessToken!,
                    classValue,
                    stream,
                    examId,
                    update,
                  );

                  if (success) {
                    _fetchExams(); // Refresh the exam list
                    showGreenSnackBar( 'Exam updated successfully',context,);
                  } else {
                    showRedSnackBar( 'Failed to update exam',context,);

                  }
                } catch (e) {
                  print('Error: $e');
                }

                Navigator.of(context).pop();
              },
              child: Text('Update',style: TextStyle(color: Colors.green),),
            ),
          ],
        );
      },
    );
  }
  void schedulExamtPopup( BuildContext context ,Size size)async {
    return showDialog(
      context: context,
      builder: (context) {
        return  StatefulBuilder(
            builder: (context,setState) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Card(
                        margin: const EdgeInsets.all(0),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: size.height*0.02,),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Schedule New Exam",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black),),
                                  SizedBox(height: size.height*0.03,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Select Term*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                            width: size.width*0.4,
                                            height: size.height*0.06,
                                            decoration: BoxDecoration(
                                                border: Border.all(color: themeObj.textgrey),
                                                borderRadius: BorderRadius.circular(8)

                                            ),
                                            child: DropdownButton<String>(
                                              isExpanded: true,
                                              borderRadius: BorderRadius.circular(12),

                                              hint: Text("Select Term",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                              alignment: Alignment.center,
                                              padding: EdgeInsets.all(8),
                                              icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                              underline: Container(),
                                              value: selectedTerm,
                                              onChanged: (newValue) {
                                                setState(() {
                                                  selectedTerm = newValue!;
                                                });
                                              },
                                              items: termOptions.map((String option) {
                                                return DropdownMenuItem<String>(
                                                  value: option,
                                                  child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                                );
                                              }).toList(),
                                            ),
                                          ),
                                        ],
                                      ),
                                      Column(
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        children: [
                                          Text("Select Stream*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                            width: size.width*0.4,
                                            height: size.height*0.06,
                                            decoration: BoxDecoration(
                                                border: Border.all(color: themeObj.textgrey),
                                                borderRadius: BorderRadius.circular(8)

                                            ),
                                            child: DropdownButton<String>(
                                              isExpanded: true,
                                              borderRadius: BorderRadius.circular(12),

                                              hint: Text("Select Stream",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                              alignment: Alignment.center,
                                              padding: EdgeInsets.all(8),
                                              icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                              underline: Container(),
                                              value: selectedStream,
                                              onChanged: (newValue) {
                                                setState(() {
                                                  selectedStream = newValue!;
                                                });
                                              },
                                              items: streamOptions.map((String option) {
                                                return DropdownMenuItem<String>(
                                                  value: option,
                                                  child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                                );
                                              }).toList(),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.02,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Select Class*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                            width: size.width*0.4,
                                            height: size.height*0.06,
                                            decoration: BoxDecoration(
                                                border: Border.all(color: themeObj.textgrey),
                                                borderRadius: BorderRadius.circular(8)

                                            ),
                                            child: DropdownButton<String>(
                                              isExpanded: true,
                                              borderRadius: BorderRadius.circular(12),

                                              hint: Text("Class",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                              alignment: Alignment.center,
                                              padding: EdgeInsets.all(8),
                                              icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                              underline: Container(),
                                              value: selectedClass,
                                              onChanged: (newValue) {
                                                setState(() {
                                                  selectedClass = newValue!;
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
                                        ],
                                      ),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Select Subject*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                            width: size.width*0.4,
                                            height: size.height*0.06,
                                            decoration: BoxDecoration(
                                                border: Border.all(color: themeObj.textgrey),
                                                borderRadius: BorderRadius.circular(8)

                                            ),
                                            child: DropdownButton<String>(
                                              isExpanded: true,
                                              borderRadius: BorderRadius.circular(12),

                                              hint: Text("Subject",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                              alignment: Alignment.center,
                                              padding: EdgeInsets.all(8),
                                              icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                              underline: Container(),
                                              value: selectedSubject,
                                              onChanged: (newValue) {
                                                setState(() {
                                                  selectedSubject = newValue!;
                                                });
                                              },
                                              items: subjectOptions.map((String option) {
                                                return DropdownMenuItem<String>(
                                                  value: option,
                                                  child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                                );
                                              }).toList(),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.02,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Date*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                            width: size.width*0.4,
                                            height: size.height*0.06,
                                            child: TextButton(
                                              style: TextButton.styleFrom(backgroundColor: Colors.transparent,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),side: BorderSide(color: Colors.grey)),
                                              onPressed: () {
                                                _selectDate(context);
                                              },
                                              child:  Text("dd-mm-yy",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),

                                            )

                                          )
                                        ],
                                      ),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Time*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                              width: size.width*0.4,
                                              height: size.height*0.06,
                                              child: TextButton(
                                                style: TextButton.styleFrom(backgroundColor: Colors.transparent,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),side: BorderSide(color: Colors.grey)),
                                                onPressed: () {
                                                  _selectTime(context);
                                                },
                                                child:  Text("--:--",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),

                                              )

                                          )
                                        ],
                                      ),

                                    ],
                                  ),
                                  SizedBox(height: size.height*0.02,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Duration*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color: themeObj.textBlack),),
                                          SizedBox(height: size.height*0.01,),
                                          Container(
                                            width: size.width*0.4,
                                            height: size.height*0.06,
                                            decoration: BoxDecoration(
                                                border: Border.all(color: themeObj.textgrey),
                                                borderRadius: BorderRadius.circular(8)

                                            ),
                                            child: DropdownButton<String>(
                                              isExpanded: true,
                                              borderRadius: BorderRadius.circular(12),

                                              hint: Text("Duration",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                                              alignment: Alignment.center,
                                              padding: EdgeInsets.all(8),
                                              icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
                                              underline: Container(),
                                              value: selectedduration,
                                              onChanged: (newValue) {
                                                setState(() {
                                                  selectedduration = newValue!;
                                                });
                                              },
                                              items:durationOptions.map((String option) {
                                                return DropdownMenuItem<String>(
                                                  value: option,
                                                  child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                                                );
                                              }).toList(),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),




                                ],
                              ),

                              SizedBox(height: size.height*0.02,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  ElevatedButton(
                                    onPressed: () {
                                    },
                                    child: Text("Add New",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

                                    style: ElevatedButton.styleFrom(
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                                      backgroundColor:  Color.fromRGBO(59,130,246,1),
                                    ),
                                  ),
                                  ElevatedButton(
                                    onPressed: () {
                                      Navigator.pop(context);
                                    },
                                    child: Text("Save",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

                                    style: ElevatedButton.styleFrom(
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                                      backgroundColor:  Color.fromRGBO(34,197,94,1),
                                    ),
                                  ),
                                  ElevatedButton(
                                    onPressed: () {
                                    },
                                    child: Text("Cancel",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

                                    style: ElevatedButton.styleFrom(
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                                      backgroundColor:  Colors.redAccent,
                                    ),
                                  ),
                                ],
                              )
                              // Center(
                              //   child: SizedBox(
                              //     width: size.width*0.3,
                              //     child: ElevatedButton(
                              //         style: ElevatedButton.styleFrom(
                              //             elevation: 0,
                              //             backgroundColor:isLoading?Colors.transparent:Color(0XFF6FF87D),
                              //             shape:isLoading?RoundedRectangleBorder(side: BorderSide.none):RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),
                              //                 borderRadius: isLoading?BorderRadius.all(Radius.zero):BorderRadius.circular(8))
                              //         ),
                              //         onPressed: () async {
                              //           print("hell o");
                              //           setState(() {
                              //             isLoading=true;
                              //           });
                              //           try{
                              //             SharedPreferences pref=await SharedPreferences.getInstance();
                              //             final accessToken=pref.getString("accessToken");
                              //             print(accessToken);
                              //             isScheduled =
                              //             await examApiObj.scheduleExam(
                              //             accessToken!,
                              //                _selectedClass!,
                              //                examName.text,
                              //                selectedDate!,
                              //               _selectedTime!,
                              //                _selecteduration!,
                              //             );
                              //           }catch(error){
                              //             print(error);
                              //           }finally{
                              //             setState(() {
                              //               isLoading=false;
                              //               _fetchExams();
                              //             });
                              //           }
                              //           if(isScheduled){
                              //             Navigator.pop(context);
                              //             showGreenSnackBar("Exam Scheduled", context);
                              //           }
                              //         },
                              //         child: isLoading?CircularProgressIndicator():Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                              //   ),
                              // ),
                            ],
                          ),
                        ),
                      ),


                    ],
                  ),

                ],
              );
            }
        );

      },);

  }

}

