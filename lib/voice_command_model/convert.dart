import 'package:translator/translator.dart';

Future<String> translateText(String text) async {
  final translator = GoogleTranslator();
  await translator.translate(text, to: 'hi',from: "auto").then((hi) async {
    print("value : ${hi.text}");
    await translator.translate(hi.text, to: 'en',from: "hi").then((en){
      text=en.text;
    });
  });

  return text;
}

