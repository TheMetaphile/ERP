import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'Attendance_body.dart';

class Attendance extends StatefulWidget {
  const Attendance({super.key});

  @override
  State<Attendance> createState() => _AttendanceState();
}

class _AttendanceState extends State<Attendance> with SingleTickerProviderStateMixin {
  late TabController _tabController;
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
  void initState() {
    _tabController = TabController(length: 3, vsync: this);
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
      children: [
        Container(
          height: size.height*0.126,
          width: size.width,
          color: const Color.fromRGBO(103,135,214, 1),
          child: Image.asset("assets/Navigation/changePassword/starpattern.png"),
        ),
        Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            elevation: 0,
            backgroundColor: Colors.transparent,
            titleSpacing: 0,
            leading: IconButton(onPressed: (){
              Navigator.pop(context);
            }, icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.white,)),
            title: _tabs(size),
          ),
          body: SingleChildScrollView(
            child: Column(
              children: [
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
                    child: TabBarView(
                        controller: _tabController,
                        children: tabs,
            ),
          ),
        ),
      ],
    ),
    ),
    ),
    ]
    );
  }


  Widget _tabs(Size size){
    return SizedBox(
      width: size.width*0.8,
      height: size.height*0.04,
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          color: Colors.white,
        ),
        dividerColor: Colors.transparent,
        labelColor: const Color.fromRGBO(103,135,214, 1),
        unselectedLabelColor: Colors.white,
        indicatorSize: TabBarIndicatorSize.tab,
        isScrollable: false,
        tabs: [
          Tab(
            child: AutoSizeText(
              'Attendance',
              style: GoogleFonts.openSans(
                  fontSize: 15,
                  fontWeight:FontWeight.bold
              ),
              maxLines: 1,
            ),
          ),
          Tab(
            child: AutoSizeText(
              'Holiday',
              style: GoogleFonts.openSans(
                  fontSize: 15,
                  fontWeight:FontWeight.bold
              ),
              maxLines: 1,
            ),
          ),
          Tab(
            child: AutoSizeText(
              'Bus Attendance',
              style: GoogleFonts.openSans(
                  fontSize: 15,
                  fontWeight:FontWeight.bold,
              ),
              overflow: TextOverflow.ellipsis,
              maxLines: 1,
            ),
          ),
        ],
      ),
    );
  }
}
