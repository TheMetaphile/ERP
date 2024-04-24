import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:untitled/chatScreen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      extendBody: true,
      body: Container(
        height: size.height,
        width: size.width*1,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/Images/background4.jpg"),
            fit: BoxFit.fitHeight
          )
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height*0.07,),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                 Row(
                   children: [
                     Text("Welcome",style: GoogleFonts.openSans(fontSize:size.width*0.08,color:Colors.white,fontWeight:FontWeight.w700),),
                     SizedBox(width: size.width*0.02,),
                     Image.asset("assets/Images/hey2.png",height: size.height*0.05,)

                   ],
                 ),
                  IconButton(
                    onPressed: (){},
                    icon:Icon(CupertinoIcons.profile_circled,color: Colors.white,size: size.width*0.12,),
                  ),
                ],
              ),
            SizedBox(height: size.height*0.1,),
            Text("Our Latest AI Tool",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white),),
          Divider(color: Colors.grey,thickness: 1,),
          SizedBox(height: size.height*0.05,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Card(
                  elevation: 15,
                  color: Colors.white,
                  margin: EdgeInsets.all(0),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 1)),
                  child:  TextButton(
                    onPressed: (){
                      Navigator.push(context, MaterialPageRoute(builder: (context) => ChatMessageScreen(),));
                    },
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5,vertical: 5),
                      width: size.width*0.4,
                      height: size.height*0.33,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Image.asset("assets/Images/chatbot.png",height: size.height*0.2,fit: BoxFit.contain,),
                          SizedBox(height: size.height*0.03,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("Start New\nChat",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w600),),
                              Icon(Icons.arrow_forward,color: Colors.black,),
                            ],
                          )
                        ],
                      ),
                    ),
                  )
              ),
              Column(

                children: [
                  Card(
                      elevation: 10,
                      color: Colors.white,
                      margin: EdgeInsets.all(0),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 1)),
                      child:  TextButton(
                        onPressed: (){},
                        child: Container(
                          padding: EdgeInsets.symmetric(horizontal: 5),
                          width: size.width*0.4,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Image.asset("assets/Images/chatbot.png",height: size.height*0.06,fit: BoxFit.contain,),
                              SizedBox(height: size.height*0.03,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text("Voice\nGenerator",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w600),),
                                  Icon(Icons.arrow_forward,color: Colors.black,),
                                ],
                              )
                            ],
                          ),
                        ),
                      )
                  ),
                  SizedBox(height: size.height*0.02,),
                  Card(

                      elevation: 10,
                      color: Colors.white,
                      margin: EdgeInsets.all(0),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12),side: BorderSide(color: Colors.grey,width: 1)),
                      child:  TextButton(
                        onPressed: () {  },
                        child: Container(
                          width: size.width*0.4,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Image.asset("assets/Images/SearchImageAi.png",height: size.height*0.06,fit: BoxFit.contain,),
                              SizedBox(height: size.height*0.03,),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text("Search by\nImage",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w600),),

                                  Icon(Icons.arrow_forward,color: Colors.black,),
                                ],
                              )
                            ],
                          ),
                        ),
                      )
                  ),                ],
              )
            ],
          )

          ],
        ),
      ),
    );
  }
}
