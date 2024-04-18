package com.sca.sistemaControleAcademico.Model.Domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@Table(name = "studyClass")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_studyClass")
    private Integer id;
    private String code;
    private String name;
    private String classroom;
    private String description;
    private LocalTime startTime;

    @JsonManagedReference
    @ManyToOne
    private Subject subject;

    @JsonManagedReference
    @ManyToOne
    private Professor professor;

    @JsonManagedReference
    @ManyToMany(mappedBy = "studyClasses")
    private List<Student> students;
}
