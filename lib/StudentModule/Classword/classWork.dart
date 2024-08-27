import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/SharedPreference/sharedPreferenceFile.dart';
import '../../APIs/StudentModuleAPI/ClassWork/classWorkApi.dart';
import '../../APIs/StudentModuleAPI/StudentSubject/subjects.dart';
import '../../CustomTheme/customTheme.dart';

class Classwork extends StatefulWidget {
  const Classwork({super.key,});


  @override
  State<Classwork> createState() => _ClassworkState();
}

class _ClassworkState extends State<Classwork> with SingleTickerProviderStateMixin{
  String selectedSubject="";
  List<String>? subjectOptions;
  List<String>  handleSubject=[
    ""
  ];
  bool isLoading=true;
  String currentClass="";
  String section="";
  int start =0;
  List<Map<String,dynamic>>? classWorkList;

  Future<void> fetchSubjects() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
     subjectOptions =pref.getStringList("subjects") ;
  }


  Future<void> fetchClasswork() async {
    ClassWorkAPI classWorkObj=ClassWorkAPI();
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      List<dynamic> data=await classWorkObj.fetchClasswork(accessToken, section, selectedSubject, start);

      print("Data get $data");

      classWorkList=data.cast<Map<String, dynamic>>();

      print("classWorkList $classWorkList");

    } catch (e) {
      print(e);
      showRedSnackBar("Failed to load classWorkList $e", context);
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

  late AnimationController _animationController;
  late Animation<double> _animation;

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
    fetchClasswork();
  }
  // @override
  // Widget build(BuildContext context) {
  //   Size size = MediaQuery.of(context).size;
  //   CustomTheme themeObj=CustomTheme(size);
  //   return Scaffold(
  //       backgroundColor: CustomTheme.whiteColor,
  //       body: SingleChildScrollView(
  //         child: Center(
  //           child: Padding(
  //             padding: const EdgeInsets.symmetric(horizontal: 8),
  //             child: Container(
  //                 color: CustomTheme.whiteColor,
  //                 child: Column(
  //                   children: [
  //                     SizedBox(height: size.height * 0.02,),
  //                     Row(
  //                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                       children: [
  //                         Text("Search by Subject",style: themeObj.bigNormalText,),
  //                         Card(
  //                           child: SizedBox(
  //                             width: size.width * 0.3,
  //                             height: size.height * 0.05,
  //                             child:DropdownButton<String>(
  //                               isExpanded: true,
  //                               borderRadius: BorderRadius.circular(12),
  //                               hint: Text("Subject", style: themeObj.normalText),
  //                               padding: const EdgeInsets.all(8),
  //                               icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
  //                               alignment: Alignment.center,
  //                               underline: Container(),
  //                               value: selectedSubject.isEmpty ? null : selectedSubject,
  //                               onChanged: (newValue) {
  //                                 setState(() {
  //                                   selectedSubject = newValue!;
  //                                   classWorkList=[];
  //                                   fetchClasswork();
  //
  //
  //                                 });
  //                               },
  //                               items: subjectOptions==null ||  subjectOptions!.isEmpty? handleSubject.map((String option) {
  //                                 return DropdownMenuItem<String>(
  //                                   value: option,
  //                                   child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
  //                                 );
  //                               }).toList():
  //                               subjectOptions?.map((String option) {
  //                                 return DropdownMenuItem<String>(
  //                                   value: option,
  //                                   child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
  //                                 );
  //                               }).toList(),
  //                             ),
  //
  //
  //                           ),
  //                         ),
  //                       ],
  //                     ),
  //                     isLoading ?   Center(
  //                       child: LoadingAnimationWidget.threeArchedCircle(
  //                         color: CustomTheme.primaryColor,
  //                         size: 50,
  //                       ),
  //                     ):
  //                     classWorkList==null || classWorkList!.isEmpty? SizedBox(
  //                         height: size.height*0.7,
  //                         child: Center(child: Text("There was no Classwork Found", style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)):SizedBox(
  //
  //                       child: ListView.builder(
  //                         itemCount: classWorkList?.length,
  //                         shrinkWrap: true,
  //                         itemBuilder: (context, index) {
  //                           final classWork=classWorkList?[index];
  //                           return Padding(
  //                             padding: const EdgeInsets.all(8.0),
  //                             child: Column(
  //                               children: [
  //                               Card(
  //                               elevation: 4,
  //                               shape: RoundedRectangleBorder(
  //                                 borderRadius: BorderRadius.circular(15),
  //                                 side: BorderSide(color: CustomTheme.primaryColor.withOpacity(0.5), width: 1.5),
  //                               ),
  //                               margin: const EdgeInsets.all(0),
  //                               child: Padding(
  //                                 padding: const EdgeInsets.all(8.0),
  //                                 child: Column(
  //                                   crossAxisAlignment: CrossAxisAlignment.start,
  //                                   children: [
  //                                     Container(
  //                                       decoration: BoxDecoration(
  //                                         gradient: LinearGradient(
  //                                           colors: [CustomTheme.primaryColor, CustomTheme.secondaryColor],
  //                                           begin: Alignment.topLeft,
  //                                           end: Alignment.bottomRight,
  //                                         ),
  //                                         borderRadius: BorderRadius.circular(10),
  //                                       ),
  //                                       padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
  //                                       child: Text(
  //                                         selectedSubject.isEmpty ? "Subject" : selectedSubject,
  //                                         style: themeObj.bigNormalText.copyWith(
  //                                           color: CustomTheme.blackColor,
  //                                           fontWeight: FontWeight.w400,
  //                                         ),
  //                                       ),
  //                                     ),
  //                                     SizedBox(height: size.height * 0.02),
  //                                     _buildInfoRow("Chapter:", classWork?["chapter"] ?? "Chapter",size),
  //                                     SizedBox(height: size.height * 0.01),
  //                                     _buildInfoRow("Topic:", classWork?["topic"] ?? "Topic",size),
  //
  //                                     ExpansionTile(
  //                                       tilePadding: EdgeInsets.zero,
  //                                       title: Text("Description", style: themeObj.normalText.copyWith(fontWeight: FontWeight.w600)),
  //                                       children: [
  //                                        SizedBox(
  //                                          width: size.width,
  //                                          child:  Text(
  //                                            classWork?["description"] ?? "Description",
  //                                            style: themeObj.normalText,
  //                                          ),
  //                                        )
  //                                       ],
  //                                     ),
  //                                     Divider(color: CustomTheme.primaryColor.withOpacity(0.3)),
  //                                     SizedBox(height: size.height * 0.01),
  //                                     Row(
  //                                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                                       children: [
  //                                         Text(
  //                                           classWork?["date"] ?? "Date",
  //                                           style: themeObj.normalText.copyWith(fontStyle: FontStyle.italic),
  //                                         ),
  //                                         Row(
  //                                           children: [
  //                                             CircleAvatar(
  //                                               radius: size.width * 0.035,
  //                                               backgroundImage: NetworkImage(classWork?["by"]["profileLink"] ?? ""),
  //                                             ),
  //                                             const SizedBox(width: 8),
  //                                             Text(
  //                                               "By ${classWork?["by"]["name"] ?? "Name"}",
  //                                               style: themeObj.normalText.copyWith(fontWeight: FontWeight.bold),
  //                                             ),
  //                                           ],
  //                                         ),
  //                                       ],
  //                                     ),
  //                                   ],
  //                                 ),
  //                               ),
  //                             ),
  //
  //
  //
  //
  //                               ],
  //                             ),
  //                           );
  //                         },
  //                       ),
  //                     ),
  //
  //                   ],
  //                 )
  //             ),
  //           ),
  //         ),
  //       )
  //   );
  // }
  // Widget _buildInfoRow(String label, String value,Size size) {
  //   CustomTheme themeObj=CustomTheme(size);
  //   return Row(
  //     crossAxisAlignment: CrossAxisAlignment.start,
  //     children: [
  //       Text(label, style: themeObj.normalText.copyWith(fontWeight: FontWeight.w600)),
  //       SizedBox(width: size.width * 0.02),
  //       Expanded(
  //         child: Text(
  //           value,
  //           style: themeObj.bigNormalText,
  //           overflow: TextOverflow.ellipsis,
  //           maxLines: 2,
  //         ),
  //       ),
  //     ],
  //   );
  // }
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
                : classWorkList == null || classWorkList!.isEmpty
                ? _buildEmptyState(size)
                : _buildClassworkList(size, themeObj),
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
                            classWorkList = [];
                            fetchClasswork();
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
          Icon(Icons.class_outlined, size: 100, color: Colors.grey[400]),
          SizedBox(height: 20),
          Text(
            "No classwork found",
            style: TextStyle(fontSize: 18, color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  Widget _buildClassworkList(Size size, CustomTheme themeObj) {
    return AnimationLimiter(
     child :ListView.builder(
      itemCount: classWorkList?.length ?? 0,
      padding: EdgeInsets.all(5),
      itemBuilder: (context, index) {
        final classWork = classWorkList?[index];
        return AnimationConfiguration.staggeredList(
          position: index,
          duration: const Duration(milliseconds: 375),
          child: SlideAnimation(
            verticalOffset: 50.0,
            child: FadeInAnimation(
              child:_buildClassworkCard(classWork, size, themeObj),
            ),
          ),
        );;
      },
    ),
    );
  }

  Widget _buildClassworkCard(Map<String, dynamic>? classWork, Size size, CustomTheme themeObj) {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      margin: EdgeInsets.only(bottom: 5),
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
              _buildClassworkHeader(classWork, themeObj),
              _buildClassworkContent(classWork, size, themeObj),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildClassworkHeader(Map<String, dynamic>? classWork, CustomTheme themeObj) {
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
            classWork?["date"] ?? "Date",
            style: themeObj.normalText.copyWith(color: CustomTheme.whiteColor),
          ),
        ],
      ),
    );
  }

  Widget _buildClassworkContent(Map<String, dynamic>? classWork, Size size, CustomTheme themeObj) {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildInfoRow("Chapter:", classWork?["chapter"] ?? "Chapter", size, themeObj),
          SizedBox(height: 8),
          _buildInfoRow("Topic:", classWork?["topic"] ?? "Topic", size, themeObj),
          SizedBox(height: 16),
          _buildExpandableDescription(classWork?["description"] ?? "Description", themeObj),
          SizedBox(height: 16),
          _buildTeacherInfo(classWork, size, themeObj),
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

  Widget _buildTeacherInfo(Map<String, dynamic>? classWork, Size size, CustomTheme themeObj) {
    return Row(
      children: [
        CircleAvatar(
          radius: size.width * 0.04,
          backgroundImage: NetworkImage(classWork?["by"]["profileLink"] ?? ""),
        ),
        SizedBox(width: 12),
        Text(
          "By ${classWork?["by"]["name"] ?? "Name"}",
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
