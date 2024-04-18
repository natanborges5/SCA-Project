import { StudyClassRequestDto } from "@/lib/react-query";
import { Group, Button, Center, Loader, Grid, GridCol, Modal, LoadingOverlay, TextInput, Select, MultiSelect, Stack, Text, Box } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa6";
import { SectionTitle } from "../SectionTitle";
import { useStudyClassContext } from "./studyClass-context";
import { useDisclosure } from "@mantine/hooks";
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";

export const StudyClassList = () => {
    const { studyClasses, isLoading, studyClassCreateForm, createStudyClassMutation, visible, toggle, findStudyClassQuery, professors, students, subjects } = useStudyClassContext()
    const [opened, { open, close }] = useDisclosure(false);
    const loadingOverlay = useLoadingOverlayStore();
    return (
        <Stack gap={"xl"}>
            <Group justify="space-between">
                <SectionTitle textValue="Turmas" />
                <Button rightSection={<FaPlus />} onClick={open} color="teal">Criar Turma</Button>
            </Group>
            {isLoading ? <Center mt={"5%"}><Loader color="teal" /></Center> : <Grid>
                {studyClasses?.map((item) => (
                    <GridCol key={item.id} span={3}>
                        <Stack gap={"sm"} className="bg-teal-300 p-2 rounded-md">
                            <Text className="font-semibold">{item?.name}</Text>
                            <Text><span className="font-semibold">Professor:</span>{item?.professor.name}</Text>
                            <Group justify="space-between">
                                <Text><span className="font-semibold">Codigo: </span>{item?.code}</Text>
                                <Text><span className="font-semibold">Horário: </span>{item.startTime}</Text>
                            </Group>
                            <Text>{item?.description}</Text>
                        </Stack>
                    </GridCol>
                ))}
            </Grid>}
            <Modal opened={opened} onClose={close} title="Criar nova Turma">
                <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Box component="form" onSubmit={studyClassCreateForm.onSubmit(
                    (data) => {
                        const parsedValues: StudyClassRequestDto = {
                            ...data,
                            subjectId: typeof data.subjectId === "string" && parseInt(data.subjectId),
                            professorId: typeof data.professorId === "string" && parseInt(data.professorId),
                            studentsIds: data.studentsIds.map(id => parseInt(id)),
                        };
                        console.log("Data no submit", data);
                        loadingOverlay.toggleOn();
                        createStudyClassMutation.mutate({ ...parsedValues }, {
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
                                findStudyClassQuery.refetch()
                                close()
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
                    <TextInput
                        withAsterisk
                        label="Nome"
                        placeholder="Fisica 1 Turma 2023"
                        {...studyClassCreateForm.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Sala"
                        placeholder="Sala 203B"
                        {...studyClassCreateForm.getInputProps('classroom')}
                    />
                    <TextInput
                        withAsterisk
                        label="Codigo"
                        placeholder="23M"
                        {...studyClassCreateForm.getInputProps('code')}
                    />
                    <TimeInput label="Horario da aula" withAsterisk withSeconds {...studyClassCreateForm.getInputProps('startTime')} />
                    <TextInput
                        withAsterisk
                        label="Descrição"
                        placeholder="Turma de fisica avançada..."
                        {...studyClassCreateForm.getInputProps('description')}
                    />
                    <Select
                        withAsterisk
                        label="Professor da turma"
                        placeholder="Selecione um professor"
                        data={professors?.map(professor => ({ label: professor.name, value: professor.id.toString() }))}
                        {...studyClassCreateForm.getInputProps('professorId')}
                    />
                    <Select
                        withAsterisk
                        label="Matéria da turma"
                        placeholder="Selecione uma matéria"
                        data={subjects?.map(subject => ({ label: subject.name, value: subject.id.toString() }))}
                        {...studyClassCreateForm.getInputProps('subjectId')}
                    />
                    <MultiSelect
                        withAsterisk
                        label="Alunos"
                        placeholder="Selecione os alunos"
                        data={students?.map(student => ({ label: student.name, value: student.id.toString() }))}
                        {...studyClassCreateForm.getInputProps('studentsIds')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </Box>
            </Modal>
        </Stack>
    )
}