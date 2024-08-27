import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/ClassWorks/classWorkAPI.dart';
import 'package:untitled/utils/utils.dart';

import '../../utils/theme.dart';

class ClassWork extends StatefulWidget {
  const ClassWork({super.key});

  @override
  State<ClassWork> createState() => _ClassWorkState();
}

class _ClassWorkState extends State<ClassWork> with SingleTickerProviderStateMixin {
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";

  List<String> classSections = [];
  List<String> classSubjects = [];
  Map<String, dynamic> _storedData = {};


  CustomTheme themeObj = new CustomTheme();
    ClassWorkAPI apiObj=ClassWorkAPI();
    bool isLoading=false;
    String date=DateTime.now().toString().split(" ")[0];
    String year=DateTime.now().toString().split(" ")[0].split("-")[0];
    String month=DateTime.now().toString().split(" ")[0].split("-")[1];
    int start=0;
  List<dynamic>? classWorkList;
  TextEditingController chapter = TextEditingController();
  TextEditingController topic = TextEditingController();
  TextEditingController subTopics = TextEditingController();
  TextEditingController question = TextEditingController();


  Future<void> fetchClassWork() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data=await apiObj.fetchClassWorkList(accessToken,_selectedClass,month,year,_selectedSection,_selectedSubject,start);
      print(data);
      setState(() {
        classWorkList=data;
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



  Future<dynamic> uploadClassWork(String Class,String section,String subject,String chapter,String topic,String description) async {

    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? email = pref.getString("email");


      var uploadMap = await apiObj.uploadClassWork(accessToken!,email!,date, Class, section, subject, chapter,topic, description);
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


      bool status = await apiObj.updatedClassWork(accessToken!, Class, id, date, subject, chapter, topic, description);
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
                                            Map<dynamic, dynamic>? upload=  await uploadClassWork(_selectedClass, _selectedSection, _selectedSubject, chapter.text.toString(), topic.text.toString(), question.text.toString());
                                            setState(() {
                                              isLoading = false;
                                            });
                                            if (upload != null) {

                                              classWorkList?.insert(0, upload);
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
                                              fetchClassWork();

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


  void initializeDropdowns() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? jsonString = prefs.getString('class_section_subjects');

    if (jsonString != null) {
      Map<String, dynamic> storedData = jsonDecode(jsonString);
      setState(() {
        _storedData = storedData;
        updateSections();
      });
    }
  }

  void updateSections() {
    classSections = _storedData[_selectedClass]?.keys.toList() ?? [];
    _selectedSection = "";
    updateSubjects();
  }

  void updateSubjects() {
    if (_selectedClass.isNotEmpty && _selectedSection.isNotEmpty) {
      // Cast List<dynamic> to List<String>
      classSubjects = (_storedData[_selectedClass]?[_selectedSection] as List<dynamic>?)
          ?.map((item) => item as String)
          .toList() ?? [];
      _selectedSubject = "";
    } else {
      classSubjects = [];
    }
  }


  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(parent: _animationController, curve: Curves.easeInOut);
    fetchClassWork();
    initializeDropdowns();
  }
  // @override
  // Widget build(BuildContext context) {
  //   Size size = MediaQuery.of(context).size;
  //   CustomTheme themeObj=CustomTheme(size);
  //   return Scaffold(
  //       backgroundColor: CustomTheme.whiteColor,
  //       body: SingleChildScrollView(
  //         child: Center(
  //           child: Padding(
  //             padding: const EdgeInsets.symmetric(horizontal: 8),
  //             child: Container(
  //                 color: CustomTheme.whiteColor,
  //                 child: Column(
  //                   children: [
  //                     SizedBox(height: size.height * 0.02,),
  //                     Row(
  //                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                       children: [
  //                         Text("Search by Subject",style: themeObj.bigNormalText,),
  //                         Card(
  //                           child: SizedBox(
  //                             width: size.width * 0.3,
  //                             height: size.height * 0.05,
  //                             child:DropdownButton<String>(
  //                               isExpanded: true,
  //                               borderRadius: BorderRadius.circular(12),
  //                               hint: Text("Subject", style: themeObj.normalText),
  //                               padding: const EdgeInsets.all(8),
  //                               icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
  //                               alignment: Alignment.center,
  //                               underline: Container(),
  //                               value: selectedSubject.isEmpty ? null : selectedSubject,
  //                               onChanged: (newValue) {
  //                                 setState(() {
  //                                   selectedSubject = newValue!;
  //                                   classWorkList=[];
  //                                   fetchClasswork();
  //
  //
  //                                 });
  //                               },
  //                               items: subjectOptions==null ||  subjectOptions!.isEmpty? handleSubject.map((String option) {
  //                                 return DropdownMenuItem<String>(
  //                                   value: option,
  //                                   child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
  //                                 );
  //                               }).toList():
  //                               subjectOptions?.map((String option) {
  //                                 return DropdownMenuItem<String>(
  //                                   value: option,
  //                                   child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
  //                                 );
  //                               }).toList(),
  //                             ),
  //
  //
  //                           ),
  //                         ),
  //                       ],
  //                     ),
  //                     isLoading ?   Center(
  //                       child: LoadingAnimationWidget.threeArchedCircle(
  //                         color: CustomTheme.primaryColor,
  //                         size: 50,
  //                       ),
  //                     ):
  //                     classWorkList==null || classWorkList!.isEmpty? SizedBox(
  //                         height: size.height*0.7,
  //                         child: Center(child: Text("There was no Classwork Found", style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)):SizedBox(
  //
  //                       child: ListView.builder(
  //                         itemCount: classWorkList?.length,
  //                         shrinkWrap: true,
  //                         itemBuilder: (context, index) {
  //                           final classWork=classWorkList?[index];
  //                           return Padding(
  //                             padding: const EdgeInsets.all(8.0),
  //                             child: Column(
  //                               children: [
  //                               Card(
  //                               elevation: 4,
  //                               shape: RoundedRectangleBorder(
  //                                 borderRadius: BorderRadius.circular(15),
  //                                 side: BorderSide(color: CustomTheme.primaryColor.withOpacity(0.5), width: 1.5),
  //                               ),
  //                               margin: const EdgeInsets.all(0),
  //                               child: Padding(
  //                                 padding: const EdgeInsets.all(8.0),
  //                                 child: Column(
  //                                   crossAxisAlignment: CrossAxisAlignment.start,
  //                                   children: [
  //                                     Container(
  //                                       decoration: BoxDecoration(
  //                                         gradient: LinearGradient(
  //                                           colors: [CustomTheme.primaryColor, CustomTheme.secondaryColor],
  //                                           begin: Alignment.topLeft,
  //                                           end: Alignment.bottomRight,
  //                                         ),
  //                                         borderRadius: BorderRadius.circular(10),
  //                                       ),
  //                                       padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
  //                                       child: Text(
  //                                         selectedSubject.isEmpty ? "Subject" : selectedSubject,
  //                                         style: themeObj.bigNormalText.copyWith(
  //                                           color: CustomTheme.blackColor,
  //                                           fontWeight: FontWeight.w400,
  //                                         ),
  //                                       ),
  //                                     ),
  //                                     SizedBox(height: size.height * 0.02),
  //                                     _buildInfoRow("Chapter:", classWork?["chapter"] ?? "Chapter",size),
  //                                     SizedBox(height: size.height * 0.01),
  //                                     _buildInfoRow("Topic:", classWork?["topic"] ?? "Topic",size),
  //
  //                                     ExpansionTile(
  //                                       tilePadding: EdgeInsets.zero,
  //                                       title: Text("Description", style: themeObj.normalText.copyWith(fontWeight: FontWeight.w600)),
  //                                       children: [
  //                                        SizedBox(
  //                                          width: size.width,
  //                                          child:  Text(
  //                                            classWork?["description"] ?? "Description",
  //                                            style: themeObj.normalText,
  //                                          ),
  //                                        )
  //                                       ],
  //                                     ),
  //                                     Divider(color: CustomTheme.primaryColor.withOpacity(0.3)),
  //                                     SizedBox(height: size.height * 0.01),
  //                                     Row(
  //                                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                                       children: [
  //                                         Text(
  //                                           classWork?["date"] ?? "Date",
  //                                           style: themeObj.normalText.copyWith(fontStyle: FontStyle.italic),
  //                                         ),
  //                                         Row(
  //                                           children: [
  //                                             CircleAvatar(
  //                                               radius: size.width * 0.035,
  //                                               backgroundImage: NetworkImage(classWork?["by"]["profileLink"] ?? ""),
  //                                             ),
  //                                             const SizedBox(width: 8),
  //                                             Text(
  //                                               "By ${classWork?["by"]["name"] ?? "Name"}",
  //                                               style: themeObj.normalText.copyWith(fontWeight: FontWeight.bold),
  //                                             ),
  //                                           ],
  //                                         ),
  //                                       ],
  //                                     ),
  //                                   ],
  //                                 ),
  //                               ),
  //                             ),
  //
  //
  //
  //
  //                               ],
  //                             ),
  //                           );
  //                         },
  //                       ),
  //                     ),
  //
  //                   ],
  //                 )
  //             ),
  //           ),
  //         ),
  //       )
  //   );
  // }
  // Widget _buildInfoRow(String label, String value,Size size) {
  //   CustomTheme themeObj=CustomTheme(size);
  //   return Row(
  //     crossAxisAlignment: CrossAxisAlignment.start,
  //     children: [
  //       Text(label, style: themeObj.normalText.copyWith(fontWeight: FontWeight.w600)),
  //       SizedBox(width: size.width * 0.02),
  //       Expanded(
  //         child: Text(
  //           value,
  //           style: themeObj.bigNormalText,
  //           overflow: TextOverflow.ellipsis,
  //           maxLines: 2,
  //         ),
  //       ),
  //     ],
  //   );
  // }
  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: Container(
          color: themeObj.textWhite,
          child: Column(
            children: [
              SizedBox(height: size.height * 0.02,),
              dropDownButton(size),
              isLoading ?   Expanded(
                child: Center(
                  child: LoadingAnimationWidget.threeArchedCircle(
                    color: themeObj.primayColor,
                    size: 50,
                  ),
                ),
              ):classWorkList==null || classWorkList!.isEmpty?
               Expanded(
                 child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.class_outlined, size: 100, color: Colors.grey[400]),
                      SizedBox(height: 20),
                      Text(
                        "No classwork found",
                        style: TextStyle(fontSize: 18, color: Colors.grey[600]),
                      ),
                    ],
                  ),
                               ),
               ):
              // SizedBox(
              //   child: ListView.builder(
              //     itemCount: classWorkList?.length,
              //     shrinkWrap: true,
              //     itemBuilder: (context, index) {
              //       final classWork=classWorkList?[index];
              //       return Card(
              //
              //         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey)),
              //         child: Padding(
              //           padding: const EdgeInsets.symmetric(horizontal: 8.0,vertical: 5),
              //           child: Column(
              //             children: [
              //               Row(
              //                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
              //                 children: [
              //                   Card(
              //                     color: themeObj.secondayColor,
              //                     shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              //                     margin: EdgeInsets.all(0),
              //                     child: Container(
              //                       width: size.width * 0.3,
              //                       child: Text(classWork["subject"], textAlign: TextAlign.center, style: GoogleFonts.openSans(fontSize: size.width * 0.05, color: themeObj.textBlack,)),
              //                     ),
              //                   ),
              //                   Row(
              //                     children: [
              //                       Card(
              //                         margin: EdgeInsets.all(0),
              //                         color: Color.fromRGBO(96,165,250,1),
              //                         child: SizedBox(
              //                           height: size.height*0.045,
              //                           child: Center(
              //                             child: IconButton(
              //                               onPressed: (){
              //                                 updatePopup(this.context, size, classWork["chapter"], classWork["topic"], classWork["description"],classWork["_id"]);
              //
              //                               },
              //                               icon: Icon(Icons.edit,color: themeObj.textWhite,size: 20,),
              //                             ),
              //                           ),
              //                         ),
              //                       ),
              //                       SizedBox(width: size.width*0.02,),
              //                       Card(
              //                         margin: EdgeInsets.all(0),
              //                         color: Colors.red,
              //                         child: SizedBox(
              //                           height: size.height*0.045,
              //                           child: IconButton(
              //                             onPressed: () async {
              //                               SharedPreferences pref = await SharedPreferences.getInstance();
              //                               String? accessToken = pref.getString("accessToken");
              //
              //                              bool status= await apiObj.deletedClassWork(accessToken!, _selectedClass, month, year, classWork["_id"]);
              //                               if (status ) {
              //                                 showGreenSnackBar("Delete Success", context);
              //                                 this.setState(() {});
              //                                 fetchClassWork();
              //
              //                               } else {
              //                                 showRedSnackBar("Delete failed", context);
              //                               }
              //                               },
              //                             icon: Icon(Icons.delete_forever,color: themeObj.textWhite,size: 20,),
              //                           ),
              //                         ),
              //                       ),
              //                     ],
              //                   )
              //                 ],
              //               ),
              //               SizedBox(height: size.height * 0.02,),
              //                 Row(
              //                   crossAxisAlignment: CrossAxisAlignment.start,
              //                   children: [
              //                     Text("Chapter:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
              //                     SizedBox(width: size.width*0.02,),
              //                     SizedBox(
              //                         width: size.width*0.7,
              //                         child: AutoSizeText(classWork["chapter"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),
              //
              //                   ],
              //                 ),
              //               SizedBox(height: size.height * 0.02,),
              //                 Row(
              //                   crossAxisAlignment: CrossAxisAlignment.start,
              //                   children: [
              //                     AutoSizeText("Topic:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
              //                     SizedBox(width: size.width*0.02,),
              //                     SizedBox(
              //                         width: size.width*0.7,
              //                         child: AutoSizeText(classWork["topic"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),
              //
              //                   ],
              //                 ),
              //               ExpansionTile(
              //
              //                 shape: Border.all(color: Colors.transparent),
              //                   leading:   AutoSizeText("Description:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600),),
              //                   title: Text(""),
              //                   children: [
              //                     SizedBox(
              //                         width: size.width*0.8,
              //                         child: AutoSizeText(classWork["description"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),
              //                     SizedBox(height: size.height * 0.02,),
              //                     Row(
              //                       mainAxisAlignment: MainAxisAlignment.end,
              //                       children: [
              //                         AutoSizeText("Date: ${classWork["date"]}", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),
              //
              //                       ],
              //                     ),
              //                   ],
              //
              //               ),
              //               index==classWorkList!.length-1? SizedBox(height: size.height * 0.02,):SizedBox(),
              //             ],
              //           ),
              //         ),
              //       );
              //     },
              //   ),
              // ),
              Expanded(child: _buildClassworkList(size,themeObj))
            ],
          )
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
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _buildDropdown(size, "Class", _selectedClass, _storedData.keys.toList(), (newValue) {
            setState(() {
              _selectedClass = newValue!;
              updateSections();
            });
          }),
          SizedBox(width: size.width * 0.02),
          _buildDropdown(size, "Section", _selectedSection, classSections, (newValue) {
            setState(() {
              _selectedSection = newValue!;
              updateSubjects();
            });
          }),
          SizedBox(width: size.width * 0.02),
          _buildDropdown(size, "Subject", _selectedSubject, classSubjects, (newValue) {
            setState(() {
              _selectedSubject = newValue!;
              fetchClassWork();
            });
          }),
        ],
      ),
    );
  }

  Widget _buildDropdown(Size size, String hint, String value, List<String> items, Function(String?) onChanged) {
    return Container(
      width: size.width * 0.3,
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(30),
          // boxShadow: [
          //   BoxShadow(
          //     color: Colors.grey.withOpacity(0.2),
          //     spreadRadius: 1,
          //     blurRadius: 5,
          //     offset: Offset(0, 3),
          //   ),
          // ],
          border: Border.all(color: Colors.grey)
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          isExpanded: true,
          hint: Text(hint, style: GoogleFonts.poppins(color: themeObj.textgrey, fontSize: size.width * 0.035)),
          value: value.isEmpty ? null : value,
          onChanged: onChanged,
          items: items.map((String option) {
            return DropdownMenuItem<String>(
              value: option,
              child: Text(option, style: GoogleFonts.poppins(color: themeObj.textBlack, fontSize: size.width * 0.035)),
            );
          }).toList(),
          icon: Icon(Icons.arrow_drop_down, color: themeObj.textgrey),
          borderRadius: BorderRadius.circular(30),
          dropdownColor: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 16),
        ),
      ),
    );
  }

  Widget _buildClassworkList(Size size, CustomTheme themeObj) {
    return AnimationLimiter(
      child :ListView.builder(
        itemCount: classWorkList?.length ?? 0,
        padding: EdgeInsets.all(5),
        itemBuilder: (context, index) {
          final classWork = classWorkList?[index];
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child:Card(

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.grey)),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0,vertical: 5),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Card(
                              color: themeObj.secondayColor,
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

                                        bool status= await apiObj.deletedClassWork(accessToken!, _selectedClass, month, year, classWork["_id"]);
                                        if (status ) {
                                          showGreenSnackBar("Delete Success", context);
                                          this.setState(() {});
                                          fetchClassWork();

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
                        SizedBox(height: size.height * 0.02,),
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
                        ExpansionTile(

                          shape: Border.all(color: Colors.transparent),
                          leading:   AutoSizeText("Description:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600),),
                          title: Text(""),
                          children: [
                            SizedBox(
                                width: size.width*0.8,
                                child: AutoSizeText(classWork["description"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500),)),
                            SizedBox(height: size.height * 0.02,),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                AutoSizeText("Date: ${classWork["date"]}", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600),),

                              ],
                            ),
                          ],

                        ),
                        index==classWorkList!.length-1? SizedBox(height: size.height * 0.02,):SizedBox(),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          );;
        },
      ),
    );
  }





  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _animationController.forward();
  }
}
