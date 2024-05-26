import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../admin Utils/allBookTile.dart';

class AllSubjects extends StatefulWidget {
  const AllSubjects({super.key});

  @override
  State<AllSubjects> createState() => _AllSubjectsState();
}

class _AllSubjectsState extends State<AllSubjects> {
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
  var _flag1 = false;
  var _flag2 = false;

  void listener1() {
    if (_flag2) return;
    _flag1 = true;
    scrollController2.jumpTo(scrollController1.offset);
    _flag1 = false;
  }

  void listener2() {
    if (_flag1) return;
    _flag2 = true;
    scrollController1.jumpTo(scrollController2.offset);
    _flag2=false;
  }

  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios),
        ),
        actions: [
          Container(
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(12)
              ),
              child: TextButton(onPressed: (){

              }, child: Text("Add Subject",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.white),)))
        ],
        backgroundColor: Colors.transparent,
        title: Text("All Subjects",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Column(
              children: [
                SizedBox(height: size.height*0.05,),
                Container(

                  height: size.height*0.08,
                  decoration: const BoxDecoration(
                      color:Color(0xFFE9F0FF),
                      borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))

                  ),
                  padding: EdgeInsets.symmetric(horizontal:13),

                  child:Row(
                    children: [
                      SizedBox(

                          width:size.width*0.32,
                          child: Text("Subject",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                      SizedBox(

                          width:size.width*0.4,
                          child: Text("Writer",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                      SizedBox(

                          child: Text("Class",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                    ],
                  ),
                ),
                Card(
                    color: Colors.white,
                    margin: const EdgeInsets.all(0),
                    shape: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Colors.white
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(6.0),
                      child:ListView.builder(
                        itemCount: 20,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return SizedBox(
                              height: size.height*0.05,
                              child: TextButton(

                                onPressed: () {

                                },
                                child:const AllBookTile(subject: 'Hindi', writer: 'Ankit Sharma', clas: 'IV',),
                              ));
                        },),
                    )

                ),
              ],
            ),
          ),
        ],
      ),

    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.05,
          ),
          Card(
            color: Colors.white,
            elevation: 0,
            margin: const EdgeInsets.all(0),
            shape: const OutlineInputBorder(
                borderSide: BorderSide(
                    color: Colors.white
                ),
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25)
                )
            ),
            child: SizedBox(
              height: size.height * 3,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height * 1,
          )
        ],
      ),
    );
  }
}
