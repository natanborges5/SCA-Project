"use client"
import { EdgeBox } from "./components/edge-box";
import { BaseLayout } from "./components/base.layout";
import { StudyClassList } from "./components/studyclass/studyClass-main";
import { StudyClassProvider } from "./components/studyclass/studyClass-context";
export default function Home() {

  return (
    <BaseLayout>
      <EdgeBox>
        <StudyClassProvider>
          <StudyClassList />
        </StudyClassProvider>
      </EdgeBox>
    </BaseLayout>

  );
}
