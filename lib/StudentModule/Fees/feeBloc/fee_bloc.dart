import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Fees/feeBloc/fee_event.dart';
import 'package:untitled/StudentModule/Fees/feeBloc/fee_state.dart';

import '../../../StudentAPIs/Fees/fees_Stats.dart';


class FeesBloc extends Bloc<FeesEvent, FeesState> {
  final FeesStatsApi _apiObj = FeesStatsApi();

  FeesBloc() : super(FeesInitial()) {
    on<LoadFeesData>(_onLoadFeesData);
    on<RefreshFeesData>(_onRefreshFeesData);
    on<ChangeFeesStatus>(_onChangeFeesStatus);
    on<ProcessPayment>(_onProcessPayment);
  }

  Future<void> _onLoadFeesData(LoadFeesData event, Emitter<FeesState> emit) async {
    print('[FeesBloc] Loading fees data for email: ${event.email}');
    emit(FeesLoading());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      print('[FeesBloc] API Call - Fetching payment details');
      final paymentDetails = await _apiObj.fetchPaymentDetails(accessToken);

      print('[FeesBloc] API Call - Fetching fee stats');
      final feeStats = await _apiObj.fetchStats(accessToken);

      print('[FeesBloc] Data loaded successfully');
      emit(FeesLoaded(
        feeStats: feeStats,
        monthlyStatus: paymentDetails["monthlyStatus"],
        quarterlyStatus: paymentDetails["quarterlyStatus"],
      ));

    } catch (e) {
      print('[FeesBloc] Error loading fees data: $e');
      emit(FeesError(e.toString()));
    }
  }

  Future<void> _onRefreshFeesData(RefreshFeesData event, Emitter<FeesState> emit) async {
    print('[FeesBloc] Refreshing fees data');
    add(LoadFeesData(event.email));
  }

  void _onChangeFeesStatus(ChangeFeesStatus event, Emitter<FeesState> emit) {
    print('[FeesBloc] Changing fees status to: ${event.status}');
    if (state is FeesLoaded) {
      final currentState = state as FeesLoaded;
      emit(currentState.copyWith(selectedStatus: event.status));
    }
  }

  Future<void> _onProcessPayment(ProcessPayment event, Emitter<FeesState> emit) async {
    print('[FeesBloc] Processing payment for amount: ${event.amount}');

    if (state is! FeesLoaded) return;

    final currentState = state as FeesLoaded;
    emit(PaymentProcessing());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      print('[FeesBloc] API Call - Processing payment');
      final response = await _apiObj.Fees(
          accessToken!,
          event.email,
          event.amount,
          "Success",
          "",
          "payment_id",
          "Online",
          false,
          "",
          event.orderId
      );

      if (response == true) {
        print('[FeesBloc] Payment successful');

        // Update the status in the current data
        List<dynamic>? updatedMonthly = currentState.monthlyStatus;
        List<dynamic>? updatedQuarterly = currentState.quarterlyStatus;

        if (currentState.selectedStatus == "Monthly" && updatedMonthly != null) {
          updatedMonthly[event.index]["status"] = "Submitted";
        } else if (updatedQuarterly != null) {
          updatedQuarterly[event.index]["status"] = "Submitted";
        }

        emit(PaymentSuccess("Payment Successful"));
        emit(currentState.copyWith(
          monthlyStatus: updatedMonthly,
          quarterlyStatus: updatedQuarterly,
        ));

      } else {
        print('[FeesBloc] Payment failed');
        emit(PaymentError("Payment Failed"));
        emit(currentState);
      }

    } catch (e) {
      print('[FeesBloc] Error processing payment: $e');
      emit(PaymentError(e.toString()));
      emit(currentState);
    }
  }
}
