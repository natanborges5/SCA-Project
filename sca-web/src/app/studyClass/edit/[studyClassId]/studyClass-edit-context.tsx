import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";
import { ProfessorDto, StudentDto, StudyClass, Subject } from "@/lib/react-query";
export const EditStudyClassSchema = z.object({
    name: z.string().min(4),
    code: z.string(),
    classroom: z.string().min(4),
    description: z.string().min(4),
    startTime: z.string(),
    professorId: z.string(),
    subjectId: z.string(),
    studentsIds: z.array(z.string()),
});
export type StudyClassEditFormDTO = z.infer<typeof EditStudyClassSchema>
export const [StudyClassEditFormProvider, useStudyClassEditFormContext, useStudyClassEditForm] = createFormContext<StudyClassEditFormDTO>();

type StudyClassEditContext = {
    updateStudyClassMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useUpdateStudyClass"]
    >;
    initialValues: StudyClass;
    studyClassEditForm: ReturnType<typeof useStudyClassEditForm>;
    students: StudentDto[],
    professors: ProfessorDto[],
    subjects: Subject[]
};
const studyClassEditContext = createContext<StudyClassEditContext>(
    {} as StudyClassEditContext,
);
type EditStudyClassProviderProps = PropsWithChildren<{
    initialValues: StudyClass
    studyClassId: number
}>;
export const EditStudyClassProvider = ({ children, initialValues, studyClassId }: EditStudyClassProviderProps) => {
    const { reactQuery } = useApiClients();
    const updateStudyClassMutation = reactQuery.mutations.useUpdateStudyClass(studyClassId);
    const fetchProfessorsQuery = reactQuery.queries.useFetchProfessorList();
    const fetchStudentsQuery = reactQuery.queries.useFetchStudentList();
    const fetchSubjectsQuery = reactQuery.queries.useFetchSubjectList();
    const students = useMemo(() => fetchStudentsQuery.data, [fetchStudentsQuery.data])
    const professors = useMemo(() => fetchProfessorsQuery.data, [fetchProfessorsQuery.data])
    const subjects = useMemo(() => fetchSubjectsQuery.data, [fetchSubjectsQuery.data])
    const studyClassEditForm = useStudyClassEditForm({
        validateInputOnChange: true,
        initialValues: {
            classroom: initialValues.classroom,
            name: initialValues.name,
            code: initialValues.code,
            description: initialValues.description,
            startTime: initialValues.startTime,
            studentsIds: initialValues.students.map(student => student.id.toString()),
            professorId: initialValues?.professor?.id?.toString() ?? "",
            subjectId: initialValues?.subject?.id?.toString() ?? ""
        } as StudyClassEditFormDTO,
        validate: zodResolver(EditStudyClassSchema)
    });
    useEffect(() => {
        console.log("studyclassEditForm:values", studyClassEditForm.values);
    }, [studyClassEditForm.values]);
    return (
        <studyClassEditContext.Provider
            value={{ updateStudyClassMutation, studyClassEditForm, initialValues, students, professors, subjects }}
        >
            <StudyClassEditFormProvider form={studyClassEditForm}>
                {children}
            </StudyClassEditFormProvider>
        </studyClassEditContext.Provider>
    );
};

export const useEditStudyClassContext = () => useContext(studyClassEditContext);
