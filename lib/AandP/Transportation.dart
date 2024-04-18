import 'package:flutter/material.dart';

class Transp extends StatefulWidget {
  const Transp({super.key});

  @override
  State<Transp> createState() => _TranspState();
}

class _TranspState extends State<Transp> {
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    var time=DateTime.now();
    return Scaffold(
      body: Column(
        children: [
          SizedBox(height: size.height*0.10,),
          Image(image: AssetImage('assets/Pictures/icons8-bus-50.png')),
          Center(
            child: Text('Transportation',
              style: TextStyle(fontSize:28,
                  color: Colors.black,
                  fontWeight: FontWeight.w600),),
          ),
          Text('14-03-2023 8:09am'),
          Padding(
            padding:  EdgeInsets.only(top: size.height*0.070),
            child: SizedBox(width: size.height*0.450,
                     height: size.height*0.450,
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(),
                borderRadius: BorderRadius.circular(10)
                ),
               child: Column(
                 children: [
                   ListTile(
                     leading: Text('Category',
                       style: TextStyle(fontSize: 20,color: Colors.grey),),
                     trailing: Text('Wheel and Engine',
                       style: TextStyle(color: Colors.black,fontSize: 20),),
                   ),
                   ListTile(
                     leading: Text('Payment',
                       style: TextStyle(fontSize: 20,color: Colors.grey),),
                     trailing: Text('Bank of India',
                       style: TextStyle(color: Colors.black,fontSize: 20),),
                   ),
                   ListTile(
                     leading: Text('Amount',
                       style: TextStyle(fontSize: 20,color: Colors.grey),),
                     trailing: Text('₹ 10,000',
                       style: TextStyle(color: Colors.pinkAccent,fontSize: 20),),
                   ),
                   ListTile(
                     leading: Text('Date',
                       style: TextStyle(fontSize: 20,color: Colors.grey),),
                     trailing: Text('14 March 2024',
                       style: TextStyle(color: Colors.black,fontSize: 20),),
                   ),
                   ListTile(
                     leading: Text('Time',
                       style: TextStyle(fontSize: 20,color: Colors.grey),),
                     trailing: Text('08:09 AM',
                       style: TextStyle(color: Colors.black,fontSize: 20),),
                   ),

                 ],
               ),
              ),
            ),
          )

        ],
      ),
    );
  }
}
