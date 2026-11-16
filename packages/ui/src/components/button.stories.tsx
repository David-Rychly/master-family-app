import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, RotateCw } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Base/Button",
  component: Button,
  args: { children: "Add item", variant: "default", size: "default", disabled: false },
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "secondary", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["default", "sm", "lg", "xs", "icon", "icon-sm"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus />
        Add item
      </Button>
      <Button variant="outline">Edit list</Button>
      <Button variant="secondary">Snooze</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">See all</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg">Large</Button>
      <Button>Default</Button>
      <Button size="sm">Small</Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Retry">
        <RotateCw />
      </Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
