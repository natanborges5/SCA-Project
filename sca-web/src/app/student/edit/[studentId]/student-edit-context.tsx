import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";
import { StudentResponseDto } from "@/lib/react-query";
import { addressSchema } from "@/app/professor/create/professor-create-context";
import { CreateStudentSchema } from "../../create/student-create-context";

export type StudentEditFormDTO = z.infer<typeof CreateStudentSchema>
export const [StudentEditFormProvider, useStudentEditFormContext, useStudentEditForm] = createFormContext<StudentEditFormDTO>();

type StudentEditContext = {
    updateStudentMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useUpdateStudent"]
    >;
    initialValues: StudentResponseDto;
    studentEditForm: ReturnType<typeof useStudentEditForm>;
};
const studentEditContext = createContext<StudentEditContext>(
    {} as StudentEditContext,
);
type EditStudentProviderProps = PropsWithChildren<{
    initialValues: StudentResponseDto
    studentId: number
}>;
export const EditStudentProvider = ({ children, initialValues, studentId }: EditStudentProviderProps) => {
    const { reactQuery } = useApiClients();
    const updateStudentMutation = reactQuery.mutations.useUpdateStudent(studentId);
    const studentEditForm = useStudentEditForm({
        validateInputOnChange: true,
        initialValues: {
            ...initialValues
        },
        validate: zodResolver(CreateStudentSchema)
    });
    useEffect(() => {
        console.log("studentEditForm:values", studentEditForm.values);
    }, [studentEditForm.values]);
    return (
        <studentEditContext.Provider
            value={{ updateStudentMutation, studentEditForm, initialValues }}
        >
            <StudentEditFormProvider form={studentEditForm}>
                {children}
            </StudentEditFormProvider>
        </studentEditContext.Provider>
    );
};

export const useEditStudentContext = () => useContext(studentEditContext);
