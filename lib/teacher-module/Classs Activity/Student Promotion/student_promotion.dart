import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/utils/theme.dart';

import '../../../APIs/StudentsData/StudentApi.dart';
import '../../../APIs/Teacher Module/ClassActivity/studentPromotion.dart';
import '../../../utils/utils.dart';

class StudentPromotion extends StatefulWidget {
  const StudentPromotion({super.key});

  @override
  State<StudentPromotion> createState() => _StudentPromotionState();
}

class _StudentPromotionState extends State<StudentPromotion> with SingleTickerProviderStateMixin{

  final ScrollController _scrollController = ScrollController();
  bool isLoadingMore = false;
  int start = 0;
  bool allDataLoaded = false;

  late AnimationController _animationController;
  late Animation<double> _animation;
  StudentApi studentObj = StudentApi();
  String? accessToken;
  String? currentClass;
  String? section;
  List<dynamic>? studentList;
  List<String> selectedStudentEmails = [];

  @override
  void initState() {
    super.initState();
    getStudentData();
    _scrollController.addListener(_scrollListener);
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }


  Future<void> getStudentData() async {
    try{
      SharedPreferences pref = await SharedPreferences.getInstance();
      accessToken = pref.getString("accessToken");
      currentClass = pref.getString("teacherClass");
      section = pref.getString("teacherSection");
      print(currentClass);
      print(section);
      currentClass ??= "class";
      List<dynamic> students=await studentObj.fetchStudents(accessToken! , currentClass!, section!, 0,);
      setState(() {
        studentList =students.cast();
      });

    }catch(e){
      print("error $e");
    }finally{
      setState(() {

      });
    }
  }



  Future<void> fetchMoreStudentData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      int newStart = start + (studentList?.length ?? 0);
      List<dynamic> fetchedStudents = await studentObj.fetchStudents(accessToken!,currentClass!, section!, newStart);

      int? previousLength=studentList?.length;



      studentList?.addAll(fetchedStudents);

      int? newLength=studentList?.length;
      if(newLength==previousLength && newLength!=null && previousLength!=null){
        allDataLoaded=true;
      }

      start = newStart;
    } catch (e) {
      print('Error fetching more student data: $e');
      showRedSnackBar("Failed to load more students. Please try again.", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }


  StudentPromotionAPI promotionObj=StudentPromotionAPI();
  Future<void> uploadPromotion() async{

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");


       var response = await promotionObj.promoteStudents(accessToken!,currentClass!,section!,selectedStudentEmails);
  if(response==true){
    showGreenSnackBar("Student Promoted Successfully", context);
  }else{
    showRedSnackBar("Student Promotion Failed", context);
  }

    } catch (e) {
      print('Error  $e');
      showRedSnackBar(e.toString(), context);

    }
  }

  void _scrollListener() {
    if(!allDataLoaded){
      fetchMoreStudentData();
    }
  }
  CustomTheme themeObj=CustomTheme();

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: studentList == null
          ? Center(
        child: LoadingAnimationWidget.threeArchedCircle(
          color: themeObj.primayColor,
          size: 50,
        ),
      )
          : studentList!.isEmpty
          ? Center(child: Text("No student data found", style: TextStyle(fontSize: 18)))
          : AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return FadeTransition(
            opacity: _animation,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    'Class ${currentClass ?? ""} - Section ${section ?? ""}',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                Expanded(
                  child: ListView(
                    controller: _scrollController,
                    children: [
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: studentList!.length,
                        itemBuilder: (context, index) {
                          final student = studentList![index];
                          return Card(
                            elevation: 2,
                            margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            child: ListTile(
                              leading: CircleAvatar(
                                backgroundImage: NetworkImage(student['profileLink']),
                                radius: 25,
                              ),
                              title: Text(student['name'], style: TextStyle(fontWeight: FontWeight.bold)),
                              subtitle: Text('Roll No: ${student['rollNumber']}'),
                              trailing: Switch(
                                value: selectedStudentEmails.contains(student['email']),
                                onChanged: (bool value) {
                                  setState(() {
                                    if (value) {
                                      selectedStudentEmails.add(student['email']);
                                    } else {
                                      selectedStudentEmails.remove(student['email']);
                                    }
                                  });
                                },
                                activeColor: themeObj.primayColor,
                              ),
                            ),
                          );
                        },
                      ),
                      if (isLoadingMore)
                        Center(child: CircularProgressIndicator()),
                      if (allDataLoaded)
                        Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Text('All students loaded', style: TextStyle(fontStyle: FontStyle.italic)),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: AnimatedOpacity(
        opacity: selectedStudentEmails.isNotEmpty ? 1.0 : 0.0,
        duration: Duration(milliseconds: 300),
        child: FloatingActionButton.extended(
          onPressed: () {
           uploadPromotion();
          },
          icon: Icon(Icons.save),
          label: Text('Save (${selectedStudentEmails.length})'),
          backgroundColor: themeObj.primayColor,
        ),
      ),
    );
  }
}
