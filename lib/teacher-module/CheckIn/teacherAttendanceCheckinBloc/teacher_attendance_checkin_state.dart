import 'package:equatable/equatable.dart';

class AttendanceEntry {
  final String date;
  final String checkIn;
  final String checkOut;
  final String workingHour;

  AttendanceEntry({required this.date, required this.checkIn, required this.checkOut, required this.workingHour});
}

abstract class TeacherAttendanceCheckInState extends Equatable {
  const TeacherAttendanceCheckInState();

  @override
  List<Object?> get props => [];
}

class AttendanceInitial extends TeacherAttendanceCheckInState {}

class AttendanceLoading extends TeacherAttendanceCheckInState {}

class AttendanceLoaded extends TeacherAttendanceCheckInState {
  final List<AttendanceEntry> attendance;
  final bool checkIn;
  final bool checkOut;
  final bool takeBreak;

  const AttendanceLoaded({required this.attendance, required this.checkIn, required this.checkOut, required this.takeBreak});

  @override
  List<Object?> get props => [attendance, checkIn, checkOut, takeBreak];
}

class AttendanceError extends TeacherAttendanceCheckInState {
  final String message;

  const AttendanceError(this.message);

  @override
  List<Object?> get props => [message];
}
