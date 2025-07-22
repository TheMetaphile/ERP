import 'package:equatable/equatable.dart';

abstract class FeesState extends Equatable {
  const FeesState();

  @override
  List<Object?> get props => [];
}

class FeesInitial extends FeesState {}

class FeesLoading extends FeesState {}

class FeesLoaded extends FeesState {
  final Map<String, dynamic> feeStats;
  final List<dynamic>? monthlyStatus;
  final List<dynamic>? quarterlyStatus;
  final String selectedStatus;

  const FeesLoaded({
    required this.feeStats,
    this.monthlyStatus,
    this.quarterlyStatus,
    this.selectedStatus = "Monthly",
  });

  @override
  List<Object?> get props => [feeStats, monthlyStatus, quarterlyStatus, selectedStatus];

  FeesLoaded copyWith({
    Map<String, dynamic>? feeStats,
    List<dynamic>? monthlyStatus,
    List<dynamic>? quarterlyStatus,
    String? selectedStatus,
  }) {
    return FeesLoaded(
      feeStats: feeStats ?? this.feeStats,
      monthlyStatus: monthlyStatus ?? this.monthlyStatus,
      quarterlyStatus: quarterlyStatus ?? this.quarterlyStatus,
      selectedStatus: selectedStatus ?? this.selectedStatus,
    );
  }
}

class FeesError extends FeesState {
  final String message;

  const FeesError(this.message);

  @override
  List<Object> get props => [message];
}

class PaymentProcessing extends FeesState {}

class PaymentSuccess extends FeesState {
  final String message;

  const PaymentSuccess(this.message);

  @override
  List<Object> get props => [message];
}

class PaymentError extends FeesState {
  final String message;

  const PaymentError(this.message);

  @override
  List<Object> get props => [message];
}
