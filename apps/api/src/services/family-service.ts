import type { CreateFamilyMember, FamilyMember } from "@repo/shared";
import type { FamilyRepository } from "../data/family-repository";
import { mockFamilyRepository } from "../data/mock-family-repository";

// Business logic lives here. Routes stay thin so they can be ported to Nest controllers later.
export function createFamilyService(repo: FamilyRepository) {
  return {
    listMembers(): Promise<FamilyMember[]> {
      return repo.list();
    },
    addMember(input: CreateFamilyMember): Promise<FamilyMember> {
      return repo.create({ ...input, name: input.name.trim() });
    },
  };
}

// Swap mockFamilyRepository for a Drizzle-backed repository once the DB exists.
export const familyService = createFamilyService(mockFamilyRepository);
