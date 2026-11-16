import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CalendarDays, Plus, ShoppingBasket } from "lucide-react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle } from "./card";
import { EmptyState } from "./empty-state";

const meta = {
  title: "States/Empty",
  component: EmptyState,
  args: {
    tone: "start",
    size: "inline",
    title: "Nothing planned today",
    description: "Events anyone in the family adds show up here.",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["start", "done"] },
    size: { control: "inline-radio", options: ["inline", "page"] },
    icon: { control: false },
    action: { control: false },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing added yet: say what will appear and offer one action. */
export const NothingYet: Story = {
  name: "Nothing yet (in a card)",
  render: (args) => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Today</CardTitle>
      </CardHeader>
      <EmptyState
        {...args}
        icon={<CalendarDays />}
        action={
          <Button variant="outline" size="sm">
            <Plus />
            Add event
          </Button>
        }
      />
    </Card>
  ),
};

/** The list emptied because things got finished: a calm confirmation, no button. */
export const AllDone: Story = {
  name: "All done (in a card)",
  args: { tone: "done", title: "All chores done this week", description: "Nice work, everyone." },
  render: (args) => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Chores this week</CardTitle>
      </CardHeader>
      <EmptyState {...args} />
    </Card>
  ),
};

export const WholePage: Story = {
  name: "Whole page",
  args: { size: "page", title: "No shopping lists yet", description: "Make one list for the week, or one per shop." },
  render: (args) => (
    <EmptyState
      {...args}
      icon={<ShoppingBasket />}
      action={
        <Button>
          <Plus />
          New list
        </Button>
      }
    />
  ),
};
