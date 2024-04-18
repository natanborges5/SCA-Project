import { Box, Button, Select, Stack, Textarea, Title } from "@mantine/core"
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { TextInputForm } from "@/app/components/common/text.input";
import { useCreateStudentContext } from "./student-create-context";

export const CreateStudentForm = () => {
    const { createStudentMutation, studentCreateForm } = useCreateStudentContext()
    const loadingOverlay = useLoadingOverlayStore();
    const router = useRouter();
    return (
        <Box component="form" onSubmit={studentCreateForm.onSubmit(
            (data) => {
                console.log("Data no submit", data);
                loadingOverlay.toggleOn();
                const response = createStudentMutation.mutate({ ...data }, {
                    onSuccess(data, variables, context) {
                        notifications.show({
                            id: 'student-create',
                            title: 'Student criado com sucesso',
                            message: '',
                            color: 'green',
                            className: 'text-white',
                            withBorder: true,
                        });
                        console.log(data, variables, context)
                        loadingOverlay.toggleOff();
                        router.push(`/student`);
                    },
                    onError(error: any, variables, context) {
                        notifications.show({
                            id: 'student-create',
                            title: 'Falha ao criar student',
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
                <Title c={"yellow"} mb={20}>Cadastrar Estudante</Title>
                <TextInputForm label="Nome do Student" placeholder={"Marcio..."}{...studentCreateForm.getInputProps("name")} />
                <TextInputForm label="Email" placeholder={"marcio@gmail.com"}{...studentCreateForm.getInputProps("email")} />
                <TextInputForm label="Numero de registro" placeholder={"323231"}{...studentCreateForm.getInputProps("registration")} />
                <TextInputForm label="Telefone" placeholder={"21 9999..."}{...studentCreateForm.getInputProps("phone")} />
                <TextInputForm label="GPT" placeholder={"8.5"}{...studentCreateForm.getInputProps("gpt")} />
                <TextInputForm
                    label="Rua"
                    placeholder="123 Rua Principal"
                    {...studentCreateForm.getInputProps("address.street")}
                />
                <TextInputForm
                    label="Cidade"
                    placeholder="Cidade Exemplo"
                    {...studentCreateForm.getInputProps("address.city")}
                />
                <TextInputForm
                    label="Estado"
                    placeholder="UF"
                    {...studentCreateForm.getInputProps("address.state")}
                />
                <TextInputForm
                    label="Código Postal"
                    placeholder="12345-678"
                    {...studentCreateForm.getInputProps("address.postalCode")}
                />
                <Button color="green" type="submit" loading={createStudentMutation.isPending}>Finalizar</Button>
            </Stack>
        </Box>
    )
}