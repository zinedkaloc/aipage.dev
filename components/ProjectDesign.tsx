"use client";

import { Project } from "@/types";
import EditPanel from "@/components/EditPanel";
import BrowserWindow from "@/components/BrowserWindow";
import { useRef } from "react";

interface ProjectDesignProps {
  project: Project;
}
export default function ProjectDesign(props: ProjectDesignProps) {
  const iframe = useRef<HTMLIFrameElement>(null);
  return (
    <div className="w-full h-full max-h-[calc(100vh-168px)] grid items-start gap-4 sm:grid-cols-[200px_1fr] xl:grid-cols-[300px_1fr]">
      <div className="border rounded-xl overflow-y-auto h-full max-h-[calc(100vh-168px)]">
        <EditPanel iframe={iframe} id={props.project._id} />
      </div>
      <BrowserWindow className="w-full h-full max-h-[calc(100vh-168px)]">
        <iframe
          ref={iframe}
          className="w-full h-full"
          srcDoc={props.project?.result}
        />
      </BrowserWindow>
    </div>
  );
}
