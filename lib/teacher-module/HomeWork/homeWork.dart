
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/HomeWork/homeWOrkAPi.dart';

import '../../utils/theme.dart';
import '../../utils/utils.dart';

class HomeWork extends StatefulWidget {
  const HomeWork({super.key});

  @override
  State<HomeWork> createState() => _HomeWorkState();
}

class _HomeWorkState extends State<HomeWork> {

  String _selectedClass="9th";
  String _selectedSection ="A";
  String _selectedSubject="Maths";
  List<String> classOptions = [
    '12th',
    '11th',
    '10th',
    '9th',
  ];
  List<String> classSections = [
    'A',
    'B',
    'C',
  ];
  List<String> classSubjects = [
    'Science',
    'Maths',
    'Social Science',
    'Hindi',
  ];



  final TextEditingController chapter=TextEditingController();
  final TextEditingController topic=TextEditingController();
  final TextEditingController subTopics=TextEditingController();
  TextEditingController question = TextEditingController();
  final TextEditingController deadline=TextEditingController();
  CustomTheme themeObj=new CustomTheme();
  bool viewSelected = true;
  bool uploadSelected = false;
  HomeWorkAPI apiObj=HomeWorkAPI();
  bool isLoading=false;
  String date=DateTime.now().toString().split(" ")[0];
  String year=DateTime.now().toString().split(" ")[0].split("-")[0];
  String month=DateTime.now().toString().split(" ")[0].split("-")[1];
  int start=0;
  List<dynamic>? homeWorkList;

  DateTime? selectedDate;
  final TextEditingController _dateController = TextEditingController();

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
        _dateController.text = DateFormat('yyyy-MM-dd').format(selectedDate!);
      });
    }
  }

  Future<void> fetchHomeWork() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data=await apiObj.fetchHomeWorkList(accessToken,_selectedClass,month,year,_selectedSection,_selectedSubject,start);
      print(data);
      setState(() {
        homeWorkList=data;
      });
    } catch (e) {
      print('Error fetching classWorkList data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load classWorkList. Please try again.')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }



  Future<dynamic> uploadHomeWork(String Class,String section,String subject,String chapter,String topic,String description) async {

    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? email = pref.getString("email");


      var uploadMap = await apiObj.uploadHomeWork(accessToken!,email!,date, Class, section, subject, chapter,topic, description,_dateController.text.toString());
      print(uploadMap);

      return uploadMap;
    } catch (e) {
      print('Error fetching upload data: $e');
      showRedSnackBar("Failed to load upload. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<dynamic> updateClassWork(String Class,String id,String subject,String chapter,String topic,String description) async {

    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");


      bool status = await apiObj.updatedHomeWork(accessToken!, Class, id, date, subject, chapter, topic, description,_dateController.text.toString());
      print(status);

      return status;
    } catch (e) {
      print('Error fetching upload data: $e');
      showRedSnackBar("Failed to load upload. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }



  Future<void>publishPopup( BuildContext context ,Size size)async {
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
                    child:   Column(
                      children: [
                        Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: themeObj.textgrey,)),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                dropDownButton(size),
                                SizedBox(height: size.height * 0.01,),
                                Text("Chapter", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                SizedBox(height: size.height * 0.02,),
                                SizedBox(
                                  height: size.height * 0.07,
                                  child: TextField(
                                    showCursor: false,
                                    controller: chapter,

                                    decoration: InputDecoration(
                                        hintText: "Chapter",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey,))
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02,),
                                Text("Topic", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                SizedBox(height: size.height * 0.01,),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 1,
                                    decoration: InputDecoration(
                                        hintText: "Topic",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: Colors.grey))
                                    ),
                                    controller: topic,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02,),
                                Text(
                                  "Deadline",
                                  style: GoogleFonts.openSans(
                                    color: themeObj.textBlack,
                                    fontSize: size.width * 0.035,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.01),
                                SizedBox(
                                  child: TextField(
                                    controller: _dateController,
                                    readOnly: true,
                                    onTap: () => _selectDate(context),
                                    decoration: InputDecoration(
                                      hintText: "Select Deadline",
                                      suffixIcon: Icon(Icons.calendar_today),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8),
                                        borderSide: BorderSide(color: Colors.grey),
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02,),
                                Text("Question", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                SizedBox(height: size.height * 0.01,),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 6,
                                    decoration: InputDecoration(
                                        hintText: "Question",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey,))
                                    ),
                                    controller: question,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.03,),
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
                                          if (chapter.text.isNotEmpty&& topic.text.isNotEmpty && question.text.isNotEmpty) {
                                            setState(() {
                                              isLoading = true;
                                            });
                                            Map<dynamic, dynamic>? upload=  await uploadHomeWork(_selectedClass, _selectedSection, _selectedSubject, chapter.text.toString(), topic.text.toString(), question.text.toString());
                                            setState(() {
                                              isLoading = false;
                                            });
                                            if (upload != null) {

                                              homeWorkList?.insert(0, upload);
                                              print("added");
                                              this.setState(() {});
                                              Navigator.of(context).pop();
                                            } else {
                                              showRedSnackBar("Upload failed", context);
                                            }



                                          } else {
                                            showRedSnackBar("Please Field all the Data", context);
                                          }
                                        },
                                        child: isLoading
                                            ? CircularProgressIndicator(color: Colors.black)
                                            : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
                                      ),
                                    ),

                                  ],
                                ),
                              ],
                            ),
                          ),
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


  Future<void>updatePopup( BuildContext context ,Size size,String chap,String top,String quest,String id)async {
    TextEditingController chapter = TextEditingController(text: chap);
    TextEditingController topic = TextEditingController(text:top );
    TextEditingController question = TextEditingController(text: quest);

    return showDialog(
      context: context,
      builder: (BuildContext dialogContext) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setInnerState) {
            return  Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10,),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child:   Column(
                      children: [
                        Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: themeObj.textgrey,)),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                dropDownButton(size),
                                SizedBox(height: size.height * 0.01,),
                                Text("Chapter", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                SizedBox(height: size.height * 0.02,),
                                SizedBox(
                                  height: size.height * 0.07,
                                  child: TextField(
                                    showCursor: false,
                                    controller: chapter,
                                    decoration: InputDecoration(
                                        hintText: "Chapter",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey,))
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02,),
                                Text("Topic", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                SizedBox(height: size.height * 0.01,),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 1,
                                    decoration: InputDecoration(
                                        hintText: "Topic",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: Colors.grey))
                                    ),
                                    controller: topic,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02,),
                                Text(
                                  "Deadline",
                                  style: GoogleFonts.openSans(
                                    color: themeObj.textBlack,
                                    fontSize: size.width * 0.035,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.01),
                                SizedBox(
                                  child: TextField(
                                    controller: _dateController,
                                    readOnly: true,
                                    onTap: () => _selectDate(context),
                                    decoration: InputDecoration(
                                      hintText: "Select Deadline",
                                      suffixIcon: Icon(Icons.calendar_today),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8),
                                        borderSide: BorderSide(color: Colors.grey),
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02,),
                                Text("Question", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                SizedBox(height: size.height * 0.01,),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 6,
                                    decoration: InputDecoration(
                                        hintText: "Question",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey,))
                                    ),
                                    controller: question,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.03,),
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
                                          setState(() {
                                            isLoading = true;
                                          });
                                          bool status= await updateClassWork(_selectedClass,id,_selectedSubject,chapter.text.toString(),topic.text.toString(),question.text.toString());
                                          setState(() {
                                            isLoading = false;
                                          });
                                          if (status ) {
                                            showGreenSnackBar("Upload Success", context);
                                            this.setState(() {});
                                            Navigator.of(context).pop();
                                            fetchHomeWork();

                                          } else {
                                            showRedSnackBar("Upload failed", context);
                                          }

                                        },
                                        child: isLoading
                                            ? CircularProgressIndicator(color: Colors.black)
                                            : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
                                      ),
                                    ),

                                  ],
                                ),
                              ],
                            ),
                          ),
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


  @override
  void initState() {
    super.initState();
    fetchHomeWork();

  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        backgroundColor: themeObj.textWhite,
        body: Column(
          children: [
            Container(
                color: themeObj.textWhite,
                child: Column(
                  children: [
                    SizedBox(height: size.height * 0.02,),
                    dropDownButton(size),
                    isLoading ?   Center(
                      child: LoadingAnimationWidget.threeArchedCircle(
                        color: themeObj.primayColor,
                        size: 50,
                      ),
                    ):homeWorkList==null || homeWorkList!.isEmpty?const Center(child: Text("There was no ClassWork Found"),):SizedBox(
                      height: size.height*0.72,
                      child: ListView.builder(
                        itemCount: homeWorkList?.length,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          final classWork=homeWorkList?[index];
                          return Card(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey)),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Card(
                                        color: themeObj.secondayColor,
                                        elevation: 5,
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                        margin: EdgeInsets.all(0),
                                        child: Container(
                                          width: size.width * 0.3,
                                          child: Text(classWork["subject"], textAlign: TextAlign.center, style: GoogleFonts.openSans(fontSize: size.width * 0.05, color: themeObj.textBlack,)),
                                        ),
                                      ),
                                      Row(
                                        children: [
                                          Card(
                                            margin: EdgeInsets.all(0),
                                            color: Color.fromRGBO(96,165,250,1),
                                            child: SizedBox(
                                              height: size.height*0.045,
                                              child: Center(
                                                child: IconButton(
                                                  onPressed: (){
                                                    updatePopup(this.context, size, classWork["chapter"], classWork["topic"], classWork["description"],classWork["_id"]);

                                                  },
                                                  icon: Icon(Icons.edit,color: themeObj.textWhite,size: 20,),
                                                ),
                                              ),
                                            ),
                                          ),
                                          SizedBox(width: size.width*0.02,),
                                          Card(
                                            margin: EdgeInsets.all(0),
                                            color: Colors.red,
                                            child: SizedBox(
                                              height: size.height*0.045,
                                              child: IconButton(
                                                onPressed: () async {
                                                  SharedPreferences pref = await SharedPreferences.getInstance();
                                                  String? accessToken = pref.getString("accessToken");

                                                  bool status= await apiObj.deletedHomeWrok(accessToken!, _selectedClass, month, year, classWork["_id"]);
                                                  if (status ) {
                                                    showGreenSnackBar("Delete Success", context);
                                                    this.setState(() {});
                                                    fetchHomeWork();

                                                  } else {
                                                    showRedSnackBar("Delete failed", context);
                                                  }
                                                },
                                                icon: Icon(Icons.delete_forever,color: themeObj.textWhite,size: 20,),
                                              ),
                                            ),
                                          ),
                                        ],
                                      )
                                    ],
                                  ),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text("Chapter:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                      SizedBox(width: size.width*0.02,),
                                      SizedBox(
                                          width: size.width*0.7,
                                          child: AutoSizeText(classWork["chapter"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),

                                    ],
                                  ),
                                  SizedBox(height: size.height * 0.02,),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      AutoSizeText("Topic:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                      SizedBox(width: size.width*0.02,),
                                      SizedBox(
                                          width: size.width*0.7,
                                          child: AutoSizeText(classWork["topic"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),

                                    ],
                                  ),
                                  SizedBox(height: size.height * 0.02,),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      AutoSizeText("Task:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                      SizedBox(width: size.width*0.02,),
                                      SizedBox(
                                          width: size.width*0.8,
                                          child: AutoSizeText(classWork["description"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),

                                    ],
                                  ),
                                  SizedBox(height: size.height * 0.02,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.end,
                                        children: [
                                          AutoSizeText("Date:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                          SizedBox(width: size.width*0.02,),
                                          AutoSizeText(classWork["date"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),),

                                        ],
                                      ),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.end,
                                        children: [
                                          AutoSizeText("Deadline:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
                                          SizedBox(width: size.width*0.02,),
                                          AutoSizeText(classWork["deadline"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),),

                                        ],
                                      ),
                                    ],
                                  ),
                                  index==homeWorkList!.length-1? SizedBox(height: size.height * 0.06,):SizedBox(),


                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),

                  ],
                )
            ),
          ],
        ),
        floatingActionButton:  SizedBox(
          width: size.width*0.35,
          child: TextButton(onPressed: (){
            publishPopup(context,size);
          },
            style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(96,165,250,0.6),),
            child:Row(
              children: [
                Icon(CupertinoIcons.add_circled,color: themeObj.textBlack,),
                SizedBox(width: size.width*0.02,),
                Text("Upload",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.045),),

              ],
            ),),
        )
    );

  }
  Widget dropDownButton(Size size) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Classes", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
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
                      child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width * 0.02,),
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Sections", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSection,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSection = newValue!;
                    });
                  },
                  items: classSections.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width * 0.02,),
            Card(
              child: Container(
                width: size.width * 0.3,
                height: size.height * 0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Subjects", style: GoogleFonts.openSans(color: themeObj.textgrey, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp, color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSubject,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSubject = newValue!;
                      homeWorkList=null;
                      fetchHomeWork();
                    });
                  },
                  items: classSubjects.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option, overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
