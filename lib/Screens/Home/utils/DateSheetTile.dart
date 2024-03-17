import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class DateSheetTile extends StatelessWidget {
  const DateSheetTile({super.key, required this.date, required this.day, required this.month, required this.subject, required this.time});
  final String date;
  final String day;
  final String month;
  final String subject;
  final String time;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      child: ListTile(
        leading: SizedBox(
          width: size.width*0.1,
          child: Column(
            children: [
              Expanded(
                child: AutoSizeText(date,
                  style: GoogleFonts.bebasNeue(
                      color: Colors.black,
                      fontSize: size.width*0.08,
                      fontWeight: FontWeight.w700
                  ),
                ),
              ),
              AutoSizeText(month,
                style: GoogleFonts.bebasNeue(
                    color: Colors.black,
                    fontSize: 15,
                    fontWeight: FontWeight.w500
                ),
              )

            ],
          ),
        ),
        title: SizedBox(
          height: size.height*0.03,
          child: AutoSizeText(subject,
            style: GoogleFonts.openSans(
                fontSize: 22,
                fontWeight: FontWeight.w600,
                color: Colors.black
            ),
          ),
        ),
        subtitle: AutoSizeText(day,
          style: GoogleFonts.openSans(
              fontSize: 14,
              fontWeight: FontWeight.w400,
              color: Colors.grey.shade600
          ),
        ),
        trailing: SizedBox(
          width: size.width*0.25,
          child: Row(
            children: [
              Icon(Icons.access_time_rounded,color: Colors.grey.shade600,),
              SizedBox(
                width: size.width*0.02,
              ),
              AutoSizeText(time,
                style: GoogleFonts.openSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: Colors.grey.shade600
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
