import 'dart:math';

import 'package:confetti/confetti.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shimmer/shimmer.dart';
import 'package:untitled/APIs/Teacher%20Module/Birthday/birthday.dart';
import 'package:untitled/utils/theme.dart';

// class Birthday extends StatefulWidget {
//   const Birthday({Key? key}) : super(key: key);
//
//   @override
//   State<Birthday> createState() => _BirthdayState();
// }
//
// class _BirthdayState extends State<Birthday> {
//   CustomTheme themeObj = CustomTheme();
//   String selectedFilter = 'Teacher';
//   BirthdayAPI apiObj=BirthdayAPI();
//     bool isLoading=false;
//   Map<dynamic, dynamic> studentBirthday = {};
//   List<dynamic> todayStudentBirthday = [];
//   List<dynamic> upcomingStudentBirthday = [];
//   Map<dynamic, dynamic> teacherBirthday = {};
//   List<dynamic> todayTeacherBirthday = [];
//   List<dynamic> upcomingteachersBirthday = [];
//
//
//
//
//   Future<void> fetchStudentBirthdays() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//       String date = DateTime.now().toString().split(' ')[0];
//       print(accessToken);
//     Map<dynamic,dynamic> data=await apiObj.fetchStudentBirthdays(accessToken, date);
//
//       setState(() {
//         studentBirthday = data;
//         todayStudentBirthday = data['todayBirthday'] as List<dynamic>? ?? [];
//         upcomingStudentBirthday = data['upcomingBirthdays'] as List<dynamic>? ?? [];
//       });
//     } catch (e) {
//       print('Error fetching student data: $e');
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text('Failed to load students. Please try again.')),
//       );
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//   Future<void> fetchTeacherBirthdays() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//       String date = DateTime.now().toString().split(' ')[0];
//     Map<dynamic,dynamic> data=await apiObj.fetchTeacherBirthday(accessToken, date);
//
//       setState(() {
//         teacherBirthday = data;
//         todayTeacherBirthday = data['todayBirthday'] as List<dynamic>? ?? [];
//         upcomingteachersBirthday = data['upcomingBirthdays'] as List<dynamic>? ?? [];
//       });
//     } catch (e) {
//       print('Error fetching student data: $e');
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text('Failed to load students. Please try again.')),
//       );
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
// @override
// void initState(){
//   super.initState();
//   fetchStudentBirthdays();
//   fetchTeacherBirthdays();
//
// }
//   @override
//   Widget build(BuildContext context) {
//     print("today $todayTeacherBirthday");
//     print("Upcoming $upcomingteachersBirthday");
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       appBar: AppBar(
//         leading: IconButton(
//           onPressed: () => Navigator.pop(context),
//           icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
//         ),
//         backgroundColor: themeObj.primayColor,
//         title: Text(
//           "Birthdays",
//           style: GoogleFonts.openSans(
//             color: themeObj.textBlack,
//             fontWeight: FontWeight.w500,
//             fontSize: size.width * 0.05,
//           ),
//         ),
//       ),
//       body: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Padding(
//           padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               SizedBox(height: size.height * 0.02),
//               _buildFilterButtons(size),
//               isLoading? Center(
//                 child: LoadingAnimationWidget.threeArchedCircle(
//                   color: themeObj.primayColor,
//                   size: 50,
//                 ),
//               ):selectedFilter=="Student"? Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   SizedBox(height: size.height * 0.01),
//                   _buildSectionTitle("Today's", size),
//                   SizedBox(height: size.height * 0.01),
//                   todayStudentBirthday.isEmpty ? Center(child: const Text("There is No Today Birthday")) :
//                   ListView.builder(
//                     shrinkWrap: true,
//                     itemCount: todayStudentBirthday.length,
//                     itemBuilder: (context, index) {
//
//                       final particularCard = todayStudentBirthday[index];
//
//                       print( "${particularCard["DOB"].split("-")[0]}");
//                       return Card(
//                         elevation: 3,
//                         margin: EdgeInsets.only(bottom: size.height * 0.01),
//                         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
//                         child: Padding(
//                           padding: EdgeInsets.all(size.width * 0.03),
//                           child: Row(
//                             children: [
//                               CircleAvatar(
//                                 radius: size.width * 0.08,
//                                 backgroundImage: NetworkImage(particularCard["profileLink"]?? "Unknown"),
//                               ),
//                               SizedBox(width: size.width * 0.03),
//                               Expanded(
//                                 child: Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text(
//                                       particularCard["name"] ?? "Unknown",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF045156),
//                                         fontSize: size.width * 0.045,
//                                         fontWeight: FontWeight.w600,
//                                       ),
//                                     ),
//                                     Text(
//                                       particularCard["currentClass"]?? "Unknown",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF045156),
//                                         fontSize: size.width * 0.035,
//                                       ),
//                                     ),
//                                     Text(
//                                       "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF045156),
//                                         fontSize: size.width * 0.035,
//                                       ),
//                                     ),
//                                     Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF1FE23E),
//                                         fontSize: size.width * 0.035,
//                                       ),
//                                     ),
//                                   ],
//                                 ),
//                               ),
//                               ElevatedButton.icon(
//                                 onPressed: () {},
//                                 icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
//                                 label: Text(
//                                   "Message",
//                                   style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
//                                 ),
//                                 style: ElevatedButton.styleFrom(
//                                   backgroundColor: Color.fromRGBO(22, 101, 52, 0.6),
//                                   shape: RoundedRectangleBorder(
//                                     borderRadius: BorderRadius.circular(8),
//                                   ),
//                                 ),
//                               ),
//                             ],
//                           ),
//                         ),
//                       );
//                     },),
//
//                   _buildSectionTitle("Days To Go", size),
//                   SizedBox(height: size.height * 0.01),
//                   upcomingStudentBirthday.isEmpty ? Center(child: const Text("There is No Upcoming Birthday Found")) :
//                   SizedBox(
//                     height: size.height*0.53,
//                     child: ListView.builder(
//                       shrinkWrap: true,
//                       itemCount: upcomingStudentBirthday?.length,
//                       itemBuilder: (context, index) {
//                         final particularCard=upcomingStudentBirthday?[index];
//                         return Card(
//                           elevation: 3,
//                           margin: EdgeInsets.only(bottom: size.height * 0.01),
//                           shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
//                           child: Padding(
//                             padding: EdgeInsets.all(size.width * 0.03),
//                             child: Row(
//                               children: [
//                                 CircleAvatar(
//                                   radius: size.width * 0.08,
//                                   backgroundImage: NetworkImage(particularCard["profileLink"] ?? ""),
//                                 ),
//                                 SizedBox(width: size.width * 0.03),
//                                 Expanded(
//                                   child: Column(
//                                     crossAxisAlignment: CrossAxisAlignment.start,
//                                     children: [
//                                       Text(
//                                         particularCard["name"]?? "Unknown",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF045156),
//                                           fontSize: size.width * 0.045,
//                                           fontWeight: FontWeight.w600,
//                                         ),
//                                       ),
//                                       Text(
//                                         particularCard["currentClass"]?? "UnknownClass",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF045156),
//                                           fontSize: size.width * 0.035,
//                                         ),
//                                       ),
//                                       Text(
//                                         "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF045156),
//                                           fontSize: size.width * 0.035,
//                                         ),
//                                       ),
//                                       Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF1FE23E),
//                                           fontSize: size.width * 0.035,
//                                         ),
//                                       ),
//                                     ],
//                                   ),
//                                 ),
//                                 ElevatedButton.icon(
//                                   onPressed: () {},
//                                   icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
//                                   label: Text(
//                                     "Message",
//                                     style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
//                                   ),
//                                   style: ElevatedButton.styleFrom(
//                                     backgroundColor: Color.fromRGBO(22, 101, 52, 0.6),
//                                     shape: RoundedRectangleBorder(
//                                       borderRadius: BorderRadius.circular(8),
//                                     ),
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         );
//                       },
//                     ),
//                   ),
//                 ],
//               ):Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   SizedBox(height: size.height * 0.02),
//                   _buildSectionTitle("Today's", size),
//                   SizedBox(height: size.height * 0.01),
//                   todayTeacherBirthday.isEmpty ? Center(child: const Text("There is No Today Birthday")):
//                   ListView.builder(
//                     shrinkWrap: true,
//                     itemCount: todayTeacherBirthday.length,
//                     itemBuilder: (context, index) {
//
//                       final particularCard=todayTeacherBirthday[index];
//                       print( "${particularCard["DOB"].split("-")[0]}");
//                       return Card(
//                         elevation: 3,
//                         margin: EdgeInsets.only(bottom: size.height * 0.01),
//                         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
//                         child: Padding(
//                           padding: EdgeInsets.all(size.width * 0.03),
//                           child: Row(
//                             children: [
//                               CircleAvatar(
//                                 radius: size.width * 0.08,
//                                 backgroundImage: NetworkImage(particularCard["profileLink"]?? ""),
//                               ),
//                               SizedBox(width: size.width * 0.03),
//                               Expanded(
//                                 child: Column(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   children: [
//                                     Text(
//                                       particularCard["name"]?? "Unknown",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF045156),
//                                         fontSize: size.width * 0.045,
//                                         fontWeight: FontWeight.w600,
//                                       ),
//                                     ),
//                                     Text(
//                                       particularCard["currentClass"] ?? "Unknown",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF045156),
//                                         fontSize: size.width * 0.035,
//                                       ),
//                                     ),
//                                     Text(
//                                       "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF045156),
//                                         fontSize: size.width * 0.035,
//                                       ),
//                                     ),
//                                     Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
//                                       style: GoogleFonts.openSans(
//                                         color: Color(0xFF1FE23E),
//                                         fontSize: size.width * 0.035,
//                                       ),
//                                     ),
//                                   ],
//                                 ),
//                               ),
//                               ElevatedButton.icon(
//                                 onPressed: () {},
//                                 icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
//                                 label: Text(
//                                   "Message",
//                                   style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
//                                 ),
//                                 style: ElevatedButton.styleFrom(
//                                   backgroundColor: Color.fromRGBO(22, 101, 52, 0.6),
//                                   shape: RoundedRectangleBorder(
//                                     borderRadius: BorderRadius.circular(8),
//                                   ),
//                                 ),
//                               ),
//                             ],
//                           ),
//                         ),
//                       );
//                     },),
//                   SizedBox(height: size.height * 0.02),
//                   _buildSectionTitle("Days To Go", size),
//                   SizedBox(height: size.height * 0.01),
//                   upcomingteachersBirthday.isEmpty ? Center(child: const Text("There is No Upcoming Birthday Found")):
//                   SizedBox(
//                     height: size.height*0.53,
//                     child: ListView.builder(
//                       shrinkWrap: true,
//                       itemCount: upcomingteachersBirthday.length,
//                       itemBuilder: (context, index) {
//                         final particularCard=upcomingteachersBirthday[index];
//                         return Card(
//                           elevation: 3,
//                           margin: EdgeInsets.only(bottom: size.height * 0.01),
//                           shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
//                           child: Padding(
//                             padding: EdgeInsets.all(size.width * 0.03),
//                             child: Row(
//                               children: [
//                                 CircleAvatar(
//                                   radius: size.width * 0.08,
//                                   backgroundImage: NetworkImage(particularCard["profileLink"]?? ""),
//                                 ),
//                                 SizedBox(width: size.width * 0.03),
//                                 Expanded(
//                                   child: Column(
//                                     crossAxisAlignment: CrossAxisAlignment.start,
//                                     children: [
//                                       Text(
//                                         particularCard["name"]?? "Unknown",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF045156),
//                                           fontSize: size.width * 0.045,
//                                           fontWeight: FontWeight.w600,
//                                         ),
//                                       ),
//                                       Text(
//                                         particularCard["currentClass"]?? "Unknown",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF045156),
//                                           fontSize: size.width * 0.035,
//                                         ),
//                                       ),
//                                       Text(
//                                         "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF045156),
//                                           fontSize: size.width * 0.035,
//                                         ),
//                                       ),
//                                       Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
//                                         style: GoogleFonts.openSans(
//                                           color: Color(0xFF1FE23E),
//                                           fontSize: size.width * 0.035,
//                                         ),
//                                       ),
//                                     ],
//                                   ),
//                                 ),
//                                 ElevatedButton.icon(
//                                   onPressed: () {},
//                                   icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
//                                   label: Text(
//                                     "Message",
//                                     style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
//                                   ),
//                                   style: ElevatedButton.styleFrom(
//                                     backgroundColor: Color.fromRGBO(22, 101, 52, 0.6),
//                                     shape: RoundedRectangleBorder(
//                                       borderRadius: BorderRadius.circular(8),
//                                     ),
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         );
//                       },
//                     ),
//                   ),
//                 ],
//               )
//             ],
//           ),
//         ),
//       ),
//     );
//   }
//
//   Widget _buildFilterButtons(Size size) {
//     return Row(
//       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//       children: ['Teacher', 'Student'].map((filter) {
//         return Padding(
//           padding: EdgeInsets.only(right: size.width * 0.02),
//           child: ElevatedButton(
//             onPressed: () {
//               setState((){
//                 selectedFilter = filter;
//               });
//
//             },
//
//             style: ElevatedButton.styleFrom(
//               backgroundColor: selectedFilter == filter
//                   ? themeObj.primayColor
//                   : Color.fromRGBO(209, 213, 219, 1),
//               shape: RoundedRectangleBorder(
//                 borderRadius: BorderRadius.circular(8),
//
//               ),
//             ),
//             child: Text(
//               filter,
//               style: GoogleFonts.openSans(
//                 color: themeObj.textBlack,
//                 fontWeight: FontWeight.w400,
//                 fontSize: size.width * 0.035,
//               ),
//             ),
//           ),
//         );
//       }).toList(),
//     );
//   }
//
//   Widget _buildSectionTitle(String title, Size size) {
//     return Text(
//       title,
//       style: GoogleFonts.openSans(
//         fontSize: size.width * 0.05,
//         fontWeight: FontWeight.w600,
//         color: themeObj.textBlack,
//       ),
//     );
//   }
//
// }
class Birthday extends StatefulWidget {
  const Birthday({Key? key}) : super(key: key);

  @override
  State<Birthday> createState() => _BirthdayState();
}

class _BirthdayState extends State<Birthday> with SingleTickerProviderStateMixin {
  CustomTheme themeObj = CustomTheme();
  String selectedFilter = 'Teacher';
  BirthdayAPI apiObj=BirthdayAPI();
    bool isLoading=false;
  Map<dynamic, dynamic> studentBirthday = {};
  List<dynamic> todayStudentBirthday = [];
  List<dynamic> upcomingStudentBirthday = [];
  Map<dynamic, dynamic> teacherBirthday = {};
  List<dynamic> todayTeacherBirthday = [];
  List<dynamic> upcomingteachersBirthday = [];




  Future<void> fetchStudentBirthdays() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      String date = DateTime.now().toString().split(' ')[0];
      print(accessToken);
    Map<dynamic,dynamic> data=await apiObj.fetchStudentBirthdays(accessToken, date);

      setState(() {
        studentBirthday = data;
        todayStudentBirthday = data['todayBirthday'] as List<dynamic>? ?? [];
        upcomingStudentBirthday = data['upcomingBirthdays'] as List<dynamic>? ?? [];
      });
    } catch (e) {
      print('Error fetching student data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load students. Please try again.')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
  Future<void> fetchTeacherBirthdays() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      String date = DateTime.now().toString().split(' ')[0];
    Map<dynamic,dynamic> data=await apiObj.fetchTeacherBirthday(accessToken, date);

      setState(() {
        teacherBirthday = data;
        todayTeacherBirthday = data['todayBirthday'] as List<dynamic>? ?? [];
        upcomingteachersBirthday = data['upcomingBirthdays'] as List<dynamic>? ?? [];
      });
    } catch (e) {
      print('Error fetching student data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load students. Please try again.')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
  late AnimationController _animationController;
  late ConfettiController _confettiController;

  @override
  void initState() {
    super.initState();
    fetchStudentBirthdays();
    fetchTeacherBirthdays();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 300),
    );
    _confettiController = ConfettiController(duration: Duration(seconds: 5));
  }

  @override
  void dispose() {
    _animationController.dispose();
    _confettiController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: _buildGradientAppBar(size),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height * 0.02),
                  _buildAnimatedFilterButtons(size),
                  SizedBox(height: size.height * 0.02),
                  isLoading
                      ? _buildShimmerLoading(size)
                      : _buildBirthdayLists(size),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confettiController,
              blastDirection: pi / 2,
              maxBlastForce: 5,
              minBlastForce: 2,
              emissionFrequency: 0.05,
              numberOfParticles: 50,
              gravity: 0.05,
            ),
          ),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildGradientAppBar(Size size) {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [themeObj.primayColor, themeObj.primayColor.withOpacity(0.7)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          leading: IconButton(
            onPressed: () => Navigator.pop(context),
            icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
          ),
          title: Text(
            "Birthdays",
            style: GoogleFonts.openSans(
              color: themeObj.textBlack,
              fontWeight: FontWeight.w500,
              fontSize: size.width * 0.05,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAnimatedFilterButtons(Size size) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: ['Teacher', 'Student'].map((filter) {
        return GestureDetector(
          onTap: () {
            setState(() {
              selectedFilter = filter;
              _animationController.forward(from: 0.0);
            });
          },
          child: AnimatedBuilder(
            animation: _animationController,
            builder: (context, child) {
              return Container(
                padding: EdgeInsets.symmetric(
                  horizontal: size.width * 0.04,
                  vertical: size.height * 0.01,
                ),
                decoration: BoxDecoration(
                  color: selectedFilter == filter
                      ? themeObj.primayColor
                      : Color.fromRGBO(209, 213, 219, 1),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: 4,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: Text(
                  filter,
                  style: GoogleFonts.openSans(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w500,
                    fontSize: size.width * 0.04,
                  ),
                ),
              );
            },
          ),
        );
      }).toList(),
    );
  }

  Widget _buildShimmerLoading(Size size) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: Column(
        children: List.generate(5, (index) => _buildShimmerCard(size)),
      ),
    );
  }

  Widget _buildShimmerCard(Size size) {
    return Container(
      margin: EdgeInsets.only(bottom: size.height * 0.02),
      height: size.height * 0.1,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
      ),
    );
  }

  Widget _buildBirthdayLists(Size size) {
    List<dynamic> todayBirthdays = selectedFilter == 'Student' ? todayStudentBirthday : todayTeacherBirthday;
    List<dynamic> upcomingBirthdays = selectedFilter == 'Student' ? upcomingStudentBirthday : upcomingteachersBirthday;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle("Today's", size),
        SizedBox(height: size.height * 0.01),
        _buildBirthdayList(todayBirthdays, size, isToday: true),
        SizedBox(height: size.height * 0.02),
        _buildSectionTitle("Upcoming", size),
        SizedBox(height: size.height * 0.01),
        _buildBirthdayList(upcomingBirthdays, size, isToday: false),
      ],
    );
  }

  Widget _buildBirthdayList(List<dynamic> birthdays, Size size, {required bool isToday}) {
    return birthdays.isEmpty
        ? Center(child: Text("No birthdays found"))
        : AnimationLimiter(
      child: ListView.builder(
        shrinkWrap: true,
        physics: NeverScrollableScrollPhysics(),
        itemCount: birthdays.length,
        itemBuilder: (context, index) {
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: _buildBirthdayCard(birthdays[index], size, isToday),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildBirthdayCard(dynamic birthday, Size size, bool isToday) {
    return GestureDetector(
      onTap: () {
        if (isToday) {
          _confettiController.play();
        }
      },
      child: Card(
        elevation: 3,
        margin: EdgeInsets.only(bottom: size.height * 0.01),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            gradient: LinearGradient(
              colors: [Colors.white, themeObj.primayColor.withOpacity(0.1)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Padding(
            padding: EdgeInsets.all(size.width * 0.03),
            child: Row(
              children: [
                CircleAvatar(
                  radius: size.width * 0.08,
                  backgroundImage: NetworkImage(birthday["profileLink"] ?? ""),
                ),
                SizedBox(width: size.width * 0.03),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        birthday["name"] ?? "Unknown",
                        style: GoogleFonts.openSans(
                          color: Color(0xFF045156),
                          fontSize: size.width * 0.045,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        birthday["currentClass"] ?? "Unknown",
                        style: GoogleFonts.openSans(
                          color: Color(0xFF045156),
                          fontSize: size.width * 0.035,
                        ),
                      ),
                      Text(
                        "Birthday: ${birthday["DOB"].split("-")[0] ?? "Unknown"}",
                        style: GoogleFonts.openSans(
                          color: Color(0xFF045156),
                          fontSize: size.width * 0.035,
                        ),
                      ),
                      Text(
                        "Send a Birthday wish to ${birthday["name"] ?? "Unknown"}...",
                        style: GoogleFonts.openSans(
                          color: Color(0xFF1FE23E),
                          fontSize: size.width * 0.035,
                        ),
                      ),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: Icon(Icons.message_outlined, size: size.width * 0.04, color: themeObj.textBlack),
                  label: Text(
                    "Message",
                    style: GoogleFonts.openSans(fontSize: size.width * 0.03, color: themeObj.textBlack),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromRGBO(22, 101, 52, 0.6),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title, Size size) {
    return Text(
      title,
      style: GoogleFonts.openSans(
        fontSize: size.width * 0.05,
        fontWeight: FontWeight.w600,
        color: themeObj.textBlack,
      ),
    );
  }
}
