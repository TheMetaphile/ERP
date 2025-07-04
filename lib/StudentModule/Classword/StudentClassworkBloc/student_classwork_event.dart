import 'package:equatable/equatable.dart';

abstract class StudentClassworkEvent extends Equatable {
  const StudentClassworkEvent();

  @override
  List<Object?> get props => [];
}

class FetchSubjectsEvent extends StudentClassworkEvent {}

class SelectSubjectEvent extends StudentClassworkEvent {
  final String selectedSubject;

  const SelectSubjectEvent(this.selectedSubject);

  @override
  List<Object?> get props => [selectedSubject];
}

class FetchClassworkEvent extends StudentClassworkEvent {
  final String selectedSubject;
  final String section;
  final int start;

  const FetchClassworkEvent({
    required this.selectedSubject,
    required this.section,
    required this.start,
  });

  @override
  List<Object?> get props => [selectedSubject, section, start];
}