import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../utils/utils.dart';

class teacherLeaveHistory extends StatefulWidget {
  const teacherLeaveHistory({super.key});

  @override
  State<teacherLeaveHistory> createState() => _teacherLeaveHistoryState();
}

class _teacherLeaveHistoryState extends State<teacherLeaveHistory> {
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

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Leave History",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          Center(
            child: Column(
              children: [
                SizedBox(height: size.height*0.02,),
                Card(
                  elevation: 5,
                  shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),

                  child:  Container(
                    width: size.width*1,
                    height: size.height*0.11,
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: 10,
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (context, index) {
                        return    Container(
                          margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02,top: size.height*0.008 ),
                          child: Column(
                            children: [
                              Stack(
                                alignment: Alignment.center,
                                children: [
                                  Container(
                                    width: size.width*0.15,

                                    height: size.width*0.15,
                                    child: CircularProgressIndicator(
                                        value: 0,
                                        strokeWidth: 3,
                                        backgroundColor: Color(0xFFCFCDCD)

                                    ),
                                  ),
                                  Text(
                                    '2', // Your text here
                                    style: TextStyle(
                                        fontSize: size.width*0.035,
                                        fontWeight: FontWeight.w400// Adjust font size as needed
                                    ),
                                  ),
                                ],
                              ),
                              Text("Casual Leaves",style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),)
                            ],
                          ),
                        );
                      },),
                  )
                ),
                SizedBox(height: size.height*0.02,),
                Container(
                  height: size.height*0.65,
                  child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: 10,
                      itemBuilder: (context,index){
                        return Column(
                          children: [
                            Card(
                              elevation: 5,
                              shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),

                              child: Container(
                                height: size.height*0.15,
                                width: size.width*0.9,

                                child: Padding(
                                  padding: EdgeInsets.only(left: size.height*0.01,right: size.height*0.01),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      SizedBox(height: size.height*0.01,),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text("Apr 02 2024",style: TextStyle(fontSize:size.width*0.035,color: Colors.black,fontWeight: FontWeight.bold),),
                                          Card(
                                            color: Colors.orange[100],
                                            child: Container(
                                                width: size.width*0.2,
                                                child: Text("Pending",textAlign: TextAlign.center,style: TextStyle(fontSize:size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),)),
                                          )
                                        ],
                                      ),
                                      SizedBox(height: size.height*0.01,),
                                      Text("I am feeling unwell and belive it's best to take a day off to rest and recove.",style: TextStyle(color: Colors.black,fontSize: size.width*0.03),),
                                      Text("Annual Leaves",style: TextStyle(color: Colors.grey,fontSize: size.width*0.03),),


                                    ],
                                  ),
                                ),

                              ),
                            ),
                            SizedBox(height: size.height*0.015,),
                          ],
                        );

                      }),
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
              height: size.height * 1,
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
