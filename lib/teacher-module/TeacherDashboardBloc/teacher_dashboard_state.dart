import 'package:equatable/equatable.dart';

class AttendanceEntry {
  final String date;
  final String checkIn;
  final String checkOut;
  final String workingHours;

  AttendanceEntry({required this.date, required this.checkIn, required this.checkOut, required this.workingHours});
}

class CardInfo {
  final String type;
  final String number;

  CardInfo({required this.type, required this.number});
}

abstract class TeacherDashboardState extends Equatable {
  const TeacherDashboardState();

  @override
  List<Object?> get props => [];
}

class TeacherDashboardInitial extends TeacherDashboardState {}

class TeacherDashboardLoading extends TeacherDashboardState {}

class TeacherDashboardLoaded extends TeacherDashboardState {
  final String? teacherName;
  final String? profileLink;
  final String? teacherEmail;
  final String? employeeID;
  final List<AttendanceEntry> attendance;
  final List<CardInfo> cards;

  const TeacherDashboardLoaded({this.teacherName, this.profileLink, this.teacherEmail, this.employeeID, required this.attendance, required this.cards});

  @override
  List<Object?> get props => [teacherName, profileLink, teacherEmail, employeeID, attendance, cards];
}

class TeacherDashboardError extends TeacherDashboardState {
  final String message;

  const TeacherDashboardError(this.message);

  @override
  List<Object?> get props => [message];
}
