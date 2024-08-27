import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/HOD/WeeklyPlannerAPI/weeklyPlanner.dart';
import 'package:untitled/utils/utils.dart';

import '../../../utils/theme.dart';

class WeeklyPlanHod extends StatefulWidget {
  const WeeklyPlanHod({super.key});

  @override
  State<WeeklyPlanHod> createState() => _WeeklyPlanHodState();
}

class _WeeklyPlanHodState extends State<WeeklyPlanHod> {
  Map<String, dynamic> _storedData = {};
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";
  List<String> classSections = [];
  List<String> classSubjects = [];
  CustomTheme themeObj=CustomTheme();
  String _selectedTab = 'Current Week';
  bool isLoading = false;
  String docID="";
  List<dynamic> plan = [];
  TextEditingController remark=TextEditingController();
  String _selectedStatus = "";
  List<String> statusOption = [
    "Accept",
    "Reject"
  ];


  WeeklyPlannerHodAPI apiObj=WeeklyPlannerHodAPI();



  Future<void> fetchWeeklyPlan(String startingDate) async {
    setState(() {
      isLoading = true;
    });
    print("plan =$plan");
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      Map<String,dynamic> fetchData =await apiObj.fetchPlan(accessToken, _selectedClass, _selectedSection, _selectedSubject,startingDate );

       print("fetched data of ${_selectedTab }---------------$fetchData");
      setState(() {
        plan = fetchData["plan"];
        docID=fetchData["_id"];
      });
    } catch (e) {
      print("Failed to load plan records: $e");
      showError("$e");
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> update(String remark,String docID,) async {
    setState(() {
      isLoading = true;
    });
    print("plan =$plan");
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      bool succes =await apiObj.update(accessToken, docID,remark,_selectedStatus);

    if(succes){
    setState(() {

      showGreenSnackBar("The Remark is Updated Successfully", context);
    });
    }else{
      showRedSnackBar("The Remark is not Updated Successfully", context);
    }
    } catch (e) {
      print("Failed to load plan records: $e");
      showError("Failed to load plan records: $e");
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  DateTime now = DateTime.now();

  DateTime? startOfWeek;

  DateTime? startOfNextWeek;

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

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
     startOfWeek = DateTime(now.year, now.month, now.day).subtract(Duration(days: now.weekday - DateTime.monday));
    startOfNextWeek = startOfWeek?.add(Duration(days: 7));
    initializeDropdowns();
    fetchWeeklyPlan(startOfWeek.toString().split(" ")[0].toString());


  }
  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            dropDownButton(size),
            SizedBox(height: size.height*0.02,),
            Row(
              children: [
                Expanded(child: buildTabButton('Current Week')),
                SizedBox(width: 8),
                Expanded(child: buildTabButton('Next Week')),
              ],
            ),
            SizedBox(height: size.height*0.02,),
            plan.isEmpty?SizedBox(
                height: size.height*0.64,
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.class_outlined, size: 100, color: Colors.grey[400]),
                    SizedBox(height: 20),
                    Text(
                      "No Record found",
                      style: TextStyle(fontSize: 18, color: Colors.grey[600]),
                    ),
                  ],
                ),
              ),):Column(
              children: [
                SizedBox(height: size.height*0.01,),
                isLoading? Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: themeObj.primayColor,
                    size: 50,
                  ),
                ):
                _selectedTab == "Current Week"? Container(

                  height: size.height*0.64,
                  child: allTable(),
                ):
                Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    allTable(),
                    SizedBox(height: size.height*0.01,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(

                          child: TextField(
                            controller: remark,

                               decoration: const InputDecoration(
                              labelText: 'Remark',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),
                        SizedBox(width: size.width*0.02,),
                        Expanded(
                          child: Container(
                            width: size.width * 0.3,
                            height: size.height * 0.075,
                            decoration: BoxDecoration(
                                border: Border.all(color:themeObj.textgrey),
                                borderRadius: BorderRadius.circular(8)

                            ),
                            child:DropdownButton<String>(
                              isExpanded: true,
                              borderRadius: BorderRadius.circular(12),
                              hint: Text("Status", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                              alignment: Alignment.center,
                              padding: EdgeInsets.all(8),
                              icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey),
                              underline: Container(),
                              value: _selectedStatus,
                              onChanged: (newValue) {
                                setState(() {
                                  _selectedStatus = newValue!;

                                });
                              },
                              items: statusOption.toList().map((String option) {
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
                    SizedBox(height: size.height*0.01,),
                    Center(
                      child:ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor: Colors.cyan[100] ),
                        onPressed: (){
                           update(remark.text.toString(), docID);
                        },
                        child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color: themeObj.textBlack,),),
                      ),

                    )

                  ],
                ),
              ],
            ),

          ],
        ),
      ),

    );
  }

  Widget buildTabButton(String title) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      decoration: BoxDecoration(
        color: _selectedTab == title ? themeObj.primayColor : Colors.grey[300],
        borderRadius: BorderRadius.circular(30),
        boxShadow: _selectedTab == title
            ? [BoxShadow(color: themeObj.primayColor.withOpacity(0.3), blurRadius: 8, offset: Offset(0, 4))]
            : [],
      ),
      child: TextButton(
        onPressed: () {
          setState(() {
            _selectedTab = title;
            plan=[];
            if(_selectedTab=="Current Week"){
              docID="";
              fetchWeeklyPlan(startOfWeek.toString().split(" ")[0].toString());
            }else{
              docID="";
              fetchWeeklyPlan(startOfNextWeek.toString().split(" ")[0].toString());
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
              plan=[];
              docID="";
              _selectedTab == "Current Week" ?  fetchWeeklyPlan(startOfWeek.toString().split(" ")[0].toString()) :  fetchWeeklyPlan(startOfNextWeek.toString().split(" ")[0].toString());
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

  Widget allTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: {
            0: FixedColumnWidth(100),
            1: FixedColumnWidth(100),
            2: FixedColumnWidth(120),
            3: FixedColumnWidth(120),
            4: FixedColumnWidth(100),
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
        'Teaching Aids',
        'Activity(if Any)',
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
   if(_selectedTab=="Current Week"){
     return plan.map((item) {

       return TableRow(
         children: [
           newTableCell(item["date"]?.toString() ?? ""),
           newTableCell(item['chapter']?.toString() ?? ""),
           newTableCell(item['topic']?.toString() ?? ""),
           newTableCell(item['teachingAids']?.toString() ?? ""),
           newTableCell(item['Activity']?.toString() ?? ""),

         ],
       );
     }).toList();
   }
   else{
     return plan.map((item) {

       return TableRow(
         children: [
           newTableCell(item["date"]?.toString() ?? ""),
           newTableCell(item['chapter']?.toString() ?? ""),
           newTableCell(item['topic']?.toString() ?? ""),
           newTableCell(item['teachingAids']?.toString() ?? ""),
           newTableCell(item['Activity']?.toString() ?? ""),

         ],
       );
     }).toList();
   }
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


