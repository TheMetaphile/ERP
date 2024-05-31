class Teacher {
  final String name;
  final String employeeId;
  final String profileLink;

  Teacher({
    required this.name,
    required this.employeeId,
    required this.profileLink,
  });

  factory Teacher.fromJson(Map<String, dynamic> json) {
    return Teacher(
      name: json['name'],
      employeeId: json['employeeId'],
      profileLink: json['profileLink'],
    );
  }
}