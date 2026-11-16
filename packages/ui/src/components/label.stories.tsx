import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Base/Label",
  component: Label,
  args: { children: "Needed today" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every control has a visible label. Clicking the label toggles the control. */
export const WithControl: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Checkbox id="label-demo" />
      <Label htmlFor="label-demo" {...args} />
    </div>
  ),
};
