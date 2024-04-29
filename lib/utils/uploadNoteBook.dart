import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class UploadNoteBook extends StatefulWidget {
  const UploadNoteBook({super.key, required this.studentName, required this.sRollNo});
  final String studentName;
  final int sRollNo;

  @override
  State<UploadNoteBook> createState() => _UploadNoteBookState();
}

class _UploadNoteBookState extends State<UploadNoteBook> {

  bool isSwitched= false;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      child: SizedBox(
        height: size.height*0.081,
        child: ListTile(
          leading: Icon(CupertinoIcons.profile_circled,size: size.height*0.05,color: Colors.black,),
          title: AutoSizeText(widget.studentName,style: GoogleFonts.openSans(fontSize:size.width*0.035,fontWeight:FontWeight.w400,),),
          subtitle: AutoSizeText(widget.sRollNo.toString(),style: GoogleFonts.openSans(fontSize:size.width*0.035,fontWeight:FontWeight.w400,),),
          trailing: Switch(
                value: isSwitched,
                activeColor: Colors.green,
                onChanged: (bool value) {
                  setState(() {
                    isSwitched=value;
                  });
                }
                ),
        )
      ),
    );
  }
}
