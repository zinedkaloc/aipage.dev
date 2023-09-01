"use client";

import Button from "@/components/Button";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import LoadingSpinner from "@/components/loadingSpinner";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import useProjectList from "@/hooks/useProjectList";

export default function DeleteProjectConfirmDialog({
  project,
}: {
  project: Project | null;
}) {
  const [deleting, setDeleting] = useState(false);
  const { push, prefetch, refresh } = useRouter();
  const { deleteProject } = useProjectList();

  async function deleteProjectHandler() {
    if (!project) return;
    setDeleting(true);
    const res = await fetch("/api/project/" + project._id, {
      method: "DELETE",
    });
    const { errors } = await res.json();

    if (!errors) {
      deleteProject(project._id);
      refresh();
      push("/profile/projects");
    } else setDeleting(false);
  }

  return (
    <ConfirmDialog
      text="confirm delete project"
      trigger={
        <Button variant="danger" disabled={deleting} type="button">
          {deleting && <LoadingSpinner />}
          <p>Delete project</p>
        </Button>
      }
      onConfirm={deleteProjectHandler}
    />
  );
}
