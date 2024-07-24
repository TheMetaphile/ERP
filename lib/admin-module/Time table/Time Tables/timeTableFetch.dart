import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../APIs/Teacher Module/TimeTable/Time Table/timeTableStructure.dart';



class TimetableFetchScreen extends StatefulWidget {
  TimetableFetchScreen({Key? key, required this.classRange, required this.section}) : super(key: key);

  final String classRange;
  final String section;

  @override
  _TimetableFetchScreenState createState() => _TimetableFetchScreenState();
}

class _TimetableFetchScreenState extends State<TimetableFetchScreen> {
  Map<String, dynamic>? _timetableData;

  @override
  void initState() {
    super.initState();
    fetchTimetable();
  }

  TimeTableStructureAPI apiObj = TimeTableStructureAPI();
    bool isfetched=false;
  Future<void> fetchTimetable() async {
    setState(() {
      isfetched=true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      // final timetable = await apiObj.fetchTimetable(accessToken!, widget.classRange, widget.section);
      //final timetable = await apiObj.fetchTimetable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTczOTEzOTAsImV4cCI6MTcxNzk5NjE5MH0.D8ikXXgySLJ3ULFL3Sap7tEVpot7yihizCTwG-iMQ0o", "9th", "A");
      setState(() {
        // _timetableData = timetable['timetable'];
      });
    } catch (e) {
      print('Error fetching timetable: $e');
    }finally{
      setState(() {
        isfetched=false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text("");
    // print(_timetableData);
    // Size size = MediaQuery.of(context).size;
    // if (isfetched) {
    //   return Scaffold(
    //     backgroundColor: Color(0xFF5A77BC),
    //     body: Container(
    //       height: size.height,
    //       width: size.width,
    //       decoration: const BoxDecoration(
    //           color: Colors.white,
    //
    //       ),
    //       child: Center(
    //         child: LoadingAnimationWidget.threeArchedCircle(
    //           color: Colors.blue,
    //           size: 100,
    //         ),
    //       ),
    //     ),
    //   );
    // }
    // else if (_timetableData==null) {
    //   return Scaffold(
    //       backgroundColor: Color(0xFF5A77BC),
    //     appBar: AppBar(
    //       iconTheme: const IconThemeData(color: Colors.white),
    //       backgroundColor: Colors.transparent,
    //       leading: IconButton(
    //         onPressed: () {
    //           Navigator.pop(context);
    //         },
    //         icon: const Icon(Icons.arrow_back_ios),
    //       ),
    //       title: Text(
    //         "ClassActivityTime Table",
    //         style: GoogleFonts.openSans(
    //           fontSize: size.width * 0.055,
    //           color: Colors.white,
    //           fontWeight: FontWeight.w600,
    //         ),
    //       ),
    //     ),
    //     body: Container(
    //       height: size.height,
    //       width: size.width,
    //
    //       decoration: const BoxDecoration(
    //           color: Colors.white,
    //           borderRadius: BorderRadius.only(topRight: Radius.circular(12),topLeft: Radius.circular(12))
    //       ),
    //       child: Center(
    //         child: Column(
    //           mainAxisAlignment: MainAxisAlignment.center,
    //           children: [
    //             Text(
    //               'No Timetable Found',
    //               style: TextStyle(
    //                 fontSize: 18.0,
    //                 fontWeight: FontWeight.bold,
    //               ),
    //             ),
    //             SizedBox(height: 16.0),
    //             ElevatedButton(
    //               onPressed: () {
    //                 // Navigate to the create timetable screen
    //               },
    //               child: Text('Create Timetable'),
    //             ),
    //           ],
    //         ),
    //       ),
    //     ),
    //   );
    // } else {
    //   return Scaffold(
    //     backgroundColor: Color(0xFF5A77BC),
    //     appBar: AppBar(
    //       iconTheme: const IconThemeData(color: Colors.white),
    //       backgroundColor: Colors.transparent,
    //       leading: IconButton(
    //         onPressed: () {
    //           Navigator.pop(context);
    //         },
    //         icon: const Icon(Icons.arrow_back_ios),
    //       ),
    //       title: Text(
    //         "ClassActivityTime Table",
    //         style: GoogleFonts.openSans(
    //           fontSize: size.width * 0.055,
    //           color: Colors.white,
    //           fontWeight: FontWeight.w600,
    //         ),
    //       ),
    //     ),
    //     body: Container(
    //       height: size.height,
    //       width: size.width,
    //       decoration: const BoxDecoration(
    //           color: Colors.white,
    //           borderRadius: BorderRadius.only(topRight: Radius.circular(12),topLeft: Radius.circular(12))
    //       ),
    //       child: ListView.builder(
    //         shrinkWrap: true,
    //         itemCount: _timetableData!.length-1,
    //         itemBuilder: (context, index) {
    //           final dayEntry = _timetableData!.entries.toList()[index];
    //           final day = dayEntry.key;
    //           final timetableForDay = dayEntry.value as List<dynamic>;
    //
    //           return ExpansionTile(
    //             title: Text(day.toUpperCase()),
    //             children: timetableForDay
    //                 .map<Widget>((item) => ListTile(
    //               leading: CircleAvatar(
    //                 child: Text((item['lectureNo'] as int).toString()),
    //               ),
    //               title: Text(item['subject'] ?? ''),
    //               subtitle: Text('${item['startAt']} - ${item['endAt']}'),
    //               trailing: Text(item['teacher'] ?? ''),
    //             ))
    //                 .toList(),
    //           );
    //         },
    //       ),
    //     ),
    //     floatingActionButton: FloatingActionButton(
    //       onPressed: () {
    //         // Navigate to the edit timetable screen
    //       },
    //       child: Icon(Icons.edit),
    //     ),
    //   );
    // }
  }
}
