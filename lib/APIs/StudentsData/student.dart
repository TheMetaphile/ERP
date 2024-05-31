class Student{
  final String name;
  final String email;
   final String profileLink;
  final String currentClass;
  final String section;
  final String fatherPhoneNumber;
  final String rollNumber;
Student({
    required this.name,
    required this.email,
    required this.profileLink,
    required this.currentClass,
    required this.section,
    required this.fatherPhoneNumber,
    required this.rollNumber,
});

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      name: json['name'],
      email: json['email'],
      profileLink: json['profileLink'],
      currentClass: json['currentClass'],
      section: json['section'],
      fatherPhoneNumber: json['fatherPhoneNumber'],
      rollNumber:  json['rollNumber'] ??'',
    );
  }
}