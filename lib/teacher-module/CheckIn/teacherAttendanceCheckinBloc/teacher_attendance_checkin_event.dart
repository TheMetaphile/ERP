import 'package:equatable/equatable.dart';

abstract class TeacherAttendanceCheckInEvent extends Equatable {
  const TeacherAttendanceCheckInEvent();

  @override
  List<Object> get props => [];
}

class LoadAttendanceData extends TeacherAttendanceCheckInEvent {}

class RefreshAttendanceData extends TeacherAttendanceCheckInEvent {}

class UpdateCheckState extends TeacherAttendanceCheckInEvent {
  final bool checkIn;
  final bool checkOut;
  final bool takeBreak;

  const UpdateCheckState({required this.checkIn, required this.checkOut, required this.takeBreak});

  @override
  List<Object> get props => [checkIn, checkOut, takeBreak];
}
