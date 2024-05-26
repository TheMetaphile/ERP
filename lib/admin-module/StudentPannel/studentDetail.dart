import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StudentDetail extends StatefulWidget {
  const StudentDetail({super.key});

  @override
  State<StudentDetail> createState() => _StudentDetailState();
}

class _StudentDetailState extends State<StudentDetail> {
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
 List<List<String>> studentDetail=[
 ["Roll No","08"],
   ["Class","V'A'"],
   ["Birth Date","12/08/2003"],
   ["Admission Date","08/05/2015"],
   ["Registration Number","1234567541"],
   ["Permanent Address","O,Bock No.2123"],
   ["Academic Year","2020-2025"],
   ["Addhar Number","2535-2325-2351"],
   ["Personal Email","ankits45987@gmail.com"],
   ["Father's Name","Ankit"],
   ["Mother's Name","Nita"],
   ["Father's Phone Number","82XXXXXXXXX"],
   ["Mother's Phone Number","82XXXXXXXXX"],
   ["Father's Occupation","Business Man"],
   ["Mother's Occupation","House Wife"],
   ["Parent Email","anstXXX@gmail.com"],
   ["Emergency Contact","78468595612"],
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
        title:   Text("Student Details",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

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
                  Card(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8),),
                    child: Container(
                      width: size.width*0.9,
                      child: TextButton(
                        onPressed: (){},
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Icon(CupertinoIcons.profile_circled,color: Colors.black,size: size.height*0.1,),
                              SizedBox(width: size.width*0.02,),
                            SizedBox(
                              width: size.width*0.35,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Abhishek ",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),
                                  Text("Class-V'A'",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),
                                  Text("Roll No-08'",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.grey,fontWeight:FontWeight.w400),),

                                ],
                              ),
                            ),
                            Expanded(child: SizedBox()),
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
                    ),
                  ),
                  SizedBox(height: size.height*0.012,),
                  Card(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          width: size.width*0.3,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(height: size.height*0.02,),
                              Stack(
                                alignment: Alignment.center,
                                children: <Widget>[
                                  Container(
                                    height: size.width*0.25,
                                    width: size.width*0.25,
                                    child: CircularProgressIndicator(
                                      value: 0.5,
                                      color: Colors.green,
                                      strokeWidth: 10,
                                      backgroundColor: Colors.red,

                                    ),
                                  ),
                                  Text("Rs.14000", style: TextStyle(
                                      fontSize: size.width*0.04,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Text("Total Fees", style: TextStyle(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),)
                            ],
                          ),
                        ),
                        Container(
                          width: size.width*0.3,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(height: size.height*0.02,),
                              Stack(
                                alignment: Alignment.center,
                                children: <Widget>[
                                  Container(
                                    height: size.width*0.25,
                                    width: size.width*0.25,
                                    child: CircularProgressIndicator(
                                      value: 1,
                                      color: Colors.green,
                                      strokeWidth: 10,
                                      backgroundColor: Colors.red,

                                    ),
                                  ),
                                  Text("Rs.7000", style: TextStyle(
                                      fontSize: size.width*0.04,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Text("Paid Fees", style: TextStyle(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),)
                            ],
                          ),
                        ),
                        Container(
                          width: size.width*0.3,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(height: size.height*0.02,),
                              Stack(
                                alignment: Alignment.center,
                                children: <Widget>[
                                  Container(
                                    height: size.width*0.25,
                                    width: size.width*0.25,
                                    child: CircularProgressIndicator(
                                      value: 0,
                                      color: Colors.green,
                                      strokeWidth: 10,
                                      backgroundColor: Colors.red,

                                    ),
                                  ),
                                  Text("Rs.7000", style: TextStyle(
                                      fontSize: size.width*0.04,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                              SizedBox(height: size.height*0.02,),
                              Text("Due Fees", style: TextStyle(
                                  fontSize: size.width*0.035,
                                  fontWeight: FontWeight.w400// Adjust font size as needed
                              ),)
                            ],
                          ),
                        ),

                      ],
                    ),
                  ),
                  SizedBox(height: size.height*0.02,),
                  Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("All Student Data", style: TextStyle(
                            fontSize: size.width*0.07,
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
                                              width:size.width*0.44,
                                              child: Text("ID",textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                                          SizedBox(
                                              width:size.width*0.4,
                                              child: Text("Class",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),


                                        ],
                                      ),
                                    ),
                                    ListView.builder(
                                      shrinkWrap: true,
                                      itemCount: studentDetail.length,
                                      physics: NeverScrollableScrollPhysics(),
                                      itemBuilder: (context, index) {
                                        return Container(
                                          height: size.height*0.05,
                                          padding: EdgeInsets.symmetric(horizontal: 5),
                                          child: Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              SizedBox(

                                                  width:size.width*0.44,
                                                  child: Text(studentDetail[index][0].toString(),textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),
                                              SizedBox(

                                                  width:size.width*0.4,
                                                  child: Text(studentDetail[index][1].toString(),textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w400),)),

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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TextButton(
                        style: TextButton.styleFrom(backgroundColor: Color(0xFFF29D9D)),
                        onPressed: (){}, child: Text("Remove Student ",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),),
                      Container(
                        width: size.width*0.3,
                        child: TextButton(
                          style: TextButton.styleFrom(backgroundColor: Color(0xFF9DCEF2)),
                          onPressed: (){}, child: Text("Save ",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w500),),),
                      )

                    ],
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
