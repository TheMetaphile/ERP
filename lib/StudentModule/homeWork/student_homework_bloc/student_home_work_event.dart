import 'package:equatable/equatable.dart';

abstract class StudentHomeworkEvent extends Equatable {
  const StudentHomeworkEvent();

  @override
  List<Object?> get props => [];
}

class FetchSubjectsEvent extends StudentHomeworkEvent {}

class SelectSubjectEvent extends StudentHomeworkEvent {
  final String selectedSubject;

  const SelectSubjectEvent(this.selectedSubject);

  @override
  List<Object?> get props => [selectedSubject];
}

class FetchHomeworkEvent extends StudentHomeworkEvent {
  final String selectedSubject;
  final String section;
  final int start;

  const FetchHomeworkEvent({
    required this.selectedSubject,
    required this.section,
    required this.start,
  });

  @override
  List<Object?> get props => [selectedSubject, section, start];
}