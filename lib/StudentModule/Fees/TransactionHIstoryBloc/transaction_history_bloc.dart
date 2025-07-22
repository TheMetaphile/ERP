import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Fees/TransactionHIstoryBloc/transaction_history_event.dart';
import 'package:untitled/StudentModule/Fees/TransactionHIstoryBloc/transaction_history_state.dart';

import '../../../StudentAPIs/Fees/fees_Stats.dart';


class TransactionBloc extends Bloc<TransactionEvent, TransactionState> {
  final FeesStatsApi _apiObj = FeesStatsApi();

  TransactionBloc() : super(TransactionInitial()) {
    on<LoadTransactionData>(_onLoadTransactionData);
    on<RefreshTransactionData>(_onRefreshTransactionData);
  }

  Future<void> _onLoadTransactionData(LoadTransactionData event, Emitter<TransactionState> emit) async {
    print('[TransactionBloc] Loading transaction data');
    emit(TransactionLoading());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      print('[TransactionBloc] API Call - Fetching transaction details');
      final details = await _apiObj.fetchTransactionDetails(accessToken);

      print('[TransactionBloc] Transaction data loaded successfully');
      emit(TransactionLoaded(details));

    } catch (e) {
      print('[TransactionBloc] Error loading transaction data: $e');
      emit(TransactionError(e.toString()));
    }
  }

  Future<void> _onRefreshTransactionData(RefreshTransactionData event, Emitter<TransactionState> emit) async {
    print('[TransactionBloc] Refreshing transaction data');
    add(LoadTransactionData());
  }
}
