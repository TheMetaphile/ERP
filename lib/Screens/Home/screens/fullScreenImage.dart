import 'package:flutter/material.dart';

class OpenImage extends StatelessWidget {
  const OpenImage({super.key, required this.imagePath});
  final String imagePath;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,),
      backgroundColor: Colors.black,
      body: Center(child: Image.asset(imagePath,fit: BoxFit.cover,)),
    );
  }
}
