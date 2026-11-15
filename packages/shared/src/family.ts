import { z } from "zod";

export const FamilyMember = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.enum(["parent", "child"]),
});
export type FamilyMember = z.infer<typeof FamilyMember>;

export const FamilyMemberList = z.array(FamilyMember);

export const CreateFamilyMember = FamilyMember.omit({ id: true });
export type CreateFamilyMember = z.infer<typeof CreateFamilyMember>;
