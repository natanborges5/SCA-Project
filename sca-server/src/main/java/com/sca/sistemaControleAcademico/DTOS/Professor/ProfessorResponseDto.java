package com.sca.sistemaControleAcademico.DTOS.Professor;

import com.sca.sistemaControleAcademico.DTOS.StudyClass.StudyClassDto;
import com.sca.sistemaControleAcademico.Model.Domain.Address;
import com.sca.sistemaControleAcademico.Model.Domain.Enum.ContractType;
import com.sca.sistemaControleAcademico.Model.Domain.Enum.ProfessorTitle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfessorResponseDto {
    private Integer id;

    private String name;
    private String registration;
    private String phone;
    private String email;
    private String curriculum;
    private ProfessorTitle title;
    private ContractType contractType;
    private Address address;
    private List<StudyClassDto> studyClasses;
}