import {
  CalendarDays,
  House,
  ListChecks,
  type LucideIcon,
  ShoppingBasket,
  StickyNote,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

export type ModuleId =
  | "home"
  | "calendar"
  | "shopping"
  | "chores"
  | "meals"
  | "budget"
  | "notes"
  | "family";

export type AppModule = {
  id: ModuleId;
  name: string;
  href: string;
  icon: LucideIcon;
};

// Fixed order of modules in the full-page menu. One icon per module, used everywhere.
export const MODULES: AppModule[] = [
  { id: "home", name: "Home", href: "/", icon: House },
  { id: "calendar", name: "Calendar", href: "/calendar", icon: CalendarDays },
  { id: "shopping", name: "Shopping", href: "/shopping", icon: ShoppingBasket },
  { id: "chores", name: "Chores", href: "/chores", icon: ListChecks },
  { id: "meals", name: "Meals", href: "/meals", icon: UtensilsCrossed },
  { id: "budget", name: "Budget", href: "/budget", icon: Wallet },
  { id: "notes", name: "Notes", href: "/notes", icon: StickyNote },
  { id: "family", name: "Family", href: "/family", icon: Users },
];

export function findModule(id: string) {
  return MODULES.find((m) => m.id === id);
}
