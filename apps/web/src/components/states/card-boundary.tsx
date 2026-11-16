"use client";

import { catchError, type ErrorInfo } from "next/error";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ErrorState } from "@repo/ui/components/error-state";

type Props = {
  /** Card eyebrow, kept so the failed card is still recognisable. */
  label: string;
  /** What failed, from the user's side: "Couldn't load chores". */
  title: string;
  className?: string;
};

function CardErrorFallback({ label, title, className }: Props, { error, retry }: ErrorInfo) {
  if (process.env.NODE_ENV !== "production") console.error(error);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <ErrorState title={title} onRetry={retry} />
    </Card>
  );
}

/** Error boundary for one dashboard card: if it fails, only that card shows an error with Retry. */
export const CardBoundary = catchError(CardErrorFallback);
