import { Box, Button, Select, Stack, Textarea, Title } from "@mantine/core"
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { TextInputForm } from "@/app/components/common/text.input";
import { useCreateProfessorContext } from "./professor-create-context";
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
    const { createProfessorMutation, professorCreateForm } = useCreateProfessorContext()
    const loadingOverlay = useLoadingOverlayStore();
    const router = useRouter();
    return (
        <Box component="form" onSubmit={professorCreateForm.onSubmit(
            (data) => {
                console.log("Data no submit", data);
                loadingOverlay.toggleOn();
                const response = createProfessorMutation.mutate({ ...data }, {
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
                <Title c={"yellow"} mb={20}>Cadastrar Professor</Title>
                <TextInputForm label="Nome do Professor" placeholder={"Marcio..."}{...professorCreateForm.getInputProps("name")} />
                <TextInputForm label="Email" placeholder={"marcio@gmail.com"}{...professorCreateForm.getInputProps("email")} />
                <TextInputForm label="Numero de registro" placeholder={"323231"}{...professorCreateForm.getInputProps("registration")} />
                <TextInputForm label="Telefone" placeholder={"21 9999..."}{...professorCreateForm.getInputProps("phone")} />
                <Select
                    label="Titulo do professor"
                    placeholder="Selecione"
                    data={titleOptions}
                    {...professorCreateForm.getInputProps("title")}
                    styles={{ label: { color: 'white' } }}
                />
                <Select
                    label="Tipo de contrato"
                    placeholder="Selecione o contrato"
                    data={contractTypeOptions}
                    {...professorCreateForm.getInputProps("contractType")}
                    styles={{ label: { color: 'white' } }}
                />
                <Textarea
                    label="Descrição breve do curriculo"
                    placeholder="Curriculo..."
                    {...professorCreateForm.getInputProps("curriculum")}
                    styles={{ label: { color: 'white' } }}
                />
                <TextInputForm
                    label="Rua"
                    placeholder="123 Rua Principal"
                    {...professorCreateForm.getInputProps("address.street")}
                />
                <TextInputForm
                    label="Cidade"
                    placeholder="Cidade Exemplo"
                    {...professorCreateForm.getInputProps("address.city")}
                />
                <TextInputForm
                    label="Estado"
                    placeholder="UF"
                    {...professorCreateForm.getInputProps("address.state")}
                />
                <TextInputForm
                    label="Código Postal"
                    placeholder="12345-678"
                    {...professorCreateForm.getInputProps("address.postalCode")}
                />
                <Button color="green" type="submit" loading={createProfessorMutation.isPending}>Finalizar</Button>
            </Stack>
        </Box>
    )
}