import { fetchProjects } from "@/utils/auth";
import { cn } from "@/utils/helpers";

export default async function ProfileProjects() {
  const projects = await fetchProjects();
  const hasProjects = !!projects && projects.length > 0;
  return (
    <div className="w-full px-6 py-6 bg-gray-50 h-full flex-1">
      <div
        className={cn(
          hasProjects
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            : "",
        )}
      >
        {hasProjects ? (
          <div className=" md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col space-y-10 rounded-lg border border-gray-100 bg-white relative p-6 shadow transition-all hover:shadow-lg">
            <h2 className="text-lg font-medium text-gray-600">
              You have no projects yet
            </h2>
          </div>
        ) : (
          projects?.map((project) => (
            <div
              key={project._id}
              className="flex flex-col space-y-10 rounded-lg border border-gray-100 bg-white relative p-6 shadow transition-all hover:shadow-lg"
            >
              <div className="flex h-full flex-col">
                <h2 className="text-lg font-medium text-gray-700">
                  {project.content}
                </h2>
                <div className="flex items-center">
                  <p className="text-gray-500 mb-4"></p>
                </div>
                <div className="mt-auto flex w-full justify-end">
                  <time className="text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
