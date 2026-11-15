import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { familyInitials } from "@/lib/mock-dashboard";
import { FullPageMenu } from "./full-page-menu";
import { Logo } from "./logo";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <Logo />
      <div className="flex items-center gap-4">
        <div className="hidden -space-x-2 sm:flex" aria-label="Family members">
          {familyInitials.map((initial) => (
            <Avatar key={initial} className="border-2 border-background">
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <FullPageMenu />
      </div>
    </header>
  );
}
