import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TeacherAssignment extends StatefulWidget {
  const TeacherAssignment({super.key});

  @override
  State<TeacherAssignment> createState() => _TeacherAssignmentState();
}

class _TeacherAssignmentState extends State<TeacherAssignment> with TickerProviderStateMixin{
   List<String> maths=["Surface Areas and Volume","Probability","Dimensions"];
   String? _selectedClass;
   String? _selectedSection;
   String? _selectedSubject;
   List<String> classOptions = [
     'Standard 12th',
     'Standard 11th',
     'Standard 10th',
     'Standard 9th',
   ];
   List<String> classSections = [
     'Section A',
     'Section B',
     'Section C',

   ];
   List<String> classSubjects = [
     'Science',
     'Maths',
     'Social Science',
     'Hindi',
   ];
   late TabController tabBarController;
   @override
   void initState() {
     super.initState();
     tabBarController = TabController(length: 2, vsync: this);
   }
   final TextEditingController chapter=TextEditingController();
   final TextEditingController topic=TextEditingController();
   final TextEditingController subTopics=TextEditingController();
   final TextEditingController description=TextEditingController();
   final TextEditingController deadline=TextEditingController();
   @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      // appBar: AppBar(
      //   iconTheme: IconThemeData(color: Colors.white),
      //   backgroundColor: Colors.transparent,
      //   title: Text("Assignments",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      // ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          children: [
            SizedBox(
              height: size.height * 0.05,
            ),
            Card(
                color: Colors.white,
                margin: const EdgeInsets.all(0),
                shape: const OutlineInputBorder(
                    borderSide: BorderSide(
                        color: Colors.white
                    ),
                    borderRadius: BorderRadius.only(
                        topRight: Radius.circular(30),
                        topLeft: Radius.circular(30)
                    )
                ),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [

                      TabBar(
                        controller: tabBarController,
                        dividerColor: Colors.transparent,
                        tabs: [
                          Text(
                            "View",
                            style: GoogleFonts.openSans(
                              fontSize: size.width * 0.055,
                              color: Colors.black,
                            ),
                          ),
                          Text(
                            "Upload",
                            style: GoogleFonts.openSans(
                              fontSize: size.width * 0.055,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      dropDownButton(size),
                      SizedBox(height: size.height*0.02,),
                      SizedBox(
                        height: size.height*0.085*15.5,
                        child: TabBarView(
                            controller: tabBarController,
                            children: [
                              Column(
                                children: [
                                  ListView.builder(
                                    itemCount: maths.length,
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
                                                  color: Color(0xFFE8EFFD),
                                                  elevation: 5,
                                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                                  child: Padding(
                                                    padding: const EdgeInsets.all(5.0),
                                                    child: Text("Mathematics",textAlign:TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.blue),),
                                                  ),

                                                ),
                                                SizedBox(height: size.height*0.02,),
                                                Text(maths[index],textAlign:TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.05),),
                                                SizedBox(height: size.height*0.02,),
                                                Row(
                                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                  children: [
                                                    Text("Assign Date",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                                    Text("10 Nov 2023",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey),)


                                                  ],
                                                ),
                                                SizedBox(height: size.height*0.01,),
                                                Row(
                                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                  children: [
                                                    Text("Last Submission Date",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                                    Text("10 Dec 2023",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey),)


                                                  ],
                                                ),
                                                SizedBox(height: size.height*0.03,),
                                                Center(
                                                  child: ElevatedButton(
                                                      style: ElevatedButton.styleFrom(backgroundColor: Color(0xFF5A77BC) ),
                                                      onPressed: (){}, child: Text("Submitted By",style: GoogleFonts.openSans(color:Colors.white),)),
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
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey)),
                                    child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("Chapter",style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                          SizedBox(height: size.height*0.01,),
                                          SizedBox(
                                            height: size.height*0.07,
                                            child: TextField(
                                              showCursor: false,
                                              controller: chapter,
                                              decoration: InputDecoration(
                                                  hintText: "Chapter",
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                              ),

                                            ),
                                          ),
                                          SizedBox(height: size.height*0.02,),
                                          Text("Topic",style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                          SizedBox(height: size.height*0.01,),
                                          SizedBox(
                                            height: size.height*0.07,
                                            child: TextField(
                                              decoration: InputDecoration(
                                                  hintText: "Topic",
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                              ),

                                            ),
                                          ),
                                          SizedBox(height: size.height*0.02,),
                                          Text("Sub Topic",style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                          SizedBox(height: size.height*0.01,),
                                          SizedBox(
                                            height: size.height*0.07,
                                            child: TextField(
                                              decoration: InputDecoration(
                                                  hintText: "Sub Topic",
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                              ),

                                            ),
                                          ),
                                          SizedBox(height: size.height*0.02,),
                                          Text("Description",style: GoogleFonts.openSans(color:Colors.black,fontSize:size.width*0.035,fontWeight:FontWeight.w600),),
                                          SizedBox(height: size.height*0.01,),
                                          SizedBox(
                                            height: size.height*0.07,
                                            child: TextField(
                                              decoration: InputDecoration(
                                                  hintText: "Description",
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
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
                                                  border: OutlineInputBorder(borderSide: BorderSide(color: Colors.grey),borderRadius: BorderRadius.circular(8))

                                              ),
                                            ),
                                          ),
                                          SizedBox(height: size.height*0.03,),
                                          Center(
                                            child: ElevatedButton(
                                                style: ElevatedButton.styleFrom(backgroundColor: Color(0xFF5A77BC) ),
                                                onPressed: (){}, child: Text("Publish",style: GoogleFonts.openSans(color:Colors.white),)),
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
                )

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
                   hint: Text("Classes",),
                   alignment: Alignment.center,
                   padding: EdgeInsets.all(8),
                   icon: Icon(Icons.keyboard_arrow_down_sharp),
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
                       child: Text(option,overflow: TextOverflow.ellipsis,),
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
                   hint: Text("Sections",),
                   padding: EdgeInsets.all(8),
                   icon: Icon(Icons.keyboard_arrow_down_sharp),
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
                       child: Text(option,overflow: TextOverflow.ellipsis,),
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
                   hint: Text("Subjects",),
                   padding: EdgeInsets.all(8),
                   icon: Icon(Icons.keyboard_arrow_down_sharp),
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
                       child: Text(option,overflow: TextOverflow.ellipsis,),
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
