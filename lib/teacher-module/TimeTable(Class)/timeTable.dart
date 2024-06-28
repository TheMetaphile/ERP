import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/Time Table/timeTableTeacherPannel.dart';

class TimeTable extends StatefulWidget {
  const TimeTable({super.key,});


  @override
  State<TimeTable> createState() => _TimeTableState();
}

class _TimeTableState extends State<TimeTable> {

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
  String selectedDay = "Monday";
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);

  }

  List<String> dayOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  final api = TeacherTimetableAPI();
   Map? timetable;
  @override
  Widget build(BuildContext context) {
    Size size= MediaQuery.of(context).size;


    return Scaffold(
      backgroundColor: const Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
        ),
        title: Text(
          "Classes",
          style: GoogleFonts.openSans(
            fontSize: size.width * 0.055,
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: size.height*0.02,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Select Days :",style: GoogleFonts.openSans(fontSize:size.width*0.055,fontWeight:FontWeight.w500,color:Colors.black,),),
                      Card(
                        child: Container(
                          width: size.width*0.4,
                          height: size.height*0.05,
                          child: DropdownButton<String>(
                            isExpanded: true,
                            borderRadius: BorderRadius.circular(12),
                            alignment: Alignment.center,
                            padding: EdgeInsets.all(8),
                            icon: Icon(Icons.keyboard_arrow_down_sharp),
                            underline: Container(),
                            value: selectedDay,
                            onChanged: (newValue) {
                              setState(() {
                                selectedDay = newValue!;
                              });
                            },
                            items: dayOptions.map((String option) {
                              return DropdownMenuItem<String>(
                                value: option,
                                child: Text(option),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height*0.06,),
                  FutureBuilder<Map<String, dynamic>>(
                    future: api.fetchTeacherTimetable(selectedDay.toLowerCase()),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Center(child: const CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        return Center(child: Text('Error: ${snapshot.error}'));
                      } else if (snapshot.hasData && snapshot.data != null) {
                        final timetableEntries = snapshot.data!['timetable'] as List<dynamic>?;
                        if (timetableEntries == null || timetableEntries.isEmpty) {
                          return Center(child: const Text('No timetable entries available'));
                        }
                        return ListView.builder(
                          itemCount: timetableEntries.length,
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return TimetableCard(entry: timetableEntries[index]);
                          },
                        );
                      } else {
                        return const Text('No data available');
                      }
                    },
                  )


                ],
              ),
            ),
          )

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
            height: size.height * 0.03,
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
              height: size.height * 15,
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

}

class TimetableCard extends StatelessWidget {
  final Map<String, dynamic> entry;

  const TimetableCard({Key? key, required this.entry}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    print(entry);
    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Subject: ${entry['subject'] ?? 'N/A'}',
              style: GoogleFonts.openSans(fontSize:size.width*0.05,fontWeight:FontWeight.w600),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Lecture No:',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                Text('${entry['lectureNo'] ?? 'N/A'}',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w400),),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Timing:',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                Text('N/A',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w400),),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Class:',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                Text('${entry['class'] ?? 'N/A'}',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w400),),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Section:',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500),),
                Text('${entry['section'] ?? 'N/A'}',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w400),),
              ],
            ),


          ],
        ),
      ),
    );
  }
}