import { AppHeader } from "@/components/shell/app-header";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-16 sm:gap-12 sm:px-8 sm:pt-6">
      <AppHeader />
      <main className="flex flex-col gap-10 sm:gap-12">{children}</main>
    </div>
  );
}
