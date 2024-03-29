import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/utils/payOnlineTextField.dart';

class PayOnline extends StatelessWidget {
  PayOnline({super.key});
  final TextEditingController date = TextEditingController(text: "01 Feb 2020");
  final TextEditingController period = TextEditingController(text: "28 Feb 2020");
  final TextEditingController totalFee = TextEditingController(text: "₹999");
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Stack(
        alignment: Alignment.topCenter,
        children: [
          Container(
            height: size.height,
            width: size.width,
            color: const Color.fromRGBO(108, 137, 204, 1),
          ),
          SizedBox(
            width: size.width,
            height: size.height*0.12,
            child: Image.asset("assets/Navigation/changePassword/starpattern.png"),
          ),
          Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              elevation: 0,
              backgroundColor: Colors.transparent,
              leading: IconButton(
                onPressed: (){
                  Navigator.pop(context);
                },
                icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.white,),
              ),
              title: AutoSizeText("Pay Online",
                style: GoogleFonts.openSans(
                    color: Colors.white,
                    fontWeight: FontWeight.w500
                ),
              ),
            ),
          ),

          Column(
            children: [
              SizedBox(
                height: size.height*0.12,
              ),
              Card(
                color: Colors.white,
                margin: const EdgeInsets.all(0),
                shape: const OutlineInputBorder(
                    borderSide: BorderSide(
                        color: Colors.white
                    ),
                    borderRadius: BorderRadius.only(
                        topRight: Radius.circular(30),
                        topLeft: Radius.circular(30)
                    )
                ),
                child: SizedBox(
                  height: size.height*0.88,
                  width: size.width,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 15.0,vertical: size.height*0.03),
                    child: Column(
                      children: [
                        PayOnlineTextField(controller: date, hintText: "Date", icon: true, enabled: false,),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        PayOnlineTextField(controller: period, hintText: "Period", icon: true, enabled: false,),
                        SizedBox(
                          height: size.height*0.03,
                        ),
                        PayOnlineTextField(controller: totalFee, hintText: "Date", icon: false, enabled: false,),
                        SizedBox(
                          height: size.height*0.52,
                        ),
                        payNowButton(size)
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ]
    );
  }
  Widget payNowButton(Size size){
    return Card(
      elevation: 5,
      color: const Color.fromRGBO(108, 137, 204, 1),
      shape: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(
            color: Color.fromRGBO(108, 137, 204, 1),
          )
      ),
      child:  InkWell(
        onTap: (){},
        child: SizedBox(
          width: size.width*0.85,
          height: size.height*0.05,
          child:Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AutoSizeText("Pay Now",
                style: GoogleFonts.openSans(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w500
                ),
              ),
              SizedBox(
                width: size.width*0.03,
              ),
              const Icon(Icons.arrow_forward_ios,color: Colors.white,)
            ],
          ),
        ),
      ),
    );
  }
}
