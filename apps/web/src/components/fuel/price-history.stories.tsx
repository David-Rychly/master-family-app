import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ErrorState } from "@repo/ui/components/error-state";
import { toDailyPrices } from "@/lib/fuel";
import { historyRows } from "./fixtures";
import { PriceHistory, PriceHistorySkeleton } from "./price-history";

const meta = {
  title: "App/PriceHistory",
  component: PriceHistory,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-4xl">{Story()}</div>],
  args: { history: toDailyPrices(historyRows(60)) },
} satisfies Meta<typeof PriceHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 60 days: the first 14 show, "Show older days" adds 30 at a time. */
export const Default: Story = {};

export const FewDays: Story = {
  name: "Few days · no Show older",
  args: { history: toDailyPrices(historyRows(5)) },
};

export const Empty: Story = {
  name: "Empty · no history yet",
  args: { history: { stations: [], days: [] } },
};

export const Loading: Story = { render: () => <PriceHistorySkeleton /> };

export const Failed: Story = {
  name: "Error",
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Price history</CardTitle>
      </CardHeader>
      <ErrorState title="Couldn't load older prices" onRetry={() => {}} />
    </Card>
  ),
};
