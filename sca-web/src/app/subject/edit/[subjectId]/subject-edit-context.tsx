import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";
import { SubjectResponseDto } from "@/lib/react-query";
import { CreateSubjectSchema } from "../../create/subject-create-context";

export type SubjectEditFormDTO = z.infer<typeof CreateSubjectSchema>
export const [SubjectEditFormProvider, useSubjectEditFormContext, useSubjectEditForm] = createFormContext<SubjectEditFormDTO>();

type SubjectEditContext = {
    updateSubjectMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useUpdateSubject"]
    >;
    initialValues: SubjectResponseDto;
    subjectEditForm: ReturnType<typeof useSubjectEditForm>;
};
const subjectEditContext = createContext<SubjectEditContext>(
    {} as SubjectEditContext,
);
type EditSubjectProviderProps = PropsWithChildren<{
    initialValues: SubjectResponseDto
    subjectId: number
}>;
export const EditSubjectProvider = ({ children, initialValues, subjectId }: EditSubjectProviderProps) => {
    const { reactQuery } = useApiClients();
    const updateSubjectMutation = reactQuery.mutations.useUpdateSubject(subjectId);
    const subjectEditForm = useSubjectEditForm({
        validateInputOnChange: true,
        initialValues: {
            ...initialValues
        },
        validate: zodResolver(CreateSubjectSchema)
    });
    useEffect(() => {
        console.log("subjectEditForm:values", subjectEditForm.values);
    }, [subjectEditForm.values]);
    return (
        <subjectEditContext.Provider
            value={{ updateSubjectMutation, subjectEditForm, initialValues }}
        >
            <SubjectEditFormProvider form={subjectEditForm}>
                {children}
            </SubjectEditFormProvider>
        </subjectEditContext.Provider>
    );
};

export const useEditSubjectContext = () => useContext(subjectEditContext);
