import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { budget, chores, meals, shopping, today, tomorrow } from "@/lib/mock-dashboard";
import { BudgetCard, ChoresCard, MealsCard, ShoppingCard, TodayCard } from "./cards";

const meta = {
  title: "App/Dashboard cards",
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="grid max-w-sm grid-cols-1">{Story()}</div>],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Today: Story = { render: () => <TodayCard today={today} tomorrow={tomorrow} /> };
export const TodayEmpty: Story = { name: "Today · nothing planned", render: () => <TodayCard today={[]} tomorrow={[]} /> };

export const Chores: Story = { render: () => <ChoresCard chores={chores} /> };
export const ChoresAllDone: Story = {
  name: "Chores · all done",
  render: () => (
    <ChoresCard
      chores={{
        done: 10,
        total: 10,
        people: [
          { name: "Ella", done: 5, total: 5 },
          { name: "Leo", done: 5, total: 5 },
        ],
      }}
    />
  ),
};
export const ChoresNotSetUp: Story = {
  name: "Chores · not set up",
  render: () => <ChoresCard chores={{ done: 0, total: 0, people: [] }} />,
};

export const Shopping: Story = { render: () => <ShoppingCard shopping={shopping} /> };
export const ShoppingEmpty: Story = {
  name: "Shopping · nothing to buy",
  render: () => <ShoppingCard shopping={{ count: 0, lastChange: "Mom bought the last item 2 h ago", preview: [] }} />,
};

export const Meals: Story = { render: () => <MealsCard meals={meals} /> };
export const Budget: Story = { render: () => <BudgetCard budget={budget} /> };
