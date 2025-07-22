import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/TimeTable/timetableBloc/studenttimetable_event.dart';
import 'package:untitled/StudentModule/TimeTable/timetableBloc/studenttimetable_state.dart';

import '../../../StudentAPIs/StudentModuleAPI/TimeTable/Time Table/timetableAPI.dart';

class StudentTimetableBloc extends Bloc<StudentTimetableEvent, StudentTimetableState> {
  final TimetableApi timetableApi;
  Map<String, List<Map<String, dynamic>>> _cachedTimetableData = {};
  Map<String, dynamic>? _timetableStructure;
  List<String>? _subjectOptions;
  bool _allDataLoaded = false;

  StudentTimetableBloc({required this.timetableApi}) : super(StudentTimetableInitial()) {
    on<LoadTimetableStructure>(_onLoadTimetableStructure);
    on<LoadTimetableForDay>(_onLoadTimetableForDay);
    on<RefreshTimetable>(_onRefreshTimetable);
  }

  Future<void> _onLoadTimetableStructure(
      LoadTimetableStructure event,
      Emitter<StudentTimetableState> emit,
      ) async {
    emit(StudentTimetableLoading());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      _subjectOptions = pref.getStringList("subjects");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      // Load timetable structure
      var structureData = await timetableApi.fetchTimetableStructure(accessToken);

      if (structureData is Map) {
        _timetableStructure = structureData.cast<String, dynamic>();

        // Now load ALL timetable data at once (like React)
        await _loadAllTimetableData(accessToken, emit);

        // Load initial day (Monday) from cached data
        add(LoadTimetableForDay("Monday"));
      } else if (structureData == null) {
        emit(TimetableStructureNotFound());
      } else {
        emit(StudentTimetableError("Something Went Wrong: $structureData"));
      }
    } catch (e) {
      emit(StudentTimetableError('Failed to load timetable structure: $e'));
    }
  }

  Future<void> _loadAllTimetableData(String accessToken, Emitter<StudentTimetableState> emit) async {
    try {
      print("Loading all timetable data...");

      // Fetch all days at once
      Map<String, List<dynamic>> allData = await timetableApi.fetchStudentTimetableAll(accessToken);

      // Cache all the data
      _cachedTimetableData.clear();
      allData.forEach((day, dayData) {
        _cachedTimetableData[day] = dayData.cast<Map<String, dynamic>>();
      });

      _allDataLoaded = true;
      print("Cached data for days: ${_cachedTimetableData.keys.toList()}");

    } catch (e) {
      print("Error loading all timetable data: $e");
      // Don't throw here, let individual day loading handle errors
    }
  }

  Future<void> _onLoadTimetableForDay(
      LoadTimetableForDay event,
      Emitter<StudentTimetableState> emit,
      ) async {
    final String dayKey = event.day.toLowerCase();

    // If structure is not loaded yet, load it first
    if (_timetableStructure == null) {
      emit(StudentTimetableLoading());
      add(LoadTimetableStructure());
      return;
    }

    // If all data is loaded, just emit the cached data
    if (_allDataLoaded && _cachedTimetableData.isNotEmpty) {
      emit(StudentTimetableLoaded(
        timetableStructure: _timetableStructure!,
        cachedTimetableData: _cachedTimetableData,
        currentDay: event.day,
        subjectOptions: _subjectOptions,
      ));
      return;
    }

    // Fallback: try to load individual day data
    emit(StudentTimetableLoading());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token not found');
      }

      print("Loading timetable for day: ${event.day}");

      var fetchData = await timetableApi.fetchStudentTimetable(accessToken, dayKey);

      if (fetchData.isEmpty) {
        _cachedTimetableData[dayKey] = [];
        print("No classes found for ${event.day}");
      } else {
        List<Map<String, dynamic>> dayTimetableData = fetchData.cast<Map<String, dynamic>>();
        _cachedTimetableData[dayKey] = dayTimetableData;
        print("Loaded ${dayTimetableData.length} classes for ${event.day}");
      }

      emit(StudentTimetableLoaded(
        timetableStructure: _timetableStructure!,
        cachedTimetableData: _cachedTimetableData,
        currentDay: event.day,
        subjectOptions: _subjectOptions,
      ));

    } catch (e) {
      print('API Error: $e');
      emit(StudentTimetableError('Failed to load timetable for ${event.day}: $e'));
    }
  }

  Future<void> _onRefreshTimetable(
      RefreshTimetable event,
      Emitter<StudentTimetableState> emit,
      ) async {
    // Clear cached data
    _cachedTimetableData.clear();
    _timetableStructure = null;
    _subjectOptions = null;
    _allDataLoaded = false;

    // Reload everything
    add(LoadTimetableStructure());
  }
}
