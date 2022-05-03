package com.example.demo.student;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
@Entity
@Table
public class Student {

  @Id
  @SequenceGenerator(
    name = "student_sequence",
    sequenceName = "student_sequence",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "student_sequence"
  )
  private Long id;
  @NotBlank
  @Column(nullable = false)
  private String name;
  @Email
  @Column(nullable = false, unique = true)
  private String email;
  @NotNull
  @Column(nullable = false)
  @Enumerated(value = EnumType.STRING)
  private Gender gender;

}
