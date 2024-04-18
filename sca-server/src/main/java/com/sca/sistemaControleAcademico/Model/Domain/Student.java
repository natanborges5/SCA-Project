package com.sca.sistemaControleAcademico.Model.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "student")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_student")
    private Integer id;

    private String name;
    private String registration;
    private String phone;
    private String email;
    private String gpt;
    @Embedded
    private Address address;

    @JsonBackReference
    @ManyToMany()
    @JoinTable(
        name = "student_studyClass",
        joinColumns = @JoinColumn(name = "id_student"),
        inverseJoinColumns = @JoinColumn(name = "id_studyClass")
    )
    private List<StudyClass> studyClasses;
}
