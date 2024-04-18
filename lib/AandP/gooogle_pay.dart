import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class gooogle_pay extends StatefulWidget {
  const gooogle_pay({super.key});

  @override
  State<gooogle_pay> createState() => _gooogle_payState();
}

class _gooogle_payState extends State<gooogle_pay> {
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding:  EdgeInsets.only(top: size.height*0.10),
            child: Text('Where do you want us to tranfer the\n money ?',
              style: TextStyle(fontSize:25 , fontWeight: FontWeight.w600),),
          ),
          SizedBox(height: size.height*0.02,),
          Padding(
            padding:  EdgeInsets.only(left:size.height*0.015,right: size.width*0.015),
            child: Divider(thickness: size.width*.003,color: Colors.black,height: size.height*0.01,),
          ),
          ListTile(
              title: const Text('Select transactions',style: TextStyle(fontSize: 20,color: Colors.black,fontWeight: FontWeight.w600),),
          ),
          Padding(
            padding: EdgeInsets.only(left:size.width*0.015,right:size.width*0.015),
            child: Padding(
              padding:  EdgeInsets.only(left:size.height*0.015,right: size.width*0.015),
              child: Divider(height: size.height*0.0099,),
            ),
          ),
    ListTile(

    title: const Text('Bank account',style: TextStyle(fontSize: 16,color: Colors.black,fontWeight: FontWeight.w600),),
    leading: Image(image: AssetImage('assets/images/bankaccount.png'),height: size.height*0.05,),
    ),
          Padding(
            padding:  EdgeInsets.only(left:size.height*0.015,right: size.width*0.015),
            child: Divider(height: size.height*0.000030,),
          ),
          ListTile(
            title: const Text('BHMI UPI',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
            leading:Image(image: AssetImage('assets/images/icons8-bhim-48.png'),height: size.height*0.05,),
          ),
    Padding(
      padding: EdgeInsets.only(left:size.height*0.015,right: size.width*0.015),
      child: Divider(height: size.height*0.000030,),
    ),
          ListTile(
            title: Text('Google pay',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
            leading: Image(image: AssetImage('assets/images/icons8-google-pay-48.png'),height: size.height*0.05,),
          ),
          Padding(
            padding:  EdgeInsets.only(left:size.height*0.015,right: size.width*0.015),
            child: Divider(height: size.height*0.000030,),
          ),
          ListTile(
            title: Text('Paytm',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight: FontWeight.w600),),
            leading: Image(image: AssetImage('assets/images/icons8-paytm-48.png'),height: size.height*0.05,),
          ),
          Padding(
            padding:  EdgeInsets.only(left:size.height*0.015,right: size.width*0.015),
            child: Divider(height: size.height*0.000030,),
          ),
          SizedBox(height: size.height*0.020,),
          ListTile(
            trailing: Text('View all',style: TextStyle(fontWeight: FontWeight.w600,color: Colors.lightBlue,fontSize: 15),),
            title: Text('Contact',style: TextStyle(fontSize: 25,color: Colors.black,fontWeight: FontWeight.w700),),
          ),
          SizedBox(height: size.height*0.020,),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Column(
                children: [
                  CircleAvatar(
                      radius: size.height*0.040,
                      backgroundColor: Colors.blueAccent,
                      child: Icon(Icons.add,color: Colors.white,size: size.height*0.07,),
                    ),
                  Text('Add new',style: TextStyle(fontWeight: FontWeight.w600),),

                ],
              ),
              Column(
                children: [
                  CircleAvatar(
                  
                    radius: size.height*0.040,
                    backgroundColor: Colors.deepPurple,
                    child: Icon(Icons.person,color: Colors.deepPurpleAccent,size: size.height*0.07,),
                  ),
                  Text('arun',style: TextStyle(fontWeight: FontWeight.w600),)
                ],
              ),
              Column(
                children: [
                  CircleAvatar(
                    radius: size.height*0.040,
                    backgroundColor: Colors.deepPurple,
                    child: Icon(Icons.person,color: Colors.deepPurpleAccent,size: size.height*0.07,),
                  ),
                  Text('abhi', style: TextStyle(fontWeight: FontWeight.w600),)
                ],
              ),
              Column(
                children: [
                  CircleAvatar(
                    radius: size.height*0.040,
                    backgroundColor: Colors.deepPurple,
                    child: Icon(Icons.person,color: Colors.deepPurpleAccent,size: size.height*0.07,),
                  ),
                  Text('ankit',style: TextStyle(fontWeight: FontWeight.w600),)
                ],
              ),
              Column(
                children: [
                  CircleAvatar(
                    radius: size.height*0.040,
                    backgroundColor: Colors.deepPurple,
                    child: Icon(Icons.person,color: Colors.deepPurpleAccent,size: size.height*0.07,),
                  ),
                  Text('manish',style: TextStyle(fontWeight: FontWeight.w600),)
                ],
              ),
            ],
          )
        ],
      ),
    );
  }
}
