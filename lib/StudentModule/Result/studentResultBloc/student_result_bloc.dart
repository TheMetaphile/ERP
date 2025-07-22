import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Result/studentResultBloc/student_result_event.dart';
import 'package:untitled/StudentModule/Result/studentResultBloc/student_result_state.dart';

import '../../../StudentAPIs/StudentModuleAPI/Result/result_API.dart';


class ReportCardBloc extends Bloc<ReportCardEvent, ReportCardState> {
  final ResultApi _resultApi;

  ReportCardBloc({ResultApi? resultApi})
      : _resultApi = resultApi ?? ResultApi(),
        super(ReportCardInitial()) {
    on<LoadReportCardData>(_onLoadReportCardData);
    on<ChangeTermSelection>(_onChangeTermSelection);
    on<RefreshReportCardData>(_onRefreshReportCardData);
  }

  Future<void> _onLoadReportCardData(
      LoadReportCardData event,
      Emitter<ReportCardState> emit,
      ) async {
    print('📱 [ReportCard-BLoC] LoadReportCardData event triggered');
    print('📧 Email: ${event.email}');
    print('📝 Selected Term: ${event.selectedTerm ?? "Term 1"}');

    emit(ReportCardLoading());

    try {
      print('🔄 [API Call] Starting initial data fetch...');
      final resultData = await _fetchResultData(event.email);
      print('✅ [API Call] Initial data fetch completed successfully');

      emit(ReportCardLoaded(
        selectedTerm: event.selectedTerm ?? "Term 1",
        finalTerm: resultData["final"] ?? [],
        finalCoScholastic: resultData["final_Co_scholastic"] ?? [],
        halfYearly: resultData["halfYearly"] ?? [],
        halfYearlyCoScholastic: resultData["halfYearly_Co_scholastic"] ?? [],
        term1: resultData["term1"] ?? [],
        term1CoScholastic: resultData["term1_Co_scholastic"] ?? [],
        term2: resultData["term2"] ?? [],
        term2CoScholastic: resultData["term2_Co_scholastic"] ?? [],
      ));
    } catch (e) {
      print('❌ [API Call] Initial data fetch failed: $e');
      emit(ReportCardError(
        message: e.toString(),
        selectedTerm: event.selectedTerm ?? "Term 1",
      ));
    }
  }

  void _onChangeTermSelection(
      ChangeTermSelection event,
      Emitter<ReportCardState> emit,
      ) {
    print('🔄 [ReportCard-BLoC] ChangeTermSelection event triggered');
    print('📝 New Selected Term: ${event.selectedTerm}');
    print('🚫 [No API Call] Using cached data for term selection');

    if (state is ReportCardLoaded) {
      final currentState = state as ReportCardLoaded;
      print('✅ [State] Term changed from ${currentState.selectedTerm} to ${event.selectedTerm}');
      emit(currentState.copyWith(selectedTerm: event.selectedTerm));
    } else if (state is ReportCardError) {
      final currentState = state as ReportCardError;
      print('⚠️ [State] Term changed in error state to ${event.selectedTerm}');
      emit(ReportCardError(
        message: currentState.message,
        selectedTerm: event.selectedTerm,
      ));
    }
  }

  Future<void> _onRefreshReportCardData(
      RefreshReportCardData event,
      Emitter<ReportCardState> emit,
      ) async {
    print('🔄 [ReportCard-BLoC] RefreshReportCardData event triggered');
    print('📧 Email: ${event.email}');
    print('📝 Selected Term: ${event.selectedTerm}');

    // Show refreshing state with cached data if available
    if (state is ReportCardLoaded) {
      final currentState = state as ReportCardLoaded;
      print('💾 [Cache] Using cached data during refresh');
      emit(ReportCardRefreshing(
        selectedTerm: event.selectedTerm,
        cachedData: currentState.allData,
      ));
    } else {
      print('⚠️ [No Cache] No cached data available, showing loading');
      emit(ReportCardLoading());
    }

    try {
      print('🔄 [API Call] Starting refresh data fetch...');
      final resultData = await _fetchResultData(event.email);
      print('✅ [API Call] Refresh data fetch completed successfully');

      emit(ReportCardLoaded(
        selectedTerm: event.selectedTerm,
        finalTerm: resultData["final"] ?? [],
        finalCoScholastic: resultData["final_Co_scholastic"] ?? [],
        halfYearly: resultData["halfYearly"] ?? [],
        halfYearlyCoScholastic: resultData["halfYearly_Co_scholastic"] ?? [],
        term1: resultData["term1"] ?? [],
        term1CoScholastic: resultData["term1_Co_scholastic"] ?? [],
        term2: resultData["term2"] ?? [],
        term2CoScholastic: resultData["term2_Co_scholastic"] ?? [],
      ));
    } catch (e) {
      print('❌ [API Call] Refresh data fetch failed: $e');
      emit(ReportCardError(
        message: e.toString(),
        selectedTerm: event.selectedTerm,
      ));
    }
  }

  Future<Map<String, dynamic>> _fetchResultData(String email) async {
    final startTime = DateTime.now();
    print('🚀 [API] Starting fetchResult API call');
    print('📧 [API] Email parameter: $email');

    try {
      print('🔑 [API] Getting access token from SharedPreferences...');
      final pref = await SharedPreferences.getInstance();
      final accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        print('❌ [API] Access token not found in SharedPreferences');
        throw Exception("Access token not found. Please login again.");
      }

      print('✅ [API] Access token retrieved successfully');
      print('📡 [API] Calling ResultApi.fetchResult with token and email...');

      final result = await _resultApi.fetchResult(accessToken, email);

      final endTime = DateTime.now();
      final duration = endTime.difference(startTime);
      print('✅ [API] fetchResult completed successfully');
      print('⏱️ [API] Call duration: ${duration.inMilliseconds}ms');

      // Log the data structure received
      print('📊 [API Response] Data keys: ${result.keys.toList()}');
      result.forEach((key, value) {
        if (value is List) {
          print('📊 [API Response] $key: ${value.length} items');
        }
      });

      return result;
    } catch (e) {
      final endTime = DateTime.now();
      final duration = endTime.difference(startTime);
      print('❌ [API] fetchResult failed after ${duration.inMilliseconds}ms');
      print('❌ [API] Error details: $e');

      // Re-throw with more specific error message if needed
      if (e.toString().contains("token")) {
        print('🔐 [API] Token-related error detected');
        throw Exception("Authentication failed. Please login again.");
      } else if (e.toString().contains("network") || e.toString().contains("connection")) {
        print('🌐 [API] Network-related error detected');
        throw Exception("Network error. Please check your internet connection.");
      } else {
        print('🔧 [API] Generic error detected');
        throw Exception("Failed to load report card data: ${e.toString()}");
      }
    }
  }

  @override
  void onTransition(Transition<ReportCardEvent, ReportCardState> transition) {
    super.onTransition(transition);
    print('🔄 [BLoC Transition] ${transition.currentState.runtimeType} -> ${transition.nextState.runtimeType}');
    print('📝 [BLoC Event] ${transition.event.runtimeType}');
  }



  @override
  Future<void> close() {
    print('🔚 [BLoC] ReportCardBloc is being disposed');
    return super.close();
  }
}
