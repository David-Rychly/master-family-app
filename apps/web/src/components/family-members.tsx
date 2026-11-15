"use client";

import { useEffect, useState } from "react";
import type { FamilyMember } from "@repo/shared";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/card";
import { fetchFamilyMembers } from "@/lib/api";

export function FamilyMembers() {
  const [members, setMembers] = useState<FamilyMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFamilyMembers()
      .then(setMembers)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Unknown error"));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      {error ? (
        <p className="text-destructive">Could not reach the API ({error}). Check that it is running on port 4000.</p>
      ) : !members ? (
        <p className="text-muted-foreground">Loading members…</p>
      ) : (
        <ul className="flex flex-col">
          {members.map((m) => (
            <li key={m.id} className="flex items-center gap-3 border-t py-3 first:border-t-0">
              <Avatar>
                <AvatarFallback>{m.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate">{m.name}</span>
              <Badge variant={m.role === "parent" ? "primary" : "default"}>{m.role === "parent" ? "Parent" : "Child"}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
