"use client";

import { useProject } from "@/context/ProjectContext";
import BrowserWindow from "@/components/BrowserWindow";

export default function ProjectDetail() {
  const { project } = useProject();
  return (
    <div className="flex-1">
      <BrowserWindow className="w-full h-full">
        <iframe className="w-full h-full" srcDoc={project?.result} />
      </BrowserWindow>
    </div>
  );
}
