import 'package:flutter/material.dart';
import 'package:metaphile_erp/Screens/navigation_bar/Screens/navigtion_bar.dart' as nav;
import 'package:metaphile_erp/Screens/onBoarding/Screens/intro.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Intro()
    );
  }
}

