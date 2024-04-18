package com.sca.sistemaControleAcademico.Model.Service;

import com.sca.sistemaControleAcademico.Model.Domain.Address;
import com.sca.sistemaControleAcademico.Model.Domain.Professor;
import com.sca.sistemaControleAcademico.Model.Domain.StudyClass;
import com.sca.sistemaControleAcademico.Model.Domain.Subject;
import com.sca.sistemaControleAcademico.Model.Repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProfessorService
{
    @Autowired
    private ProfessorRepository professorRepository;
    public List<Professor> findAll() {return (List<Professor>) professorRepository.findAll();}
    public Professor create (Professor professor) {return professorRepository.save(professor);}
    public Professor findById(int id) {return professorRepository.findById(id).orElse(null);}
    public void delete(int id) {
        Professor professorDb = professorRepository.findById(id).orElse(null);
        if(professorDb != null & !professorDb.getStudyClasses().isEmpty()) {
            for (StudyClass studyClass : professorDb.getStudyClasses()) {
                studyClass.setProfessor(null);
            }
        }
        professorRepository.deleteById(id);
    }
    public Professor update(Professor professor, int professorId) {
        Professor depDB = professorRepository.findById(professorId).orElse(null);
        if(depDB == null) {return null;}
        if (Objects.nonNull(professor.getName()) && !"".equalsIgnoreCase(professor.getName())) {
            depDB.setName(professor.getName());
        }
        if (Objects.nonNull(professor.getPhone()) && !"".equalsIgnoreCase(professor.getPhone())) {
            depDB.setPhone(professor.getPhone());
        }
        if (Objects.nonNull(professor.getCurriculum()) && !"".equalsIgnoreCase(professor.getCurriculum())) {
            depDB.setCurriculum(professor.getCurriculum());
        }
        if (Objects.nonNull(professor.getRegistration()) && !"".equalsIgnoreCase(professor.getRegistration())) {
            depDB.setRegistration(professor.getRegistration());
        }
        if (Objects.nonNull(professor.getEmail()) && !"".equalsIgnoreCase(professor.getEmail())) {
            depDB.setEmail(professor.getEmail());
        }
        if (Objects.nonNull(professor.getTitle())) {
            depDB.setTitle(professor.getTitle());
        }
        if (Objects.nonNull(professor.getContractType())) {
            depDB.setContractType(professor.getContractType());
        }
        if (Objects.nonNull(professor.getAddress())) {
            Address address = professor.getAddress();
            if (Objects.nonNull(address.getStreet())) {
                depDB.getAddress().setStreet(address.getStreet());
            }
            if (Objects.nonNull(address.getCity())) {
                depDB.getAddress().setCity(address.getCity());
            }
            if (Objects.nonNull(address.getState())) {
                depDB.getAddress().setState(address.getState());
            }
            if (Objects.nonNull(address.getPostalCode())) {
                depDB.getAddress().setPostalCode(address.getPostalCode());
            }
        }
        return professorRepository.save(depDB);
    }

}
