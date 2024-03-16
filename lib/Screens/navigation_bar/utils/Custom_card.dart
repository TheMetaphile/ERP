import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomCard extends StatelessWidget {
  const CustomCard({super.key, required this.circularAvatar, required this.mainText, required this.secondaryText});
  final Widget circularAvatar;
  final String mainText;
  final String secondaryText;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      color: Colors.white,
        elevation: 3.5,
        child: Padding(
          padding: EdgeInsets.all(size.width*0.03),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              circularAvatar,
              SizedBox(
                height: size.height*0.01,
              ),
              mainText.isNotEmpty ? AutoSizeText(mainText,
                style: GoogleFonts.bebasNeue(
                  fontSize: size.width*0.1
                ),
              ): const SizedBox(),
              AutoSizeText(secondaryText,
                style: GoogleFonts.openSans(
                  fontSize: size.width*0.044,
                  color:Colors.grey.shade700
                ),
                maxLines: 1,
              ),

            ],
          ),
        )
    );
  }
}
