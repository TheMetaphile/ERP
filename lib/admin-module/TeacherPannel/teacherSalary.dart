import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TeacherSalary extends StatefulWidget {
  const TeacherSalary({super.key});

  @override
  State<TeacherSalary> createState() => _TeacherSalaryState();
}

class _TeacherSalaryState extends State<TeacherSalary> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
  String deviceTokenToSendPushNotification="";
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
  List<Map<String, String>> cardType=[
    {
      "type":"Total Teacher",
      "number":"300"
    },
    {
      "type":"Total Working Hrs",
      "number":"490 Hrs"
    },
    {
      "type":"Payable Amount",
      "number":"6 Lakh"
    },
    {
      "type":"Deduction Amount",
      "number":"50 Hundred"
    }
  ];
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Teacher Salary",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),
      ),
      body: Stack(
        children:
        [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Padding(
              padding:  EdgeInsets.symmetric(horizontal: 8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height*0.05,),
                  Container(
                    child: GridView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: cardType.length,
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount( childAspectRatio: 1.5,crossAxisCount: 2,crossAxisSpacing: size.width*0.02),
                      itemBuilder: (context, index) {
                        final cardCategory=cardType[index];
                        return  Card(
                          child: Container(
                            child: TextButton(
                              onPressed: (){},
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(cardCategory["type"]!,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),
                                  Text(cardCategory["number"]!,style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.black,fontWeight:FontWeight.w600),),

                                ],
                              ),
                            ),
                          ),
                        );
                      },),
                  ),
                  SizedBox(height: size.height*0.01,),
                  Container(

                    height: size.height*0.08,
                    decoration: BoxDecoration(
                      color:Color(0xFFE9F0FF),
                    ),
                    padding: EdgeInsets.symmetric(horizontal: 10),

                    child:Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(

                            width:size.width*0.2,
                            child: Text("Name",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                        SizedBox(

                            width:size.width*0.2,
                            child:
                            Text("Net Pay",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                        SizedBox(

                            width:size.width*0.3,
                            child: Text("Designation",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                      ],
                    ),
                  ),
                  Card(
                      color: Colors.white,
                      margin: const EdgeInsets.all(0),
                      shape: const OutlineInputBorder(
                        borderSide: BorderSide(
                            color: Colors.white
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child:ListView.builder(
                          itemCount: 20,
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          itemBuilder: (context, index) {
                            return Card(
                              child: ListTile(
                                leading:Text("Abhishek",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),),
                              
                                title: Text("Rs.1800",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.green,fontWeight:FontWeight.w400),),
                                trailing: Card(
                                  color: Colors.green,
                              
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Text("Paid",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.white,fontWeight:FontWeight.w400),),
                                  ),
                              
                                ),
                              ),
                            );
                          },),
                      )

                  ),

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
              height: size.height * 2,
              width: size.width,

            ),
          ),

        ],
      ),
    );
  }
}
