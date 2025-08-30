import 'package:equatable/equatable.dart';

abstract class ClassWorkEvent extends Equatable {
  const ClassWorkEvent();

  @override
  List<Object> get props => [];
}

class LoadClassWorkData extends ClassWorkEvent {}

class RefreshClassWorkData extends ClassWorkEvent {}

class UpdateFilters extends ClassWorkEvent {
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
