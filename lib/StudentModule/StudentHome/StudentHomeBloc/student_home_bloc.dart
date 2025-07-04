import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:untitled/StudentAPIs/SharedPreference/sharedPreferenceFile.dart';
import 'student_home_event.dart';
import 'student_home_state.dart';

class StudentHomeBloc extends Bloc<StudentHomeEvent, StudentHomeState> {
  StudentHomeBloc() : super(StudentHomeState()) {
    on<FetchUserDetails>(_onFetchUserDetails);
    on<ChangeTab>(_onChangeTab);
  }

  Future<void> _onFetchUserDetails(FetchUserDetails event, Emitter<StudentHomeState> emit) async {
    // Check if user details are already loaded
    if (state.userDetails.isNotEmpty && !event.forceRefresh) {
      print("📦 Using cached user details - NO API CALL");
      return; // Don't make API call if data already exists
    }

    print("🔄 Loading state - API call starting...");
    emit(state.copyWith(isLoading: true));

    try {
      final userDetails = await UserPreferences.getDetails("userDetails");
      print("📡 API Call: Fetching user details...");
      emit(state.copyWith(
        userDetails: userDetails,
        isLoading: false,
        error: null,
      ));
      print("✅ User details loaded successfully");
    } catch (e) {
      print("❌ Error fetching user details: $e");
      emit(state.copyWith(
        isLoading: false,
        error: 'Failed to fetch user details: $e',
      ));
    }
  }

  void _onChangeTab(ChangeTab event, Emitter<StudentHomeState> emit) {
    emit(state.copyWith(selectedIndex: event.index));
  }
}
