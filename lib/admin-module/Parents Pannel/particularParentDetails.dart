import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ParticularParentsDetails extends StatefulWidget {
  const ParticularParentsDetails({super.key});

  @override
  State<ParticularParentsDetails> createState() => _ParticularParentsDetailsState();
}

class _ParticularParentsDetailsState extends State<ParticularParentsDetails> {

  @override
  void initState() {
    super.initState();

  }

  List<List<String>> fatherDetails=[
    ["Name","Ankit Sharma"],
    ["Phone No","(+91) 9368563585"],
    ["DOB","25-05-2003"],
    ["Occupation","Software Engineer"],
    ["Email","ankits45@gmail.com"],
    ["Address","Sector 62, Noida"],
    ["ChildName","Abhishek"],
    ["Religion","Hindu"],
  ];
  List<List<String>> motherDetails=[
    ["Name","Akansha"],
    ["Phone No","(+91) 9368563585"],
    ["DOB","25-05-2003"],
    ["Occupation","Software Engineer"],
    ["Email","ankits45@gmail.com"],
    ["Address","Sector 62, Noida"],
    ["ChildName","Abhishek"],
    ["Religion","Hindu"],
  ];
  List<List<String>> guardianDetails=[
    ["Name","Aashish"],
    ["Phone No","(+91) 9368563585"],
    ["DOB","25-05-2003"],
    ["Occupation","Software Engineer"],
    ["Email","ankits45@gmail.com"],
    ["Address","Sector 62, Noida"],
    ["ChildName","Abhishek"],
    ["Religion","Hindu"],
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
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:   Text("Parent Details",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body:secondStackLayer(size,context),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(

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
            child:  Column(
              children: [
                Card(
                  margin: EdgeInsets.all(8),
                  // padding: EdgeInsets.symmetric(horizontal: 8),
                  // decoration: BoxDecoration(
                  //   borderRadius: BorderRadius.circular(8),
                  //   border: Border.all(color: Colors.black)
                  // ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Father's Details ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                            TextButton(
                                style: TextButton.styleFrom(side: BorderSide(width: 1,color: Colors.grey),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                                onPressed: (){},
                                child: Row(
                                  children: [
                                    Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                    Icon(Icons.edit,color: Colors.black,),
                                  ],
                                )
                            )
                          ],
                        ),
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
                      SizedBox(width: size.width*0.02,),
                      Center(child: Text(fatherDetails[0][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),)),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: fatherDetails.length,
                        itemBuilder: (context, index) {
                          return Card(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            child: Container(
                              padding: EdgeInsets.symmetric(horizontal: 5),
                              height: size.height*0.05,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(fatherDetails[index][0],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                  Text(fatherDetails[index][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w500),),
                                ],

                              ),
                            ),
                          );
                        },),




                    ],
                  ),
                ),
                Card(
                  margin: EdgeInsets.all(8),
                  // padding: EdgeInsets.symmetric(horizontal: 8),
                  // decoration: BoxDecoration(
                  //   borderRadius: BorderRadius.circular(8),
                  //   border: Border.all(color: Colors.black)
                  // ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Mother's Details ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                            TextButton(
                                style: TextButton.styleFrom(side: BorderSide(width: 1,color: Colors.grey),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                                onPressed: (){},
                                child: Row(
                                  children: [
                                    Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                    Icon(Icons.edit,color: Colors.black,),
                                  ],
                                )
                            )
                          ],
                        ),
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
                      SizedBox(width: size.width*0.02,),
                      Center(child: Text(motherDetails[0][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),)),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: motherDetails.length,
                        itemBuilder: (context, index) {
                          return Card(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            child: Container(
                              padding: EdgeInsets.symmetric(horizontal: 5),
                              height: size.height*0.05,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(motherDetails[index][0],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                  Text(motherDetails[index][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w500),),
                                ],

                              ),
                            ),
                          );
                        },),




                    ],
                  ),
                ),
                Card(
                  margin: EdgeInsets.all(8),
                  // padding: EdgeInsets.symmetric(horizontal: 8),
                  // decoration: BoxDecoration(
                  //   borderRadius: BorderRadius.circular(8),
                  //   border: Border.all(color: Colors.black)
                  // ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Guardian's Details ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                            TextButton(
                                style: TextButton.styleFrom(side: BorderSide(width: 1,color: Colors.grey),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                                onPressed: (){},
                                child: Row(
                                  children: [
                                    Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                    Icon(Icons.edit,color: Colors.black,),
                                  ],
                                )
                            )
                          ],
                        ),
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
                      SizedBox(width: size.width*0.02,),
                      Center(child: Text(guardianDetails[0][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),)),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: guardianDetails.length,
                        itemBuilder: (context, index) {
                          return Card(
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            child: Container(
                              padding: EdgeInsets.symmetric(horizontal: 5),
                              height: size.height*0.05,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(guardianDetails[index][0],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
                                  Text(guardianDetails[index][1],style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w500),),
                                ],

                              ),
                            ),
                          );
                        },),




                    ],
                  ),
                ),
              ],
            ),
          ),

        ],
      ),
    );
  }
}
