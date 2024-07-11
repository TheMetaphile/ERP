import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AllClassesTile extends StatelessWidget {
  const AllClassesTile({super.key, required this.clas});
final String clas;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      margin: const EdgeInsets.all(0),
    color: Colors.white,
      child: ListTile(
        title:   Text( clas,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black,fontWeight:FontWeight.w500),),
        trailing: TextButton(
          onPressed: (){},
        child: Text( "View Details",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.blue,fontWeight:FontWeight.w500),),

        ),
      ),
    );
  }
}
