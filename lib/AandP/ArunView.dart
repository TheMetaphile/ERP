import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  var currentPage = 0;
  PageController ControllerOfPage = PageController();
  Widget sliderAnimation() {
    Size size = MediaQuery.of(context).size;
    return Center(
      child: Padding(
        padding: EdgeInsets.only(left: size.height * 0.055),
        child: Row(
          children: [
            currentPage == 0
                ? AnimatedContainer(
                    duration: Duration(seconds: 2),
                    //color: Colors.deepPurpleAccent,
                    width: size.width * 0.7 / 3,
                    height: size.height * 0.015,
                    decoration: BoxDecoration(
                        color: Colors.purpleAccent.shade700,
                        borderRadius:
                            BorderRadius.circular(size.height * 0.05)),
                    curve: Curves.bounceOut,
                  )
                : Container(
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(size.height * 0.05),
                          bottomLeft: Radius.circular(size.height * 0.05)),
                    ),
                    height: size.height * 0.015,
                    width: size.width * 0.7 / 3,
                  ),
            currentPage == 1
                ? AnimatedContainer(
                    duration: Duration(seconds: 2),
                    decoration: BoxDecoration(
                        color: Colors.purpleAccent.shade700,
                        borderRadius:
                            BorderRadius.circular(size.height * 0.05)),
                    height: size.height * 0.015,
                    width: size.width * 0.7 / 3,
                    curve: Curves.bounceOut,
                  )
                : Container(
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      //borderRadius: BorderRadius.circular(size.height*0.05)
                    ),
                    height: size.height * 0.015,
                    width: size.width * 0.7 / 3,
                  ),
            currentPage == 2
                ? AnimatedContainer(
                    duration: Duration(seconds: 2),
                    //color: Colors.deepPurpleAccent,
                    decoration: BoxDecoration(
                        color: Colors.purpleAccent.shade700,
                        borderRadius:
                            BorderRadius.circular(size.height * 0.05)),
                    height: size.height * 0.015,
                    width: size.width * 0.7 / 3,
                    curve: Curves.bounceOut,
                  )
                : Container(
                    height: size.height * 0.015,
                    width: size.width * 0.7 / 3,
                    decoration: BoxDecoration(
                        color: Colors.grey.shade300,
                        borderRadius: BorderRadius.only(
                            topRight: Radius.circular(size.height * 0.05),
                            bottomRight: Radius.circular(size.height * 0.05))),
                  ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        padding: EdgeInsets.only(bottom: size.height * 0.11),
        child: PageView(
            controller: ControllerOfPage,
            onPageChanged: (index) {
              setState(() {
                currentPage = index;
                print(index);
              });
            },
            children: [
              Column(
                children: [
                  Stack(
                    // Use Stack to position the container within the Scaffold
                    children: [
                      // Container with deep purple color, rectangular top, and circular bottom
                      Container(
                        width: size.width,
                        height: size.height * 0.5,
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            SizedBox(
                              width: size.width,
                              height: size.height * 0.5,
                              child: Image(
                                image: AssetImage("assets/logo/Aafat2.png"),
                                fit: BoxFit.fitHeight,
                              ),
                            ),
                            Positioned(
                              top: size.height * 0.01,
                              left: size.height * 0.105,
                              child: SizedBox(
                                height: size.height * 0.85,
                                width: size.width * 0.6,
                                child: Image(
                                  image: AssetImage(
                                    "assets/logo/lamdi.png",
                                  ),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  //SizedBox(height: size.height * 0.01,),
                  Padding(
                    padding: EdgeInsets.all(size.height * 0.02),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Container(
                          height: size.height * 0.14,
                          child: Center(
                            child: Text(
                              textAlign: TextAlign.center,
                              "Be Yourself, Stand Out from the Crowd.",
                              style: GoogleFonts.aBeeZee(
                                textStyle: TextStyle(
                                  fontSize: size.height * 0.035,
                                ),
                              ),
                            ),
                          ),
                        ),
                        //SizedBox(height: size.height * 0.02,),
                        Container(
                          height: size.height * 0.11,
                          child: Center(
                            child: Text(
                              textAlign: TextAlign.center,
                              "Tell your story. Share Your interests, hobbies, and"
                              "what you're looking for. Be authentic and make a lasting impression",
                              style: GoogleFonts.aBeeZee(
                                textStyle: TextStyle(
                                  fontSize: size.height * 0.018,
                                ),
                              ),
                            ),
                          ),
                        ),
                        //SizedBox(height: size.height * 0.06,),
                        Container(
                          height: size.height * 0.05,
                            child:
                            Center(
                                child:
                                sliderAnimation()
                            ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  Stack(
                    // Use Stack to position the container within the Scaffold
                    children: [
                      // Container with deep purple color, rectangular top, and circular bottom
                      Container(
                        width: size.width,
                        height: size.height * 0.5,
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            SizedBox(
                              width: size.width,
                              height: size.height * 0.5,
                              child: Image(
                                image: AssetImage("assets/logo/Aafat2.png"),
                                fit: BoxFit.fitHeight,
                              ),
                            ),
                            Positioned(
                              top: size.height * 0.01,
                              left: size.height * 0.105,
                              child: SizedBox(
                                height: size.height * 0.85,
                                width: size.width * 0.6,
                                child: Image(
                                  image: AssetImage(
                                    "assets/logo/InstaGirl.png",
                                  ),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  //SizedBox(height: size.height * 0.01,),
                  Padding(
                    padding: EdgeInsets.all(size.height * 0.02),
                    child: Column(
                      children: [
                        Container(
                          height: size.height * 0.14,
                          child: Center(
                            child: Text(
                              textAlign: TextAlign.center,
                              "Find Your Perfect Match Today",
                              style: GoogleFonts.aBeeZee(
                                textStyle:
                                    TextStyle(fontSize: size.height * 0.035),
                              ),
                            ),
                          ),
                        ),
                        //SizedBox(height: size.height * 0.025,),
                        Container(
                          height: size.height * 0.11,
                          child: Center(
                            child: Text(
                              textAlign: TextAlign.center,
                              "Discover real connections with Kaku intelligent\n"
                              "matchmaking. Start swiping to find your perfect\n"
                              "match today",
                              style: GoogleFonts.aBeeZee(
                                textStyle: TextStyle(
                                  fontSize: size.height * 0.018,
                                ),
                              ),
                            ),
                          ),
                        ),
                        //SizedBox(height: size.height * 0.055,),
                        Container(
                          height: size.height * 0.05,
                            child: Center(child: sliderAnimation()
                            )
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  Stack(
                    // Use Stack to position the container within the Scaffold
                    children: [
                      // Container with deep purple color, rectangular top, and circular bottom
                      Container(
                        width: size.width,
                        height: size.height * 0.5,
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            SizedBox(
                              width: size.width,
                              height: size.height * 0.5,
                              child: Image(
                                image: AssetImage("assets/logo/Aafat2.png"),
                                fit: BoxFit.fitHeight,
                              ),
                            ),
                            Positioned(
                              top: size.height * 0.01,
                              left: size.height * 0.105,
                              child: SizedBox(
                                height: size.height * 0.85,
                                width: size.width * 0.6,
                                child: Image(
                                  image: AssetImage(
                                    "assets/logo/hood.png",
                                  ),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  Padding(
                    padding: EdgeInsets.all(size.height * 0.02),
                    child: Column(
                      children: [
                        Container(
                          height: size.height * 0.14,
                          child: Center(
                            child: Text(
                              textAlign: TextAlign.center,
                              "Connect, Discover, Thrive",
                              style: GoogleFonts.aBeeZee(
                                textStyle:
                                    TextStyle(fontSize: size.height * 0.035),
                              ),
                            ),
                          ),
                        ),
                        //SizedBox(height: size.height * 0.025,),
                        Container(
                          height: size.height * 0.11,
                          child: Center(
                            child: Text(
                              textAlign: TextAlign.center,
                              "Join a Vibrant Community Where Connections\n Flourish, "
                              "Trends Emerge, and Social Media Becomes\n "
                              "an Unforgettable Experience",
                              style: GoogleFonts.aBeeZee(
                                textStyle: TextStyle(
                                  fontSize: size.height * 0.018,
                                ),
                              ),
                            ),
                          ),
                        ),
                        //SizedBox(height: size.height * 0.105,),
                        Container(
                          height: size.height * 0.05,
                            child:
                            Center(child:
                            sliderAnimation()
                            )
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ]),
      ),
      bottomSheet: Container(
        height: size.height * 0.11,
        color: Colors.white,
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              currentPage < 2
                  ? Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          onTap: () {
                            ControllerOfPage.jumpToPage(2);
                          },
                          child: Container(
                            height: size.height * 0.06,
                            width: size.width * 0.4,
                            decoration: BoxDecoration(
                                color: Colors.deepPurple.shade100,
                                borderRadius:
                                    BorderRadius.circular(size.height * 0.05)),
                            child: Center(
                                child: Text(
                              "Skip",
                              style: GoogleFonts.aBeeZee(
                                  textStyle: TextStyle(
                                      color: Colors.purpleAccent.shade700,
                                      fontWeight: FontWeight.bold)),
                            )),
                          ),
                        ),
                        SizedBox(
                          width: size.width * 0.05,
                        ),
                        GestureDetector(
                          onTap: () {
                            ControllerOfPage.nextPage(
                                duration: Duration(seconds: 1),
                                curve: Curves.easeInToLinear);
                          },
                          child: Container(
                            height: size.height * 0.06,
                            width: size.width * 0.4,
                            decoration: BoxDecoration(
                                color: Colors.purpleAccent.shade700,
                                borderRadius:
                                    BorderRadius.circular(size.height * 0.05)),
                            child: Center(
                                child: Text(
                              "Next",
                              style: GoogleFonts.aBeeZee(
                                  textStyle: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold)),
                            )),
                          ),
                        ),
                      ],
                    )
                  : GestureDetector(
                      onTap: () {},
                      child: Container(
                        height: size.height * 0.06,
                        width: size.width * 0.9,
                        decoration: BoxDecoration(
                            color: Colors.purpleAccent.shade700,
                            borderRadius:
                                BorderRadius.circular(size.height * 0.05)),
                        child: Center(
                            child: Text(
                          "Get Started",
                          style: GoogleFonts.aBeeZee(
                              textStyle: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        )),
                      ),
                    ),
            ],
          ),
        ),
      ),
    );
  }
}
