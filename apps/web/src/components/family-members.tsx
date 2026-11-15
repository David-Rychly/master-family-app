"use client";

import { useEffect, useState } from "react";
import type { FamilyMember } from "@repo/shared";
import { fetchFamilyMembers } from "@/lib/api";

export function FamilyMembers() {
  const [members, setMembers] = useState<FamilyMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFamilyMembers()
      .then(setMembers)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Unknown error"));
  }, []);

  if (error) return <p className="text-red-600">Could not reach the API: {error}</p>;
  if (!members) return <p className="text-zinc-500">Loading…</p>;

  return (
    <ul className="flex flex-col gap-2">
      {members.map((m) => (
        <li key={m.id} className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <span className="font-medium">{m.name}</span>{" "}
          <span className="text-sm text-zinc-500">({m.role})</span>
        </li>
      ))}
    </ul>
  );
}
