import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:table_calendar/table_calendar.dart';

class CustomTabBar extends StatefulWidget {
  const CustomTabBar({super.key, });
  @override
  State<CustomTabBar> createState() => _CustomTabBarState();
}

class _CustomTabBarState extends State<CustomTabBar>   with SingleTickerProviderStateMixin {
  late TabController _tabController;

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
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color.fromRGBO(103,135,214, 1),
      body: Column(
        children: [
          SizedBox(
            height:size.height*0.02
          ),
          Row(
            children: [
              SizedBox(
                width:size.width*0.08,
                child:IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.arrow_back_ios_new,
                    color: Colors.white,
                  ),
                )
              ),
              Container(
                height: size.height*0.05,
                width: size.width*0.9,
                decoration: BoxDecoration(
                  color: const Color.fromRGBO(103,135,214, 1),
                  borderRadius: BorderRadius.circular(25),
                  border: Border.all(
                    color: Colors.white,
                    width: size.width*0.004
                  )
                ),
                child: TabBar(
                  controller: _tabController,
                  tabAlignment: TabAlignment.start,
                  indicator: BoxDecoration(
                    borderRadius: BorderRadius.circular(25),
                    color: Colors.white,
                  ),
                  labelColor: const Color.fromRGBO(103,135,214, 1),
                  unselectedLabelColor: Colors.white,
                  indicatorSize: TabBarIndicatorSize.tab,
                  isScrollable: true,
                  tabs: [
                    Tab(
                      child: SizedBox(
                        width:size.width*0.2,
                        child: Center(
                          child: AutoSizeText(
                            'Attendance',
                            style: GoogleFonts.openSans(
                              fontSize:size.width*0.033,
                              fontWeight:FontWeight.bold
                            ),
                            maxLines: 1,
                          ),
                        )
                      ),
                    ),
                    Tab(
                      child: SizedBox(
                          width:size.width*0.2,
                          child:Center(
                            child: AutoSizeText(
                              'Holiday',
                              style: GoogleFonts.openSans(
                                fontSize:size.width*0.033,
                                fontWeight:FontWeight.bold
                              ),
                              maxLines: 1,
                            ),
                          )
                      ),
                    ),
                    Tab(
                      child: SizedBox(
                          width:size.width*0.27,
                          child:Center(
                            child: AutoSizeText(
                              'Bus Attendance',
                              style: GoogleFonts.openSans(
                                fontSize:size.width*0.033,
                                fontWeight:FontWeight.bold
                              ),
                              maxLines: 1,
                            ),
                          )
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(
            height:size.height*0.05
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children:[
                Container(
                  width:size.width,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(size.width*0.1),
                      topRight: Radius.circular(size.width*0.1)
                    ),
                    border: Border.all(
                      color: Colors.black,
                      width:size.width*0.005
                    )
                  ),
                  child:Column(
                    children: [
                      TableCalendar(
                        focusedDay: DateTime(2024,3,24),
                        firstDay: DateTime(2024,3,1),
                        lastDay: DateTime(2024,4,4),
                        availableCalendarFormats: const {
                          CalendarFormat.month : 'Month'
                        },
                        calendarFormat: CalendarFormat.month,
                        headerStyle: const HeaderStyle(
                          titleCentered: true,
                        ),
                        calendarBuilders: CalendarBuilders(
                          prioritizedBuilder: (context, day, focusedDay){
                            if(day.compareTo(focusedDay) >0 && focusedDay.month==day.month){
                              return Card(
                                elevation: 8,
                                color: Colors.green,
                                shape: const CircleBorder(),
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Center(child: Text("${day.day}",style: GoogleFonts.openSans(fontWeight: FontWeight.w600,fontSize: 15,color:Colors.white),)),
                                ),
                              );
                            }
                            else{
                              if(focusedDay.month==day.month) {
                                return Card(
                                elevation: 8,
                                color: Colors.red,
                                shape: const CircleBorder(),
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Center(child: Text("${day.day}",style: GoogleFonts.openSans(fontWeight: FontWeight.w600,fontSize: 15,color:Colors.white),)),
                                ),
                              );
                              }
                            }
                          },

                        ),
                      ),
                      SizedBox(
                          height:size.height*0.02
                      ),
                      Center(
                        child: Container(
                          height:size.height*0.07,
                          width:size.width*0.95,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(size.width*0.04),
                            border: Border(
                              left: BorderSide(
                                color: Colors.red,
                                width: size.width*0.04
                              ),
                              right: BorderSide(
                                  color: Colors.red,
                                  width: size.width*0.005
                              ),
                              bottom: BorderSide(
                                  color: Colors.red,
                                  width: size.width*0.005
                              ),
                              top: BorderSide(
                                  color: Colors.red,
                                  width: size.width*0.005
                              )
                            )
                          ),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                AutoSizeText('Absent',
                                  style:GoogleFonts.openSans(
                                    fontSize:size.width*0.045,
                                    fontWeight:FontWeight.w500
                                  )
                                ),
                                CircleAvatar(
                                  backgroundColor: const Color.fromRGBO(254, 206, 210, 1),
                                  child: Center(child: AutoSizeText('02',
                                    style: GoogleFonts.openSans(
                                      color:const Color.fromRGBO(20, 12, 74, 1),
                                      fontWeight:FontWeight.w600
                                    ),
                                  )),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height:size.height*0.02
                      ),
                      Center(
                        child: Container(
                          height:size.height*0.07,
                          width:size.width*0.95,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(size.width*0.04),
                              border: Border(
                                  left: BorderSide(
                                      color: Colors.green,
                                      width: size.width*0.04
                                  ),
                                  right: BorderSide(
                                      color: Colors.green,
                                      width: size.width*0.005
                                  ),
                                  bottom: BorderSide(
                                      color: Colors.green,
                                      width: size.width*0.005
                                  ),
                                  top: BorderSide(
                                      color: Colors.green,
                                      width: size.width*0.005
                                  )
                              )
                          ),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                AutoSizeText('Present',
                                    style:GoogleFonts.openSans(
                                        fontSize:size.width*0.045,
                                        fontWeight:FontWeight.w500
                                    )
                                ),
                                CircleAvatar(
                                  backgroundColor: const Color.fromRGBO(200, 229, 203, 1),
                                  child: Center(child: AutoSizeText('02',
                                    style: GoogleFonts.openSans(
                                        color:const Color.fromRGBO(20, 12, 74, 1),
                                        fontWeight:FontWeight.w600
                                    ),
                                  )),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  )
                ),
                const Center(
                  child: Text(
                    'Buy Now',
                    style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                const Center(
                  child: Text(
                    'Place Bid',
                    style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w600,
                    ),
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
