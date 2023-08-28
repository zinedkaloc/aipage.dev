"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Badge, { BadgeVariant } from "@/components/Badge";
import { Project } from "@/types";
import ProjectIcon from "@/components/ProjectIcon";
import { useEffect } from "react";
import useProjectList from "@/hooks/useProjectList";
import useProject from "@/hooks/useProject";

const mails = [
  "ozgurozalp1999@gmail.com",
  "mail@ozgurozalp.com",
  "denizlevregi7@gmail.com",
  "umit@altogic.com",
  "umit.cakmak@altogic.com",
];

interface ListProjectsProps {
  projects?: Project[] | null;
}

export default function ListProjects({ projects }: ListProjectsProps) {
  const { user } = useAuth();
  const { setProject } = useProject();
  const setProjects = useProjectList((state) => state.setProjects);

  const hasPermission = mails.includes(user?.email as string);
  const Component = hasPermission ? Link : "div";

  useEffect(() => {
    setProjects(projects ?? []);
  }, []);

  return (
    <>
      {projects?.map((project) => (
        <Component
          key={project._id}
          className="flex h-full flex-col space-y-10 rounded-lg border border-gray-100 bg-white p-4 sm:p-6 transition-all"
          href={`/profile/projects/${project._id}`}
          onClick={() => setProject(project)}
        >
          <div className="flex flex-1 items-start justify-between gap-1">
            <div className="flex space-x-3 flex-1">
              <ProjectIcon className="shrink-0 self-start" />
              <div className="flex-1">
                <h2 className="text-lg leading-[1.2] font-medium text-gray-700 truncate max-w-[15ch] md:max-w-[10ch] lg:max-w-[15ch] xl:max-w-[15ch]">
                  {project.content}
                </h2>
                <div className="flex items-center">
                  <p className="text-gray-500 text-sm leading-[1]">
                    example.com
                  </p>
                </div>
              </div>
            </div>
            <Badge
              variant={badgeMap[project.status ?? "draft"]}
              text={project.status ?? "draft"}
            />
          </div>
          <div className="flex mt-auto items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx={12} cy={12} r={10} />
                <line x1={2} x2={22} y1={12} y2={12} />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <h2 className="whitespace-nowrap text-sm">
                {project.domains ? project.domains.length : 0}{" "}
                {project.domains?.length > 1 ? "domains" : "domain"}
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1={18} x2={18} y1={20} y2={10} />
                <line x1={12} x2={12} y1={20} y2={4} />
                <line x1={6} x2={6} y1={20} y2={14} />
              </svg>
              <h2 className="whitespace-nowrap text-sm">
                {project.click ?? 0}
                {project.click > 1 ? " clicks" : " click"}
              </h2>
            </div>
          </div>
        </Component>
      ))}
    </>
  );
}

const badgeMap: Record<string, BadgeVariant> = {
  draft: "black",
  live: "green",
};
