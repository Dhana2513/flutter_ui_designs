import 'package:flutter/material.dart';
import '../models/student.dart';
import '../services/student_service.dart';
import 'add_student_screen.dart';
import 'student_details_screen.dart';

class StudentListScreen extends StatefulWidget {
  const StudentListScreen({super.key});

  @override
  State<StudentListScreen> createState() => _StudentListScreenState();
}

class _StudentListScreenState extends State<StudentListScreen> {
  final StudentService _studentService = StudentService();
  List<Student> _students = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadStudents();
  }

  Future<void> _loadStudents() async {
    final students = await _studentService.getStudents();
    setState(() {
      _students = students;
      _sortStudentsByPercentage();
      _isLoading = false;
    });
  }

  void _sortStudentsByPercentage() {
    _students.sort((a, b) {
      final percentageA = a.calculatePercentage();
      final percentageB = b.calculatePercentage();
      return percentageB.compareTo(percentageA);
    });
  }

  Future<void> _deleteStudent(int index) async {
    await _studentService.deleteStudent(index);
    _loadStudents();
  }

  void _showDeleteConfirmation(BuildContext context, Student student, int index) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Student'),
        content: const Text(
          'Are you sure you want to delete this student? This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _deleteStudent(index);
            },
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Leaderboard'),
        centerTitle: true,
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Leaderboard header
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                  margin: const EdgeInsets.fromLTRB(15, 15, 15, 5),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(8),
                      topRight: Radius.circular(8),
                    ),
                  ),
                  child: const Row(
                    children: [
                      Expanded(flex: 1, child: Text('Rank', style: TextStyle(fontWeight: FontWeight.bold))),
                      Expanded(flex: 4, child: Text('Name', style: TextStyle(fontWeight: FontWeight.bold))),
                      Expanded(flex: 2, child: Text('Percentage', style: TextStyle(fontWeight: FontWeight.bold))),
                      SizedBox(width: 80), // Space for action buttons
                    ],
                  ),
                ),
                // Student list
                Expanded(
                  child: ListView.builder(
                    itemCount: _students.length,
                    itemBuilder: (context, index) {
                      final student = _students[index];
                      final percentage = student.calculatePercentage().toStringAsFixed(2);
                      final rank = index + 1;
                      
                      return Container(
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(color: Colors.grey.shade300),
                          ),
                        ),
                        child: ListTile(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => StudentDetailsScreen(
                                  student: student,
                                  rank: rank,
                                ),
                              ),
                            ).then((_) => _loadStudents());
                          },
                          contentPadding: const EdgeInsets.symmetric(horizontal: 15),
                          title: Row(
                            children: [
                              // Rank
                              Expanded(
                                flex: 1,
                                child: Text(
                                  '$rank',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: rank <= 3 ? Colors.blue : Colors.black87,
                                  ),
                                ),
                              ),
                              // Name
                              Expanded(
                                flex: 4,
                                child: Text(student.name),
                              ),
                              // Percentage
                              Expanded(
                                flex: 2,
                                child: Text('$percentage%'),
                              ),
                            ],
                          ),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              // Edit button
                              IconButton(
                                icon: const Icon(Icons.edit, color: Colors.blue),
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => AddStudentScreen(
                                        student: student,
                                        index: index,
                                      ),
                                    ),
                                  ).then((_) => _loadStudents());
                                },
                              ),
                              // Delete button
                              IconButton(
                                icon: const Icon(Icons.delete, color: Colors.red),
                                onPressed: () => _showDeleteConfirmation(context, student, index),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const AddStudentScreen()),
          ).then((_) => _loadStudents());
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}