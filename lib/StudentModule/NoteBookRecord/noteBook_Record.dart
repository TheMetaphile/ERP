import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shimmer/shimmer.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import '../../APIs/StudentModuleAPI/NoteBookRecord/noteBook_Record_API.dart';
import '../../CustomTheme/customTheme.dart';

class NoteBookRecord extends StatefulWidget {
  const NoteBookRecord({Key? key, required this.currentClass, required this.section}) : super(key: key);
  final String currentClass;
  final String section;

  @override
  State<NoteBookRecord> createState() => _NoteBookRecordState();
}

class _NoteBookRecordState extends State<NoteBookRecord> with SingleTickerProviderStateMixin {
  List<Map<String, dynamic>>? checkedStudentList;
  String selectedSubject = "";
  List<String>? subjectOptions;
  bool isLoading = false;
  NotebookRecordApi notebookObj = NotebookRecordApi();
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 1000),
    );
    fetchSubjects();
    fetchNoteBookRecord();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Future<void> fetchNoteBookRecord() async {
    setState(() => isLoading = true);
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception('Access token is null');
      checkedStudentList = (await notebookObj.fetchNoteBookRecord(accessToken, selectedSubject)).cast<Map<String, dynamic>>();
    } catch (e) {
      print('Error fetching NoteBookRecord data: $e');
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error fetching data: $e')));
    } finally {
      setState(() => isLoading = false);
      _animationController.forward();
    }
  }

  Future<void> fetchSubjects() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    subjectOptions = pref.getStringList("subjects");
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        elevation: 0,
        backgroundColor: CustomTheme.primaryColor,
        title: Text("Notebook Record", style: themeObj.bigNormalText.copyWith(fontSize: size.width * 0.05)),
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          _buildSubjectDropdown(size, themeObj),
          Expanded(
            child: isLoading ? _buildShimmerEffect() : _buildContent(),
          ),
        ],
      ),
    );
  }

  Widget _buildSubjectDropdown(Size size, CustomTheme themeObj) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CustomTheme.primaryColor.withOpacity(0.1),
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(30),
          bottomRight: Radius.circular(30),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text("Select Subject", style: themeObj.bigNormalText),
          Container(
            width: size.width * 0.4,
            padding: EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: CustomTheme.whiteColor,
              borderRadius: BorderRadius.circular(25),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 1,
                  blurRadius: 5,
                  offset: Offset(0, 3),
                ),
              ],
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                isExpanded: true,
                hint: Text("Subject", style: themeObj.normalText),
                value: selectedSubject.isEmpty ? null : selectedSubject,
                onChanged: (newValue) {
                  setState(() {
                    selectedSubject = newValue!;
                    checkedStudentList = [];
                    fetchNoteBookRecord();
                  });
                },
                items: subjectOptions?.map((String option) {
                  return DropdownMenuItem<String>(
                    value: option,
                    child: Text(option, style: themeObj.normalText),
                  );
                }).toList() ?? [],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildShimmerEffect() {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        itemCount: 5,
        itemBuilder: (_, __) => Padding(
          padding: const EdgeInsets.only(bottom: 8.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 48.0,
                height: 48.0,
                color: Colors.white,
              ),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 8.0),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      width: double.infinity,
                      height: 8.0,
                      color: Colors.white,
                    ),
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 2.0),
                    ),
                    Container(
                      width: double.infinity,
                      height: 8.0,
                      color: Colors.white,
                    ),
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 2.0),
                    ),
                    Container(
                      width: 40.0,
                      height: 8.0,
                      color: Colors.white,
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContent() {
    if (checkedStudentList == null || checkedStudentList!.isEmpty) {
      return Center(
        child: Text(
          "No Notebook Records Found",
          style: TextStyle(fontSize: 18, color: Colors.grey[600]),
        ),
      );
    }
    return AnimationLimiter(
      child: ListView.builder(
        itemCount: checkedStudentList!.length,
        itemBuilder: (BuildContext context, int index) {
          final record = checkedStudentList![index];
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  elevation: 2,
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: CustomTheme.primaryColor,
                      child: Text(record["by"]["name"][0] ?? "?", style: TextStyle(color: Colors.white)),
                    ),
                    title: Text(record["topic"] ?? "No Topic", style: TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Text("Chapter: ${record["chapter"] ?? "N/A"}"),
                    trailing: Switch(
                      value: true,
                      onChanged: (bool value) {},
                      activeColor: Colors.green,
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
}