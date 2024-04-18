"use client"
import { Button, Group, Stack } from "@mantine/core";
import { BaseLayout } from "../components/base.layout"
import { EdgeBox } from "../components/edge-box";
import { SectionTitle } from "../components/SectionTitle";
import { FaPlus } from "react-icons/fa6";
import { ListSubject } from "./list/list-subject";

export default function Home() {
    return <BaseLayout>
        <EdgeBox>
            <Stack>
                <Group justify="space-between">
                    <SectionTitle textValue="Disciplina" />
                    <Button component="a" color="yellow" href="/subject/create" rightSection={<FaPlus />}>Cadastrar Disciplina</Button>
                </Group>
                <ListSubject />
            </Stack>
        </EdgeBox>
    </BaseLayout>
}