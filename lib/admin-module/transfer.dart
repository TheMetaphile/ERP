import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class transfer extends StatefulWidget {
  const transfer({super.key});

  @override
  State<transfer> createState() => _transferState();
}

class _transferState extends State<transfer> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(

      body: Container(
        margin: EdgeInsets.only(left: 20,right: 20),
    width: size.width*1,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children : [
        Text("Where do you want us to transfer the money ?",style: TextStyle(fontSize: size.height*0.03,fontWeight: FontWeight.bold),),
         SizedBox(height: size.height*0.035,),
          Divider(
            color: Colors.grey,height: 1, thickness: 1,),
          SizedBox(height: size.height*0.035,),
          Text("Select transactions",style: TextStyle(fontSize: size.height*0.03,fontWeight: FontWeight.bold),),
           SizedBox(height: size.height*0.035,),
             Divider( color: Colors.grey,height: 1, thickness: 1,),

          TextButton(onPressed: (){}, child: Row(
                children: [
                  Image.asset("assets/Images/Merchant Account.png"),
                SizedBox(width: size.width*0.01,),
                Text("Bank account",style: TextStyle(color: Colors.black,fontSize: size.height*0.02),),
                ],
          ) ),
           SizedBox(height: size.height*0.01,),
            Divider( color: Colors.grey,height: 1, thickness: 1,),
               SizedBox(height: size.height*0.01,),
            TextButton(onPressed: (){}, child: Row(

                  children: [
                    Image.asset("assets/Images/Bhim.png"),
                  SizedBox(width: size.width*0.01,),
                  Text("BHIM UPI",style: TextStyle(color: Colors.black,fontSize: size.height*0.02),),
                  ],
            ) ),
          SizedBox(height: size.height*0.01,),
              Divider( color: Colors.grey,height: 1, thickness: 1,),
                SizedBox(height: size.height*0.01,), 
             TextButton(onPressed: (){}, child: Row(
                   children: [
                     Image.asset("assets/Images/Google Pay.png"),
                   SizedBox(width: size.width*0.01,),
                   Text("Google Pay",style: TextStyle(color: Colors.black,fontSize: size.height*0.02),),
                   ],
             ) ),
           SizedBox(height: size.height*0.01,),
              Divider( color: Colors.grey,height: 1, thickness: 1,),
             SizedBox(height: size.height*0.01,),
             TextButton(onPressed: (){}, child: Row(
                   children: [
                     Image.asset("assets/Images/Paytm.png",fit: BoxFit.cover,),
                   SizedBox(width: size.width*0.013,),
                   Text("Paytm",style: TextStyle(color: Colors.black,fontSize: size.height*0.02),),
                   ],
             ) ),
           SizedBox(height: size.height*0.01,),
          Divider( color: Colors.grey,height: 1, thickness: 1,),
            SizedBox(height: size.height*0.02,),
            Container(
               width: size.width*1,
              child: Column(
                children: [
                  Container(
                     width: size.width*0.88,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("Contact",style: TextStyle(fontSize: size.height*0.03,fontWeight: FontWeight.bold),),
                      TextButton(onPressed: (){}, child: Text("View all")),
                      ],
                    ),
                  ) ,
                  Row(
                    children: [
                      FloatingActionButton(
                        onPressed: () {},
                        child: Icon(Icons.add),
                      ),
                      TextButton(onPressed: (){},
                          child: Column(
                            children: [
                              CircleAvatar(
                                child: Icon(Icons.perm_contact_cal),
                              ) ,
                              SizedBox(height: size.height*0.007,),
                              Text("arun",style: TextStyle(color: Colors.black),),
                            ],
                          )),
                      TextButton(onPressed: (){},
                          child: Column(
                              children: [
                                CircleAvatar(
                                  child: Icon(Icons.perm_contact_cal),) ,
                                SizedBox(height: size.height*0.007,),
                                Text("arun",style: TextStyle(color: Colors.black),),
                              ])



                      ),


















                    ],
                  ),
              ]
            ),
            ),
         ]
        ),

      ),

    );
  }
}
