import type { CreateFamilyMember, FamilyMember } from "@repo/shared/family";

export interface FamilyRepository {
  list(): Promise<FamilyMember[]>;
  create(input: CreateFamilyMember): Promise<FamilyMember>;
}
