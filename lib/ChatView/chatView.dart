

import 'package:chatview/chatview.dart';
import 'package:flutter/material.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}
class Data {

  static List<Message> messageList = [
    Message(
      id: '1',
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
      message: 'Hello',
      sendBy: '2',
      messageType: MessageType.text,
    ),
    Message(
      id: '2',
      createdAt: DateTime.now().subtract(const Duration(hours: 2)),
      message: 'Hi there!',
      sendBy: '1',
      messageType: MessageType.text,
    ),
    Message(
      id: '1',
      createdAt: DateTime.now().subtract(const Duration(minutes: 30)),
      message: 'How are you?',
      sendBy: '2',
      messageType: MessageType.text,
    ),
    Message(
      id: '2',
      createdAt: DateTime.now().subtract(const Duration(minutes: 10)),
      message: 'I\'m doing great, thanks for asking!',
      sendBy: '1',
      messageType: MessageType.text,
    ),
  ];
}
class _ChatScreenState extends State<ChatScreen>  {

  final currentUser = ChatUser(
    id: '1',
    name: 'Simform',
    profilePhoto: "https://www.example.com/path/to/your/image.jpg",
  );

  final chatController = ChatController(
    initialMessageList:Data.messageList,
    scrollController: ScrollController(),
    chatUsers: [
      ChatUser(
        id: '2',
        name: 'Jhon',
        profilePhoto: 'Profile photo URL',
      ),
      ChatUser(
        id: '3',
        name: 'Mike',
        profilePhoto: 'Profile photo URL',
      ),
    ],
  );
  void back() {
      Navigator.pop(context);
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
          body:  Container(
            decoration: BoxDecoration(
              image: DecorationImage(

                image: AssetImage("assets/Images/Admin Drawer/enlarge_Picture1.png")
              )
            ),
            child: ChatView(
              currentUser: currentUser,
              chatController: chatController,
              chatViewState: ChatViewState.hasMessages,
              // chatBackgroundConfig:ChatBackgroundConfiguration(
              //   backgroundImage: "assets/Images/Background/bg-25.jpg",
              // ) ,

              onSendTap: _onSendTap,
              featureActiveConfig: const FeatureActiveConfig(
                lastSeenAgoBuilderVisibility: true,
                receiptsBuilderVisibility: true,
              ),
              chatViewStateConfig: ChatViewStateConfiguration(
                loadingWidgetConfig: ChatViewStateWidgetConfiguration(
                  loadingIndicatorColor: Colors.blue,
                ),
                onReloadButtonTap: () {},
              ),
              sendMessageConfig: const SendMessageConfiguration(
                  textFieldConfig: TextFieldConfiguration(
                      textStyle: TextStyle(
                          color: Colors.black
                      )
                  )
              ),

              appBar: const ChatViewAppBar(
                backGroundColor: Colors.grey,
                backArrowColor: Colors.white,
                chatTitle: "Name",
                chatTitleTextStyle: TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  letterSpacing: 0.25,
                ),
                userStatus: "online",
                profilePicture: "",

                actions: [
                  Icon(Icons.settings)
                ],
              ),



            ),
          ),
        );
  }

  void _onSendTap(
      String message,
      ReplyMessage replyMessage,
      MessageType messageType,
      ) {
    print(message);
    print(replyMessage);
    print(messageType);
    final id = int.parse(Data.messageList.last.id) + 1;
    chatController.addMessage(
      Message(
        id: id.toString(),
        createdAt: DateTime.now(),
        message: message,
        sendBy: currentUser.id,
        replyMessage: replyMessage,
        messageType: messageType,
      ),
    );
    Future.delayed(const Duration(milliseconds: 300), () {
      chatController.initialMessageList.last.setStatus =
          MessageStatus.undelivered;
    });
    Future.delayed(const Duration(seconds: 1), () {
      chatController.initialMessageList.last.setStatus = MessageStatus.read;
    });

  }
}