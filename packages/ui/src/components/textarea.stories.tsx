import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Base/Textarea",
  component: Textarea,
  args: { placeholder: "The big pack, not the small one" },
  decorators: [(Story) => <div className="flex max-w-sm flex-col gap-2">{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <>
      <Label htmlFor="note">Note</Label>
      <Textarea id="note" {...args} />
    </>
  ),
};
