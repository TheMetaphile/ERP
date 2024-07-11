// File: lib/APIs/TimetableApi/timetable_api.dart

import 'dart:convert';
import 'package:http/http.dart' as http;

class Lecture {
  final String subject;
  final String teacher;
  final int lectureNo;
  final String id;

  Lecture({
    required this.subject,
    required this.teacher,
    required this.lectureNo,
    required this.id,
  });

  factory Lecture.fromJson(Map<String, dynamic> json) {
    return Lecture(
      subject: json['subject'],
      teacher: json['teacher'],
      lectureNo: json['lectureNo'],
      id: json['_id'],
    );
  }
}

class Timetable {
  final List<Lecture> monday;
  final List<Lecture> tuesday;
  final List<Lecture> wednesday;
  final List<Lecture> friday;
  final List<Lecture> saturday;
  final List<Lecture> sunday;
  final List<Lecture> thrusday;

  Timetable({
    required this.monday,
    required this.tuesday,
    required this.wednesday,
    required this.friday,
    required this.saturday,
    required this.sunday,
    required this.thrusday,
  });

  factory Timetable.fromJson(Map<String, dynamic> json) {
    return Timetable(
      monday: (json['monday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
      tuesday: (json['tuesday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
      wednesday: (json['wednesday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
      friday: (json['friday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
      saturday: (json['saturday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
      sunday: (json['sunday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
      thrusday: (json['thrusday'] as List).map((lectureJson) => Lecture.fromJson(lectureJson)).toList(),
    );
  }
}
class TimetableStructure {
  final String durationOfEachLecture;
  final String durationOfLunch;
  final String firstLectureTiming;
  final int numberOfLecturesBeforeLunch;
  final int numberOfLectures;

  TimetableStructure({
    required this.durationOfEachLecture,
    required this.durationOfLunch,
    required this.firstLectureTiming,
    required this.numberOfLecturesBeforeLunch,
    required this.numberOfLectures,
  });

  factory TimetableStructure.fromJson(Map<String, dynamic> json) {
    return TimetableStructure(
      durationOfEachLecture: json['durationOfEachLeacture'],
      durationOfLunch: json['durationOfLunch'],
      firstLectureTiming: json['firstLectureTiming'],
      numberOfLecturesBeforeLunch: json['numberOfLeacturesBeforeLunch'],
      numberOfLectures: json['numberOfLecture'],
    );
  }
}
class TimetableApi {
  static const String baseUrl = 'http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:';

  Future<Timetable> fetchClassTeacherTimetable(String accessToken) async {
    final url = Uri.parse('http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8010/timetable/fetch/classTeacher');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'accessToken': accessToken,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final timetable = Timetable.fromJson(data['timetable']);
        return timetable;
      } else {
        throw Exception('Failed to fetch timetable (${response.statusCode})');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  Future<TimetableStructure> fetchTimetableStructure(String accessToken) async {
    try {
      final response = await http.post(
        Uri.parse('http://ec2-13-127-187-81.ap-south-1.compute.amazonaws.com:8015/timeTableStructure/fetch'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'accessToken': accessToken,
          'classRange': '1st-12th',
        }),
      );

      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);
        print('Timetable structure response: $jsonData'); // Add this line for debugging
        return TimetableStructure.fromJson(jsonData);
      } else {
        print('Failed to load timetable structure. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
        throw Exception('Failed to load timetable structure. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching timetable structure: $e');
      throw Exception('Failed to load timetable structure: $e');
    }
  }
}