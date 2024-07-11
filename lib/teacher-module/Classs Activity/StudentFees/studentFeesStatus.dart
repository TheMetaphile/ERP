import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../utils/theme.dart';

// Assuming CustomTheme and other dependencies are correctly imported
// from '../../../utils/theme.dart'

class StudentFeesStatus extends StatefulWidget {
  const StudentFeesStatus({Key? key}) : super(key: key);

  @override
  State<StudentFeesStatus> createState() => _StudentFeesStatusState();
}

class _StudentFeesStatusState extends State<StudentFeesStatus> {
  CustomTheme themeObj = CustomTheme();
  String? selectedStatus;
  List<String> statusOption = [
    'Paid',
    'Pending', // No trailing comma here
  ];

  int? selectedRowIndex;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.white, // Assuming themeObj.textWhite is Color
      // appBar: AppBar(
      //   leading: IconButton(
      //     onPressed: () {
      //       Navigator.pop(context);
      //     },
      //     icon: Icon(Icons.arrow_back_ios, color: Colors.black), // Assuming themeObj.textBlack is Color
      //   ),
      //   backgroundColor: themeObj.primayColor, // Assuming themeObj.primaryColor is Color
      //   title: Text(
      //     "Fees Status",
      //     style: TextStyle(
      //       color: Colors.black, // Assuming themeObj.textBlack is Color
      //       fontWeight: FontWeight.w400,
      //       fontSize: size.width * 0.05,
      //     ),
      //   ),
      // ),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 3),
        width: size.width,
        height: size.height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.01),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Student Fee",
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(
                    color: Colors.black, // Assuming themeObj.textBlack is Color
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.045,
                  ),
                ),
                Card(
                  child: SizedBox(
                    width: size.width * 0.4,
                    height: size.height * 0.05,
                    child: DropdownButton<String>(
                      isExpanded: true,
                      borderRadius: BorderRadius.circular(12),
                      hint: const Text("Select Status"),
                      alignment: Alignment.center,
                      padding: EdgeInsets.all(8),
                      icon: Icon(Icons.keyboard_arrow_down_sharp),
                      underline: Container(),
                      value: selectedStatus,
                      onChanged: (newValue) {
                        setState(() {
                          selectedStatus = newValue!;
                        });
                      },
                      items: statusOption.map((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(option, overflow: TextOverflow.ellipsis),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.01),
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
            Expanded(child: FeeListScreen(selectedRowIndex: selectedRowIndex, onRowTap: (index) {
              setState(() {
                selectedRowIndex = index;
              });
            })),
          ],
        ),
      ),
    );
  }
}

class FeeListScreen extends StatelessWidget {
  final int? selectedRowIndex;
  final Function(int) onRowTap;

  FeeListScreen({required this.selectedRowIndex, required this.onRowTap});

  final List<Map<String, dynamic>> studentData = [
    {'rollNo': 1, 'name': 'Aarav Bhardwaj', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 2, 'name': 'Ananya Bhatt', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 3, 'name': 'Aryan Nair', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 4, 'name': 'Gavin Gonzalez', 'totalFee': 15400, 'fine': 1150, 'discount': 0, 'paid': 0, 'payable': 16550, 'pending': 16550},
    {'rollNo': 5, 'name': 'Kartik Bhatt', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 6, 'name': 'Kiran Sharma', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 7, 'name': 'Lavanya Patel', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 8, 'name': 'Neha Kapoor', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 9, 'name': 'Nisha Sharma', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 10, 'name': 'Pranav Patel', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 11, 'name': 'Riya Bhardwaj', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 12, 'name': 'Saanvi Sen', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 13, 'name': 'Salman Khan', 'totalFee': 15400, 'fine': 600, 'discount': 2080, 'paid': 4050, 'payable': 13920, 'pending': 9870},
    {'rollNo': 14, 'name': 'Sneha Patel', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 14, 'name': 'Sneha Patel', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 14, 'name': 'Sneha Patel', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
    {'rollNo': 14, 'name': 'Sneha Patel', 'totalFee': 5000, 'fine': 0, 'discount': 0, 'paid': 0, 'payable': 5000, 'pending': 5000},
  ];

  CustomTheme themeObj = CustomTheme();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.01),
            DataTable(
              headingRowColor:
              MaterialStateColor.resolveWith((states) => themeObj.secondayColor),
              columns: [
                DataColumn(
                    label: Text(
                      'Roll No.',
                      style: GoogleFonts.openSans(
                          fontSize: size.width * 0.04,
                          fontWeight: FontWeight.w500,
                          color: themeObj.textBlack),
                    )),
                DataColumn(
                    label: Text('Name',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.035,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
                DataColumn(
                    label: Text('Total Fee',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.035,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
                DataColumn(
                    label: Text('Fine',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.04,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
                DataColumn(
                    label: Text('Discount',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.04,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
                DataColumn(
                    label: Text('Paid',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.04,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
                DataColumn(
                    label: Text('Payable',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.04,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
                DataColumn(
                    label: Text('Pending',
                        style: GoogleFonts.openSans(
                            fontSize: size.width * 0.04,
                            fontWeight: FontWeight.w500,
                            color: themeObj.textBlack))),
              ],
              rows: studentData.asMap().entries.map((entry) {
                int index = entry.key;
                Map<String, dynamic> student = entry.value;
                return DataRow(
                  color: MaterialStateColor.resolveWith((states) {
                    if (selectedRowIndex == index) {
                      return themeObj.secondayColor;
                    }
                    return Colors.transparent;
                  }),
                  cells: [
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['rollNo'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['name'],
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['totalFee'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['fine'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['discount'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['paid'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['payable'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: themeObj.textBlack),
                        ),
                      ),
                    ),
                    DataCell(
                      GestureDetector(
                        onTap: () {
                          onRowTap(index);
                        },
                        child: Text(
                          student['pending'].toString(),
                          style: GoogleFonts.openSans(
                              fontSize: size.width * 0.04,
                              fontWeight: FontWeight.w400,
                              color: Colors.red),
                        ),
                      ),
                    ),
                  ],
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }
}
