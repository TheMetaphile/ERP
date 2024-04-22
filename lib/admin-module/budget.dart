import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

class budget extends StatefulWidget {
  const budget({super.key});

  @override
  State<budget> createState() => _budgetState();
}


class _budgetState extends State<budget> {
  final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'debit': '₹ 00',},
    {'name': 'Utilities', 'debit': '₹ 00',},
    {'name': 'Electricity', 'debit': '₹ 00',},
    {'name': 'Furniture', 'debit': '₹ 00',},
    {'name': 'Fuel', 'debit': '₹ 00',},

  ];
  String getPic(String categoryName) {
    switch (categoryName) {
      case 'Transportation':
        return "assets/Images/Public Transportation.png";
      case 'Electricity':
        return "assets/Images/Electricity.png";
      case 'Furniture':
        return "assets/Images/Shop.png";
      case 'Utilities':
        return "assets/Images/Cheque.png";
      case 'Fuel':
        return "assets/Images/Fuel Gas.png";
      default:
        return "null";
    }
  }


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Center(
        child: Container(
          width: size.width*0.9,
          height: size.height*1,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Center(
                child: Text("Budget", style: TextStyle(
                  color: Colors.black,
                  fontSize: size.height*0.035,
                  fontWeight: FontWeight.w600,
                ),),
              ),
            SizedBox(height: size.height*0.06,),
              Center(
                child: Stack(
                  alignment: Alignment.center,
                  children: <Widget>[
                    Container(
                      height: size.height*0.17,
                      width: size.width*0.34,
                      child: CircularProgressIndicator(
                          value: 0,
                          strokeWidth: 15,
                          backgroundColor: Color(0xFFCFCDCD)

                      ),
                    ),
                    Text(
                      'No Budget', // Your text here
                      style: TextStyle(
                        fontSize: size.height*0.02,
                        fontWeight: FontWeight.w400// Adjust font size as needed
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: size.height*0.06,),
              Row(
               mainAxisAlignment: MainAxisAlignment.spaceBetween,
               children: [
                 Column(
                   children: [
                     Text("Total Budget", style: TextStyle(
                       color: Colors.black,
                       fontSize: size.height*0.02,
                       fontWeight: FontWeight.w600,
                     ),),
                     SizedBox(height: size.height*0.007,),
                     Text("Not set", style: TextStyle(
                       color: Colors.grey,
                       fontSize: size.height*0.02,
                       fontWeight: FontWeight.w600,
                     ),),

                   ],
                 ),
                 Column(
                   children: [
                     Text("Total Spent", style: TextStyle(
                       color: Colors.black,
                       fontSize: size.height*0.02,
                       fontWeight: FontWeight.w600,
                     ),),
                     SizedBox(height: size.height*0.007,),
                     Text("0.00", style: TextStyle(
                       color: Colors.grey,
                       fontSize: size.height*0.02,
                       fontWeight: FontWeight.w600,
                     ),),

                   ],
                 )
               ],
             ),
              SizedBox(height: size.height*0.05,),
              Center(
                child: Container(
                  height: size.height*0.08,
                  width: size.width*0.7,
                  child: ElevatedButton(
                         onPressed: (){},
                         style: ElevatedButton.styleFrom(shape:RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),backgroundColor: Color(0xFF6787D6),),
                      child: Container(

                        child:
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                      Text("Set Budget",style: TextStyle(
                        color: Colors.white,
                        fontSize: size.height*0.02,
                        fontWeight: FontWeight.w600,
                      ),),
                        SizedBox(width: size.width*0.02,),
                        Image.asset("assets/Images/Note.png",fit: BoxFit.cover,)

                                     ],
                                   ),)),
                ),
              ),
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                    itemCount: _budgetCategories.length,
                    itemBuilder: (context,index){
                      final categorie = _budgetCategories[index];
                    return   Container(
                      height: size.height*0.1,
                      // padding: EdgeInsets.only(top: 12),
                      child: Column(
                        children: [
                          ListTile(
                            onTap: (){},
                            leading: Image.asset(getPic(categorie['name']),fit: BoxFit.cover),
                            title:  Text(categorie['name'], style: TextStyle(
                              color: Colors.black,
                              fontSize: size.height*0.02,
                              fontWeight: FontWeight.w400,
                            ),),
                            subtitle:LinearProgressIndicator(
                              backgroundColor: Colors.grey,
                              borderRadius: BorderRadius.circular(8),
                              minHeight: size.height*0.01,
                              value: 0,
                            ),
                            trailing: Text(categorie['debit'],style: TextStyle(
                              color: Colors.grey,
                              fontSize: size.height*0.02,
                              fontWeight: FontWeight.w400,
                            ),),

                          ),
                          Divider( color: Colors.grey,height: 1, thickness: 1,),
                        ],
                      ),

                    );
                
                
                    }),
              ),
             // Container(
             //   height: size.height*0.4,
             //   child: SingleChildScrollView(
             //     scrollDirection: Axis.vertical,
             //     child: Column(
             //       children: [
             //
             //         Container(
             //           height: size.height*0.1,
             //           padding: EdgeInsets.only(top: 12),
             //           child: ListTile(
             //             onTap: (){},
             //             leading: Image.asset("assets/Images/Public Transportation.png",fit: BoxFit.cover),
             //             title:  Text("Transportation", style: TextStyle(
             //               color: Colors.black,
             //               fontSize: size.height*0.02,
             //               fontWeight: FontWeight.w400,
             //             ),),
             //             subtitle:LinearProgressIndicator(
             //               backgroundColor: Colors.grey,
             //               borderRadius: BorderRadius.circular(8),
             //               minHeight: size.height*0.01,
             //               value: 0,
             //             ),
             //             trailing: Text("₹ 00",style: TextStyle(
             //               color: Colors.grey,
             //               fontSize: size.height*0.02,
             //               fontWeight: FontWeight.w400,
             //             ),),
             //
             //           ),
             //
             //         ),
             //         Divider( color: Colors.grey,height: 1, thickness: 1,),
             //         Container(
             //           height: size.height*0.1,
             //           padding: EdgeInsets.only(top: 12),
             //           child: ListTile(
             //             onTap: (){},
             //             leading: Image.asset("assets/Images/Cheque.png",fit: BoxFit.cover),
             //             title:  Text("Bills & Utilities", style: TextStyle(
             //               color: Colors.black,
             //               fontSize: size.height*0.02,
             //               fontWeight: FontWeight.w400,
             //             ),),
             //             subtitle:LinearProgressIndicator(
             //               backgroundColor: Colors.grey,
             //               borderRadius: BorderRadius.circular(8),
             //               minHeight: size.height*0.01,
             //               value: 0,
             //             ),
             //             trailing: Text("₹ 00",style: TextStyle(
             //               color: Colors.grey,
             //               fontSize: size.height*0.02,
             //               fontWeight: FontWeight.w400,
             //             ),),
             //
             //           ),
             //
             //         ),
             //         Divider( color: Colors.grey,height: 1, thickness: 1,),
             //         Container(
             //           height: size.height*0.1,
             //           padding: EdgeInsets.only(top: 12),
             //           child: ListTile(
             //             onTap: (){},
             //             leading: Image.asset("assets/Images/Electricity.png"),
             //             title:  Text("Electricity", style: TextStyle(
             //               color: Colors.black,
             //               fontSize: size.height*0.02,
             //               fontWeight: FontWeight.w400,
             //             ),),
             //             subtitle:LinearProgressIndicator(
             //               backgroundColor: Colors.grey,
             //               borderRadius: BorderRadius.circular(8),
             //               minHeight: size.height*0.01,
             //               value: 0,
             //             ),
             //             trailing: Text("₹ 00",style: TextStyle(
             //               color: Colors.grey,
             //               fontSize: size.height*0.02,
             //               fontWeight: FontWeight.w400,
             //             ),),
             //
             //           ),
             //
             //         ),
             //         Divider( color: Colors.grey,height: 1, thickness: 1,),
             //       ],
             //     ),
             //   ),
             // )
            ],
          ),
        ),
      ),
    );
  }
}
