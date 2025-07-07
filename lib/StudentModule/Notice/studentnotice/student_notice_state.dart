import 'package:equatable/equatable.dart';

abstract class StudentNoticeState extends Equatable {
  const StudentNoticeState();

  @override
  List<Object?> get props => [];
}

class StudentNoticeInitial extends StudentNoticeState {
  const StudentNoticeInitial();
}

class StudentNoticeLoading extends StudentNoticeState {
  const StudentNoticeLoading();
}

class StudentNoticeLoadingMore extends StudentNoticeState {
  final List<dynamic> notices;

  const StudentNoticeLoadingMore({required this.notices});

  @override
  List<Object?> get props => [notices];
}

class StudentNoticeLoaded extends StudentNoticeState {
  final List<dynamic> notices;
  final bool hasReachedMax;

  const StudentNoticeLoaded({required this.notices, required this.hasReachedMax});

  @override
  List<Object?> get props => [notices, hasReachedMax];
}

class StudentNoticeError extends StudentNoticeState {
  final String message;

  const StudentNoticeError({required this.message});

  @override
  List<Object?> get props => [message];
}