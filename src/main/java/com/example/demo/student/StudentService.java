package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

  private final StudentRepository studentRepository;

  public List<Student> getAllStudents() {
    return studentRepository.findAll();
  }

  public void addStudent(Student student) {
    if (studentRepository.selectExistEmail(student.getEmail())) {
      throw new BadRequestException("Student with " + student.getEmail() + " email already exists.");
    }
    studentRepository.save(student);
  }

  public void deleteStudent(long id) {
    if (!studentRepository.existsById(id)) {
      throw new StudentNotFoundException("Student with " + Long.toString(id) + " doesn't exist.");
    }

    studentRepository.deleteById(id);
  }
}
