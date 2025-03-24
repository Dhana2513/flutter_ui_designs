class Student {
  final String name;
  final int marathi;
  final int hindi;
  final int english;
  final int science;
  final int history;

  Student({
    required this.name,
    required this.marathi,
    required this.hindi,
    required this.english,
    required this.science,
    required this.history,
  });

  // Calculate percentage for a student
  double calculatePercentage() {
    final totalMarks = marathi + hindi + english + science + history;
    return (totalMarks / 500 * 100);
  }

  // Convert to and from JSON for storage
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'marathi': marathi,
      'hindi': hindi,
      'english': english,
      'science': science,
      'history': history,
    };
  }

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      name: json['name'],
      marathi: json['marathi'],
      hindi: json['hindi'],
      english: json['english'],
      science: json['science'],
      history: json['history'],
    );
  }
}