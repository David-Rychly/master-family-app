import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./app-header";
import { FullPageMenu } from "./full-page-menu";
import { Greeting, TodayDate } from "./greeting";
import { Logo } from "./logo";
import { SchemePicker } from "./scheme-picker";

const meta = {
  title: "App/Shell",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = { render: () => <AppHeader /> };

/** Open it with the Menu button. The scheme picker inside it recolors this whole page. */
export const Menu: Story = { render: () => <FullPageMenu /> };

/** Changes the scheme for real; the toolbar Scheme setting is restored on the next story. */
export const SchemePickerLarge: Story = { name: "Scheme picker", render: () => <SchemePicker /> };
export const SchemePickerSmall: Story = { name: "Scheme picker · small", render: () => <SchemePicker size="sm" /> };

export const Brand: Story = { name: "Logo", render: () => <Logo /> };

export const Greeting_: Story = {
  name: "Greeting",
  render: () => (
    <div className="flex flex-col gap-3">
      <span className="type-label text-subtle">
        <TodayDate />
      </span>
      <h1 className="type-display">
        <Greeting name="Mom" />
      </h1>
    </div>
  ),
};
