package com.sca.sistemaControleAcademico.DTOS.Student;

import com.sca.sistemaControleAcademico.Model.Domain.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDto {
    private int id;
    private String name;
    private String registration;
    private String phone;
    private String email;
    private String gpt;
    private Address address;
}
