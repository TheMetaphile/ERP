import 'package:equatable/equatable.dart';

abstract class TeacherDashboardEvent extends Equatable {
  const TeacherDashboardEvent();

  @override
  List<Object> get props => [];
}

class LoadTeacherDetails extends TeacherDashboardEvent {}

class RefreshTeacherDashboard extends TeacherDashboardEvent {}
