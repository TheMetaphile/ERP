import 'package:flutter/material.dart';
class Setbudget extends StatefulWidget {
  const Setbudget({super.key});

  @override
  State<Setbudget> createState() => _SetbudgetState();
}

class _SetbudgetState extends State<Setbudget> {
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
        body: Column(
          children: [
            SizedBox(height: size.height*0.10,),
            Text('Edit Budget',
              style: TextStyle(fontWeight: FontWeight.w700,
                  color: Colors.black,fontSize: 25),),
            SizedBox(
              height: size.height*0.080,
            ),
            ListTile(
              leading:Image(image: AssetImage('assets/Pictures/icons8-bus-50.png'),height: size.height*0.05,),
              title: Text('Transportation',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
              trailing:Container(
                height: size.height*0.05,
                width: size.width*0.25,
                child: Text('  ₹ 20,000',style: TextStyle(fontSize: 20),),
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.red),
                    borderRadius: BorderRadius.circular(5)
                ),
              ),
            ),
            ListTile(
              leading:Image(image: AssetImage('assets/Pictures/icons8-bill-50.png'),height: size.height*0.05,),
              title: Text('Utilities',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
              trailing:Container(
                height: size.height*0.05,
                width: size.width*0.25,
                child: Text('  ₹ 20,000',style: TextStyle(fontSize: 20),),
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.red),
                    borderRadius: BorderRadius.circular(5)
                ),
              ),
            ),
            ListTile(
              leading:Image(image: AssetImage('assets/Pictures/icons8-electricity-64 (1).png'),height: size.height*0.05,),
              title: Text('Electricity',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
              trailing:Container(
                height: size.height*0.05,
                width: size.width*0.25,
                child: Text('  ₹ 20,000',style: TextStyle(fontSize: 20),),
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.red),
                    borderRadius: BorderRadius.circular(5)
                ),
              ),
            ),
            ListTile(
              leading:Image(image: AssetImage('assets/Pictures/icons8-furniture-50.png',),height: size.height*0.05,),
              title: Text('Furniture',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
              trailing:Container(
                height: size.height*0.05,
                width: size.width*0.25,
                child: Text('  ₹ 20,000',style: TextStyle(fontSize: 20),),
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.red),
                    borderRadius: BorderRadius.circular(5)
                ),
              ),
            ),
            ListTile(
              leading:Image(image: AssetImage('assets/Pictures/icons8-fuel-50 (1).png'),height: size.width*0.09,),
              title: Text('Fuel',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
              trailing:Container(
                height: size.height*0.05,
                width: size.width*0.25,
                child: Text('  ₹ 20,000',style: TextStyle(fontSize: 20),),
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.red),
                    borderRadius: BorderRadius.circular(5)
                ),
              ),
            ),
            SizedBox(height: size.height*0.060,),
            Container(
              height: size.height*0.07,
              width: size.width*0.9,
              child: Center(child: Text('+ Add new category',style: TextStyle(fontSize: 20,color: Colors.red),)),
              decoration: BoxDecoration(
                  border: Border.all(color: Colors.red),
                  borderRadius: BorderRadius.circular(8)
              ),
            ),
            SizedBox(height: size.height*0.12,),
            SizedBox(
              width: size.width*0.8,
              height: size.width*0.12,
              child: ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.blueAccent,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10),)),
                  onPressed: (){}, child: Text('Done',
                style: TextStyle(color: Colors.white,fontSize: 25),)),
            )

          ],

        )
    );
  }
}

