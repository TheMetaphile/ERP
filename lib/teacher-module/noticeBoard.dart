import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class NoticeBoard extends StatefulWidget {
  const NoticeBoard({super.key});

  @override
  State<NoticeBoard> createState() => _NoticeBoardState();
}

class _NoticeBoardState extends State<NoticeBoard> {


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        title: Text("Notice Board",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
      ),

      body: Card(

        shape: RoundedRectangleBorder(borderRadius: BorderRadius.only(topRight: Radius.circular(25),topLeft: Radius.circular(25))),
        margin: EdgeInsets.only(top: size.height*0.05),
        child: Container(
          padding: EdgeInsets.all(12),
          width: size.width,
          height: size.height*1,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height*0.02,),
              Text("New",style: TextStyle(fontWeight: FontWeight.w600,fontSize: size.width*0.05),),
              SizedBox(height: size.height*0.02,),
              Expanded(
                child: ListView.builder(
                  itemCount: 10,
                 itemBuilder: (context, index) {
                   return  Column(
                     children: [
                       Card(
                         margin: EdgeInsets.all(0),
                         color: Color(0xFFCCFFD1),
                         child: Padding(
                           padding:  EdgeInsets.all(size.height*0.02),
                           child: Text("All the Teacher are inform that complete your syllabus as soon as possible.And should also maintain the discipline in your classes",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w500,fontSize: size.width*0.035),),
                         ),
                       ),
                       SizedBox(height: size.height*0.02,)
                     ],
                   );

                 },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
