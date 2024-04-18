import { StudyClassDto } from "./StudyClassDto";

export interface SubjectDto {
    id: number;
    name: string;
    description: string;
    workLoad: number;
    creditNumber: number;

    studyClasses?: StudyClassDto[];
}