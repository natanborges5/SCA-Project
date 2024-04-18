package com.sca.sistemaControleAcademico.Model.Service;

import com.sca.sistemaControleAcademico.Model.Domain.Student;
import com.sca.sistemaControleAcademico.Model.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class StudentService {
    @Autowired private StudentRepository studentRepository;
    public List<Student> findAll() {return (List<Student>) studentRepository.findAll();}
    public Student create (Student student) {return studentRepository.save(student);}
    public Student findById(int id) {return studentRepository.findById(id).orElse(null);}
    public void delete(int id) {studentRepository.deleteById(id);}
    public Student updateStudent(Student student, int studentId) {
        Student depDB = studentRepository.findById(studentId).orElse(null);
        if(depDB == null) {return null;}
        if (Objects.nonNull(student.getName()) && !"".equalsIgnoreCase(student.getName())) {
            depDB.setName(student.getName());
        }
        if (Objects.nonNull(student.getPhone()) && !"".equalsIgnoreCase(student.getPhone())) {
            depDB.setPhone(student.getPhone());
        }
        if (Objects.nonNull(student.getGpt()) && !"".equalsIgnoreCase(student.getGpt())) {
            depDB.setGpt(student.getGpt());
        }
        if (Objects.nonNull(student.getEmail()) && !"".equalsIgnoreCase(student.getEmail())) {
            depDB.setEmail(student.getEmail());
        }
        return studentRepository.save(depDB);
    }
}
