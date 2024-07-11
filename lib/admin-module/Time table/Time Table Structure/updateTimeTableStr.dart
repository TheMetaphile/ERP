import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/admin-module/Time%20table/Time%20Table%20Structure/timeTableFetch.dart';
import 'package:untitled/utils/utils.dart';
import '../../../APIs/Time Table/timeTableStructure.dart';

class UpdateStructureScreen extends StatefulWidget {


  UpdateStructureScreen({ this.timeTableStructure, required this.classRange, required String section});
  final Map<String, dynamic>?timeTableStructure;
  String classRange;

  @override
  _UpdateStructureScreenState createState() => _UpdateStructureScreenState();
}

class _UpdateStructureScreenState extends State<UpdateStructureScreen> {
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
  final _formKey = GlobalKey<FormState>();
  late String _classRange;
  late int _numberOfLecture;
  late String _durationOfEachLecture;
  late String _firstLectureTiming;
  late int _numberOfLecturesBeforeLunch;
  late String _durationOfLunch;
  TimeTableStructureAPI apiobj = TimeTableStructureAPI();

  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    _classRange =widget.classRange;
    _numberOfLecture = widget.timeTableStructure?['numberOfLecture'] ?? 0;
    _durationOfEachLecture = widget.timeTableStructure?['durationOfEachLeacture'] ?? '';
    _firstLectureTiming = widget.timeTableStructure?['firstLectureTiming'] ?? '';
    _numberOfLecturesBeforeLunch = widget.timeTableStructure?['numberOfLeacturesBeforeLunch'] ?? 0;
    _durationOfLunch = widget.timeTableStructure?['durationOfLunch'] ?? '';
  }
bool isUpdated=false;

  @override
  Widget build(BuildContext context) {
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
          "Update ClassActivityTime Table Structure",
          style: GoogleFonts.openSans(
              fontSize: size.width * 0.055,
              color: Colors.white,
              fontWeight: FontWeight.w600),
        ),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: size.height * 0.05),
                    TextFormField(
                      initialValue: _classRange,
                      decoration: InputDecoration(
                        labelText: 'Class Range',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _classRange = value;
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: _numberOfLecture.toString(),
                      decoration: InputDecoration(
                        labelText: 'Number of Lectures',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _numberOfLecture = int.parse(value);
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: _durationOfEachLecture,
                      decoration: InputDecoration(
                        labelText: 'Duration of Each Lecture',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _durationOfEachLecture = value;
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: _firstLectureTiming,
                      decoration: InputDecoration(
                        labelText: 'First Lecture Timing',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _firstLectureTiming = value;
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: _numberOfLecturesBeforeLunch.toString(),
                      decoration: const InputDecoration(
                        labelText: 'Number of Lectures Before Lunch',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _numberOfLecturesBeforeLunch = int.parse(value);
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: _durationOfLunch,
                      decoration: const InputDecoration(
                        labelText: 'Duration of Lunch',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _durationOfLunch = value;
                        });
                      },
                    ),
                    SizedBox(height: size.height * 0.05),
                    Center(
                      child: SizedBox(
                        height: size.height * 0.06,
                        width: size.width * 0.4,
                        child: ElevatedButton(
                          onPressed: _updateTimeTableStructure,
                          style: ElevatedButton.styleFrom(backgroundColor: isUpdated?Colors.transparent: Color(0xFF5A77BC)),
                          child: isUpdated?CircularProgressIndicator():Text(
                            'Update',
                            style: GoogleFonts.openSans(
                                fontSize: size.width * 0.045,
                                fontWeight: FontWeight.w500,
                                color: Colors.white),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
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
  Future<void> _updateTimeTableStructure() async {
      setState(() {
        isUpdated=true;
      });
      try{
        if (_formKey.currentState!.validate()) {
          SharedPreferences pref = await SharedPreferences.getInstance();
          String? accessToken = pref.getString("accessToken");
          //String accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0czQ1OTg3QGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTcyNjMyOTIsImV4cCI6MTcxNzg2ODA5Mn0.5PWkxj5nae98EDJSlBkt0XpVI4_PYKGQT8vxSfiVMo4";

          Map<String, dynamic> updateData = {
            "numberOfLeacturesBeforeLunch": _numberOfLecturesBeforeLunch.toString(),
            "_durationOfEachLecture": _durationOfEachLecture.toString(),
            "_firstLectureTiming": _firstLectureTiming.toString(),
            "_numberOfLecturesBeforeLunch": _numberOfLecturesBeforeLunch.toString(),
            "_durationOfLunch": _durationOfLunch.toString(),

          };
          print(updateData);
          bool success = await apiobj.updateTimeTableStructure(
            accessToken!,
            _classRange,
            updateData,
          );

          if (success) {
            // Time table structure updated successfully
            showGreenSnackBar("Time table structure updated successfully", context);
            // Navigate back or perform any other action
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => TimeTableStructureScreen(),));
          } else {
            // Failed to update time table structure
            showRedSnackBar("Failed to update time table structure", context);
          }
        }
      }catch(e){
        print(e);
      }finally{
        setState(() {
          isUpdated=false;
        });
      }
  }
}