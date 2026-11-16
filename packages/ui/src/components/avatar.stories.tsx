import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarFallback } from "./avatar";

const meta = {
  title: "Base/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar className="size-7">
        <AvatarFallback>E</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback className="bg-primary-soft text-sm text-primary-strong">D</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Stack: Story = {
  render: () => (
    <div className="flex -space-x-2">
      {["M", "D", "E", "L"].map((i) => (
        <Avatar key={i} className="border-2 border-background">
          <AvatarFallback>{i}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
