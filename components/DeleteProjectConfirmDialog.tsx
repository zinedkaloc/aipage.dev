"use client";

import Button from "@/components/Button";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import LoadingSpinner from "@/components/loadingSpinner";
import { Project } from "@/types";
import { useRouter } from "next/navigation";

export default function DeleteProjectConfirmDialog({
  project,
}: {
  project: Project | null;
}) {
  const [deleting, setDeleting] = useState(false);
  const { push } = useRouter();

  async function deleteProjectHandler() {
    if (!project) return;
    setDeleting(true);
    const res = await fetch("/api/project/" + project._id, {
      method: "DELETE",
    });
    const { errors } = await res.json();
    setDeleting(false);
    if (!errors) push("/profile/projects");
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
