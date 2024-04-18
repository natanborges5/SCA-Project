package com.sca.sistemaControleAcademico.Model.Domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sca.sistemaControleAcademico.Model.Domain.Enum.ContractType;
import com.sca.sistemaControleAcademico.Model.Domain.Enum.ProfessorTitle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "professor")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_professor")
    private Integer id;

    private String name;
    private String registration;
    private String phone;
    private String email;
    @Column(length = 1000)
    private String curriculum;
    private ProfessorTitle title;
    private ContractType contractType;

    @JsonBackReference
    @OneToMany(mappedBy = "professor")
    private List<StudyClass> studyClasses;

    @Embedded
    private Address address;
}
