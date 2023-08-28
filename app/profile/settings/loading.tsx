import LoadingSpinner from "@/components/loadingSpinner";

export default function SettingsLoading() {
  return (
    <div className="w-ful mx-auto l flex h-full items-center justify-center max-w-screen-xl p-6">
      <LoadingSpinner />
    </div>
  );
}
