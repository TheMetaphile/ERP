import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../StudentAPIs/StudentModuleAPI/Attendance/student_Attendance_API.dart';
import 'sudent_attendance_event.dart';
import 'sudent_attendance_state.dart';

class AttendanceBloc extends Bloc<AttendanceEvent, AttendanceState> {
  final AttendanceApi apiObj;
  final Map<String, Map<String, dynamic>> _attendanceCache = {};
  int _currentMonthIndex = DateTime.now().month - 1;
  String _currentYear = DateTime.now().year.toString();

  AttendanceBloc({required this.apiObj})
      : super(AttendanceInitial(
    selectedMonthIndex: DateTime.now().month - 1,
    selectedYear: DateTime.now().year.toString(),
  )) {
    on<ChangeMonthYear>(_onChangeMonthYear);
    on<FetchAttendance>(_onFetchAttendance);
    on<RefreshAttendance>(_onRefreshAttendance);
  }

  Future<void> _onChangeMonthYear(ChangeMonthYear event, Emitter<AttendanceState> emit) async {
    _currentMonthIndex = event.selectedMonthIndex;
    _currentYear = event.selectedYear;
    final cacheKey = '${event.selectedYear}-${event.selectedMonthIndex + 1}';

    // Check if data is already cached
    if (_attendanceCache.containsKey(cacheKey)) {
      print('Using cached data for $cacheKey');
      emit(AttendanceLoaded(
        attendanceData: _attendanceCache[cacheKey]!,
        selectedMonthIndex: event.selectedMonthIndex,
        selectedYear: event.selectedYear,
      ));
      return;
    }

    // If not cached, trigger fetch event
    emit(AttendanceLoading(
      selectedMonthIndex: event.selectedMonthIndex,
      selectedYear: event.selectedYear,
    ));
    add(FetchAttendance(event.selectedMonthIndex, event.selectedYear));
  }

  Future<void> _onFetchAttendance(FetchAttendance event, Emitter<AttendanceState> emit) async {
    final cacheKey = '${event.selectedYear}-${event.selectedMonthIndex + 1}';
    print('Making network call for $cacheKey');

    try {
      final SharedPreferences pref = await SharedPreferences.getInstance();
      final String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        emit(AttendanceError(
          message: 'Access token is null',
          selectedMonthIndex: event.selectedMonthIndex,
          selectedYear: event.selectedYear,
        ));
        return;
      }

      final data = await apiObj.fetchAttendance(
        accessToken,
        event.selectedMonthIndex + 1,
        event.selectedYear,
      );

      // Cache the fetched data
      _attendanceCache[cacheKey] = data;

      emit(AttendanceLoaded(
        attendanceData: data,
        selectedMonthIndex: event.selectedMonthIndex,
        selectedYear: event.selectedYear,
      ));
    } catch (e) {
      emit(AttendanceError(
        message: e.toString(),
        selectedMonthIndex: event.selectedMonthIndex,
        selectedYear: event.selectedYear,
      ));
    }
  }

  Future<void> _onRefreshAttendance(RefreshAttendance event, Emitter<AttendanceState> emit) async {
    // Clear cache for the specific month/year and fetch fresh data
    final cacheKey = '${event.selectedYear}-${event.selectedMonthIndex + 1}';
    _attendanceCache.remove(cacheKey);
    emit(AttendanceLoading(
      selectedMonthIndex: event.selectedMonthIndex,
      selectedYear: event.selectedYear,
    ));
    add(FetchAttendance(event.selectedMonthIndex, event.selectedYear));
  }
}