abstract class StudentTimetableState {}

class StudentTimetableInitial extends StudentTimetableState {}

class StudentTimetableLoading extends StudentTimetableState {}

class StudentTimetableLoaded extends StudentTimetableState {
  final Map<String, dynamic> timetableStructure;
  final Map<String, List<Map<String, dynamic>>> cachedTimetableData;
  final String currentDay;
  final List<String>? subjectOptions;

  StudentTimetableLoaded({
    required this.timetableStructure,
    required this.cachedTimetableData,
    required this.currentDay,
    this.subjectOptions,
  });

  StudentTimetableLoaded copyWith({
    Map<String, dynamic>? timetableStructure,
    Map<String, List<Map<String, dynamic>>>? cachedTimetableData,
    String? currentDay,
    List<String>? subjectOptions,
  }) {
    return StudentTimetableLoaded(
      timetableStructure: timetableStructure ?? this.timetableStructure,
      cachedTimetableData: cachedTimetableData ?? this.cachedTimetableData,
      currentDay: currentDay ?? this.currentDay,
      subjectOptions: subjectOptions ?? this.subjectOptions,
    );
  }
}

class StudentTimetableError extends StudentTimetableState {
  final String message;

  StudentTimetableError(this.message);
}

class TimetableStructureNotFound extends StudentTimetableState {}
