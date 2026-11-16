import { Suspense, type ReactNode } from "react";
import { SkeletonCard } from "@repo/ui/components/skeleton";
import { BudgetCard, ChoresCard, MealsCard, ShoppingCard, TodayCard } from "@/components/dashboard/cards";
import { Greeting, TodayDate } from "@/components/shell/greeting";
import { CardBoundary } from "@/components/states/card-boundary";
import { budget, chores, currentMember, meals, shopping, today, tomorrow } from "@/lib/mock-dashboard";

/** Each card loads and fails on its own, so one slow or broken module never blanks the dashboard. */
function CardSlot({ label, module, rows = 2, className, children }: {
  label: string;
  module: string;
  rows?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <CardBoundary label={label} title={`Couldn't load ${module}`} className={className}>
      <Suspense fallback={<SkeletonCard rows={rows} className={className} />}>{children}</Suspense>
    </CardBoundary>
  );
}

export default function Dashboard() {
  return (
    <>
      <section className="flex flex-col gap-3">
        <span className="type-label text-subtle">
          <TodayDate />
        </span>
        <h1 className="type-display text-[44px] leading-[44px] tracking-[-0.035em] text-balance sm:text-[72px] sm:leading-[70px]">
          <Greeting name={currentMember.name} />
        </h1>
        <p className="max-w-[60ch] text-[17px] leading-[26px] text-muted-foreground">
          Three things need you today. Dinner is lasagne, and it is Leo&apos;s turn to do the dishes.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <CardSlot label="Today" module="today's events" rows={4} className="md:row-span-2">
          <TodayCard today={today} tomorrow={tomorrow} className="md:row-span-2" />
        </CardSlot>
        <CardSlot label="Chores this week" module="chores">
          <ChoresCard chores={chores} />
        </CardSlot>
        <CardSlot label="Shopping list" module="the shopping list">
          <ShoppingCard shopping={shopping} />
        </CardSlot>
        <CardSlot label="Meals this week" module="meals" rows={0}>
          <MealsCard meals={meals} />
        </CardSlot>
        <CardSlot label={`${budget.month} budget`} module="the budget" rows={0}>
          <BudgetCard budget={budget} />
        </CardSlot>
      </div>
    </>
  );
}
