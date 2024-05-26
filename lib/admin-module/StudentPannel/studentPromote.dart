import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentPromote extends StatefulWidget {
  const StudentPromote({super.key});

  @override
  State<StudentPromote> createState() => _StudentPromoteState();
}

class _StudentPromoteState extends State<StudentPromote> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();


  @override
  void initState() {
    super.initState();

  }
  TextEditingController firstName=TextEditingController();
  TextEditingController lastName=TextEditingController();
  TextEditingController currentSession=TextEditingController();
  TextEditingController promoteSession=TextEditingController();
  TextEditingController promoteFromClass=TextEditingController();
  TextEditingController promotetoClass=TextEditingController();
  String? _selectedpromoteFromSessionClass;
  List<String> promoteFromSessionClass = [
    'Standard 12th',
    'Standard 11th',
    'Standard 10th',
    'Standard 9th',
  ];
  String? _selectedpromoteToSessionClass;
  List<String> promoteToSessionClass = [
    'Standard 12th',
    'Standard 11th',
    'Standard 10th',
    'Standard 9th',
  ];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:   Text("Fill Student Detail",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),

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
            height: size.height * 0.08,
          ),
          Card(
            margin: EdgeInsets.all(0),
            child: Container(
              width: size.width,
            
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("First Name *",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      SizedBox(height: size.height*0.01,),
                      Container(
                        width: size.width*0.95,
                        height: size.height*0.055,
                        child: TextField(
                          maxLines: 1,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                          ),
                          controller: firstName,
                        ),

                      )
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Last Name *",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      SizedBox(height: size.height*0.01,),
                      Container(
                        width: size.width*0.95,
                        height: size.height*0.055,
                        child: TextField(
                          maxLines: 1,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                          ),
                          controller: lastName,
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Current Session*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      SizedBox(height: size.height*0.01,),
                      Container(
                        width: size.width*0.95,
                        height: size.height*0.055,
                        child: TextField(
                          maxLines: 1,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                          ),
                          controller: currentSession,
                        ),

                      )
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Promote Session",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      SizedBox(height: size.height*0.01,),
                      Container(
                        width: size.width*0.95,
                        height: size.height*0.055,
                        child: TextField(
                          maxLines: 1,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                          ),
                          controller: promoteSession,
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Promote From Session*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      SizedBox(height: size.height*0.01,),
                      Container(
                        width: size.width*0.95,
                        height: size.height*0.055,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.grey,width: 1)
                        ),
                        child: DropdownButton<String>(
                          isExpanded: true,
                          borderRadius: BorderRadius.circular(12),
                          hint: Text("Select the Classes..",),

                          padding: EdgeInsets.all(8),
                          icon: Icon(Icons.keyboard_arrow_down_sharp),
                          underline: Container(),
                          value: _selectedpromoteFromSessionClass,
                          onChanged: (newValue) {
                            setState(() {
                              _selectedpromoteFromSessionClass = newValue!;
                            });
                          },
                          items: promoteFromSessionClass.map((String option) {
                            return DropdownMenuItem<String>(
                              value: option,
                              child: Text(option),
                            );
                          }).toList(),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Promote To Session*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                      SizedBox(height: size.height*0.01,),
                      Container(
                        width: size.width*0.95,
                        height: size.height*0.055,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.grey,width: 1)
                        ),
                        child: DropdownButton<String>(
                          isExpanded: true,
                          borderRadius: BorderRadius.circular(12),
                          hint: Text("Select the Classes..",),

                          padding: EdgeInsets.all(8),
                          icon: Icon(Icons.keyboard_arrow_down_sharp),
                          underline: Container(),
                          value: _selectedpromoteToSessionClass,
                          onChanged: (newValue) {
                            setState(() {
                              _selectedpromoteToSessionClass = newValue!;
                            });
                          },
                          items: promoteToSessionClass.map((String option) {
                            return DropdownMenuItem<String>(
                              value: option,
                              child: Text(option),
                            );
                          }).toList(),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height*0.02,),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Container(
                        width: size.width*0.95,
                        child: ElevatedButton(
                            style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF82F86F),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                            onPressed: (){},
                            child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                      ),
                      Container(
                        width: size.width*0.95,
                        child: ElevatedButton(
                            style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6F8DF8),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                            onPressed: (){},
                            child: Text("Promote",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                      ),


                    ],
                  ),
                  SizedBox(height: size.height*0.04,),
                ],
              ),
            ),
          ),

        ],
      ),
    );
  }
}
