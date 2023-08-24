"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Project } from "@/types";
import { useEffect } from "react";
import useProjectList from "@/hooks/useProjectList";

interface ProjectStore {
  project: Project | null;
  setProject: (project: Project | null) => void;
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
