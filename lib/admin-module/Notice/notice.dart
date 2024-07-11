import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class AdminNotice extends StatefulWidget {
  const AdminNotice({super.key});

  @override
  State<AdminNotice> createState() => _AdminNoticeState();
}

class _AdminNoticeState extends State<AdminNotice>with TickerProviderStateMixin  {
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
  late TabController tabBarController;
  TextEditingController note=TextEditingController();
  bool teacherSelected = false;
  bool studentSelected = false;
  String? _selectedClass;
  List<String> classOptions = [
    'Standard 12th',
    'Standard 11th',
    'Standard 10th',
    'Standard 9th',
  ];
  Future<void>writeNotePopup( BuildContext context ,Size size)async {
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
                      margin: EdgeInsets.all(0),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(height: size.height*0.02,),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Write Note",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black),),
                                SizedBox(height: size.height*0.01,),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    SizedBox(

                                      width: size.width*0.3,
                                      child: TextButton(
                                        onPressed: () {
                                          setState(() {
                                            teacherSelected = true;
                                            studentSelected = false;

                                          });
                                        },
                                        style: TextButton.styleFrom(
                                          backgroundColor: teacherSelected ? Colors.blue : Colors.white,
                                          shape: RoundedRectangleBorder(
                                            side: BorderSide(color: Colors.grey),
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                        ),
                                        child: Text(
                                          "Teacher",
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
                                            fontSize: size.width * 0.035,
                                          ),
                                        ),
                                      ),
                                    ),
                                    SizedBox(
                                      width: size.width*0.3,
                                      child: TextButton(
                                        onPressed: () {
                                          setState(() {
                                            teacherSelected = false;
                                            studentSelected = true;

                                          });
                                        },
                                        style: TextButton.styleFrom(
                                          backgroundColor: studentSelected ? Colors.blue : Colors.white,
                                          shape: RoundedRectangleBorder(
                                            side: BorderSide(color: Colors.grey),
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                        ),
                                        child: Text(
                                          "Student",
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
                                            fontSize: size.width * 0.035,
                                          ),
                                        ),
                                      ),
                                    ),

                                  ],
                                ),
                                Card(
                                  child: Container(
                                    width: size.width*0.3,
                                    height: size.height*0.05,
                                    child: DropdownButton<String>(
                                      isExpanded: true,
                                      borderRadius: BorderRadius.circular(12),
                                      hint:  Text(
                                        "Classes",
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w400,
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      padding: EdgeInsets.all(8),
                                      icon: Icon(Icons.keyboard_arrow_down_sharp),
                                      alignment: Alignment.center,
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
                                SizedBox(height: size.height*0.01,),
                                TextField(
                                  maxLines: 6,
                                  decoration: InputDecoration(
                                      contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),
                                    hintText: "Write a Notice up to 300 words...",
                                    hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                  ),


                                  controller: note,
                                )

                              ],
                            ),

                            SizedBox(height: size.height*0.02,),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [

                                Container(
                                  width: size.width*0.3,
                                  child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      child: Text("Send",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                                ),

                              ],
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
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    tabBarController = TabController(length: 3, vsync: this);
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
        title: Text("Notice Board",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
        actions: [
          Container(
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(12)
              ),
              child: TextButton(onPressed: (){
                writeNotePopup(context,size);
              }, child: Text("Write Note",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.white),)))
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
                  TabBar(
                      controller: tabBarController,
                      dividerColor: Colors.black,
                      indicatorColor: Colors.blue,
                      labelColor:Colors.blue,
                      tabs: [
                        Text("All",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.045),),
                        Text("Teacher",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.045),),
                        Text("Student",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.045),),

                      ]
                  ),
                  Container(
                      height: size.height*1,
                      width: size.width,
                      child: TabBarView(
                        controller: tabBarController,
                        children: [
                          ListView.builder(
                            physics: NeverScrollableScrollPhysics(),
                            itemCount: 10,
                            itemBuilder: (context, index) {
                              return  Column(
                                children: [
                                  SizedBox(height: size.height*0.02,),
                                  Card(
                                    margin: EdgeInsets.all(0),
                                    color: Color(0xFFCCFFD1),
                                    child: Padding(
                                      padding:  EdgeInsets.all(size.height*0.02),
                                      child: Text("All the Teacher are inform that complete your syllabus as soon as possible.And should also maintain the discipline in your classes",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w500,fontSize: size.width*0.035),),
                                    ),
                                  ),

                                ],
                              );

                            },
                          ),
                          ListView.builder(
                            itemCount: 10,
                            physics: NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return  Column(
                                children: [
                                  SizedBox(height: size.height*0.02,),
                                  Card(
                                    margin: EdgeInsets.all(0),
                                    color: Color(0xFFCCFFD1),
                                    child: Padding(
                                      padding:  EdgeInsets.all(size.height*0.02),
                                      child: Text("All the Teacher are inform that complete your syllabus as soon as possible.And should also maintain the discipline in your classes",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w500,fontSize: size.width*0.035),),
                                    ),
                                  ),

                                ],
                              );

                            },
                          ),
                          ListView.builder(
                            itemCount: 10,
                            physics: NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return  Column(
                                children: [
                                  SizedBox(height: size.height*0.02,),
                                  Card(
                                    margin: EdgeInsets.all(0),
                                    color: Color(0xFFCCFFD1),
                                    child: Padding(
                                      padding:  EdgeInsets.all(size.height*0.02),
                                      child: Text("All the Teacher are inform that complete your syllabus as soon as possible.And should also maintain the discipline in your classes",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w500,fontSize: size.width*0.035),),
                                    ),
                                  ),

                                ],
                              );

                            },
                          ),
                        ],

                      )
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
