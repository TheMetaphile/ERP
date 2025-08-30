import 'package:equatable/equatable.dart';

abstract class HomeWorkEvent extends Equatable {
  const HomeWorkEvent();

  @override
  List<Object> get props => [];
}

class LoadHomeWorkData extends HomeWorkEvent {}

class RefreshHomeWorkData extends HomeWorkEvent {}

class UpdateFilters extends HomeWorkEvent {
  final String selectedClass;
  final String selectedSection;
  final String selectedSubject;

  const UpdateFilters({
    required this.selectedClass,
    required this.selectedSection,
    required this.selectedSubject,
  });

  @override
  List<Object> get props => [selectedClass, selectedSection, selectedSubject];
}
