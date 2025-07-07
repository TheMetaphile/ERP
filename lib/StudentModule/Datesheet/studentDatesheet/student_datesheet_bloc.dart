import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Datesheet/studentDatesheet/student_datesheet_event.dart';
import 'package:untitled/StudentModule/Datesheet/studentDatesheet/student_datesheet_state.dart';

import '../../../StudentAPIs/StudentModuleAPI/DateSheet/date_sheet.dart';



class DateSheetBloc extends Bloc<DateSheetEvent, DateSheetState> {
  final DateSheetApi apiObj = DateSheetApi();

  DateSheetBloc() : super(DateSheetInitial()) {
    on<FetchDateSheet>(_onFetchDateSheet);
    on<RefreshDateSheet>(_onRefreshDateSheet);
  }

  Future<void> _onFetchDateSheet(FetchDateSheet event, Emitter<DateSheetState> emit) async {
    emit(DateSheetLoading());
    try {
      final SharedPreferences pref = await SharedPreferences.getInstance();
      final String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        emit(const DateSheetError('Access token is null'));
        return;
      }

      final List<Map<String, dynamic>> dateSheet = (await apiObj.fetchDateSheet(accessToken, event.className))
          .cast<Map<String, dynamic>>();

      dateSheet.sort((a, b) {
        DateTime dateA = DateTime.parse(a['schedule'][0]['date']);
        DateTime dateB = DateTime.parse(b['schedule'][0]['date']);
        return dateA.compareTo(dateB);
      });

      emit(DateSheetLoaded(dateSheet));
    } catch (e) {
      emit(DateSheetError('Error fetching data: $e'));
    }
  }

  Future<void> _onRefreshDateSheet(RefreshDateSheet event, Emitter<DateSheetState> emit) async {
    await _onFetchDateSheet(FetchDateSheet(event.className), emit);
  }
}