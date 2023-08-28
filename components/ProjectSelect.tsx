import { ChevronsUpDown, PlusCircle, Check } from "lucide-react";
import Link from "next/link";
import Popover from "@/components/Popover";
import ProjectIcon from "@/components/ProjectIcon";
import { usePathname } from "next/navigation";
import useProjectList from "@/hooks/useProjectList";
import useProject from "@/hooks/useProject";
import { useEffect } from "react";

export default function ProjectSelect() {
  const { project } = useProject();

  return (
    <div>
      <Popover content={<ProjectList />}>
        <button className="flex items-center justify-between rounded-lg bg-white p-1.5 text-left text-sm transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200">
          <div className="flex items-center space-x-3 pr-2">
            <ProjectIcon className="h-7 w-7 shrink-0" />
            <div className="flex items-center space-x-3 sm:flex">
              <span className="inline-block truncate text-sm font-medium max-w-[15ch]">
                {project?.name ?? project?.content}
              </span>
            </div>
          </div>
          <ChevronsUpDown
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </Popover>
    </div>
  );
}

function ProjectList() {
  const { projects } = useProjectList();
  const { setProject } = useProject();
  const pathname = usePathname();

  return (
    <div className="relative mt-1 max-h-72 w-full space-y-0.5 rounded-md bg-white p-2 text-base sm:w-60 sm:text-sm sm:shadow-lg">
      <div className="p-2 text-xs text-gray-500">Projects</div>
      <div className="overflow-y-auto scrollbar-hide max-h-[200px]">
        {projects.map((project) => (
          <Popover.Item asChild key={project._id}>
            <Link
              className="relative flex w-full items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-100 active:bg-gray-200 transition-all duration-75 outline-none focus:outline-none"
              href={`/profile/projects/${project._id}`}
              onClick={() => setProject(project)}
              shallow={false}
            >
              <ProjectIcon className="h-7 w-7 shrink-0" />
              <span
                title={project.content}
                className="block truncate text-sm max-w-[15ch]"
              >
                {project?.name ?? project?.content}
              </span>
              {pathname.includes(`/profile/projects/${project._id}`) && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </Link>
          </Popover.Item>
        ))}
      </div>
      <Link
        href="/"
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md p-2 transition-all duration-75 hover:bg-gray-100"
      >
        <PlusCircle className="h-6 w-6 text-gray-500" />
        <span className="block truncate">Add a new project</span>
      </Link>
    </div>
  );
}
