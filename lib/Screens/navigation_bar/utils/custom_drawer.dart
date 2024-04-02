
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomDrawer extends StatefulWidget {
  const CustomDrawer({super.key});

  @override
  State<CustomDrawer> createState() => _CustomDrawerState();
}

class _CustomDrawerState extends State<CustomDrawer>  with SingleTickerProviderStateMixin{
  late TabController tabController;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    tabController=TabController(length: 3, vsync: this);
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color.fromRGBO(108, 137, 204, 1),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
              },
            icon: const Icon(Icons.arrow_back_ios,color: Colors.white,),
        ),
        title: AutoSizeText("Notices for students",
          style: GoogleFonts.openSans(
              fontWeight: FontWeight.w600,
              fontSize: size.width*0.05,
              color: Colors.white
          ),
        ),
        actions: [
          const Icon(Icons.done_all_outlined,color: Colors.white,),
          SizedBox(
            width: size.width*0.025,
          ),
          const Icon(Icons.clear,color: Colors.white,),
          SizedBox(
            width: size.width*0.025,
          ),
        ],
      ),
      body: Stack(
        children: [
          SizedBox(
            height: size.height*0.2,
            width: size.width,
            child: Image.asset("assets/Navigation/Home/1.gif"),
          ),

          SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(
                  height: size.height*0.21,
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
                    child: Padding(
                      padding: EdgeInsets.symmetric(vertical:size.height*0.02,horizontal: size.width*0.02),
                      child: Column(
                        children: [
                          SizedBox(
                            height: size.height*0.05,
                            width: size.width,
                            child: TabBar(

                              indicatorColor: const Color.fromRGBO(108, 137, 204, 1),
                              controller: tabController,
                              tabs: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    AutoSizeText("All",
                                      style: GoogleFonts.openSans(
                                        fontSize: size.width*0.04,
                                        fontWeight: FontWeight.w500,
                                        color: Colors.black
                                      ),
                                    ),
                                    SizedBox(
                                      width: size.width*0.01,
                                    ),
                                    const CircleAvatar(
                                      radius: 10,
                                      child: AutoSizeText("2"),
                                    )
                                  ],
                                ),

                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    AutoSizeText("Mentions",
                                      style: GoogleFonts.openSans(
                                          fontSize: size.width*0.04,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black
                                      ),
                                    ),
                                    SizedBox(
                                      width: size.width*0.01,
                                    ),
                                    const CircleAvatar(
                                      radius: 10,
                                      child: AutoSizeText("2"),
                                    )
                                  ],
                                ),

                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    AutoSizeText("Unread",
                                      style: GoogleFonts.openSans(
                                          fontSize: size.width*0.04,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black
                                      ),
                                    ),
                                    SizedBox(
                                      width: size.width*0.01,
                                    ),
                                    const CircleAvatar(
                                      radius: 10,
                                      child: AutoSizeText("2"),
                                    )
                                  ],
                                ),
                              ],

                            ),
                          ),
                          SizedBox(
                            height: size.height*0.01,
                          ),
                          Card(
                            elevation: 5,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                    children: [
                                      const CircleAvatar(
                                        backgroundColor: Colors.blue,
                                        radius: 7,
                                      ),
                                      const CircleAvatar(
                                        backgroundColor: Colors.blue,
                                        radius: 30,
                                      ),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          AutoSizeText("Parent-Teacher Meetings",
                                            style: GoogleFonts.openSans(
                                              fontWeight: FontWeight.w600,
                                              fontSize: size.width*0.038,
                                              color: Colors.black
                                            ),
                                          ),
                                          AutoSizeText("Tomorrow from 9 am to 5pm",
                                            style: GoogleFonts.openSans(
                                              fontWeight: FontWeight.w600,
                                              fontSize: size.width*0.03,
                                              color: Colors.grey.shade800
                                            ),
                                          ),
                                        ],
                                      ),
                                      const Column(
                                        children: [
                                          AutoSizeText("2m"),
                                          Icon(Icons.more_horiz)
                                        ],
                                      )
                                    ],
                                  ),
                                  SizedBox(
                                    height: size.height*0.01,
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      InkWell(
                                        child: Container(
                                          width: size.width*0.27,
                                          height: size.height*0.04,
                                          decoration: BoxDecoration(
                                            color: const Color.fromRGBO(64, 111, 224, 1),
                                            borderRadius: BorderRadius.circular(10)
                                          ),
                                          child: Center(
                                            child: AutoSizeText("Accepts",
                                              style: GoogleFonts.openSans(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: size.width*0.04,
                                                  color: Colors.white
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      SizedBox(
                                        width: size.width*0.03,
                                      ),
                                      InkWell(
                                        child: Container(
                                          width: size.width*0.27,
                                          height: size.height*0.04,
                                          decoration: BoxDecoration(
                                            border: Border.all(
                                              color: Colors.grey
                                            ),
                                            borderRadius: BorderRadius.circular(10)
                                          ),
                                          child: Center(
                                            child: AutoSizeText("Reject",
                                              style: GoogleFonts.openSans(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: size.width*0.043,
                                                  color: Colors.grey.shade800
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  )
                                ],
                              ),
                            ),
                          ),
                          Card(
                            elevation: 5,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(
                                    width: 16,
                                  ),
                                  const CircleAvatar(
                                    backgroundColor: Colors.blue,
                                    radius: 30,
                                  ),
                                  SizedBox(
                                    width: size.width*0.02,
                                  ),
                                  SizedBox(
                                    width: size.width*0.6,
                                    child: AutoSizeText("Tomorrow's field trip to the museum has been postponed to next week. Please check your emails for further updates.",
                                      style: GoogleFonts.openSans(
                                        fontWeight: FontWeight.w600,
                                        fontSize: size.width*0.03,
                                        color: Colors.grey.shade800
                                      ),
                                    ),
                                  ),
                                  const Column(
                                    children: [
                                      AutoSizeText("8h"),
                                      Icon(Icons.more_horiz)
                                    ],
                                  )
                                ],
                              ),
                            ),
                          ),
                          Card(
                            elevation: 5,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const SizedBox(
                                        width: 16,
                                      ),
                                      const CircleAvatar(
                                        backgroundColor: Colors.blue,
                                        radius: 30,
                                      ),
                                      SizedBox(
                                        width: size.width*0.02,
                                      ),
                                      SizedBox(
                                        width: size.width*0.63,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            AutoSizeText("Attention all staff and students!",
                                              style: GoogleFonts.openSans(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: size.width*0.038,
                                                  color: Colors.black
                                              ),
                                            ),
                                            SizedBox(
                                              height: size.height*0.01,
                                            ),
                                            AutoSizeText("The school's annual talent sho originally scheduled for this friday has been rescheduled to next month.",
                                              style: GoogleFonts.openSans(
                                                  fontWeight: FontWeight.w500,
                                                  fontSize: size.width*0.03,
                                                  color: Colors.grey.shade800
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const Column(
                                        children: [
                                          AutoSizeText("8h"),
                                          Icon(Icons.more_horiz)
                                        ],
                                      )
                                    ],
                                  ),

                                  SizedBox(
                                    height: size.height*0.01,
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      SizedBox(
                                        width: size.width*0.16,
                                      ),
                                      InkWell(
                                        child: Container(
                                          width: size.width*0.6,
                                          height: size.height*0.05,
                                          decoration: BoxDecoration(
                                              color: const Color.fromRGBO(64, 111, 224, 1),
                                              borderRadius: BorderRadius.circular(10)
                                          ),
                                          child: Center(
                                            child: AutoSizeText("Important Notice for all",
                                              style: GoogleFonts.openSans(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: size.width*0.04,
                                                  color: Colors.white
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  )
                                ],
                              ),
                            ),
                          ),
                          SizedBox(
                            height: size.height*0.21,
                          ),
                        ],
                      ),
                    )
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
