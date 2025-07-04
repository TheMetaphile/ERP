abstract class StudentHomeEvent {}

class FetchUserDetails extends StudentHomeEvent {
  final bool forceRefresh;

  FetchUserDetails({this.forceRefresh = false});
}

class ChangeTab extends StudentHomeEvent {
  final int index;
  ChangeTab(this.index);
}