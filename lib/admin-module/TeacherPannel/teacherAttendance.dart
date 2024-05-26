import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/admin%20Utils/teacherAttendanceTile.dart';

class TeacherAttendance extends StatefulWidget {
  const TeacherAttendance({super.key});

  @override
  State<TeacherAttendance> createState() => _TeacherAttendanceState();
}

class _TeacherAttendanceState extends State<TeacherAttendance> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
  var _flag1 = false;
  var _flag2 = false;

  void listener1() {
    if (_flag2) return;
    _flag1 = true;
    scrollController2.jumpTo(scrollController1.offset);
    _flag1 = false;
  }

  void listener2() {
    if (_flag1) return;
    _flag2 = true;
    scrollController1.jumpTo(scrollController2.offset);
    _flag2=false;
  }
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
  }

  String? _selectedStatus;
  List<String> statusOption = ['Present', 'Absent', 'Leave'];
  DateTime selectedDate = DateTime.now();

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

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),

        backgroundColor: Colors.transparent,
        title: Text("Teacher Attendance",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Column(
              children: [
                SizedBox(height: size.height*0.055,),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  ElevatedButton(
                      onPressed: () => _selectDate(context),
                      child: Row(

                        children: [
                          Text("Select Date",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                         SizedBox(width: size.width*0.02,),
                          const Icon(Icons.date_range_sharp,color: Colors.black)
                        ],
                      )
                  ),
                  dropDownButton(size),
                ],
              ),
                SizedBox(height: size.height*0.01,),
                Container(

                  height: size.height*0.08,
                  decoration: BoxDecoration(
                    color:Color(0xFFE9F0FF),
                  ),
                  padding: EdgeInsets.symmetric(horizontal: 10),

                  child:Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SizedBox(

                          width:size.width*0.2,
                          child: Text("Name",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                      SizedBox(

                          width:size.width*0.3,
                          child: Text("Designation",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                    ],
                  ),
                ),
                Card(
                    color: Colors.white,
                    margin: const EdgeInsets.all(0),
                    shape: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child:ListView.builder(
                        itemCount: 20,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return TeacherAttendanceTile(name: "Ankit Sharma", designation: "Hindi Teacher");
                        },),
                    )

                ),
              ],
            ),
          ),
        ],
      ),

    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.05,
          ),
          Card(
            color: Colors.white,
            elevation: 0,
            margin: const EdgeInsets.all(0),
            shape: const OutlineInputBorder(
                borderSide: BorderSide(
                    color: Colors.white
                ),
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25)
                )
            ),
            child: SizedBox(
              height: size.height * 3,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height * 1,
          )
        ],
      ),
    );
  }
  Widget dropDownButton(Size size){
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Card(
          child: Container(
            width: size.width*0.4,
            height: size.height*0.05,
            child: DropdownButton<String>(
              isExpanded: true,
              borderRadius: BorderRadius.circular(12),
              hint: Text("Status",),
              alignment: Alignment.center,
              padding: EdgeInsets.all(8),
              icon: Icon(Icons.keyboard_arrow_down_sharp),
              underline: Container(),
              value: _selectedStatus,
              onChanged: (newValue) {
                setState(() {
                  _selectedStatus = newValue!;
                });
              },
              items: statusOption.map((String option) {
                return DropdownMenuItem<String>(
                  value: option,
                  child: Text(option),
                );
              }).toList(),
            ),
          ),
        ),
      ),
    );
  }
}
