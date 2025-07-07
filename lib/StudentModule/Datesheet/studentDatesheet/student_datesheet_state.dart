
import 'package:equatable/equatable.dart';

abstract class DateSheetState extends Equatable {
  const DateSheetState();

  @override
  List<Object> get props => [];
}

class DateSheetInitial extends DateSheetState {}

class DateSheetLoading extends DateSheetState {}

class DateSheetLoaded extends DateSheetState {
  final List<Map<String, dynamic>> dateSheet;

  const DateSheetLoaded(this.dateSheet);

  @override
  List<Object> get props => [dateSheet];
}

class DateSheetError extends DateSheetState {
  final String message;

  const DateSheetError(this.message);

  @override
  List<Object> get props => [message];
}