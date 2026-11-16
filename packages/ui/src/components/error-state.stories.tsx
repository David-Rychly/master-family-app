import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { House } from "lucide-react";
import { fn } from "storybook/test";
import { Button } from "./button";
import { Card, CardHeader, CardTitle } from "./card";
import { ErrorState } from "./error-state";

const meta = {
  title: "States/Error",
  component: ErrorState,
  args: { size: "inline", title: "Couldn't load chores", onRetry: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["inline", "page"] },
    secondaryAction: { control: false },
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One card failed: it keeps its eyebrow so it is still recognisable, the rest of the page keeps working. */
export const OneCard: Story = {
  name: "One card",
  render: (args) => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Chores this week</CardTitle>
      </CardHeader>
      <ErrorState {...args} />
    </Card>
  ),
};

/** A whole page failed: the header and menu stay, so the person can still move on. */
export const WholePage: Story = {
  name: "Whole page",
  args: {
    size: "page",
    title: "This page didn't load",
    description: "Something went wrong on our side or with the connection. Try again, or go back to the dashboard.",
  },
  render: (args) => (
    <ErrorState
      {...args}
      secondaryAction={
        <Button variant="ghost">
          <House />
          Back to home
        </Button>
      }
    />
  ),
};
