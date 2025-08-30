import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:untitled/APIs/Teacher Module/HomeWork/homeWOrkAPi.dart';
import 'package:untitled/teacher-module/HomeWork/TeacherHomeWorkBloc/teacher_home_work_event.dart';
import 'package:untitled/teacher-module/HomeWork/TeacherHomeWorkBloc/teacher_home_work_state.dart';

class HomeWorkBloc extends Bloc<HomeWorkEvent, HomeWorkState> {
  final HomeWorkAPI apiObj = HomeWorkAPI();
  bool _hasLoadedInitially = false;

  // Preserve dropdown selections in BLoC
  String _selectedClass = "";
  String _selectedSection = "";
  String _selectedSubject = "";
  List<dynamic> _homeWorkList = [];

  HomeWorkBloc() : super(HomeWorkInitial()) {
    on<LoadHomeWorkData>(_onLoadHomeWork);
    on<RefreshHomeWorkData>(_onRefreshHomeWork);
    on<UpdateFilters>(_onUpdateFilters);
  }

  Future<void> _onLoadHomeWork(LoadHomeWorkData event, Emitter<HomeWorkState> emit) async {
    if (_hasLoadedInitially) {
      // Return current state if already loaded
      emit(HomeWorkLoaded(
        homeWorkList: _homeWorkList,
        selectedClass: _selectedClass,
        selectedSection: _selectedSection,
        selectedSubject: _selectedSubject,
      ));
      return;
    }

    emit(HomeWorkLoading());
    await _fetchData(emit);
    _hasLoadedInitially = true;
  }

  Future<void> _onRefreshHomeWork(RefreshHomeWorkData event, Emitter<HomeWorkState> emit) async {
    // Always fetch fresh data on refresh
    await _fetchData(emit);
  }

  Future<void> _onUpdateFilters(UpdateFilters event, Emitter<HomeWorkState> emit) async {
    // Update stored selections
    _selectedClass = event.selectedClass;
    _selectedSection = event.selectedSection;
    _selectedSubject = event.selectedSubject;

    // Update filters but keep current data (no reload unless all filters are selected)
    emit(HomeWorkLoaded(
      homeWorkList: _homeWorkList,
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

  Future<void> _fetchData(Emitter<HomeWorkState> emit) async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      String year = DateTime.now().year.toString();
      String month = DateTime.now().month.toString().padLeft(2, '0');
      int start = 0;

      List<dynamic> data = await apiObj.fetchHomeWorkList(
        accessToken,
        _selectedClass,
        month,
        year,
        _selectedSection,
        _selectedSubject,
        start,
      );

      _homeWorkList = data;

      emit(HomeWorkLoaded(
        homeWorkList: _homeWorkList,
        selectedClass: _selectedClass,
        selectedSection: _selectedSection,
        selectedSubject: _selectedSubject,
      ));
    } catch (e) {
      emit(HomeWorkError(
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
