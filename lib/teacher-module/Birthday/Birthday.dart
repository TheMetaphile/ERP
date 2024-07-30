import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/Birthday/birthday.dart';
import 'package:untitled/utils/theme.dart';

class Birthday extends StatefulWidget {
  const Birthday({Key? key}) : super(key: key);

  @override
  State<Birthday> createState() => _BirthdayState();
}

class _BirthdayState extends State<Birthday> {
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
@override
void initState(){
  super.initState();
  fetchStudentBirthdays();
  fetchTeacherBirthdays();

}
  @override
  Widget build(BuildContext context) {
    print("today $todayTeacherBirthday");
    print("Upcoming $upcomingteachersBirthday");
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Birthdays",
          style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w500,
            fontSize: size.width * 0.05,
          ),
        ),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height * 0.02),
              _buildFilterButtons(size),
              isLoading? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              ):selectedFilter=="Student"? Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height * 0.01),
                  _buildSectionTitle("Today's", size),
                  SizedBox(height: size.height * 0.01),
                  todayStudentBirthday.isEmpty ? Center(child: const Text("There is No Today Birthday")) :
                  ListView.builder(
                    shrinkWrap: true,
                    itemCount: todayStudentBirthday.length,
                    itemBuilder: (context, index) {

                      final particularCard = todayStudentBirthday[index];

                      print( "${particularCard["DOB"].split("-")[0]}");
                      return Card(
                        elevation: 3,
                        margin: EdgeInsets.only(bottom: size.height * 0.01),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        child: Padding(
                          padding: EdgeInsets.all(size.width * 0.03),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: size.width * 0.08,
                                backgroundImage: NetworkImage(particularCard["profileLink"]?? "Unknown"),
                              ),
                              SizedBox(width: size.width * 0.03),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      particularCard["name"] ?? "Unknown",
                                      style: GoogleFonts.openSans(
                                        color: Color(0xFF045156),
                                        fontSize: size.width * 0.045,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    Text(
                                      particularCard["currentClass"]?? "Unknown",
                                      style: GoogleFonts.openSans(
                                        color: Color(0xFF045156),
                                        fontSize: size.width * 0.035,
                                      ),
                                    ),
                                    Text(
                                      "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
                                      style: GoogleFonts.openSans(
                                        color: Color(0xFF045156),
                                        fontSize: size.width * 0.035,
                                      ),
                                    ),
                                    Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
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
                                icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
                                label: Text(
                                  "Message",
                                  style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
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
                      );
                    },),

                  _buildSectionTitle("Days To Go", size),
                  SizedBox(height: size.height * 0.01),
                  upcomingStudentBirthday.isEmpty ? Center(child: const Text("There is No Upcoming Birthday Found")) :
                  SizedBox(
                    height: size.height*0.53,
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: upcomingStudentBirthday?.length,
                      itemBuilder: (context, index) {
                        final particularCard=upcomingStudentBirthday?[index];
                        return Card(
                          elevation: 3,
                          margin: EdgeInsets.only(bottom: size.height * 0.01),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          child: Padding(
                            padding: EdgeInsets.all(size.width * 0.03),
                            child: Row(
                              children: [
                                CircleAvatar(
                                  radius: size.width * 0.08,
                                  backgroundImage: NetworkImage(particularCard["profileLink"] ?? ""),
                                ),
                                SizedBox(width: size.width * 0.03),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        particularCard["name"]?? "Unknown",
                                        style: GoogleFonts.openSans(
                                          color: Color(0xFF045156),
                                          fontSize: size.width * 0.045,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      Text(
                                        particularCard["currentClass"]?? "UnknownClass",
                                        style: GoogleFonts.openSans(
                                          color: Color(0xFF045156),
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      Text(
                                        "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
                                        style: GoogleFonts.openSans(
                                          color: Color(0xFF045156),
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
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
                                  icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
                                  label: Text(
                                    "Message",
                                    style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
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
                        );
                      },
                    ),
                  ),
                ],
              ):Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height * 0.02),
                  _buildSectionTitle("Today's", size),
                  SizedBox(height: size.height * 0.01),
                  todayTeacherBirthday.isEmpty ? Center(child: const Text("There is No Today Birthday")):
                  ListView.builder(
                    shrinkWrap: true,
                    itemCount: todayTeacherBirthday.length,
                    itemBuilder: (context, index) {

                      final particularCard=todayTeacherBirthday[index];
                      print( "${particularCard["DOB"].split("-")[0]}");
                      return Card(
                        elevation: 3,
                        margin: EdgeInsets.only(bottom: size.height * 0.01),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        child: Padding(
                          padding: EdgeInsets.all(size.width * 0.03),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: size.width * 0.08,
                                backgroundImage: NetworkImage(particularCard["profileLink"]?? ""),
                              ),
                              SizedBox(width: size.width * 0.03),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      particularCard["name"]?? "Unknown",
                                      style: GoogleFonts.openSans(
                                        color: Color(0xFF045156),
                                        fontSize: size.width * 0.045,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    Text(
                                      particularCard["currentClass"] ?? "Unknown",
                                      style: GoogleFonts.openSans(
                                        color: Color(0xFF045156),
                                        fontSize: size.width * 0.035,
                                      ),
                                    ),
                                    Text(
                                      "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
                                      style: GoogleFonts.openSans(
                                        color: Color(0xFF045156),
                                        fontSize: size.width * 0.035,
                                      ),
                                    ),
                                    Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
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
                                icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
                                label: Text(
                                  "Message",
                                  style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
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
                      );
                    },),
                  SizedBox(height: size.height * 0.02),
                  _buildSectionTitle("Days To Go", size),
                  SizedBox(height: size.height * 0.01),
                  upcomingteachersBirthday.isEmpty ? Center(child: const Text("There is No Upcoming Birthday Found")):
                  SizedBox(
                    height: size.height*0.53,
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: upcomingteachersBirthday.length,
                      itemBuilder: (context, index) {
                        final particularCard=upcomingteachersBirthday[index];
                        return Card(
                          elevation: 3,
                          margin: EdgeInsets.only(bottom: size.height * 0.01),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          child: Padding(
                            padding: EdgeInsets.all(size.width * 0.03),
                            child: Row(
                              children: [
                                CircleAvatar(
                                  radius: size.width * 0.08,
                                  backgroundImage: NetworkImage(particularCard["profileLink"]?? ""),
                                ),
                                SizedBox(width: size.width * 0.03),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        particularCard["name"]?? "Unknown",
                                        style: GoogleFonts.openSans(
                                          color: Color(0xFF045156),
                                          fontSize: size.width * 0.045,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      Text(
                                        particularCard["currentClass"]?? "Unknown",
                                        style: GoogleFonts.openSans(
                                          color: Color(0xFF045156),
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      Text(
                                        "Birthday: ${particularCard["DOB"].split("-")[0]?? "Unknown"}",
                                        style: GoogleFonts.openSans(
                                          color: Color(0xFF045156),
                                          fontSize: size.width * 0.035,
                                        ),
                                      ),
                                      Text("Send a Birthday wish to ${particularCard["name"]?? "Unknown"}...",
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
                                  icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
                                  label: Text(
                                    "Message",
                                    style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
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
                        );
                      },
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFilterButtons(Size size) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: ['Teacher', 'Student'].map((filter) {
        return Padding(
          padding: EdgeInsets.only(right: size.width * 0.02),
          child: ElevatedButton(
            onPressed: () {
              setState((){
                selectedFilter = filter;
              });

            },

            style: ElevatedButton.styleFrom(
              backgroundColor: selectedFilter == filter
                  ? themeObj.primayColor
                  : Color.fromRGBO(209, 213, 219, 1),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),

              ),
            ),
            child: Text(
              filter,
              style: GoogleFonts.openSans(
                color: themeObj.textBlack,
                fontWeight: FontWeight.w400,
                fontSize: size.width * 0.035,
              ),
            ),
          ),
        );
      }).toList(),
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