import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class AttendanceTile extends StatelessWidget {
  const AttendanceTile({super.key, required this.date,  required this.month, required this.checkIn, required this.checkOut, required this.status});
  final String date;
  final String? month;
  final String checkIn;
  final String checkOut;
  final String status;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AutoSizeText(date,
                style: GoogleFonts.bebasNeue(
                    color: Colors.black,
                    fontSize: size.width*0.05,
                    fontWeight: FontWeight.w600
                ),
              ),
              month!.isEmpty ? SizedBox(): AutoSizeText(month!,
                style: GoogleFonts.bebasNeue(
                    color: Colors.black,
                    fontSize: 15,
                    fontWeight: FontWeight.w400
                ),
              ),

            ],
          ),
          AutoSizeText(checkIn,
            style: GoogleFonts.openSans(
                fontSize: size.width*0.05,
                fontWeight: FontWeight.w400,
                color: Colors.black
            ),
          ),
          AutoSizeText(checkOut,
            style: GoogleFonts.openSans(
                fontSize: size.width*0.05,
                fontWeight: FontWeight.w400,
                color: Colors.grey.shade600
            ),
          ),
          AutoSizeText(status,
            style: GoogleFonts.openSans(
                fontSize: size.width*0.05,
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade600
            ),
          ),
        ],
      ),
    );
  }
}
