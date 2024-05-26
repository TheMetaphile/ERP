import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/StudentPannel/studentDetail.dart';

class AllStudents extends StatefulWidget {
  const AllStudents({super.key});

  @override
  State<AllStudents> createState() => _AllStudentsState();
}

class _AllStudentsState extends State<AllStudents> {
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

  List<Map<String, String>> classDetails=[
    {
      "class":"Pre-Nursery",
      "girls":"16",
      "boys":"12",
      "total":"28"
    },
    {
      "class":"Nursery",
      "girls":"26",
      "boys":"12",
      "total":"38"
    },
    {
      "class":"KG",
      "girls":"16",
      "boys":"12",
      "total":"28"
    },
    {
      "class":"LKG",
      "girls":"10",
      "boys":"12",
      "total":"22"
    }
  ];
  List<Map<String, String>> allStudentData=[
    {
      "id":"8235",
      "name":"Ankit",
      "class":"VII",

    },
    {
      "id":"8231",
      "name":"Bhanu",
      "class":"VI",
    },
    {
      "id":"82351",
      "name":"Ankit",
      "class":"VII",
    },
    {
      "id":"8215",
      "name":"Manish",
      "class":"XII",
    },
    {
      "id":"8239",
      "name":"Ashish",
      "class":"VII",

    },
    {
      "id":"8235",
      "name":"Ankit",
      "class":"VII",

    },
    {
      "id":"8231",
      "name":"Bhanu",
      "class":"VI",
    },
    {
      "id":"82351",
      "name":"Ankit",
      "class":"VII",
    },
    {
      "id":"8215",
      "name":"Manish",
      "class":"XII",
    },
    {
      "id":"8239",
      "name":"Ashish",
      "class":"VII",

    },
  ];
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
         leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        title:   Text("All Students",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
             padding: EdgeInsets.symmetric(horizontal: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height*0.03,),
                  Card(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8),),
                   child: Container(
                     width: size.width*0.9,
                    child: TextButton(
                      onPressed: (){},
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Image.asset("assets/Images/Admin Home/Students.png",height: size.height*0.08,fit: BoxFit.contain,),
                        SizedBox(width: size.width*0.1,),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text("1020",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w500),),
                              Text("Total Student",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.black,fontWeight:FontWeight.w600),),

                            ],
                      )
                    ],
                  ),
                          ),
                        ),
                      ),
                  SizedBox(height: size.height*0.02,),
                 Row(
                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                   children: [
                     Card(
                       child:Container(
                         width: size.width*0.44,

                         child: Column(
                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
                           children: [
                             SizedBox(height: size.height*0.02,),
                             Stack(
                               alignment: Alignment.center,
                               children: <Widget>[
                                 Container(
                                   height: size.width*0.3,
                                   width: size.width*0.3,
                                   child: CircularProgressIndicator(
                                     value: 0.5,
                                     strokeWidth: 10,
                                     color: Colors.green,
                                     backgroundColor: Colors.grey,

                                   ),
                                 ),
                                 Text("50%", style: TextStyle(
                                     fontSize: size.width*0.1,
                                     fontWeight: FontWeight.w400// Adjust font size as needed
                                 ),)
                               ],
                             ),
                             SizedBox(height: size.height*0.02,),
                             Text("Girls", style: TextStyle(
                                 fontSize: size.width*0.07,
                                 fontWeight: FontWeight.w400// Adjust font size as needed
                             ),)
                           ],
                         ),
                       ),
                     ),
                     Card(
                       child:Container(
                         width: size.width*0.44,

                         child: Column(
                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
                           children: [
                             SizedBox(height: size.height*0.02,),
                             Stack(
                               alignment: Alignment.center,
                               children: <Widget>[
                                 Container(
                                   height: size.width*0.3,
                                   width: size.width*0.3,
                                   child: CircularProgressIndicator(
                                     value: 0.5,
                                     strokeWidth: 10,
                                    color: Colors.blueAccent,
                                     backgroundColor: Colors.grey,

                                   ),
                                 ),
                                 Text("50%", style: TextStyle(
                                     fontSize: size.width*0.1,
                                     fontWeight: FontWeight.w400// Adjust font size as needed
                                 ),)
                               ],
                             ),
                             SizedBox(height: size.height*0.02,),
                             Text("Boys", style: TextStyle(
                                 fontSize: size.width*0.07,
                                 fontWeight: FontWeight.w400// Adjust font size as needed
                             ),)
                           ],
                         ),
                       ),
                     )

                   ],
                 ),
                  SizedBox(height: size.height*0.02,),
                  Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Class Details", style: TextStyle(
                            fontSize: size.width*0.05,
                            fontWeight: FontWeight.w400// Adjust font size as needed
                        ),),
                        SizedBox(height: size.height*0.01,),
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 8),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Card(
                                margin: EdgeInsets.all(0),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                child: Column(
                                  children: [
                                    Container(
                                      height: size.height*0.05,

                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        color:Color(0xFFE9F0FF),
                                      ),
                                      padding: EdgeInsets.symmetric(horizontal: 5),
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          SizedBox(

                                              width:size.width*0.2,
                                              child: Text("Classes",textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                          SizedBox(

                                              width:size.width*0.2,
                                              child: Text("Girls",textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                          SizedBox(

                                              width:size.width*0.2,
                                              child: Text("Boys",textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                          SizedBox(

                                              width:size.width*0.2,
                                              child: Text("Total",textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                        ],
                                      ),
                                    ),
                                    ListView.builder(
                                      shrinkWrap: true,
                                      itemCount: classDetails.length,
                                      physics: NeverScrollableScrollPhysics(),
                                      itemBuilder: (context, index) {
                                        final particularClassDetail=classDetails[index];
                                        return Container(
                                          height: size.height*0.05,
                                          padding: EdgeInsets.symmetric(horizontal: 5),
                                          child: Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              SizedBox(

                                                  width:size.width*0.2,
                                                  child: Text(particularClassDetail["class"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                              SizedBox(

                                                  width:size.width*0.2,
                                                  child: Text(particularClassDetail["girls"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                              SizedBox(

                                                  width:size.width*0.2,
                                                  child: Text(particularClassDetail["boys"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                              SizedBox(

                                                  width:size.width*0.2,
                                                  child: Text(particularClassDetail["total"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                            ],
                                          ),
                                        );

                                      },)
                                  ],
                                ),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                  SizedBox(height: size.height*0.02,),
                  Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("All Student Data", style: TextStyle(
                            fontSize: size.width*0.05,
                            fontWeight: FontWeight.w400// Adjust font size as needed
                        ),),
                        SizedBox(height: size.height*0.01,),
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 8),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Card(
                                margin: EdgeInsets.all(0),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                child: Column(
                                  children: [
                                    Container(

                                      height: size.height*0.05,
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(8),
                                        color:Color(0xFFE9F0FF),
                                      ),
                                      padding: EdgeInsets.symmetric(horizontal: 5),

                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          SizedBox(
                                              width:size.width*0.2,
                                              child: Text("ID",textAlign:TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),)),
                                          SizedBox(
                                              width:size.width*0.2,
                                              child: Text("Name",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),)),
                                          SizedBox(
                                              width:size.width*0.2,
                                              child: Text("Class",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),)),


                                        ],
                                      ),
                                    ),
                                    ListView.builder(
                                      shrinkWrap: true,
                                      itemCount: allStudentData.length,
                                      physics: NeverScrollableScrollPhysics(),
                                      itemBuilder: (context, index) {
                                        final particularStudentDetail=allStudentData[index];
                                        return Container(
                                          height: size.height*0.05,
                                          child: TextButton(
                                            onPressed: () {
                                              Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDetail(),));
                                            },
                                            child: Row(
                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                              children: [
                                                SizedBox(

                                                    width:size.width*0.2,
                                                    child: Text(particularStudentDetail["id"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                                SizedBox(

                                                    width:size.width*0.2,
                                                    child: Text(particularStudentDetail["name"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                                SizedBox(

                                                    width:size.width*0.2,
                                                    child: Text(particularStudentDetail["class"]!,textAlign: TextAlign.center,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),

                                              ],
                                            ),
                                          ),
                                        );

                                      },)
                                  ],
                                ),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                  SizedBox(height: size.height*0.02,),
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
            height: size.height * 0.15,
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
