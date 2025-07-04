class StudentHomeState {
  final int selectedIndex;
  final Map<String, dynamic> userDetails;
  final bool isLoading;
  final String? error;

  StudentHomeState({
    this.selectedIndex = 0,
    this.userDetails = const {},
    this.isLoading = false,
    this.error,
  });

  StudentHomeState copyWith({
    int? selectedIndex,
    Map<String, dynamic>? userDetails,
    bool? isLoading,
    String? error,
  }) {
    return StudentHomeState(
      selectedIndex: selectedIndex ?? this.selectedIndex,
      userDetails: userDetails ?? this.userDetails,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}