import type { ModuleId } from "./modules";

// Example data until the API serves real dashboard data.

export type EventItem = {
  time: string;
  title: string;
  meta: string;
  who?: string;
  status?: "done" | "soon";
};

export const currentMember = { name: "Mom", initial: "M", role: "Parent" };

export const familyInitials = ["M", "D", "E", "L"];

export const today: EventItem[] = [
  { time: "08:15", title: "School drop-off", meta: "Dad", who: "D", status: "done" },
  { time: "18:30", title: "Swimming, Ella", meta: "City pool · leave by 18:05", status: "soon" },
  { time: "19:30", title: "Family dinner", meta: "Lasagne · Mom cooks", who: "M" },
  { time: "20:30", title: "Call grandma", meta: "Everyone" },
];

export const tomorrow: EventItem[] = [
  { time: "07:45", title: "Leo, school trip. Packed lunch.", meta: "" },
  { time: "16:00", title: "Dentist, Ella", meta: "" },
];

export const chores = {
  done: 14,
  total: 20,
  people: [
    { name: "Ella", done: 5, total: 5 },
    { name: "Leo", done: 3, total: 5 },
    { name: "Mom", done: 3, total: 5 },
    { name: "Dad", done: 3, total: 5 },
  ],
};

export const shopping = {
  count: 7,
  lastChange: "Dad added milk 10 min ago",
  preview: ["Milk", "Eggs", "Lasagne sheets", "Apples"],
};

export const meals = {
  tonight: "Lasagne",
  tomorrow: "Chicken soup",
  week: ["M", "T", "W", "T", "F", "S", "S"],
  todayIndex: 6,
};

export const budget = { usedPercent: 68, month: "November", day: 15, daysInMonth: 30 };

// One-line live summary per module, shown in the full-page menu.
export const moduleSummaries: Record<ModuleId, string> = {
  home: "Dashboard",
  calendar: `${today.length} events today`,
  shopping: `${shopping.count} items on the list`,
  chores: `${chores.total - chores.done} left this week`,
  meals: `Tonight: ${meals.tonight.toLowerCase()}`,
  budget: `${budget.usedPercent}% of ${budget.month} used`,
  notes: "2 new from Dad",
  family: "4 members",
};
