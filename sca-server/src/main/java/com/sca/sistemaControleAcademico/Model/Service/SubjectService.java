package com.sca.sistemaControleAcademico.Model.Service;

import com.sca.sistemaControleAcademico.Model.Domain.Subject;
import com.sca.sistemaControleAcademico.Model.Repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;
    public List<Subject> findAll() {return (List<Subject>) subjectRepository.findAll();}
    public Subject create (Subject subject) {return subjectRepository.save(subject);}
    public Subject findById(int id) {return subjectRepository.findById(id).orElse(null);}
    public void delete(int id) {subjectRepository.deleteById(id);}
    public Subject updateSubject(Subject subject, int subjectId) {
        Subject depDB = subjectRepository.findById(subjectId).orElse(null);
        if(depDB == null) {return null;}
        if (Objects.nonNull(subject.getName()) && !"".equalsIgnoreCase(subject.getName())) {
            depDB.setName(subject.getName());
        }
        if (Objects.nonNull(subject.getCreditNumber())) {
            depDB.setCreditNumber(subject.getCreditNumber());
        }
        if (Objects.nonNull(subject.getDescription()) && !"".equalsIgnoreCase(subject.getDescription())) {
            depDB.setDescription(subject.getDescription());
        }
        if (Objects.nonNull(subject.getWorkLoad())) {
            depDB.setWorkLoad(subject.getWorkLoad());
        }
        if (Objects.nonNull(subject.getStudyClasses())) {
            depDB.setStudyClasses(subject.getStudyClasses());
        }
        if (Objects.nonNull(subject.getWorkLoad())) {
            depDB.setWorkLoad(subject.getWorkLoad());
        }
        return subjectRepository.save(depDB);
    }
}
