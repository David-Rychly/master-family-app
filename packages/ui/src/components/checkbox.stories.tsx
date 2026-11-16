import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Base/Checkbox",
  component: Checkbox,
  args: { defaultChecked: true, disabled: false },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Checkbox id="urgent" {...args} />
      <Label htmlFor="urgent">Needed today</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { id: "c1", label: "Unchecked", props: {} },
        { id: "c2", label: "Checked", props: { defaultChecked: true } },
        { id: "c3", label: "Disabled", props: { disabled: true } },
        { id: "c4", label: "Invalid", props: { "aria-invalid": true } },
      ].map((c) => (
        <div key={c.id} className="flex items-center gap-3">
          <Checkbox id={c.id} {...c.props} />
          <Label htmlFor={c.id}>{c.label}</Label>
        </div>
      ))}
    </div>
  ),
};
