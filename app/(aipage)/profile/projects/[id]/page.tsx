import { fetchProjectById, fetchProjects } from "@/utils/auth";
import { SetProjects } from "@/hooks/useProjectList";
import { SetProject } from "@/hooks/useProject";
import { FormEvent } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Drawer";
import Button from "@/components/Button";
import ProjectDesign from "@/components/ProjectDesign";

export const revalidate = 0;

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
      <SetProject project={project ?? null} />
      <div className="h-full flex-1 grid">
        <div className="flex-1">
          {project?.result ? (
            <ProjectDesign project={project} />
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

interface PanelProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  selected?: HTMLElement | null;
  onSave: (values: [string, string][]) => void;
}
function Panel(props: PanelProps) {
  const { open, onOpenChange, selected, onSave } = props;
  const includedKeys = [
    "padding",
    "color",
    "width",
    "height",
    "margin",
    "fontSize",
    "display",
    "position",
    "top",
    "left",
    "right",
    "bottom",
    "border",
    "background",
    "transform",
  ];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const formData = new FormData(e.target as HTMLFormElement);
    onSave?.(Array.from(formData.entries()) as [string, string][]);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="px-0">
        <form
          onSubmit={onSubmit}
          className="grid gap-0 max-h-full grid-rows-[auto_1fr_60px] px-0 h-full"
        >
          <SheetHeader className="sticky border-b px-6 py-4 top-0 bg-white">
            <SheetTitle>Edit selected section</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-6 py-4 overflow-y-auto">
            <div>
              <label>Text Content</label>
              <input
                name="textContent"
                className="border-gray-200 rounded w-full"
                type="text"
                defaultValue={selected?.innerText}
              />
            </div>
            {selected &&
              Object.entries(getComputedStyle(selected))
                .filter(
                  ([key]) =>
                    !key.match(/\d/) &&
                    includedKeys.includes(key) &&
                    !key.startsWith("webkit"),
                )
                .map(([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      name={key}
                      className="border-gray-200 rounded w-full"
                      type="text"
                      defaultValue={value}
                    />
                  </div>
                ))}
          </div>
          <SheetFooter className="px-6 py-4 border-t flex items-center">
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
