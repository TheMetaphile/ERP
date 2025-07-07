import 'package:equatable/equatable.dart';

class NoteBookRecordState extends Equatable {
  final List<String> subjects;
  final String selectedSubject;
  final List<Map<String, dynamic>> records;
  final bool isLoading;
  final String? error;

  const NoteBookRecordState({
    required this.subjects,
    required this.selectedSubject,
    required this.records,
    required this.isLoading,
    this.error,
  });

  NoteBookRecordState copyWith({
    List<String>? subjects,
    String? selectedSubject,
    List<Map<String, dynamic>>? records,
    bool? isLoading,
    String? error,
  }) {
    return NoteBookRecordState(
      subjects: subjects ?? this.subjects,
      selectedSubject: selectedSubject ?? this.selectedSubject,
      records: records ?? this.records,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }

  @override
  List<Object?> get props => [subjects, selectedSubject, records, isLoading, error];
}

class NoteBookRecordInitial extends NoteBookRecordState {
  const NoteBookRecordInitial()
      : super(
    subjects: const [],
    selectedSubject: '',
    records: const [],
    isLoading: false,
    error: null,
  );
}