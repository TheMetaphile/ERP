import 'package:equatable/equatable.dart';

abstract class PreviousSessionEvent extends Equatable {
  const PreviousSessionEvent();

  @override
  List<Object> get props => [];
}

class LoadPreviousSessionData extends PreviousSessionEvent {
  final String email;

  const LoadPreviousSessionData(this.email);

  @override
  List<Object> get props => [email];
}

class RefreshPreviousSessionData extends PreviousSessionEvent {
  final String email;

  const RefreshPreviousSessionData(this.email);

  @override
  List<Object> get props => [email];
}
