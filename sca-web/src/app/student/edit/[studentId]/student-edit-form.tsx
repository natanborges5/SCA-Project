import { Box, Button, Input, Select, Stack, Textarea, TextInput, Title } from "@mantine/core"
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import { TextInputForm } from "@/app/components/common/text.input";
import { useEditStudentContext } from "./student-edit-context";
const titleOptions = [
    { label: "Student", value: "STUDENT" },
    { label: "Associate Student", value: "ASSOCIATE_STUDENT" },
    { label: "Assistant Student", value: "ASSISTANT_STUDENT" },
    { label: "Instructor", value: "INSTRUCTOR" },
    { label: "Lecturer", value: "LECTURER" }
];

const contractTypeOptions = [
    { label: "Full Time", value: "FULL_TIME" },
    { label: "Part Time", value: "PART_TIME" },
    { label: "Visiting", value: "VISITING" },
    { label: "Adjunct", value: "ADJUNCT" }
];
export const CreateStudentForm = () => {
    const { studentEditForm, updateStudentMutation } = useEditStudentContext()
    const loadingOverlay = useLoadingOverlayStore();
    const router = useRouter();
    return (
        <Box component="form" onSubmit={studentEditForm.onSubmit(
            (data) => {
                console.log("Data no submit", data);
                loadingOverlay.toggleOn();
                const response = updateStudentMutation.mutate({ ...data }, {
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
                <Title c={"yellow"} mb={20}>Editar Estudante</Title>
                <TextInputForm label="Nome do Student" placeholder={"Marcio..."}{...studentEditForm.getInputProps("name")} />
                <TextInputForm label="Email" placeholder={"marcio@gmail.com"}{...studentEditForm.getInputProps("email")} />
                <TextInputForm label="Numero de registro" placeholder={"323231"}{...studentEditForm.getInputProps("registration")} />
                <TextInputForm label="Telefone" placeholder={"21 9999..."}{...studentEditForm.getInputProps("phone")} />
                <TextInputForm label="GPT" placeholder={"8.5"}{...studentEditForm.getInputProps("gpt")} />
                <TextInputForm
                    label="Rua"
                    placeholder="123 Rua Principal"
                    {...studentEditForm.getInputProps("address.street")}
                />
                <TextInputForm
                    label="Cidade"
                    placeholder="Cidade Exemplo"
                    {...studentEditForm.getInputProps("address.city")}
                />
                <TextInputForm
                    label="Estado"
                    placeholder="UF"
                    {...studentEditForm.getInputProps("address.state")}
                />
                <TextInputForm
                    label="Código Postal"
                    placeholder="12345-678"
                    {...studentEditForm.getInputProps("address.postalCode")}
                />
                <Button color="green" type="submit" loading={updateStudentMutation.isPending}>Finalizar</Button>
            </Stack>
        </Box>
    )
}