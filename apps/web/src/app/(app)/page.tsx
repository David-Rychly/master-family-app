import { BudgetCard, ChoresCard, MealsCard, ShoppingCard, TodayCard } from "@/components/dashboard/cards";
import { Greeting, TodayDate } from "@/components/shell/greeting";
import { currentMember } from "@/lib/mock-dashboard";

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
        <TodayCard className="md:row-span-2" />
        <ChoresCard />
        <ShoppingCard />
        <MealsCard />
        <BudgetCard />
      </div>
    </>
  );
}
