import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:student/APIs/StudentModuleAPI/HomeWork/HomeWorkAPI.dart';

import '../../APIs/SharedPreference/sharedPreferenceFile.dart';
import '../../APIs/StudentModuleAPI/StudentSubject/subjects.dart';
import '../../CustomTheme/customTheme.dart';

class Homework extends StatefulWidget {
  const Homework({super.key});

  @override
  State<Homework> createState() => _HomeworkState();
}

class _HomeworkState extends State<Homework> with SingleTickerProviderStateMixin  {
  String selectedSubject="";
  List<String>? subjectOptions;
  List<String>  handleSubject=[
    ""
  ];
  bool isLoading=true;
  String currentClass="";
  String section="";
  int start =0;
  List<Map<String,dynamic>>? homeWorkList;
  late AnimationController _animationController;
  late Animation<double> _animation;

  Future<void> fetchSubjects() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
    subjectOptions =pref.getStringList("subjects") ;
  }


  Future<void> fetchHomework() async {
    HomeworkAPI homeWorkObj=HomeworkAPI();
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      List<dynamic> data=await homeWorkObj.fetchHomeWork(accessToken, section, selectedSubject, start);

      print("Data get $data");

      homeWorkList=data.cast<Map<String, dynamic>>();

      print("homeWorkList $homeWorkList");

    } catch (e) {
      print(e);
      showRedSnackBar("$e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Map<String, dynamic> retrievedUserDetails={};
  Future<void> getDetails() async {
    print("getDetails");
    retrievedUserDetails = await UserPreferences.getDetails("userDetails");
    currentClass=retrievedUserDetails["currentClass"]??"Unknown";
    section=retrievedUserDetails["section"]??"Unknown";
  }

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(parent: _animationController, curve: Curves.easeInOut);
    getDetails();
    fetchSubjects();
    fetchHomework();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,

      body: Column(
        children: [
          _buildSubjectDropdown(size, themeObj),
          Expanded(
            child: isLoading
                ? _buildLoadingIndicator()
                : homeWorkList == null || homeWorkList!.isEmpty
                ? _buildEmptyState(size)
                : _buildHomeworkList(size, themeObj),
          ),
        ],
      ),
    );
  }

  Widget _buildSubjectDropdown(Size size, CustomTheme themeObj) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, -50 * (1 - _animation.value)),
          child: Opacity(
            opacity: _animation.value,
            child: Container(
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
                            homeWorkList = [];
                            fetchHomework();
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
            ),
          ),
        );
      },
    );
  }

  Widget _buildLoadingIndicator() {
    return Center(
      child: LoadingAnimationWidget.threeArchedCircle(
        color: CustomTheme.primaryColor,
        size: 50,
      ),
    );
  }

  Widget _buildEmptyState(Size size) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.assignment_outlined, size: 100, color: Colors.grey[400]),
          SizedBox(height: 20),
          Text(
            "No homework found",
            style: TextStyle(fontSize: 18, color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  Widget _buildHomeworkList(Size size, CustomTheme themeObj) {
    return AnimationLimiter(
      child: ListView.builder(
        itemCount: homeWorkList?.length ?? 0,
        padding: EdgeInsets.all(5),
        shrinkWrap: true,
        itemBuilder: (context, index) {
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: _buildHomeworkCard(homeWorkList?[index], size, themeObj),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildHomeworkCard(Map<String, dynamic>? homework, Size size, CustomTheme themeObj) {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                CustomTheme.primaryColor.withOpacity(0.05),
                CustomTheme.secondaryColor.withOpacity(0.05),
              ],
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHomeworkHeader(homework, themeObj),
              _buildHomeworkContent(homework, size, themeObj),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHomeworkHeader(Map<String, dynamic>? homework, CustomTheme themeObj) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [CustomTheme.primaryColor, CustomTheme.secondaryColor],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            selectedSubject.isEmpty ? "Subject" : selectedSubject,
            style: themeObj.bigNormalText.copyWith(color: CustomTheme.whiteColor),
          ),
          Text(
            homework?["date"] ?? "Date",
            style: themeObj.normalText.copyWith(color: CustomTheme.whiteColor),
          ),
        ],
      ),
    );
  }

  Widget _buildHomeworkContent(Map<String, dynamic>? homework, Size size, CustomTheme themeObj) {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildInfoRow("Chapter:", homework?["chapter"] ?? "Chapter", size, themeObj),
          SizedBox(height: 8),
          _buildInfoRow("Topic:", homework?["topic"] ?? "Topic", size, themeObj),
          SizedBox(height: 16),
          _buildExpandableDescription(homework?["description"] ?? "Description", themeObj),
          SizedBox(height: 16),
          _buildTeacherInfo(homework, size, themeObj),
        ],
      ),
    );
  }

  Widget _buildExpandableDescription(String description, CustomTheme themeObj) {
    return ExpansionTile(
      title: Text("Description", style: themeObj.normalText.copyWith(fontWeight: FontWeight.w600)),
      children: [
        AnimatedContainer(
          duration: Duration(milliseconds: 300),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Text(
              description,
              style: themeObj.normalText,
            ),
          ),
        ),
      ],
      trailing: Icon(Icons.arrow_drop_down, color: CustomTheme.primaryColor),
      tilePadding: EdgeInsets.zero,
      expandedAlignment: Alignment.topLeft,
      childrenPadding: EdgeInsets.only(bottom: 16),
    );
  }

  Widget _buildTeacherInfo(Map<String, dynamic>? homework, Size size, CustomTheme themeObj) {
    return Row(
      children: [
        CircleAvatar(
          radius: size.width * 0.04,
          backgroundImage: NetworkImage(homework?["by"]["profileLink"] ?? ""),
        ),
        SizedBox(width: 12),
        Text(
          "By ${homework?["by"]["name"] ?? "Name"}",
          style: themeObj.normalText.copyWith(fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildInfoRow(String label, String value, Size size, CustomTheme themeObj) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: themeObj.normalText.copyWith(fontWeight: FontWeight.w600)),
        SizedBox(width: size.width * 0.02),
        Expanded(
          child: Text(
            value,
            style: themeObj.bigNormalText,
            overflow: TextOverflow.ellipsis,
            maxLines: 2,
          ),
        ),
      ],
    );
  }
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _animationController.forward();
  }
}
