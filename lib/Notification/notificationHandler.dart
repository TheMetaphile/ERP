import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

class NotificationHandler {
  static Future<void> initialize() async {
    // Request permission for iOS devices
    await FirebaseMessaging.instance.requestPermission();

    // Handler for background messages
    FirebaseMessaging.onBackgroundMessage(_backgroundHandler);

    // Handler for when the app is in the foreground
    FirebaseMessaging.onMessage.listen(_foregroundHandler);

    // Handler for when the app is in the background and user taps on the notification
    FirebaseMessaging.onMessageOpenedApp.listen(_onNotificationTapped);

    // Check if the app was launched from a notification
    await _checkInitialMessage();
  }

  static Future<void> _backgroundHandler(RemoteMessage message) async {
    print("Handling a background message: ${message.messageId}");
    // You can process the message here if needed
  }

  static void _foregroundHandler(RemoteMessage message) {
    print("Received a foreground message: ${message.messageId}");
    if (message.notification != null) {
      LocalNotificationService.display(message);
    }
  }

  static void _onNotificationTapped(RemoteMessage message) {
    print("Notification tapped: ${message.messageId}");
    // Handle the tap event, e.g., navigate to a specific screen
  }

  static Future<void> _checkInitialMessage() async {
    RemoteMessage? initialMessage = await FirebaseMessaging.instance.getInitialMessage();
    if (initialMessage != null) {
      print("App launched from notification: ${initialMessage.messageId}");
      // Handle the initial message, e.g., navigate to a specific screen
    }
  }
}