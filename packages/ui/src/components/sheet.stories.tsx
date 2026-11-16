import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

const meta = {
  title: "Base/Sheet",
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function AddItemSheet({ side }: { side: "bottom" | "right" }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add item</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Add to the shopping list</SheetTitle>
          <SheetDescription>Everyone sees it right away.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          <Label htmlFor={`item-${side}`}>Item</Label>
          <Input id={`item-${side}`} placeholder="Milk, bread, apples…" />
        </div>
        <SheetFooter>
          <Button>Add item</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

/** On phones, quick forms slide up from the bottom. */
export const Bottom: Story = { render: () => <AddItemSheet side="bottom" /> };

/** On wide screens, a side panel keeps the page visible. */
export const Side: Story = { render: () => <AddItemSheet side="right" /> };
