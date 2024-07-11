import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/theme.dart';

class TimeTable extends StatefulWidget {
  const TimeTable({super.key});

  @override
  State<TimeTable> createState() => _TimeTableState();
}

class _TimeTableState extends State<TimeTable> {
  String? selectday;
  List<String> dayOption = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  final List<Map<String, String>> schedule = [
    {'lecture': '1', 'subject': 'Hindi', 'teacher': 'Sachin', 'timing': '7:30 am - 8:10 am'},
    {'lecture': '2', 'subject': 'Economics', 'teacher': 'Virat Kohli', 'timing': '8:10 am - 8:50 am'},
    {'lecture': '3', 'subject': 'Chemistry', 'teacher': 'Vincent Walters', 'timing': '8:50 am - 9:30 am'},
    {'lecture': 'LUNCH', 'subject': '', 'teacher': '', 'timing': '9:30 am - 10:10 am'},
    {'lecture': '4', 'subject': 'Sanskrit', 'teacher': 'Flora Christensen', 'timing': '10:10 am - 10:50 am'},
    {'lecture': '5', 'subject': 'Physics', 'teacher': 'Ankit Sharma', 'timing': '10:50 am - 11:30 am'},
    {'lecture': '6', 'subject': 'Computer', 'teacher': 'Narendra Modi', 'timing': '11:30 am - 12:10 pm'},
    {'lecture': '7', 'subject': 'Maths', 'teacher': 'Bhuvneshwar Tyagi', 'timing': '12:10 pm - 12:50 pm'},
  ];

  CustomTheme themeObj = CustomTheme();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Time Table",
          style: TextStyle(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.05),
        ),
      ),
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
                  "Day-wise Lectures",
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w600, fontSize: size.width * 0.045),
                ),
                Card(
                  child: SizedBox(
                    width: size.width * 0.4,
                    height: size.height * 0.05,
                    child: DropdownButton<String>(
                      isExpanded: true,
                      borderRadius: BorderRadius.circular(12),
                      hint: const Text("Select Day"),
                      alignment: Alignment.center,
                      padding: EdgeInsets.all(8),
                      icon: Icon(Icons.keyboard_arrow_down_sharp),
                      underline: Container(),
                      value: selectday,
                      onChanged: (newValue) {
                        setState(() {
                          selectday = newValue!;
                        });
                      },
                      items: dayOption.map((String option) {
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
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFFE8F5E9), Color(0xFFC8E6C9)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
                child: ListView.builder(
                  itemCount: schedule.length,
                  itemBuilder: (context, index) {
                    final item = schedule[index];
                    if (item['lecture'] == 'LUNCH') {
                      return Container(
                        color: Color(0xFFA5D6A7),
                        padding: EdgeInsets.symmetric(vertical: 16),
                        child: Center(
                          child: Text(
                            'LUNCH',
                            style: GoogleFonts.openSans(fontWeight: FontWeight.w700, fontSize: size.width*0.045),
                          ),
                        ),
                      );
                    }
                    return Card(
                      margin: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      child: ListTile(
                        title: Text('${item['lecture']}. ${item['subject']}',style: GoogleFonts.openSans(fontWeight: FontWeight.w400, fontSize: size.width*0.035),),
                        subtitle: Text(item['teacher']!,style: GoogleFonts.openSans(fontWeight: FontWeight.w400, fontSize: size.width*0.035),),
                        leading: CircleAvatar(
                          backgroundColor: Color(0xFF66BB6A),
                          child: Text(item['lecture']!,style: GoogleFonts.openSans(fontWeight: FontWeight.w400, fontSize: size.width*0.035),),
                        ),
                        trailing: Text(item['timing']!,style: GoogleFonts.openSans(fontWeight: FontWeight.w400, fontSize: size.width*0.035),),
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}