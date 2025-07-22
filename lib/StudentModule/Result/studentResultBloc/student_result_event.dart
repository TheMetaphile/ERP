import 'package:equatable/equatable.dart';

abstract class ReportCardEvent extends Equatable {
  const ReportCardEvent();

  @override
  List<Object?> get props => [];
}

class LoadReportCardData extends ReportCardEvent {
  final String email;
  final String? selectedTerm;

  const LoadReportCardData({
    required this.email,
    this.selectedTerm,
  });

  @override
  List<Object?> get props => [email, selectedTerm];
}

class ChangeTermSelection extends ReportCardEvent {
  final String selectedTerm;

  const ChangeTermSelection(this.selectedTerm);

  @override
  List<Object?> get props => [selectedTerm];
}

class RefreshReportCardData extends ReportCardEvent {
  final String email;
  final String selectedTerm;

  const RefreshReportCardData({
    required this.email,
    required this.selectedTerm,
  });

  @override
  List<Object?> get props => [email, selectedTerm];
}
