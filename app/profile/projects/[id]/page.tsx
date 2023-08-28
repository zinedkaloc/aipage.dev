import BrowserWindow from "@/components/BrowserWindow";
import { fetchProjectById, fetchProjects } from "@/utils/auth";
import { SetProjects } from "@/hooks/useProjectList";

export default async function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const projects = await fetchProjects();
  const project = await fetchProjectById(params.id);

  return (
    <div className="mx-auto project-detail-page grid flex-1 w-full max-w-screen-2xl py-4 sm:py-6 px-2.5 lg:px-20">
      <SetProjects projects={projects ?? []} />
      <div className="h-full flex-1 grid">
        <div className="flex-1">
          {project?.result ? (
            <div className="w-full h-full grid items-start gap-4 sm:grid-cols-[200px_1fr] xl:grid-cols-[300px_1fr]">
              <div className="border rounded-xl h-full p-4"></div>
              <BrowserWindow className="w-full h-full">
                <iframe className="w-full h-full" srcDoc={project?.result} />
              </BrowserWindow>
            </div>
          ) : (
            <div className="flex-1 h-full flex items-center justify-center text-gray-400">
              No HTML to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
