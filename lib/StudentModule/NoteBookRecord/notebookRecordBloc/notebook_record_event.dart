import 'package:equatable/equatable.dart';

abstract class NoteBookRecordEvent extends Equatable {
  const NoteBookRecordEvent();

  @override
  List<Object> get props => [];
}

class FetchSubjectsEvent extends NoteBookRecordEvent {
  const FetchSubjectsEvent();
}
class RefreshSubjectsEvent extends NoteBookRecordEvent {}

class FetchNoteBookRecordEvent extends NoteBookRecordEvent {
  final String subject;

  const FetchNoteBookRecordEvent(this.subject);

  @override
  List<Object> get props => [subject];
}

class ChangeSubjectEvent extends NoteBookRecordEvent {
  final String subject;

  const ChangeSubjectEvent(this.subject);

  @override
  List<Object> get props => [subject];
}