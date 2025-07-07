import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

abstract class StudentLeaveEvent extends Equatable {
  const StudentLeaveEvent();

  @override
  List<Object?> get props => [];
}

class FetchLeaves extends StudentLeaveEvent {
  final String status;
  final bool isRefresh;

  const FetchLeaves({required this.status, this.isRefresh = false});

  @override
  List<Object?> get props => [status, isRefresh];
}

class LoadMoreLeaves extends StudentLeaveEvent {
  final String status;

  const LoadMoreLeaves({required this.status});

  @override
  List<Object?> get props => [status];
}

class ApplyLeave extends StudentLeaveEvent {
  final String startDate;
  final String endDate;
  final String reason;

  const ApplyLeave({
    required this.startDate,
    required this.endDate,
    required this.reason,
  });

  @override
  List<Object?> get props => [startDate, endDate, reason];
}

class UpdateLeave extends StudentLeaveEvent {
  final String leaveId;
  final String startDate;
  final String endDate;
  final String reason;

  const UpdateLeave({
    required this.leaveId,
    required this.startDate,
    required this.endDate,
    required this.reason,
  });

  @override
  List<Object?> get props => [leaveId, startDate, endDate, reason];
}

class DeleteLeave extends StudentLeaveEvent {
  final String leaveId;

  const DeleteLeave({required this.leaveId});

  @override
  List<Object?> get props => [leaveId];
}

class LoadStats extends StudentLeaveEvent {
  const LoadStats();

  @override
  List<Object?> get props => [];
}