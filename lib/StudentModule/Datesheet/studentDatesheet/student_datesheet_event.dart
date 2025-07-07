
import 'package:equatable/equatable.dart';

abstract class DateSheetEvent extends Equatable {
  const DateSheetEvent();

  @override
  List<Object> get props => [];
}

class FetchDateSheet extends DateSheetEvent {
  final String className;

  const FetchDateSheet(this.className);

  @override
  List<Object> get props => [className];
}

class RefreshDateSheet extends DateSheetEvent {
  final String className;

  const RefreshDateSheet(this.className);

  @override
  List<Object> get props => [className];
}