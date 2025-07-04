import 'package:equatable/equatable.dart';

class StudentClassworkState extends Equatable {
  const StudentClassworkState();

  @override
  List<Object?> get props => [];
}

class StudentClassworkInitial extends StudentClassworkState {}

class StudentClassworkLoading extends StudentClassworkState {}

class StudentClassworkLoaded extends StudentClassworkState {
  final List<String> subjectOptions;
  final String selectedSubject;
  final String currentClass;
  final String section;
  final List<Map<String, dynamic>> classWorkList;

  const StudentClassworkLoaded({
    required this.subjectOptions,
    required this.selectedSubject,
    required this.currentClass,
    required this.section,
    required this.classWorkList,
  });

  @override
  List<Object?> get props => [
    subjectOptions,
    selectedSubject,
    currentClass,
    section,
    classWorkList,
  ];
}

class StudentClassworkError extends StudentClassworkState {
  final String message;

  const StudentClassworkError(this.message);

  @override
  List<Object?> get props => [message];
}