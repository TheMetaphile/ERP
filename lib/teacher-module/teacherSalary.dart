import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../utils/theme.dart';
class TeacherSalary extends StatefulWidget {
  const TeacherSalary({super.key});

  @override
  State<TeacherSalary> createState() => _TeacherSalaryState();
}

class _TeacherSalaryState extends State<TeacherSalary> {

   Map<String, String> personalInfo={
    "Name":"Abhilasha",
     "Mobile":"7302104299",
     "Payment Type":"Monthly",
     "Salary Amount":"₹ 1000",
     "Duration":"01-02-2022",
     "Total Payable Days":"25",
     "Amount Per Day":"₹ 300",
  };
  Map<String, String> earningInfo= {
    "Basic Sallay":"₹ 9000",
    "Bonus":"₹ 1000",
    "Allowance":"0",
    "Over Time":"0",
  };
  Map<String, String> deductionInfo= {
    "ESI Contribution":"₹ 500",
    "PF Contribution":"₹ 500",
    "Advance":"0",
    "Loan":"0",
    "Penalties":"0",
  };
  String showWidget = "Deductions";
   CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: themeObj.primayColor,
        title: Text("Salary",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 3.0),
          child: Column(
            children: [
              SizedBox(height: size.height*0.01,),
              Card(
                margin: const EdgeInsets.all(0),
                shape :RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: [
                    SizedBox(height: size.height*0.01,),
                    Card(
                      color: const Color(0xFFEEF3F7),
                      margin:EdgeInsets.all(0),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 5.0,),
                        width: size.width*0.4,
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text("March 2022",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),),
                            IconButton(onPressed: (){}, icon: Icon(Icons.calendar_month,color: themeObj.textgrey,))
                          ],
                        ),
                      ),
                    ),
                    SizedBox(height: size.height*0.02,),
                    ListView.builder(
                      shrinkWrap: true,
                      itemCount: personalInfo.length,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 15.0,bottom: 5),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                width: size.width*0.35,
                                child:   Text(personalInfo.keys.toList()[index],textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),

                              ),
                              SizedBox(
                                  width: size.width*0.27,
                                  child: Text(personalInfo.values.toList()[index],textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),

                            ],
                          ),
                        );
                      },)

                  ],
                ),
              ),
              SizedBox(height: size.height*0.015,),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: themeObj.secondayColor,),
                  onPressed: (){},
                  child: Text("Download Sallary Slip",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack,fontWeight:FontWeight.w500),)
              ),
              SizedBox(height: size.height*0.015,),
              Card(
                shape :RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: [
                    SizedBox(height: size.height*0.01,),
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0,bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            width: size.width*0.35,
                            child:   Text("Earning",textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF564FFF)),),

                          ),
                          SizedBox(
                              width: size.width*0.27,
                              child: Text("₹ 5000",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF564FFF),))),

                        ],
                      ),
                    ),
                    ListView.builder(
                      shrinkWrap: true,
                      itemCount: earningInfo.length,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 15.0,bottom: 5),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                width: size.width*0.35,
                                child:   Text(earningInfo.keys.toList()[index],textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),),

                              ),
                              SizedBox(
                                  width: size.width*0.27,
                                  child: Text(earningInfo.values.toList()[index],textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),)),

                            ],
                          ),
                        );
                      },)

                  ],
                ),
              ),
              SizedBox(height: size.height*0.015,),
              Card(
                shape :RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(12)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: [
                    SizedBox(height: size.height*0.01,),
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0,bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            width: size.width*0.35,
                            child:   Text("Deduction",textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF564FFF)),),

                          ),
                          SizedBox(
                              width: size.width*0.27,
                              child: Text("₹ 5000",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF564FFF),))),

                        ],
                      ),
                    ),
                    ListView.builder(
                      shrinkWrap: true,
                      itemCount: earningInfo.length,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(left: 15.0,bottom: 5),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                width: size.width*0.35,
                                child:   Text(deductionInfo.keys.toList()[index],textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),),

                              ),
                              SizedBox(
                                  width: size.width*0.27,
                                  child: Text(deductionInfo.values.toList()[index],textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:themeObj.textBlack),)),

                            ],
                          ),
                        );
                      },)

                  ],
                ),
              ),
              Card(
                shape :RoundedRectangleBorder(side: BorderSide(color: themeObj.textgrey,width: 1),borderRadius: BorderRadius.circular(12)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0,bottom: 5,top: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            width: size.width*0.55,
                            child:   Text("Total Amount To Pay:",textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF13BD0F)),),

                          ),
                          SizedBox(
                              width: size.width*0.27,
                              child: Text("₹ 9000",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF13BD0F),))),

                        ],
                      ),
                    ),
                    SizedBox(height: size.height*0.01,),
                    Padding(
                      padding: const EdgeInsets.only(left: 15.0,bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            width: size.width*0.35,
                            child:   Text("Salary Paid:",textAlign:TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF13BD0F)),),

                          ),
                          SizedBox(
                              width: size.width*0.27,
                              child: Text("₹ 9000",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Color(0xFF13BD0F),))),

                        ],
                      ),
                    ),

                  ],
                ),
              ),
              SizedBox(
                height: size.height*0.02,
              )

            ],
          ),
        ),
      ),
    );
  }
}
// class Earning extends StatelessWidget{
//   @override
//   Widget build(BuildContext context){
//     Size size  = MediaQuery.of(context).size;
//     return SingleChildScrollView(
//       scrollDirection: Axis.vertical,
//       child: Padding(
//         padding:  EdgeInsets.only(top: size.height*0.02,right: size.width*0.02,left: size.width*0.02),
//         child: Column(
//           children: [
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Text("Basic",style: TextStyle(fontSize: size.height*0.025),),
//                 Text("1,200",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//               ],
//             ),
//            Column(
//              children: [
//                Container(
//                  height: size.height*0.06,
//                  decoration: BoxDecoration(
//                    color: Colors.white,
//                    border: Border.all(color: Colors.grey,width: 1),
//                    borderRadius: BorderRadius.circular(8),
//                    boxShadow: [
//                      BoxShadow(
//                        color: Colors.grey.withOpacity(1),
//                        spreadRadius: 0,
//                        blurRadius: 5,
//                        offset: Offset(0, 6), // Adjust the vertical offset as needed
//                      ),
//                    ],
//                  ),
//                  child: Padding(
//                    padding:  EdgeInsets.only(left: size.width*0.02,right: size.width*0.02),
//                    child: Row(
//                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                      children: [
//                        Text("Inncentive Pay",style: TextStyle(fontSize: size.height*0.025),),
//                        Text("100",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//                      ],
//                    ),
//                  ),
//                ),
//                SizedBox(
//                  height: size.height*0.02,
//                ),
//                Container(
//                  height: size.height*0.06,
//                  decoration: BoxDecoration(
//                    color: Colors.white,
//                    border: Border.all(color: Colors.grey,width: 1),
//                    borderRadius: BorderRadius.circular(8),
//                    boxShadow: [
//                      BoxShadow(
//                        color: Colors.grey.withOpacity(1),
//                        spreadRadius: 0,
//                        blurRadius: 5,
//                        offset: Offset(0, 6), // Adjust the vertical offset as needed
//                      ),
//                    ],
//                  ),
//                  child: Padding(
//                    padding:  EdgeInsets.only(left:size.width*0.02,right:size.width*0.02),
//                    child: Row(
//                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                      children: [
//                        Text("Meal Allowance",style: TextStyle(fontSize: size.height*0.025),),
//                        Text("100",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//                      ],
//                    ),
//                  ),
//                ),
//                SizedBox(
//                  height: size.height*0.02,
//                ),
//                Container(
//                  height: size.height*0.06,
//                  decoration: BoxDecoration(
//                    color: Colors.white,
//                    border: Border.all(color: Colors.grey,width: 1),
//                    borderRadius: BorderRadius.circular(8),
//                    boxShadow: [
//                      BoxShadow(
//                        color: Colors.grey.withOpacity(1),
//                        spreadRadius: 0,
//                        blurRadius: 5,
//                        offset: Offset(0, 6), // Adjust the vertical offset as needed
//                      ),
//                    ],
//                  ),
//                  child: Padding(
//                    padding:  EdgeInsets.only(left: size.width*0.02,right: size.width*0.02),
//                    child: Row(
//                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                      children: [
//                        Text("Over Time",style: TextStyle(fontSize: size.height*0.025),),
//                        Text("500",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//                      ],
//                    ),
//                  ),
//                ),
//                SizedBox(
//                  height: size.height*0.015,
//                ),
//                Divider(color: Colors.grey,indent: 12,endIndent: 12),
//                Row(
//                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                  children: [
//                    Text("Total",style: TextStyle(fontSize: size.height*0.03),),
//                    Text("15,500",style: TextStyle(fontSize: size.height*0.03,color: Colors.grey),)
//                  ],
//                ),
//
//              ],
//            )
//           ],
//
//         ),
//       ),
//     );
//   }
//
// }
// class Deductions extends StatelessWidget{
//   @override
//   Widget build(BuildContext context){
//     Size size  = MediaQuery.of(context).size;
//     return SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//       child: Padding(
//         padding:  EdgeInsets.only(top: size.height*0.02,right: size.width*0.02,left: size.width*0.02),
//         child: Column(
//           children: [
//             Container(
//               height: size.height*0.06,
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 border: Border.all(color: Colors.grey,width: 1),
//                 borderRadius: BorderRadius.circular(8),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(1),
//                     spreadRadius: 0,
//                     blurRadius: 5,
//                     offset: Offset(0, 6), // Adjust the vertical offset as needed
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding:  EdgeInsets.only(left: size.width*0.02,right: size.width*0.02),
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: [
//                     Text("Provident Fund",style: TextStyle(fontSize: size.height*0.025,),),
//                     Text("100",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//                   ],
//                 ),
//               ),
//             ),
//             SizedBox(
//               height: size.height*0.02,
//             ),
//             Container(
//               height: size.height*0.06,
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 border: Border.all(color: Colors.grey,width: 1),
//                 borderRadius: BorderRadius.circular(8),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(1),
//                     spreadRadius: 0,
//                     blurRadius: 5,
//                     offset: Offset(0, 6), // Adjust the vertical offset as needed
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding:  EdgeInsets.only(left:  size.width*0.02,right:  size.width*0.02),
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: [
//                     Text("Professional Tax",style: TextStyle(fontSize: size.height*0.025),),
//                     Text("100",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//                   ],
//                 ),
//               ),
//             ),
//             SizedBox(
//               height: size.height*0.02,
//             ),
//             Container(
//               height: size.height*0.06,
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 border: Border.all(color: Colors.grey,width: 1),
//                 borderRadius: BorderRadius.circular(8),
//                 boxShadow: [
//                   BoxShadow(
//                     color: Colors.grey.withOpacity(1),
//                     spreadRadius: 0,
//                     blurRadius: 5,
//                     offset: Offset(0, 6), // Adjust the vertical offset as needed
//                   ),
//                 ],
//               ),
//               child: Padding(
//                 padding:  EdgeInsets.only(left:  size.width*0.02,right:  size.width*0.02),
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: [
//                     Text("Canteen",style: TextStyle(fontSize: size.height*0.025),),
//                     Text("500",style: TextStyle(fontSize: size.height*0.025,color: Colors.grey),)
//                   ],
//                 ),
//               ),
//             ),
//             SizedBox(
//               height: size.height*0.02,
//             ),
//             Divider(color: Colors.grey,indent: 12,endIndent: 12),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Text("Total",style: TextStyle(fontSize: size.height*0.03),),
//                 Text("15,500",style: TextStyle(fontSize: size.height*0.03,color: Colors.grey),)
//               ],
//             ),
//
//           ],
//
//         ),
//       ),
//     );
//   }
//
// }