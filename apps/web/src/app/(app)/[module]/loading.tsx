import { Loading, Skeleton, SkeletonCard } from "@repo/ui/components/skeleton";

// Shown while a module page loads.
export default function ModuleLoading() {
  return (
    <Loading label="Loading" className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Skeleton className="size-13 rounded-md" />
        <Skeleton className="h-9 w-48" />
      </div>
      <SkeletonCard rows={4} className="max-w-xl" />
    </Loading>
  );
}
