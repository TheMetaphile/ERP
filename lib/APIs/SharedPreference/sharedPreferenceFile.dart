import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class UserPreferences {
  static Future<void> saveDetails(Map<String, dynamic> userDetails,String key) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(key, json.encode(userDetails));
  }

  static Future<Map<String, dynamic>> getDetails(String key) async {
    final prefs = await SharedPreferences.getInstance();
    String? userDetailsString = prefs.getString(key);
    if (userDetailsString != null) {
      return json.decode(userDetailsString) as Map<String, dynamic>;
    }
    return {};
  }
}