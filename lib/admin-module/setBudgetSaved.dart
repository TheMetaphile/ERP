import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SetBudgetSaved extends StatefulWidget {
  const SetBudgetSaved({super.key});

  @override
  State<SetBudgetSaved> createState() => _SetBudgetSavedState();
}

class _SetBudgetSavedState extends State<SetBudgetSaved> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Center(
        child: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset("assets/Images/Checkmark.png"),
            SizedBox(height: size.height*0.02,),
            Text("Successful",style: TextStyle(color: Colors.black,fontSize: size.height*0.035),),
            SizedBox(height: size.height*0.02,),
            Text("Budget Saved Successfully",style: TextStyle(color: Colors.grey,fontSize: size.height*0.02),),
            SizedBox(height: size.height*0.35,),
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
                  child:  Text("Go to Back Home",style: TextStyle(
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
