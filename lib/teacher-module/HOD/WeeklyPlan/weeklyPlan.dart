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
      showError("Failed to load plan records: $e");
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
            dropDownButton(size),
            SizedBox(height: size.height*0.01,),
            Row(
              children: [
                tabButton('Current Week'),
                SizedBox(width: 8),
                tabButton('Next Week'),
              ],
            ),
            plan.isEmpty?Center(child: Text("No Record Found")):Column(
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
  Widget tabButton(String title) {
    return ElevatedButton(
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
      style: ElevatedButton.styleFrom(
        backgroundColor: _selectedTab == title ? Color.fromRGBO(216,180,254,1) : Colors.grey[300],
      ),
      child: Text(title, style: TextStyle(color: _selectedTab == title ? Colors.white : Colors.black)),
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
                      plan=[];
                      docID="";
                    _selectedTab == "Current Week" ?  fetchWeeklyPlan(startOfWeek.toString().split(" ")[0].toString()) :  fetchWeeklyPlan(startOfNextWeek.toString().split(" ")[0].toString());
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


