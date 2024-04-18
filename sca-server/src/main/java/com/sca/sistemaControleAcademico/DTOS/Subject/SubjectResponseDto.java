package com.sca.sistemaControleAcademico.DTOS.Subject;

import com.sca.sistemaControleAcademico.DTOS.StudyClass.StudyClassDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectResponseDto {
    private Integer id;
    private String name;
    private String description;
    private Integer workload;
    private Integer creditNumber;
    private List<StudyClassDto> studyClasses;
}
