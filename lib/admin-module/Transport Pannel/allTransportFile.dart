import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AllTransportFile extends StatefulWidget {
  const AllTransportFile({super.key});

  @override
  State<AllTransportFile> createState() => _AllTransportFileState();
}

class _AllTransportFileState extends State<AllTransportFile> {
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


      TextEditingController routeNo=TextEditingController();
      TextEditingController vehicleNo=TextEditingController();
      TextEditingController driverName=TextEditingController();
      TextEditingController licenseNo=TextEditingController();
      TextEditingController phoneNo=TextEditingController();
  Future<void>addnewTransportPopup( BuildContext context ,Size size)async {
    return showDialog(
      context: context,
      builder: (context) {
        return  StatefulBuilder(
            builder: (context,setState) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Card(
                        margin: const EdgeInsets.all(0),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: size.height*0.02,),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Add New Transport",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black),),
                                  SizedBox(height: size.height*0.03,),
                                 Row(
                                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                   children: [
                                     SizedBox(
                                 width: size.width*0.4,
                                       height: size.height*0.1,
                                       child: Column(
                                         crossAxisAlignment: CrossAxisAlignment.start,
                                         children: [
                                           Text("Route Name",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                           TextField(
                                             maxLines: 1,
                                             decoration: InputDecoration(
                                                 contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                 border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),

                                                 hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                             ),


                                             controller: routeNo,
                                           ),
                                         ],
                                       ),
                                     ),
                                     SizedBox(
                                       height: size.height*0.1,
                                       width: size.width*0.4,
                                       child: Column(
                                         crossAxisAlignment: CrossAxisAlignment.start,
                                         children: [
                                         Text("Vehicle No",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                           TextField(
                                             maxLines: 1,
                                             decoration: InputDecoration(
                                                 contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                 border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),
                                                 hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                             ),


                                             controller: vehicleNo,
                                           ),
                                         ],
                                       ),
                                     ),
                                   ],
                                 ),
                                  SizedBox(height: size.height*0.01,),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      SizedBox(
                                        width: size.width*0.4,
                                        height: size.height*0.1,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text("Driver Name",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                            TextField(
                                              maxLines: 1,
                                              decoration: InputDecoration(
                                                  contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),

                                                  hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                              ),


                                              controller: driverName,
                                            ),
                                          ],
                                        ),
                                      ),
                                      SizedBox(
                                        height: size.height*0.1,
                                        width: size.width*0.4,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text("License No.",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                            TextField(
                                              maxLines: 1,
                                              decoration: InputDecoration(
                                                  contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),
                                                  hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                              ),


                                              controller: licenseNo,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: size.height*0.01,),
                                  SizedBox(
                                    height: size.height*0.1,
                                    width: size.width*0.4,
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text("Phone No.",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),),
                                        TextField(
                                          maxLines: 1,
                                          decoration: InputDecoration(
                                              contentPadding: const EdgeInsets.symmetric(vertical: 8.0,horizontal: 5),
                                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8),borderSide: const BorderSide(color: Colors.grey)),
                                              hintStyle: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey,)

                                          ),


                                          controller: phoneNo,
                                        ),
                                      ],
                                    ),
                                  ),

                                ],
                              ),

                              SizedBox(height: size.height*0.02,),
                              Center(
                                child: SizedBox(
                                  width: size.width*0.3,
                                  child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                      onPressed: (){},
                                      child: Text("Save",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),


                    ],
                  ),

                ],
              );
            }
        );

      },);

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
        backgroundColor: Colors.transparent,
        title: Text("All Transport List",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
        actions: [
          Container(
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(12)
              ),
              child: TextButton(onPressed: (){
                addnewTransportPopup(context,size);
              }, child: Text("Add new",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.white),)))
        ],
      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          SingleChildScrollView(
            controller: scrollController2,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 3),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height*0.055,),
                  Container(

                    height: size.height*0.08,
                    decoration: const BoxDecoration(
                        color:Color(0xFFE9F0FF),
                        borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))

                    ),
                    padding: EdgeInsets.symmetric(horizontal: 10),

                    child:Row(

                      children: [
                        SizedBox(

                            width:size.width*0.26,
                            child: Text("Route",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                        SizedBox(

                            width:size.width*0.35,
                            child: Text("Vehicle No.",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
                        SizedBox(
                            child: Text("Driver",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w400),)),
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
                      child: ListView.builder(
                        itemCount: 15,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return ExpansionTile(
                            shape: const RoundedRectangleBorder(
                                side: BorderSide(color: Colors.transparent)
                            ),
                            leading :SizedBox(

                                child: Text("Hapur",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),)) ,
                            title: Text("UP 37H0403",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
                            trailing: Container(
                              width: size.width*0.3,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text("Abhishek",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.grey),),
                                  Icon(Icons.arrow_drop_down,color: Colors.grey,)
                                ],
                              ),
                            ),
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("Driver License",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black),)) ,
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("056876742",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.grey),)) ,

                                ],
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("Contact No.",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black),)) ,
                                  SizedBox(
                                      width: size.width*0.4,
                                      child: Text("+9154676742",textAlign:TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.grey),)) ,

                                ],
                              ),
                            ],
                          );
                        },)

                  ),

                ],
              ),
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
