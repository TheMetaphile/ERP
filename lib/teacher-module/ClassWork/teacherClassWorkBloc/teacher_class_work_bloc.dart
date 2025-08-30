import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'teacher_class_work_event.dart';
import 'teacher_class_work_state.dart';
import 'package:untitled/APIs/Teacher Module/ClassWorks/classWorkAPI.dart';

class ClassWorkBloc extends Bloc<ClassWorkEvent, ClassWorkState> {
  final ClassWorkAPI apiObj = ClassWorkAPI();
  bool _hasLoadedInitially = false;

  // Preserve dropdown selections in BLoC
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";
  List<dynamic> _classWorkList = [];

  ClassWorkBloc() : super(ClassWorkInitial()) {
    on<LoadClassWorkData>(_onLoadClassWork);
    on<RefreshClassWorkData>(_onRefreshClassWork);
    on<UpdateFilters>(_onUpdateFilters);
  }

  Future<void> _onLoadClassWork(LoadClassWorkData event, Emitter<ClassWorkState> emit) async {
    if (_hasLoadedInitially) {
      // Return current state if already loaded
      emit(ClassWorkLoaded(
        classWorkList: _classWorkList,
        selectedClass: _selectedClass,
        selectedSection: _selectedSection,
        selectedSubject: _selectedSubject,
      ));
      return;
    }

    emit(ClassWorkLoading());
    await _fetchData(emit);
    _hasLoadedInitially = true;
  }

  Future<void> _onRefreshClassWork(RefreshClassWorkData event, Emitter<ClassWorkState> emit) async {
    // Always fetch fresh data on refresh
    await _fetchData(emit);
  }

  Future<void> _onUpdateFilters(UpdateFilters event, Emitter<ClassWorkState> emit) async {
    // Update stored selections
    _selectedClass = event.selectedClass;
    _selectedSection = event.selectedSection;
    _selectedSubject = event.selectedSubject;

    // Update filters but keep current data (no reload unless all filters are selected)
    emit(ClassWorkLoaded(
      classWorkList: _classWorkList,
      selectedClass: _selectedClass,
      selectedSection: _selectedSection,
      selectedSubject: _selectedSubject,
    ));

    // Only fetch data if all required filters are selected
    if (_selectedClass.isNotEmpty &&
        _selectedSection.isNotEmpty &&
        _selectedSubject.isNotEmpty) {
      await _fetchData(emit);
    }
  }

  Future<void> _fetchData(Emitter<ClassWorkState> emit) async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      String year = DateTime.now().year.toString();
      String month = DateTime.now().month.toString().padLeft(2, '0');
      int start = 0;

      List<dynamic> data = await apiObj.fetchClassWorkList(
        accessToken,
        _selectedClass,
        month,
        year,
        _selectedSection,
        _selectedSubject,
        start,
      );

      _classWorkList = data;

      emit(ClassWorkLoaded(
        classWorkList: _classWorkList,
        selectedClass: _selectedClass,
        selectedSection: _selectedSection,
        selectedSubject: _selectedSubject,
      ));
    } catch (e) {
      emit(ClassWorkError(
        message: e.toString(),
        selectedClass: _selectedClass,
        selectedSection: _selectedSection,
        selectedSubject: _selectedSubject,
      ));
    }
  }

  bool get hasLoadedInitially => _hasLoadedInitially;

  // Getters for current selections
  String get selectedClass => _selectedClass;
  String get selectedSection => _selectedSection;
  String get selectedSubject => _selectedSubject;
}
