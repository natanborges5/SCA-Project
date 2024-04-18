package com.sca.sistemaControleAcademico.Model.Service;

import com.sca.sistemaControleAcademico.DTOS.StudyClass.StudyClassRequestDto;
import com.sca.sistemaControleAcademico.Model.Domain.Professor;
import com.sca.sistemaControleAcademico.Model.Domain.Student;
import com.sca.sistemaControleAcademico.Model.Domain.StudyClass;
import com.sca.sistemaControleAcademico.Model.Domain.Subject;
import com.sca.sistemaControleAcademico.Model.Errors.ServiceException;
import com.sca.sistemaControleAcademico.Model.Repository.StudyClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class StudyClassService {
    @Autowired
    private StudyClassRepository studyClassRepository;
    @Autowired
    private ProfessorService professorService;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private StudentService studentService;

    public List<StudyClass> findAll() {return (List<StudyClass>) studyClassRepository.findAll();}
    public StudyClass create(StudyClassRequestDto studyClass) throws ServiceException {
        try {
            Professor professor = professorService.findById(studyClass.getProfessorId());
            Subject subject = subjectService.findById(studyClass.getSubjectId());
            if (professor == null || subject == null) {
                throw new ServiceException("Professor ou disciplina não encontrados");
            }
            List<Student> students = new ArrayList<>();
            for (Integer studentId : studyClass.getStudentsIds()) {
                Student student = studentService.findById(studentId);
                if (student != null) {
                    students.add(student);
                } else {
                    throw new ServiceException("Estudante não encontrado com ID: " + studentId);
                }
            }
            LocalTime startTime = LocalTime.parse(studyClass.getStartTime(), DateTimeFormatter.ofPattern("HH:mm:ss"));

            StudyClass newStudyClass = StudyClass.builder()
                    .subject(subject)
                    .professor(professor)
                    .code(studyClass.getCode())
                    .name(studyClass.getName())
                    .classroom(studyClass.getClassroom())
                    .description(studyClass.getDescription())
                    .startTime(startTime)
                    .students(students)
                    .build();

            for (Student student : students) {
                student.getStudyClasses().add(newStudyClass);
            }

            return studyClassRepository.save(newStudyClass);
        } catch (Exception e) {
            throw new ServiceException("Erro ao criar a StudyClass", e);
        }
    }

    public StudyClass findById(int id) {return studyClassRepository.findById(id).orElse(null);}
    public void delete(int id) {studyClassRepository.deleteById(id);}
    public StudyClass updateStudyClass(StudyClassRequestDto studyClass, int studyClassId) {
        StudyClass depDB = studyClassRepository.findById(studyClassId).orElse(null);
        if(depDB == null) {return null;}
        if (Objects.nonNull(studyClass.getName()) && !"".equalsIgnoreCase(studyClass.getName())) {
            depDB.setName(studyClass.getName());
        }
        if (Objects.nonNull(studyClass.getCode()) && !"".equalsIgnoreCase(studyClass.getCode())) {
            depDB.setName(studyClass.getName());
        }
        if (Objects.nonNull(studyClass.getDescription()) && !"".equalsIgnoreCase(studyClass.getDescription())) {
            depDB.setDescription(studyClass.getDescription());
        }
        try {
            Professor professor = professorService.findById(studyClass.getProfessorId());
            Subject subject = subjectService.findById(studyClass.getSubjectId());
            if (professor == null || subject == null) {
                throw new ServiceException("Professor ou disciplina não encontrados");
            }
            List<Student> students = new ArrayList<>();
            for (Integer studentId : studyClass.getStudentsIds()) {
                Student student = studentService.findById(studentId);
                if (student != null) {
                    students.add(student);
                } else {
                    throw new ServiceException("Estudante não encontrado com ID: " + studentId);
                }
            }
            LocalTime startTime = LocalTime.parse(studyClass.getStartTime(), DateTimeFormatter.ofPattern("HH:mm:ss"));

            StudyClass newStudyClass = StudyClass.builder()
                    .subject(subject)
                    .professor(professor)
                    .code(studyClass.getCode())
                    .name(studyClass.getName())
                    .classroom(studyClass.getClassroom())
                    .description(studyClass.getDescription())
                    .startTime(startTime)
                    .students(students)
                    .build();

            for (Student student : students) {
                student.getStudyClasses().add(newStudyClass);
            }

            return studyClassRepository.save(newStudyClass);
        } catch (Exception e) {
            throw new ServiceException("Erro ao criar a StudyClass", e);
        }
    }
}
