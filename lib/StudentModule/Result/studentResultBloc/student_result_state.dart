import 'package:equatable/equatable.dart';

abstract class ReportCardState extends Equatable {
  const ReportCardState();

  @override
  List<Object?> get props => [];
}

class ReportCardInitial extends ReportCardState {}

class ReportCardLoading extends ReportCardState {}

class ReportCardRefreshing extends ReportCardState {
  final String selectedTerm;
  final Map<String, List<dynamic>> cachedData;

  const ReportCardRefreshing({
    required this.selectedTerm,
    required this.cachedData,
  });

  @override
  List<Object?> get props => [selectedTerm, cachedData];
}

class ReportCardLoaded extends ReportCardState {
  final String selectedTerm;
  final List<dynamic> finalTerm;
  final List<dynamic> finalCoScholastic;
  final List<dynamic> halfYearly;
  final List<dynamic> halfYearlyCoScholastic;
  final List<dynamic> term1;
  final List<dynamic> term1CoScholastic;
  final List<dynamic> term2;
  final List<dynamic> term2CoScholastic;

  const ReportCardLoaded({
    required this.selectedTerm,
    required this.finalTerm,
    required this.finalCoScholastic,
    required this.halfYearly,
    required this.halfYearlyCoScholastic,
    required this.term1,
    required this.term1CoScholastic,
    required this.term2,
    required this.term2CoScholastic,
  });

  @override
  List<Object?> get props => [
    selectedTerm,
    finalTerm,
    finalCoScholastic,
    halfYearly,
    halfYearlyCoScholastic,
    term1,
    term1CoScholastic,
    term2,
    term2CoScholastic,
  ];

  ReportCardLoaded copyWith({
    String? selectedTerm,
    List<dynamic>? finalTerm,
    List<dynamic>? finalCoScholastic,
    List<dynamic>? halfYearly,
    List<dynamic>? halfYearlyCoScholastic,
    List<dynamic>? term1,
    List<dynamic>? term1CoScholastic,
    List<dynamic>? term2,
    List<dynamic>? term2CoScholastic,
  }) {
    return ReportCardLoaded(
      selectedTerm: selectedTerm ?? this.selectedTerm,
      finalTerm: finalTerm ?? this.finalTerm,
      finalCoScholastic: finalCoScholastic ?? this.finalCoScholastic,
      halfYearly: halfYearly ?? this.halfYearly,
      halfYearlyCoScholastic: halfYearlyCoScholastic ?? this.halfYearlyCoScholastic,
      term1: term1 ?? this.term1,
      term1CoScholastic: term1CoScholastic ?? this.term1CoScholastic,
      term2: term2 ?? this.term2,
      term2CoScholastic: term2CoScholastic ?? this.term2CoScholastic,
    );
  }

  Map<String, List<dynamic>> get allData => {
    'final': finalTerm,
    'final_Co_scholastic': finalCoScholastic,
    'halfYearly': halfYearly,
    'halfYearly_Co_scholastic': halfYearlyCoScholastic,
    'term1': term1,
    'term1_Co_scholastic': term1CoScholastic,
    'term2': term2,
    'term2_Co_scholastic': term2CoScholastic,
  };
}

class ReportCardError extends ReportCardState {
  final String message;
  final String? selectedTerm;

  const ReportCardError({
    required this.message,
    this.selectedTerm,
  });

  @override
  List<Object?> get props => [message, selectedTerm];
}
