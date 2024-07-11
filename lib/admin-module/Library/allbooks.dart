import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/admin-module/Library/particularBookDetail.dart';

import '../admin Utils/allBookTile.dart';

class AllBooks extends StatefulWidget {
  const AllBooks({super.key});

  @override
  State<AllBooks> createState() => _AllBooksState();
}

class _AllBooksState extends State<AllBooks> {
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
 TextEditingController writer=TextEditingController();
 TextEditingController bookName=TextEditingController();
 TextEditingController subject=TextEditingController();
 TextEditingController idNo=TextEditingController();
 TextEditingController bookAddition=TextEditingController();
 TextEditingController clas=TextEditingController();
  DateTime? selectedDate;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }
Future<void>_bookOpenPopup( BuildContext context ,Size size)async {
    return showDialog(
      context: context,
      builder: (context) {
      return  StatefulBuilder(
      builder: (context, setState) {
        return  Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  margin: EdgeInsets.all(0),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Book Name *",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              height: size.height*0.055,
                              child: TextField(

                                maxLines: 1,

                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: bookName,
                              ),

                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Subject*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              height: size.height*0.055,
                              child: TextField(

                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: subject,
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Writer",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: writer,
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Id No.*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: idNo,
                              ),

                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Book Addition*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: bookAddition,
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Class*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                              height: size.height*0.055,
                              child: TextField(
                                maxLines: 1,
                                decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: BorderSide(color: Colors.grey))
                                ),
                                controller: clas,
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Upload Date*",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                            SizedBox(height: size.height*0.01,),
                            Container(
                                height: size.height*0.055,
                                width: size.width,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: Colors.grey)

                                ),
                                child: TextButton(
                                  onPressed: (){
                                    _selectDate(context).then((_) {
                                      setState(() {});
                                    });
                                  },
                                  child:  selectedDate==null?
                                  Text("Please Select",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),):
                                  Text("${selectedDate.toString()}",textAlign: TextAlign.start,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),

                                )
                            )
                          ],
                        ),
                        SizedBox(height: size.height*0.02,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6F8DF8),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){},
                                  child: Text("Reset",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),
                            Container(
                              width: size.width*0.3,
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                  onPressed: (){
                                    Navigator.pop(context);
                                  },
                                  child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                            ),

                          ],
                        ),
                      ],
                    ),
                  ),
                ),


              ],
            ),

          ],
        );
      },
      );

    },);

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
                _bookOpenPopup(context,size);
              }, child: Text("Add Book",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.white),)))
        ],
        backgroundColor: Colors.transparent,
        title: Text("All Books",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
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
                                  Navigator.push(context, MaterialPageRoute(builder: (context) => ParticularBookDetail(),));

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
