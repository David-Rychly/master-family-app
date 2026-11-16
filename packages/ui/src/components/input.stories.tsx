import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Base/Input",
  component: Input,
  args: { placeholder: "Milk, bread, apples…", disabled: false },
  decorators: [(Story) => <div className="flex max-w-sm flex-col gap-2">{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <>
      <Label htmlFor="item">Item</Label>
      <Input id="item" {...args} />
    </>
  ),
};

export const WithHelper: Story = {
  render: (args) => (
    <>
      <Label htmlFor="item-help">Item</Label>
      <Input id="item-help" aria-describedby="item-help-text" {...args} />
      <p id="item-help-text" className="type-small text-muted-foreground">
        Everyone on the list can see this.
      </p>
    </>
  ),
};

/** Shown when the person leaves the field or submits, not while typing. Says how to fix it. */
export const Invalid: Story = {
  render: (args) => (
    <>
      <Label htmlFor="item-error">Item</Label>
      <Input id="item-error" aria-invalid aria-describedby="item-error-text" {...args} placeholder="" />
      <p id="item-error-text" className="type-small text-destructive">
        Add a name for the item.
      </p>
    </>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Milk" },
  render: (args) => (
    <>
      <Label htmlFor="item-disabled">Item</Label>
      <Input id="item-disabled" {...args} />
    </>
  ),
};
