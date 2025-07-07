import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shimmer/shimmer.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:untitled/StudentModule/NoteBookRecord/notebookRecordBloc/notebook_record_event.dart';

import '../../CustomTheme/customTheme.dart';
import '../Classword/StudentClassworkBloc/student_classwork_event.dart';
import 'notebookRecordBloc/notebook_record_bloc.dart';
import 'notebookRecordBloc/notebook_record_state.dart';
import 'package:untitled/StudentModule/NoteBookRecord/notebookRecordBloc/notebook_record_event.dart' as notebook;
import 'package:untitled/StudentModule/Classword/StudentClassworkBloc/student_classwork_event.dart' as classwork;


class StudentNoteBookRecord extends StatefulWidget {
  const StudentNoteBookRecord({Key? key, required this.currentClass, required this.section}) : super(key: key);
  final String currentClass;
  final String section;

  @override
  _StudentNoteBookRecordState createState() => _StudentNoteBookRecordState();
}

class _StudentNoteBookRecordState extends State<StudentNoteBookRecord> {
  @override

  void initState() {
    super.initState();
    final bloc = context.read<NoteBookRecordBloc>();
    final currentState = bloc.state;

    if (currentState is NoteBookRecordInitial) {
      print('📘 Initializing NoteBookRecord - fetching subjects');
      bloc.add(notebook.FetchSubjectsEvent());
    } else {
      print('✅ NoteBookRecord already initialized — skipping fetch');
    }
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
      body: BlocConsumer<NoteBookRecordBloc, NoteBookRecordState>(
        listener: (context, state) {
          if (state.error != null) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(state.error!)));
          }
        },
        builder: (context, state) {
          return Column(
            children: [
              _buildSubjectDropdown(context, size, themeObj, state),
              Expanded(
                child: RefreshIndicator(
                  onRefresh: () async {
                    if (state.selectedSubject.isNotEmpty) {
                      context.read<NoteBookRecordBloc>().add(FetchNoteBookRecordEvent(state.selectedSubject));
                    }
                    context.read<NoteBookRecordBloc>().add(RefreshSubjectsEvent());
                  },
                  child: state.isLoading ? _buildShimmerEffect() : _buildContent(state),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSubjectDropdown(BuildContext context, Size size, CustomTheme themeObj, NoteBookRecordState state) {
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
                value: state.selectedSubject.isEmpty ? null : state.selectedSubject,
                onChanged: (newValue) {
                  if (newValue != null) {
                    context.read<NoteBookRecordBloc>().add(ChangeSubjectEvent(newValue));
                  }
                },
                items: state.subjects.map((String option) {
                  return DropdownMenuItem<String>(
                    value: option,
                    child: Text(option, style: themeObj.normalText),
                  );
                }).toList(),
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
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContent(NoteBookRecordState state) {
    if (state.records.isEmpty) {
      return Center(
        child: Text(
          "No Notebook Records Found",
          style: TextStyle(fontSize: 18, color: Colors.grey[600]),
        ),
      );
    }
    return AnimationLimiter(
      child: ListView.builder(
        itemCount: state.records.length,
        itemBuilder: (BuildContext context, int index) {
          final record = state.records[index];
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