import type { CreateFamilyMember, FamilyMember } from "@repo/shared";

export interface FamilyRepository {
  list(): Promise<FamilyMember[]>;
  create(input: CreateFamilyMember): Promise<FamilyMember>;
}
