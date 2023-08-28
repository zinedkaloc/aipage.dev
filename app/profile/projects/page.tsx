import { cn } from "@/utils/helpers";
import Link from "next/link";
import Button from "@/components/Button";
import ListProjects from "@/components/ListProjects";
import { fetchProjects } from "@/utils/auth";

export default async function ProfileProjects() {
  const projects = await fetchProjects();
  const hasProjects = !!projects && projects.length > 0;

  return (
    <div className="w-full px-6 py-6 bg-gray-50 h-full flex-1 flex flex-col">
      <div
        className={cn(
          "mx-auto w-full sm:max-w-screen-2xl sm:px-2.5 lg:px-20",
          !hasProjects && "flex-1 flex flex-col",
        )}
      >
        <div
          className={cn(
            hasProjects
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
              : "flex flex-col flex-1",
          )}
        >
          {!hasProjects ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
              <h2 className="z-10 text-xl font-semibold text-gray-700">
                You don't have any projects yet!
              </h2>
              <img
                alt="No links yet"
                loading="lazy"
                width={500}
                className="pointer-events-none blur-0"
                src="/no-project.png"
              />
              <Link href="/">
                <Button variant="pill">Create a project</Button>
              </Link>
            </div>
          ) : (
            <ListProjects projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
}
