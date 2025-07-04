import 'package:equatable/equatable.dart';

abstract class StudentHomeworkState extends Equatable {
  const StudentHomeworkState();

  @override
  List<Object?> get props => [];
}

class StudentHomeworkInitial extends StudentHomeworkState {}

class StudentHomeworkLoading extends StudentHomeworkState {}

class StudentHomeworkLoaded extends StudentHomeworkState {
  final List<String> subjects;
  final String selectedSubject;
  final List<Map<String, dynamic>> homeworkList;
  final String currentClass;
  final String section;

  const StudentHomeworkLoaded({
    required this.subjects,
    required this.selectedSubject,
    required this.homeworkList,
    required this.currentClass,
    required this.section,
  });

  @override
  List<Object?> get props => [
    subjects,
    selectedSubject,
    homeworkList,
    currentClass,
    section,
  ];

  StudentHomeworkLoaded copyWith({
    List<String>? subjects,
    String? selectedSubject,
    List<Map<String, dynamic>>? homeworkList,
    String? currentClass,
    String? section,
  }) {
    return StudentHomeworkLoaded(
      subjects: subjects ?? this.subjects,
      selectedSubject: selectedSubject ?? this.selectedSubject,
      homeworkList: homeworkList ?? this.homeworkList,
      currentClass: currentClass ?? this.currentClass,
      section: section ?? this.section,
    );
  }
}

class StudentHomeworkError extends StudentHomeworkState {
  final String message;

  const StudentHomeworkError(this.message);

  @override
  List<Object?> get props => [message];
}

class StudentHomeworkEmpty extends StudentHomeworkState {
  final List<String> subjects;
  final String selectedSubject;
  final String currentClass;
  final String section;

  const StudentHomeworkEmpty({
    required this.subjects,
    required this.selectedSubject,
    required this.currentClass,
    required this.section,
  });

  @override
  List<Object?> get props => [subjects, selectedSubject, currentClass, section];
}