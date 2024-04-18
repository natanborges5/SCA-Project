package com.sca.sistemaControleAcademico.DTOS.Subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectRequestDto {
    private String name;
    private String description;
    private Integer workload;
    private Integer creditNumber;
}
