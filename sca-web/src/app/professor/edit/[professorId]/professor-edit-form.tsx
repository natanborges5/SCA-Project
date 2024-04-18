import { Box, Button, Input, Select, Stack, Textarea, TextInput, Title } from "@mantine/core"
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import { TextInputForm } from "@/app/components/common/text.input";
import { useEditProfessorContext } from "./professor-edit-context";
const titleOptions = [
    { label: "Professor", value: "PROFESSOR" },
    { label: "Associate Professor", value: "ASSOCIATE_PROFESSOR" },
    { label: "Assistant Professor", value: "ASSISTANT_PROFESSOR" },
    { label: "Instructor", value: "INSTRUCTOR" },
    { label: "Lecturer", value: "LECTURER" }
];

const contractTypeOptions = [
    { label: "Full Time", value: "FULL_TIME" },
    { label: "Part Time", value: "PART_TIME" },
    { label: "Visiting", value: "VISITING" },
    { label: "Adjunct", value: "ADJUNCT" }
];
export const CreateProfessorForm = () => {
    const { professorEditForm, updateProfessorMutation } = useEditProfessorContext()
    const loadingOverlay = useLoadingOverlayStore();
    const router = useRouter();
    return (
        <Box component="form" onSubmit={professorEditForm.onSubmit(
            (data) => {
                console.log("Data no submit", data);
                loadingOverlay.toggleOn();
                const response = updateProfessorMutation.mutate({ ...data }, {
                    onSuccess(data, variables, context) {
                        notifications.show({
                            id: 'professor-create',
                            title: 'Professor criado com sucesso',
                            message: '',
                            color: 'green',
                            className: 'text-white',
                            withBorder: true,
                        });
                        console.log(data, variables, context)
                        loadingOverlay.toggleOff();
                        router.push(`/professor`);
                    },
                    onError(error: any, variables, context) {
                        notifications.show({
                            id: 'professor-create',
                            title: 'Falha ao criar professor',
                            message: error?.response?.data?.message,
                            color: 'red',
                            className: 'text-white',
                            withBorder: true
                        });
                        console.error("errors: ", data, variables, error)
                        loadingOverlay.toggleOff();
                    },
                });
                console.log(response);
            }, (errors) => {
                console.log(errors)
            })}>
            <Stack>
                <Title c={"yellow"} mb={20}>Editar Professor</Title>
                <TextInputForm label="Nome do Professor" placeholder={"Marcio..."}{...professorEditForm.getInputProps("name")} />
                <TextInputForm label="Email" placeholder={"marcio@gmail.com"}{...professorEditForm.getInputProps("email")} />
                <TextInputForm label="Numero de registro" placeholder={"323231"}{...professorEditForm.getInputProps("registration")} />
                <TextInputForm label="Telefone" placeholder={"21 9999..."}{...professorEditForm.getInputProps("phone")} />
                <Select
                    label="Titulo do professor"
                    placeholder="Selecione"
                    data={titleOptions}
                    {...professorEditForm.getInputProps("title")}
                    styles={{ label: { color: 'white' } }}
                />
                <Select
                    label="Tipo de contrato"
                    placeholder="Selecione o contrato"
                    data={contractTypeOptions}
                    {...professorEditForm.getInputProps("contractType")}
                    styles={{ label: { color: 'white' } }}
                />
                <Textarea
                    label="Descrição breve do curriculo"
                    placeholder="Curriculo..."
                    {...professorEditForm.getInputProps("curriculum")}
                    styles={{ label: { color: 'white' } }}
                />
                <TextInputForm
                    label="Rua"
                    placeholder="123 Rua Principal"
                    {...professorEditForm.getInputProps("address.street")}
                />
                <TextInputForm
                    label="Cidade"
                    placeholder="Cidade Exemplo"
                    {...professorEditForm.getInputProps("address.city")}
                />
                <TextInputForm
                    label="Estado"
                    placeholder="UF"
                    {...professorEditForm.getInputProps("address.state")}
                />
                <TextInputForm
                    label="Código Postal"
                    placeholder="12345-678"
                    {...professorEditForm.getInputProps("address.postalCode")}
                />
                <Button color="green" type="submit" loading={updateProfessorMutation.isPending}>Finalizar</Button>
            </Stack>
        </Box>
    )
}