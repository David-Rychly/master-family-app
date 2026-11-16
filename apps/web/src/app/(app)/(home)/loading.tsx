import { Loading, Skeleton, SkeletonCard, SkeletonHeading } from "@repo/ui/components/skeleton";

// Shown while the dashboard loads: the same shape as the real page.
export default function DashboardLoading() {
  return (
    <Loading label="Loading your day" className="flex flex-col gap-10 sm:gap-12">
      <div className="flex flex-col gap-3">
        <SkeletonHeading />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <SkeletonCard rows={4} className="md:row-span-2" />
        <SkeletonCard rows={2} />
        <SkeletonCard rows={2} />
        <SkeletonCard rows={0} />
        <SkeletonCard rows={0} />
      </div>
    </Loading>
  );
}
