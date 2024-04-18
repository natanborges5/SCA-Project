package com.sca.sistemaControleAcademico.DTOS.StudyClass;

import lombok.Data;

import java.util.List;
@Data
public class StudyClassRequestDto {
    private String code;
    private String name;
    private String classroom;
    private String description;
    private String startTime;
    private Integer professorId;
    private Integer subjectId;
    private List<Integer> studentsIds;
}

