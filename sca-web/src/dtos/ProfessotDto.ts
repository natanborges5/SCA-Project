import { AddressDto } from "./AddressDto";
import { StudyClassDto } from "./StudyClassDto";

export enum ProfessorTitle {
    PROFESSOR = 'PROFESSOR',
    ASSOCIATE_PROFESSOR = 'ASSOCIATE_PROFESSOR',
    ASSISTANT_PROFESSOR = 'ASSISTANT_PROFESSOR',
    INSTRUCTOR = 'INSTRUCTOR',
    LEC = 'LEC'
}

export enum ContractType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    VISITING = 'VISITING',
    ADJUNCT = 'ADJUNCT'
}
export interface ProfessorDto {
    id: number;
    name: string;
    registration: string;
    phone: string;
    email: string;
    curriculum: string;
    title: ProfessorTitle;
    contractType: ContractType;

    studyClasses?: StudyClassDto[];
    address: AddressDto;
}