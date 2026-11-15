import { FamilyMembers } from "@/components/family-members";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Family App</h1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Family members</h2>
        <FamilyMembers />
      </section>
    </main>
  );
}
