import { randomUUID } from "node:crypto";
import type { FamilyMember } from "@repo/shared";
import type { FamilyRepository } from "./family-repository";

// In-memory mock data. Resets on every restart.
const members: FamilyMember[] = [
  { id: "1", name: "Dad", role: "parent" },
  { id: "2", name: "Mom", role: "parent" },
];

export const mockFamilyRepository: FamilyRepository = {
  async list() {
    return [...members];
  },
  async create(input) {
    const member = { id: randomUUID(), ...input };
    members.push(member);
    return member;
  },
};
