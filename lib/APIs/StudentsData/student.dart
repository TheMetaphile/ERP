class Student{
  final String name;
  final String email;
   final String profileLink;
  final String currentClass;
  final String section;
  final String fatherPhoneNumber;
  final String rollNumber;
  final bool leave;
  String selectedAttendance;
  String dob;
  String bloodGroup;
  String contactNo;
  String fatherName;
  String motherName;
Student({
    required this.name,
    required this.email,
    required this.profileLink,
    required this.currentClass,
    required this.section,
    required this.fatherPhoneNumber,
    required this.fatherName,
    required this.rollNumber,
  required this.leave,
  this.selectedAttendance = '',
  required this.dob,
  required this.bloodGroup,
  required this.motherName,
  required this.contactNo,
});

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      profileLink: json['profileLink'] ?? '',
      currentClass: json['currentClass'] ?? '',
      section: json['section'] ?? '',
      fatherPhoneNumber: json['fatherPhoneNumber'] ?? '',
      rollNumber: json['rollNumber']?.toString() ?? '',
      leave: json['leave'] ?? false,
      dob:  json['dob'] ?? "",
      bloodGroup:  json['bloodGroup'] ?? "",
      contactNo:  json['contactNo'] ?? "",
      fatherName: json['fatherName'] ?? "",
      motherName: json['motherName'] ?? "",
    );
  }
  void updateAttendance(String attendance) {
    selectedAttendance = attendance;
  }
}
