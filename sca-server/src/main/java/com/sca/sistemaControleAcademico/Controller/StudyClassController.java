package com.sca.sistemaControleAcademico.Controller;

import com.sca.sistemaControleAcademico.DTOS.StudyClass.StudyClassRequestDto;
import com.sca.sistemaControleAcademico.Model.Domain.StudyClass;
import com.sca.sistemaControleAcademico.Model.Service.StudyClassService;
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

import java.util.List;

@RestController("/studyClass")
public class StudyClassController {
    @Autowired
    private StudyClassService studyClassService;

    @Operation(summary = "createStudyClass", description = "Create studyClass")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = StudyClass.class))),
            @ApiResponse(responseCode = "404", content = @Content(schema = @Schema(implementation = String.class))),
    })
    @PostMapping("/studyClass")
    public ResponseEntity<?> saveStudyClass(@Valid @RequestBody StudyClassRequestDto studyClass)
    {
        try {
            StudyClass newStudyClass = studyClassService.create(studyClass);
            return ResponseEntity.ok(newStudyClass);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao cadastrar Turma " + e.getMessage());
        }
    }
    @GetMapping("/studyClass")
    public List<StudyClass> fetchStudyClassList()
    {
        return studyClassService.findAll();
    }
    @GetMapping("/studyClass/{id}")
    public StudyClass
    getStudyClassById(@PathVariable("id") int studyClassId)
    {
        return studyClassService.findById(studyClassId);
    }
    @PutMapping("/studyClass/{id}")
    public ResponseEntity<?> updateStudyClass(@RequestBody StudyClassRequestDto studyClass, @PathVariable("id") int studyClassId)
    {
        try {
            System.out.println(studyClass);
            StudyClass newStudyClass = studyClassService.updateStudyClass(studyClass, studyClassId);
            return ResponseEntity.ok(newStudyClass);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao cadastrar Turma " + e.getMessage());
        }
    }
    @DeleteMapping("/studyClass/{id}")
    public String deleteStudyClassById(@PathVariable("id") int studyClassId)
    {
        studyClassService.delete(studyClassId);
        return "Deleted Successfully";
    }
}
