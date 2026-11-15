import { Clock, Plus, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Progress } from "@repo/ui/components/progress";
import { cn } from "@repo/ui/lib/utils";
import { budget, chores, meals, shopping, today, tomorrow, type EventItem } from "@/lib/mock-dashboard";
import { StatCard, StatValue } from "./stat-card";

function EventRow({ event }: { event: EventItem }) {
  const done = event.status === "done";
  const soon = event.status === "soon";
  return (
    <li className={cn("flex items-center gap-3 border-t py-3.5 first:border-t-0", done && "opacity-55")}>
      <span className={cn("type-num w-11 shrink-0 text-muted-foreground", soon && "text-primary")}>{event.time}</span>
      <div className="min-w-0 flex-1">
        <div className={cn("truncate", soon && "font-semibold", done && "line-through")}>{event.title}</div>
        {event.meta ? <div className="type-small truncate text-muted-foreground">{event.meta}</div> : null}
      </div>
      {soon ? (
        <Badge variant="warning">
          <Clock />
          Soon
        </Badge>
      ) : event.who ? (
        <Avatar className="size-7">
          <AvatarFallback>{event.who}</AvatarFallback>
        </Avatar>
      ) : (
        <span className="grid size-7 place-items-center rounded-full bg-surface-3 text-muted-foreground">
          <Users className="size-4" strokeWidth={1.75} aria-label="Everyone" />
        </span>
      )}
    </li>
  );
}

export function TodayCard({ className }: { className?: string }) {
  const remaining = today.filter((e) => e.status !== "done").length;
  return (
    <StatCard label="Today" href="/calendar" linkLabel="Open Calendar" className={className}>
      <div className="flex items-baseline gap-2.5">
        <span className="type-stat text-primary">{today.length}</span>
        <span className="type-small text-muted-foreground">events · {remaining} still to come</span>
      </div>
      <ul className="flex flex-col">
        {today.map((event) => (
          <EventRow key={event.time + event.title} event={event} />
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-2.5 border-t pt-4">
        <span className="type-label text-subtle">Tomorrow</span>
        {tomorrow.map((event) => (
          <div key={event.time} className="type-small flex gap-3 text-muted-foreground">
            <span className="type-num w-11 shrink-0">{event.time}</span>
            <span>{event.title}</span>
          </div>
        ))}
      </div>
    </StatCard>
  );
}

export function ChoresCard() {
  return (
    <StatCard label="Chores this week" href="/chores" linkLabel="Open Chores">
      <StatValue
        value={
          <>
            <span className="text-primary">{chores.done}</span>
            <span className="text-subtle"> / {chores.total}</span>
          </>
        }
        meta={`${chores.total - chores.done} left before Sunday night`}
      />
      <ul className="flex flex-col gap-2.5">
        {chores.people.map((p) => (
          <li key={p.name} className="type-small grid grid-cols-[44px_minmax(0,1fr)_32px] items-center gap-2.5">
            <span>{p.name}</span>
            <Progress value={(p.done / p.total) * 100} aria-label={`${p.name}: ${p.done} of ${p.total} done`} />
            <span className="type-num text-right text-muted-foreground">
              {p.done}/{p.total}
            </span>
          </li>
        ))}
      </ul>
    </StatCard>
  );
}

export function ShoppingCard() {
  const rest = shopping.count - shopping.preview.length;
  return (
    <StatCard label="Shopping list" href="/shopping" linkLabel="Open Shopping">
      <StatValue value={shopping.count} meta={`items · ${shopping.lastChange}`} />
      <div className="flex flex-wrap gap-2">
        {shopping.preview.map((item) => (
          <Badge key={item} className="px-2.5 py-1 text-[13px]">
            {item}
          </Badge>
        ))}
        {rest > 0 ? <Badge className="px-2.5 py-1 text-[13px] text-subtle">+{rest}</Badge> : null}
      </div>
      <Button variant="outline" size="sm" className="mt-auto self-start">
        <Plus />
        Add item
      </Button>
    </StatCard>
  );
}

export function MealsCard() {
  return (
    <StatCard label="Meals this week" href="/meals" linkLabel="Open Meals">
      <div>
        <div className="type-h2">Tonight: {meals.tonight.toLowerCase()}</div>
        <div className="type-small text-muted-foreground">Tomorrow: {meals.tomorrow.toLowerCase()}</div>
      </div>
      <ol className="mt-auto grid grid-cols-7 gap-1.5" aria-label="Meals planned this week">
        {meals.week.map((day, i) => {
          const isToday = i === meals.todayIndex;
          return (
            <li
              key={i}
              className={cn(
                "flex flex-col items-center gap-1.5 text-[11px] text-subtle",
                isToday && "font-semibold text-primary",
              )}
            >
              {day}
              <span className={cn("h-7 w-full rounded-sm bg-secondary", isToday && "bg-primary")} />
            </li>
          );
        })}
      </ol>
    </StatCard>
  );
}

export function BudgetCard() {
  return (
    <StatCard label={`${budget.month} budget`} href="/budget" linkLabel="Open Budget">
      <StatValue
        value={
          <>
            {budget.usedPercent}
            <span className="text-subtle">%</span>
          </>
        }
        meta={`used, with ${budget.daysInMonth - budget.day} days to go`}
      />
      <div className="mt-auto flex flex-col gap-2">
        <Progress value={budget.usedPercent} aria-label={`${budget.usedPercent}% of the budget used`} />
        <div className="flex justify-between text-xs text-subtle">
          <span>On track</span>
          <span className="type-num text-xs">
            day {budget.day} of {budget.daysInMonth}
          </span>
        </div>
      </div>
    </StatCard>
  );
}
