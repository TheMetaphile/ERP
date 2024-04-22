import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Schedule',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Tuesday'),
        ),
        body: Center(
          child: ScheduleDropdown(),
        ),
      ),
    );
  }
}

class ScheduleDropdown extends StatefulWidget {
  @override
  _ScheduleDropdownState createState() => _ScheduleDropdownState();
}

class _ScheduleDropdownState extends State<ScheduleDropdown> {
  Map<String, String>? selectedClass;

  List<Map<String, String>> classes = [
    {'time': '09:30 - 10:30', 'subject': 'Chemistry'},
    {'time': '10:30 - 11:30', 'subject': 'Maths'},
    {'time': '11:30 - 12:30', 'subject': 'Biology'},
    {'time': '12:30 - 01:30', 'subject': 'Break'},
    {'time': '01:30 - 02:30', 'subject': 'Physics'},
    {'time': '02:30 - 03:30', 'subject': 'English', 'class': 'You'},
  ];

  @override
  Widget build(BuildContext context) {
    return DropdownButton<Map<String, String>>(
      value: selectedClass,
      icon: Icon(Icons.arrow_drop_down),
      iconSize: 24,
      elevation: 16,
      isExpanded: true,
      underline: Container(
        height: 2,
        color: Colors.grey[300],
      ),
      onChanged: (Map<String, String>? newValue) {
        setState(() {
          selectedClass = newValue;
        });
      },
      items: classes.map<DropdownMenuItem<Map<String, String>>>((Map<String, String> value) {
        return DropdownMenuItem<Map<String, String>>(
          value: value,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Expanded(child: Text(value['time']!)),
              Expanded(child: Text(value['subject']!)),
              Expanded(child: Text(value['class'] ?? '')),
            ],
          ),
        );
      }).toList(),
    );
  }
}