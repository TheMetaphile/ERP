import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'teacher_attendance_checkin_event.dart';
import 'teacher_attendance_checkin_state.dart';

class TeacherAttendanceCheckInBloc extends Bloc<TeacherAttendanceCheckInEvent, TeacherAttendanceCheckInState> {
  TeacherAttendanceCheckInBloc() : super(AttendanceInitial()) {
    on<LoadAttendanceData>(_onLoadAttendanceData);
    on<RefreshAttendanceData>(_onRefreshAttendanceData);
    on<UpdateCheckState>(_onUpdateCheckState);
  }

  bool _hasLoadedInitially = false;
  List<AttendanceEntry> _attendanceData = [];
  bool _checkIn = true;
  bool _checkOut = false;
  bool _takeBreak = false;

  Future<void> _onLoadAttendanceData(LoadAttendanceData event, Emitter<TeacherAttendanceCheckInState> emit) async {
    // If already loaded, just emit the current state
    if (_hasLoadedInitially) {
      emit(AttendanceLoaded(attendance: _attendanceData, checkIn: _checkIn, checkOut: _checkOut, takeBreak: _takeBreak));
      return;
    }

    emit(AttendanceLoading());
    try {
      await Future.delayed(const Duration(milliseconds: 500));
      _attendanceData = [
        AttendanceEntry(date: '11 Tue', checkIn: '09:00am', checkOut: '08:45pm', workingHour: '08:20m'),
        AttendanceEntry(date: '12 Wed', checkIn: '09:15am', checkOut: '08:45pm', workingHour: '08:10m'),
        AttendanceEntry(date: '13 Thru', checkIn: '09:30am', checkOut: '08:45pm', workingHour: '08:20m'),
        AttendanceEntry(date: '14 Fri', checkIn: '09:00am', checkOut: '08:45pm', workingHour: '08:20m'),
        AttendanceEntry(date: '15 Sat', checkIn: '09:10am', checkOut: '08:45pm', workingHour: '08:15m'),
        AttendanceEntry(date: '16 Mon', checkIn: '09:00am', checkOut: '08:45pm', workingHour: '08:10m'),
      ];
      _hasLoadedInitially = true;
      emit(AttendanceLoaded(attendance: _attendanceData, checkIn: _checkIn, checkOut: _checkOut, takeBreak: _takeBreak));
    } catch (e) {
      emit(AttendanceError(e.toString()));
    }
  }

  Future<void> _onRefreshAttendanceData(RefreshAttendanceData event, Emitter<TeacherAttendanceCheckInState> emit) async {
    try {
      // Don't show loading for refresh, just update data
      await Future.delayed(const Duration(milliseconds: 500));
      // Simulate refreshed data (you can call your API here)
      emit(AttendanceLoaded(attendance: _attendanceData, checkIn: _checkIn, checkOut: _checkOut, takeBreak: _takeBreak));
    } catch (e) {
      emit(AttendanceError(e.toString()));
    }
  }

  Future<void> _onUpdateCheckState(UpdateCheckState event, Emitter<TeacherAttendanceCheckInState> emit) async {
    _checkIn = event.checkIn;
    _checkOut = event.checkOut;
    _takeBreak = event.takeBreak;
    emit(AttendanceLoaded(attendance: _attendanceData, checkIn: _checkIn, checkOut: _checkOut, takeBreak: _takeBreak));
  }

  // Getter to check if data is loaded
  bool get hasLoadedInitially => _hasLoadedInitially;
}
