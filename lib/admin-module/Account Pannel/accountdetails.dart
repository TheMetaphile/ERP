import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AccountDetails extends StatefulWidget {
  const AccountDetails({super.key});

  @override
  State<AccountDetails> createState() => _AccountDetailsState();
}

class _AccountDetailsState extends State<AccountDetails> with TickerProviderStateMixin {
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
  late TabController tabBarController;
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    tabBarController = TabController(length: 2, vsync: this);
  }
  String? _selectedClass;
  List<String> classOptions = [
    'Standard 12th',
    'Standard 11th',
    'Standard 10th',
    'Standard 9th',
  ];
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Accounts",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),
      ),
      body: Stack(
        children:
        [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height*0.05,),
                  TabBar(
                      controller: tabBarController,
                      dividerColor: Colors.black,
                      indicatorColor: Colors.blue,
                      labelColor:Colors.blue,
                      tabs: [
                        Text("Teacher",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.045),),
                        Text("Student",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.045),),

                      ]
                  ),
                  Container(
                      height: size.height*1,
                      width: size.width,
                      child: TabBarView(
                        controller: tabBarController,
                        children: [
                         Column(
                            children: [
                              Container(

                                height: size.height*0.06,
                                decoration: BoxDecoration(
                                  color:Color(0xFFE9F0FF),
                                ),
                                padding: EdgeInsets.symmetric(horizontal: 10),

                                child:Row(

                                  children: [
                                    SizedBox(

                                        width:size.width*0.32,
                                        child: Text("Name",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                                    SizedBox(

                                        width:size.width*0.3,
                                        child:
                                        Text("Net Pay",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                                    SizedBox(
                                        child: AutoSizeText("Designation",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
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
                                  child:ListView.builder(
                                      itemCount: 8,
                                      shrinkWrap: true,
                                      physics: NeverScrollableScrollPhysics(),
                                      itemBuilder: (context, index) {
                                        return Card(
                                          child: ListTile(
                                            leading:SizedBox(
                                                width: size.width*0.27,
                                                child: Text("Abhishek",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),

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


                            ],
                         ),
                         Column(
                           crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Card(
                                child: SizedBox(
                                  width: size.width*0.4,
                                  height: size.height*0.05,
                                  child: DropdownButton<String>(
                                    isExpanded: true,
                                    borderRadius: BorderRadius.circular(12),
                                    hint: Text("Select Class..",),
                                    padding: EdgeInsets.all(8),
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
                                        child: Text(option),
                                      );
                                    }).toList(),
                                  ),
                                ),
                              ),
                              Container(

                                height: size.height*0.06,
                                decoration: BoxDecoration(
                                  color:Color(0xFFE9F0FF),
                                ),
                                padding: EdgeInsets.symmetric(horizontal: 10),

                                child:Row(
                                  children: [
                                    SizedBox(

                                        width:size.width*0.3,
                                        child: Text("Name",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                                    SizedBox(

                                        width:size.width*0.4,
                                        child:
                                        Text("Total Fees",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
                                    SizedBox(


                                        child: Text("Pending",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w600),)),
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
                                  child:ListView.builder(
                                    itemCount: 8,
                                    shrinkWrap: true,
                                    physics: NeverScrollableScrollPhysics(),
                                    itemBuilder: (context, index) {
                                      return Card(
                                        child: ListTile(
                                          leading:SizedBox(
                                              width: size.width*0.27,
                                              child: Text("Abhishek",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),

                                          title: Text("Rs.1800",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.green,fontWeight:FontWeight.w400),),
                                          trailing: Text("Rs.800",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.red,fontWeight:FontWeight.w400),),
                                        ),
                                      );
                                    },),

                              ),
                            ],
                         ),
                        ],

                      )
                  ),

                ],
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
            child: SizedBox(
              height: size.height * 2,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height ,
          ),
        ],
      ),
    );
  }
}
