import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";
import { Button } from "./button";
import { Toaster } from "./sonner";

const meta = {
  title: "Base/Toast",
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        {Story()}
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Toasts report results the person can't see on screen, or failures. See the feedback rules. */
export const Kinds: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast.success("Invite sent")}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast("Item removed", { action: { label: "Undo", onClick: () => toast("Item is back") } })}
      >
        With Undo
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Couldn't save the item", { action: { label: "Try again", onClick: () => {} } })}
      >
        Error
      </Button>
    </div>
  ),
};
