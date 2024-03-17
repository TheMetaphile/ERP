import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Events extends StatelessWidget {
  const Events({super.key, required this.eventHeading, required this.eventDateTime, required this.eventDescription, required this.imagePath});
  final String eventHeading;
  final String eventDateTime;
  final String imagePath;
  final String eventDescription;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      color: Colors.white,
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AutoSizeText(eventHeading,
              style: GoogleFonts.openSans(
                color: Colors.black,
                fontSize: 20,
                fontWeight: FontWeight.w600
              ),
            ),
            SizedBox(
              height: size.height*0.01,
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  color:  const Color.fromRGBO(108, 137, 204, 1),
                  child: SizedBox(
                    width: size.width*0.2,
                      child: Image.asset(imagePath,fit: BoxFit.scaleDown,),
                  ),
                ),
                SizedBox(
                  width: size.width*0.02,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(Icons.access_time_rounded,color: Color.fromRGBO(108, 137, 204, 1),),
                        SizedBox(
                          width: size.width*0.01,
                        ),
                        AutoSizeText(eventDateTime,
                          style: GoogleFonts.openSans(
                              color:  const Color.fromRGBO(108, 137, 204, 1),
                              fontSize: 15,
                              fontWeight: FontWeight.w600
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      width: size.width*0.65,
                      child: AutoSizeText(eventDescription,
                        style: GoogleFonts.openSans(
                            color: Colors.grey.shade800,
                            fontSize: 14,
                            fontWeight: FontWeight.w400
                        ),
                      ),
                    ),
                  ],
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
