import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/StudentModuleAPI/StudentLeave/studentLeaveApi.dart';
import '../../CustomTheme/customTheme.dart';


class StudentLeave extends StatefulWidget {
  const StudentLeave({super.key});

  @override
  State<StudentLeave> createState() => _StudentLeaveState();
}

class _StudentLeaveState extends State<StudentLeave> {




  DateTimeRange? selectedDateRange;

  final _reason = TextEditingController();
  TeacherLeaveApi leaveApiObj=TeacherLeaveApi();
  bool isLoading=false;
  int start=0;
  String session = '';
  String status ="Pending";

  List<String> statusOptions = [
    'Pending',
    'Approved',
    'Rejected',
  ];

  List<dynamic>? teacherLeaves;
  int? leaveApplyDay;
  Map<dynamic,dynamic>? applyLeave;

  Map<String,dynamic> states={};


  final ScrollController _scrollController = ScrollController();
  bool isLoadingMore = false;
  bool allDataLoaded = false;




  Future<void>newLeavePopup( BuildContext context ,Size size,CustomTheme themeObj)async {

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
                        const Divider(color: Colors.grey,thickness: 2),
                        SizedBox(height: size.height*0.03,),
                        Row(
                          children: [
                            Text("Choose Date",textAlign: TextAlign.center,style:  themeObj.bigNormalText),
                            SizedBox(width: size.width*0.02,),
                            Icon(Icons.calendar_month,color:CustomTheme.blackColor,)
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
                                      end: DateTime.now().add(const Duration(days: 7)),
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
                        Text("Reason",textAlign: TextAlign.center,style: themeObj.normalText),
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
                            SizedBox(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:const Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){
                                    Navigator.pop(context);
                                  },
                                  child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),
                            SizedBox(
                              width: size.width * 0.3,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                onPressed: () async {
                                  if (selectedDateRange != null&& _reason.text.isNotEmpty) {
                                    setState(() {
                                      isLoading = true;
                                    });
                                    Map<dynamic, dynamic>? newLeave=  await applyLeaves(
                                        selectedDateRange!.start.toString().split(' ')[0],
                                        selectedDateRange!.end.toString().split(' ')[0],
                                        _reason.text,
                                    );
                                    setState(() {
                                      isLoading = false;
                                    });
                                    if (newLeave != null) {

                                      teacherLeaves?.insert(0, newLeave);
                                      print("added");
                                      this.setState(() {});
                                    }
                                    Navigator.pop(context);
                                  } else {
                                    // Show an error message if any field is empty
                                    showRedSnackBar("Please fill all fields", context);
                                  }
                                },
                                child: isLoading
                                    ? const CircularProgressIndicator(color: Colors.black)
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

      List<dynamic> fetchedLeaves = await leaveApiObj.studentLeaveData(accessToken!, start, status);

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
      List<dynamic> fetchedLeaves = await leaveApiObj.studentLeaveData(accessToken!, newStart,status);
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


  Future<dynamic> applyLeaves(String startDate,String endDate,String reason) async {
    print(selectedDateRange!.start.toString().split(' ')[0]);
    print(selectedDateRange!.end.toString().split(' ')[0]);
    print(_reason.text);

    print(DateTime.now().toString().split(" ")[0]);
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var applyLeaveResponse = await leaveApiObj.studentLeaveApply(accessToken!,startDate,endDate,reason);
      print("applyLeaveResponse $applyLeaveResponse");

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

    print("/////////$updatedLeave");

    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var success = await leaveApiObj.updateLeave(accessToken!,updatedLeave["_id"],updatedLeave);
      if(success==true){

        setState(() {
          // int index = teacherLeaves?.indexWhere((leave) => leave['_id'] == updatedLeave["_id"]) ?? -1;
          // if (index != -1) {
          //   // Update the leave in the teacherLeaves list
          //   teacherLeaves?[index] = {
          //     ...teacherLeaves![index], // Keep existing fields
          //     ...updatedLeave, // Update with new fields
          //   };
          // }
          fetchLeavesData();

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

  Future<void>updateLeavePopup( BuildContext context ,Size size, Map<String, dynamic> leaveData,CustomTheme themeObj){
    print("////////////////////////$leaveData");
    TextEditingController reasonController = TextEditingController(text: leaveData['reason']);
    DateTimeRange initialDateRange = DateTimeRange(
      start: DateTime.parse(leaveData['startDate']),
      end: DateTime.parse(leaveData['endDate']),
    );
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
                        const Divider(color: Colors.grey,thickness: 2),
                        SizedBox(height: size.height*0.03,),
                        Row(
                          children: [
                            Text("Choose Date",textAlign: TextAlign.center,style: themeObj.normalText,),
                            SizedBox(width: size.width*0.02,),
                            Icon(Icons.calendar_month,color:CustomTheme.blackColor,)
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

                        SizedBox(height: size.height*0.03,),
                        Text("Reason",textAlign: TextAlign.center,style: themeObj.normalText),
                        SizedBox(height: size.height*0.01,),
                        TextField(

                          maxLines: 8,
                          decoration: InputDecoration(
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
                          ),
                          controller: reasonController,
                        ),
                        SizedBox(height: size.height*0.02,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:const Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){
                                    Navigator.pop(context);
                                  },
                                  child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),
                            SizedBox(
                              width: size.width * 0.3,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                onPressed: () async {
                                  if (reasonController.text.isNotEmpty) {
                                    setState(() {
                                      isLoading = true;
                                    });
                                    Map<String, dynamic> updatedLeave = {
                                      "_id": leaveData['_id'],
                                      "startDate": initialDateRange.start.toString().split(' ')[0],
                                      "endDate": initialDateRange.end.toString().split(' ')[0],
                                      "reason": reasonController.text,
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
                                    ? const CircularProgressIndicator(color: Colors.black)
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

      var success = await leaveApiObj.deleteLeave(accessToken!, leaveID);
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

  Future<void> loadStats() async{

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var stats = await leaveApiObj.getStats(accessToken!);

      if(stats is Map){
        setState(() {
          states =stats.cast<String,dynamic >();
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

    fetchLeavesData();
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
    print(teacherLeaves);
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj=CustomTheme(size);
    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: AppBar(
        iconTheme: IconThemeData(color: CustomTheme.blackColor,),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
        ),
        actions: [
          SizedBox(
            width: size.width*0.35,
            child: TextButton(onPressed: (){
              newLeavePopup(context,size,themeObj);
            },
              style: TextButton.styleFrom(backgroundColor:const Color.fromRGBO(216,180,254,1)),
              child:Row(
                children: [
                  Icon(CupertinoIcons.add_circled,color: CustomTheme.blackColor,),
                  SizedBox(width: size.width*0.02,),
                  Text("New Leave",style: themeObj.bigNormalText.copyWith(fontSize: size.width*0.035),),


                ],
              ),),
          )
        ],
        backgroundColor:  CustomTheme.primaryColor,
        title: Text("My Leave",style: themeObj.bigNormalText),
      ),
      body:Padding(
        padding: const EdgeInsets.symmetric(horizontal: 3.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.02,),
            Card(
              elevation: 5,
              shape: RoundedRectangleBorder(
                  side: BorderSide(color: CustomTheme.greyColor, width: 1),
                  borderRadius: BorderRadius.circular(12)
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Leave Statistics",
                      style: themeObj.bigNormalText.copyWith(fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildStatCard("Approved", states?["approved"] ?? 0, Colors.green,themeObj),
                        _buildStatCard("Pending", states?["pending"] ?? 0, Colors.orange,themeObj),
                        _buildStatCard("Rejected", states?["rejected"] ?? 0, Colors.red,themeObj),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Center(
                      child: SizedBox(
                        height: size.width * 0.3,
                        width: size.width * 0.3,
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            CircularProgressIndicator(
                              value: _calculateTotalProgress(),
                              valueColor: const AlwaysStoppedAnimation<Color>(Colors.blue),
                              strokeWidth: 6,
                              backgroundColor: Colors.grey[400],
                            ),
                            Center(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    "${_calculateTotalLeaves()}",
                                    style: themeObj.bigNormalText.copyWith(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    'Total Leaves',
                                    style: themeObj.normalText,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: size.height*0.02,),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Leave History",
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(
                    color: Colors.black,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.045,
                  ),
                ),
                Card(
                  child: SizedBox(
                    width: size.width * 0.4,
                    height: size.height * 0.05,
                    child: DropdownButton<String>(
                      isExpanded: true,
                      borderRadius: BorderRadius.circular(12),
                      hint: const Text("Select Day"),
                      alignment: Alignment.center,
                      padding: const EdgeInsets.all(8),
                      icon: const Icon(Icons.keyboard_arrow_down_sharp),
                      underline: Container(),
                      value: status,
                      onChanged: (newValue) {
                        setState(() {
                          status = newValue!;
                          fetchLeavesData();
                        });
                      },
                      items: statusOptions.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option, overflow: TextOverflow.ellipsis),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ],
            ),
            Divider(color: CustomTheme.greyColor,),
            teacherLeaves == null || teacherLeaves!.isEmpty?
            Center(
              child: Text(
                "No Leaves found!",
                style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
              ),
            ):SizedBox(),
            Expanded(
                child:  isLoading ?  Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: CustomTheme.primaryColor,
                    size: 50,
                  ),
                )
                    :
                ListView.builder(
                  shrinkWrap: true,
                  controller: _scrollController,
                  itemCount: (teacherLeaves?.length ?? 0) + (isLoadingMore ? 1 : 0),
                  itemBuilder: (context, index) {
                    if (teacherLeaves!.isEmpty || teacherLeaves == null) {
                      return Center(
                        child: Text(
                          "No Teacher Data Found",
                          style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
                        ),
                      );
                    }
                    if (index < (teacherLeaves?.length ?? 0)) {
                      final leave = teacherLeaves?[index];
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 3, vertical: 4),
                        child: Card(
                          margin: const EdgeInsets.all(0),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Column(
                              children: [
                                _buildLeaveHeader(leave, size,themeObj),
                                _buildLeaveBody(leave, size, themeObj),
                              ],
                            ),
                          ),
                        ),
                      );
                    } else {
                      return Center(
                        child: LoadingAnimationWidget.threeArchedCircle(
                          color: CustomTheme.primaryColor,
                          size: 50,
                        ),
                      );
                    }
                  },
                )
            ),
          ],
        ),
      ),

    );
  }
  Widget _buildStatCard(String title, int value, Color color,CustomTheme themeObj) {
    return Column(
      children: [
        Text(
          "$value",
          style: themeObj.bigNormalText.copyWith(
            color: color,
            fontWeight: FontWeight.w600,
            fontSize: 24,
          ),
        ),
        Text(
          title,
          style: themeObj.normalText,
        ),
      ],
    );
  }

  double _calculateTotalProgress() {
    int total = _calculateTotalLeaves();
    int approved = states["approved"] ?? 0;
    return total > 0 ? approved / total : 0;
  }

  int _calculateTotalLeaves() {
    return (states["approved"] ?? 0) +
        (states["pending"] ?? 0) +
        (states["rejected"] ?? 0);
  }
  Widget _buildLeaveHeader(Map<String, dynamic> leave, Size size,CustomTheme themeObj) {
    Color headerColor;
    IconData headerIcon;

    switch (leave["status"]) {
      case "Pending":
        headerColor = Colors.orange;
        headerIcon = Icons.schedule;
        break;
      case "Approved":
        headerColor = Colors.green;
        headerIcon = Icons.check_circle;
        break;
      default:
        headerColor = Colors.red;
        headerIcon = Icons.cancel;
    }

    return Container(
      color: headerColor.withOpacity(0.1),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(headerIcon, color: headerColor),
              const SizedBox(width: 8),
              Text(
                leave["status"],
                style: themeObj.bigNormalText,
              ),
            ],
          ),
          Text(
            "${leave["startDate"]} - ${leave["endDate"]}",
            style: GoogleFonts.poppins(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLeaveBody(Map<String, dynamic> leave, Size size, CustomTheme themeObj) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: SizedBox(
        width: size.width,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,

          children: [
            Text(
              "Reason:",
              style: themeObj.bigNormalText,
            ),
            SizedBox(height: size.height*0.01),
            Text(
              leave["reason"],
              style:themeObj.normalText,
            ),
            SizedBox(height: size.height*0.01),
            if (leave["status"] == "Pending")
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  _buildActionButton(
                    icon: Icons.edit,
                    color: Colors.blue,
                    onPressed: () {
                      updateLeavePopup(context, size, leave, themeObj);
                    },
                  ),
                  const SizedBox(width: 8),
                  _buildActionButton(
                    icon: Icons.delete,
                    color: Colors.red,
                    onPressed: () {
                      deleteLeave(leave["_id"]);
                    },
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton({required IconData icon, required Color color, required VoidCallback onPressed}) {
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(8),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Icon(icon, color: Colors.white, size: 20),
        ),
      ),
    );
  }

}
