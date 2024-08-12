import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/HOD/WeeklyPlannerAPI/weeklyPlanner.dart';
import 'package:untitled/utils/utils.dart';

import '../../../utils/theme.dart';
import '../../APIs/Teacher Module/WeeklyPlanner/weeklyPlannerTeacherApi.dart';

class WeeklyPlanTeacher extends StatefulWidget {
  const WeeklyPlanTeacher({super.key});

  @override
  State<WeeklyPlanTeacher> createState() => _WeeklyPlanTeacherState();
}

class _WeeklyPlanTeacherState extends State<WeeklyPlanTeacher> {
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
  List<Map<String,dynamic>> formattedPlan = [];
  // TextEditingController remark=TextEditingController();
  // String _selectedStatus = "";
  // List<String> statusOption = [
  //   "Accept",
  //   "Reject"
  // ];
  String status="";
  String remark="";


  WeeklyPlannerTeacherAPI apiObj=WeeklyPlannerTeacherAPI();



  Future<void> fetchWeeklyPlan(String startingDate) async {
    setState(() {
      isLoading = true;
    });
    print("plan =$plan");
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");

      Map<String,dynamic> fetchData =await apiObj.fetchTeacherPlan(accessToken, _selectedClass, _selectedSection, _selectedSubject,startingDate );

      print("fetched data of ${_selectedTab }---------------$fetchData");
      setState(() {
        plan = fetchData["plan"];
        print(plan);
       if( _selectedTab == "Next Week") {

         status=fetchData["coordinatorStatus"]??"";
         print("status $status");
         remark=fetchData["coordinatorRemark"]??"";
         if(status!="Accept"){
           formattedPlan = plan.map((item) => {
             'date': item['date'],
             'chapter': item['chapter'],
             'topic': item['topic'],
             'teachingAids': item['teachingAids'],
             'Activity': item['Activity'],
           }).toList();
         }
         if(formattedPlan.isEmpty){
           formattedPlan = [
             for (int i = 0; i < 6; i++)
               {
                 "date": DateTime.parse(startingDate).add(Duration(days: i)),
                 "chapter": "",
                 "topic": "",
                 "teachingAids": "",
                 "Activity": "",
                 "_id": ""
               }
           ];
           print("creatable formattedplan $formattedPlan");

         }
       }
       print("formatPlan=$formattedPlan");
      });
    } catch (e) {
      print("Cache run");
        if( _selectedTab == "Next Week") {
          if(formattedPlan.isEmpty){

            print( DateTime.parse(startingDate).add(Duration(days: 1)).toString().split(" ")[0].toString(),);
            formattedPlan = [
              for (int i = 0; i < 6; i++)
                {
                  "date": DateTime.parse(startingDate).add(Duration(days: i)).toString().split(" ")[0].toString(),
                  "chapter": "",
                  "topic": "",
                  "teachingAids": "",
                  "Activity": "",
                  "_id": ""
                }

            ];
            print("creatable formatted $formattedPlan");

          }
        }
        print("formatPlan=$formattedPlan");

        if( _selectedTab != "Next Week"){
          showError("Failed to load plan records: $e");
        }

    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> createPlan(String startingDate) async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception("Access token is null");



      var success = await apiObj.createLessonPlan(accessToken, formattedPlan, _selectedClass, _selectedSection, _selectedSubject, startingDate);

      if (success == true) {
        showGreenSnackBar("The weekly Plan is uploaded Successfully", context);
      } else {
        showRedSnackBar("The weekly Plan failed to upload", context);
      }
    } catch (e) {
      print("Failed to upload plan records: $e");
      showError("Failed to upload plan records: $e");
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
      appBar: AppBar(
          leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
          ),
          backgroundColor: themeObj.primayColor,
          title: Text("Weekly Planner",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.01,),
            dropDownButton(size),
            SizedBox(height: size.height*0.01,),
            Row(
              children: [
                tabButton('Current Week'),
                SizedBox(width: 8),
                tabButton('Next Week'),
              ],
            ),
            Column(
              children: [
                SizedBox(height: size.height*0.01,),
                isLoading? Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: themeObj.primayColor,
                    size: 50,
                  ),
                ):
                _selectedTab == "Current Week"? plan.isEmpty? Center(child: Text("No Record Found")): Container(

                  height: size.height*0.64,
                  child: allTable(),
                ):

               status == "Accept"?
               Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    allTable(),
                    SizedBox(height: size.height*0.02,),

                    Text("Status : $status",style: GoogleFonts.openSans(fontSize:size.width*0.045,color: themeObj.textBlack,),),
                    SizedBox(height: size.height*0.01,),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 3.0),
                      child: SizedBox(
                          child: AutoSizeText("Remark : $remark",style: GoogleFonts.openSans(fontSize:size.width*0.045,color: themeObj.textBlack,),)),
                    ),



                  ],
                ):

               Column(
                 children: [
                   SizedBox(
                       height: size.height*0.6,
                       child: createTable()),

                   ElevatedButton(
                     onPressed: (){
                       print("Weekly pLan $formattedPlan");
                       createPlan(startOfNextWeek.toString().split(" ")[0].toString());
                     },
                     style: ElevatedButton.styleFrom(
                       backgroundColor: themeObj.primayColor,
                     ),
                     child: Text("Save", style: TextStyle(color:Colors.black)),
                   )
                 ],
               )
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
            formattedPlan=[];
            print("next week");
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

  Widget createTable() {
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
            createHeader(),
         ...createRows(),
          ],
        ),
      ),
    );
  }

  TableRow createHeader() {
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
              style: GoogleFonts.openSans(fontWeight: FontWeight.w600,fontSize: 15)
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> createRows() {
    return formattedPlan.asMap().entries.map((entry) {
      int index = entry.key;
      var item = entry.value;

      return TableRow(
        children: [
          newTableCell(item["date"]?.toString() ?? ""),
          newTableCellWithTextField(item, 'chapter', index),
          newTableCellWithTextField(item, 'topic', index),
          newTableCellWithTextField(item, 'teachingAids', index),
          newTableCellWithTextField(item, 'Activity', index),
        ],
      );
    }).toList();
  }

  Widget newTableCellWithTextField(Map<String, dynamic> item, String field, int index) {
    // Create a TextEditingController for each field
    TextEditingController controller = TextEditingController(text: item[field]?.toString() ?? "");

    return TableCell(
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 3,vertical: 4),
        child: TextField(
          controller: controller,
          decoration: InputDecoration(
            border: OutlineInputBorder(), // Standard border
            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          ),
          style: TextStyle(fontSize: 16),
          maxLines: 1,

          onChanged: (value) {
            formattedPlan[index][field] = value;

          },
        ),
      ),
    );
  }


}


