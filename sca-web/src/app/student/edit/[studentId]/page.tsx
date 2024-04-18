"use client"
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { CreateStudentForm } from "./student-edit-form";
import { useApiClients } from "@/app/api-clients";
import { useMemo } from "react";
import { EditStudentProvider } from "./student-edit-context";
import { Center, Loader } from "@mantine/core";

export default function Home({ params }: { params: { studentId: number } }) {
    const { reactQuery } = useApiClients();
    const findStudentQuery = reactQuery.queries.useGetStudentById(params.studentId);
    const student = useMemo(() => findStudentQuery.data, [findStudentQuery.data])
    return <BaseLayout>
        <EdgeBox>
            {findStudentQuery.isLoading ? <Center><Loader /></Center> : <EditStudentProvider studentId={params.studentId} initialValues={student}>
                <CreateStudentForm />
            </EditStudentProvider>}
        </EdgeBox>
    </BaseLayout>;
}