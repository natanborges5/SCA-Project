package com.sca.sistemaControleAcademico.Controller;


import com.sca.sistemaControleAcademico.DTOS.Professor.ProfessorDto;
import com.sca.sistemaControleAcademico.DTOS.Professor.ProfessorRequestDto;
import com.sca.sistemaControleAcademico.DTOS.Professor.ProfessorResponseDto;
import com.sca.sistemaControleAcademico.DTOS.Student.StudentDto;
import com.sca.sistemaControleAcademico.DTOS.Student.StudentRequestDto;
import com.sca.sistemaControleAcademico.DTOS.Student.StudentResponseDto;
import com.sca.sistemaControleAcademico.Mapper.UserMapper;
import com.sca.sistemaControleAcademico.Model.Domain.Student;
import com.sca.sistemaControleAcademico.Model.Domain.Professor;
import com.sca.sistemaControleAcademico.Model.Service.ProfessorService;
import com.sca.sistemaControleAcademico.Model.Service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/user")
public class UserController {
    @Autowired
    private StudentService studentService;

    @Autowired private ProfessorService professorService;

    @Autowired
    private UserMapper userMapper;
    //Students section
    @Operation(summary = "createStudent", description = "Create student")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = Student.class))),
            @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = String.class))),
    })
    @PostMapping("/student")
    public Student saveStudent(@Valid @RequestBody StudentRequestDto student)
    {
        try {
            Student newStudent = userMapper.studentRequestDtoToStudent(student);
            return studentService.create(newStudent);
        }catch (Exception e) {
            System.out.println("Falha ao cadastrar Estudante " + student.getEmail());
            return null;
        }
    }
    @GetMapping("/student")
    public List<StudentDto> fetchStudentList()
    {
        List<Student> students = studentService.findAll();
        return userMapper.studentsToStudentDTOs(students);
    }
    @GetMapping("/student/{id}")
    public StudentResponseDto getStudentById(@PathVariable("id") int studentId)
    {
        Student student = studentService.findById(studentId);
        return userMapper.studentToStudentDTO(student);
    }
    @PutMapping("/student/{id}")
    public Student updateStudent(@RequestBody Student student, @PathVariable("id") int studentId)
    {
        return studentService.updateStudent(student, studentId);
    }
    @DeleteMapping("/student/{id}")
    public String deleteStudentById(@PathVariable("id") int studentId)
    {
        studentService.delete(studentId);
        return "Deleted Successfully";
    }
    //Professor section
    @PostMapping("/professor")
    public Professor saveProfessor(@Validated @RequestBody ProfessorRequestDto professor)
    {
        try {
            Professor newProfessor = userMapper.professorRequestDtoToProfessor(professor);
            return professorService.create(newProfessor);
        }catch (Exception e) {
            System.out.println("Falha ao cadastrar Professor " + professor.getEmail());
            return null;
        }

    }
    @GetMapping("/professor") public List<ProfessorDto> fetchProfessorList()
    {
        List<Professor> professors = professorService.findAll();
        return userMapper.professorsToProfessorDTOs(professors);
    }
    @GetMapping("/professor/{id}")
    public ProfessorResponseDto getProfessorById(@PathVariable("id") int professorId)
    {
        Professor professor = professorService.findById(professorId);
        return userMapper.professorToProfessorDTO(professor);
    }
    @PutMapping("/professor/{id}")
    public Professor updateProfessor(@RequestBody ProfessorRequestDto professor, @PathVariable("id") int professorId)
    {
        try {
            Professor newProfessor = userMapper.professorRequestDtoToProfessor(professor);
            return professorService.update(newProfessor, professorId);
        }catch (Exception e){
            System.out.println("Falha ao cadastrar Professor " + professor.getEmail());
            return null;
        }

    }
    @DeleteMapping("/professor/{id}")
    public String deleteProfessorById(@PathVariable("id") int professorId)
    {
        professorService.delete(professorId);
        return "Deleted Successfully";
    }
}
