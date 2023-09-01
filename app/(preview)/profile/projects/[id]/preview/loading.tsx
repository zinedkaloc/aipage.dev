import LoadingSpinner from "@/components/loadingSpinner";

export default function PreviewLoading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
