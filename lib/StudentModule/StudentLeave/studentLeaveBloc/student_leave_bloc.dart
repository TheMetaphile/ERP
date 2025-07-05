import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'student_leave_event.dart';
part 'student_leave_state.dart';

class StudentLeaveBloc extends Bloc<StudentLeaveEvent, StudentLeaveState> {
  StudentLeaveBloc() : super(StudentLeaveInitial()) {
    on<StudentLeaveEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
