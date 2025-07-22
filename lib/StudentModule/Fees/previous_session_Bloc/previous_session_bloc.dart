import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Fees/previous_session_Bloc/previous_session_event.dart';
import 'package:untitled/StudentModule/Fees/previous_session_Bloc/previous_session_state.dart';

import '../../../StudentAPIs/Fees/fees_Stats.dart';

class PreviousSessionBloc extends Bloc<PreviousSessionEvent, PreviousSessionState> {
  final FeesStatsApi _apiObj = FeesStatsApi();

  PreviousSessionBloc() : super(PreviousSessionInitial()) {
    on<LoadPreviousSessionData>(_onLoadPreviousSessionData);
    on<RefreshPreviousSessionData>(_onRefreshPreviousSessionData);
  }

  Future<void> _onLoadPreviousSessionData(LoadPreviousSessionData event, Emitter<PreviousSessionState> emit) async {
    print('[PreviousSessionBloc] Loading previous session data for email: ${event.email}');
    emit(PreviousSessionLoading());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      print('[PreviousSessionBloc] API Call - Fetching previous session details');
      final details = await _apiObj.fetchPreviousSession(accessToken, event.email);

      print('[PreviousSessionBloc] Previous session data loaded successfully');
      emit(PreviousSessionLoaded(details));

    } catch (e) {
      print('[PreviousSessionBloc] Error loading previous session data: $e');
      emit(PreviousSessionError(e.toString()));
    }
  }

  Future<void> _onRefreshPreviousSessionData(RefreshPreviousSessionData event, Emitter<PreviousSessionState> emit) async {
    print('[PreviousSessionBloc] Refreshing previous session data');
    add(LoadPreviousSessionData(event.email));
  }
}
