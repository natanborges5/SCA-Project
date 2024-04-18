import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { Box, Button, Group, MultiSelect, Select, Stack, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEditStudyClassContext } from "./studyClass-edit-context";
import { StudyClassRequestDto } from "@/lib/react-query";
import { notifications } from "@mantine/notifications";
import { TimeInput } from "@mantine/dates";
import { TextInputForm } from "@/app/components/common/text.input";

export const EditStudyClassForm = () => {
    const { updateStudyClassMutation, studyClassEditForm, professors, students, subjects } = useEditStudyClassContext()
    const loadingOverlay = useLoadingOverlayStore();
    const router = useRouter();
    return (
        <Box component="form" onSubmit={studyClassEditForm.onSubmit(
            (data) => {
                const parsedValues: StudyClassRequestDto = {
                    ...data,
                    subjectId: typeof data.subjectId === "string" && parseInt(data.subjectId),
                    professorId: typeof data.professorId === "string" && parseInt(data.professorId),
                    studentsIds: data.studentsIds.map(item => parseInt(item))
                };
                console.log("Data no submit", data);
                loadingOverlay.toggleOn();
                updateStudyClassMutation.mutate({ ...parsedValues }, {
                    onSuccess(data, variables, context) {
                        notifications.show({
                            id: 'announcement-create',
                            title: 'Anuncio criado com sucesso',
                            message: '',
                            color: 'green',
                            className: 'text-white',
                            withBorder: true,
                        });
                        loadingOverlay.toggleOff();
                        router.push(`/`);
                    },
                    onError(error: any, variables, context) {
                        notifications.show({
                            id: 'announcement-create',
                            title: 'Falha ao criar anuncio',
                            message: error?.response?.data?.message,
                            color: 'red',
                            className: 'text-white',
                            withBorder: true
                        });
                        console.error("errors: ", data, variables, error)
                        loadingOverlay.toggleOff();
                    },
                });
            }, (errors) => {
                console.log(errors)
            })}>
            <Stack>
                <Title c={"yellow"} mb={20}>Editar Turma</Title>
                <TextInputForm
                    withAsterisk
                    label="Nome"
                    placeholder="Fisica 1 Turma 2023"
                    {...studyClassEditForm.getInputProps('name')}
                />
                <TextInputForm
                    withAsterisk
                    label="Sala"
                    placeholder="Sala 203B"
                    {...studyClassEditForm.getInputProps('classroom')}
                />
                <TextInputForm
                    withAsterisk
                    label="Codigo"
                    placeholder="23M"
                    {...studyClassEditForm.getInputProps('code')}
                />
                <TimeInput styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"} label="Horario da aula" withAsterisk withSeconds {...studyClassEditForm.getInputProps('startTime')} />
                <TextInputForm
                    withAsterisk
                    label="Descrição"
                    placeholder="Turma de fisica avançada..."
                    {...studyClassEditForm.getInputProps('description')}
                />
                <Select
                    styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"}
                    withAsterisk
                    label="Professor da turma"
                    placeholder="Selecione um professor"
                    data={professors?.map(professor => ({ label: professor.name, value: professor.id.toString() }))}
                    {...studyClassEditForm.getInputProps('professorId')}
                />
                <Select
                    styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"}
                    withAsterisk
                    label="Matéria da turma"
                    placeholder="Selecione uma matéria"
                    data={subjects?.map(subject => ({ label: subject.name, value: subject.id.toString() }))}
                    {...studyClassEditForm.getInputProps('subjectId')}
                />
                <MultiSelect
                    styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"}
                    withAsterisk
                    label="Alunos"
                    placeholder="Selecione os alunos"
                    data={students?.map(student => ({ label: student.name, value: student.id.toString() }))}
                    {...studyClassEditForm.getInputProps('studentsIds')}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </Stack>
        </Box>
    )
}