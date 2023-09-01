import DomainCard from "@/components/DomainCard";
import { toReversed } from "@/utils/helpers";
import { fetchProjectById } from "@/utils/auth";
import { SetProject } from "@/hooks/useProject";

export default async function ProjectDomains({
  params,
}: {
  params: { id: string };
}) {
  const project = await fetchProjectById(params.id);
  const hasDomains = !!(project && project?.domains.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <SetProject project={project} />
      {hasDomains ? (
        toReversed(project?.domains).map((domain) => (
          <DomainCard domain={domain} key={domain._id} />
        ))
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
          <h2 className="z-10 text-xl font-semibold text-gray-700">
            No domains yet
          </h2>
          <img
            alt="No links yet"
            loading="lazy"
            width={500}
            className="pointer-events-none blur-0"
            src="/no-project.png"
          />
        </div>
      )}
    </div>
  );
}
