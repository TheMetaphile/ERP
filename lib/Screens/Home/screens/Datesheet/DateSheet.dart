import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/utils/DateSheetTile.dart';

class DateSheet extends StatelessWidget {
  const DateSheet({super.key,});
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
        alignment: Alignment.topCenter,
        children: [
          Container(
            height: size.height,
            width: size.width,
            color: const Color.fromRGBO(108, 137, 204, 1),
          ),
          SizedBox(
            width: size.width,
            height: size.height*0.12,
            child: Image.asset("assets/Navigation/changePassword/starpattern.png"),
          ),
          Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              elevation: 0,
              backgroundColor: Colors.transparent,
              leading: IconButton(
                onPressed: (){
                  Navigator.pop(context);
                },
                icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.white,),
              ),
              title: AutoSizeText("Pay Online",
                style: GoogleFonts.openSans(
                    color: Colors.white,
                    fontWeight: FontWeight.w500
                ),
              ),
            ),
          ),
          Column(
            children: [
              SizedBox(
                height: size.height*0.12,
              ),
              Card(
                color: Colors.white,
                margin: const EdgeInsets.all(0),
                shape: const OutlineInputBorder(
                    borderSide: BorderSide(
                        color: Colors.white
                    ),
                    borderRadius: BorderRadius.only(
                        topRight: Radius.circular(30),
                        topLeft: Radius.circular(30)
                    )
                ),
                child: SizedBox(
                  height: size.height*0.88,
                  width: size.width,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 10.0,vertical: size.height*0.01),
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          const DateSheetTile(
                              date: "11",
                              day: "Monday",
                              month: "Jan",
                              subject: "Science",
                              time: "09:00 AM",
                          ),
                          const DateSheetTile(
                            date: "13",
                            day: "Wednesday",
                            month: "Jan",
                            subject: "English",
                            time: "09:00 AM",
                          ),
                          const DateSheetTile(
                            date: "15",
                            day: "Friday",
                            month: "Jan",
                            subject: "Hindi",
                            time: "09:00 AM",
                          ),
                          const DateSheetTile(
                            date: "18",
                            day: "Monday",
                            month: "Jan",
                            subject: "Math",
                            time: "09:00 AM",
                          ),
                          const DateSheetTile(
                            date: "20",
                            day: "Wednesday",
                            month: "Jan",
                            subject: "Social Study",
                            time: "09:00 AM",
                          ),
                          const DateSheetTile(
                            date: "22",
                            day: "Friday",
                            month: "Jan",
                            subject: "Drawing",
                            time: "09:00 AM",
                          ),
                          const DateSheetTile(
                            date: "25",
                            day: "Monday",
                            month: "Jan",
                            subject: "Computer",
                            time: "09:00 AM",
                          ),
                          SizedBox(
                            width: size.width,
                            child: Image.asset("assets/Navigation/Event/image4.png",fit: BoxFit.scaleDown,),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ]
    );
  }
}
