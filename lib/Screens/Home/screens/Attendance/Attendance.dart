import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';

import 'Attendance_body.dart';

class Attendance extends StatefulWidget {
  const Attendance({super.key});

  @override
  State<Attendance> createState() => _AttendanceState();
}

class _AttendanceState extends State<Attendance> {
  String currTab = "Attendance";
  double sliderPos = 0;
  double sliderWidth=110;
  int index=0;
  List<Widget> tabs=[
    const AttendanceBody(),
    const AttendanceBody(),
    const AttendanceBody(),

  ];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
      children: [
        Scaffold(
          backgroundColor: const Color.fromRGBO(103,135,214, 1),
          appBar: AppBar(
            elevation: 0,
            backgroundColor: Colors.transparent,
            titleSpacing: 0,
            leading: IconButton(onPressed: (){
              Navigator.pop(context);
            }, icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.white,)),
            title: _tabs(size),
          ),
        ),
        Column(
          children: [
            SizedBox(
              height: size.height*0.1,
            ),
            Card(
              color: Colors.white,
              margin: const EdgeInsets.all(0),
              shape: const OutlineInputBorder(
                borderRadius: BorderRadius.only(
                  topRight: Radius.circular(30),
                  topLeft: Radius.circular(30)
                )
              ),
              child: SizedBox(
                height: size.height*0.9,
                width: size.width,
                child: Column(
                  children: [
                    tabs[index],
                  ],
                ),
              ),
            ),
          ],
        )
      ]
    );
  }


  Widget _tabs(Size size){
    return Container(
      height: size.height*0.04,
      width: size.width*0.8,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(50),
        border: Border.all(color: Colors.white,width: 2),
        color:  const Color.fromRGBO(103,135,214, 1),
      ),
      child: Stack(
        alignment: Alignment.topCenter,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: size.width*0.03,
              ),
              InkWell(
                onTap: (){
                  setState(() {
                    sliderPos = 0;
                    index=0;
                    currTab = "Attendance";
                    sliderWidth=size.width*0.26;
                  });
                },
                child: SizedBox(
                  width: size.width*0.22,
                    height: size.height*0.05,
                  child: const Center(child: AutoSizeText("Attendance",style: TextStyle(fontSize: 17,fontWeight: FontWeight.w600,color: Colors.white),textAlign: TextAlign.center,))
                ),
              ),
              SizedBox(
                width: size.width*0.02,
              ),
              InkWell(
                onTap: (){
                  setState(() {
                    index=1;
                    sliderPos=size.width*0.26;
                    sliderWidth=size.width*0.18;
                    currTab="Holiday";
                  });
                },
                child: SizedBox(
                  width: size.width*0.18,
                    height: size.height*0.05,
                  child: const Center(child: AutoSizeText("Holiday",style: TextStyle(fontSize: 17,fontWeight: FontWeight.w600,color: Colors.white),textAlign: TextAlign.center,))

                ),
              ),
              SizedBox(
                width: size.width*0.01,
              ),
              InkWell(
                onTap: (){
                  setState(() {
                    index=2;
                    sliderPos=size.width*0.45;
                    sliderWidth=size.width*0.34;
                    currTab="Bus attendance";
                  });
                },
                child: SizedBox(
                  width: size.width*0.3,
                    height: size.height*0.05,
                  child: const Center(child: AutoSizeText("Bus Attendance",style: TextStyle(fontSize: 17,fontWeight: FontWeight.w600,color: Colors.white),textAlign: TextAlign.center,))
                ),
              ),
            ],
          ),
          _slider(size)
        ],
      ),
    );
  }
  Widget _slider(Size size){
    return AnimatedPositioned(
        duration: const Duration(milliseconds: 400),
        left: sliderPos,
        top: 0,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 400),
          height: size.height*0.04,
          width: sliderWidth,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(50),
            border: Border.all(color: Colors.white,width: 2),
            color: Colors.white
          ),
          child: Center(
              child: AutoSizeText(currTab,style: const TextStyle(fontSize: 17,fontWeight: FontWeight.w600,color: Color.fromRGBO(103,135,214, 1),),textAlign: TextAlign.center,)),
        ),
    );
  }
}
