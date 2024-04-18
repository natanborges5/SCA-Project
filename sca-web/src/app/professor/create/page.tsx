"use client"
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { CreateProfessorForm } from "./professor-create-form";
import { CreateProfessorProvider } from "./professor-create-context";

export default function Home() {
    return <BaseLayout>
        <EdgeBox>
            <CreateProfessorProvider>
                <CreateProfessorForm />
            </CreateProfessorProvider>
        </EdgeBox>
    </BaseLayout>;
}