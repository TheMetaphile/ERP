import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';
import 'package:untitled/admin-module/transfer.dart';
class ExpenseManagement extends StatefulWidget {
  const ExpenseManagement({super.key});

  @override
  State<ExpenseManagement> createState() => _ExpenseManagementState();
}


class _ExpenseManagementState extends State<ExpenseManagement> {
  List<String> paymentType=["Electricity", "Internet","Transportation", "Insurance","Furniture","Holidays","Events","Bills & Utilities"];
  List<String> paymentTypeImages=["assets/Images/Payment Images/Electricity.png","assets/Images/Payment Images/Internet.png","assets/Images/Payment Images/Transportation.png","assets/Images/Payment Images/Medical Insurance.png","assets/Images/Payment Images/Furniture.png","assets/Images/Payment Images/Holidays.png","assets/Images/Payment Images/Event.png","assets/Images/Payment Images/Bills.png"];
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          icon: Icon(CupertinoIcons.back,color: Colors.black,),
          onPressed: () {  },
        ),
        title: Text("Expense Management",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),

      ),
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: size.height*0.03,),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: size.height*0.32,
                width: size.width*0.9,
             decoration: BoxDecoration(
               color: Color(0xFF6787D6),
               borderRadius: BorderRadius.circular(12),
             ),
                child:Column(
                  children: [
                    SizedBox(height: size.height*0.02,),
                    Text(
                      'Your Available Balance',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: size.height*0.025,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      '₹ 60,000',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: size.height*0.025,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Expanded(child: SizedBox(),),
                    Container(
                      height: size.height*0.18,
                      decoration: BoxDecoration(
                          color: Colors.black,
                        borderRadius: BorderRadius.circular(12)
                      ),
                      child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          SizedBox(
                            height: size.height*0.08,

                            child: ElevatedButton(
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
                                children: [
                                  Image.asset("assets/Images/Data Transfer.png"),
                                  Text('Transfer',style: TextStyle(color: Colors.white),),
                                ],
                              ),
                            ),
                          ),

                          SizedBox(
                            height: size.height*0.08,
                            child: ElevatedButton(
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
                                children: [
                                  Image.asset("assets/Images/Time Machine.png"),
                                  Text('History',style: TextStyle(color: Colors.white),),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                )
              ),
              SizedBox(height: size.height*0.02,),

            ],
          ),
          Text("Payment List", style: TextStyle(
            color: Colors.black,
            fontSize: size.height*0.025,
            fontWeight: FontWeight.w400,
          ),),
          SizedBox(height: size.height*0.02,),
          GridView.builder(
            physics: NeverScrollableScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 8),
            shrinkWrap: true,
            itemCount: paymentTypeImages.length,
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3,mainAxisSpacing: size.height*0.01,crossAxisSpacing:size.width*0.03 ),
              itemBuilder: (context, index) {
                return Container(
                  decoration: BoxDecoration(
                    border: Border.all(color: Color(0xFFBFBFBF)),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: TextButton(
                    onPressed: (){
                    },
                    style: TextButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      shape: RoundedRectangleBorder(),
                    ),

                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Image.asset(paymentTypeImages[index]),

                        Text(paymentType[index],style: TextStyle(color: Colors.black,fontSize: size.height*0.0145),),
                      ],
                    ),
                  ),
                );
              },)
        ],
      ),
    );
  }
}
