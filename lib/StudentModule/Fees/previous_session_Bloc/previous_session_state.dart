import 'package:equatable/equatable.dart';

abstract class PreviousSessionState extends Equatable {
  const PreviousSessionState();

  @override
  List<Object?> get props => [];
}

class PreviousSessionInitial extends PreviousSessionState {}

class PreviousSessionLoading extends PreviousSessionState {}

class PreviousSessionLoaded extends PreviousSessionState {
  final List<dynamic> sessions;

  const PreviousSessionLoaded(this.sessions);

  @override
  List<Object> get props => [sessions];
}

class PreviousSessionError extends PreviousSessionState {
  final String message;

  const PreviousSessionError(this.message);

  @override
  List<Object> get props => [message];
}
