import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Classword/StudentClassworkBloc/student_classwork_event.dart';
import 'package:untitled/StudentModule/Classword/StudentClassworkBloc/student_classwork_state.dart';
import '../../../StudentAPIs/SharedPreference/sharedPreferenceFile.dart';
import '../../../StudentAPIs/StudentModuleAPI/ClassWork/classWorkApi.dart';

class StudentClassworkBloc extends Bloc<StudentClassworkEvent, StudentClassworkState> {
  StudentClassworkBloc() : super(StudentClassworkInitial()) {
    on<FetchSubjectsEvent>(_onFetchSubjects);
    on<SelectSubjectEvent>(_onSelectSubject);
    on<FetchClassworkEvent>(_onFetchClasswork);
  }

  Future<void> _onFetchSubjects(
      FetchSubjectsEvent event, Emitter<StudentClassworkState> emit) async {
    emit(StudentClassworkLoading());
    try {
      final pref = await SharedPreferences.getInstance();
      final subjectOptions = pref.getStringList("subjects") ?? [];
      final userDetails = await UserPreferences.getDetails("userDetails");
      final currentClass = userDetails["currentClass"] ?? "Unknown";
      final section = userDetails["section"] ?? "Unknown";

      if (subjectOptions.isNotEmpty) {
        final selectedSubject = subjectOptions[0];
        final classWorkList = await _fetchClasswork(
          accessToken: pref.getString("accessToken"),
          section: section,
          selectedSubject: selectedSubject,
          start: 0,
        );
        emit(StudentClassworkLoaded(
          subjectOptions: subjectOptions,
          selectedSubject: selectedSubject,
          currentClass: currentClass,
          section: section,
          classWorkList: classWorkList,
        ));
      } else {
        emit(const StudentClassworkError("No subjects found"));
      }
    } catch (e) {
      emit(StudentClassworkError("Failed to load subjects: $e"));
    }
  }

  Future<void> _onSelectSubject(
      SelectSubjectEvent event, Emitter<StudentClassworkState> emit) async {
    final currentState = state;
    if (currentState is StudentClassworkLoaded) {
      emit(StudentClassworkLoading());
      try {
        final pref = await SharedPreferences.getInstance();
        final classWorkList = await _fetchClasswork(
          accessToken: pref.getString("accessToken"),
          section: currentState.section,
          selectedSubject: event.selectedSubject,
          start: 0,
        );
        emit(StudentClassworkLoaded(
          subjectOptions: currentState.subjectOptions,
          selectedSubject: event.selectedSubject,
          currentClass: currentState.currentClass,
          section: currentState.section,
          classWorkList: classWorkList,
        ));
      } catch (e) {
        emit(StudentClassworkError("Failed to load classwork: $e"));
      }
    }
  }

  Future<void> _onFetchClasswork(
      FetchClassworkEvent event, Emitter<StudentClassworkState> emit) async {
    emit(StudentClassworkLoading());
    try {
      final pref = await SharedPreferences.getInstance();
      final userDetails = await UserPreferences.getDetails("userDetails");
      final currentClass = userDetails["currentClass"] ?? "Unknown";
      final section = userDetails["section"] ?? "Unknown";
      final subjectOptions = pref.getStringList("subjects") ?? [];
      final classWorkList = await _fetchClasswork(
        accessToken: pref.getString("accessToken"),
        section: event.section,
        selectedSubject: event.selectedSubject,
        start: event.start,
      );
      emit(StudentClassworkLoaded(
        subjectOptions: subjectOptions,
        selectedSubject: event.selectedSubject,
        currentClass: currentClass,
        section: section,
        classWorkList: classWorkList,
      ));
    } catch (e) {
      emit(StudentClassworkError("Failed to load classwork: $e"));
    }
  }

  Future<List<Map<String, dynamic>>> _fetchClasswork({
    required String? accessToken,
    required String section,
    required String selectedSubject,
    required int start,
  }) async {
    if (accessToken == null) {
      throw Exception('Access token is null');
    }
    final classWorkObj = ClassWorkAPI();
    print("CLASSWORK API CALLLEDDDDDDDGJ22222222222222222222222222222222222222");
    final data = await classWorkObj.fetchClasswork(
      accessToken,
      section,
      selectedSubject,
      start,
    );
    return data.cast<Map<String, dynamic>>();
  }
}