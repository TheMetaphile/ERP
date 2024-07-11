import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';

class Events extends StatefulWidget {
  const Events({super.key});

  @override
  State<Events> createState() => _EventsState();
}

class _EventsState extends State<Events> {
  final List<Color> cardColors = [
    Colors.green.shade200,
    Colors.white,
    Colors.yellow.shade200,
    Colors.pink.shade200,
    Colors.white,
    Colors.green.shade200,

  ];
  List upComingEvents=[
    "School is going for vacation at March 10 March 2024",
    "School is going for vacation at March 10 March 2024",
    "School is going for vacation at March 10 March 2024",
    "School is going for vacation at March 10 March 2024",
    "School is going for vacation at March 10 March 2024",
  ];
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
        iconTheme:  IconThemeData(color:themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        title: Text("Events",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
     actions: [
       ElevatedButton(
         onPressed: () {},
         child: Text("Create",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

         style: ElevatedButton.styleFrom(
           shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
         backgroundColor:  Colors.green.shade200,
         ),
       ),
     ],
      ),
      body:   SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text("Upcoming Events",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: List.generate(
                  4,
                      (index) => EventCard(color: cardColors[index]),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text("All Events",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

            ),
            GridView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: 6,
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount( childAspectRatio: 1.45,crossAxisCount: 2,mainAxisSpacing:size.height*0.02 ,crossAxisSpacing: size.width*0.04),
              itemBuilder: (context, index) {
                return  Container(
                  margin: EdgeInsets.only(left: 5,right: 5),
                  child: Card(
                    margin: EdgeInsets.all(0),
                    color: cardColors[index],
                    child: Padding(
                      padding: const EdgeInsets.all(5.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(Icons.directions_walk, color: Colors.orange, size: 20),
                      SizedBox(height: size.height*0.01,),
                          Text(
                            'School is going for vacation at March.',
                            style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w600,fontSize: size.width*0.035),),
                          SizedBox(height: size.height*0.01,),
                          Text('10 March 2024',  style: GoogleFonts.openSans(color: themeObj.textgrey,fontWeight: FontWeight.w300,fontSize: size.width*0.035),),

                        ],
                      ),
                    ),
                  ),
                );
              },),
          ],
        ),
      ),
    );
  }
}

class EventCard extends StatelessWidget {
  final Color color;

  const EventCard({Key? key, required this.color}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 250,
      margin: EdgeInsets.all(8),
      child: Card(
        color: color,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(Icons.directions_walk, color: Colors.orange, size: 40),
              SizedBox(height: 8),
              Text(
                'School is going for vacation at March.',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text('10 March 2024', style: TextStyle(color: Colors.grey[600])),
            ],
          ),
        ),
      ),
    );
  }
}
