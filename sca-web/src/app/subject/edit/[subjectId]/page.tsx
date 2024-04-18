"use client"
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { CreateSubjectForm } from "./subject-edit-form";
import { useApiClients } from "@/app/api-clients";
import { useMemo } from "react";
import { EditSubjectProvider } from "./subject-edit-context";
import { Center, Loader } from "@mantine/core";

export default function Home({ params }: { params: { subjectId: number } }) {
    const { reactQuery } = useApiClients();
    const findSubjectQuery = reactQuery.queries.useGetSubjectById(params.subjectId);
    const subject = useMemo(() => findSubjectQuery.data, [findSubjectQuery.data])
    return <BaseLayout>
        <EdgeBox>
            {findSubjectQuery.isLoading ? <Center><Loader /></Center> : <EditSubjectProvider subjectId={params.subjectId} initialValues={subject}>
                <CreateSubjectForm />
            </EditSubjectProvider>}
        </EdgeBox>
    </BaseLayout>;
}