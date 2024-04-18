"use client"
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { CreateProfessorForm } from "./professor-edit-form";
import { useApiClients } from "@/app/api-clients";
import { useMemo } from "react";
import { EditProfessorProvider } from "./professor-edit-context";
import { Center, Loader } from "@mantine/core";

export default function Home({ params }: { params: { professorId: number } }) {
    const { reactQuery } = useApiClients();
    const findProfessorQuery = reactQuery.queries.useGetProfessorById(params.professorId);
    const professor = useMemo(() => findProfessorQuery.data, [findProfessorQuery.data])
    return <BaseLayout>
        <EdgeBox>
            {findProfessorQuery.isLoading ? <Center><Loader /></Center> : <EditProfessorProvider professorId={params.professorId} initialValues={professor}>
                <CreateProfessorForm />
            </EditProfessorProvider>}
        </EdgeBox>
    </BaseLayout>;
}