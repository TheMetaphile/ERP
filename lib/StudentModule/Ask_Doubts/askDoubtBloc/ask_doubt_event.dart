import 'package:equatable/equatable.dart';

abstract class AskDoubtEvent extends Equatable {
  const AskDoubtEvent();

  @override
  List<Object?> get props => [];
}

// Fetch all subjects for dropdown
class FetchSubjects extends AskDoubtEvent {}

// Fetch initial list of doubts (reset/refresh)
class FetchDoubts extends AskDoubtEvent {
  final String status;
  final String selectedSubject;
  final int start; // default is 0

  const FetchDoubts({
    required this.status,
    required this.selectedSubject,
    this.start = 0,
  });

  @override
  List<Object?> get props => [status, selectedSubject, start];
}

// Fetch more doubts for infinite scroll
class FetchMoreDoubts extends AskDoubtEvent {
  final String status;
  final String selectedSubject;
  final int start;

  const FetchMoreDoubts({
    required this.status,
    required this.selectedSubject,
    required this.start,
  });

  @override
  List<Object?> get props => [status, selectedSubject, start];
}

// Create a new doubt
class AskNewDoubt extends AskDoubtEvent {
  final String subject;
  final String question;

  const AskNewDoubt({
    required this.subject,
    required this.question,
  });

  @override
  List<Object?> get props => [subject, question];
}

// Update existing doubt
class UpdateDoubt extends AskDoubtEvent {
  final String doubtId;
  final Map<String, dynamic> updatedDoubt;
  final String currentClass;

  const UpdateDoubt({
    required this.doubtId,
    required this.updatedDoubt,
    required this.currentClass,
  });

  @override
  List<Object?> get props => [doubtId, updatedDoubt, currentClass];
}

// Delete a doubt
class DeleteDoubt extends AskDoubtEvent {
  final String doubtId;
  final String currentClass;

  const DeleteDoubt({
    required this.doubtId,
    required this.currentClass,
  });

  @override
  List<Object?> get props => [doubtId, currentClass];
}
