
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../utils/theme.dart';

class HomeWork extends StatefulWidget {
  const HomeWork({super.key});

  @override
  State<HomeWork> createState() => _HomeWorkState();
}

class _HomeWorkState extends State<HomeWork>with TickerProviderStateMixin {

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
  late TabController tabBarController;

  final TextEditingController chapter=TextEditingController();
  final TextEditingController topic=TextEditingController();
  final TextEditingController subTopics=TextEditingController();
  final TextEditingController description=TextEditingController();
  final TextEditingController deadline=TextEditingController();
  CustomTheme themeObj=new CustomTheme();
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
    tabBarController.addListener(_handleTabSelection);
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,

      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          children: [
            Column(
              children: [

                TabBar(
                  controller: tabBarController,
                  dividerColor: themeObj.textgrey,
                  dividerHeight: 3,

                  indicator:BoxDecoration(
                      border: Border(bottom: BorderSide(
                        color: Colors.transparent,
                        width: 5.0,

                      ))
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
                SizedBox(height: size.height*0.02,),
                dropDownButton(size),
                SizedBox(height: size.height*0.02,),
                SizedBox(
                  height: size.height*0.8,
                  child: TabBarView(
                      controller: tabBarController,
                      children: [
                        Column(
                          children: [
                            ListView.builder(
                              itemCount: 3,
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Card(
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey)),
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: SizedBox(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Card(
                                            color: themeObj.secondayColor,
                                            elevation: 5,
                                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                            margin: EdgeInsets.all(0),
                                            child: Container(
                                              width: size.width*0.3,
                                              child: Text("English",textAlign:TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:themeObj.textBlack),),


                                            ),

                                          ),
                                          SizedBox(height: size.height*0.02,),
                                          Text("Today Work",style: GoogleFonts.openSans(color:themeObj.textgrey,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                          SizedBox(height: size.height*0.01,),
                                          Text("Essay on BestFriend",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.04,fontWeight:FontWeight.w400),),
                                          SizedBox(height: size.height*0.02,),

                                          Center(
                                            child: Container(
                                              width: size.width*0.35,
                                              child: ElevatedButton(
                                                  style: ElevatedButton.styleFrom(backgroundColor: themeObj.primayColor ),
                                                  onPressed: (){}, child: Text("Edit",style: GoogleFonts.openSans(color:themeObj.textBlack),)),
                                            ),
                                          ),


                                        ],
                                      ),
                                    ),
                                  ),
                                );

                              },
                            ),
                          ],
                        ),
                        Column(
                          children: [
                            Card(
                              elevation: 5,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color:themeObj.textgrey)),
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text("Chapter",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                    SizedBox(height: size.height*0.01,),
                                    SizedBox(
                                      height: size.height*0.07,
                                      child: TextField(
                                        showCursor: false,
                                        controller: chapter,
                                        decoration: InputDecoration(
                                            hintText: "Chapter",
                                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                        ),

                                      ),
                                    ),
                                    SizedBox(height: size.height*0.02,),
                                    Text("Topic",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                    SizedBox(height: size.height*0.01,),
                                    SizedBox(
                                      height: size.height*0.07,
                                      child: TextField(
                                        decoration: InputDecoration(
                                            hintText: "Topic",
                                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                        ),

                                      ),
                                    ),
                                    SizedBox(height: size.height*0.02,),
                                    Text("Sub Topic",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                    SizedBox(height: size.height*0.01,),
                                    SizedBox(
                                      height: size.height*0.07,
                                      child: TextField(
                                        decoration: InputDecoration(
                                            hintText: "Sub Topic",
                                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: themeObj.textgrey))
                                        ),

                                      ),
                                    ),
                                    SizedBox(height: size.height*0.02,),
                                    Text("Description",style: GoogleFonts.openSans(color:themeObj.textBlack,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                    SizedBox(height: size.height*0.01,),
                                    SizedBox(
                                      height: size.height*0.07,
                                      child: TextField(
                                        decoration: InputDecoration(
                                            hintText: "Description",
                                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color:themeObj.textgrey))
                                        ),

                                      ),
                                    ),
                                    Row(
                                      children: [
                                        Text("Deadline",style: GoogleFonts.openSans(color:Colors.red,fontSize:size.width*0.04,fontWeight:FontWeight.w600),),
                                        IconButton(onPressed: (){}, icon: Icon(Icons.calendar_month))
                                      ],
                                    ),
                                    SizedBox(
                                      width: size.width*0.3,
                                      height: size.height*0.05,
                                      child: TextField(
                                        controller: deadline,
                                        keyboardType: TextInputType.datetime,
                                        decoration: InputDecoration(
                                            hintText: "DD/MM/YY",
                                            border: OutlineInputBorder(borderSide: BorderSide(color: themeObj.textgrey),borderRadius: BorderRadius.circular(8))

                                        ),
                                      ),
                                    ),
                                    SizedBox(height: size.height*0.03,),
                                    Center(
                                      child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(backgroundColor: themeObj.primayColor ),
                                          onPressed: (){}, child: Text("Publish",style: GoogleFonts.openSans(color:themeObj.textBlack),)),
                                    ),


                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),

                      ]
                  ),
                )
              ],
            ),
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
