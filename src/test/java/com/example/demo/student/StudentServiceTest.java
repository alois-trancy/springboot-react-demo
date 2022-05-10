package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

  @Mock
  private StudentRepository studentRepository;
  private StudentService underTest;

  @BeforeEach
  void setUp() {
    underTest = new StudentService(studentRepository);
  }

  @Test
  void canGetAllStudents() {
    // When
    underTest.getAllStudents();

    // Then
    verify(studentRepository).findAll();
  }

  @Test
  void canAddStudent() {
    // Given
    Student student = new Student(
      "Student 1",
      "test@mail.com",
      Gender.MALE
    );

    // When
    underTest.addStudent(student);

    // Then
    ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
    verify(studentRepository).save(studentArgumentCaptor.capture());
    Student capturedStudent = studentArgumentCaptor.getValue();
    assertThat(capturedStudent).isEqualTo(student);
  }

  @Test
  void willThrowWhenEmailIsTaken() {
    // Given
    Student student = new Student(
      "Student 1",
      "test@mail.com",
      Gender.MALE
    );

    given(studentRepository.selectExistEmail(anyString())).willReturn(true);

    // When
    // Then
    assertThatThrownBy(() -> underTest.addStudent(student))
      .isInstanceOf(BadRequestException.class)
      .hasMessageContaining("Student with " + student.getEmail() + " email already exists.");

    verify(studentRepository, never()).save(any());
  }


  @Test
  void canDeleteStudent() {
    // Given
    long id = 10L;
    given(studentRepository.existsById(id)).willReturn(true);

    // When
    underTest.deleteStudent(id);

    // Then
    verify(studentRepository).deleteById(id);
  }

  @Test
  void willThrowWhenDeleteStudentNotFound() {
    // Given
    long id = 10L;
    given(studentRepository.existsById(id)).willReturn(false);

    // When
    // Then
    assertThatThrownBy(() -> underTest.deleteStudent(id))
      .isInstanceOf(StudentNotFoundException.class)
      .hasMessageContaining("Student with " + Long.toString(id) + " doesn't exist.");

    verify(studentRepository, never()).deleteById(any());
  }
}