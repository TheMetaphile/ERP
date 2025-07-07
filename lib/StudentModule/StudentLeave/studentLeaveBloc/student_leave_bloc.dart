import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../StudentAPIs/StudentModuleAPI/StudentLeave/studentLeaveApi.dart';
import 'student_leave_event.dart';
import 'student_leave_state.dart';

class StudentLeaveBloc extends Bloc<StudentLeaveEvent, StudentLeaveState> {
   StudentLeaveApi leaveApi= StudentLeaveApi();

  StudentLeaveBloc({required this.leaveApi}) : super(const StudentLeaveState()) {
    on<FetchLeaves>(_onFetchLeaves);
    on<LoadMoreLeaves>(_onLoadMoreLeaves);
    on<ApplyLeave>(_onApplyLeave);
    on<UpdateLeave>(_onUpdateLeave);
    on<DeleteLeave>(_onDeleteLeave);
    on<LoadStats>(_onLoadStats);
  }

  Future<void> _onFetchLeaves(FetchLeaves event, Emitter<StudentLeaveState> emit) async {
    emit(state.copyWith(isLoading: true, start: 0, status: event.status, allDataLoaded: false));
    try {
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken") ?? "";
      final fetchedLeaves = await leaveApi.studentLeaveData(accessToken, 0, event.status);
      emit(state.copyWith(
        leaves: fetchedLeaves,
        isLoading: false,
        errorMessage: null,
      ));
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        errorMessage: 'Error fetching leave data: $e',
      ));
    }
  }

  Future<void> _onLoadMoreLeaves(LoadMoreLeaves event, Emitter<StudentLeaveState> emit) async {
    if (state.isLoadingMore || state.allDataLoaded) return;
    emit(state.copyWith(isLoadingMore: true));
    try {
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken") ?? "";
      final newStart = state.start + (state.leaves?.length ?? 0);
      final fetchedLeaves = await leaveApi.studentLeaveData(accessToken, newStart, state.status);
      final previousLength = state.leaves?.length ?? 0;
      final updatedLeaves = [...?state.leaves, ...fetchedLeaves];
      final allDataLoaded = updatedLeaves.length == previousLength;

      emit(state.copyWith(
        leaves: updatedLeaves,
        isLoadingMore: false,
        start: newStart,
        allDataLoaded: allDataLoaded,
        errorMessage: null,
      ));
    } catch (e) {
      emit(state.copyWith(
        isLoadingMore: false,
        errorMessage: 'Error fetching more leave data: $e',
      ));
    }
  }

  Future<void> _onApplyLeave(ApplyLeave event, Emitter<StudentLeaveState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken") ?? "";
      final newLeave = await leaveApi.studentLeaveApply(
        accessToken,
        event.startDate,
        event.endDate,
        event.reason,
      );
      if (newLeave != null) {
        final updatedLeaves = [newLeave, ...?state.leaves];
        emit(state.copyWith(
          leaves: updatedLeaves,
          isLoading: false,
          errorMessage: null,
        ));
      } else {
        emit(state.copyWith(
          isLoading: false,
          errorMessage: 'Failed to apply leave',
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        errorMessage: 'Error applying leave: $e',
      ));
    }
  }

  Future<void> _onUpdateLeave(UpdateLeave event, Emitter<StudentLeaveState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken") ?? "";
      final updatedLeave = {
        "_id": event.leaveId,
        "startDate": event.startDate,
        "endDate": event.endDate,
        "reason": event.reason,
      };
      final success = await leaveApi.updateLeave(accessToken, event.leaveId, updatedLeave);
      if (success) {
        emit(state.copyWith(
          isLoading: false,
          errorMessage: null,
        ));
        add(FetchLeaves(status: state.status)); // Refresh leaves after update
      } else {
        emit(state.copyWith(
          isLoading: false,
          errorMessage: 'Failed to update leave',
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        errorMessage: 'Error updating leave: $e',
      ));
    }
  }

  Future<void> _onDeleteLeave(DeleteLeave event, Emitter<StudentLeaveState> emit) async {
    try {
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken") ?? "";
      final success = await leaveApi.deleteLeave(accessToken, event.leaveId);
      if (success) {
        final updatedLeaves = state.leaves?.where((leave) => leave['_id'] != event.leaveId).toList();
        emit(state.copyWith(
          leaves: updatedLeaves,
          errorMessage: null,
        ));
      } else {
        emit(state.copyWith(
          errorMessage: 'Failed to delete leave',
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        errorMessage: 'Error deleting leave: $e',
      ));
    }
  }

  Future<void> _onLoadStats(LoadStats event, Emitter<StudentLeaveState> emit) async {
    try {
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken") ?? "";
      final stats = await leaveApi.getStats(accessToken);
      if (stats is Map) {
        emit(state.copyWith(
          stats: stats.cast<String, dynamic>(),
          errorMessage: null,
        ));
      } else {
        emit(state.copyWith(
          errorMessage: 'Failed to load stats',
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        errorMessage: 'Error loading stats: $e',
      ));
    }
  }
}