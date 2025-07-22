abstract class StudentTimetableEvent {}

class LoadTimetableStructure extends StudentTimetableEvent {}

class LoadTimetableForDay extends StudentTimetableEvent {
  final String day;

  LoadTimetableForDay(this.day);
}

class RefreshTimetable extends StudentTimetableEvent {}
