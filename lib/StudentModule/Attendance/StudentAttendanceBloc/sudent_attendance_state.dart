abstract class AttendanceState {
  final int selectedMonthIndex;
  final String selectedYear;

  AttendanceState({
    required this.selectedMonthIndex,
    required this.selectedYear,
  });
}

class AttendanceInitial extends AttendanceState {
  AttendanceInitial({
    required int selectedMonthIndex,
    required String selectedYear,
  }) : super(selectedMonthIndex: selectedMonthIndex, selectedYear: selectedYear);
}

class AttendanceLoading extends AttendanceState {
  AttendanceLoading({
    required int selectedMonthIndex,
    required String selectedYear,
  }) : super(selectedMonthIndex: selectedMonthIndex, selectedYear: selectedYear);
}

class AttendanceLoaded extends AttendanceState {
  final Map<String, dynamic>? attendanceData;

  AttendanceLoaded({
    required this.attendanceData,
    required int selectedMonthIndex,
    required String selectedYear,
  }) : super(selectedMonthIndex: selectedMonthIndex, selectedYear: selectedYear);
}

class AttendanceError extends AttendanceState {
  final String message;

  AttendanceError({
    required this.message,
    required int selectedMonthIndex,
    required String selectedYear,
  }) : super(selectedMonthIndex: selectedMonthIndex, selectedYear: selectedYear);
}