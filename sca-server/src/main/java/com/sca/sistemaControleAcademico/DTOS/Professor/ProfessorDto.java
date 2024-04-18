package com.sca.sistemaControleAcademico.DTOS.Professor;

import com.sca.sistemaControleAcademico.Model.Domain.Address;
import com.sca.sistemaControleAcademico.Model.Domain.Enum.ContractType;
import com.sca.sistemaControleAcademico.Model.Domain.Enum.ProfessorTitle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfessorDto {
    private int id;
    private String name;
    private String registration;
    private String phone;
    private String email;
    private String curriculum;
    private ProfessorTitle title;
    private ContractType contractType;
    private Address address;
}
