import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/admin-module/Time%20table/Time%20Table%20Structure/timeTableCreate.dart';
import 'package:untitled/admin-module/Time%20table/Time%20Table%20Structure/updateTimeTableStr.dart';
import 'package:untitled/utils/utils.dart';

import '../../../APIs/Teacher Module/TimeTable/Time Table/timeTableStructure.dart';
import '../Time Tables/timeTableFetch.dart';

class TimeTableStructureScreen extends StatefulWidget {
  const TimeTableStructureScreen({super.key});

  @override
  _TimeTableStructureScreenState createState() =>
      _TimeTableStructureScreenState();
}

class _TimeTableStructureScreenState extends State<TimeTableStructureScreen> {
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
    _flag2 = false;
  }

  String _selectedClassRange = "1st-12th";
  String? _selectedSection;

  Map<String, dynamic>? _timeTableStructure;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();

    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    _fetchTimeTableStructure();
  }

  TimeTableStructureAPI apiObj = TimeTableStructureAPI();

  Future<List<String>> _fetchClassRanges() async {
    return ['1st-12th', '6th-10th', 'Nursery-5th'];
  }

  Future<List<String>> _fetchSections(String classRange) async {
    if (classRange == '1st-12th') {
      return ['A', 'B', 'C'];
    } else if (classRange == '6th-10th') {
      return ['X', 'Y', 'Z'];
    } else {
      return ['P', 'Q', 'R'];
    }
  }

  Future<void> _fetchTimeTableStructure() async {
    // if (_selectedSection == null) return;
  print("fetched");
    setState(() {
      _isLoading = true;
    });

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      print(accessToken);

      final timeTableStructure = await apiObj.fetchTimeTableStructure(
        accessToken!,
        _selectedClassRange,
      );

      if (timeTableStructure.isNotEmpty) {
        setState(() {
          _timeTableStructure = timeTableStructure;
        });
      } else {
        print("not found");
      }
    } catch (e) {
      print('Error: $e');
      // Handle errors
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  bool isFetched = false;
  @override
  Widget build(BuildContext context) {
    // print(_selectedClassRange);
    // print(_selectedSection);
    // print(_timeTableStructure);
    Size size = MediaQuery.of(context).size;
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
          "ClassActivityTime Table",
          style: GoogleFonts.openSans(
            fontSize: size.width * 0.055,
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
                topRight: Radius.circular(12), topLeft: Radius.circular(12))),
        child: Column(
          children: [
            Column(
              children: [
                SizedBox(height: size.height * 0.02),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Expanded(
                      child: FutureBuilder<List<String>>(
                        future: _fetchClassRanges(),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return CircularProgressIndicator();
                          } else if (snapshot.hasError) {
                            return Text('Error: ${snapshot.error}');
                          } else if (snapshot.hasData) {
                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(left: 8.0),
                                  child: Text(
                                    "Select Class",
                                    style: GoogleFonts.openSans(
                                        fontSize: size.width * 0.045,
                                        color: Colors.black,
                                        fontWeight:FontWeight.w400
                                    ),
                                  ),
                                ),
                                Card(
                                  child:DropdownButtonFormField<String>(

                                    alignment: Alignment.center,
                                    value: _selectedClassRange,
                                    onChanged: (value) {
                                      setState(() {
                                        _selectedClassRange = value!;
                                        _selectedSection = null; // Reset section when class range changes
                                      });
                                    },
                                    items: snapshot.data!.map((classRange) {
                                      return DropdownMenuItem<String>(
                                        value: classRange,
                                        child: Text(classRange,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.04),),
                                      );
                                    }).toList(),
                                    decoration: const InputDecoration(
                                      border: InputBorder.none,
                                    ),
                                  ),
                                ),
                              ],
                            );
                          } else {
                            return SizedBox.shrink();
                          }
                        },
                      ),
                    ),
                    SizedBox(width: 16),
                    Expanded(
                      child:FutureBuilder<List<String>>(
                        future: _fetchSections(_selectedClassRange),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState == ConnectionState.waiting) {
                            return CircularProgressIndicator();
                          } else if (snapshot.hasError) {
                            return Text('Error: ${snapshot.error}');
                          } else if (snapshot.hasData && snapshot.data!.isNotEmpty) {
                            if (_selectedSection == null || !snapshot.data!.contains(_selectedSection)) {
                              _selectedSection = snapshot.data![0];
                            }
                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(left: 8.0),
                                  child: Text(
                                    "Select Section",
                                    style: GoogleFonts.openSans(
                                        fontSize: size.width * 0.045,
                                        color: Colors.black,
                                        fontWeight:FontWeight.w400
                                    ),
                                  ),
                                ),
                                Card(
                                  child: DropdownButtonFormField<String>(
                                    alignment: Alignment.center,
                                    isExpanded: true,
                                    padding: EdgeInsets.only(left: 10),
                                    value: _selectedSection,

                                    onChanged: (value) {
                                      setState(() {
                                        _selectedSection = value!;
                                        _timeTableStructure=null;
                                        _fetchTimeTableStructure();
                                      });
                                    },
                                    items: snapshot.data!.map((section) {
                                      return DropdownMenuItem<String>(
                                        value: section,
                                        child: Text(section,style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.04),),
                                      );
                                    }).toList(),
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                    ),
                                  ),
                                ),
                              ],
                            );
                          } else {
                            return SizedBox.shrink();
                          }
                        },
                      ),
                    ),
                  ],
                ),
                // ElevatedButton(
                //   onPressed: () {
                //     if (_selectedSection != null) {
                //       _timeTableStructure = null;
                //       _fetchTimeTableStructure();
                //       isFetched = true;
                //     }
                //   },
                //   child: Text('Fetch',style: GoogleFonts.openSans(color:Colors.black),),
                // ),
              ],
            ),
            if (_isLoading)
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: size.height * 0.25),
                  LoadingAnimationWidget.threeArchedCircle(
                    color: Colors.blue,
                    size: 100,
                  )
                ],
              ),
            if (_timeTableStructure == null)
              _isLoading
                  ? const SizedBox()
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SizedBox(height: size.height * 0.25),
                        Text(
                          "No Structure Found ",
                          style: GoogleFonts.openSans(
                            fontSize: size.width * 0.045,
                            fontWeight: FontWeight.w600,
                          ),
                        )
                      ],
                    ),
            if (_timeTableStructure != null && _isLoading == false)
              ListView(
                shrinkWrap: true,
                padding: const EdgeInsets.all(16.0),
                children: [
                  Card(
                    elevation: 4.0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'ClassActivityTime Table Structure',
                            style: GoogleFonts.openSans(
                              fontSize: size.width * 0.045,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            children: [
                              Icon(Icons.book),
                              SizedBox(width: 8.0),
                              Text(
                                  'Number of Lectures: ${_timeTableStructure!['numberOfLecture']}'),
                            ],
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            children: [
                              Icon(Icons.access_time),
                              SizedBox(width: 8.0),
                              Text(
                                  'Duration of Each Lecture: ${_timeTableStructure!['durationOfEachLeacture']}'),
                            ],
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            children: [
                              Icon(Icons.access_time),
                              SizedBox(width: 8.0),
                              Text(
                                  'First Lecture Timing: ${_timeTableStructure!['firstLectureTiming']}'),
                            ],
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            children: [
                              Icon(Icons.book),
                              SizedBox(width: 8.0),
                              Text(
                                  'Number of Lectures Before Lunch: ${_timeTableStructure!['numberOfLeacturesBeforeLunch']}'),
                            ],
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            children: [
                              Icon(Icons.lunch_dining),
                              SizedBox(width: 8.0),
                              Text(
                                  'Duration of Lunch: ${_timeTableStructure!['durationOfLunch']}'),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              ElevatedButton(
                                onPressed: () {
                                  // _navigateToNextScreen();
                                  print(_selectedClassRange);
                                  print(_selectedSection);
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) =>
                                            TimetableFetchScreen(
                                          classRange:
                                              _selectedClassRange.toString(),
                                          section: _selectedSection.toString(),
                                        ),
                                      ));
                                },
                                child: Text("Next",
                                    style: GoogleFonts.openSans(
                                        fontSize: size.width * 0.035,
                                        color: Color(0xFF5A77BC),
                                        fontWeight: FontWeight.w600)),
                              )
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              ),
          ],
        ),
      ),
      floatingActionButton: isFetched
          ? FloatingActionButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => _timeTableStructure == null
                        ? CreateStructureScreen(
                            classRange: _selectedClassRange.toString(),
                            section: _selectedSection.toString(),
                          )
                        : UpdateStructureScreen(
                            timeTableStructure: _timeTableStructure,
                            classRange: _selectedClassRange.toString(),
                            section: _selectedSection.toString(),
                          ),
                  ),
                );
              },
              backgroundColor: Color(0xFF5A77BC),
              child: _timeTableStructure == null
                  ? Icon(Icons.add, color: Colors.white)
                  : Icon(Icons.edit, color: Colors.white),
            )
          : const SizedBox(),
    );
  }
}
