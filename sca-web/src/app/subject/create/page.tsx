"use client"
import { BaseLayout } from "@/app/components/base.layout";
import { EdgeBox } from "@/app/components/edge-box";
import { CreateSubjectForm } from "./subject-create-form";
import { CreateSubjectProvider } from "./subject-create-context";

export default function Home() {
    return <BaseLayout>
        <EdgeBox>
            <CreateSubjectProvider>
                <CreateSubjectForm />
            </CreateSubjectProvider>
        </EdgeBox>
    </BaseLayout>;
}