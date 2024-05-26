import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:untitled/teacher-module/applyForLeave.dart';
import 'package:untitled/teacher-module/teacherLeaveHistory.dart';

import '../utils/utils.dart';

class TeacherLeave extends StatefulWidget {
  const TeacherLeave({super.key});

  @override
  State<TeacherLeave> createState() => _TeacherLeaveState();
}

class _TeacherLeaveState extends State<TeacherLeave> {

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
  final leaves=["Casual Leaves","Medical Leaves","Annual Leaves","Unpaid Leaves"];
  @override
  Widget build(BuildContext context) {
      Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        backgroundColor: Colors.transparent,
        title: Text("My Leave",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Center(
              child: Column(
                children: [
                  SizedBox(height: size.height*0.02,),
                  Card(
                    elevation: 5,
                    shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),

                    child: Container(
                      width: size.width*0.9,
                      padding: EdgeInsets.all(15.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Stack(
                            alignment: Alignment.center,
                            children: <Widget>[
                              Container(
                                height: size.width*0.34,
                                width: size.width*0.34,
                                child: CircularProgressIndicator(
                                    value: 0,
                                    strokeWidth: 10,
                                    backgroundColor: Color(0xFFCDDCFF)

                                ),
                              ),
                            Column(
                              children: [
                                Text("05", style: TextStyle(
                                    fontSize: size.width*0.05,
                                    fontWeight: FontWeight.bold// Adjust font size as needed
                                ),),
                                Text(
                                  'Leave Balance', // Your text here
                                  style: TextStyle(
                                      fontSize: size.width*0.04,
                                      color: Colors.grey,
                                      fontWeight: FontWeight.w400// Adjust font size as needed
                                  ),
                                ),
                              ],
                            )
                            ],
                          ),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            height: size.height*0.045,

                            child: TextButton(
                                onPressed: () {
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => applyForLeave(),));
                                },

                                child: Text("Click to Apply for Leave",textAlign: TextAlign.center,style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),)),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                children: [
                                  Text("10",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w600,fontSize: size.width*0.055),),
                                  Text("Leave Used",style: TextStyle(color: Colors.grey,fontSize: size.width*0.04),),
                                  ],
                              ),
                              Column(
                                children: [
                                  Text("20",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w600,fontSize: size.width*0.055),),
                                  Text("Total Leave",style: TextStyle(color: Colors.grey,fontSize: size.height*0.02),),
                                ],
                              )
                            ],
                          ),
                          SizedBox(height: size.height*0.01,),
                        Container(
                          width: size.width*1,
                          height: size.height*0.12,
                          child: ListView.builder(
                            shrinkWrap: true,
                            itemCount: leaves.length,
                            scrollDirection: Axis.horizontal,
                            padding: EdgeInsets.only(top: 5.0),
                            itemBuilder: (context, index) {
                            return    Container(
                              margin: EdgeInsets.only(left: size.width*0.02,right: size.width*0.02),

                              child: Column(
                                children: [
                                  Stack(
                                    alignment: Alignment.center,
                                    children: <Widget>[
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
                                  SizedBox(height: size.height*0.01,),
                                  Text(leaves[index],style: TextStyle(color: Colors.grey,fontSize: size.width*0.035),)
                                ],
                              ),
                            );
                          },),
                        )

                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.02,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [

                      Container(
                        height: size.height*0.06,
                        width: size.width*0.4,
                        decoration: BoxDecoration(
                          color: Color(0xFF5A77BC),
                          borderRadius: BorderRadius.circular(8),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(1),
                              spreadRadius: 0,
                              blurRadius: 5,
                              offset: Offset(0, 6), // Adjust the vertical offset as needed
                            ),
                          ],
                        ),
                        child: TextButton(
                          style: TextButton.styleFrom(shape: RoundedRectangleBorder()),
                          onPressed: (){},
                          child: Text("Approvals",style: TextStyle(fontSize: size.width*0.04,
                            color: Colors.white,),),
                        ),
                      ),
                      Container(
                        height: size.height*0.06,
                        width: size.width*0.4,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(
                              color: Colors.grey,width: 2),
                          borderRadius: BorderRadius.circular(8),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(1),
                              spreadRadius: 0,
                              blurRadius: 5,
                              offset: Offset(0, 6), // Adjust the vertical offset as needed
                            ),
                          ],
                        ),
                        child: TextButton(
                          style: TextButton.styleFrom(shape: RoundedRectangleBorder()),
                          onPressed: (){
                            Navigator.push(context, MaterialPageRoute(builder: (context) => teacherLeaveHistory(),));
                          },
                          child: Text("Leaves History",style: TextStyle(fontSize: size.width*0.04,
                            color:Colors.grey,),),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height*0.01,),
                  Divider(color: Colors.grey,indent: 20,endIndent: 20,),
                  ListView.builder(
                    physics: NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                      itemCount: 5,
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

                  })
                ],
              ),
            ),
          )
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
