import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';

class NoteBookRecord extends StatefulWidget {
  const NoteBookRecord({super.key});

  @override
  State<NoteBookRecord> createState() => _NoteBookRecordState();
}

class _NoteBookRecordState extends State<NoteBookRecord> with TickerProviderStateMixin {
  CustomTheme themeObj = CustomTheme();

  String? _selectedClass;
  String? _selectedSection;
  String? _selectedSubject;
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
  final List<Map<String, dynamic>> record = [
    {'name': 'Ankit', 'checked': true},
    {'name': 'Shailesh', 'checked': true},
    {'name': 'Abhishek', 'checked': false},
    {'name': 'Manish', 'checked': true},
    {'name': 'Bhanu', 'checked': false},
    {'name': 'Ankit', 'checked': true},
    {'name': 'Ankit', 'checked': true},
    {'name': 'Ankit', 'checked': true},
    {'name': 'Ankit', 'checked': true},
  ];

  late TabController tabBarController;
  bool viewSelected = true;
  bool uploadSelected = false;

  void _handleTabSelection() {
    setState(() {
      if (tabBarController.index == 0) {
        viewSelected = true;
        uploadSelected = false;
      } else {
        viewSelected = false;
        uploadSelected = true;
      }
    });
  }

  @override
  void dispose() {
    tabBarController.removeListener(_handleTabSelection);
    tabBarController.dispose();
    super.dispose();
  }
  @override
  void initState() {
    super.initState();
    tabBarController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        title: Text("Note Book Record",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
        actions: [
          ElevatedButton.icon(
            icon: Icon(Icons.edit, size: 18,color: themeObj.textBlack,),
            label: Text("Edit",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
            style: ElevatedButton.styleFrom(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              backgroundColor: themeObj.secondayColor,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ), onPressed: () {  },
          )

        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            TabBar(
              controller: tabBarController,
              dividerColor: themeObj.textgrey,
              dividerHeight: 3,
              indicator: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: Colors.transparent,
                    width: 5.0,
                  ),
                ),
              ),
              tabs: [
                Card(
                  color: viewSelected ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  child: Container(
                    height: size.height * 0.045,
                    width: size.width * 0.2,
                    child: Center(
                      child: Text(
                        "View",
                        style: GoogleFonts.openSans(
                          fontSize: size.width * 0.055,
                          color: themeObj.textBlack,
                        ),
                      ),
                    ),
                  ),
                ),
                Card(
                  color: uploadSelected ? themeObj.primayColor : Color.fromRGBO(209, 213, 219, 1),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  child: Container(
                    height: size.height * 0.045,
                    width: size.width * 0.2,
                    child: Center(
                      child: Text(
                        "Upload",
                        style: GoogleFonts.openSans(
                          fontSize: size.width * 0.055,
                          color: themeObj.textBlack,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.02),
            dropDownButton(size),
            SizedBox(height: size.height * 0.02),
            SizedBox(
              height: size.height * 0.8,
              child: TabBarView(
                controller: tabBarController,
                children: [
                  Column(
                    children: [
                      Container(
                        height: size.height * 0.07,
                        color: Color.fromRGBO(233, 213, 255, 1),
                        child: Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(left: 4.0),
                              child: SizedBox(
                                width: size.width * 0.2,
                                child: Text(
                                  "Sr. No.",
                                  overflow: TextOverflow.ellipsis,
                                  style: GoogleFonts.openSans(
                                    color: themeObj.textBlack,
                                    fontWeight: FontWeight.w400,
                                    fontSize: size.width * 0.05,
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.25,
                              child: Text(
                                "Name",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.25,
                              child: Text(
                                "Checked",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                            SizedBox(
                              child: Text(
                                "UnChecked",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Divider(thickness: 2, height: 2, color: Colors.black),
                      ListView.separated(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          final data = record[index];
                          return SizedBox(
                            height: size.height * 0.04,
                            child: Row(
                              children: [
                                Container(
                                  margin: EdgeInsets.only(left: 4),
                                  width: size.width * 0.2,
                                  child: AutoSizeText(
                                    "0${index + 1}",
                                    overflow: TextOverflow.ellipsis,
                                    style: GoogleFonts.openSans(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.045,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: size.width * 0.25,
                                  child: AutoSizeText(
                                    data["name"],
                                    overflow: TextOverflow.ellipsis,
                                    style: GoogleFonts.openSans(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.045,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: size.width * 0.25,
                                  child: data["checked"]
                                      ? Icon(
                                    CupertinoIcons.check_mark_circled,
                                    size: size.width * 0.08,
                                    color: Colors.green,
                                  )
                                      : SizedBox(),
                                ),
                                SizedBox(
                                  width: size.width * 0.25,
                                  child: !data["checked"]
                                      ? Center(
                                    child: Icon(
                                      CupertinoIcons.clear_circled,
                                      size: size.width * 0.08,
                                      color: Colors.red,
                                    ),
                                  )
                                      : SizedBox(),
                                ),
                              ],
                            ),
                          );
                        },
                        separatorBuilder: (context, index) => Divider(),
                        itemCount: record.length,
                      )
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        height: size.height * 0.07,
                        color: Color.fromRGBO(233, 213, 255, 1),
                        child: Row(
                          children: [
                            SizedBox(
                              width: size.width * 0.2,
                              child: Text(
                                "Sr. No.",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.25,
                              child: Text(
                                "Name",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                            SizedBox(
                              width: size.width * 0.25,
                              child: Text(
                                "Checked",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                            SizedBox(
                              child: Text(
                                "UnChecked",
                                overflow: TextOverflow.ellipsis,
                                style: GoogleFonts.openSans(
                                  color: themeObj.textBlack,
                                  fontWeight: FontWeight.w400,
                                  fontSize: size.width * 0.05,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Divider(thickness: 2, height: 2, color: Colors.black),
                      ListView.separated(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          final data = record[index];
                          return SizedBox(
                            height: size.height * 0.04,
                            child: Row(
                              children: [
                                SizedBox(
                                  width: size.width * 0.2,
                                  child: Text(
                                    "0${index + 1}",
                                    overflow: TextOverflow.ellipsis,
                                    style: GoogleFonts.openSans(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.045,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: size.width * 0.25,
                                  child: Text(
                                    data["name"],
                                    overflow: TextOverflow.ellipsis,
                                    style: GoogleFonts.openSans(
                                      color: themeObj.textBlack,
                                      fontWeight: FontWeight.w400,
                                      fontSize: size.width * 0.045,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: size.width * 0.25,
                                  child: Radio<bool>(
                                    value: true,
                                     activeColor: MaterialStateColor.resolveWith((states) => Colors.green),

                                    groupValue: data["checked"],
                                    onChanged: (value) {
                                      setState(() {
                                        data["checked"] = value!;
                                      });
                                    },
                                  ),
                                ),
                                SizedBox(
                                  child: Radio<bool>(
                                    value: false,
                                    activeColor: MaterialStateColor.resolveWith((states) => Colors.red),
                                    groupValue: data["checked"],
                                    onChanged: (value) {
                                      setState(() {
                                        data["checked"] = value!;
                                      });
                                    },
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                        separatorBuilder: (context, index) => Divider(),
                        itemCount: record.length,
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
                                },
                                child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                          ),
                        ],
                      )
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget dropDownButton(Size size){
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Classes",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600),),
                  alignment: Alignment.center,
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color:themeObj.textgrey ,),
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
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Sections",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
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
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                    );
                  }).toList(),
                ),
              ),
            ),
            SizedBox(width: size.width*0.02,),
            Card(
              child: Container(
                width: size.width*0.3,
                height: size.height*0.05,
                child: DropdownButton<String>(
                  isExpanded: true,
                  borderRadius: BorderRadius.circular(12),
                  hint: Text("Subjects",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
                  padding: EdgeInsets.all(8),
                  icon: Icon(Icons.keyboard_arrow_down_sharp,color: themeObj.textgrey,),
                  alignment: Alignment.center,
                  underline: Container(),
                  value: _selectedSubject,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedSubject = newValue!;
                    });
                  },
                  items: classSubjects.map((String option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.045,fontWeight:FontWeight.w600)),
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
