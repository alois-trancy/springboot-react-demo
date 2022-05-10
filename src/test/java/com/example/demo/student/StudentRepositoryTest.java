package com.example.demo.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class StudentRepositoryTest {

  @Autowired
  private StudentRepository underTest;

  @AfterEach
  void tearDown() {
    underTest.deleteAll();
  }

  @Test
  void itShouldCheckIfStudentEmailDoesExist() {
    // Given
    String email = "testing@mail.com";
    Student student = new Student(
      "Student 1",
      email,
      Gender.MALE
    );
    underTest.save(student);

    // When
    boolean expected = underTest.selectExistEmail(email);

    // Then
    assertThat(expected).isTrue();
  }

  @Test
  void itShouldCheckIfStudentEmailDoesNotExist() {
    // Given
    String email = "testing@mail.com";

    // When
    boolean expected = underTest.selectExistEmail(email);

    // Then
    assertThat(expected).isFalse();
  }
}