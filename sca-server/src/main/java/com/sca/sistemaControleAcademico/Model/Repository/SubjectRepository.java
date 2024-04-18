package com.sca.sistemaControleAcademico.Model.Repository;

import com.sca.sistemaControleAcademico.Model.Domain.Subject;
import org.springframework.data.repository.CrudRepository;

public interface SubjectRepository extends CrudRepository<Subject, Integer> {
}
