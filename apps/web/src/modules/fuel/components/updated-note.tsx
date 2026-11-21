import { TriangleAlert } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import { formatDayMonth, formatUpdated, isStale } from "../lib";

/** When prices were last updated, with a warning once the morning update has stopped coming in. */
export function UpdatedNote({ updatedAt, now }: { updatedAt: string; now: Date }) {
  if (isStale(updatedAt, now)) {
    return (
      <Badge variant="warning">
        <TriangleAlert />
        Not updated since {formatDayMonth(updatedAt)}
      </Badge>
    );
  }
  return (
    <span className="type-small text-muted-foreground">Updated {formatUpdated(updatedAt)}</span>
  );
}
