import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class AddNewStudent extends StatefulWidget {
  const AddNewStudent({super.key});

  @override
  State<AddNewStudent> createState() => _AddNewStudentState();
}

class _AddNewStudentState extends State<AddNewStudent> {
  ScrollController scrollController1 = ScrollController();
  // ScrollController scrollController2 = ScrollController();
  var _flag1 = false;
  var _flag2 = false;

  // void listener1() {
  //   if (_flag2) return;
  //   _flag1 = true;
  //   scrollController2.jumpTo(scrollController1.offset);
  //   _flag1 = false;
  // }
  //
  // void listener2() {
  //   if (_flag1) return;
  //   _flag2 = true;
  //   scrollController1.jumpTo(scrollController2.offset);
  //   _flag2=false;
  // }
  @override
  void initState() {
    super.initState();

  }


   TextEditingController firstName=TextEditingController();
   TextEditingController lastName=TextEditingController();
   TextEditingController dob=TextEditingController();
   TextEditingController address=TextEditingController();
   TextEditingController phoneNumber=TextEditingController();
   TextEditingController email=TextEditingController();
   TextEditingController fatherName=TextEditingController();
   TextEditingController motherName=TextEditingController();
   TextEditingController fatherOcupation=TextEditingController();
   TextEditingController motherOcupation=TextEditingController();
   TextEditingController fatherPhNo=TextEditingController();
   TextEditingController motherPhNo=TextEditingController();
   TextEditingController clas=TextEditingController();
   TextEditingController section=TextEditingController();
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
      body: secondStackLayer(size,context),
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
            child:  Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: size.height*0.02,),
                    Padding(
                      padding:  EdgeInsets.only(left: size.width*0.25),
                      child: Text("Photo*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w600),),
                    ),
                    Center(
                      child: TextButton(
                        onPressed: () {  },
                        child: Stack(
                          children: [
                            Icon(CupertinoIcons.profile_circled,size: size.height*0.15,color: Colors.grey[500],),
                            Positioned(
                                right: 0,
                                bottom: size.width*0.008,
                                left: size.width*0.12,
                                child: Icon(CupertinoIcons.plus_circle,color: Colors.blueAccent,size: size.width*0.1,))
                          ],
                        ),
                      ),
                    ),
                    Center(
                      child: Container(
                        width: size.width*0.35,
                        child: ElevatedButton(
                            style: ElevatedButton.styleFrom(shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                            onPressed: (){},
                            child: Text("Choose File",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                      ),
                    ),
                    Center(
                      child: Container(
                        width: size.width*0.35,
                        child: ElevatedButton(
                            style: ElevatedButton.styleFrom(elevation: 0,backgroundColor: Colors.red,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                            onPressed: (){},
                            child: Text("Remove",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.white),)),
                      ),
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("First Name *",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
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
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Last Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
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
                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Date of Birth*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: dob,
                              ),
                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Address*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: address,
                              ),

                            )
                          ],
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Phone Number*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: phoneNumber,
                              ),
                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Email*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: email,
                              ),

                            )
                          ],
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Father's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: fatherName,
                              ),
                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Mother's Name*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: motherName,
                              ),

                            )
                          ],
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Father's Occup*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: fatherOcupation,
                              ),
                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Mother's Occup*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: motherOcupation,
                              ),

                            )
                          ],
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Father's Ph No.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: fatherPhNo,
                              ),
                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Mother's Ph No.*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: motherPhNo,
                              ),

                            )
                          ],
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Class*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: clas,
                              ),
                            )
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Section*",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              width: size.width*0.4,
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),                                     border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: section,
                              ),

                            )
                          ],
                        ),

                      ],
                    ),
                    SizedBox(height: size.height*0.02,),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                      width: size.width*0.3,
                      child: ElevatedButton(
                          style: ElevatedButton.styleFrom(shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                          onPressed: (){},
                          child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                    ),
                    Container(
                      width: size.width*0.3,
                      child: ElevatedButton(
                          style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6F8DF8),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                          onPressed: (){},
                          child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),)),
                    ),

                  ],
                ),

              ],
            ),
          ),

        ],
      ),
    );
  }
}
