import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AllLeave extends StatefulWidget {
  const AllLeave({super.key});

  @override
  State<AllLeave> createState() => _AllLeaveState();
}

class _AllLeaveState extends State<AllLeave> with TickerProviderStateMixin  {
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
  late TabController tabBarController;
  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    tabBarController = TabController(length: 4, vsync: this);
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        backgroundColor: Colors.transparent,
        title: Text("All Leaves",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 3),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Card(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),),
                    child: Container(
                      width: size.width,
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children:[
                            Container(

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
                                        child: const CircularProgressIndicator(
                                          value: 0.5,
                                          strokeWidth: 10,
                                          color:   Color(0xFFD850B2),
                                          backgroundColor:Color(0xFF5066D8),
                                        ),
                                      ),
                                      Text("6520", style: GoogleFonts.openSans(
                                          fontSize: size.width*0.07,
                                          fontWeight: FontWeight.w400// Adjust font size as needed
                                      ),)
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.02,),
                                  Text("Total", overflow:TextOverflow.ellipsis,style:GoogleFonts.openSans(
                                      fontSize: size.width*0.05,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),)
                                ],
                              ),
                            ),
                            Column(
                              children: [
                                SizedBox(height: size.height*0.02,),
                                Container(
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Stack(
                                        alignment: Alignment.center,
                                        children: <Widget>[
                                          Container(
                                            height: size.width*0.15,
                                            width: size.width*0.15,
                                            child: const CircularProgressIndicator(
                                              value: 1,
                                              strokeWidth: 5,
                                              color:   Color(0XFF6FF87D),
                                              backgroundColor:Color(0xFF5066D8),
                                            ),
                                          ),
                                          Text("50%", style: GoogleFonts.openSans(
                                              fontSize: size.width*0.045,color: Color(0XFF6FF87D),
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),)
                                        ],
                                      ),
                                      SizedBox(width: size.width*0.02,),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("1520", overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(
                                              color:Color(0XFF6FF87D),
                                              fontSize: size.width*0.05,
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),),

                                          Text("Total Student", overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(
                                              fontSize: size.width*0.05,
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),)

                                        ],
                                      )

                                    ],
                                  ),
                                ),
                                SizedBox(height: size.height*0.03,),
                                Container(
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Stack(
                                        alignment: Alignment.center,
                                        children: <Widget>[
                                          Container(
                                            height: size.width*0.15,
                                            width: size.width*0.15,
                                            child: const CircularProgressIndicator(
                                              value: 1,
                                              strokeWidth: 5,
                                              color:   Color(0XFF00A3FF),
                                              backgroundColor:Color(0xFF5066D8),
                                            ),
                                          ),
                                          Text("20%", style: GoogleFonts.openSans(
                                              fontSize: size.width*0.045,color: Color(0XFF00A3FF),
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),)
                                        ],
                                      ),
                                      SizedBox(width: size.width*0.02,),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("520", overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(
                                              color:Color(0XFF00A3FF),
                                              fontSize: size.width*0.05,
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),),

                                          Text("Total Teacher", overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(
                                              fontSize: size.width*0.05,
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),)

                                        ],
                                      )
                                    ],
                                  ),
                                ),
                                SizedBox(height: size.height*0.03,),
                                Container(
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Stack(
                                        alignment: Alignment.center,
                                        children: <Widget>[
                                          Container(
                                            height: size.width*0.15,
                                            width: size.width*0.15,
                                            child: const CircularProgressIndicator(
                                              value: 1,
                                              strokeWidth: 5,
                                              color:   Color(0XFFC23EE3),
                                              backgroundColor:Color(0xFF5066D8),
                                            ),
                                          ),
                                          Text("50%", style: GoogleFonts.openSans(
                                              fontSize: size.width*0.045,color:Color(0XFFC23EE3),
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),)
                                        ],
                                      ),
                                      SizedBox(width: size.width*0.02,),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text("1520", overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(
                                              color:Color(0XFFC23EE3),
                                              fontSize: size.width*0.05,
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),),

                                          Text("Total Employ", overflow:TextOverflow.ellipsis,style: GoogleFonts.openSans(
                                              fontSize: size.width*0.05,
                                              fontWeight: FontWeight.w400// Adjust font size as needed
                                          ),)

                                        ],
                                      )
                                    ],
                                  ),
                                ),
                                SizedBox(height: size.height*0.02,),
                              ],
                            ),

                          ]
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.03,),
                  TabBar(
                      controller: tabBarController,
                      dividerColor: Colors.black,
                      indicatorColor: Colors.blue,
                      labelColor:Colors.blue,
                      tabs: [
                        Text("All",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                        Text("Teacher",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                        Text("Student",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                        Text("Employ",style: TextStyle(fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

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
                              ListView.builder(
                                itemCount: 8,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) {
                                  return Card(
                                    child: ListTile(
                                      leading: Icon(CupertinoIcons.profile_circled,size: size.height*0.06,color: Colors.grey,),
                                      title: Text("Abhishek",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      subtitle:  Text("Leave Take for 7 days",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
                                      trailing: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text("Class 5",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                          Container(
                                            height: size.height*0.05,
                                            padding: EdgeInsets.all(0),
                                            margin: EdgeInsets.all(0),
                                            child: TextButton(
                                              onPressed: (){},
                                              child:  Text("View details",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.blue),),
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                  );
                                },)
                            ],
                          ),
                          Column(
                            children: [
                              ListView.builder(
                                itemCount: 8,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) {
                                  return Card(
                                    child: ListTile(
                                      leading: Icon(CupertinoIcons.profile_circled,size: size.height*0.06,color: Colors.grey,),
                                      title: Text("Abhishek",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      subtitle:  Text("Leave Take for 7 days",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
                                      trailing: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text("Class 5",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                          Container(
                                            height: size.height*0.05,
                                            padding: EdgeInsets.all(0),
                                            margin: EdgeInsets.all(0),
                                            child: TextButton(
                                              onPressed: (){},
                                              child:  Text("View details",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.blue),),
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                  );
                                },)
                            ],
                          ),
                          Column(
                            children: [
                              ListView.builder(
                                itemCount: 8,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) {
                                  return Card(
                                    child: ListTile(
                                      leading: Icon(CupertinoIcons.profile_circled,size: size.height*0.06,color: Colors.grey,),
                                      title: Text("Abhishek",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      subtitle:  Text("Leave Take for 7 days",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
                                      trailing: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text("Class 5",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                          Container(
                                            height: size.height*0.05,
                                            padding: EdgeInsets.all(0),
                                            margin: EdgeInsets.all(0),
                                            child: TextButton(
                                              onPressed: (){},
                                              child:  Text("View details",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.blue),),
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                  );
                                },)
                            ],
                          ),
                          Column(
                            children: [
                              ListView.builder(
                                itemCount: 8,
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemBuilder: (context, index) {
                                  return Card(
                                    child: ListTile(
                                      leading: Icon(CupertinoIcons.profile_circled,size: size.height*0.06,color: Colors.grey,),
                                      title: Text("Abhishek",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                      subtitle:  Text("Leave Take for 7 days",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
                                      trailing: Column(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text("Class 5",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                          Container(
                                            height: size.height*0.05,
                                            padding: EdgeInsets.all(0),
                                            margin: EdgeInsets.all(0),
                                            child: TextButton(
                                              onPressed: (){},
                                              child:  Text("View details",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.blue),),
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                  );
                                },)
                            ],
                          ),

                        ],

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
