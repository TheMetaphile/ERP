import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:untitled/utils/theme.dart';

class Birthday extends StatefulWidget {
  const Birthday({Key? key}) : super(key: key);

  @override
  State<Birthday> createState() => _BirthdayState();
}

class _BirthdayState extends State<Birthday> {
  CustomTheme themeObj = CustomTheme();
  String selectedFilter = 'All';

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text(
          "Birthdays",
          style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w500,
            fontSize: size.width * 0.05,
          ),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: size.height * 0.02),
            _buildFilterButtons(size),
            SizedBox(height: size.height * 0.02),
            _buildSectionTitle("Today's", size),
            SizedBox(height: size.height * 0.01),
            _buildBirthdayCard(size, isToday: true),
            SizedBox(height: size.height * 0.02),
            _buildSectionTitle("Days To Go", size),
            SizedBox(height: size.height * 0.01),
            Expanded(
              child: ListView.builder(
                itemCount: 10,
                itemBuilder: (context, index) => _buildBirthdayCard(size),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterButtons(Size size) {
    return Row(
      children: ['All', 'Teacher', 'Student'].map((filter) {
        return Padding(
          padding: EdgeInsets.only(right: size.width * 0.02),
          child: ElevatedButton(
            onPressed: () => setState(() => selectedFilter = filter),
            style: ElevatedButton.styleFrom(
              backgroundColor: selectedFilter == filter
                  ? themeObj.primayColor
                  : Color.fromRGBO(209, 213, 219, 1),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: Text(
              filter,
              style: GoogleFonts.openSans(
                color: themeObj.textBlack,
                fontWeight: FontWeight.w400,
                fontSize: size.width * 0.035,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildSectionTitle(String title, Size size) {
    return Text(
      title,
      style: GoogleFonts.openSans(
        fontSize: size.width * 0.05,
        fontWeight: FontWeight.w600,
        color: themeObj.textBlack,
      ),
    );
  }

  Widget _buildBirthdayCard(Size size, {bool isToday = false}) {
    return Card(
      elevation: 3,
      margin: EdgeInsets.only(bottom: size.height * 0.01),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: EdgeInsets.all(size.width * 0.03),
        child: Row(
          children: [
            CircleAvatar(
              radius: size.width * 0.08,
              backgroundImage: AssetImage("assets/Images/Test Account.png"),
            ),
            SizedBox(width: size.width * 0.03),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Abhishek",
                    style: GoogleFonts.openSans(
                      color: Color(0xFF045156),
                      fontSize: size.width * 0.045,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    "11th 'A'",
                    style: GoogleFonts.openSans(
                      color: Color(0xFF045156),
                      fontSize: size.width * 0.035,
                    ),
                  ),
                  Text(
                    "Birthday: 5th of May",
                    style: GoogleFonts.openSans(
                      color: Color(0xFF045156),
                      fontSize: size.width * 0.035,
                    ),
                  ),
                  Text(
                    isToday
                        ? "Send a Birthday wish to Abhishek..."
                        : "9 Days to go...",
                    style: GoogleFonts.openSans(
                      color: Color(0xFF1FE23E),
                      fontSize: size.width * 0.035,
                    ),
                  ),
                ],
              ),
            ),
            ElevatedButton.icon(
              onPressed: () {},
              icon: Icon(Icons.message_outlined, size: size.width * 0.04,color:themeObj.textBlack),
              label: Text(
                "Message",
                style: GoogleFonts.openSans(fontSize: size.width * 0.03,color:themeObj.textBlack),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color.fromRGBO(22, 101, 52, 0.6),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}