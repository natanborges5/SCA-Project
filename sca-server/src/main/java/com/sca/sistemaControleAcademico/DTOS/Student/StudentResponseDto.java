package com.sca.sistemaControleAcademico.DTOS.Student;

import com.sca.sistemaControleAcademico.DTOS.StudyClass.StudyClassDto;
import com.sca.sistemaControleAcademico.Model.Domain.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentResponseDto {
    private Integer id;

    private String name;
    private String registration;
    private String phone;
    private String email;
    private String gpt;
    private Address address;
    private List<StudyClassDto> studyClasses;
}
