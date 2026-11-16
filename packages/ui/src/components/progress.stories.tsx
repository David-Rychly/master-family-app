import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "./progress";

const meta = {
  title: "Base/Progress",
  component: Progress,
  args: { value: 68, "aria-label": "68% of the budget used" },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Empty: Story = { args: { value: 0, "aria-label": "Nothing done yet" } };
export const Complete: Story = { args: { value: 100, "aria-label": "All done" } };
