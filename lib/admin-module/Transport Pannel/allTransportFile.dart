import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';

class AllTransportFile extends StatefulWidget {
  const AllTransportFile({super.key});

  @override
  State<AllTransportFile> createState() => _AllTransportFileState();
}

class _AllTransportFileState extends State<AllTransportFile> {


      TextEditingController routeNo=TextEditingController();
      TextEditingController vehicleNo=TextEditingController();
      TextEditingController driverName=TextEditingController();
      TextEditingController licenseNo=TextEditingController();
      TextEditingController phoneNo=TextEditingController();

      List<Map<String, String>> transportData=[
        {

          "routeName":"Sector 54",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Sector 64",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Sector 544",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Noida 54",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Noida 64",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Sector 54",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Sector 54",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Sector 54",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },
        {

          "routeName":"Sector 54",
          "vehicleNo":"UP14090909",
          "driverName":"Arun Kumar",
          "driverLicense":"000347278",
          "contact":"9989898989",


        },

      ];
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
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      SizedBox(
                                        width: size.width*0.3,
                                        child: ElevatedButton(
                                            style: ElevatedButton.styleFrom(backgroundColor:Colors.blue,shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                            onPressed: (){},
                                            child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                                      ),
                                      SizedBox(
                                        width: size.width*0.3,
                                        child: ElevatedButton(
                                            style: ElevatedButton.styleFrom(backgroundColor:Color(0XFF6FF87D),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                            onPressed: (){},
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
                }
            );

          },);

      }
  @override
  void initState() {
    super.initState();
  }
      CustomTheme themeObj=CustomTheme();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
        return Scaffold(
          backgroundColor: themeObj.textWhite,
          appBar: AppBar(
            leading: IconButton(
              onPressed: (){
                Navigator.pop(context);
              },
              icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
            ),
            iconTheme:  IconThemeData(color:themeObj.textBlack),
            backgroundColor: themeObj.primayColor,
            title: Text("All Transport List",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
            actions: [
              ElevatedButton(
                onPressed: () {
                  addnewTransportPopup(context,size);
                },
                child: Text("Add New",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.04),),

                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                  backgroundColor:  themeObj.secondayColor,
                ),
              ),
            ],
          ),
          body:    SingleChildScrollView(
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 3),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: size.height*0.01,),
                  Padding(
                    padding: const EdgeInsets.only(left: 50.0),
                    child: Text(
                      'Swipe left and right to see all details',
                      style: GoogleFonts.openSans(
                          fontStyle: FontStyle.italic,
                          color: Colors.grey[600],
                          fontSize: size.width * 0.035),
                    ),
                  ),
                  SizedBox(height: size.height * 0.02),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          color: Color.fromRGBO(233, 213, 255, 1),
                          child: Row(
                            children: [
                              _buildHeaderCell("Route Name", size),
                              _buildHeaderCell("Vehicle Number", size),
                              _buildHeaderCell("Driver Name.", size),
                              _buildHeaderCell("Driver License", size),
                              _buildHeaderCell("Contact", size),
                            ],
                          ),
                        ),
                        const Divider(thickness: 2, height: 2, color: Colors.black),
                        Container(
                          height: size.height * 0.63, // Adjust this value as needed
                          width: size.width * 1.5, // Adjust this value to fit all columns
                          child: ListView.separated(
                            itemBuilder: (context, index) {
                              final data = transportData[index];

                              return InkWell(
                                onTap: (){
                                  //    Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDetail(email: '213',),));
                                },
                                child: Row(
                                  children: [
                                    _buildDataCell(data["routeName"]!, size),
                                    _buildDataCell(data["vehicleNo"]!, size),
                                    _buildDataCell(data["driverName"]!, size),
                                    _buildDataCell(data["driverLicense"]!, size),
                                    _buildDataCell(data["contact"]!, size),

                                  ],
                                ),
                              );
                            },
                            separatorBuilder: (context, index) => Divider(),
                            itemCount: transportData.length,
                          ),
                        )
                      ],
                    ),
                  )

                ],
              ),
        ),
      ),

    );
  }
      Widget _buildHeaderCell(String text, Size size) {
        return Container(
          width: size.width * 0.3,
          padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
          child: Text(
            text,
            style: GoogleFonts.openSans(
              color: themeObj.textBlack,
              fontWeight: FontWeight.w600,
              fontSize: size.width * 0.04,
            ),
          ),
        );
      }

      Widget _buildDataCell(String text, Size size) {
        return Container(

          width: size.width * 0.3,
          padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
          child:  Text(
            text,
            style: GoogleFonts.openSans(
              color: themeObj.textBlack,
              fontWeight: FontWeight.w400,
              fontSize: size.width * 0.035,
            ),
          ),
        );
      }
}
