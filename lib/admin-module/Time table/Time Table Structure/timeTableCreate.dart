import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/admin-module/Time%20table/Time%20Table%20Structure/timeTableFetch.dart';
import 'package:untitled/utils/utils.dart';

import '../../../APIs/Teacher Module/TimeTable/Time Table/timeTableStructure.dart';



class CreateStructureScreen extends StatefulWidget {
  CreateStructureScreen({ required this.classRange, required this.section});
      String classRange ;
      String section ;
  @override
  _CreateStructureScreenState createState() => _CreateStructureScreenState();

}

class _CreateStructureScreenState extends State<CreateStructureScreen> {
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

  final _formKey = GlobalKey<FormState>();

   int? _numberOfLecture;
   String? _durationOfEachLecture ;
   String? _firstLectureTiming;
    int? _numberOfLecturesBeforeLunch;
   String? _durationOfLunch;
  TimeTableStructureAPI apiobj=TimeTableStructureAPI();
  bool iscreated=false;
  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
        ),
        title:   Text("Create ClassActivityTime Table Structure",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer( size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: size.height*0.05,),
                    TextFormField(
                      initialValue: widget.classRange,
                      decoration: InputDecoration(
                        labelText: 'Class Range',
                      ),
                      onChanged: (value) {
                        setState(() {
                          widget.classRange = value;
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: _numberOfLecture==null?"": _numberOfLecture.toString() ,
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
                      initialValue:_numberOfLecturesBeforeLunch==null?"": _numberOfLecturesBeforeLunch.toString(),
                      decoration: InputDecoration(
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
                      decoration: InputDecoration(
                        labelText: 'Duration of Lunch',
                      ),
                      onChanged: (value) {
                        setState(() {
                          _durationOfLunch = value;
                        });
                      },
                    ),
                    SizedBox(height: size.height*0.05),
                    Center(
                      child: Container(
                        height: size.height*0.06,
                        width: size.width*0.4,
                        child: ElevatedButton(
                          onPressed: _createTimeTableStructure,
                          style: ElevatedButton.styleFrom(backgroundColor:iscreated?Colors.transparent:Color(0xFF5A77BC)),
                          child: iscreated?CircularProgressIndicator():Text('Create',style: GoogleFonts.openSans(fontSize:size.width*0.045,fontWeight:FontWeight.w500,color:Colors.white),),
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
            height: size.height * 0.06,
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
              height: size.height * 1,
              width: size.width,

            ),
          ),

        ],
      ),
    );
  }

  Future<void> _createTimeTableStructure() async {
    setState(() {
      iscreated=true;
    });
  try{
    SharedPreferences pref= await SharedPreferences.getInstance() ;
    String? accessToken=pref.getString("accessToken");
    // String accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2l0czQ1OTg3QGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTcyNjMyOTIsImV4cCI6MTcxNzg2ODA5Mn0.5PWkxj5nae98EDJSlBkt0XpVI4_PYKGQT8vxSfiVMo4";
    if (_formKey.currentState!.validate()) {

      print(accessToken);
      print(widget.classRange);
      print(_numberOfLecture);
      print(_durationOfEachLecture);
      print(_firstLectureTiming);
      print(_numberOfLecturesBeforeLunch);
      print(_durationOfLunch);
      bool success = await apiobj.createTimeTableStructure(
        accessToken!,
        widget.classRange,
        _numberOfLecture.toString(),
        _durationOfEachLecture!,
        _firstLectureTiming!,
        _numberOfLecturesBeforeLunch.toString(),
        _durationOfLunch!,
      );

      if (success) {
        // Time table structure created successfully
        showGreenSnackBar("Time table structure created successfully", context);
        // Navigate back or perform any other action
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => TimeTableStructureScreen(),));
      } else {
        // Failed to create time table structure
        showGreenSnackBar("Failed to create time table structure", context);
      }
    }
  }catch(e){
    print(e);

  }finally{
    iscreated=false;
  }
  }
}