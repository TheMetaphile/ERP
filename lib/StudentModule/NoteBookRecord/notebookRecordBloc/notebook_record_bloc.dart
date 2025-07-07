import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:equatable/equatable.dart';
import '../../../StudentAPIs/StudentModuleAPI/NoteBookRecord/noteBook_Record_API.dart';
import 'notebook_record_event.dart';
import 'notebook_record_state.dart';


class NoteBookRecordBloc extends Bloc<NoteBookRecordEvent, NoteBookRecordState> {
  final NotebookRecordApi notebookObj = NotebookRecordApi();
  final Map<String, List<Map<String, dynamic>>> _cache = {};

  NoteBookRecordBloc() : super(const NoteBookRecordInitial()) {
    on<FetchSubjectsEvent>(_onFetchSubjects);
    on<FetchNoteBookRecordEvent>(_onFetchNoteBookRecord);
    on<ChangeSubjectEvent>(_onChangeSubject);
    on<RefreshSubjectsEvent>(_onRefreshSubjects);
  }


  Future<void> _onRefreshSubjects(
      RefreshSubjectsEvent event, Emitter<NoteBookRecordState> emit) async {
    emit(state.copyWith(isLoading: true));
    _cache.clear(); // ✅ Clear cached subject-records

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      final subjects = pref.getStringList("subjects") ?? [];

      emit(state.copyWith(
        subjects: subjects,
        selectedSubject: subjects.isNotEmpty ? subjects.first : '',
        records: [],
        isLoading: false,
        error: null,
      ));

      if (subjects.isNotEmpty) {
        add(FetchNoteBookRecordEvent(
            subjects.first)); // Re-fetch records for first subject
      }
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        error: 'Failed to refresh subjects: $e',
      ));
    }
  }
  Future<void> _onFetchSubjects(FetchSubjectsEvent event, Emitter<NoteBookRecordState> emit) async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      final subjects = pref.getStringList("subjects") ?? [];
      emit(NoteBookRecordState(
        subjects: subjects,
        selectedSubject: subjects.isNotEmpty ? subjects.first : '',
        records: [],
        isLoading: false,
        error: null,
      ));
      if (subjects.isNotEmpty) {
        add(FetchNoteBookRecordEvent(subjects.first));
      }
    } catch (e) {
      emit(NoteBookRecordState(
        subjects: [],
        selectedSubject: '',
        records: [],
        isLoading: false,
        error: 'Failed to fetch subjects: $e',
      ));
    }
  }

  Future<void> _onFetchNoteBookRecord(FetchNoteBookRecordEvent event, Emitter<NoteBookRecordState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      if (accessToken == null) throw Exception('Access token is null');

      List<Map<String, dynamic>> records;
      if (_cache.containsKey(event.subject)) {
        records = _cache[event.subject]!;
      } else {
        records = (await notebookObj.fetchNoteBookRecord(accessToken, event.subject)).cast<Map<String, dynamic>>();
        _cache[event.subject] = records;
      }

      emit(state.copyWith(
        selectedSubject: event.subject,
        records: records,
        isLoading: false,
        error: null,
      ));
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        error: 'Error fetching NoteBookRecord data: $e',
      ));
    }
  }

  Future<void> _onChangeSubject(ChangeSubjectEvent event, Emitter<NoteBookRecordState> emit) async {
    if (_cache.containsKey(event.subject)) {
      emit(state.copyWith(
        selectedSubject: event.subject,
        records: _cache[event.subject]!,
        isLoading: false,
        error: null,
      ));
    } else {
      add(FetchNoteBookRecordEvent(event.subject));
    }
  }

}
