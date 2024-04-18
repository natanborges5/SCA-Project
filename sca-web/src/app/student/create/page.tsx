"use client"
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { CreateStudentForm } from "./student-create-form";
import { CreateStudentProvider } from "./student-create-context";

export default function Home() {
    return <BaseLayout>
        <EdgeBox>
            <CreateStudentProvider>
                <CreateStudentForm />
            </CreateStudentProvider>
        </EdgeBox>
    </BaseLayout>;
}