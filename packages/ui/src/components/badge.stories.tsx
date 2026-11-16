import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CircleCheck, Clock, TriangleAlert } from "lucide-react";
import { Badge } from "./badge";

const meta = {
  title: "Base/Badge",
  component: Badge,
  args: { children: "Milk", variant: "default" },
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "success", "warning", "destructive", "outline"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Status badges always carry an icon or a word, never color alone. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Milk</Badge>
      <Badge variant="primary">3 events</Badge>
      <Badge variant="success">
        <CircleCheck />
        Paid
      </Badge>
      <Badge variant="warning">
        <Clock />
        Soon
      </Badge>
      <Badge variant="destructive">
        <TriangleAlert />
        Overdue
      </Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};
