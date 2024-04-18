import { Box, Button, NumberInput, Stack, Textarea, Title } from "@mantine/core"
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { TextInputForm } from "@/app/components/common/text.input";
import { useEditSubjectContext } from "./subject-edit-context";
export const CreateSubjectForm = () => {
    const { subjectEditForm, updateSubjectMutation } = useEditSubjectContext()
    const loadingOverlay = useLoadingOverlayStore();
    const router = useRouter();
    return (
        <Box component="form" onSubmit={subjectEditForm.onSubmit(
            (data) => {
                console.log("Data no submit", data);
                loadingOverlay.toggleOn();
                const response = updateSubjectMutation.mutate({ ...data }, {
                    onSuccess(data, variables, context) {
                        notifications.show({
                            id: 'subject-create',
                            title: 'Disciplina editada com sucesso',
                            message: '',
                            color: 'green',
                            className: 'text-white',
                            withBorder: true,
                        });
                        console.log(data, variables, context)
                        loadingOverlay.toggleOff();
                        router.push(`/subject`);
                    },
                    onError(error: any, variables, context) {
                        notifications.show({
                            id: 'subject-create',
                            title: 'Falha ao editar Disciplina',
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
                <Title c={"yellow"} mb={20}>Editar Disciplina</Title>
                <TextInputForm label="Nome da disciplina" placeholder={"Rede 2"}{...subjectEditForm.getInputProps("name")} />
                <NumberInput styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"} label="Carga horaria" placeholder={"80"}{...subjectEditForm.getInputProps("workload")} />
                <NumberInput styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"} label="Número de Créditos" placeholder={"100"}{...subjectEditForm.getInputProps("creditNumber")} />
                <Textarea styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"} label="Descrição" placeholder={"Disciplina de redes da turma 22..."}{...subjectEditForm.getInputProps("description")} />
                <Button color="green" type="submit" loading={updateSubjectMutation.isPending}>Finalizar</Button>
            </Stack>
        </Box>
    )
}