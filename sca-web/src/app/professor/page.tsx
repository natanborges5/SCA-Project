"use client"
import { Button, Group, Stack } from "@mantine/core";
import { BaseLayout } from "../components/base.layout"
import { EdgeBox } from "../components/edge-box";
import { SectionTitle } from "../components/SectionTitle";
import { ListProfessor } from "./list/list-professor";
import { FaPlus } from "react-icons/fa6";

export default function Home() {
    return <BaseLayout>
        <EdgeBox>
            <Stack>
                <Group justify="space-between">
                    <SectionTitle textValue="Professores" />
                    <Button component="a" color="yellow" href="/professor/create" rightSection={<FaPlus />}>Cadastrar Professor</Button>
                </Group>
                <ListProfessor />
            </Stack>
        </EdgeBox>
    </BaseLayout>
}