"use client";

import DomainCard from "@/components/DomainCard";
import useProject from "@/hooks/useProject";
import { toReversed } from "@/utils/helpers";

export default function ProjectDomains() {
  const { project } = useProject();
  const hasDomains = !!(project && project?.domains.length > 0);
  return (
    <div className="flex flex-col gap-4">
      {hasDomains &&
        toReversed(project?.domains).map((domain) => (
          <DomainCard
            domain={domain}
            key={domain._id}
            props={{
              type: "rewrite",
              primary: domain.isPrimary,
              slug: domain.domain,
              target: "https://google.com",
              verified: domain.status === "Valid Configuration",
            }}
          />
        ))}
    </div>
  );
}
