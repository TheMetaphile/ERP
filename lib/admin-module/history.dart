import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class history extends StatefulWidget {
  const history({super.key});

  @override
  State<history> createState() => _historyState();
}

class _historyState extends State<history> {
   final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'debit': '-₹ 10,000', 'date':'14-05-2003','time':'08:20am'},
    {'name': 'Utilities', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Electricity', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Furniture', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Fuel', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
     {'name': 'Fuel', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},

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
      appBar: AppBar(),
      body: Center(
        child: Container(
          width: size.width*0.9,
          height: size.height*1,

          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Expense Management", style: TextStyle(
                color: Colors.black,
                fontSize: size.height*0.025,
                fontWeight: FontWeight.w600,
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
              Text("Transaction", style: TextStyle(
                color: Colors.black,
                fontSize: size.height*0.025,
                fontWeight: FontWeight.w400,
              ),),
              Divider( color: Colors.black,height: 1, thickness: 2,),
              SizedBox(height: size.height*0.02,),
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: _budgetCategories .length,
                  itemBuilder: (context, index) {
                    final category = _budgetCategories[index];
                    return Container(
                      height: size.height*0.1,
                      child: Column(
                        children: [
                          ListTile(
                            leading: Image.asset(getPic(category['name']),height: size.height*0.08,width: size.width*0.1,),
                            title: Text(category['name'],style: TextStyle(fontSize: size.height*0.02,color: Colors.black,fontWeight: FontWeight.w400),),
                            subtitle: Row(
                              children: [
                                Text(category['date'],style: TextStyle(color: Colors.grey),),
                                SizedBox(width: size.width*0.02,),
                                Text(category['time'],style: TextStyle(color: Colors.grey)),
                              ],
                            ),
                            trailing:  Container(
                                height: size.height*0.05,
                                width: size.width*0.27,

                                child: Column(
                                  children: [
                                    Text(category['debit'],style: TextStyle(fontSize: size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),),
                                    Text('Debit',style: TextStyle(color: Colors.grey),)
                                  ],
                                )
                            ),
                            onTap: (){
                              print("hello");
                            },
                          ),
                          Divider( color: Colors.grey,height: 1, thickness: 1,),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
