import { useApiClients } from "@/app/api-clients";
import { Box, Button, Center, Grid, GridCol, Group, Loader, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
export const ListStudent = () => {
    const { reactQuery } = useApiClients();
    const fetchStudentsQuery = reactQuery.queries.useFetchStudentList();
    const students = useMemo(() => fetchStudentsQuery.data, [fetchStudentsQuery.data])
    const deleteStudent = async (id: number) => {
        await reactQuery.requests.deleteStudentById(id)
        fetchStudentsQuery.refetch()
    }
    return (
        <Box>
            {fetchStudentsQuery.isLoading ? <Center><Loader color="yellow" /></Center> : <Grid>
                {students.map((student, index) => (
                    <GridCol span={4} key={index}>
                        <Stack gap={"sm"} className="bg-yellow-400 p-3 rounded-md">
                            <Text className="font-semibold">Nome: {student?.name}</Text>
                            <Text className="font-semibold">Email: {student?.email}</Text>
                            <Text><span className="font-semibold">Nota média: </span>{student?.gpt}</Text>
                            <Group justify="space-between">
                                <Text><span className="font-semibold">Celular: </span>{student?.phone}</Text>
                                <Text><span className="font-semibold">Registro: </span>{student.registration}</Text>
                            </Group>
                            <Button color="dark" rightSection={<CiEdit />} component="a" href={`/student/edit/${student.id}`}>Editar</Button>
                            <Button color="red" rightSection={<MdDelete />} onClick={() => deleteStudent(student.id)}>Deletar</Button>
                        </Stack>
                    </GridCol>
                ))}
            </Grid>}
        </Box>
    )
}