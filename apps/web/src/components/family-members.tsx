"use client";

import { useCallback, useEffect, useState } from "react";
import { UserPlus, Users } from "lucide-react";
import type { FamilyMember } from "@repo/shared";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/card";
import { EmptyState } from "@repo/ui/components/empty-state";
import { ErrorState } from "@repo/ui/components/error-state";
import { Loading, SkeletonRows } from "@repo/ui/components/skeleton";
import { fetchFamilyMembers } from "@/lib/api";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; members: FamilyMember[] };

export function FamilyMembers() {
  const [state, setState] = useState<State>({ status: "loading" });

  const fetchMembers = useCallback(() => {
    fetchFamilyMembers()
      .then((members) => setState({ status: "ready", members }))
      .catch((e: unknown) => {
        console.error(e);
        setState({ status: "error" });
      });
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const retry = () => {
    setState({ status: "loading" });
    fetchMembers();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      {state.status === "loading" ? (
        <Loading label="Loading family members">
          <SkeletonRows rows={4} />
        </Loading>
      ) : state.status === "error" ? (
        <ErrorState title="Couldn't load family members" onRetry={retry} />
      ) : state.members.length === 0 ? (
        <EmptyState
          icon={<Users />}
          title="No one here yet"
          description="Add the people in your household so you can share lists, chores and plans."
          action={
            <Button size="sm">
              <UserPlus />
              Add member
            </Button>
          }
        />
      ) : (
        <ul className="flex flex-col">
          {state.members.map((m) => (
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
