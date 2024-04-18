"use client";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { createFormContext, useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { ProfessorDto, StudentDto, StudyClass, StudyClassRequestDto, Subject } from "@/lib/react-query";
import { ApiClients, useApiClients } from "@/app/api-clients";
type StudyClassContext = {
    studyClasses?: StudyClass[];
    isLoading: boolean
    studyClassCreateForm: ReturnType<typeof useStudyClassCreateForm>;
    createStudyClassMutation: ReturnType<ApiClients["reactQuery"]["mutations"]["useSaveStudyClass"]>;
    findStudyClassQuery: ReturnType<ApiClients["reactQuery"]["queries"]["useFetchStudyClassList"]>;
    visible: boolean,
    students: StudentDto[],
    professors: ProfessorDto[]
    subjects: Subject[]
    toggle: () => void
};
export const [StudyClassCreateFormProvider, useStudyClassCreateFormContext, useStudyClassCreateForm] = createFormContext<StudyClassRequestDto>();
const StudyClassContext = createContext<StudyClassContext>({} as StudyClassContext);

type StudyClassProviderProps = PropsWithChildren<{
}>;

export const StudyClassProvider = ({
    children
}: StudyClassProviderProps) => {
    const { reactQuery } = useApiClients();
    const [visible, { toggle }] = useDisclosure(false);
    const createStudyClassMutation = reactQuery.mutations.useSaveStudyClass();
    const findStudyClassQuery = reactQuery.queries.useFetchStudyClassList();
    const fetchProfessorsQuery = reactQuery.queries.useFetchProfessorList();
    const fetchStudentsQuery = reactQuery.queries.useFetchStudentList();
    const fetchSubjectsQuery = reactQuery.queries.useFetchSubjectList();
    const studyClasses = useMemo(() => findStudyClassQuery.data, [findStudyClassQuery.data])
    const students = useMemo(() => fetchStudentsQuery.data, [fetchStudentsQuery.data])
    const professors = useMemo(() => fetchProfessorsQuery.data, [fetchProfessorsQuery.data])
    const subjects = useMemo(() => fetchSubjectsQuery.data, [fetchSubjectsQuery.data])
    const isLoading = useMemo(() => findStudyClassQuery.isLoading, [findStudyClassQuery.isLoading])
    const studyClassCreateForm = useStudyClassCreateForm({
        initialValues: {
            name: '',
            code: "",
            classroom: "",
            description: "",
            startTime: "",
            professorId: null,
            subjectId: null,
            studentsIds: []
        },
        validate: {
            name: (value) => value.length < 2 ? "Nome precisa ter pelo menos 2 letras" : null,
            code: (value) => value.length < 2 ? "Codigo precisa ter pelo menos 1 letra" : null,
            classroom: (value) => value.length < 2 ? "Sala precisa ter pelo menos 2 letras" : null,
            description: (value) => value.length < 2 ? "Descrição precisa ter pelo menos 6 letras" : null,
            startTime: (value) => value === null ? "Digite o horario da aula" : null,
            professorId: (value) => value === null ? "Selecione o professor" : null,
            subjectId: (value) => value === null ? "Selecione a matéria" : null,
            studentsIds: (value) => value.length < 1 ? "Selecione os alunos" : null
        },
    });
    return (
        <StudyClassContext.Provider
            value={{
                studyClasses,
                isLoading,
                visible,
                createStudyClassMutation,
                studyClassCreateForm,
                findStudyClassQuery,
                students,
                professors,
                subjects,
                toggle
            }}
        >
            <StudyClassCreateFormProvider form={studyClassCreateForm}>
                {children}
            </StudyClassCreateFormProvider>
        </StudyClassContext.Provider>
    );
};

export const useStudyClassContext = () => useContext(StudyClassContext);
