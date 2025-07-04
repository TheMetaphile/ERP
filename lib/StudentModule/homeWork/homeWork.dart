
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:untitled/StudentModule/homeWork/student_homework_bloc/student_home_work_bloc.dart';
import 'package:untitled/StudentModule/homeWork/student_homework_bloc/student_home_work_event.dart';
import 'package:untitled/StudentModule/homeWork/student_homework_bloc/student_home_work_state.dart';

import '../../CustomTheme/customTheme.dart';


class StudentHomework extends StatefulWidget {
  const StudentHomework({super.key});

  @override
  State<StudentHomework> createState() => _StudentHomeworkState();
}

class _StudentHomeworkState extends State<StudentHomework>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );

    // Add the initialization logic similar to StudentClasswork
    final bloc = context.read<StudentHomeworkBloc>();
    final state = bloc.state;

    print('Initial state type: ${state.runtimeType}');

    // Only fetch subjects if not already loaded
    if (state is StudentHomeworkInitial) {
      print('Fetching subjects...');
      bloc.add(FetchSubjectsEvent());
    } else {
      print('Skipping FetchSubjectsEvent — data already loaded.');
      print('Current state: $state');
    }

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Remove the animation forward call from here since it's now in initState
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      body: BlocConsumer<StudentHomeworkBloc, StudentHomeworkState>(
        listener: (context, state) {
          if (state is StudentHomeworkError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.message),
                backgroundColor: Colors.red,
              ),
            );
          }
        },
        builder: (context, state) {
          return Column(
            children: [
              _buildSubjectDropdown(size, themeObj, state),
              Expanded(
                child: state is StudentHomeworkLoading
                    ? _buildLoadingIndicator()
                    : state is StudentHomeworkLoaded && state.homeworkList.isEmpty
                    ? _buildEmptyState(size)
                    : state is StudentHomeworkEmpty
                    ? _buildEmptyState(size)
                    : state is StudentHomeworkLoaded
                    ? _buildHomeworkList(size, themeObj, state.homeworkList)
                    : const SizedBox(),

              ),
            ],
          );
        },
      ),
    );
  }

  List<DropdownMenuItem<String>> _getSubjectItems(StudentHomeworkState state, CustomTheme themeObj) {
    List<String> subjects = [];

    if (state is StudentHomeworkLoaded) {
      subjects = state.subjects;
      print('Getting subjects from StudentHomeworkLoaded: $subjects');
    } else if (state is StudentHomeworkEmpty) {
      // Check if StudentHomeworkEmpty has subjects
      try {
        subjects = (state as dynamic).subjects ?? [];
        print('Getting subjects from StudentHomeworkEmpty: $subjects');
      } catch (e) {
        print('StudentHomeworkEmpty does not have subjects property');
      }
    }

/*    if (subjects.isEmpty) {
      print('⚠️ No subjects found! Adding hardcoded subjects for testing...');
      // Add hardcoded subjects for testing
      subjects = ['Math', 'English', 'Science', 'Hindi', 'Social Studies'];
    }*/

    return subjects.map((String option) {

      return DropdownMenuItem<String>(
        value: option,
        child: Text(option, style: themeObj.normalText),
      );
    }).toList();
  }

  Widget _buildSubjectDropdown(Size size, CustomTheme themeObj, StudentHomeworkState state) {
    print('Building dropdown with state: ${state.runtimeType}');

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, -50 * (1 - _animation.value)),
          child: Opacity(
            opacity: _animation.value,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: CustomTheme.primaryColor.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
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
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: CustomTheme.whiteColor,
                      borderRadius: BorderRadius.circular(25),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.2),
                          spreadRadius: 1,
                          blurRadius: 5,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        isExpanded: true,
                        hint: Text("Subject", style: themeObj.normalText),
                        value: _getSelectedSubjectValue(state),
                        onChanged: (newValue) {
                          print('Dropdown onChanged called with: $newValue');
                          if (newValue != null) {
                            print('Dispatching SelectSubjectEvent with: $newValue');
                            context.read<StudentHomeworkBloc>().add(SelectSubjectEvent(newValue));
                          }
                        },
                        items: _getSubjectItems(state, themeObj),
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

// Add this helper method to get the correct selected value
  String? _getSelectedSubjectValue(StudentHomeworkState state) {
    String? selectedSubject;
    List<String> subjects = [];

    if (state is StudentHomeworkLoaded) {
      selectedSubject = state.selectedSubject;
      subjects = state.subjects;
    } else if (state is StudentHomeworkEmpty) {
      try {
        selectedSubject = (state as dynamic).selectedSubject ?? '';
        subjects = (state as dynamic).subjects ?? [];
      } catch (e) {
        print('Error accessing selectedSubject from StudentHomeworkEmpty: $e');
      }
    }

    // Only return the selected subject if it's not empty and exists in the subjects list
    if (selectedSubject != null &&
        selectedSubject.isNotEmpty &&
        subjects.contains(selectedSubject)) {
      return selectedSubject;
    }

    return null;
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
          const SizedBox(height: 20),
          Text(
            "No homework found",
            style: TextStyle(fontSize: 18, color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  Widget _buildHomeworkList(Size size, CustomTheme themeObj, List<Map<String, dynamic>> homeworkList) {
    return AnimationLimiter(
      child: ListView.builder(
        itemCount: homeworkList.length,
        padding: const EdgeInsets.all(5),
        itemBuilder: (context, index) {
          final homework = homeworkList[index];
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: _buildHomeworkCard(homework, size, themeObj),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildHomeworkCard(Map<String, dynamic> homework, Size size, CustomTheme themeObj) {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      margin: const EdgeInsets.only(bottom: 5),
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

  Widget _buildHomeworkHeader(Map<String, dynamic> homework, CustomTheme themeObj) {
    return Container(
      padding: const EdgeInsets.all(16),
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
            homework["subject"] ?? "Subject",
            style: themeObj.bigNormalText.copyWith(color: CustomTheme.whiteColor),
          ),
          Text(
            homework["date"] ?? "Date",
            style: themeObj.normalText.copyWith(color: CustomTheme.whiteColor),
          ),
        ],
      ),
    );
  }

  Widget _buildHomeworkContent(Map<String, dynamic> homework, Size size, CustomTheme themeObj) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildInfoRow("Chapter:", homework["chapter"] ?? "Chapter", size, themeObj),
          const SizedBox(height: 8),
          _buildInfoRow("Topic:", homework["topic"] ?? "Topic", size, themeObj),
          const SizedBox(height: 16),
          _buildExpandableDescription(homework["description"] ?? "Description", themeObj),
          const SizedBox(height: 16),
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
          duration: const Duration(milliseconds: 300),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
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
      childrenPadding: const EdgeInsets.only(bottom: 16),
    );
  }

  Widget _buildTeacherInfo(Map<String, dynamic> homework, Size size, CustomTheme themeObj) {
    return Row(
      children: [
        CircleAvatar(
          radius: size.width * 0.04,
          backgroundImage: NetworkImage(homework["by"]["profileLink"] ?? ""),
        ),
        const SizedBox(width: 12),
        Text(
          "By ${homework["by"]["name"] ?? "Name"}",
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
}