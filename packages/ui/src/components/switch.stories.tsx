import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Base/Switch",
  component: Switch,
  args: { defaultChecked: true, disabled: false },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** For settings that apply immediately. If the change waits for Save, use a checkbox. */
export const Playground: Story = {
  render: (args) => (
    <div className="flex max-w-sm items-center justify-between gap-3">
      <Label htmlFor="notify">Tell everyone when it is bought</Label>
      <Switch id="notify" {...args} />
    </div>
  ),
};
