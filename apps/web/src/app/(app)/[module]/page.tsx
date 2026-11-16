import { notFound } from "next/navigation";
import { EmptyState } from "@repo/ui/components/empty-state";
import { FamilyMembers } from "@/components/family-members";
import { MODULES, findModule } from "@/lib/modules";

// Every module gets a page now; each one is filled in as the module is built. Unknown ids 404 via findModule.
export function generateStaticParams() {
  return MODULES.filter((m) => m.id !== "home").map((m) => ({ module: m.id }));
}

export default async function ModulePage({ params }: PageProps<"/[module]">) {
  const { module: id } = await params;
  const appModule = findModule(id);
  if (!appModule) notFound();
  const Icon = appModule.icon;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className="grid size-13 place-items-center rounded-md bg-primary-soft text-primary">
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        <h1 className="type-h1">{appModule.name}</h1>
      </div>

      {appModule.id === "family" ? (
        <div className="max-w-xl">
          <FamilyMembers />
        </div>
      ) : (
        <EmptyState
          size="page"
          icon={<Icon />}
          title={`${appModule.name} is coming soon`}
          description="This part of the app isn't built yet. Everything for it will live on this page."
        />
      )}
    </section>
  );
}
