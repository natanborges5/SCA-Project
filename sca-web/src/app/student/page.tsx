"use client"
import { Button, Group, Stack } from "@mantine/core";
import { BaseLayout } from "../components/base.layout"
import { EdgeBox } from "../components/edge-box";
import { SectionTitle } from "../components/SectionTitle";
import { ListStudent } from "./list/list-student";
import { FaPlus } from "react-icons/fa6";

export default function Home() {
    return <BaseLayout>
        <EdgeBox>
            <Stack>
                <Group justify="space-between">
                    <SectionTitle textValue="Estudantes" />
                    <Button component="a" color="yellow" href="/student/create" rightSection={<FaPlus />}>Cadastrar Estudantes</Button>
                </Group>
                <ListStudent />
            </Stack>
        </EdgeBox>
    </BaseLayout>
}