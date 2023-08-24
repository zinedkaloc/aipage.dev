import LoadingSpinner from "@/components/loadingSpinner";

export default function ProjectByIdLoading() {
  return (
    <div className="w-full mx-auto flex h-full items-center justify-center max-w-screen-xl p-6">
      <LoadingSpinner />
    </div>
  );
}
