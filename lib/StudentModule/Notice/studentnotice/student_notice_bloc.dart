import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/StudentModule/Notice/studentnotice/student_notice_event.dart';
import 'package:untitled/StudentModule/Notice/studentnotice/student_notice_state.dart';

import '../../../StudentAPIs/StudentModuleAPI/Notice/notice_API.dart';

class StudentNoticeBloc extends Bloc<StudentNoticeEvent, StudentNoticeState> {
  final NoticeBoardAPI noticeBoardAPI;
  int start = 0;

  StudentNoticeBloc({required this.noticeBoardAPI}) : super(const StudentNoticeInitial()) {
    on<FetchNotices>(_onFetchNotices);
    on<FetchMoreNotices>(_onFetchMoreNotices);
    on<RefreshNotices>(_onRefreshNotices);

    add(FetchNotices(isRetry: false)); // Dispatch fetch automatically
  }


  Future<void> _onFetchNotices(FetchNotices event, Emitter<StudentNoticeState> emit) async {
    print('Handling FetchNotices event');
    emit(const StudentNoticeLoading());

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }

      // ✅ RESET PAGINATION START
      start = 0;

      List<dynamic> data = await noticeBoardAPI.fetchNoticeBoard(accessToken, start);
      if (data.isEmpty && !event.isRetry) {
        data = await noticeBoardAPI.fetchNoticeBoard(accessToken, start);
      }

      start = data.length;
      emit(StudentNoticeLoaded(notices: data, hasReachedMax: data.isEmpty));
    } catch (e) {
      emit(StudentNoticeError(message: 'Failed to load notices: $e'));
    }
  }


  Future<void> _onFetchMoreNotices(FetchMoreNotices event, Emitter<StudentNoticeState> emit) async {
    if (state is StudentNoticeLoaded && (state as StudentNoticeLoaded).hasReachedMax) {
      print('No more notices to fetch (hasReachedMax)');
      return;
    }

    final currentNotices = (state as StudentNoticeLoaded).notices;
    emit(StudentNoticeLoadingMore(notices: currentNotices));
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      print('Fetching more notices with accessToken: $accessToken, start: $start');

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data = await noticeBoardAPI.fetchNoticeBoard(accessToken, start);
      print('Fetched ${data.length} more notices: $data');
      start += data.length; // Increment start for pagination
      emit(StudentNoticeLoaded(
        notices: [...currentNotices, ...data],
        hasReachedMax: data.isEmpty,
      ));
    } catch (e) {
      print('Error fetching more notices: $e');
      emit(StudentNoticeError(message: 'Failed to load more notices: $e'));
    }
  }

  Future<void> _onRefreshNotices(RefreshNotices event, Emitter<StudentNoticeState> emit) async {
    start = 0; // Reset pagination
    print('Handling RefreshNotices event');
    add( FetchNotices(isRetry: false)); // Trigger FetchNotices
  }
}