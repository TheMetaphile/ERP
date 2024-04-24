import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ChatMessageScreen extends StatefulWidget {
  const ChatMessageScreen({super.key});

  @override
  State<ChatMessageScreen> createState() => _ChatMessageScreenState();
}

class _ChatMessageScreenState extends State<ChatMessageScreen> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color: Colors.white,),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Hi Ankit",style: GoogleFonts.openSans(fontWeight:FontWeight.w600,fontSize:size.width*0.05,color:Colors.white),),
            Text("Lets see what can i do for you ? ",style: GoogleFonts.openSans(fontWeight:FontWeight.w600,fontSize:size.width*0.045,color:Colors.white),),

          ],
        ),
      ),
      
    );
  }
}
