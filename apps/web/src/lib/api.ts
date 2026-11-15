import { FamilyMemberList, type FamilyMember } from "@repo/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchFamilyMembers(): Promise<FamilyMember[]> {
  const res = await fetch(`${API_URL}/api/family/members`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return FamilyMemberList.parse(await res.json());
}
