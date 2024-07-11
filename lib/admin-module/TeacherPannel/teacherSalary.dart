import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/theme.dart';

class TeacherSalary extends StatefulWidget {
  const TeacherSalary({super.key});

  @override
  State<TeacherSalary> createState() => _TeacherSalaryState();
}

class _TeacherSalaryState extends State<TeacherSalary> {

  String deviceTokenToSendPushNotification="";

  @override
  void initState() {
    super.initState();

  }
  List<Map<String, String>> cardType=[
    {
      "type":"Total Teacher",
      "number":"300"
    },
    {
      "type":"Total Working Hrs",
      "number":"490 Hrs"
    },
    {
      "type":"Payable Amount",
      "number":"6 Lakh"
    },
    {
      "type":"Deduction Amount",
      "number":"50 Hundred"
    }
  ];
  List<Map<String, String>> teachersData=[
    {

      "name":"Ankit",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9730",
      "deduction":"Rs 500",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",



    },
    {

      "name":"Abhishek",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 3830",
      "deduction":"Rs 30",
      "incentive":"Rs 4130",
      "netPay":"Rs 4430",
      "status":"UnPaid",
    },
    {

      "name":"Bhanu",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",
    },
    {

      "name":"Manish",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"UnPaid",
    },
    {

      "name":"Abhishek",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",
    },
    {

      "name":"Ashish",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"UnPaid",
    },
    {

      "name":"Ansh",
      "id":"983",
    "paidHours":"983",
    "grossPay":"Rs 9830",
    "deduction":"Rs 530",
    "incentive":"Rs 4530",
      "netPay":"Rs 4430",
    "status":"Paid",
    },
    {

      "name":"Rahul",
      "id":"983",
    "paidHours":"983",
    "grossPay":"Rs 9830",
    "deduction":"Rs 530",
    "incentive":"Rs 4530",
      "netPay":"Rs 4430",
    "status":"UnPaid",
    },
    {

      "name":"Priya",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",
    },
    {

      "name":"Ajay",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"UnPaid",
    },
    {

      "name":"Akhil",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",
    },
    {

      "name":"Amit",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"UnPaid",
    },
    {

      "name":"Modi",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",
    },
    {

      "name":"Ankit",
      "id":"983",
      "paidHours":"983",
      "grossPay":"Rs 9830",
      "deduction":"Rs 530",
      "incentive":"Rs 4530",
      "netPay":"Rs 4430",
      "status":"Paid",
    },

  ];
  CustomTheme themeObj=CustomTheme();
  int? _selectedRowIndex;
  @override
  Widget build(BuildContext context) {
    Size size=MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color: themeObj.textBlack,),
        ),
        iconTheme:  IconThemeData(color:themeObj.textBlack),
        backgroundColor: themeObj.primayColor,
        title: Text("Teacher Salary",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:themeObj.textBlack,fontWeight:FontWeight.w600),),
      ),
      body:SingleChildScrollView(
        child: Padding(
          padding:  EdgeInsets.symmetric(horizontal: 8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height*0.01,),
              Container(
                child: GridView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: cardType.length,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount( childAspectRatio: 1.5,crossAxisCount: 2,crossAxisSpacing: size.width*0.02),
                  itemBuilder: (context, index) {
                    final cardCategory=cardType[index];
                    return  Card(
                      color:Color(0xFFB3FCF9),
                      child: Container(
                        child: TextButton(
                          onPressed: (){},
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(cardCategory["number"]!,style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.black,fontWeight:FontWeight.w600),),
                              Text(cardCategory["type"]!,style: GoogleFonts.openSans(fontSize:size.width*0.04,color:Colors.black),),

                            ],
                          ),
                        ),
                      ),
                    );
                  },),
              ),
              SizedBox(height: size.height*0.01,),
              Padding(
                padding: const EdgeInsets.only(left: 50.0),
                child: Text(
                  'Swipe left and right to see all details',
                  style: GoogleFonts.openSans(
                      fontStyle: FontStyle.italic,
                      color: Colors.grey[600],
                      fontSize: size.width * 0.035),
                ),
              ),
              SizedBox(height: size.height * 0.02),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      color: Color.fromRGBO(233, 213, 255, 1),
                      child: Row(
                        children: [

                          _buildHeaderCell("Name", size),
                          _buildHeaderCell("ID", size),
                          _buildHeaderCell("Paid Hours", size),
                          _buildHeaderCell("Gross Pay", size),
                          _buildHeaderCell("Deduction", size),
                          _buildHeaderCell("Incentive", size),
                          _buildHeaderCell("Net Pay", size),
                          _buildHeaderCell("Status", size),
                        ],
                      ),
                    ),
                    const Divider(thickness: 2, height: 2, color: Colors.black),
                    Container(
                      height: size.height * 0.63, // Adjust this value as needed
                      width: size.width * 2, // Adjust this value to fit all columns
                      child: ListView.separated(
                        itemBuilder: (context, index) {
                          final data = teachersData[index];

                          return InkWell(
                              //    Navigator.push(context, MaterialPageRoute(builder: (context) => StudentDetail(email: '213',),));
                              onTap: () {
                                setState(() {
                                  _selectedRowIndex = _selectedRowIndex == index ? null : index;
                                });
                              },

                            child: Row(
                              children: [

                                _buildDataCell(data["name"]!, size,index),
                                _buildDataCell(data["id"]!, size,index),
                                _buildDataCell(data["paidHours"]!, size,index),
                                _buildDataCell(data["grossPay"]!, size,index),
                                _buildDataCell(data["deduction"]!, size,index),
                                _buildDataCell(data["incentive"]!, size,index),
                                _buildDataCell(data["netPay"]!, size,index),
                                _buildDataCell(data["status"]!, size,index),
                              ],
                            ),
                          );
                        },
                        separatorBuilder: (context, index) => Divider(),
                        itemCount: teachersData.length,
                      ),
                    )
                  ],
                ),
              )

            ],
          ),
        ),
      ),
    );
  }
  Widget _buildHeaderCell(String text, Size size) {
    return Container(
      width: size.width * 0.25,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: themeObj.textBlack,
          fontWeight: FontWeight.w600,
          fontSize: size.width * 0.04,
        ),
      ),
    );
  }

  Widget _buildDataCell(String text, Size size, int rowIndex) {
    return Container(
      width: size.width * 0.25,
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      color: _selectedRowIndex == rowIndex ? Colors.lightBlue.withOpacity(0.3) : null,
      child: Text(
        text,
        style: GoogleFonts.openSans(
          color: text == "Paid" ? Colors.green : text == "UnPaid" ? Colors.red : themeObj.textBlack,
          fontWeight: FontWeight.w400,
          fontSize: size.width * 0.035,
        ),
      ),
    );
  }
}
