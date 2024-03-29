import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Events/screens/Events_and_programs.dart';
import 'package:metaphile_erp/Screens/Home/screens/Home.dart';
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
    Home(),
    Home(),
    const Timetable(),
    Home(),
    EventsAndPrograms()
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
      ),
      endDrawer: const CustomDrawer(),
      drawer: Drawer(),
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
