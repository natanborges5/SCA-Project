import { useApiClients } from "@/app/api-clients";
import { Box, Button, Center, Grid, GridCol, Group, Loader, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
export const ListProfessor = () => {
    const { reactQuery } = useApiClients();
    const fetchProfessorsQuery = reactQuery.queries.useFetchProfessorList();
    const professors = useMemo(() => fetchProfessorsQuery.data, [fetchProfessorsQuery.data])
    const deleteProfessor = async (id: number) => {
        await reactQuery.requests.deleteProfessorById(id)
        fetchProfessorsQuery.refetch()
    }
    return (
        <Box>
            {fetchProfessorsQuery.isLoading ? <Center><Loader color="yellow" /></Center> : <Grid>
                {professors.map((professor, index) => (
                    <GridCol span={4} key={index}>
                        <Stack gap={"sm"} className="bg-yellow-400 p-3 rounded-md">
                            <Text className="font-semibold">Nome: {professor?.name}</Text>
                            <Text className="font-semibold">Email: {professor?.email}</Text>
                            <Group justify="space-between">
                                <Text><span className="font-semibold">Titulo: </span>{professor?.title}</Text>
                                <Text><span className="font-semibold">Contrato: </span>{professor?.contractType}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text><span className="font-semibold">Celular: </span>{professor?.phone}</Text>
                                <Text><span className="font-semibold">Registro: </span>{professor.registration}</Text>
                            </Group>
                            <Text>{professor?.curriculum}</Text>
                            <Button color="dark" rightSection={<CiEdit />} component="a" href={`/professor/edit/${professor.id}`}>Editar</Button>
                            <Button color="red" rightSection={<MdDelete />} onClick={() => deleteProfessor(professor.id)}>Deletar</Button>
                        </Stack>
                    </GridCol>
                ))}
            </Grid>}
        </Box>
    )
}