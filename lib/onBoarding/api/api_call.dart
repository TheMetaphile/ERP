import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class ApiCall{
  Future<Map> sendPostRequest(BuildContext context,String apiUrl,Map<String,dynamic> dataMap,String successMsg,String errorMsg) async {
    bool error=true;
    Map<String,dynamic> output = {};
    await http.post(Uri.parse(apiUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(dataMap),
    ).then((response){
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              behavior: SnackBarBehavior.floating,
              margin: const EdgeInsets.all(5),
              shape: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(10))
              ),
              backgroundColor: Colors.green,
              content: Text(successMsg,
                style:GoogleFonts.openSans(
                  color: Colors.black,
                  fontSize: 14,
                ),
              ),
            ),
        );
        output = jsonDecode(response.body);
        error = false;
      }
      else {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              behavior: SnackBarBehavior.floating,
              margin: const EdgeInsets.all(5),
              shape: const OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(10))
              ),
              backgroundColor: Colors.red,
              content: Text(errorMsg,
                style: GoogleFonts.openSans(
                  color: Colors.black,
                  fontSize: 14,
                ),
              ),
            ),
        );
        error = true;
      }
    });


    return {
      "error" : error,
      "data" : output
    };
  }
}