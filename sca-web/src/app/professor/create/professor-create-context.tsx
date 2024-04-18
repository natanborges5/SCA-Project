import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";

export const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string()
});
export const CreateProfessorSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    phone: z.string().min(4),
    registration: z.string().min(2),
    curriculum: z.string(),
    title: z.enum([
        "PROFESSOR",
        "ASSOCIATE_PROFESSOR",
        "ASSISTANT_PROFESSOR",
        "INSTRUCTOR",
        "LECTURER"
    ]),
    contractType: z.enum([
        "FULL_TIME",
        "PART_TIME",
        "VISITING",
        "ADJUNCT"
    ]),
    address: addressSchema
});
export type ProfessorCreateFormDTO = z.infer<typeof CreateProfessorSchema>
export const [ProfessorCreateFormProvider, useProfessorCreateFormContext, useProfessorCreateForm] = createFormContext<ProfessorCreateFormDTO>();

type ProfessorCreateContext = {
    createProfessorMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useSaveProfessor"]
    >;
    professorCreateForm: ReturnType<typeof useProfessorCreateForm>;
};
const professorCreateContext = createContext<ProfessorCreateContext>(
    {} as ProfessorCreateContext,
);
export const CreateProfessorProvider = ({ children }: PropsWithChildren) => {
    const { reactQuery } = useApiClients();
    const createProfessorMutation = reactQuery.mutations.useSaveProfessor();
    const professorCreateForm = useProfessorCreateForm({
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: "",
            phone: "",
            registration: "",
            curriculum: "",
            address: {
                city: "",
                postalCode: "",
                state: "",
                street: ""
            }
        },
        validate: zodResolver(CreateProfessorSchema)
    });
    useEffect(() => {
        console.log("professorCreateForm:values", professorCreateForm.values);
    }, [professorCreateForm.values]);
    return (
        <professorCreateContext.Provider
            value={{ createProfessorMutation, professorCreateForm }}
        >
            <ProfessorCreateFormProvider form={professorCreateForm}>
                {children}
            </ProfessorCreateFormProvider>
        </professorCreateContext.Provider>
    );
};

export const useCreateProfessorContext = () => useContext(professorCreateContext);
