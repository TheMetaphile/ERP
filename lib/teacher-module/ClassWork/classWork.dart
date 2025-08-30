import 'dart:convert';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher Module/ClassWorks/classWorkAPI.dart';
import 'package:untitled/teacher-module/ClassWork/teacherClassWorkBloc/teacher_class_work_bloc.dart';
import 'package:untitled/teacher-module/ClassWork/teacherClassWorkBloc/teacher_class_work_event.dart';
import 'package:untitled/teacher-module/ClassWork/teacherClassWorkBloc/teacher_class_work_state.dart';
import 'package:untitled/utils/utils.dart';
import '../../utils/theme.dart';

class ClassWork extends StatefulWidget {
  const ClassWork({super.key});

  @override
  State<ClassWork> createState() => _ClassWorkState();
}

class _ClassWorkState extends State<ClassWork>
    with SingleTickerProviderStateMixin, AutomaticKeepAliveClientMixin {

  List<String> classSections = [];
  List<String> classSubjects = [];
  Map<String, dynamic> _storedData = {};

  CustomTheme themeObj = CustomTheme();
  ClassWorkAPI apiObj = ClassWorkAPI();
  bool isLoading = false;
  String date = DateTime.now().toString().split(" ")[0];
  String year = DateTime.now().toString().split(" ")[0].split("-")[0];
  String month = DateTime.now().toString().split(" ")[0].split("-")[1];

  TextEditingController chapter = TextEditingController();
  TextEditingController topic = TextEditingController();
  TextEditingController subTopics = TextEditingController();
  TextEditingController question = TextEditingController();

  late AnimationController _animationController;
  late Animation<double> _animation;
  bool _hasTriggeredInitialLoad = false;

  @override
  bool get wantKeepAlive => true; // Preserve widget state

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(parent: _animationController, curve: Curves.easeInOut);
    initializeDropdowns();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Only trigger initial load once when the widget is first built
    if (!_hasTriggeredInitialLoad) {
      final bloc = context.read<ClassWorkBloc>();
      if (!bloc.hasLoadedInitially) {
        bloc.add(LoadClassWorkData());
      }
      _hasTriggeredInitialLoad = true;
    }
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    chapter.dispose();
    topic.dispose();
    subTopics.dispose();
    question.dispose();
    super.dispose();
  }

  Future<void> _onRefresh() async {
    context.read<ClassWorkBloc>().add(RefreshClassWorkData());

    // Simple delay to allow BLoC to process and avoid infinite spinner
    await Future.delayed(Duration(milliseconds: 500));

    // The BLoC will handle UI updates via BlocBuilder
  }


  void initializeDropdowns() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? jsonString = prefs.getString('class_section_subjects');

    if (jsonString != null) {
      Map<String, dynamic> storedData = jsonDecode(jsonString);
      setState(() {
        _storedData = storedData;
      });
    }
  }

  void updateSectionsAndSubjects(String selectedClass, String selectedSection) {
    classSections = _storedData[selectedClass]?.keys.toList() ?? [];

    if (selectedClass.isNotEmpty && selectedSection.isNotEmpty) {
      classSubjects = (_storedData[selectedClass]?[selectedSection] as List<dynamic>?)
          ?.map((item) => item as String)
          .toList() ?? [];
    } else {
      classSubjects = [];
    }
  }

  // Get safe dropdown values from BLoC state
  String _getSafeDropdownValue(String? blocValue, List<String> items) {
    if (blocValue != null && blocValue.isNotEmpty && items.contains(blocValue)) {
      return blocValue;
    }
    return "";
  }

  @override
  Widget build(BuildContext context) {
    super.build(context); // Important for AutomaticKeepAliveClientMixin

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      body: RefreshIndicator(
        onRefresh: _onRefresh,
        color: Colors.orange,
        child: Container(
          color: themeObj.textWhite,
          child: BlocBuilder<ClassWorkBloc, ClassWorkState>(
            builder: (context, state) {
              // Update local dropdown lists based on BLoC state
              String currentClass = "";
              String currentSection = "";
              String currentSubject = "";

              if (state is ClassWorkLoaded) {
                currentClass = state.selectedClass;
                currentSection = state.selectedSection;
                currentSubject = state.selectedSubject;
              } else if (state is ClassWorkError) {
                currentClass = state.selectedClass;
                currentSection = state.selectedSection;
                currentSubject = state.selectedSubject;
              }

              updateSectionsAndSubjects(currentClass, currentSection);

              return Column(
                children: [
                  SizedBox(height: size.height * 0.02),
                  _buildDropdownRow(size, currentClass, currentSection, currentSubject),
                  Expanded(
                    child: _buildContent(context, state, size),
                  ),
                ],
              );
            },
          ),
        ),
      ),
      floatingActionButton: SizedBox(
        width: size.width * 0.35,
        child: TextButton(
          onPressed: () {
            publishPopup();
          },
          style: TextButton.styleFrom(backgroundColor: const Color.fromRGBO(96, 165, 250, 0.6)),
          child: Row(
            children: [
              Icon(CupertinoIcons.add_circled, color: themeObj.textBlack),
              SizedBox(width: size.width * 0.02),
              Text("Upload", style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.045)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDropdownRow(Size size, String currentClass, String currentSection, String currentSubject) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _buildDropdown(
              size,
              "Class",
              _getSafeDropdownValue(currentClass, _storedData.keys.toList()),
              _storedData.keys.toList(),
                  (newValue) {
                context.read<ClassWorkBloc>().add(UpdateFilters(
                  selectedClass: newValue ?? "",
                  selectedSection: "",
                  selectedSubject: "",
                ));
              }
          ),
          SizedBox(width: size.width * 0.02),
          _buildDropdown(
              size,
              "Section",
              _getSafeDropdownValue(currentSection, classSections),
              classSections,
                  (newValue) {
                context.read<ClassWorkBloc>().add(UpdateFilters(
                  selectedClass: currentClass,
                  selectedSection: newValue ?? "",
                  selectedSubject: "",
                ));
              }
          ),
          SizedBox(width: size.width * 0.02),
          _buildDropdown(
              size,
              "Subject",
              _getSafeDropdownValue(currentSubject, classSubjects),
              classSubjects,
                  (newValue) {
                context.read<ClassWorkBloc>().add(UpdateFilters(
                  selectedClass: currentClass,
                  selectedSection: currentSection,
                  selectedSubject: newValue ?? "",
                ));
              }
          ),
        ],
      ),
    );
  }

  Widget _buildContent(BuildContext context, ClassWorkState state, Size size) {
    if (state is ClassWorkLoading) {
      return Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      );
    } else if (state is ClassWorkLoaded) {
      if (state.classWorkList.isEmpty) {
        return SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: SizedBox(
            height: MediaQuery.of(context).size.height - 200,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.class_outlined, size: 100, color: Colors.grey[400]),
                  const SizedBox(height: 20),
                  Text(
                    "No classwork found",
                    style: TextStyle(fontSize: 18, color: Colors.grey[600]),
                  ),
                  if (state.selectedClass.isEmpty ||
                      state.selectedSection.isEmpty ||
                      state.selectedSubject.isEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Text(
                        "Please select Class, Section & Subject",
                        style: TextStyle(fontSize: 14, color: Colors.grey[500]),
                      ),
                    ),
                ],
              ),
            ),
          ),
        );
      }
      return _buildClassworkList(size, themeObj, state.classWorkList);
    } else if (state is ClassWorkError) {
      return RefreshIndicator(
        onRefresh: _onRefresh,
        color: Colors.orange,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Container(
            height: MediaQuery.of(context).size.height - 200,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.error_outline, size: 64, color: Colors.red),
                  const SizedBox(height: 16),
                  Text('Error: ${state.message}'),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => _onRefresh(),
                    child: const Text('Retry'),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    } else {
      return const SingleChildScrollView(
        physics: AlwaysScrollableScrollPhysics(),
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Text('Please wait...'),
          ),
        ),
      );
    }
  }

  Widget _buildDropdown(Size size, String hint, String value, List<String> items, Function(String?) onChanged) {
    return Container(
      width: size.width * 0.3,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.grey),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          isExpanded: true,
          hint: Text(hint, style: GoogleFonts.poppins(color: themeObj.textgrey, fontSize: size.width * 0.035)),
          value: value.isEmpty ? null : value,
          onChanged: onChanged,
          items: items.map((String option) {
            return DropdownMenuItem<String>(
              value: option,
              child: Text(option, style: GoogleFonts.poppins(color: themeObj.textBlack, fontSize: size.width * 0.035)),
            );
          }).toList(),
          icon: Icon(Icons.arrow_drop_down, color: themeObj.textgrey),
          borderRadius: BorderRadius.circular(30),
          dropdownColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 16),
        ),
      ),
    );
  }

  Widget _buildClassworkList(Size size, CustomTheme themeObj, List<dynamic> classWorkList) {
    return AnimationLimiter(
      child: ListView.builder(
        physics: const AlwaysScrollableScrollPhysics(),
        itemCount: classWorkList.length,
        padding: const EdgeInsets.all(5),
        itemBuilder: (context, index) {
          final classWork = classWorkList[index];
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: Card(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: const BorderSide(color: Colors.grey)),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 5),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Card(
                              color: themeObj.secondayColor,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                              margin: EdgeInsets.zero,
                              child: Container(
                                width: size.width * 0.3,
                                child: Text(classWork["subject"], textAlign: TextAlign.center, style: GoogleFonts.openSans(fontSize: size.width * 0.05, color: themeObj.textBlack)),
                              ),
                            ),
                            Row(
                              children: [
                                Card(
                                  margin: EdgeInsets.zero,
                                  color: const Color.fromRGBO(96, 165, 250, 1),
                                  child: SizedBox(
                                    height: size.height * 0.045,
                                    child: Center(
                                      child: IconButton(
                                        onPressed: () {
                                          updatePopup(context, size, classWork["chapter"], classWork["topic"], classWork["description"], classWork["_id"]);
                                        },
                                        icon: Icon(Icons.edit, color: themeObj.textWhite, size: 20),
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(width: size.width * 0.02),
                                Card(
                                  margin: EdgeInsets.zero,
                                  color: Colors.red,
                                  child: SizedBox(
                                    height: size.height * 0.045,
                                    child: IconButton(
                                      onPressed: () async {
                                        SharedPreferences pref = await SharedPreferences.getInstance();
                                        String? accessToken = pref.getString("accessToken");

                                        final bloc = context.read<ClassWorkBloc>();
                                        bool status = await apiObj.deletedClassWork(accessToken!,
                                            bloc.selectedClass,
                                            month, year, classWork["_id"]);
                                        if (status) {
                                          showGreenSnackBar("Delete Success", context);
                                          context.read<ClassWorkBloc>().add(RefreshClassWorkData());
                                        } else {
                                          showRedSnackBar("Delete failed", context);
                                        }
                                      },
                                      icon: Icon(Icons.delete_forever, color: themeObj.textWhite, size: 20),
                                    ),
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                        SizedBox(height: size.height * 0.02),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Chapter:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                            SizedBox(width: size.width * 0.02),
                            SizedBox(
                                width: size.width * 0.7,
                                child: AutoSizeText(classWork["chapter"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500))),
                          ],
                        ),
                        SizedBox(height: size.height * 0.02),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            AutoSizeText("Topic:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                            SizedBox(width: size.width * 0.02),
                            SizedBox(
                                width: size.width * 0.7,
                                child: AutoSizeText(classWork["topic"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500))),
                          ],
                        ),
                        ExpansionTile(
                          shape: Border.all(color: Colors.transparent),
                          leading: AutoSizeText("Description:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.045, fontWeight: FontWeight.w600)),
                          title: const Text(""),
                          children: [
                            SizedBox(
                                width: size.width * 0.8,
                                child: AutoSizeText(classWork["description"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w500))),
                            SizedBox(height: size.height * 0.02),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                AutoSizeText("Date: ${classWork["date"]}", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                              ],
                            ),
                          ],
                        ),
                        index == classWorkList.length - 1 ? SizedBox(height: size.height * 0.02) : const SizedBox(),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  // Your existing popup methods with updated BLoC integration
  Future<void> publishPopup() async {
    Size size = MediaQuery.of(context).size;
    final bloc = context.read<ClassWorkBloc>();

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: themeObj.textgrey)),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Selected: ${bloc.selectedClass} - ${bloc.selectedSection} - ${bloc.selectedSubject}",
                                    style: GoogleFonts.openSans(fontSize: size.width * 0.03, color: Colors.grey[600])),
                                SizedBox(height: size.height * 0.01),
                                Text("Chapter", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                                SizedBox(height: size.height * 0.02),
                                SizedBox(
                                  height: size.height * 0.07,
                                  child: TextField(
                                    showCursor: false,
                                    controller: chapter,
                                    decoration: InputDecoration(
                                        hintText: "Chapter",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey))),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02),
                                Text("Topic", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                                SizedBox(height: size.height * 0.01),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 1,
                                    decoration: InputDecoration(
                                        hintText: "Topic",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Colors.grey))),
                                    controller: topic,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02),
                                Text("Question", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                                SizedBox(height: size.height * 0.01),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 6,
                                    decoration: InputDecoration(
                                        hintText: "Question",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey))),
                                    controller: question,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.03),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Container(
                                      width: size.width * 0.3,
                                      child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(backgroundColor: const Color.fromRGBO(209, 213, 219, 1), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                          onPressed: () {
                                            chapter.clear();
                                            topic.clear();
                                            question.clear();
                                            Navigator.pop(context);
                                          },
                                          child: Text("Cancel", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black))),
                                    ),
                                    Container(
                                      width: size.width * 0.3,
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                        onPressed: () async {
                                          if (chapter.text.isNotEmpty && topic.text.isNotEmpty && question.text.isNotEmpty) {
                                            if (bloc.selectedClass.isEmpty || bloc.selectedSection.isEmpty || bloc.selectedSubject.isEmpty) {
                                              showRedSnackBar("Please select Class, Section & Subject first", context);
                                              return;
                                            }

                                            Map<dynamic, dynamic>? upload = await uploadClassWork(
                                                bloc.selectedClass,
                                                bloc.selectedSection,
                                                bloc.selectedSubject,
                                                chapter.text.toString(),
                                                topic.text.toString(),
                                                question.text.toString()
                                            );

                                            if (upload != null) {
                                              showGreenSnackBar("Upload Success", context);
                                              context.read<ClassWorkBloc>().add(RefreshClassWorkData());
                                              chapter.clear();
                                              topic.clear();
                                              question.clear();
                                              Navigator.of(context).pop();
                                            } else {
                                              showRedSnackBar("Upload failed", context);
                                            }
                                          } else {
                                            showRedSnackBar("Please fill all the data", context);
                                          }
                                        },
                                        child: isLoading
                                            ? const CircularProgressIndicator(color: Colors.black)
                                            : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black)),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // Update your updatePopup method similarly using bloc.selectedClass, bloc.selectedSection, bloc.selectedSubject
  Future<void> updatePopup(BuildContext context, Size size, String chap, String top, String quest, String id) async {
    TextEditingController chapterController = TextEditingController(text: chap);
    TextEditingController topicController = TextEditingController(text: top);
    TextEditingController questionController = TextEditingController(text: quest);

    return showDialog(
      context: context,
      builder: (BuildContext dialogContext) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setInnerState) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: themeObj.textgrey)),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Chapter", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                                SizedBox(height: size.height * 0.02),
                                SizedBox(
                                  height: size.height * 0.07,
                                  child: TextField(
                                    showCursor: false,
                                    controller: chapterController,
                                    decoration: InputDecoration(
                                        hintText: "Chapter",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey))),
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02),
                                Text("Topic", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                                SizedBox(height: size.height * 0.01),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 1,
                                    decoration: InputDecoration(
                                        hintText: "Topic",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Colors.grey))),
                                    controller: topicController,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.02),
                                Text("Question", style: GoogleFonts.openSans(color: themeObj.textBlack, fontSize: size.width * 0.035, fontWeight: FontWeight.w600)),
                                SizedBox(height: size.height * 0.01),
                                SizedBox(
                                  child: TextField(
                                    maxLines: 6,
                                    decoration: InputDecoration(
                                        hintText: "Question",
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: themeObj.textgrey))),
                                    controller: questionController,
                                  ),
                                ),
                                SizedBox(height: size.height * 0.03),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Container(
                                      width: size.width * 0.3,
                                      child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(backgroundColor: const Color.fromRGBO(209, 213, 219, 1), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                          onPressed: () {
                                            Navigator.pop(context);
                                          },
                                          child: Text("Cancel", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black))),
                                    ),
                                    Container(
                                      width: size.width * 0.3,
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                        onPressed: () async {
                                          final bloc = context.read<ClassWorkBloc>();
                                          bool status = await updateClassWork(bloc.selectedClass, id, bloc.selectedSubject, chapterController.text.toString(), topicController.text.toString(), questionController.text.toString());
                                          if (status) {
                                            showGreenSnackBar("Update Success", context);
                                            context.read<ClassWorkBloc>().add(RefreshClassWorkData());
                                            Navigator.of(context).pop();
                                          } else {
                                            showRedSnackBar("Update failed", context);
                                          }
                                        },
                                        child: isLoading
                                            ? const CircularProgressIndicator(color: Colors.black)
                                            : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black)),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // Keep all your existing helper methods (uploadClassWork, updateClassWork)
  Future<dynamic> uploadClassWork(String Class, String section, String subject, String chapter, String topic, String description) async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      String? email = pref.getString("email");

      var uploadMap = await apiObj.uploadClassWork(accessToken!, email!, date, Class, section, subject, chapter, topic, description);
      return uploadMap;
    } catch (e) {
      print('Error uploading classwork: $e');
      showRedSnackBar("Failed to upload. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<dynamic> updateClassWork(String Class, String id, String subject, String chapter, String topic, String description) async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      bool status = await apiObj.updatedClassWork(accessToken!, Class, id, date, subject, chapter, topic, description);
      return status;
    } catch (e) {
      print('Error updating classwork: $e');
      showRedSnackBar("Failed to update. Please try again.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
}
