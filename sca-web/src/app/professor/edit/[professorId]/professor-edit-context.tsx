import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { createFormContext, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ApiClients, useApiClients } from "@/app/api-clients";
import { addressSchema } from "../../create/professor-create-context";
import { ProfessorResponseDto } from "@/lib/react-query";

export const EditProfessorSchema = z.object({
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
export type ProfessorEditFormDTO = z.infer<typeof EditProfessorSchema>
export const [ProfessorEditFormProvider, useProfessorEditFormContext, useProfessorEditForm] = createFormContext<ProfessorEditFormDTO>();

type ProfessorEditContext = {
    updateProfessorMutation: ReturnType<
        ApiClients["reactQuery"]["mutations"]["useUpdateProfessor"]
    >;
    initialValues: ProfessorResponseDto;
    professorEditForm: ReturnType<typeof useProfessorEditForm>;
};
const professorEditContext = createContext<ProfessorEditContext>(
    {} as ProfessorEditContext,
);
type EditProfessorProviderProps = PropsWithChildren<{
    initialValues: ProfessorResponseDto
    professorId: number
}>;
export const EditProfessorProvider = ({ children, initialValues, professorId }: EditProfessorProviderProps) => {
    const { reactQuery } = useApiClients();
    const updateProfessorMutation = reactQuery.mutations.useUpdateProfessor(professorId);
    const professorEditForm = useProfessorEditForm({
        validateInputOnChange: true,
        initialValues: {
            ...initialValues
        },
        validate: zodResolver(EditProfessorSchema)
    });
    useEffect(() => {
        console.log("professorEditForm:values", professorEditForm.values);
    }, [professorEditForm.values]);
    return (
        <professorEditContext.Provider
            value={{ updateProfessorMutation, professorEditForm, initialValues }}
        >
            <ProfessorEditFormProvider form={professorEditForm}>
                {children}
            </ProfessorEditFormProvider>
        </professorEditContext.Provider>
    );
};

export const useEditProfessorContext = () => useContext(professorEditContext);
