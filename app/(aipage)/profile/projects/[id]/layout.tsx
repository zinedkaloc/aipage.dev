import { ReactNode } from "react";
import { fetchProjectById } from "@/utils/auth";
import { notFound } from "next/navigation";
import { SetProject } from "@/hooks/useProject";

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
  if (!project || project?.deletedAt) return notFound();

  return (
    <>
      <SetProject project={project} />
      {children}
    </>
  );
}
