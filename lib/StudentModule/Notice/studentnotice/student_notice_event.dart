abstract class StudentNoticeEvent {}

class FetchNotices extends StudentNoticeEvent {
  final bool isRetry;
    FetchNotices({this.isRetry = false});
}

class FetchMoreNotices extends StudentNoticeEvent {}

class RefreshNotices extends StudentNoticeEvent {}