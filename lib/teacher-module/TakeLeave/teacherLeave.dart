import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/Trash/applyForLeave.dart';
import 'package:untitled/teacher-module/Trash/teacherLeaveHistory.dart';

import '../../APIs/Teacher Module/TeacherLeave/teacherLeaveAPi.dart';
import '../../utils/theme.dart';
import '../../utils/utils.dart';

class TeacherLeave extends StatefulWidget {
  const TeacherLeave({super.key});

  @override
  State<TeacherLeave> createState() => _TeacherLeaveState();
}

class _TeacherLeaveState extends State<TeacherLeave> {

  Color _getColor(String value) {

     if (value =="casualLeave") {
      return   Color.fromRGBO(33,150,243,1);
    } else if (value =="medicalLeave") {
      return  Color.fromRGBO(250,112,250,1);
    }else if (value =="annualLeave") {
      return Color.fromRGBO(255,178,89,1);
    }else if (value =="unpaidLeave") {
      return  Color.fromRGBO(145,0,236,1);
    }
    else {
      return Colors.green;
    }
  }

  CustomTheme themeObj=CustomTheme();
  DateTimeRange? selectedDateRange;
  String? selectedLeave;
  List<String> leaveOption = [
    'Complementary Off',
    'Casual leaves',
    'Comp off',
    'Duty leave',
    'Medical leave',
    'Restricted',
    'Maternity',
    'Health Check up',
    'Illness',
    'Family function',
    'Personal reasons'
  ];
  final _reason = TextEditingController();
  TeacherLeaveApi leaveApiObj=TeacherLeaveApi();
  bool isLoading=false;
  int start=0;
  String session = '';

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
  List<dynamic>? teacherLeaves;
  int? leaveApplyDay;
  Map<dynamic,dynamic>? applyLeave;

  Map<String,dynamic>? states;


  final ScrollController _scrollController = ScrollController();
  bool isLoadingMore = false;
  bool allDataLoaded = false;




  Future<void>newLeavePopup( BuildContext context ,Size size)async {

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return  Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10,),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height*0.01,),
                        Text("Apply For Leave",textAlign: TextAlign.center,style: GoogleFonts.openSans(  fontSize: size.width * 0.06,color: Colors.blue,),),
                        Divider(color: Colors.grey,thickness: 2),
                        SizedBox(height: size.height*0.03,),
                        Row(
                          children: [
                            Text("Choose Date",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack,),),
                            SizedBox(width: size.width*0.02,),
                            Icon(Icons.calendar_month,color:themeObj.textBlack,)
                          ],
                        ),
                        SizedBox(height: size.height*0.01,),
                        Container(
                            height: size.height*0.07,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: Colors.grey,width: 1),
                              borderRadius: BorderRadius.circular(12),

                            ),
                            child: Center(
                              child: ListTile(
                                onTap: () async {
                                  final DateTimeRange? pickedDateRange = await showDateRangePicker(
                                    context: context,
                                    initialDateRange: selectedDateRange ?? DateTimeRange(
                                      start: DateTime.now(),
                                      end: DateTime.now().add(Duration(days: 7)),
                                    ),
                                    firstDate: DateTime(2024),
                                    lastDate: DateTime(2025),
                                  );
                                  if (pickedDateRange != null && pickedDateRange != selectedDateRange) {
                                    setState(() {
                                      selectedDateRange = pickedDateRange;
                                      // Calculate leaveApplyDay here
                                    });
                                  }
                                },
                                leading: selectedDateRange == null
                                    ? Text('Not Selected', style: TextStyle(fontSize: size.height * 0.02, color: Colors.black),)
                                    : Text('${selectedDateRange!.start.toString().split(' ')[0]} - ${selectedDateRange!.end.toString().split(' ')[0]}', style: TextStyle(fontSize: size.height * 0.02, color: Colors.black),),
                                trailing: Text(leaveApplyDay?.toString() ?? '', style: TextStyle(fontSize: size.height * 0.02, color: Colors.black),),
                              ),)
                        ),
                        SizedBox(height: size.height*0.03,),
                        Text("Choose Leave Type",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack),),
                        SizedBox(height: size.height*0.01,),
                        Card(
                          child: SizedBox(
                            height: size.height*0.05,
                            child: DropdownButton<String>(
                              isExpanded: true,
                              borderRadius: BorderRadius.circular(12),
                              hint: const Text("Select Leave",),
                              alignment: Alignment.center,
                              padding: EdgeInsets.all(8),
                              icon: Icon(Icons.keyboard_arrow_down_sharp),
                              underline: Container(),
                              value: selectedLeave,
                              onChanged: (newValue) {
                                setState(() {
                                  selectedLeave = newValue!;
                                });
                              },
                              items: leaveOption.map((String option) {
                                return DropdownMenuItem<String>(
                                  value: option,
                                  child: Text(option,overflow: TextOverflow.ellipsis,),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                        SizedBox(height: size.height*0.03,),
                        Text("Reason",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack,),),
                        SizedBox(height: size.height*0.01,),
                        TextField(
                          maxLines: 8,
                          decoration: InputDecoration(
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
                          ),
                          controller: _reason,
                        ),
                        SizedBox(height: size.height*0.02,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){
                                    Navigator.pop(context);
                                  },
                                  child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),
                            Container(
                              width: size.width * 0.3,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                onPressed: () async {
                                  if (selectedDateRange != null && selectedLeave != null && _reason.text.isNotEmpty) {
                                    setState(() {
                                      isLoading = true;
                                    });
                                    Map<dynamic, dynamic>? newLeave=  await applyLeaves(
                                        selectedDateRange!.start.toString().split(' ')[0],
                                        selectedDateRange!.end.toString().split(' ')[0],
                                        _reason.text,
                                        selectedLeave!,
                                        DateTime.now().toString().split(" ")[0]
                                    );
                                    setState(() {
                                      isLoading = false;
                                    });
                                    if (newLeave != null) {

                                      teacherLeaves?.insert(0, newLeave);
                                        print("added");
                                      this.setState(() {});
                                    }
                                    Navigator.of(context).pop();
                                  } else {
                                    // Show an error message if any field is empty
                                   showRedSnackBar("Please fill all fields", context);
                                  }
                                },
                                child: isLoading
                                    ? CircularProgressIndicator(color: Colors.black)
                                    : Text("Save", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
                              ),
                            ),

                          ],
                        ),


                      ],
                    ),
                  ),
                ),
              ],
            );
        },);

      },);

  }


  Future<void> fetchLeavesData() async {
    setState(() {
      isLoading = true;
      start = 0; // Reset start value
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      List<dynamic> fetchedLeaves = await leaveApiObj.teacherLeaveData(accessToken!, start, session);

      setState(() {
        teacherLeaves = fetchedLeaves;
      });
    } catch (e) {
      print('Error fetching leave data: $e');
      showRedSnackBar("Error occurred to fetch leaves $e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreLeavesData() async {
    if (isLoadingMore || allDataLoaded) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      int newStart = start + (teacherLeaves?.length ?? 0);
      List<dynamic> fetchedLeaves = await leaveApiObj.teacherLeaveData(accessToken!, newStart, session);
      setState(() {
        teacherLeaves?.addAll(fetchedLeaves);
        start = newStart; // Update the start variable
      });
    } catch (e) {
      print('Error fetching more leave data: $e');
      showRedSnackBar("Error occurred to load more leaves $e.", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }


  Future<dynamic> applyLeaves(String startDate,String endDate,String reason,String type,String applyOn) async {
    print(selectedDateRange!.start.toString().split(' ')[0]);
    print(selectedDateRange!.end.toString().split(' ')[0]);
    print(_reason.text);
    print(selectedLeave);
    print(DateTime.now().toString().split(" ")[0]);
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

       var applyLeaveResponse = await leaveApiObj.teacherLeaveApply(accessToken!,startDate,endDate,reason,type,session,applyOn);
      print(applyLeaveResponse);

      return applyLeaveResponse;
    } catch (e) {

      showRedSnackBar("Error on applying $e.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> updateLeave(Map<String, dynamic> updatedLeave) async {

    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var success = await leaveApiObj.updateLeave(accessToken!,updatedLeave["_id"],session,updatedLeave);
     if(success==true){

       setState(() {
         int index = teacherLeaves?.indexWhere((leave) => leave['_id'] == updatedLeave["_id"]) ?? -1;
         if (index != -1) {
           // Update the leave in the teacherLeaves list
           teacherLeaves?[index] = {
             ...teacherLeaves![index], // Keep existing fields
             ...updatedLeave, // Update with new fields
           };
         }

         showGreenSnackBar("Leave Updated Successfully", context);
       });
     }else{
       showGreenSnackBar("Leave Not updated", context);
     }


    } catch (e) {

      showRedSnackBar("Error on Updating $e.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void>updateLeavePoppup( BuildContext context ,Size size, Map<String, dynamic> leaveData){
    TextEditingController _reasonController = TextEditingController(text: leaveData['reason']);
    DateTimeRange initialDateRange = DateTimeRange(
      start: DateTime.parse(leaveData['startDate']),
      end: DateTime.parse(leaveData['endDate']),
    );
    String selectedLeaveType = leaveData['type'] ?? "";
    if (!leaveOption.contains(selectedLeaveType)) {
      selectedLeaveType = leaveOption[0]; // Set to first option if not found
    }
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return  Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10,),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height*0.01,),
                        Text("Update Leave",textAlign: TextAlign.center,style: GoogleFonts.openSans(  fontSize: size.width * 0.06,color: Colors.blue,),),
                        Divider(color: Colors.grey,thickness: 2),
                        SizedBox(height: size.height*0.03,),
                        Row(
                          children: [
                            Text("Choose Date",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack,),),
                            SizedBox(width: size.width*0.02,),
                            Icon(Icons.calendar_month,color:themeObj.textBlack,)
                          ],
                        ),
                        SizedBox(height: size.height*0.01,),
                        Container(
                            height: size.height * 0.07,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: Colors.grey, width: 1),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Center(
                              child: ListTile(
                                onTap: () async {
                                  final DateTimeRange? pickedDateRange = await showDateRangePicker(
                                    context: context,
                                    initialDateRange: initialDateRange,
                                    firstDate: DateTime(2024),
                                    lastDate: DateTime(2025),
                                  );
                                  if (pickedDateRange != null && pickedDateRange != initialDateRange) {
                                    setState(() {
                                      initialDateRange = pickedDateRange;
                                      // Calculate leaveApplyDay here if needed
                                    });
                                  }
                                },
                                leading: Text(
                                  '${initialDateRange.start.toString().split(' ')[0]} - ${initialDateRange.end.toString().split(' ')[0]}',
                                  style: TextStyle(fontSize: size.height * 0.02, color: Colors.black),
                                ),
                                trailing: Text(leaveApplyDay?.toString() ?? '', style: TextStyle(fontSize: size.height * 0.02, color: Colors.black)),
                              ),
                            )
                        ),
                        SizedBox(height: size.height*0.03,),
                        Text("Choose Leave Type",overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack),),
                        SizedBox(height: size.height*0.01,),
                        Card(
                          child: SizedBox(
                            height: size.height * 0.05,
                            child: DropdownButton<String>(
                              isExpanded: true,
                              borderRadius: BorderRadius.circular(12),
                              hint: const Text("Select Leave"),
                              alignment: Alignment.center,
                              padding: EdgeInsets.all(8),
                              icon: Icon(Icons.keyboard_arrow_down_sharp),
                              underline: Container(),
                              value: selectedLeaveType,
                              onChanged: (newValue) {
                                setState(() {
                                  selectedLeaveType = newValue!;
                                });
                              },
                              items: leaveOption.map((String option) {
                                return DropdownMenuItem<String>(
                                  value: option,
                                  child: Text(option, overflow: TextOverflow.ellipsis),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                        SizedBox(height: size.height*0.03,),
                        Text("Reason",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack,),),
                        SizedBox(height: size.height*0.01,),
                        TextField(

                          maxLines: 8,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
                          ),
                          controller: _reasonController,
                        ),
                        SizedBox(height: size.height*0.02,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){
                                    Navigator.pop(context);
                                  },
                                  child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),
                            Container(
                              width: size.width * 0.3,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                onPressed: () async {
                                  if (_reasonController.text.isNotEmpty) {
                                    setState(() {
                                      isLoading = true;
                                    });
                                    Map<String, dynamic> updatedLeave = {
                                      "_id": leaveData['_id'],
                                      "startDate": initialDateRange.start.toString().split(' ')[0],
                                      "endDate": initialDateRange.end.toString().split(' ')[0],
                                      "reason": _reasonController.text,
                                      "type": selectedLeaveType,
                                      "status": leaveData['status'],
                                      "by": leaveData['by'],
                                    };
                                    await updateLeave( updatedLeave);
                                    Navigator.of(context).pop();
                                    setState(() {
                                      isLoading = false;
                                    });

                                  } else {
                                    showRedSnackBar("Please fill all fields", context);
                                  }
                                },
                                child: isLoading
                                    ? CircularProgressIndicator(color: Colors.black)
                                    : Text("Update", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
                              ),
                            ),

                          ],
                        ),


                      ],
                    ),
                  ),
                ),
              ],
            );
          },);

      },);

  }

  Future<void> deleteLeave(String leaveID) async{

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var success = await leaveApiObj.deleteLeave(accessToken!, leaveID, session);
      print("applyLeaveResponse $success");
      if(success==true){
        setState(() {
          teacherLeaves?.removeWhere((leave) => leave['_id'] == leaveID);
          showGreenSnackBar("Leave deleted Successfully", context);
        });
      }else{
        showRedSnackBar("Failed to delete a Leave", context);
      }

    } catch (e) {
      print('Error delete a leave: $e');
      showRedSnackBar("Error Occurred. $e", context);
    }
  }

  int totalLeave=0;
  int rejectedLeave=0;
  double ratio=0;
  Future<void> loadStats() async{

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var stats = await leaveApiObj.getStats(accessToken!, session);

      if(stats is Map){
        setState(() {
            states =stats.cast<String,dynamic >();
            totalLeave=states!["total"];
            rejectedLeave=states!["rejected"];
            ratio=rejectedLeave/totalLeave;
        });
      }else{
        stats={};
        showRedSnackBar("Failed to Load stats ", context);
      }

    } catch (e) {
      print('Error delete a leave: $e');
      showRedSnackBar("Error Occurred. $e", context);
    }
  }

  @override
  void initState() {
    super.initState();
    session =calculateCurrentSession();
    fetchLeavesData();
    loadStats();

    _scrollController.addListener(_scrollListener);
  }
  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      fetchMoreLeavesData();
    }
  }


  @override
  Widget build(BuildContext context) {

    print( states);
      Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme: IconThemeData(color: themeObj.textBlack,),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        actions: [
          SizedBox(
            width: size.width*0.35,
            child: TextButton(onPressed: (){
               newLeavePopup(context,size);
            },
              style: TextButton.styleFrom(backgroundColor:Color.fromRGBO(216,180,254,1)),
              child:Row(
                children: [
                  Icon(CupertinoIcons.add_circled,color: themeObj.textBlack,),
                  SizedBox(width: size.width*0.02,),
                  Text("New Leave",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.036),),


                ],
              ),),
          )
        ],
        backgroundColor:  themeObj.primayColor,
        title: Text("My Leave",style: TextStyle(color:  themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      ),
      body:Padding(
        padding: const EdgeInsets.symmetric(horizontal: 3.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.02,),
            Card(
              elevation: 5,
              shape: RoundedRectangleBorder(side: BorderSide(color:  themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),

              child: Container(
                padding: EdgeInsets.all(15.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Stack(
                      alignment: Alignment.center,
                      children: <Widget>[
                        Container(
                          height: size.width*0.34,
                          width: size.width*0.34,
                          child: CircularProgressIndicator(
                              value: ratio,
                            valueColor: AlwaysStoppedAnimation<Color>(
                            Colors.red
                            ),


                              strokeWidth: 10,
                              backgroundColor:Color.fromRGBO(216, 180, 254, 0.3),

                          ),
                        ),
                        Column(
                          children: [
                            Text(states?["total"].toString() ?? "", style: TextStyle(
                                color: themeObj.textBlack,
                                fontSize: size.width*0.05,
                                fontWeight: FontWeight.bold// Adjust font size as needed
                            ),),
                            Text(
                              'Leave Balance', // Your text here
                              style: TextStyle(
                                  fontSize: size.width*0.04,
                                  color: themeObj.textgrey,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                    SizedBox(height: size.height*0.01,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          children: [
                            Text( states?["accepted"].toString() ?? "",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.055),),
                            Text("Leave Used",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.04),),
                          ],
                        ),
                        Column(
                          children: [
                            Text( states?["total"].toString() ?? "",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.055),),
                            Text("Total Leave",style: TextStyle( color: themeObj.textgrey,fontSize: size.height*0.02),),
                          ],
                        )
                      ],
                    ),
                    SizedBox(height: size.height*0.01,),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value: 1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                          Color.fromRGBO(33,150,243,1),
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["casual"].toString() ?? "", // Your text here
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("Casual Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value: 1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(250,112,250,1)
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["medical"].toString() ?? "", // Your text here
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("Medical Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value:1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(145,0,236,1)
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["earned"].toString() ?? "", // Your text here
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("earned Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value: 1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(255,178,89,1)
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["restricted"].toString() ?? "", // // Your text here
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("Restricted Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value: 1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(145,0,236,1)
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["complimentary"].toString() ?? "",
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("complimentary Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value: 1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(255,178,89,1)
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["duty"].toString() ?? "",
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("duty Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.01),
                            child: Column(
                              children: [
                                Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    SizedBox(
                                      width: size.width*0.2,

                                      height: size.width*0.2,
                                      child: const CircularProgressIndicator(
                                        value: 1,
                                        strokeWidth: 5,
                                        backgroundColor: Color(0xFFCFCDCD),
                                        valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(145,0,236,1)
                                        ),

                                      ),
                                    ),
                                    Text(
                                      states?["maternity"].toString() ?? "",
                                      style: TextStyle(
                                          color: themeObj.textBlack,
                                          fontSize: size.width*0.035,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: size.height*0.01,),
                                Text("maternity Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),

                  ],
                ),
              ),
            ),
            SizedBox(height: size.height*0.02,),
            Text("Leaves History",style: TextStyle(fontSize: size.width*0.05,
              color:themeObj.textBlack,),),
            Divider(color: themeObj.textgrey,),
          Expanded(
              child:  isLoading ?  Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              )
              :
              ListView.builder(
                  shrinkWrap: true,
                  controller: _scrollController,
                  itemCount: (teacherLeaves?.length ?? 0) + (isLoadingMore ? 1 : 0),
                  itemBuilder: (context,index){
                    if(teacherLeaves!.isEmpty || teacherLeaves!.length==0){
                      return Center(child: Text("No Teacher Data Found"));
                    }
                    if (index < (teacherLeaves?.length ?? 0)) {

                      final leave = teacherLeaves?[index];
                      return Column(
                        children: [
                          Card(
                            elevation: 5,
                            shape: RoundedRectangleBorder(side: BorderSide(color:themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),

                            child: Container(
                              child: Padding(
                                padding: EdgeInsets.only(left: size.height*0.01,right: size.height*0.01),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text("${leave["startDate"]} - ${leave["endDate"]}",style: TextStyle(fontSize:size.width*0.035,color: themeObj.textBlack,fontWeight: FontWeight.bold),),
                                            Text(leave["type"],style: TextStyle(color: _getColor("annualLeaves"),fontSize: size.width*0.03),),

                                          ],
                                        ),
                                        Column(
                                          children: [
                                            Card(
                                              color:leave["status"] =="Approved"?Colors.greenAccent:Colors.orange[100],
                                              child: Container(
                                                  width: size.width*0.23,
                                                  child: Text(leave["status"],textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.035,color: leave["status"] =="Approved"?Colors.green:Colors.red,fontWeight: FontWeight.w500),)),
                                            ),
                                            leave["status"] =="Approved" ||  leave["status"] =="Rejected" ?SizedBox():Row(
                                              children: [
                                                SizedBox(
                                                  height:size.height*0.04,
                                                  width: size.width*0.13,
                                                  child: TextButton(

                                                      style:TextButton.styleFrom(backgroundColor: Color.fromRGBO(96,165,250,1)),
                                                      onPressed: (){
                                                        Map<String, dynamic> typedLeave = Map<String, dynamic>.from(leave);
                                                        updateLeavePoppup(context, size, typedLeave);
                                                      },
                                                      child: Center(child: Icon(Icons.edit,size: size.width*0.05,color: themeObj.textWhite,))),
                                                ),
                                                SizedBox(width: size.width*0.01,),
                                                SizedBox(width: size.width*0.01,),
                                                SizedBox(
                                                  height:size.height*0.04,
                                                  width: size.width*0.13,
                                                  child: Center(
                                                    child: TextButton(

                                                        style:TextButton.styleFrom(backgroundColor: Color.fromRGBO(248,113,113,1)),
                                                        onPressed: (){
                                                          deleteLeave(leave["_id"]);
                                                        },
                                                        child: Icon(CupertinoIcons.delete,size: size.width*0.05,color: themeObj.textWhite,)),
                                                  ),
                                                ),
                                              ],
                                            )

                                          ],
                                        )
                                      ],
                                    ),
                                    SizedBox(height: size.height*0.01,),
                                    Text(leave["reason"],style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.03),),
                                    SizedBox(height: size.height*0.01,),
                                    leave["status"] =="Approved"?Row(
                                      children: [
                                        CircleAvatar(
                                          radius: size.width * 0.06,
                                          backgroundImage: NetworkImage(leave["by"][0]["profileLink"] ?? 'https://example.com/default-profile-pic.jpg'),
                                        ),
                                        SizedBox(width: size.width*0.02,),
                                        Text(leave["by"][0]["name"],style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.03),),

                                      ],
                                    ):SizedBox(),
                                    SizedBox(height: size.height*0.01,),
                                  ],
                                ),
                              ),

                            ),
                          ),

                        ],
                      );
                    }
                    else {
                      return Center(
                        child: LoadingAnimationWidget.threeArchedCircle(
                          color: themeObj.primayColor,
                          size: 50,
                        ),
                      );
                    }

                  }) ),
          ],
        ),
      ),

    );
  }
}
