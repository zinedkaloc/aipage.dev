import { ReactNode } from "react";
import { fetchProjectById } from "@/utils/auth";
import { ProjectProvider } from "@/context/ProjectContext";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    id: string;
  };
}) {
  const project = await fetchProjectById(params.id);
  return (
    <ProjectProvider project={project}>
      <div className="mx-auto project-detail-page grid flex-1 w-full max-w-screen-2xl py-4 sm:py-10 px-2.5 lg:px-20">
        <div className="h-full flex-1 grid">{children}</div>
      </div>
    </ProjectProvider>
  );
}
