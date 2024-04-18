package com.sca.sistemaControleAcademico.Model.Repository;

import com.sca.sistemaControleAcademico.Model.Domain.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {

}
