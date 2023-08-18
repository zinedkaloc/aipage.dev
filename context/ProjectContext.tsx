"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Project } from "@/types";

interface ProjectContextType {
  project: Project | null;
  setProject: (project: Project | null) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {},
});

interface ProjectProviderProps {
  children: ReactNode;
  project: Project | null;
}

export const ProjectProvider = ({
  project,
  children,
}: ProjectProviderProps) => {
  const [_project, setProject] = useState<Project | null>(project);

  function _setProject(project: Project | null) {
    setProject(project);
  }

  return (
    <ProjectContext.Provider
      value={{ project: _project, setProject: _setProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within ProjectProvider");
  }
  return context;
};
