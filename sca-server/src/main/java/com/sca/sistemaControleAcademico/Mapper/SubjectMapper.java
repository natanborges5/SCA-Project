package com.sca.sistemaControleAcademico.Mapper;

import com.sca.sistemaControleAcademico.DTOS.StudyClass.StudyClassDto;
import com.sca.sistemaControleAcademico.DTOS.Subject.SubjectRequestDto;
import com.sca.sistemaControleAcademico.DTOS.Subject.SubjectResponseDto;
import com.sca.sistemaControleAcademico.Model.Domain.StudyClass;
import com.sca.sistemaControleAcademico.Model.Domain.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface SubjectMapper {

    @Mappings({
            @Mapping(target = "studyClasses", source = "subject.studyClasses")
    })
    SubjectResponseDto subjectToSubjectDTO(Subject subject);

    StudyClassDto studyClassToStudyClassDTO(StudyClass studyClass);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "studyClasses", ignore = true)
    })
    Subject subjectRequestDtoToSubject(SubjectRequestDto subjectRequestDto);
}