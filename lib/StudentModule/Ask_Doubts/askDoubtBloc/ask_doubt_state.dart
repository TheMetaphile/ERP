import 'package:equatable/equatable.dart';

class AskDoubtState extends Equatable {
  final bool isInitial;
  final bool isLoading;
  final bool isLoadingMore;
  final bool allDataLoaded;
  final List<String>? subjectOptions;
  final List<dynamic>? doubtList;
  final String? errorMessage;

  const AskDoubtState({
    this.isInitial = true,
    this.isLoading = false,
    this.isLoadingMore = false,
    this.allDataLoaded = false,
    this.subjectOptions,
    this.doubtList,
    this.errorMessage,
  });

  AskDoubtState copyWith({
    bool? isInitial,
    bool? isLoading,
    bool? isLoadingMore,
    bool? allDataLoaded,
    List<String>? subjectOptions,
    List<dynamic>? doubtList,
    String? errorMessage,
  }) {
    return AskDoubtState(
      isInitial: isInitial ?? this.isInitial,
      isLoading: isLoading ?? this.isLoading,
      isLoadingMore: isLoadingMore ?? this.isLoadingMore,
      allDataLoaded: allDataLoaded ?? this.allDataLoaded,
      subjectOptions: subjectOptions ?? this.subjectOptions,
      doubtList: doubtList ?? this.doubtList,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
    isInitial,
    isLoading,
    isLoadingMore,
    allDataLoaded,
    subjectOptions,
    doubtList,
    errorMessage,
  ];
}
