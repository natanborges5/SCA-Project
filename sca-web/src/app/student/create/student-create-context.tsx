import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";
import { addressSchema } from "@/app/professor/create/professor-create-context";

export const CreateStudentSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    phone: z.string().min(4),
    registration: z.string().min(2),
    gpt: z.string(),
    address: addressSchema
});
export type StudentCreateFormDTO = z.infer<typeof CreateStudentSchema>
export const [StudentCreateFormProvider, useStudentCreateFormContext, useStudentCreateForm] = createFormContext<StudentCreateFormDTO>();

type StudentCreateContext = {
    createStudentMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useSaveStudent"]
    >;
    studentCreateForm: ReturnType<typeof useStudentCreateForm>;
};
const studentCreateContext = createContext<StudentCreateContext>(
    {} as StudentCreateContext,
);
export const CreateStudentProvider = ({ children }: PropsWithChildren) => {
    const { reactQuery } = useApiClients();
    const createStudentMutation = reactQuery.mutations.useSaveStudent();
    const studentCreateForm = useStudentCreateForm({
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: "",
            phone: "",
            gpt: "",
            address: {
                city: "",
                postalCode: "",
                state: "",
                street: ""
            }
        },
        validate: zodResolver(CreateStudentSchema)
    });
    useEffect(() => {
        console.log("studentCreateForm:values", studentCreateForm.values);
    }, [studentCreateForm.values]);
    return (
        <studentCreateContext.Provider
            value={{ createStudentMutation, studentCreateForm }}
        >
            <StudentCreateFormProvider form={studentCreateForm}>
                {children}
            </StudentCreateFormProvider>
        </studentCreateContext.Provider>
    );
};

export const useCreateStudentContext = () => useContext(studentCreateContext);
