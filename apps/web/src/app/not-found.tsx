import Link from "next/link";
import { House, MapPinOff } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { EmptyState } from "@repo/ui/components/empty-state";
import { Logo } from "@/components/shell/logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-16 sm:gap-12 sm:px-8 sm:pt-6">
      <header className="flex h-11 items-center">
        <Logo />
      </header>
      <main>
        <EmptyState
          size="page"
          icon={<MapPinOff />}
          title="This page doesn't exist"
          description="The link may be old, or the page was moved."
          action={
            <Button asChild>
              <Link href="/">
                <House />
                Back to home
              </Link>
            </Button>
          }
        />
      </main>
    </div>
  );
}
