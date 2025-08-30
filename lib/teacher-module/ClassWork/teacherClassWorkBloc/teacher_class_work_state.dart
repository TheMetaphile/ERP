import 'package:equatable/equatable.dart';

abstract class ClassWorkState extends Equatable {
  const ClassWorkState();

  @override
  List<Object?> get props => [];
}

class ClassWorkInitial extends ClassWorkState {}

class ClassWorkLoading extends ClassWorkState {}

class ClassWorkLoaded extends ClassWorkState {
  final List<dynamic> classWorkList;
  final String selectedClass;
  final String selectedSection;
  final String selectedSubject;

  const ClassWorkLoaded({
    required this.classWorkList,
    required this.selectedClass,
    required this.selectedSection,
    required this.selectedSubject,
  });

  @override
  List<Object?> get props => [classWorkList, selectedClass, selectedSection, selectedSubject];
}

class ClassWorkError extends ClassWorkState {
  final String message;
  final String selectedClass;
  final String selectedSection;
  final String selectedSubject;

  const ClassWorkError({
    required this.message,
    required this.selectedClass,
    required this.selectedSection,
    required this.selectedSubject,
  });

  @override
  List<Object?> get props => [message, selectedClass, selectedSection, selectedSubject];
}
