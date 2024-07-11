import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';
import '../admin Utils/allBookTile.dart';

class AssignSubjectTeacher extends StatefulWidget {
  const AssignSubjectTeacher({super.key});

  @override
  State<AssignSubjectTeacher> createState() => _AssignSubjectTeacherState();
}

class _AssignSubjectTeacherState extends State<AssignSubjectTeacher> {

  @override
  void initState() {
    super.initState();
  }
  CustomTheme themeObj=CustomTheme();
  List<String> classOption = [
    'Pre-Nursery',
    'Nursery',
    'L.K.G',
    'U.K.G',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];
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
        title: Text("Assign Subject Teacher",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body:   SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: size.height*0.01,),
            ListView.separated(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: classOption.length,
              itemBuilder: (context, index) {

                return ExpansionTile(
                  title:Text(classOption[index],style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                  shape: Border.all(color: Colors.transparent),
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 5.0),
                      child: Text("No section added. Please assign Class Teacher First then assign subjects of that class to other teachers",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w300,fontSize: size.width*0.035),),
                    ),

                    // Column(
                    //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    //   children: [
                    //     Container(
                    //       height: size.height*0.045,
                    //       color: Color.fromRGBO(233, 213, 255, 1),
                    //       child: Row(
                    //         mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    //         children: [
                    //           Text("Section",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                    //           Text("Class Teacher",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                    //           Text("Action",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),
                    //
                    //         ],
                    //       ),
                    //     ),
                    //     SizedBox(height: size.height*0.01,),
                    //     Text("No section added",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w300,fontSize: size.width*0.035),),
                    //     SizedBox(height: size.height*0.01,),
                    //     ElevatedButton(
                    //       style: ElevatedButton.styleFrom(backgroundColor: Colors.green,shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                    //       onPressed: () {
                    //
                    //       }, child:  Text("Add section",style: TextStyle(color: themeObj.textWhite,fontWeight: FontWeight.w400,fontSize: size.width*0.035),),
                    //     )
                    //   ],
                    // )

                  ],
                );

              }, separatorBuilder: (context, index) => Divider(),)


          ],
        ),
      ),
    );
  }

}
