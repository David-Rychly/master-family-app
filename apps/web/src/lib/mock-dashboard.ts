import type { ModuleId } from "./modules";

// Example data until the API serves it: who is signed in, and the menu's one-line summaries.

export const currentMember = { name: "Mom", initial: "M", role: "Parent" };

export const familyInitials = ["M", "D", "E", "L"];

// One-line summary per module, shown in the full-page menu.
export const moduleSummaries: Record<ModuleId, string> = {
  home: "Dashboard",
  fuel: "Latest prices nearby",
};
