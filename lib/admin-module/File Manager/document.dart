import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FileMangerDocuments extends StatefulWidget {
  const FileMangerDocuments({super.key});

  @override
  State<FileMangerDocuments> createState() => _FileMangerDocumentsState();
}

class _FileMangerDocumentsState extends State<FileMangerDocuments> {
  final List<String> _items = ['All Documents', 'All Videos','School Photos','Attendace List'];
  @override
  Widget build(BuildContext context) {

    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,),
        ),
        title:  Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("File Manger",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),
            Text("Welcome Back, Admin",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.white,fontWeight:FontWeight.w400),),

          ],
        ),

      ),
      body:secondStackLayer(size,context),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {


    return SingleChildScrollView(

      child: Column(

        children: [
          SizedBox(
            height: size.height * 0.04,
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
            child:  Container(
              width: size.width,
              height: size.height,
              child: Column(
                children: [
                  Card(
                    margin: EdgeInsets.all(8),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("Recently Added",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),),
                              TextButton(
                                  onPressed: () {  },
                                  child: Text("View all",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.blue,fontWeight:FontWeight.w400),)),

                            ],
                          ),
                          SizedBox(height: size.height*0.02,),
                          ListView.separated(
                            shrinkWrap: true,
                            itemCount: _items.length,
                            physics: NeverScrollableScrollPhysics(),
                            separatorBuilder: (context, index) => Divider(
                              height: 1,
                              color: Colors.grey,
                            ),
                            itemBuilder: (context, index) {
                              return ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.purple,
                                  child: Icon(
                                    index == 1 ?  Icons.videocam:Icons.insert_drive_file,
                                    color: Colors.white,
                                  ),
                                ),
                                title: Text(_items[index]),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  Card(
                    margin: EdgeInsets.all(8),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("Your File",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),),
                              TextButton(
                                  onPressed: () {  },
                                  child: Text("View all",style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.blue,fontWeight:FontWeight.w400),)),

                            ],
                          ),
                          Container(
                            decoration: const BoxDecoration(
                                color:Color(0xFFE9F0FF),
                                borderRadius: BorderRadius.only(topLeft: Radius.circular(12),topRight: Radius.circular(12))

                            ),
                            padding: EdgeInsets.symmetric(horizontal: 10),

                            child:Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                SizedBox(

                                    width:size.width*0.2,
                                    child: Text("Name",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black,fontWeight:FontWeight.w400),)),
                                SizedBox(

                                    width:size.width*0.22,
                                    child: Text("Size",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black,fontWeight:FontWeight.w400),)),
                                SizedBox(

                                    width:size.width*0.27,
                                    child: Text("Last Modified",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black,fontWeight:FontWeight.w400),)),
                              ],
                            ),
                          ),

                          ListView.builder(
                            shrinkWrap: true,
                            itemCount: 5,
                            physics: NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                            return        Container(

                              padding: EdgeInsets.symmetric(horizontal: 10,vertical: 8),

                              child:Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  SizedBox(

                                      width:size.width*0.2,
                                      child: Text("Photos",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black,fontWeight:FontWeight.w400),)),
                                  SizedBox(

                                      width:size.width*0.22,
                                      child: Text("2.5MB",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black,fontWeight:FontWeight.w400),)),
                                  SizedBox(

                                      width:size.width*0.27,
                                      child: Text("March13,2023",textAlign: TextAlign.start,overflow: TextOverflow.ellipsis,style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black,fontWeight:FontWeight.w400),)),
                                ],
                              ),
                            );
                          },)

                        ],
                      ),
                    ),
                  ),
                  Card(
                    margin: EdgeInsets.all(8),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      width: size.width,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: size.height*0.02,),
                          Text("Upload File",style: GoogleFonts.openSans(fontSize:size.width*0.045,color:Colors.black,fontWeight:FontWeight.w400),),
                          Center(
                            child: TextButton(

                              onPressed: (){},
                              child: Column(children: [
                                Icon(
                                  Icons.upload_file,
                                  color: Colors.purple,
                                  size: 48.0,
                                ),
                                SizedBox(height: 16.0),
                                Text(
                                  'Drag and drop files, or Browse',
                                  style: TextStyle(
                                    color: Colors.grey,
                                    fontSize: 16.0,
                                  ),
                                ),
                                                    ],)),
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

        ],
      ),
    );
  }
}
