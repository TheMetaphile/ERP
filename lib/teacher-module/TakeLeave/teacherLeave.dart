import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/teacher-module/Trash/applyForLeave.dart';
import 'package:untitled/teacher-module/Trash/teacherLeaveHistory.dart';

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
  Future<void> _selectDateRange(BuildContext context) async {
    final DateTimeRange? pickedDateRange = await showDateRangePicker(
      context: context,
      initialDateRange: selectedDateRange ?? DateTimeRange(
        start: DateTime.now(),
        end: DateTime.now().add(Duration(days: 7)),
      ),
      firstDate: DateTime(2020),
      lastDate: DateTime(2025),
    );

    if (pickedDateRange != null && pickedDateRange != selectedDateRange) {
      setState(() {
        selectedDateRange = pickedDateRange;
      });
    }
  }
  Future<void>newLeavePopup( BuildContext context ,Size size)async {
    bool isChecked = false;
    return showDialog(
      context: context,
      builder: (context) {
        return  StatefulBuilder(
          builder: (context, setState) {
            return   Column(
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
                              onTap: () {
                                _selectDateRange(context);
                                print(_selectDateRange);
                              },
                              leading:selectedDateRange == null
                                  ? Text('Not Selected',style: TextStyle(fontSize: size.height*0.02,color: Colors.black),)
                                  : Text('${selectedDateRange!.start.toString().split(' ')[0]} - ${selectedDateRange!.end.toString().split(' ')[0]}',style: TextStyle(fontSize: size.height*0.02,color: Colors.black),),

                              trailing: Text("2 Days",style: TextStyle(fontSize: size.height*0.02,color: Colors.black),),
                            ),
                          ),
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
                                  onPressed: (){},
                                  child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),
                            Container(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){
                                    Navigator.pop(context);
                                  },
                                  child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),

                          ],
                        ),


                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        );

      },);

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
              ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: 5,
                  itemBuilder: (context,index){
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
                                  SizedBox(height: size.height*0.01,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Apr 02 2024-Apr 04 2024",style: TextStyle(fontSize:size.width*0.035,color: themeObj.textBlack,fontWeight: FontWeight.bold),),
                                          Text("Annual Leaves",style: TextStyle(color: _getColor("annualLeaves"),fontSize: size.width*0.03),),

                                        ],
                                      ),
                                      Column(
                                        children: [
                                          Card(
                                            color: Colors.orange[100],
                                            child: Container(
                                                width: size.width*0.2,
                                                child: Text("Pending",textAlign: TextAlign.center,style: TextStyle(fontSize:size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),)),
                                          ),
                                          Row(
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
                                  Text("I am feeling unwell and belive it's best to take a day off to rest and recove.",style: TextStyle(color: themeObj.textBlack,fontSize: size.width*0.03),),


                                ],
                              ),
                            ),

                          ),
                        ),
                        SizedBox(height: size.height*0.015,),
                      ],
                    );

                  })
            ],
          ),
        ),
      ),

    );
  }
}
