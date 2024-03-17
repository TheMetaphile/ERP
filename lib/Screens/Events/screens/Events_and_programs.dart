import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:metaphile_erp/Screens/Events/utils/EventCard.dart';

class EventsAndPrograms extends StatelessWidget {
  const EventsAndPrograms({super.key});

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

          Column(
            children: [
              SizedBox(
                height: size.height*0.03,
              ),
              Expanded(
                child: Card(
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
                    child: Padding(
                      padding: EdgeInsets.symmetric(vertical:size.height*0.02,horizontal: size.width*0.02),
                      child: SingleChildScrollView(
                        child: SingleChildScrollView(
                          child: Column(
                            children: [
                              const Events(
                                eventHeading: 'Sleepover Night',
                                eventDateTime: '06 Jan 25, 09:00 AM',
                                eventDescription: 'A sleepover is a great treat for kids. Many schools use such an event as the culminating activity of the school year.',
                                imagePath: 'assets/Navigation/Event/image1.png',
                              ),
                              const Events(
                                eventHeading: 'Fishing Tournament',
                                eventDateTime: '12 Jan 25, 09:00 AM',
                                eventDescription: 'Silver Sands Middle School in Port Orange Florida offers many special events but one of the most unique ones is a springtime.',
                                imagePath: 'assets/Navigation/Event/image2.png',
                              ),
                              const Events(
                                eventHeading: 'Rhyme Time: A Night of Poetry',
                                eventDateTime: '24 Jan 25, 09:00 AM',
                                eventDescription: 'April is also National Poetry Month. No there is a great theme for a fun family night! Combine poetry readings by students.',
                                imagePath: 'assets/Navigation/Event/image3.png',
                              ),
                              SizedBox(
                                height: size.height*0.25,
                                child: Image.asset("assets/Navigation/Event/1.gif"),
                              )
                            ],
                          ),
                        ),
                      ),
                    )
                ),
              ),
            ],
          ),
        ]
    );
  }
}
