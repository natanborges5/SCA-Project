import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";

export const CreateSubjectSchema = z.object({
    name: z.string().min(4),
    description: z.string(),
    workload: z.number(),
    creditNumber: z.number(),
});
export type SubjectCreateFormDTO = z.infer<typeof CreateSubjectSchema>
export const [SubjectCreateFormProvider, useSubjectCreateFormContext, useSubjectCreateForm] = createFormContext<SubjectCreateFormDTO>();

type SubjectCreateContext = {
    createSubjectMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useSaveSubject"]
    >;
    subjectCreateForm: ReturnType<typeof useSubjectCreateForm>;
};
const subjectCreateContext = createContext<SubjectCreateContext>(
    {} as SubjectCreateContext,
);
export const CreateSubjectProvider = ({ children }: PropsWithChildren) => {
    const { reactQuery } = useApiClients();
    const createSubjectMutation = reactQuery.mutations.useSaveSubject();
    const subjectCreateForm = useSubjectCreateForm({
        validateInputOnChange: true,
        initialValues: {
            name: '',
            description: "",
            workload: 0,
            creditNumber: 0
        },
        validate: zodResolver(CreateSubjectSchema)
    });
    useEffect(() => {
        console.log("subjectCreateForm:values", subjectCreateForm.values);
    }, [subjectCreateForm.values]);
    return (
        <subjectCreateContext.Provider
            value={{ createSubjectMutation, subjectCreateForm }}
        >
            <SubjectCreateFormProvider form={subjectCreateForm}>
                {children}
            </SubjectCreateFormProvider>
        </subjectCreateContext.Provider>
    );
};

export const useCreateSubjectContext = () => useContext(subjectCreateContext);
