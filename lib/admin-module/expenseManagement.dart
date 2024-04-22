import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';
import 'package:untitled/admin-module/transfer.dart';
class expenseManagement extends StatefulWidget {
  const expenseManagement({super.key});

  @override
  State<expenseManagement> createState() => _expenseManagementState();
}

class _expenseManagementState extends State<expenseManagement> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: size.width*0.88,

            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                  Text("Expense Management", style: TextStyle(
                    color: Colors.black,
                    fontSize: size.height*0.025,
                    fontWeight: FontWeight.w400,
                  ),),
                SizedBox(height: size.height*0.03,),
                Container(

                  height: size.height*0.24,
                  child: Stack(
                    children: [
                      Positioned(
                        top: 95,
                        child: Container(
                          width: size.width*0.88,
                        height: size.height*0.12,

                        decoration: BoxDecoration(
                          color: Colors.black,
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            ElevatedButton(
                              onPressed: () {
                                // Handle transfer action
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.black,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8.0),
                                ),
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Data Transfer.png"),
                                  SizedBox(width: 8.0),
                                  Text('Transfer',style: TextStyle(color: Colors.white),),
                                ],
                              ),
                            ),

                            ElevatedButton(
                              onPressed: () {
                                // Handle history action
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.black,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8.0),
                                ),
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Image.asset("assets/Images/Time Machine.png"),
                                  SizedBox(width: 8.0),
                                  Text('History',style: TextStyle(color: Colors.white),),
                                ],
                              ),
                            ),
                          ],
                        ),
                                            ),
                      ),
                      Container(
                        height: size.height*0.13,
                        width: size.width*0.88,
                        padding: EdgeInsets.all(16.0),
                        decoration: BoxDecoration(
                          color: Color(0xFF6787D6),
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              'Your Available Balance',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: size.height*0.025,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            SizedBox(height: 8.0),
                            Text(
                              '₹ 60,000',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: size.height*0.025,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),

                    ],
                  ),
                ),
                SizedBox(height: size.height*0.02,),
                Text("Payment List", style: TextStyle(
                  color: Colors.black,
                  fontSize: size.height*0.025,
                  fontWeight: FontWeight.w400,
                ),),
                SizedBox(height: size.height*0.02,),

              ],
            ),
          ),
          Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){
                    Navigator.push(context, MaterialPageRoute(builder: (context)=>transfer()));
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/Images/Electricity.png"),

                      Text('Electricity',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              ),
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/Images/Data Transfer2.png"),

                      Text('Internet',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              ),
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Center(child: Image.asset("assets/Images/Public Transportation.png",fit: BoxFit.fill,)),

                      Text('Transportation',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145,fontWeight: FontWeight.w600),),
                    ],
                  ),
                ),
              )
            ],
          ),
          SizedBox(height: size.height*0.02,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/Images/Plus.png"),

                      Text('Insurance',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              ),
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/Images/Shop.png"),

                      Text('Furniture',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              ),
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/Images/Baby Calendar.png"),

                      Text('Holidays',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              )
            ],
          ),
          SizedBox(height: size.height*0.02,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset("assets/Images/Event.png"),

                      Text('Events',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              ),

              Container(
                height: size.height*0.12,
                width: size.width*0.27,
                decoration: BoxDecoration(
                  border: Border.all(color: Color(0xFFBFBFBF)),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: TextButton(

                  onPressed: (){},
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shape: RoundedRectangleBorder(),
                  ),

                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Image.asset("assets/Images/Cheque.png"),

                      Text('Bills & Utilities',style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                    ],
                  ),
                ),
              ),
              SizedBox(height: size.height*0.12,
                width: size.width*0.27,),

            ],
          )
        ],
      ),
    );
  }
}
