import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/AandP/ArunView.dart';
import 'package:metaphile_erp/AandP/Budget.dart';
import 'package:metaphile_erp/AandP/classwork.dart';
import 'package:metaphile_erp/AandP/englishclasswork.dart';
import 'package:metaphile_erp/AandP/homework.dart';
import 'package:metaphile_erp/Screens/Events/screens/Events_and_programs.dart';
import 'package:metaphile_erp/Screens/Home/screens/Datesheet/DateSheet.dart';
import 'package:metaphile_erp/Screens/Home/screens/Home.dart';
import 'package:metaphile_erp/Screens/Home/screens/profile_screen.dart';
import 'package:metaphile_erp/Screens/navigation_bar/Screens/result.dart';
import 'package:metaphile_erp/Screens/navigation_bar/utils/custom_drawer.dart';
import 'package:molten_navigationbar_flutter/molten_navigationbar_flutter.dart';

import 'TimeTable.dart';

class NavigationBar extends StatefulWidget {
  const NavigationBar({super.key});

  @override
  State<NavigationBar> createState() => _NavigationBarState();
}

class _NavigationBarState extends State<NavigationBar> {
  int selectedIndex =0;
  List<String> tabName = [
    "Home",
    "Home Work",
    "Time Table",
    "Class Work",
    "Events & Programs"
  ];
  List<Widget> tabScreens = [
    const Home(),
    const HomeWork(),
    const Timetable(),
    const ClassWork(),
    const EventsAndPrograms()
  ];
  var scaffoldKey = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    List<MoltenTab> tabs=[
      MoltenTab(
        title: const AutoSizeText(
          "Home",
          maxLines: 1,
        ),
        selectedColor: Colors.black,
        unselectedColor: Colors.black,
        icon: const Icon(Icons.home_outlined,size: 38,),
      ),
      MoltenTab(
          title: const AutoSizeText(
            "Home Work",
            maxLines: 1,
          ),
          icon: Image.asset("assets/Navigation/NavigationBar/assignment.png",fit: BoxFit.scaleDown,)
      ),
      MoltenTab(
          title: const AutoSizeText(
              "Time Table",
            maxLines: 1,
          ),
          icon: Image.asset("assets/Navigation/NavigationBar/timetable.png",fit: BoxFit.scaleDown,)
      ),
      MoltenTab(
          title: const AutoSizeText(
              "Class Work",
            maxLines: 1,
          ),
          icon: Image.asset("assets/Navigation/NavigationBar/classroom.png",fit: BoxFit.scaleDown,)
      ),
      MoltenTab(
          title: const AutoSizeText(
            "Events",
            maxLines: 1,
          ),
          icon: Image.asset("assets/Navigation/NavigationBar/event.png",fit: BoxFit.scaleDown,)
      ),
    ];
    return Scaffold(
      backgroundColor: Colors.white,
      extendBody: false,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: AutoSizeText(tabName[selectedIndex],style: GoogleFonts.openSans(color: Colors.white),),
        actions: [
          IconButton(onPressed: (){}, icon: const Icon(Icons.send_outlined,color: Colors.white,)),
          Builder(
            builder: (context) => IconButton(
              icon: const Icon(Icons.notifications_active_outlined,
                color: Colors.white,
              ),
              onPressed: () => Scaffold.of(context).openEndDrawer(),
            ),
          ),
        ],
        backgroundColor: const Color.fromRGBO(108, 137, 204, 1),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu, color: Colors.white,),
            onPressed: () {
              Scaffold.of(context).openDrawer(); // Open the drawer
            },
          ),
        ),
      ),
      endDrawer: const CustomDrawer(),
      drawer: Drawer(
        child: Column(
          children: [
        InkWell(
          onTap: (){
            Navigator.push(context, MaterialPageRoute(builder: (context) {
              return ProfileScreen();
            },));
          },
          child: Container(
          color: const Color.fromRGBO(108, 137, 204, 1),
            padding: EdgeInsets.fromLTRB(size.width*0.02,size.height*0.03,size.width*0.06,size.height*0.02),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  elevation: 10,
                  color: const Color.fromRGBO(237, 231, 246, 1),
                  shape: OutlineInputBorder(
                    borderSide: const BorderSide(
                      color: Color.fromRGBO(250, 243, 228, 1),
                    ),
                    borderRadius: BorderRadius.all(Radius.circular(size.width*0.1,)),
                  ),
                  child: CircleAvatar(
                    radius: size.width*0.1,
                    backgroundColor: const Color.fromRGBO(237, 231, 246, 1),
                    child: SizedBox(
                        width: size.width*0.12,
                        height: size.width*0.12,
                        child: Image.asset("assets/Navigation/Home/maleProfile.png",fit: BoxFit.scaleDown,)),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AutoSizeText("Hi Akshay",
                      style: GoogleFonts.openSans(
                          fontSize: size.width*0.06,
                          color: Colors.white,
                          fontWeight: FontWeight.w500
                      ),
                    ),
                    SizedBox(height: size.height*0.01,),
                    AutoSizeText("Class XI-B | Roll no: 04",
                      style: GoogleFonts.openSans(
                          fontSize: size.width*0.04,
                          color: Colors.white.withOpacity(0.9),
                          fontWeight: FontWeight.w400
                      ),
                    ),
                    SizedBox(height: size.height*0.005,),
                    Card(
                      color: Colors.white,
                      shape: const OutlineInputBorder(
                          borderSide: BorderSide(
                              color: Colors.white
                          ),
                          borderRadius: BorderRadius.all(Radius.circular(50))
                      ),
                      elevation: 8,
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(10.0,5,10,5),
                        child: AutoSizeText("2024-2025",
                          style: GoogleFonts.openSans(
                              fontSize: size.width*0.03,
                              color: const Color.fromRGBO(108, 137, 204, 1),
                              fontWeight: FontWeight.w600
                          ),
                        ),
                      ),
                    ),
                  ],
                ),

              ],
            )
                ),
        ),
            ListTile(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const Result(),));
              },
              title: AutoSizeText("Result",
                 style: GoogleFonts.openSans(
                   fontWeight: FontWeight.w600,
                   fontSize: 20
                 ),
               ),

            ),
            ListTile(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const Budget(),));
              },
              title: AutoSizeText("Test",
                style: GoogleFonts.openSans(
                    fontWeight: FontWeight.w600,
                    fontSize: 20
                ),
              ),

            )
          ],
        ),
      ),
      body:  tabScreens[selectedIndex],
      bottomNavigationBar: MoltenBottomNavigationBar(
        barColor: const Color.fromRGBO(108, 137, 204, 1),
          tabs: tabs,
          domeCircleColor: Colors.white,
          domeCircleSize: size.width*0.12,
          selectedIndex: selectedIndex,
          onTabChange: (index){
          setState(() {
            selectedIndex=index;
          });
          },
      ),
    );
  }


}
