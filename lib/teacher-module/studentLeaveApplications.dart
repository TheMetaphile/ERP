import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:untitled/teacher-module/studentLeaveApplicationView.dart';


class studentLeaveApplications extends StatefulWidget {
  const studentLeaveApplications({super.key});

  @override
  State<studentLeaveApplications> createState() => _studentLeaveApplicationsState();
}

class _studentLeaveApplicationsState extends State<studentLeaveApplications> {
  // final ItemScrollController itemScrollController = ItemScrollController();
  // final ItemPositionsListener itemPositionsListener = ItemPositionsListener.create();
  //
  // /// Callback function when a letter is selected in the AlphabetSlider.
  // void _onLetterSelect(letter) {
  //   final scrollToIndex = scrollToIndexMap[letter];
  //   if (scrollToIndex != null) {
  //     itemScrollController.jumpTo(index: scrollToIndex);
  //   }
  //   }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Students Leave",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
      ),
      body: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.only(topRight: Radius.circular(25),topLeft: Radius.circular(25))),
        margin: EdgeInsets.only(top: size.height*0.02),

        child: SizedBox(
          width: size.width*1,
          height: size.height*1,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
               Expanded(
                 child: ListView.builder(
                   itemCount: 10,
                   shrinkWrap: true,
                   itemBuilder: (context, index) {
                   return  Card(
                     elevation: 5,
                     child: ExpansionTile(
                       title:  Text("Abhishek from class 11th A want a Leave Request to you...",style: TextStyle(fontSize: size.height*0.02),),
                       leading:  Image.asset("assets/Images/Test Account.png",fit: BoxFit.contain,width: size.width*0.15,),
                       subtitle: Row(
                         mainAxisAlignment: MainAxisAlignment.spaceBetween,
                         children: [
                           Container(
                             height: size.height*0.033,
                             width: size.width*0.25,
                             child: ElevatedButton(
                               style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFCBFCBA)),
                               onPressed: (){},
                               child: Text("Approve",maxLines: 1,style: TextStyle(color: Color(0xFF13D010),fontSize: size.width*0.035),),
                             ),
                           ),
                           Container(
                             height: size.height*0.033,
                             width: size.width*0.25,
                             child: ElevatedButton(
                               style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFFFA2A2)),
                               onPressed: (){},
                               child: Text("Reject",style: TextStyle(color: Colors.red,fontSize: size.width*0.035),),
                             ),
                           ),
                 
                         ],
                       ),
                       children: [
                         Text("Abhishek from class 11th A want a Leave Request to you.sdadad adsad adad ada ada dad adads ada dad ada dwd adad wda da da daw da dw dad adwd a..",style: TextStyle(fontSize: size.height*0.02),),
                       ],
                 
                 
                     ),
                   );
                 },),
               )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
