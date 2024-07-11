import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class EventCalendarPage extends StatelessWidget {
  final List<Appointment> appointments = [
    Appointment(
      startTime: DateTime(2024, 1, 9),
      endTime: DateTime(2024, 1, 9,),
      subject: 'Half Day',
      color: Colors.purple,
    ),
    Appointment(
      startTime: DateTime(2024, 1, 26,1,1,1),
      endTime: DateTime(2024, 1, 27),
      subject: 'Event',
      color: Colors.green,
    ),
    Appointment(
      startTime: DateTime(2024, 1, 30),
      endTime: DateTime(2024, 1, 31),
      subject: 'PTM',
      color: Colors.orange,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: Text("Events",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w500),),
        ),
        SizedBox(height: size.height*0.03,),
        SfCalendar(
          view: CalendarView.month,
          initialDisplayDate: DateTime(2024, 1,1),
          appointmentTextStyle: TextStyle(

          ),
          dataSource: _getCalendarDataSource(),
          monthViewSettings:  MonthViewSettings(
              appointmentDisplayMode: MonthAppointmentDisplayMode.appointment,
              monthCellStyle: MonthCellStyle(
                  textStyle: TextStyle(

                    color: Colors.black,
                  )
              )
          ),

        ),
      ],
    );

  }

  _getCalendarDataSource() {
    final List<Appointment> appointments = this.appointments;
    return AppointmentDataSource(appointments);
  }
}

class AppointmentDataSource extends CalendarDataSource {
  AppointmentDataSource(List<Appointment> source) {
    appointments = source;
  }
}