import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/student.dart';

class StudentService {
  static const String _studentsKey = 'students';

  // Get all students from storage
  Future<List<Student>> getStudents() async {
    final prefs = await SharedPreferences.getInstance();
    final studentsJson = prefs.getString(_studentsKey);
    
    if (studentsJson == null) {
      return [];
    }
    
    final List<dynamic> jsonList = jsonDecode(studentsJson);
    return jsonList.map((json) => Student.fromJson(json)).toList();
  }

  // Save students to storage
  Future<void> saveStudents(List<Student> students) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonList = students.map((student) => student.toJson()).toList();
    await prefs.setString(_studentsKey, jsonEncode(jsonList));
  }

  // Add a new student
  Future<void> addStudent(Student student) async {
    final students = await getStudents();
    students.add(student);
    await saveStudents(students);
  }

  // Update an existing student
  Future<void> updateStudent(int index, Student student) async {
    final students = await getStudents();
    if (index >= 0 && index < students.length) {
      students[index] = student;
      await saveStudents(students);
    }
  }

  // Delete a student
  Future<void> deleteStudent(int index) async {
    final students = await getStudents();
    if (index >= 0 && index < students.length) {
      students.removeAt(index);
      await saveStudents(students);
    }
  }
}