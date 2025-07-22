import 'package:equatable/equatable.dart';

abstract class FeesEvent extends Equatable {
  const FeesEvent();

  @override
  List<Object> get props => [];
}

class LoadFeesData extends FeesEvent {
  final String email;

  const LoadFeesData(this.email);

  @override
  List<Object> get props => [email];
}

class RefreshFeesData extends FeesEvent {
  final String email;

  const RefreshFeesData(this.email);

  @override
  List<Object> get props => [email];
}

class ChangeFeesStatus extends FeesEvent {
  final String status;

  const ChangeFeesStatus(this.status);

  @override
  List<Object> get props => [status];
}

class ProcessPayment extends FeesEvent {
  final String email;
  final int amount;
  final int index;
  final String orderId;

  const ProcessPayment(this.email, this.amount, this.index, this.orderId);

  @override
  List<Object> get props => [email, amount, index, orderId];
}
