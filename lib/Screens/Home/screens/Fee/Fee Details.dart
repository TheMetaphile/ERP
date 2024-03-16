import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/utils/FeeDetailCard.dart';

class FeeDetails extends StatelessWidget {
  const FeeDetails({super.key});

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
            child: Image.asset("assets/changePassword/starpattern.png"),
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
              title: AutoSizeText("Fee Due",
                style: GoogleFonts.openSans(
                    color: Colors.white,
                    fontWeight: FontWeight.w600
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
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: size.height*0.01,horizontal: size.width*0.02),
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          FeeDetailCard(
                            paymentMode: '',
                            receiptNo: "#123456",
                            month: 'October',
                            paymentDate: DateTime.now(),
                            amount: '999',
                            payed: false,
                          ),
                          FeeDetailCard(
                            paymentMode: 'Online',
                            receiptNo: "#123456",
                            month: 'October',
                            paymentDate: DateTime.now(),
                            amount: '999',
                            payed: true,
                          ),
                          FeeDetailCard(
                            paymentMode: '',
                            receiptNo: "#123456",
                            month: 'October',
                            paymentDate: DateTime.now(),
                            amount: '999',
                            payed: false,
                          ),
                        ],
                      ),
                    ),
                  ),
                )
              ),
            ],
          ),
        ]
    );
  }
}
