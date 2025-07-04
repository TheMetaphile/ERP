abstract class AttendanceEvent {}

class ChangeMonthYear extends AttendanceEvent {
  final int selectedMonthIndex;
  final String selectedYear;

  ChangeMonthYear(this.selectedMonthIndex, this.selectedYear);
}

class FetchAttendance extends AttendanceEvent {
  final int selectedMonthIndex;
  final String selectedYear;

  FetchAttendance(this.selectedMonthIndex, this.selectedYear);
}

class RefreshAttendance extends AttendanceEvent {
  final int selectedMonthIndex;
  final String selectedYear;

  RefreshAttendance(this.selectedMonthIndex, this.selectedYear);
}