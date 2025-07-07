import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../StudentAPIs/StudentModuleAPI/Ask_Doubts/ask_doubtAPI.dart';
import 'ask_doubt_event.dart';
import 'ask_doubt_state.dart';

class AskDoubtBloc extends Bloc<AskDoubtEvent, AskDoubtState> {
  final AskDoubtAPI doubtObj;

  AskDoubtBloc({required this.doubtObj}) : super(const AskDoubtState()) {
    on<FetchSubjects>(_onFetchSubjects);
    on<FetchDoubts>(_onFetchDoubts);
    on<FetchMoreDoubts>(_onFetchMoreDoubts);
    on<AskNewDoubt>(_onAskNewDoubt);
    on<UpdateDoubt>(_onUpdateDoubt);
    on<DeleteDoubt>(_onDeleteDoubt);
  }

  Future<void> _onFetchSubjects(FetchSubjects event, Emitter<AskDoubtState> emit) async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      List<String>? subjects = pref.getStringList("subjects");
      emit(state.copyWith(subjectOptions: subjects));
    } catch (e) {
      emit(state.copyWith(errorMessage: "Error fetching subjects: $e"));
    }
  }

  Future<void> _onFetchDoubts(FetchDoubts event, Emitter<AskDoubtState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      List<dynamic> fetchedDoubts = await doubtObj.fetchDoubts(
        accessToken!,
        event.status,
        event.selectedSubject,
        event.start,
      );

      emit(state.copyWith(
        isInitial: false, // mark state as initialized
        isLoading: false,
        doubtList: fetchedDoubts,
        allDataLoaded: false,
      ));
    } catch (e) {
      emit(state.copyWith(
        isInitial: true,
        isLoading: false,
        errorMessage: "Error fetching doubts: $e",
      ));
    }
  }

  Future<void> _onFetchMoreDoubts(FetchMoreDoubts event, Emitter<AskDoubtState> emit) async {
    if (state.isLoadingMore) return;

    emit(state.copyWith(isLoadingMore: true));
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      List<dynamic> fetchedDoubts = await doubtObj.fetchDoubts(
        accessToken!,
        event.status,
        event.selectedSubject,
        event.start,
      );

      int? previousLength = state.doubtList?.length ?? 0;
      List<dynamic> updatedDoubts = List.from(state.doubtList ?? [])..addAll(fetchedDoubts);
      int? newLength = updatedDoubts.length;
      bool allDataLoaded = newLength == previousLength;

      emit(state.copyWith(
        isLoadingMore: false,
        doubtList: updatedDoubts,
        allDataLoaded: allDataLoaded,
      ));
    } catch (e) {
      emit(state.copyWith(
        isLoadingMore: false,
        errorMessage: "Error fetching more doubts: $e",
      ));
    }
  }

  Future<void> _onAskNewDoubt(AskNewDoubt event, Emitter<AskDoubtState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      var newDoubt = await doubtObj.askDoubts(accessToken!, event.question, event.subject);
      if (newDoubt != null) {
        List<dynamic> updatedDoubts = [newDoubt, ...?state.doubtList];
        emit(state.copyWith(
          isLoading: false,
          doubtList: updatedDoubts,
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        errorMessage: "Error asking doubt: $e",
      ));
    }
  }

  Future<void> _onUpdateDoubt(UpdateDoubt event, Emitter<AskDoubtState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      bool success = await doubtObj.updateDoubt(
        accessToken!,
        event.doubtId,
        event.updatedDoubt,
        event.currentClass,
      );
      if (success) {
        List<dynamic> updatedDoubts = List.from(state.doubtList ?? []);
        int index = updatedDoubts.indexWhere((doubt) => doubt['_id'] == event.doubtId);
        if (index != -1) {
          updatedDoubts[index] = {
            ...updatedDoubts[index],
            'question': event.updatedDoubt['question'] ?? updatedDoubts[index]['question'],
            'subject': event.updatedDoubt['subject'] ?? updatedDoubts[index]['subject'],
          };
        }
        emit(state.copyWith(
          isLoading: false,
          doubtList: updatedDoubts,
        ));
      } else {
        emit(state.copyWith(
          isLoading: false,
          errorMessage: "Failed to update doubt",
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        errorMessage: "Error updating doubt: $e",
      ));
    }
  }

  Future<void> _onDeleteDoubt(DeleteDoubt event, Emitter<AskDoubtState> emit) async {
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");
      bool success = await doubtObj.deleteDoubt(accessToken!, event.doubtId, event.currentClass);
      if (success) {
        List<dynamic> updatedDoubts = List.from(state.doubtList ?? [])
          ..removeWhere((doubt) => doubt['_id'] == event.doubtId);
        emit(state.copyWith(
          doubtList: updatedDoubts,
        ));
      } else {
        emit(state.copyWith(
          errorMessage: "Failed to delete doubt",
        ));
      }
    } catch (e) {
      emit(state.copyWith(
        errorMessage: "Error deleting doubt: $e",
      ));
    }
  }
}
