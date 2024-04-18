import { AddressDto } from "./AddressDto";
import { StudyClassDto } from "./StudyClassDto";

export interface StudentDto {
    id: number;
    name: string;
    registration: string;
    phone: string;
    email: string;
    gpt: string;
    address: AddressDto;
    studyClasses?: StudyClassDto[];
}