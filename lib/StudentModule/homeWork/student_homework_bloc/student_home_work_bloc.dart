import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/homeWork/student_homework_bloc/student_home_work_event.dart';
import 'package:untitled/StudentModule/homeWork/student_homework_bloc/student_home_work_state.dart';

import '../../../StudentAPIs/SharedPreference/sharedPreferenceFile.dart';
import '../../../StudentAPIs/StudentModuleAPI/HomeWork/HomeWorkAPI.dart';


class StudentHomeworkBloc extends Bloc<StudentHomeworkEvent, StudentHomeworkState> {
  StudentHomeworkBloc() : super(StudentHomeworkInitial()) {
    on<FetchSubjectsEvent>(_onFetchSubjects);
    on<SelectSubjectEvent>(_onSelectSubject);
    on<FetchHomeworkEvent>(_onFetchHomework);
  }

  Future<void> _onFetchSubjects(
      FetchSubjectsEvent event,
      Emitter<StudentHomeworkState> emit,
      ) async {
    emit(StudentHomeworkLoading());
    try {
      final pref = await SharedPreferences.getInstance();
      final subjectOptions = pref.getStringList("subjects") ?? [];
      final userDetails = await UserPreferences.getDetails("userDetails");
      final currentClass = userDetails["currentClass"] ?? "Unknown";
      final section = userDetails["section"] ?? "Unknown";

      if (subjectOptions.isNotEmpty) {
        final selectedSubject = subjectOptions[0];
        final homeworkList = await _fetchHomework(
          accessToken: pref.getString("accessToken"),
          section: section,
          selectedSubject: selectedSubject,
          start: 0, studentclass: currentClass,
        );

        if (homeworkList.isEmpty) {
          emit(StudentHomeworkEmpty(
            subjects: subjectOptions,
            selectedSubject: selectedSubject,
            currentClass: currentClass,
            section: section,
          ));
        } else {
          emit(StudentHomeworkLoaded(
            subjects: subjectOptions,
            selectedSubject: selectedSubject,
            homeworkList: homeworkList,
            currentClass: currentClass,
            section: section,
          ));
        }
      } else {
        emit(const StudentHomeworkError("No subjects found"));
      }
    } catch (e) {
      emit(StudentHomeworkError("Failed to load subjects: $e"));
    }
  }

  Future<void> _onSelectSubject(
      SelectSubjectEvent event,
      Emitter<StudentHomeworkState> emit,
      ) async {
    final currentState = state;
    if (currentState is StudentHomeworkLoaded) {
      emit(StudentHomeworkLoading());
      try {
        final pref = await SharedPreferences.getInstance();
        final userDetails = await UserPreferences.getDetails("userDetails");
        final currentClass = userDetails["currentClass"] ?? "Unknown";
        final homeworkList = await _fetchHomework(
          accessToken: pref.getString("accessToken"),
          section: currentState.section,
          selectedSubject: event.selectedSubject,
          start: 0, studentclass: currentClass,
        );

        if (homeworkList.isEmpty) {
          emit(StudentHomeworkEmpty(
            subjects: currentState.subjects,
            selectedSubject: event.selectedSubject,
            currentClass: currentState.currentClass,
            section: currentState.section,
          ));
        } else {
          emit(StudentHomeworkLoaded(
            subjects: currentState.subjects,
            selectedSubject: event.selectedSubject,
            homeworkList: homeworkList,
            currentClass: currentState.currentClass,
            section: currentState.section,
          ));
        }
      } catch (e) {
        emit(StudentHomeworkError("Failed to load homework: $e"));
      }
    } else if (currentState is StudentHomeworkEmpty) {
      emit(StudentHomeworkLoading());
      try {
        final pref = await SharedPreferences.getInstance();
        final userDetails = await UserPreferences.getDetails("userDetails");
        final currentClass = userDetails["currentClass"] ?? "Unknown";
        final homeworkList = await _fetchHomework(
          accessToken: pref.getString("accessToken"),
          section: currentState.section,
          selectedSubject: event.selectedSubject,
          start: 0, studentclass:currentClass,
        );

        if (homeworkList.isEmpty) {
          emit(StudentHomeworkEmpty(
            subjects: currentState.subjects,
            selectedSubject: event.selectedSubject,
            currentClass: currentState.currentClass,
            section: currentState.section,
          ));
        } else {
          emit(StudentHomeworkLoaded(
            subjects: currentState.subjects,
            selectedSubject: event.selectedSubject,
            homeworkList: homeworkList,
            currentClass: currentState.currentClass,
            section: currentState.section,
          ));
        }
      } catch (e) {
        emit(StudentHomeworkError("Failed to load homework: $e"));
      }
    }
  }

  Future<void> _onFetchHomework(
      FetchHomeworkEvent event,
      Emitter<StudentHomeworkState> emit,
      ) async {
    emit(StudentHomeworkLoading());
    try {
      final pref = await SharedPreferences.getInstance();
      final userDetails = await UserPreferences.getDetails("userDetails");
      final currentClass = userDetails["currentClass"] ?? "Unknown";
      final section = userDetails["section"] ?? "Unknown";
      final subjectOptions = pref.getStringList("subjects") ?? [];
      final homeworkList = await _fetchHomework(
        accessToken: pref.getString("accessToken"),
        section: event.section,
        selectedSubject: event.selectedSubject,
        start: event.start, studentclass:currentClass,
      );

      if (homeworkList.isEmpty) {
        emit(StudentHomeworkEmpty(
          subjects: subjectOptions,
          selectedSubject: event.selectedSubject,
          currentClass: currentClass,
          section: section,
        ));
      } else {
        emit(StudentHomeworkLoaded(
          subjects: subjectOptions,
          selectedSubject: event.selectedSubject,
          homeworkList: homeworkList,
          currentClass: currentClass,
          section: section,
        ));
      }
    } catch (e) {
      emit(StudentHomeworkError("Failed to load homework: $e"));
    }
  }

  Future<List<Map<String, dynamic>>> _fetchHomework({

    required String? accessToken,
    required String studentclass,
    required String section,
    required String selectedSubject,
    required int start,
  }) async {
    if (accessToken == null) {
      throw Exception('Access token is null');
    }
    final homeworkObj = HomeworkAPI();
    print("HOMEWORK API CALLLEDDDDDDDGJ22222222222222222222222222222222222222");
    final data = await homeworkObj.fetchHomeWork(
      accessToken,
      studentclass,
      section,
      selectedSubject,
      start,
    );
    return data.cast<Map<String, dynamic>>();
  }
}