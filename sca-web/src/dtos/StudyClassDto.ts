import { ProfessorDto } from "./ProfessotDto";
import { StudentDto } from "./StudentDto";
import { SubjectDto } from "./SubjectDto";

export interface StudyClassDto {
    id: number;
    code: string;
    name: string;
    classroom: string;
    description: string;
    startTime: string;

    subject?: SubjectDto;
    professor?: ProfessorDto;
    students?: StudentDto[];
}