import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Exam/ExamApi.dart';
import 'package:untitled/utils/utils.dart';

class Exams extends StatefulWidget {
  const Exams({super.key});

  @override
  State<Exams> createState() => _ExamsState();
}

class _ExamsState extends State<Exams> {
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

  TextEditingController note=TextEditingController();
  bool teacherSelected = false;
  bool studentSelected = false;
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);

  }
  TextEditingController examName=TextEditingController();
  TextEditingController selectClass=TextEditingController();
  TextEditingController selectDate=TextEditingController();
  TextEditingController gap=TextEditingController();
  String? _selectedClass;
  List<String> classOptions = [
    'Standard 12th',
    'Standard 11th',
    'Standard 10th',
    'Standard 9th',
  ];
  String? _selecteduration;
  List<String> durationOptions = [
    "1 hrs",
    '2 hrs',
    '3hrs',

  ];

  DateTime? selectedDate;
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

  TimeOfDay? _selectedTime;
  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );

    if (pickedTime != null && pickedTime != _selectedTime) {
      setState(() {
        _selectedTime = pickedTime;
      });
    }
  }

  ExamApi examApiObj=ExamApi();
bool isLoading=false;
  bool isScheduled=false;
  Future<void>schedulExamtPopup( BuildContext context ,Size size)async {
    return showDialog(
      context: context,
      builder: (context) {
        return  StatefulBuilder(
            builder: (context,setState) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Card(
                        margin: const EdgeInsets.all(0),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: size.height*0.02,),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Schedule New Exam",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black),),
                                  SizedBox(height: size.height*0.03,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      SizedBox(
                                        width: size.width*0.4,
                                        height: size.height*0.1,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text("Subject",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                            TextField(
                                              maxLines: 1,
                                              decoration: InputDecoration(
                                                  contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),

                                                  hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                              ),


                                              controller: examName,
                                            ),
                                          ],
                                        ),
                                      ),
                                      Card(
                                        child: SizedBox(
                                          width: size.width*0.4,
                                          height: size.height*0.05,
                                          child: DropdownButton<String>(
                                            isExpanded: true,
                                            borderRadius: BorderRadius.circular(12),
                                            hint: Text("Class..",),
                                            padding: EdgeInsets.all(8),
                                            underline: Container(),
                                            value: _selectedClass,
                                            onChanged: (newValue) {
                                              setState(() {
                                                _selectedClass = newValue!;
                                              });
                                            },
                                            items: classOptions.map((String option) {
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
                                  SizedBox(height: size.height*0.02,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      SizedBox(
                                        height: size.height*0.1,
                                        width: size.width*0.4,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text("Select Time",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                            SizedBox(height: size.height*0.01,),
                                            Container(
                                                height: size.height*0.055,
                                                width: size.width,
                                                decoration: BoxDecoration(
                                                    borderRadius: BorderRadius.circular(8),
                                                    border: Border.all(color: Colors.grey)

                                                ),
                                                child: TextButton(
                                                  onPressed: (){
                                                    _selectTime(context).then((_) {
                                                      setState(() {});
                                                    });
                                                  },
                                                  child:  _selectedTime==null?
                                                  Text("Please Select",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),):
                                                  Text("${_selectedTime?.hour}:${_selectedTime?.minute}",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),

                                                )
                                            )
                                          ],
                                        ),
                                      ),
                                      SizedBox(
                                        height: size.height*0.1,
                                        width: size.width*0.4,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text("Upload Date*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                            SizedBox(height: size.height*0.01,),
                                            Container(
                                                height: size.height*0.055,
                                                width: size.width,
                                                decoration: BoxDecoration(
                                                    borderRadius: BorderRadius.circular(8),
                                                    border: Border.all(color: Colors.grey)

                                                ),
                                                child: TextButton(
                                                  onPressed: (){
                                                    _selectDate(context).then((_) {
                                                      setState(() {});
                                                    });
                                                  },
                                                  child:  selectedDate==null?
                                                  Text("Please Select",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),):
                                                  Text("${selectedDate?.year}-${selectedDate?.month.toString().padLeft(2, '0')}-${selectedDate?.day.toString().padLeft(2, '0')}",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),

                                                )
                                            )
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.02,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Card(
                                        child: SizedBox(
                                          width: size.width*0.4,
                                          height: size.height*0.05,
                                          child: DropdownButton<String>(
                                            isExpanded: true,
                                            borderRadius: BorderRadius.circular(12),
                                            hint: const Text("Duration",),
                                            padding: const EdgeInsets.all(8),
                                            underline: Container(),
                                            value: _selecteduration,
                                            onChanged: (newValue) {
                                              setState(() {
                                                _selecteduration = newValue!;
                                              });
                                            },
                                            items: durationOptions.map((String option) {
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



                                ],
                              ),

                              SizedBox(height: size.height*0.02,),
                              Center(
                                child: SizedBox(
                                  width: size.width*0.3,
                                  child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        elevation: 0,
                                          backgroundColor:isLoading?Colors.transparent:Color(0XFF6FF87D),
                                          shape:isLoading?RoundedRectangleBorder(side: BorderSide.none):RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),
                                              borderRadius: isLoading?BorderRadius.all(Radius.zero):BorderRadius.circular(8))
                                      ),
                                      onPressed: () async {
                                        setState(() {
                                         isLoading=true;
                                        });
                                     try{
                                       SharedPreferences pref=await SharedPreferences.getInstance();
                                       final accessToken=pref.getString("accessToken");
                                        isScheduled =
                                       await examApiObj.scheduleExam(
                                         accessToken: accessToken!,
                                         classValue: _selectedClass!,
                                         subject: examName.text,
                                         date: selectedDate!,
                                         time: _selectedTime!,
                                         duration: _selecteduration!,
                                       );
                                     }catch(error){
                                       print(error);
                                     }finally{
                                       setState(() {
                                         isLoading=false;
                                       });
                                     }
                                     if(isScheduled){
                                       Navigator.pop(context);
                                       showGreenSnackBar("Exam Scheduled", context);
                                     }
                                      },
                                      child: isLoading?CircularProgressIndicator():Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),


                    ],
                  ),

                ],
              );
            }
        );

      },);

  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        backgroundColor: Colors.transparent,
        title: Text("Exam",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
        actions: [
          Container(
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(12)
              ),
              child: TextButton(onPressed: (){
                schedulExamtPopup(context, size);
              }, child: Text("Add new",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.white),)))
        ],
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 3),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height*0.055,),
                  Container(

                    height: size.height*0.08,
                    decoration: const BoxDecoration(
                        color:Color(0xFFE9F0FF),
                        borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))

                    ),
                    padding: EdgeInsets.symmetric(horizontal: 10),

                    child:Row(

                      children: [
                        SizedBox(

                            width:size.width*0.55,
                            child: Text("Date",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                        SizedBox(

                            width:size.width*0.35,
                            child: Text("Subjects",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
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
                      child: ListView.builder(
                        itemCount: 15,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return ExpansionTile(
                            shape: const RoundedRectangleBorder(
                                side: BorderSide(color: Colors.transparent)
                            ),
                            title: SizedBox(
                                width: size.width*0.4,
                                child: Text("01/08/2024",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey),)),
                            trailing: SizedBox(
                              width: size.width*0.3,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text("Hindi",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey),),
                                  const Icon(Icons.arrow_drop_down,color: Colors.grey,)
                                ],
                              ),
                            ),
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("Exam",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)) ,
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("Term I",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey),)) ,

                                ],
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("Time",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)) ,
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("09:00am - 01:00pm",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey),)) ,

                                ],
                              ),
                            ],
                          );
                        },)

                  ),

                ],
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
}

