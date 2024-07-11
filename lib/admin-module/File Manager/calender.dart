import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class Calender extends StatefulWidget {
  const Calender({super.key});

  @override
  State<Calender> createState() => _CalenderState();
}

class _CalenderState extends State<Calender> {
  List upcomingEvents=["Pool Party","Sport Day","Annual Day"];
  List holidays=["PTM will held on 5 May 2024",
    " There will be a holiday on 6 May 2024",
    " There will be a holiday on 8 May 2024",
    " There will be a holiday on 15 May 2024",

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
        title:  Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Calender",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),


          ],
        ),

      ),
      body:secondStackLayer(size,context),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {


    return SingleChildScrollView(

      child: Column(

        children: [
          SizedBox(
            height: size.height * 0.04,
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
            child:  Container(
              width: size.width,
              child: Column(
                children: [
                  Card(
                    margin: EdgeInsets.all(8),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      child: SfCalendar(
                            specialRegions: [
                                   TimeRegion(startTime: DateTime(2024,5,23,), endTime: DateTime(2024, 5, 23),),
                                   TimeRegion(startTime: DateTime(2024, 5, 28), endTime: DateTime(2024, 5, 28)),
                                 ],
                        view: CalendarView.month,
                        headerStyle: CalendarHeaderStyle(

                          textStyle: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),

                        ),
                        monthViewSettings: MonthViewSettings(
                          showAgenda: false,
                          numberOfWeeksInView: 6,
                          monthCellStyle: MonthCellStyle(
                            textStyle: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          agendaStyle: AgendaStyle(
                            backgroundColor: Colors.blue,

                          ),

                        ),

                      ),
                    ),
                  ),
                  Card(
                    margin: EdgeInsets.all(8),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("Upcoming Events",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),),

                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          ListView.separated(
                            shrinkWrap: true,
                            itemCount: upcomingEvents.length,
                            physics: NeverScrollableScrollPhysics(),
                            separatorBuilder: (context, index) => Divider(
                              height: 1,
                              color: Colors.grey,
                            ),
                            itemBuilder: (context, index) {
                              return ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.purple,
                                  child: Icon(Icons.emoji_events,color: Colors.white,
                                  ),
                                ),
                                title: Text(upcomingEvents[index]),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  Card(
                    margin: EdgeInsets.all(8),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("Holidays",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),),

                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          ListView.builder(
                            shrinkWrap: true,
                            itemCount: holidays.length,
                            physics: NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return Card(
                                      margin:EdgeInsets.all(5),
                                color: index%2==1 ?Color(0xFFFFD3D3): index%2==0?Color(0xFFDFE1FF): Colors.grey[400],
                                child:Container(
                                  padding: EdgeInsets.symmetric(horizontal: 5),

                                  child: Row(
                                    children: [
                                    Image.asset("assets/Images/Common Images/holiday.png",height: size.height*0.06,),
                                      SizedBox(width: size.width*0.03,),
                                      Text(holidays[index],overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035),),

                                    ],
                                  ),
                                )
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: size.height*0.03,),

                ],
              ),
            ),
          ),


        ],
      ),
    );
  }
}
