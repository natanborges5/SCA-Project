package com.sca.sistemaControleAcademico.Model.Repository;

import com.sca.sistemaControleAcademico.Model.Domain.Professor;
import org.springframework.data.repository.CrudRepository;

public interface ProfessorRepository extends CrudRepository<Professor, Integer> {
}
