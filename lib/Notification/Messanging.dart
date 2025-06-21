import 'dart:typed_data';
import 'dart:ui';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'dart:math';
import 'package:http/http.dart' as http;

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // Initialize Firebase
  await Firebase.initializeApp();

  // Initialize local notifications
  await FCMService.initializeLocalNotifications();
  //
  // // Show the notification
  // await FCMService.showNotification(message);
}

class FCMService {
  static final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  static final FlutterLocalNotificationsPlugin _flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

  static Future<void> initializeFCM() async {
    await _firebaseMessaging.requestPermission();

    FirebaseMessaging.onMessage.listen(handleMessage);
    FirebaseMessaging.onMessageOpenedApp.listen(handleMessage);
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    await initializeLocalNotifications();
  }

  static Future<void> initializeLocalNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid = AndroidInitializationSettings('@mipmap/ic_launcher');
    const DarwinInitializationSettings initializationSettingsIOS = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    const InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );
    await _flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  static Future<String?> getDeviceToken() async {
    return await _firebaseMessaging.getToken();
  }

  static Future<void> showNotification(RemoteMessage message) async {
    const String channelId = 'high_importance_channel';
    const String channelName = 'High Importance Notifications';
    const String channelDescription = 'This channel is used for important notifications.';

    final String? imageUrl = message.notification?.android?.imageUrl ?? message.notification?.apple?.imageUrl;

    AndroidNotificationDetails? androidPlatformChannelSpecifics;
    DarwinNotificationDetails? iOSPlatformChannelSpecifics;

    if (imageUrl != null) {
      final ByteData imageBytes = await _getByteDataFromUrl(imageUrl);
      final BigPictureStyleInformation bigPictureStyleInformation = BigPictureStyleInformation(
        ByteArrayAndroidBitmap(imageBytes.buffer.asUint8List()),
        largeIcon: ByteArrayAndroidBitmap(imageBytes.buffer.asUint8List()),
        contentTitle: message.notification?.title ?? 'Notification',
        htmlFormatContentTitle: true,
        summaryText: message.notification?.body ?? 'You have a new message',
        htmlFormatSummaryText: true,
      );

      androidPlatformChannelSpecifics = AndroidNotificationDetails(
        channelId,
        channelName,
        channelDescription: channelDescription,
        importance: Importance.max,
        priority: Priority.high,
        ticker: 'ticker',
        color: Color(Random().nextInt(0xFFFFFFFF)),
        styleInformation: bigPictureStyleInformation,
        enableLights: true,
        enableVibration: true,
        vibrationPattern: Int64List.fromList([0, 500, 200, 500]),
      );

      iOSPlatformChannelSpecifics = DarwinNotificationDetails(
        presentAlert: true,
        presentBadge: true,
        presentSound: true,
        sound: 'notification_sound.aiff',
        badgeNumber: 1,
        attachments: [DarwinNotificationAttachment(imageUrl)],
      );
    } else {
      androidPlatformChannelSpecifics = AndroidNotificationDetails(
        channelId,
        channelName,
        channelDescription: channelDescription,
        importance: Importance.max,
        priority: Priority.high,
        ticker: 'ticker',
        color: Color(Random().nextInt(0xFFFFFFFF)),
        styleInformation: BigTextStyleInformation(
          message.notification?.body ?? 'You have a new message',
          htmlFormatBigText: true,
          contentTitle: message.notification?.title ?? 'Notification',
          htmlFormatContentTitle: true,
          summaryText: 'New Message',
          htmlFormatSummaryText: true,
        ),
      );

      iOSPlatformChannelSpecifics = const DarwinNotificationDetails(
        presentAlert: true,
        presentBadge: true,
        presentSound: true,
        sound: 'notification_sound.aiff',
        badgeNumber: 1,
      );
    }

    final NotificationDetails platformChannelSpecifics = NotificationDetails(
      android: androidPlatformChannelSpecifics,
      iOS: iOSPlatformChannelSpecifics,
    );

    await FlutterLocalNotificationsPlugin().show(
      0,
      message.notification?.title ?? 'Notification',
      message.notification?.body ?? 'You have a new message',
      platformChannelSpecifics,
      payload: message.data.toString(),
    );
  }

  static Future<ByteData> _getByteDataFromUrl(String url) async {
    final http.Response response = await http.get(Uri.parse(url));
    return ByteData.view(Uint8List.fromList(response.bodyBytes).buffer);
  }

  static void handleMessage(RemoteMessage message) {
    print("Handling a message: ${message.messageId}");
    FCMService.showNotification(message);
  }
}


