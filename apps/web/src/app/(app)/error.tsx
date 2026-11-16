"use client";

import { useEffect } from "react";
import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { ErrorState } from "@repo/ui/components/error-state";

// A whole page failed. The header stays, so the menu still works.
export default function PageError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      size="page"
      title="This page didn't load"
      description="Something went wrong on our side or with the connection. Try again, or go back to the dashboard."
      onRetry={retry}
      secondaryAction={
        <Button variant="ghost" asChild>
          <Link href="/">
            <House />
            Back to home
          </Link>
        </Button>
      }
    />
  );
}
