package com.sca.sistemaControleAcademico.DTOS.StudyClass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyClassDto {
    private Integer id;
    private String code;
    private String name;
    private String classroom;
    private String description;
    private String startTime;
}