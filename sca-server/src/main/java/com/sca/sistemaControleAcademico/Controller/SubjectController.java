package com.sca.sistemaControleAcademico.Controller;

import com.sca.sistemaControleAcademico.DTOS.Subject.SubjectResponseDto;
import com.sca.sistemaControleAcademico.Model.Domain.Subject;
import com.sca.sistemaControleAcademico.Model.Service.SubjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sca.sistemaControleAcademico.Mapper.SubjectMapper;
import java.util.List;
import com.sca.sistemaControleAcademico.DTOS.Subject.SubjectRequestDto;
@RestController("/subject")
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @Autowired
    private SubjectMapper subjectMapper;


    @Operation(summary = "createSubject", description = "Create subject")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = Subject.class))),
            @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = String.class))),
    })
    @PostMapping("/subject")
    public ResponseEntity<?> saveSubject(@Valid @RequestBody SubjectRequestDto subjectRequest)
    {
        try {
            Subject subject = subjectMapper.subjectRequestDtoToSubject(subjectRequest);
            Subject newSubject = subjectService.create(subject);
            return ResponseEntity.ok(newSubject);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao cadastrar Disciplina " + e.getMessage());
        }
    }
    @GetMapping("/subject")
    public List<Subject> fetchSubjectList()
    {
        return subjectService.findAll();
    }
    @GetMapping("/subject/{id}")
    public SubjectResponseDto
    getSubjectById(@PathVariable("id") int subjectId)
    {
        Subject subject = subjectService.findById(subjectId);
        return subjectMapper.subjectToSubjectDTO(subject);
    }
    @PutMapping("/subject/{id}")
    public Subject
    updateSubject(@RequestBody SubjectRequestDto subjectRequest, @PathVariable("id") int subjectId)
    {
        try {
            Subject subject = subjectMapper.subjectRequestDtoToSubject(subjectRequest);
            return subjectService.updateSubject(subject, subjectId);
        }catch (Exception e) {
            System.out.println("Falha ao editar Disciplina " + subjectRequest.getName());
            return null;
        }

    }
    @DeleteMapping("/subject/{id}")
    public String deleteSubjectById(@PathVariable("id") int subjectId)
    {
        subjectService.delete(subjectId);
        return "Deleted Successfully";
    }
}
