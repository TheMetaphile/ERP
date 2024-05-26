import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class History1 extends StatefulWidget {
  const History1({super.key});

  @override
  State<History1> createState() => _History1State();
}

class _History1State extends State<History1> {
  final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'debit': '₹ 10,000', 'date':'14-05-2003','time':'08:20am'},
    {'name': 'Utilities', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Electricity', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Furniture', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Fuel', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},

  ];
  List<String> paymentTypeImages=[
    "assets/Images/Payment Images/Transportation.png",
    "assets/Images/Payment Images/Bills.png",
    "assets/Images/Payment Images/Electricity.png",
    "assets/Images/Payment Images/Furniture.png",
    "assets/Images/Payment Images/Fuel Gas.png",
  ];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Center(
        child: ListView.builder(
          itemBuilder: (context, index) {
            final category = _budgetCategories[index];
          return Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: size.height*0.1,),
              Image.asset(paymentTypeImages[index],fit: BoxFit.cover,height: size.height*0.15,width: size.width*0.3,),
              Text("Transportation", style: TextStyle(
                color: Colors.black,
                fontSize: size.height*0.035,
                fontWeight: FontWeight.w500,
              ),),
              SizedBox(height: size.height*0.02,),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("14-12-2023", style: TextStyle(
                    color: Colors.grey,
                    fontSize: size.height*0.02,
                  ),),
                  SizedBox(width: size.width*0.02),
                  Text("08:25", style: TextStyle(
                    color: Colors.grey,
                    fontSize: size.height*0.02,
                  ),),
                ],
              ),
              SizedBox(height: size.height*0.05,),
              Container(
                height: size.height*0.3,
                width: size.width*0.88,
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.black,width: 1),
                    borderRadius: BorderRadius.circular(12)
                ),
                child: Padding(
                  padding: EdgeInsets.only(left: 12,right: 12,top: 20),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Category", style: TextStyle(
                            color: Colors.grey,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                          Text("Wheels and Engine", style: TextStyle(
                            color: Colors.black,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Payment", style: TextStyle(
                            color: Colors.grey,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                          Text("Bank of India", style: TextStyle(
                            color: Colors.black,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                        ],
                      ) ,
                      SizedBox(height: size.height*0.02,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Amount", style: TextStyle(
                            color: Colors.grey,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                          Text("-₹ 10,000", style: TextStyle(
                            color: Colors.red,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                        ],
                      ),
                      SizedBox(height: size.height*0.02,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Date", style: TextStyle(
                            color: Colors.grey,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                          Text("12 March 2024", style: TextStyle(
                            color: Colors.black,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                        ],
                      ) ,
                      SizedBox(height: size.height*0.02,),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Time", style: TextStyle(
                            color: Colors.grey,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                          Text("08:09 AM", style: TextStyle(
                            color: Colors.black,
                            fontSize: size.height*0.02,
                            fontWeight: FontWeight.w500,
                          ),),
                        ],
                      ) ,

                    ],
                  ),
                ),
              )
            ],
          );
        },)
      ),
    );
  }
}
