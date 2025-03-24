import 'package:flutter/material.dart';
import '../models/student.dart';
import '../services/student_service.dart';

class AddStudentScreen extends StatefulWidget {
  final Student? student;
  final int? index;

  const AddStudentScreen({super.key, this.student, this.index});

  @override
  State<AddStudentScreen> createState() => _AddStudentScreenState();
}

class _AddStudentScreenState extends State<AddStudentScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _marathiController = TextEditingController();
  final _hindiController = TextEditingController();
  final _englishController = TextEditingController();
  final _scienceController = TextEditingController();
  final _historyController = TextEditingController();
  
  final StudentService _studentService = StudentService();
  bool _isEditing = false;

  @override
  void initState() {
    super.initState();
    _isEditing = widget.student != null;
    
    if (_isEditing) {
      _nameController.text = widget.student!.name;
      _marathiController.text = widget.student!.marathi.toString();
      _hindiController.text = widget.student!.hindi.toString();
      _englishController.text = widget.student!.english.toString();
      _scienceController.text = widget.student!.science.toString();
      _historyController.text = widget.student!.history.toString();
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _marathiController.dispose();
    _hindiController.dispose();
    _englishController.dispose();
    _scienceController.dispose();
    _historyController.dispose();
    super.dispose();
  }

  Future<void> _saveStudent() async {
    if (_formKey.currentState!.validate()) {
      final student = Student(
        name: _nameController.text.trim(),
        marathi: int.parse(_marathiController.text),
        hindi: int.parse(_hindiController.text),
        english: int.parse(_englishController.text),
        science: int.parse(_scienceController.text),
        history: int.parse(_historyController.text),
      );

      if (_isEditing && widget.index != null) {
        await _studentService.updateStudent(widget.index!, student);
      } else {
        await _studentService.addStudent(student);
      }

      if (mounted) {
        Navigator.pop(context);
      }
    }
  }

  String? _validateName(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Please enter student name';
    }
    return null;
  }

  String? _validateMarks(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter marks';
    }
    try {
      final marks = int.parse(value);
      if (marks < 0 || marks > 100) {
        return 'Marks must be between 0 and 100';
      }
    } catch (e) {
      return 'Please enter valid marks';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_isEditing ? 'Edit Student' : 'Add Student'),
        centerTitle: true,
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Name field
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(
                    labelText: 'Student Name',
                    border: OutlineInputBorder(),
                  ),
                  validator: _validateName,
                  textCapitalization: TextCapitalization.words,
                ),
                const SizedBox(height: 16),
                
                // Subject marks fields
                _buildSubjectField('Marathi', _marathiController),
                const SizedBox(height: 16),
                
                _buildSubjectField('Hindi', _hindiController),
                const SizedBox(height: 16),
                
                _buildSubjectField('English', _englishController),
                const SizedBox(height: 16),
                
                _buildSubjectField('Science', _scienceController),
                const SizedBox(height: 16),
                
                _buildSubjectField('History', _historyController),
                const SizedBox(height: 24),
                
                // Save button
                ElevatedButton(
                  onPressed: _saveStudent,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    foregroundColor: Colors.white,
                  ),
                  child: Text(
                    _isEditing ? 'Update Student' : 'Add Student',
                    style: const TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSubjectField(String label, TextEditingController controller) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: '$label Marks',
        border: const OutlineInputBorder(),
        hintText: 'Enter marks out of 100',
      ),
      keyboardType: TextInputType.number,
      validator: _validateMarks,
    );
  }
}