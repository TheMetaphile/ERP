import 'package:flutter/material.dart';

class SuccessfulAnimation extends StatefulWidget {
  const SuccessfulAnimation({super.key, required this.size});
  final Size size;
  @override
  State<SuccessfulAnimation> createState() => _SuccessfulAnimationState();
}

class _SuccessfulAnimationState extends State<SuccessfulAnimation> {
  late double initHeight;
  late double initWidth;
  bool gap = false;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setState(() {
      initHeight = widget.size.height;
      initWidth = widget.size.width;
    });
    Future.delayed(Durations.short4,() {
      setState(() {
        initHeight = widget.size.height*0.15;
        initWidth = widget.size.height*0.15;
        gap=true;
      });
    },);
  }
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        gap
            ?
        SizedBox(
          width: widget.size.width,
          height: widget.size.height*0.2,
        )
            : const SizedBox(),
        AnimatedContainer(
          height: initHeight,
          width: initWidth,
          duration: const Duration(milliseconds: 500),
          decoration: BoxDecoration(
            color: const Color.fromRGBO(202, 210, 239, 1),
            borderRadius: BorderRadius.all(Radius.circular(gap ? widget.size.height*0.15 : 0)),
            border: Border.all(
              color: const Color.fromRGBO(108, 137, 204, 1),
              width: 2
            )
          ),
          child: Icon(Icons.check,color: Color.fromRGBO(108, 137, 204, 1),size: widget.size.width*0.2,),
        ),
      ],
    );
  }
}
