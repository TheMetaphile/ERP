import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';

class FeeDetailCard extends StatelessWidget {
  const FeeDetailCard({super.key, required this.paymentMode,required this.receiptNo,required this.month,required this.paymentDate,required this.amount,required this.payed});
  final String receiptNo ;
  final String month;
  final DateTime paymentDate;
  final String amount;
  final String paymentMode;
  final bool payed;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      shape: OutlineInputBorder(
        borderSide: const BorderSide(
          color: Colors.black,
        ),
        borderRadius: BorderRadius.circular(15)
      ),
      elevation: 5,
      child: Column(
        children: [
          ListTile(
            title: const AutoSizeText("Receipt No."),
            trailing: AutoSizeText(receiptNo),
          ),
          ListTile(
            title: const AutoSizeText("Month"),
            trailing: AutoSizeText(month),
          ),
          ListTile(
            title: const AutoSizeText("Payment Date"),
            trailing: AutoSizeText("${paymentDate.day} Oct ${paymentDate.year}"),
          ),
          payed
              ?
          ListTile(
            title: const AutoSizeText("Pay Mode"),
            trailing: AutoSizeText(paymentMode),
          )
              :
          const SizedBox(),
          ListTile(
            title: const AutoSizeText("Month"),
            trailing: AutoSizeText(month),
          ),
          !payed
              ?
          InkWell(
            child: Container(
              height: size.height*0.05,
              decoration: const BoxDecoration(
                color: Color.fromRGBO(108, 137, 204, 1),
                borderRadius: BorderRadius.only(
                  topRight: Radius.circular(0),
                  topLeft: Radius.circular(0),
                  bottomRight: Radius.circular(15),
                  bottomLeft: Radius.circular(15)
                  
                )
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const AutoSizeText("Pay Now",
                    style: TextStyle(color: Colors.white,fontSize: 20),
                  ),
                  SizedBox(
                    width: size.width*0.01,
                  ),
                  const Icon(Icons.arrow_forward_ios_rounded,color: Colors.white,)
                ],
              ),
            ),
          )
              :
          InkWell(
            child: Container(
              height: size.height*0.05,
              decoration: const BoxDecoration(
                  color: Color.fromRGBO(108, 137, 204, 1),
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(0),
                      topLeft: Radius.circular(0),
                      bottomRight: Radius.circular(15),
                      bottomLeft: Radius.circular(15)

                  )
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const AutoSizeText("Download",
                    style: TextStyle(color: Colors.white,fontSize: 20),
                  ),
                  SizedBox(
                    width: size.width*0.01,
                  ),
                  const Icon(Icons.download,color: Colors.white,)
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
