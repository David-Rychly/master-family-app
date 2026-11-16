import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "@repo/ui/components/progress";
import { StatCard, StatValue } from "./stat-card";

const meta = {
  title: "App/StatCard",
  component: StatCard,
  args: { label: "November budget", href: "/budget", linkLabel: "Open Budget", children: null },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The building block of every dashboard card: eyebrow, arrow link, one headline figure. */
export const Default: Story = {
  render: (args) => (
    <StatCard {...args}>
      <StatValue value="68%" meta="used, with 15 days to go" />
      <Progress value={68} aria-label="68% of the budget used" />
    </StatCard>
  ),
};
