import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: FeeListScreen(),
    );
  }
}

class FeeListScreen extends StatelessWidget {
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
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Student Fee Details'),
      ),
      body: ListView.builder(
        itemCount: studentData.length,
        itemBuilder: (context, index) {
          return _buildStudentCard(studentData[index]);
        },
      ),
    );
  }

  Widget _buildStudentCard(Map<String, dynamic> student) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${student['rollNo']}. ${student['name']}',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            _buildDetailRow('Total Fee', student['totalFee']),
            _buildDetailRow('Fine', student['fine']),
            _buildDetailRow('Discount', student['discount']),
            _buildDetailRow('Paid', student['paid']),
            _buildDetailRow('Payable', student['payable']),
            _buildDetailRow('Pending', student['pending'], isRed: true),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, dynamic value, {bool isRed = false}) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 2),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(
            value.toString(),
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: isRed ? Colors.red : null,
            ),
          ),
        ],
      ),
    );
  }
}