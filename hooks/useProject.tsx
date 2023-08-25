"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Domain, Project } from "@/types";
import { useEffect } from "react";
import useProjectList from "@/hooks/useProjectList";

interface ProjectStore {
  project: Project | null;
  setProject: (project: Project | null) => void;
  addDomain: (domain: Domain) => void;
}

const useProject = create<ProjectStore>()(
  devtools(
    (set) => ({
      project: null,
      setProject: (project) => {
        set({ project });
        useProjectList.setState((prev) => {
          const projects = prev.projects.map((p) =>
            p._id === project?._id ? project : p,
          );
          return { projects };
        });
      },
      addDomain: (domain) => {
        set((prev) => {
          if (!prev.project) return prev;
          const project = {
            ...prev.project,
            domains: [...prev.project.domains, domain],
          };
          return { project };
        });
      },
    }),
    {
      name: "project-storage",
    },
  ),
);

export function SetProject({ project }: { project: Project | null }) {
  useEffect(() => {
    useProject.setState({ project });
  }, []);

  return <></>;
}

export default useProject;
