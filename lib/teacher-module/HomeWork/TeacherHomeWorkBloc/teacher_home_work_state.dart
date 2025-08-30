import 'package:equatable/equatable.dart';

abstract class HomeWorkState extends Equatable {
  const HomeWorkState();

  @override
  List<Object?> get props => [];
}

class HomeWorkInitial extends HomeWorkState {}

class HomeWorkLoading extends HomeWorkState {}

class HomeWorkLoaded extends HomeWorkState {
  final List<dynamic> homeWorkList;
  final String selectedClass;
  final String selectedSection;
  final String selectedSubject;

  const HomeWorkLoaded({
    required this.homeWorkList,
    required this.selectedClass,
    required this.selectedSection,
    required this.selectedSubject,
  });

  @override
  List<Object?> get props => [homeWorkList, selectedClass, selectedSection, selectedSubject];
}

class HomeWorkError extends HomeWorkState {
  final String message;
  final String selectedClass;
  final String selectedSection;
  final String selectedSubject;

  const HomeWorkError({
    required this.message,
    required this.selectedClass,
    required this.selectedSection,
    required this.selectedSubject,
  });

  @override
  List<Object?> get props => [message, selectedClass, selectedSection, selectedSubject];
}
