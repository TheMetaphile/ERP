import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'teacher_dashboard_event.dart';
import 'teacher_dashboard_state.dart';

class TeacherDashboardBloc extends Bloc<TeacherDashboardEvent, TeacherDashboardState> {
  bool _hasLoadedInitially = false;

  TeacherDashboardBloc() : super(TeacherDashboardInitial()) {
    on<LoadTeacherDetails>(_onLoadTeacherDetails);
    on<RefreshTeacherDashboard>(_onRefreshTeacherDashboard);
  }

  Future<void> _onLoadTeacherDetails(LoadTeacherDetails event, Emitter<TeacherDashboardState> emit) async {
    // Only show loading state if this is the initial load
    if (!_hasLoadedInitially) {
      emit(TeacherDashboardLoading());
    }

    try {
      await _loadData(emit);
      _hasLoadedInitially = true;
    } catch (e) {
      emit(TeacherDashboardError(e.toString()));
    }
  }

  Future<void> _onRefreshTeacherDashboard(RefreshTeacherDashboard event, Emitter<TeacherDashboardState> emit) async {
    try {
      // Don't show loading state for refresh, just reload data
      await _loadData(emit);
    } catch (e) {
      emit(TeacherDashboardError(e.toString()));
    }
  }

  Future<void> _loadData(Emitter<TeacherDashboardState> emit) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    final teacherName = pref.getString('name');
    final profileLink = pref.getString('profileLink');
    final teacherEmail = pref.getString('email');
    final employeeID = pref.getString('employeeId');

    // Simulate API call delay
    await Future.delayed(const Duration(milliseconds: 500));

    final attendance = [
      AttendanceEntry(date: '11 Tue', checkIn: '09:00am', checkOut: '08:45pm', workingHours: '08:20m'),
      AttendanceEntry(date: '12 Wed', checkIn: '09:15am', checkOut: '08:45pm', workingHours: '08:10m'),
      AttendanceEntry(date: '13 Thru', checkIn: '09:30am', checkOut: '08:45pm', workingHours: '08:20m'),
      AttendanceEntry(date: '14 Fri', checkIn: '09:00am', checkOut: '08:45pm', workingHours: '08:20m'),
      AttendanceEntry(date: '15 Sat', checkIn: '09:10am', checkOut: '08:45pm', workingHours: '08:15m'),
      AttendanceEntry(date: '16 Mon', checkIn: '09:00am', checkOut: '08:45pm', workingHours: '08:10m'),
    ];

    final cards = [
      CardInfo(type: 'Total Subject', number: '6'),
      CardInfo(type: 'Total Classes', number: '3'),
      CardInfo(type: 'Total Students', number: '120'),
    ];

    emit(TeacherDashboardLoaded(
      teacherName: teacherName,
      profileLink: profileLink,
      teacherEmail: teacherEmail,
      employeeID: employeeID,
      attendance: attendance,
      cards: cards,
    ));
  }

  // Method to check if data has been loaded initially
  bool get hasLoadedInitially => _hasLoadedInitially;
}
