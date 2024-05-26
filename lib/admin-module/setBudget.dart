import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

class SetBudgetScreen extends StatefulWidget {
  const SetBudgetScreen({super.key});
  @override
  _SetBudgetScreenState createState() => _SetBudgetScreenState();
}

class _SetBudgetScreenState extends State<SetBudgetScreen> {
  final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'amount': 20000},
    {'name': 'Utilities', 'amount': 20000},
    {'name': 'Electricity', 'amount': 20000},
    {'name': 'Furniture', 'amount': 20000},
    {'name': 'Fuel', 'amount': 20000},

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
        title: Text("Set Budget",style: TextStyle(color: Colors.black,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),

      ),
      body: Center(
        child: Container(
          width: size.width*0.9,
          height: size.height*1,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height*0.03,),
              Flexible(
              child: ListView.builder(
                shrinkWrap: true,
                itemCount: _budgetCategories .length,
                itemBuilder: (context, index) {
                  final category = _budgetCategories[index];
                  return Container(
                    height: size.height*0.08,
                    child: ListTile(
                      leading: Image.asset(paymentTypeImages[index],height: size.height*0.07,width: size.width*0.1,),
                      title: Text(category['name']),
                      trailing:  Container(
                        height: size.height*0.05,
                        width: size.width*0.27,

                        child: TextFormField(
                          showCursor: false,
                          decoration: InputDecoration(
                            prefixText: '₹ ',
                            prefixStyle: TextStyle(color: Colors.grey),
                            focusedBorder: OutlineInputBorder(

                                borderRadius: BorderRadius.circular(12),
                                // borderSide: BorderSide(
                                //     color: Colors.red
                                // )
                            ),
                            enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color:Colors.red
                                ),
                                borderRadius: BorderRadius.circular(12)

                            ),
                          ),
                          keyboardType: TextInputType.number,
                          textAlign: TextAlign.center,

                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
              SizedBox(height: size.height*0.05,),
              Center(
                child: Container(
                  height: size.height*0.07,
                  width: size.width*0.67,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.red,),
                      borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: TextButton(onPressed: (){}, child:Text("+ Add new Category"),
                    style: TextButton.styleFrom(
                        shape: RoundedRectangleBorder(),

                    ),),
                ),
              ),
              SizedBox(height: size.height*0.05,),
              Center(
                child: Container(
                  width: size.width*0.67,
                  height: size.height*0.07,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12)
                  ),
                  child: ElevatedButton(
                      onPressed: (){},
                      style: ElevatedButton.styleFrom(shape:RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),backgroundColor: Color(0xFF6787D6),),
                      child:  Text("Done",style: TextStyle(
                        color: Colors.white,
                        fontSize: size.height*0.02,
                        fontWeight: FontWeight.w600,
                      ),),),
                ),
              )


            ],
          ),
        ),
      ),
    );
  }

}
