import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class statics extends StatefulWidget {
  const statics({super.key});

  @override
  State<statics> createState() => _staticsState();
}

class _staticsState extends State<statics> {
  final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'debit': '₹ 10,000', 'date':'14-05-2003','time':'08:20am'},
    {'name': 'Utilities', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Electricity', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Furniture', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Fuel', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},

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
      appBar:AppBar(),
      body: Center(
        child: Container(
          width: size.width*0.9,
          height: size.height*1,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Text("Statics", style: TextStyle(
                  color: Colors.black,
                  fontSize: size.height*0.035,
                  fontWeight: FontWeight.w500,
                ),),
              ),
              SizedBox(height: size.height*0.03,),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextButton(onPressed: (){}, child: Text("Day",style: TextStyle(color: Colors.grey),)),
                  TextButton(onPressed: (){}, child: Text("Week",style: TextStyle(color: Colors.grey),)),
                  TextButton(onPressed: (){}, child: Text("Month",style: TextStyle(color: Colors.grey),)),
                  TextButton(onPressed: (){}, child: Text("Year",style: TextStyle(color: Colors.grey),)),
                ],
              ),
              Divider( color: Colors.black,height: 1, thickness: 2,),
              Text("Recent Debits",style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight: FontWeight.w600),),
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
                            onTap: (){},
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
