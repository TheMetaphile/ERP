import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/admin-module/TeacherPannel/teacherEditScreen.dart';

import '../../APIs/TeacherData/TeacherApi.dart';
import '../../Charts/classActivity.dart';
import '../../utils/theme.dart';

class TeacherDetails extends StatefulWidget {
  const TeacherDetails({super.key, required this.employeID, required this.name, required this.profileLink});
  final  String employeID;
  final String name;
  final dynamic profileLink;

  @override
  State<TeacherDetails> createState() => _TeacherDetailsState();
}

class _TeacherDetailsState extends State<TeacherDetails> {
  List<Map<String, String>> cardType=[
    {
      "type":"Monthly Salary",
      "number":"Rs.18000"
    },
    {
      "type":"Average Rating",
      "number":"7.9/10"
    },
    {
      "type":"Experience",
      "number":"4 Years"
    },
  ];


  @override
  void initState() {
    super.initState();
    //
    // fetchTeacherData();
  }
  Map<String, dynamic>? _userDetails;
  final TeacherApiObj=TeacherApi();


//   Future<void> fetchTeacherData() async {
//
//   SharedPreferences pref=await SharedPreferences.getInstance();
//   try {
//   final accessToken = pref.getString("accessToken");
//   final teachers = await TeacherApiObj.fetchTeacherData(accessToken!,widget.employeID);
//   setState(() {
//     _userDetails=teachers;
//   });
//   } catch (e) {
//   print('Error: $e');
//   }
// }
//   List<List<String>>teacherDetails=[];
// void assign(){
//   teacherDetails=[
//     ["Monthly Salary","Rs. 18000"],
//     ["Experience",_userDetails?['experience'] ?? ''],
//     ["Phone No",'(+91) ${_userDetails?['phoneNumber'] ?? ''}'],
//     ["Email",_userDetails?['email'] ?? ''],
//     ["Address",_userDetails?['permanentAddress'] ?? ''],
//     ["Education",_userDetails?['education'] ?? ''],
//   ];
// }
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {

    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme: IconThemeData(color: themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:   Text("Teacher Details",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

      ),
      body:SingleChildScrollView(

        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: size.height*0.01,),
              GridView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: cardType.length,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount( childAspectRatio: 1.5,crossAxisCount: 2,crossAxisSpacing: size.width*0.02),
                itemBuilder: (context, index) {
                  final cardCategory=cardType[index];
                  return  Card(
                    color:Color(0xFFB3FCF9),
                    child: Container(
                      child: TextButton(
                        onPressed: (){},
                        child:    Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(cardCategory["type"]!,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:themeObj.textBlack),),
                            Text(cardCategory["number"]!,style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),

                          ],
                        )
                      ),
                    ),
                  );
                },),
              TeacherDetailsCard()


            ],
          ),
        ),
      ),
    );
  }

}
class TeacherDetailsCard extends StatelessWidget {
  CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Basic Details',
              style: GoogleFonts.openSans(color: themeObj.textBlack,fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('assets/teacher_image.jpg'),
            ),
            SizedBox(height: 16),
            Text(
              'Bhuvneshwar Tyagi',
              style:  GoogleFonts.openSans(color: themeObj.textBlack,fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text(
              'Maths & Science Teacher',
              style:  GoogleFonts.openSans(color: themeObj.textgrey,fontSize: 14, ),
            ),
            SizedBox(height: 16),
            _buildInfoTile(Icons.phone, 'Phone:', '8888855555'),
            _buildInfoTile(Icons.email, 'Email:', 'bhanu68tyagi@gmail.com'),
            _buildInfoTile(Icons.location_on, 'Address:', 'Ghar'),
            _buildInfoTile(Icons.school, 'Education:', 'B.Tech'),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoTile(IconData icon, String label, String value) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, size: 20),
          SizedBox(width: 8),
          Expanded(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label,overflow: TextOverflow.ellipsis, style:  GoogleFonts.openSans(fontWeight: FontWeight.bold)),
                Text(value, style:  GoogleFonts.openSans(fontWeight: FontWeight.w300)),
                Icon(Icons.edit, size: 16),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

