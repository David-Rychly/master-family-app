import { Loading, SkeletonCard, SkeletonHeading } from "@repo/ui/components/skeleton";
import { DASHBOARD_CARDS } from "@/modules/dashboard";

// Shown while the dashboard loads: the same shape as the real page.
export default function DashboardLoading() {
  return (
    <Loading label="Loading your day" className="flex flex-col gap-10 sm:gap-12">
      <SkeletonHeading />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {DASHBOARD_CARDS.map(({ module, skeletonRows }) => (
          <SkeletonCard key={module.id} rows={skeletonRows} />
        ))}
      </div>
    </Loading>
  );
}
