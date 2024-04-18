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
@Table(name = "subject")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_subject")
    private Integer id;

    private String name;
    @Column(length = 1000)
    private String description;
    private Integer workload;
    private Integer creditNumber;

    @JsonBackReference
    @OneToMany(mappedBy = "subject")
    private List<StudyClass> studyClasses;
}
