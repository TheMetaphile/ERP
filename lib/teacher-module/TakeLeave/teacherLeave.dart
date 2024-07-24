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

  final leaves=["Casual Leaves","Medical Leaves","Annual Leaves","Unpaid Leaves"];
  CustomTheme themeObj=CustomTheme();
  DateTimeRange? selectedDateRange;
  String? selectedLeave;
  List<String> leaveOption = [
    'Casual leaves',
    'Comp off',
    'Duty leave',
    'Medical leave',
    'Restricted ',
    'Maternity',
  ];
  final _reason = TextEditingController();
  TeacherLeaveApi leaveApiObj=TeacherLeaveApi();
  bool isLoading=false;
  int start=0;
  String session="2024-25";
  List<dynamic>? teacherLeaves;
  int? leaveApplyDay;
  Map<dynamic,dynamic>? applyLeave;

  final ScrollController _scrollController = ScrollController();
  bool isLoadingMore = false;

    Future<void> _selectDateRange(BuildContext context) async {
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
        var a=selectedDateRange!.start.toString().split(' ')[0].split("-");
        print(a);
        var b=selectedDateRange!.end.toString().split(' ')[0].split("-");
        print(b);
         var m=int.parse(a[a.length-1]);
         var n=int.parse(b[b.length-1]);

        print(n-m);
        if(n>m){
          print(n-m);
          leaveApplyDay=n-m;
        }else if(n==m){
          int j=int.parse(a[1]);
          int k=int.parse(b[1]);
          leaveApplyDay=30;

        }else{
          leaveApplyDay=0;
        }
      });
    }
  }


  Future<void>newLeavePopup( BuildContext context ,Size size)async {
    bool isChecked = false;
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
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(1),
                                  spreadRadius: 0,
                                  blurRadius: 5,
                                  offset: Offset(0, 6), // Adjust the vertical offset as needed
                                ),
                              ],
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
                        Container(
                          height: size.height*0.2,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(color: Colors.grey,width: 1),
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(1),
                                spreadRadius: 0,
                                blurRadius: 5,
                                offset: Offset(0, 6), // Adjust the vertical offset as needed
                              ),
                            ],
                          ),
                          child: TextField(
                            maxLines: 8,
                            decoration: InputDecoration(
                              border: InputBorder.none,
                            ),
                            controller: _reason,
                          ),
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
      showRedSnackBar("Failed to load leaves. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreLeavesData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      List<dynamic> fetchedLeaves = await leaveApiObj.teacherLeaveData(accessToken!, start + (teacherLeaves?.length ?? 0), session);

      setState(() {
        teacherLeaves?.addAll(fetchedLeaves);
      });
    } catch (e) {
      print('Error fetching more leave data: $e');
      showRedSnackBar("Failed to load more leaves. Please try again.", context);
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
      print('Error fetching student data: $e');
      showRedSnackBar("Failed to load students. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
  @override
  void initState() {
    super.initState();
    fetchLeavesData();
    _scrollController.addListener(_scrollListener);
  }
  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreLeavesData();
    }
  }
  @override
  Widget build(BuildContext context) {


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
      body:SingleChildScrollView(
        child: Padding(
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
                                value: 0,
                                strokeWidth: 10,
                                backgroundColor:Color.fromRGBO(216, 180, 254, 0.3),

                            ),
                          ),
                          Column(
                            children: [
                              Text("05", style: TextStyle(
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
                              Text("10",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.055),),
                              Text("Leave Used",style: TextStyle(color: themeObj.textgrey,fontSize: size.width*0.04),),
                            ],
                          ),
                          Column(
                            children: [
                              Text("20",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.055),),
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
                                          value: 0.5,
                                          strokeWidth: 5,
                                          backgroundColor: Color(0xFFCFCDCD),
                                          valueColor: AlwaysStoppedAnimation<Color>(
                                            Color.fromRGBO(33,150,243,1),
                                          ),

                                        ),
                                      ),
                                      Text(
                                        '02', // Your text here
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
                                          value: 0.5,
                                          strokeWidth: 5,
                                          backgroundColor: Color(0xFFCFCDCD),
                                          valueColor: AlwaysStoppedAnimation<Color>(
                                              Color.fromRGBO(250,112,250,1)
                                          ),

                                        ),
                                      ),
                                      Text(
                                        '02', // Your text here
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
                                          value: 0.5,
                                          strokeWidth: 5,
                                          backgroundColor: Color(0xFFCFCDCD),
                                          valueColor: AlwaysStoppedAnimation<Color>(
                                              Color.fromRGBO(255,178,89,1)
                                          ),

                                        ),
                                      ),
                                      Text(
                                        '02', // Your text here
                                        style: TextStyle(
                                            color: themeObj.textBlack,
                                            fontSize: size.width*0.035,
                                            fontWeight: FontWeight.w400// Adjust font size as needed
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.01,),
                                  Text("Annual Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
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
                                          value: 0.5,
                                          strokeWidth: 5,
                                          backgroundColor: Color(0xFFCFCDCD),
                                          valueColor: AlwaysStoppedAnimation<Color>(
                                              Color.fromRGBO(145,0,236,1)
                                          ),

                                        ),
                                      ),
                                      Text(
                                        '02', // Your text here
                                        style: TextStyle(
                                            color: themeObj.textBlack,
                                            fontSize: size.width*0.035,
                                            fontWeight: FontWeight.w400// Adjust font size as needed
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.01,),
                                  Text("Unpaid Leaves",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.035),)
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
              SizedBox(height: size.height*0.01,),
              Divider(color: themeObj.textgrey,),
              isLoading ?  Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              ):ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: (teacherLeaves?.length ?? 0) + (isLoadingMore ? 1 : 0),
                  itemBuilder: (context,index){
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
                                                      onPressed: (){},
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
                                                        onPressed: (){}, child: Icon(CupertinoIcons.delete,size: size.width*0.05,color: themeObj.textWhite,)),
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

                  })
            ],
          ),
        ),
      ),

    );
  }
}
