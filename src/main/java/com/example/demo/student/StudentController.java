package com.example.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/student")
public class StudentController {

  private final StudentService studentService;

  @GetMapping
  public List<Student> getAllStudents() {
    return studentService.getAllStudents();
  }

  @PostMapping
  public void addStudent(@RequestBody Student student) {
    studentService.addStudent(student);
  }

  @DeleteMapping(path = "{id}")
  public void deleteStudent(@PathVariable(value = "id") long id) {
    studentService.deleteStudent(id);
  }
}
