import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { SchemePicker } from "@/components/shell/scheme-picker";

export const metadata = { title: "Settings · Family App" };

export default function SettingsPage() {
  return (
    <section className="flex max-w-xl flex-col gap-8">
      <h1 className="type-h1">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Color scheme</CardTitle>
          <CardDescription>Only changes the app for you. Everyone picks their own.</CardDescription>
        </CardHeader>
        <SchemePicker />
      </Card>
    </section>
  );
}
