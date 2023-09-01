import { fetchProjectById } from "@/utils/auth";
import { notFound } from "next/navigation";
import HTMLPreview from "@/components/HTMLPreview";

export default async function projectPreview({
  params,
}: {
  params: { id: string };
}) {
  const project = await fetchProjectById(params.id);
  if (!project || !project.result) return notFound();
  return <HTMLPreview html={project.result} />;
}
