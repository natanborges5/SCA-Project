import { useApiClients } from "@/app/api-clients";
import { Box, Button, Center, Grid, GridCol, Group, Loader, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
export const ListSubject = () => {
    const { reactQuery } = useApiClients();
    const fetchSubjectsQuery = reactQuery.queries.useFetchSubjectList();
    const subjects = useMemo(() => fetchSubjectsQuery.data, [fetchSubjectsQuery.data])
    const deleteSubject = async (id: number) => {
        await reactQuery.requests.deleteSubjectById(id)
        fetchSubjectsQuery.refetch()
    }
    return (
        <Box>
            {fetchSubjectsQuery.isLoading ? <Center><Loader color="yellow" /></Center> : <Grid>
                {subjects.map((subject, index) => (
                    <GridCol span={4} key={index}>
                        <Stack gap={"sm"} className="bg-yellow-400 p-3 rounded-md">
                            <Text className="font-semibold">Nome: {subject?.name}</Text>
                            <Group justify="space-between">
                                <Text><span className="font-semibold">Carga Horaria: </span>{subject?.workload}</Text>
                                <Text><span className="font-semibold">Numero de credito: </span>{subject.creditNumber}</Text>
                            </Group>
                            <Text className="font-semibold">{subject?.description}</Text>
                            <Button color="dark" rightSection={<CiEdit />} component="a" href={`/subject/edit/${subject.id}`}>Editar</Button>
                            <Button color="red" rightSection={<MdDelete />} onClick={() => deleteSubject(subject.id)}>Deletar</Button>
                        </Stack>
                    </GridCol>
                ))}
            </Grid>}
        </Box>
    )
}