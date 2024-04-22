import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class birthday extends StatefulWidget {
  const birthday({super.key});

  @override
  State<birthday> createState() => _birthdayState();
}

class _birthdayState extends State<birthday> {
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
        title: Text("Birthdays",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.only(topRight: Radius.circular(25),topLeft: Radius.circular(25))),
        margin: EdgeInsets.only(top: size.height*0.05),
        child: SizedBox(
          width: size.width*1,
          height: size.height*1,
          child: Padding(
            padding:  EdgeInsets.all(8.0),
            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: size.height*0.02,),
                Padding(
                  padding: const EdgeInsets.only(left: 8.0),
                  child: Text("Birthdays Todays",style: TextStyle(fontSize: size.width*0.05),),
                ),
                SizedBox(height: size.height*0.02,),
               Expanded(
                 child: ListView.builder(
                   shrinkWrap: true,
                   itemCount: 10,
                   itemBuilder: (context, index) {
                   return  Card(
                     elevation: 5,
                     child: Row(
                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
                       children: [
                         SizedBox(
                             height: size.height*0.1,
                             child: Image.asset("assets/Images/Test Account.png",fit: BoxFit.fill,)),
                         Column(
                           crossAxisAlignment: CrossAxisAlignment.start,
                           children: [
                             Text("Abhishek",style: TextStyle(color: Color(0xFF045156),fontSize: size.height*0.025),),
                             Text("11th'A'",style: TextStyle(color: Color(0xFF045156),fontSize: size.height*0.015),),
                             Text("Birthday :5th of May",style: TextStyle(color: Color(0xFF045156),fontSize: size.height*0.015),),
                             Text("Its Today",style: TextStyle(color: Color(0xFF1FE23E),fontSize: size.height*0.015),),
                 
                           ],
                         ),
                         TextButton(
                           onPressed: (){},
                           style: TextButton.styleFrom(shape: RoundedRectangleBorder()),
                           child: Row(
                             mainAxisAlignment: MainAxisAlignment.spaceBetween,
                             children: [
                               SizedBox(
                                   height: size.height*0.1,
                                   child: Image.asset("assets/Images/Frame 52.png",fit: BoxFit.contain,width: size.width*0.3,)),
                             ],
                           ),
                         )
                       ],
                     ),
                   );
                 },),
               ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
