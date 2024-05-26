import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/admin%20Utils/allClassTile.dart';

import '../admin Utils/allBookTile.dart';

class AllClasses extends StatefulWidget {
  const AllClasses({super.key});

  @override
  State<AllClasses> createState() => _AllClassesState();
}

class _AllClassesState extends State<AllClasses> {
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
                  borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white)
              ),
              child: TextButton(
                  style: TextButton.styleFrom(side: BorderSide(width: 1,color: Colors.grey),shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
                  onPressed: (){},
                  child: Row(
                    children: [
                      Text("Edit ",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.white,fontWeight:FontWeight.w500),),
                      Icon(Icons.edit,color: Colors.white,),
                    ],
                  )
              ))
        ],
        backgroundColor: Colors.transparent,
        title: Text("All Classes",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Column(
              children: [
                SizedBox(height: size.height*0.06,),
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
                    child: Padding(
                      padding: const EdgeInsets.all(6.0),
                      child:ListView.builder(
                        itemCount: 20,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return TextButton(

                            onPressed: () {

                            },
                            child:const AllClassesTile(clas: 'Pre-Nursery',),

                          );
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
