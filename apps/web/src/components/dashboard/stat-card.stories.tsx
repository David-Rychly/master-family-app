import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatCard, StatValue } from "./stat-card";

const meta = {
  title: "App/StatCard",
  component: StatCard,
  args: { label: "Fuel prices", href: "/fuel", linkLabel: "Open Fuel prices", children: null },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The building block of every dashboard card: eyebrow, arrow link, one headline figure. */
export const Default: Story = {
  render: (args) => (
    <StatCard {...args}>
      <StatValue value={<span className="text-primary">44,50 Kč</span>} meta="Cheapest at Prim, 380 m away" />
    </StatCard>
  ),
};
