"use client"
import { useApiClients } from "@/app/api-clients";
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { Center, Loader } from "@mantine/core";
import { useMemo } from "react";
import { EditStudyClassProvider } from "./studyClass-edit-context";
import { EditStudyClassForm } from "./studyClass-edit-form";

export default function Home({ params }: { params: { studyClassId: number } }) {
    const { reactQuery } = useApiClients();
    const findStudyClassQuery = reactQuery.queries.useGetStudyClassById(params.studyClassId);
    const studyClass = useMemo(() => findStudyClassQuery.data, [findStudyClassQuery.data])
    return <BaseLayout>
        <EdgeBox>
            {findStudyClassQuery.isLoading ? <Center><Loader /></Center> : <EditStudyClassProvider studyClassId={params.studyClassId} initialValues={studyClass}>
                <EditStudyClassForm />
            </EditStudyClassProvider>}
        </EdgeBox>
    </BaseLayout>;
}
