import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class History extends StatefulWidget {
  const History({super.key});

  @override
  State<History> createState() => _HistoryState();
}

class _HistoryState extends State<History> {
   final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'debit': '-₹ 10,000', 'date':'14-05-2003','time':'08:20am'},
    {'name': 'Bills & Utilities', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Electricity', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Furniture', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Fuel', 'debit': '-₹ 20000','date':'14-05-2003','time':'08:20am'},

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
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          icon: Icon(CupertinoIcons.back,color: Colors.black,),
          onPressed: () {  },
        ),
        title: Text("Expense Management",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),

      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Center(
          child: Container(
            width: size.width*0.9,
            height: size.height*1,

            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: size.height*0.03,),
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
                SizedBox(height: size.height*0.04,),
                Text("Transaction", style: TextStyle(
                  color: Colors.black,
                  fontSize: size.height*0.025,
                  fontWeight: FontWeight.w400,
                ),),
                Divider( color: Colors.black, thickness: 1,),
                Flexible(
                  child: ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: _budgetCategories .length,
                    itemBuilder: (context, index) {
                      final category = _budgetCategories[index];
                      return Column(
                        children: [
                          ListTile(
                            leading: Image.asset(paymentTypeImages[index],height: size.height*0.08,width: size.width*0.1,),
                            title: Text(category['name'],style: TextStyle(fontSize: size.height*0.02,color: Colors.black,fontWeight: FontWeight.w400),),
                            subtitle: Row(
                              children: [
                                Text(category['date'],style: TextStyle(color: Colors.grey),),
                                Expanded(child: SizedBox()),
                                Text(category['time'],style: TextStyle(color: Colors.grey)),
                              ],
                            ),
                            trailing:  Column(
                              children: [
                                Text(category['debit'],style: TextStyle(fontSize: size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),),
                                Text('Debit',style: TextStyle(color: Colors.grey),)
                              ],
                            ),
                            onTap: (){
                            },
                          ),
                          Divider( color: Colors.grey,height: 1, thickness: 1,),
                        ],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
