package com.sca.sistemaControleAcademico.Mapper;

import com.sca.sistemaControleAcademico.DTOS.Professor.ProfessorDto;
import com.sca.sistemaControleAcademico.DTOS.Professor.ProfessorRequestDto;
import com.sca.sistemaControleAcademico.DTOS.Professor.ProfessorResponseDto;
import com.sca.sistemaControleAcademico.DTOS.Student.StudentDto;
import com.sca.sistemaControleAcademico.DTOS.Student.StudentRequestDto;
import com.sca.sistemaControleAcademico.DTOS.Student.StudentResponseDto;
import com.sca.sistemaControleAcademico.Model.Domain.Professor;
import com.sca.sistemaControleAcademico.Model.Domain.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mappings({
            @Mapping(target = "studyClasses", source = "student.studyClasses")
    })
    StudentResponseDto studentToStudentDTO(Student student);

    List<StudentDto> studentsToStudentDTOs(List<Student> students);
    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "studyClasses", ignore = true)
    })
    Student studentRequestDtoToStudent(StudentRequestDto studentRequestDto);


    @Mappings({
            @Mapping(target = "studyClasses", source = "professor.studyClasses")
    })
    ProfessorResponseDto professorToProfessorDTO(Professor professor);

    List<ProfessorDto> professorsToProfessorDTOs(List<Professor> professors);
    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "studyClasses", ignore = true)
    })
    Professor professorRequestDtoToProfessor(ProfessorRequestDto professorRequestDto);
}
